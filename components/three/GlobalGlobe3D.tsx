"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import * as THREE from "three";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "./useReducedMotion";
import { NETWORK_COUNTRIES_49, NetworkCountry } from "@/lib/networkCountries";

interface GlobalGlobe3DProps {
  selectedCountry?: string | null;
  onSelectCountry?: (countryName: string) => void;
  activeRegion?: "all" | "middleEast" | "asiaPacific" | "europe" | "americasAfrica";
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Region center coordinates for smooth camera flight
const REGION_CENTERS: Record<string, { lat: number; lng: number }> = {
  middleEast: { lat: 25.0, lng: 48.0 },
  asiaPacific: { lat: 20.0, lng: 110.0 },
  europe: { lat: 50.0, lng: 12.0 },
  americasAfrica: { lat: 15.0, lng: -70.0 },
  all: { lat: 26.28, lng: 50.21 }, // Saudi Arabia HQ view
};

export default function GlobalGlobe3D({
  selectedCountry: propSelectedCountry,
  onSelectCountry,
  activeRegion = "all",
}: GlobalGlobe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for 2D overlays
  const pinRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});
  const circleRefs = useRef<Record<string, SVGCircleElement | null>>({});

  // Exponential moving average smoothed positions for jitter-free label tracks
  const smoothedPositions = useRef<
    Record<string, { lx: number; ly: number; visible: boolean }>
  >({});

  const prefersReducedMotion = useReducedMotion();

  const [isLoaded, setIsLoaded] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string>("Saudi Arabia");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const activeSelectedCountry = propSelectedCountry || internalSelected;

  // Selected country metadata
  const selectedCountryData = useMemo(() => {
    return (
      NETWORK_COUNTRIES_49.find((c) => c.name === activeSelectedCountry) ||
      NETWORK_COUNTRIES_49[0]
    );
  }, [activeSelectedCountry]);

  // Handle country selection
  const handleCountryClick = (countryName: string) => {
    setInternalSelected(countryName);
    if (onSelectCountry) {
      onSelectCountry(countryName);
    }
  };

  // References for animation state
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -1.2 });
  const isNavigatingRef = useRef<boolean>(false);
  const globeGroupRef = useRef<THREE.Group | null>(null);

  // Navigate globe when selected country changes
  useEffect(() => {
    const country = NETWORK_COUNTRIES_49.find((c) => c.name === activeSelectedCountry);
    if (!country) return;

    // Calculate rotation angles to bring country to front-center of camera
    const targetY = -((country.lng + 180) * (Math.PI / 180)) + Math.PI / 2;
    const targetX = ((country.lat * Math.PI) / 180) * 0.7; // Pleasant tilted view

    targetRotationRef.current = { x: targetX, y: targetY };
    isNavigatingRef.current = true;
  }, [activeSelectedCountry]);

  // Navigate globe when region tab changes
  useEffect(() => {
    if (!activeRegion || activeRegion === "all") return;
    const center = REGION_CENTERS[activeRegion];
    if (!center) return;

    const targetY = -((center.lng + 180) * (Math.PI / 180)) + Math.PI / 2;
    const targetX = ((center.lat * Math.PI) / 180) * 0.7;

    targetRotationRef.current = { x: targetX, y: targetY };
    isNavigatingRef.current = true;
  }, [activeRegion]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isVisible = true;
    let animationFrameId: number;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.0);

    const globeRadius = 1.62;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Initial orientation: Centered on Saudi Arabia / Middle East
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.y = -1.25;

    // ==========================================
    // 1. REALISTIC 3D EARTH SPHERE & TEXTURES
    // ==========================================
    const textureLoader = new THREE.TextureLoader();

    // High-resolution NASA Blue Marble Day Texture
    const earthTexture = textureLoader.load(
      "/textures/earth/earth-blue-marble.jpg",
      () => {
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.warn("Could not load high-res earth texture", err);
        setIsLoaded(true);
      }
    );
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.generateMipmaps = true;

    // Topographic Elevation Relief Map
    const bumpTexture = textureLoader.load("/textures/earth/earth-topology.png");

    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.045,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Outer Atmospheric Emerald Space Glow
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.025, 48, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // ==========================================
    // 2. 3D SURFACE PINS & PULSE RINGS
    // ==========================================
    const country3DPositions: Record<string, THREE.Vector3> = {};
    const pinPulseRings: THREE.Mesh[] = [];

    NETWORK_COUNTRIES_49.forEach((country) => {
      const pos = latLngToVector3(country.lat, country.lng, globeRadius);
      country3DPositions[country.name] = pos;

      // Small 3D beacon pin on Earth surface
      const pinGeo = new THREE.SphereGeometry(country.isHQ ? 0.038 : 0.024, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: country.isHQ ? 0x10b981 : 0x38bdf8,
        emissive: country.isHQ ? 0x10b981 : 0x0284c7,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      // Pulse ring for Al-Khobar HQ
      if (country.isHQ) {
        const ringGeo = new THREE.RingGeometry(0.045, 0.075, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos.clone().multiplyScalar(1.004));
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        globeGroup.add(ring);
        pinPulseRings.push(ring);
      }
    });

    // ==========================================
    // 3. GREAT-CIRCLE COORDINATION ARCS
    // ==========================================
    const hqCountry = NETWORK_COUNTRIES_49[0];
    const hqPos = latLngToVector3(hqCountry.lat, hqCountry.lng, globeRadius);

    const majorHubTargets = [
      "U.S.A.",
      "UK",
      "Germany",
      "Italy",
      "India",
      "China",
      "Japan",
      "Korea",
      "Singapore",
      "Brazil",
      "South Africa",
      "Australia",
    ];

    const arcMaterials: THREE.LineBasicMaterial[] = [];

    majorHubTargets.forEach((targetName, idx) => {
      const targetCountry = NETWORK_COUNTRIES_49.find((c) => c.name === targetName);
      if (!targetCountry) return;

      const destPos = latLngToVector3(targetCountry.lat, targetCountry.lng, globeRadius);
      const distance = hqPos.distanceTo(destPos);
      const mid = new THREE.Vector3().addVectors(hqPos, destPos).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(globeRadius + Math.min(distance * 0.28, 0.7));

      const curve = new THREE.QuadraticBezierCurve3(hqPos, mid, destPos);
      const pts = curve.getPoints(36);

      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const arcMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x10b981 : 0x38bdf8,
        transparent: true,
        opacity: 0.45,
      });
      const arc = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arc);
      arcMaterials.push(arcMat);
    });

    // ==========================================
    // 4. LIGHTING & THEME ADAPTATION
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.1);
    scene.add(ambientLight);

    const sunKeyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunKeyLight.position.set(5, 4, 4.5);
    scene.add(sunKeyLight);

    const rimEmeraldLight = new THREE.DirectionalLight(0x10b981, 1.8);
    rimEmeraldLight.position.set(-5, 2, -3.5);
    scene.add(rimEmeraldLight);

    const updateThemeLighting = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        ambientLight.color.setHex(0x1e293b);
        ambientLight.intensity = 1.1;
        sunKeyLight.intensity = 2.5;
        haloMat.opacity = 0.14;
      } else {
        ambientLight.color.setHex(0xe2e8f0);
        ambientLight.intensity = 1.35;
        sunKeyLight.intensity = 2.2;
        haloMat.opacity = 0.08;
      }
    };
    updateThemeLighting();

    const themeObserver = new MutationObserver(updateThemeLighting);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ==========================================
    // 5. INTERACTIVE DRAG ROTATION (MOUSE & TOUCH)
    // ==========================================
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      isNavigatingRef.current = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x = Math.max(
        -0.85,
        Math.min(0.85, globeGroup.rotation.x + deltaY * 0.005)
      );

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isNavigatingRef.current = false;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x = Math.max(
        -0.85,
        Math.min(0.85, globeGroup.rotation.x + deltaY * 0.006)
      );

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Intersection Observer
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    setIsLoaded(true);

    // ==========================================
    // 6. ANIMATION & SCREEN PROJECTION LOOP
    // ==========================================
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    const cameraPos = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera flight when navigating to selected country
      if (isNavigatingRef.current) {
        const diffY = targetRotationRef.current.y - globeGroup.rotation.y;
        const diffX = targetRotationRef.current.x - globeGroup.rotation.x;

        // Wrap difference for shortest path rotation
        const normalizedDiffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));

        globeGroup.rotation.y += normalizedDiffY * 0.06;
        globeGroup.rotation.x += diffX * 0.06;

        if (Math.abs(normalizedDiffY) < 0.004 && Math.abs(diffX) < 0.004) {
          isNavigatingRef.current = false;
        }
      } else if (!isDragging && !prefersReducedMotion) {
        // Continuous subtle rotation
        globeGroup.rotation.y += 0.0016;
      }

      // Pulse HQ beacon ring
      if (pinPulseRings.length > 0) {
        const pulse = 1 + Math.sin(elapsed * 4) * 0.2;
        pinPulseRings[0].scale.set(pulse, pulse, pulse);
      }

      // Pulse coordination arc lines
      arcMaterials.forEach((mat, idx) => {
        mat.opacity = 0.35 + Math.sin(elapsed * 2.2 + idx) * 0.25;
      });

      // Update Screen-Space Projected HTML Markers and Collision-Aware Labels
      const w = container.clientWidth;
      const h = container.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const globeScreenRadius = Math.min(w, h) * 0.44;

      camera.getWorldPosition(cameraPos);
      globeGroup.updateMatrixWorld();

      interface VisibleItem {
        country: NetworkCountry;
        pinX: number;
        pinY: number;
        fade: number;
        dot: number;
        angle: number;
        sector: 1 | 2 | 3;
      }

      const visibleList: VisibleItem[] = [];

      NETWORK_COUNTRIES_49.forEach((country) => {
        const pinEl = pinRefs.current[country.name];
        const cardEl = cardRefs.current[country.name];
        const lineEl = lineRefs.current[country.name];
        const circleEl = circleRefs.current[country.name];
        const surfacePoint = country3DPositions[country.name];

        if (!surfacePoint) return;

        tempVec.copy(surfacePoint).applyMatrix4(globeGroup.matrixWorld);
        const normal = tempVec.clone().sub(globeGroup.position).normalize();
        const dirToCam = cameraPos.clone().sub(tempVec).normalize();
        const dot = normal.dot(dirToCam);

        // Occlusion culling: hide if back-facing
        if (dot < 0.15) {
          if (pinEl) {
            pinEl.style.opacity = "0";
            pinEl.style.pointerEvents = "none";
          }
          if (cardEl) {
            cardEl.style.opacity = "0";
            cardEl.style.pointerEvents = "none";
          }
          if (lineEl) {
            lineEl.style.opacity = "0";
          }
          if (circleEl) {
            circleEl.style.opacity = "0";
          }
          if (smoothedPositions.current[country.name]) {
            smoothedPositions.current[country.name].visible = false;
          }
          return;
        }

        tempVec.project(camera);
        const pinX = ((tempVec.x + 1) * w) / 2;
        const pinY = ((-tempVec.y + 1) * h) / 2;
        const fade = Math.min(1, (dot - 0.15) * 4.0);

        // Position pin on globe surface
        if (pinEl) {
          pinEl.style.left = `${pinX.toFixed(1)}px`;
          pinEl.style.top = `${pinY.toFixed(1)}px`;
          pinEl.style.opacity = `${fade}`;
          pinEl.style.pointerEvents = "auto";
        }

        // Determine sector based on angle around globe center
        const angle = Math.atan2(pinY - cy, pinX - cx);
        let sector: 1 | 2 | 3 = 3;
        if (angle >= -2.25 && angle <= -0.85) {
          sector = 1; // Northern Arc (Top)
        } else if (angle < -2.25 || angle > 2.35) {
          sector = 2; // Western Flank (Left)
        } else {
          sector = 3; // Eastern Flank (Right)
        }

        visibleList.push({ country, pinX, pinY, fade, dot, angle, sector });
      });

      // Target layout map
      const targetLayout: Record<
        string,
        { lx: number; ly: number; cardW: number; cardH: number }
      > = {};
      const CARD_H = 22;
      const GAP = 5;

      // 1. Sector 1: Top Arc
      const s1 = visibleList
        .filter((item) => item.sector === 1)
        .sort((a, b) => a.pinX - b.pinX);
      if (s1.length > 0) {
        const estCardW = 100;
        const totalW = s1.length * (estCardW + GAP);
        let startX = Math.max(15, cx - totalW / 2);
        if (startX + totalW > w - 15) {
          startX = Math.max(15, w - totalW - 15);
        }
        s1.forEach((item, idx) => {
          const lx = startX + idx * (estCardW + GAP);
          const distFromCenter = Math.abs(item.pinX - cx);
          const archOffset = (distFromCenter / (w / 2)) * 18;
          const ly = Math.max(18, cy - globeScreenRadius - 26 + archOffset);
          targetLayout[item.country.name] = {
            lx,
            ly,
            cardW: estCardW,
            cardH: CARD_H,
          };
        });
      }

      // 2. Sector 2: Left Flank
      const s2 = visibleList
        .filter((item) => item.sector === 2)
        .sort((a, b) => a.pinY - b.pinY);
      if (s2.length > 0) {
        const estCardW = 105;
        const totalH = s2.length * (CARD_H + GAP);
        let startY = Math.max(28, cy - totalH / 2);
        if (startY + totalH > h - 35) {
          startY = Math.max(28, h - totalH - 35);
        }
        s2.forEach((item, idx) => {
          const ly = startY + idx * (CARD_H + GAP);
          const lx = Math.max(
            12,
            Math.min(item.pinX - estCardW - 18, cx - globeScreenRadius - estCardW + 35)
          );
          targetLayout[item.country.name] = {
            lx,
            ly,
            cardW: estCardW,
            cardH: CARD_H,
          };
        });
      }

      // 3. Sector 3: Right Flank
      const s3 = visibleList
        .filter((item) => item.sector === 3)
        .sort((a, b) => a.pinY - b.pinY);
      if (s3.length > 0) {
        const estCardW = 105;
        const totalH = s3.length * (CARD_H + GAP);
        let startY = Math.max(28, cy - totalH / 2);
        if (startY + totalH > h - 35) {
          startY = Math.max(28, h - totalH - 35);
        }
        s3.forEach((item, idx) => {
          const ly = startY + idx * (CARD_H + GAP);
          const lx = Math.min(
            w - estCardW - 14,
            Math.max(item.pinX + 18, cx + globeScreenRadius - 35)
          );
          targetLayout[item.country.name] = {
            lx,
            ly,
            cardW: estCardW,
            cardH: CARD_H,
          };
        });
      }

      // Apply positions with smoothing and update Leader Lines
      visibleList.forEach((item) => {
        const target = targetLayout[item.country.name];
        if (!target) return;

        let smoothed = smoothedPositions.current[item.country.name];
        if (!smoothed || !smoothed.visible) {
          smoothed = { lx: target.lx, ly: target.ly, visible: true };
          smoothedPositions.current[item.country.name] = smoothed;
        } else {
          smoothed.lx += (target.lx - smoothed.lx) * 0.22;
          smoothed.ly += (target.ly - smoothed.ly) * 0.22;
        }

        const cardEl = cardRefs.current[item.country.name];
        const lineEl = lineRefs.current[item.country.name];
        const circleEl = circleRefs.current[item.country.name];

        if (cardEl) {
          cardEl.style.left = `${smoothed.lx.toFixed(1)}px`;
          cardEl.style.top = `${smoothed.ly.toFixed(1)}px`;
          cardEl.style.opacity = `${item.fade}`;
          cardEl.style.pointerEvents = "auto";
        }

        let lineX2 = smoothed.lx;
        const lineY2 = smoothed.ly + CARD_H / 2;

        if (smoothed.lx > item.pinX) {
          lineX2 = smoothed.lx - 2;
        } else {
          lineX2 = smoothed.lx + target.cardW + 2;
        }

        const isCurrentSelected = activeSelectedCountry === item.country.name;
        const isCurrentHovered = hoveredCountry === item.country.name;

        if (lineEl) {
          lineEl.setAttribute("x1", item.pinX.toFixed(1));
          lineEl.setAttribute("y1", item.pinY.toFixed(1));
          lineEl.setAttribute("x2", lineX2.toFixed(1));
          lineEl.setAttribute("y2", lineY2.toFixed(1));
          if (isCurrentSelected || isCurrentHovered) {
            lineEl.setAttribute("stroke-width", "2");
            lineEl.setAttribute("stroke", "#10B981");
            lineEl.style.opacity = "1";
          } else {
            lineEl.setAttribute("stroke-width", "1");
            lineEl.setAttribute("stroke", "#10B981");
            lineEl.style.opacity = (item.fade * 0.45).toString();
          }
        }

        if (circleEl) {
          circleEl.setAttribute("cx", item.pinX.toFixed(1));
          circleEl.setAttribute("cy", item.pinY.toFixed(1));
          if (isCurrentSelected || isCurrentHovered) {
            circleEl.setAttribute("r", "3.5");
            circleEl.setAttribute("fill", "#10B981");
            circleEl.style.opacity = "1";
          } else {
            circleEl.setAttribute("r", "2");
            circleEl.setAttribute("fill", "#10B981");
            circleEl.style.opacity = item.fade.toString();
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      earthTexture.dispose();
      bumpTexture.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion, activeSelectedCountry, hoveredCountry]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
      aria-label="3D Interactive Worldwide Network Globe"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Floating Status Badge */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/75 border border-slate-200 dark:border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-700 dark:text-titanium-300 shadow-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse" />
        <span>3D Earth • 49 Countries • Click to Inspect</span>
      </div>

      {/* Quick Country Jump Select */}
      <div className="absolute top-3 right-3 z-30">
        <select
          value={activeSelectedCountry}
          onChange={(e) => handleCountryClick(e.target.value)}
          className="text-[11px] font-mono bg-white/90 dark:bg-black/85 text-slate-800 dark:text-titanium-200 border border-slate-200 dark:border-white/15 rounded-xl px-2.5 py-1.5 backdrop-blur-md shadow-sm outline-none focus:border-emerald-accent cursor-pointer transition-all"
          aria-label="Jump to Country"
        >
          <option value="" disabled>
            Jump to Country (49)...
          </option>
          {NETWORK_COUNTRIES_49.slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} (
                {c.region === "middleEast"
                  ? "Middle East"
                  : c.region === "asiaPacific"
                  ? "Asia Pacific"
                  : c.region === "europe"
                  ? "Europe"
                  : "Americas & Africa"}
                )
              </option>
            ))}
        </select>
      </div>

      {/* Selected Country Inspection Card with Stepper */}
      {selectedCountryData && (
        <div className="absolute bottom-3 left-3 z-30 max-w-[280px] sm:max-w-[320px] p-3 rounded-2xl bg-white/95 dark:bg-[#060A14]/95 border border-slate-200 dark:border-white/15 backdrop-blur-md shadow-xl text-slate-900 dark:text-white transition-all">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2.5 truncate">
              <div className="relative w-6 h-4 rounded-[3px] overflow-hidden border border-slate-300/80 dark:border-white/20 shadow-sm shrink-0 bg-slate-100 dark:bg-slate-800">
                <Image
                  src={`/flags/${selectedCountryData.flag}.svg`}
                  alt=""
                  width={24}
                  height={16}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs leading-tight truncate">
                  {selectedCountryData.name}
                  {selectedCountryData.isHQ && (
                    <span className="ml-1.5 text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-accent/20 text-emerald-deep dark:text-emerald-glow border border-emerald-accent/40 font-bold">
                      HQ
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-mono text-emerald-deep dark:text-emerald-accent font-semibold truncate">
                  {selectedCountryData.hubCity}
                </span>
              </div>
            </div>
            {/* Quick Stepper Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const idx = NETWORK_COUNTRIES_49.findIndex(
                    (c) => c.name === selectedCountryData.name
                  );
                  const prevIdx =
                    (idx - 1 + NETWORK_COUNTRIES_49.length) % NETWORK_COUNTRIES_49.length;
                  handleCountryClick(NETWORK_COUNTRIES_49[prevIdx].name);
                }}
                className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-titanium-300 transition-colors cursor-pointer"
                title="Previous country"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const idx = NETWORK_COUNTRIES_49.findIndex(
                    (c) => c.name === selectedCountryData.name
                  );
                  const nextIdx = (idx + 1) % NETWORK_COUNTRIES_49.length;
                  handleCountryClick(NETWORK_COUNTRIES_49[nextIdx].name);
                }}
                className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-titanium-300 transition-colors cursor-pointer"
                title="Next country"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 dark:text-titanium-400 pt-1.5 border-t border-slate-200 dark:border-white/10">
            <span>
              {selectedCountryData.lat > 0
                ? `${selectedCountryData.lat.toFixed(1)}°N`
                : `${(-selectedCountryData.lat).toFixed(1)}°S`}
              ,{" "}
              {selectedCountryData.lng > 0
                ? `${selectedCountryData.lng.toFixed(1)}°E`
                : `${(-selectedCountryData.lng).toFixed(1)}°W`}
            </span>
            <span className="text-emerald-deep dark:text-emerald-accent font-semibold">
              QA/QC Dispatch Ready
            </span>
          </div>
        </div>
      )}

      {/* SVG Leader Lines Layer */}
      <svg
        className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {NETWORK_COUNTRIES_49.map((country) => (
          <g key={`svg-${country.name}`}>
            <line
              ref={(el) => {
                lineRefs.current[country.name] = el;
              }}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="#10B981"
              strokeWidth="1"
              opacity="0"
            />
            <circle
              ref={(el) => {
                circleRefs.current[country.name] = el;
              }}
              cx="0"
              cy="0"
              r="2"
              fill="#10B981"
              opacity="0"
            />
          </g>
        ))}
      </svg>

      {/* Surface Pins Layer (exact geographic lat/lng projection) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
        {NETWORK_COUNTRIES_49.map((country) => {
          const isSelected = activeSelectedCountry === country.name;
          const isHovered = hoveredCountry === country.name;
          return (
            <div
              key={`pin-${country.name}`}
              ref={(el) => {
                pinRefs.current[country.name] = el;
              }}
              style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
              onMouseEnter={() => setHoveredCountry(country.name)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleCountryClick(country.name);
              }}
              className={`group -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-150 select-none ${
                isSelected ? "z-30 scale-125" : isHovered ? "z-20 scale-115" : "z-10"
              }`}
              title={`${country.name} (${country.hubCity})`}
            >
              <div
                className={`relative rounded-full flex items-center justify-center p-0.5 shadow-md transition-all ${
                  isSelected
                    ? "w-6 h-6 bg-emerald-500 ring-2 ring-emerald-300 shadow-[0_0_12px_#10B981]"
                    : isHovered
                    ? "w-5 h-5 bg-slate-900 dark:bg-white ring-2 ring-emerald-400"
                    : "w-4 h-4 bg-slate-900/90 dark:bg-[#0b1329]/95 border border-white/60 dark:border-white/30"
                }`}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={`/flags/${country.flag}.svg`}
                    alt=""
                    width={16}
                    height={16}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`absolute w-1.5 h-1.5 rounded-full pointer-events-none ${
                    isSelected ? "bg-white animate-ping" : "bg-emerald-400"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Callout Label Cards Layer (Collision-Free Placements with National Flag & Full Name) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {NETWORK_COUNTRIES_49.map((country) => {
          const isSelected = activeSelectedCountry === country.name;
          const isHovered = hoveredCountry === country.name;
          const isHQ = country.isHQ;

          return (
            <div
              key={`card-${country.name}`}
              ref={(el) => {
                cardRefs.current[country.name] = el;
              }}
              style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
              onMouseEnter={() => setHoveredCountry(country.name)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleCountryClick(country.name);
              }}
              className={`group flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs cursor-pointer select-none transition-all duration-150 backdrop-blur-md shadow-md ${
                isSelected
                  ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-navy-950 font-bold border-2 border-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/40 z-40 scale-105"
                  : isHovered
                  ? "bg-slate-900 text-white dark:bg-white dark:text-navy-950 font-bold border border-emerald-400 z-30 scale-102 shadow-lg"
                  : isHQ
                  ? "bg-white/95 text-slate-900 dark:bg-[#0b1329]/95 dark:text-white font-bold border-1.5 border-emerald-500/80 shadow-md z-20"
                  : "bg-white/95 text-slate-800 dark:bg-[#060A14]/90 dark:text-titanium-200 font-semibold border border-slate-200 dark:border-white/15 hover:border-emerald-400 z-10"
              }`}
            >
              <div className="relative w-4 h-3 rounded-[2px] overflow-hidden border border-slate-300/80 dark:border-white/30 shrink-0 bg-slate-900 shadow-xs">
                <Image
                  src={`/flags/${country.flag}.svg`}
                  alt=""
                  width={18}
                  height={12}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="whitespace-nowrap text-[11px] font-sans tracking-tight leading-none">
                {country.name}
              </span>
              {isHQ && (
                <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-emerald-accent/25 text-emerald-deep dark:text-emerald-glow uppercase font-bold">
                  HQ
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
