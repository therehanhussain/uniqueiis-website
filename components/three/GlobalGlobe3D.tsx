"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

interface NetworkPin {
  name: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
}

const HUBS: NetworkPin[] = [
  { name: "Al-Khobar HQ", lat: 26.28, lng: 50.21, isHQ: true },
  { name: "Jubail", lat: 27.01, lng: 49.66 },
  { name: "Yanbu", lat: 24.09, lng: 38.06 },
  { name: "Riyadh", lat: 24.71, lng: 46.67 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "Houston (USA)", lat: 29.76, lng: -95.36 },
  { name: "London (UK)", lat: 51.5, lng: -0.12 },
  { name: "Milan (Italy)", lat: 45.46, lng: 9.19 },
  { name: "Frankfurt (Germany)", lat: 50.11, lng: 8.68 },
  { name: "Mumbai (India)", lat: 19.07, lng: 72.87 },
  { name: "Shanghai (China)", lat: 31.23, lng: 121.47 },
  { name: "Tokyo (Japan)", lat: 35.68, lng: 139.69 },
  { name: "Seoul (S. Korea)", lat: 37.56, lng: 126.97 },
  { name: "Singapore", lat: 1.35, lng: 103.82 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function GlobalGlobe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

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
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.2);

    const globeRadius = 1.6;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Core Sphere
    const coreGeo = new THREE.SphereGeometry(globeRadius, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x060c18,
      metalness: 0.85,
      roughness: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Elegant Latitude / Longitude Graticule Rings
    const latRingMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.45,
    });

    for (let lat = -60; lat <= 60; lat += 30) {
      const r = globeRadius * Math.cos((lat * Math.PI) / 180);
      const y = globeRadius * Math.sin((lat * Math.PI) / 180);
      const circleGeo = new THREE.BufferGeometry();
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      circleGeo.setFromPoints(pts);
      const circle = new THREE.Line(circleGeo, latRingMat);
      globeGroup.add(circle);
    }

    // 3. Subtle Geographic Continental Point Cloud (Calculated procedural landmass clusters)
    const pointsGeo = new THREE.BufferGeometry();
    const particlePositions: number[] = [];
    const particleColors: number[] = [];

    // Distribute surface particles
    const particleCount = 1400;
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const pRadius = globeRadius + 0.01;
      const x = pRadius * Math.sin(phi) * Math.cos(theta);
      const y = pRadius * Math.cos(phi);
      const z = pRadius * Math.sin(phi) * Math.sin(theta);

      particlePositions.push(x, y, z);

      // Emerald & Titanium dots
      if (Math.random() > 0.8) {
        particleColors.push(0.06, 0.72, 0.5); // Emerald #10B981
      } else {
        particleColors.push(0.3, 0.4, 0.55); // Titanium #475569
      }
    }

    pointsGeo.setAttribute("position", new THREE.Float32BufferAttribute(particlePositions, 3));
    pointsGeo.setAttribute("color", new THREE.Float32BufferAttribute(particleColors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(particles);

    // 4. Hub Marker Pins
    const hqPos = latLngToVector3(HUBS[0].lat, HUBS[0].lng, globeRadius);

    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const hqPinMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });

    const pinBeacons: THREE.Mesh[] = [];

    HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius);

      const pinGeo = new THREE.SphereGeometry(hub.isHQ ? 0.065 : 0.04, 16, 16);
      const pin = new THREE.Mesh(pinGeo, hub.isHQ ? hqPinMat : pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);
      pinBeacons.push(pin);

      // HQ pulsating aura ring
      if (hub.isHQ) {
        const ringGeo = new THREE.RingGeometry(0.07, 0.09, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        globeGroup.add(ring);
      }
    });

    // 5. Great-Circle Flight / Coordination Arcs from Al-Khobar to Key Hubs
    const arcPoints: THREE.Vector3[][] = [];
    const arcMaterials: THREE.LineBasicMaterial[] = [];

    const foreignHubs = [
      HUBS[5], // Houston
      HUBS[6], // London
      HUBS[7], // Milan
      HUBS[9], // Mumbai
      HUBS[10], // Shanghai
      HUBS[11], // Tokyo
      HUBS[13], // Singapore
    ];

    foreignHubs.forEach((hub, idx) => {
      const destPos = latLngToVector3(hub.lat, hub.lng, globeRadius);
      const mid = new THREE.Vector3().addVectors(hqPos, destPos).multiplyScalar(0.5);
      const distance = hqPos.distanceTo(destPos);
      mid.normalize().multiplyScalar(globeRadius + distance * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(hqPos, mid, destPos);
      const pts = curve.getPoints(36);

      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const arcMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x10b981 : 0x38bdf8,
        transparent: true,
        opacity: 0.55,
      });
      const arc = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arc);

      arcPoints.push(pts);
      arcMaterials.push(arcMat);
    });

    // 6. Atmospheric Glow Rim
    const atmoRingGeo = new THREE.RingGeometry(globeRadius * 0.99, globeRadius * 1.08, 64);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const atmoRing = new THREE.Mesh(atmoRingGeo, atmoMat);
    scene.add(atmoRing);

    // Lighting
    const ambient = new THREE.AmbientLight(0x0e1726, 0.95);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimEmerald = new THREE.DirectionalLight(0x10b981, 2.4);
    rimEmerald.position.set(-5, 2, -4);
    scene.add(rimEmerald);

    const goldAccent = new THREE.DirectionalLight(0xf59e0b, 0.6);
    goldAccent.position.set(3, -4, 2);
    scene.add(goldAccent);

    // Dynamic Theme Synchronization
    const updateThemeLighting = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        coreMat.color.setHex(0x060c18);
        latRingMat.color.setHex(0x1e293b);
        latRingMat.opacity = 0.45;
        ambient.color.setHex(0x0e1726);
        ambient.intensity = 0.95;
        keyLight.intensity = 2.2;
      } else {
        coreMat.color.setHex(0xf1f5f9);
        latRingMat.color.setHex(0xcbd5e1);
        latRingMat.opacity = 0.7;
        ambient.color.setHex(0xdbeafe);
        ambient.intensity = 1.5;
        keyLight.intensity = 2.4;
      }
    };
    updateThemeLighting();

    const themeObserver = new MutationObserver(updateThemeLighting);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial orientation: Center Saudi Arabia towards front
    globeGroup.rotation.x = 0.35;
    globeGroup.rotation.y = -1.2;

    // Interactive Drag
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    // Touch support for mobile rotation
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

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

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Continuous slow orbital spin when not dragging
      if (!isDragging && !prefersReducedMotion) {
        globeGroup.rotation.y += 0.0018;
      }

      // HQ pin pulse animation
      const s = 1 + Math.sin(elapsed * 4) * 0.15;
      pinBeacons[0].scale.set(s, s, s);

      // Pulse coordination arc lines
      arcMaterials.forEach((mat, idx) => {
        mat.opacity = 0.4 + Math.sin(elapsed * 2.5 + idx) * 0.25;
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
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] flex items-center justify-center pointer-events-auto"
      aria-label="3D Interactive Worldwide Network Globe"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
