"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

export default function HeroVessel3D() {
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

    // High-performance WebGL Renderer
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

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    const baseZ = 6.6;
    const computeCameraZ = (a: number) => {
      return a < 1 ? baseZ / Math.max(0.68, a) : baseZ;
    };
    camera.position.set(0, 0, computeCameraZ(aspect));

    // Root 3D Logo Assembly
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Initial heroic tilt & balanced upward position matching Screenshot 2
    const baseY = 0.14;
    rootGroup.position.set(0, baseY, 0);
    rootGroup.rotation.x = 0.14;
    rootGroup.rotation.y = -0.22;

    // ==========================================
    // MATERIALS: Premium Industrial Engineering
    // ==========================================
    const outerBezelMat = new THREE.MeshStandardMaterial({
      color: 0x64748b, // Polished slate titanium
      metalness: 0.92,
      roughness: 0.22,
    });

    const brushedRimMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Polished brushed steel
      metalness: 0.95,
      roughness: 0.16,
    });

    const faceplateMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Satin titanium dial in light mode
      metalness: 0.82,
      roughness: 0.32,
    });

    const emeraldRingMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.75,
      metalness: 0.85,
      roughness: 0.15,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.94,
      roughness: 0.18,
    });

    const boltMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.14,
    });

    const laserScanMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.80,
    });

    const outerTrackMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.30,
      wireframe: true,
    });

    const sapphireGlassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
      roughness: 0.05,
      metalness: 0.2,
    });

    // ==========================================
    // 1. 3D EMBLEM CHASSIS & BEVELED CASING
    // ==========================================
    const emblemGroup = new THREE.Group();
    rootGroup.add(emblemGroup);

    const radius = 1.95;
    const depth = 0.20;

    // Rear base chassis
    const baseGeo = new THREE.CylinderGeometry(radius * 1.02, radius * 1.05, depth, 64);
    baseGeo.rotateX(Math.PI / 2);
    const baseMesh = new THREE.Mesh(baseGeo, outerBezelMat);
    emblemGroup.add(baseMesh);

    // Stepped chamfered outer bezel ring
    const chamferRingGeo = new THREE.TorusGeometry(radius * 1.02, 0.045, 16, 64);
    const chamferRing = new THREE.Mesh(chamferRingGeo, brushedRimMat);
    chamferRing.position.z = depth * 0.48;
    emblemGroup.add(chamferRing);

    // Front recessed faceplate (dial)
    const faceplateGeo = new THREE.CylinderGeometry(radius * 0.98, radius * 0.98, 0.04, 64);
    faceplateGeo.rotateX(Math.PI / 2);
    const faceplateMesh = new THREE.Mesh(faceplateGeo, faceplateMat);
    faceplateMesh.position.z = depth * 0.5 + 0.01;
    emblemGroup.add(faceplateMesh);

    // Precision emerald concentric accent groove
    const emeraldAccentRingGeo = new THREE.TorusGeometry(radius * 0.96, 0.018, 16, 64);
    const emeraldAccentRing = new THREE.Mesh(emeraldAccentRingGeo, emeraldRingMat);
    emeraldAccentRing.position.z = depth * 0.5 + 0.035;
    emblemGroup.add(emeraldAccentRing);

    // Secondary subtle titanium inner track
    const innerTrackGeo = new THREE.TorusGeometry(radius * 0.92, 0.008, 12, 64);
    const innerTrack = new THREE.Mesh(innerTrackGeo, brushedRimMat);
    innerTrack.position.z = depth * 0.5 + 0.035;
    emblemGroup.add(innerTrack);

    // Precision Dial Calibration Ticks (12 Radial Markers at 30° intervals)
    const tickGeo = new THREE.BoxGeometry(0.02, 0.08, 0.015);
    const tickCount = 12;
    const tickRadius = radius * 0.94;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const tick = new THREE.Mesh(tickGeo, i % 3 === 0 ? emeraldRingMat : brushedRimMat);
      tick.position.set(
        Math.cos(angle) * tickRadius,
        Math.sin(angle) * tickRadius,
        depth * 0.5 + 0.04
      );
      tick.rotation.z = angle + Math.PI / 2;
      emblemGroup.add(tick);
    }

    // 4 Precision Corner Mounting Rivets / Hex Bolts (45°, 135°, 225°, 315°)
    const rivetGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.05, 16);
    rivetGeo.rotateX(Math.PI / 2);
    const rivetAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    const rivetRadius = radius * 1.0;
    rivetAngles.forEach((angle) => {
      const rivet = new THREE.Mesh(rivetGeo, boltMat);
      rivet.position.set(
        Math.cos(angle) * rivetRadius,
        Math.sin(angle) * rivetRadius,
        depth * 0.5 + 0.025
      );
      emblemGroup.add(rivet);
    });

    // ==========================================
    // 2. OFFICIAL UNIQUEIIS 3D LOGO LAYER
    // ==========================================
    // Official Logo dimensions: 1254 x 1041 (aspect ratio: 1.2046)
    // Matches Screenshot 2 proportion: prominent gear emblem + company name
    const logoHeight = 2.25;
    const logoWidth = logoHeight * 1.2046; // ~2.71
    const logoGeo = new THREE.PlaneGeometry(logoWidth, logoHeight);

    // Texture Loader with official transparent PNG containing emblem + company name
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(
      "/images/uiis-logo-transparent.png",
      () => {
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.warn("Could not load logo texture, retrying fallback", err);
        setIsLoaded(true);
      }
    );
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.generateMipmaps = true;

    // Elevated 3D Logo Plate with natural depth
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      alphaTest: 0.005,
      roughness: 0.28,
      metalness: 0.12,
      depthWrite: false,
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.z = depth * 0.5 + 0.065; // Elevated in front of faceplate
    emblemGroup.add(logoMesh);

    // Dimensional Emboss Drop Shadow Decal (creates tangible physical depth)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      color: 0x000000,
      transparent: true,
      opacity: 0.40,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(logoGeo, shadowMat);
    shadowMesh.position.set(0.015, -0.015, depth * 0.5 + 0.035);
    shadowMesh.scale.set(0.99, 0.99, 1);
    emblemGroup.add(shadowMesh);

    // Protective Sapphire Crystal Lens Facet (front surface glass glare)
    const glassGeo = new THREE.CylinderGeometry(radius * 0.97, radius * 0.97, 0.01, 64);
    glassGeo.rotateX(Math.PI / 2);
    const glassMesh = new THREE.Mesh(glassGeo, sapphireGlassMat);
    glassMesh.position.z = depth * 0.5 + 0.08;
    emblemGroup.add(glassMesh);

    // ==========================================
    // 3. TECHNICAL INSPECTION LASER & GAUGE RINGS
    // ==========================================
    // Outer Orbital Inspection Gauge Ring
    const outerRingGeo = new THREE.TorusGeometry(radius * 1.15, 0.012, 16, 64);
    const outerRing = new THREE.Mesh(outerRingGeo, outerTrackMat);
    rootGroup.add(outerRing);

    // Orbiting Emerald Inspection Node
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nodeMesh = new THREE.Mesh(nodeGeo, emeraldRingMat);
    rootGroup.add(nodeMesh);

    // Sweeping Technical Laser Inspection Line
    const laserLineGeo = new THREE.BoxGeometry(logoWidth * 1.1, 0.015, 0.015);
    const laserLine = new THREE.Mesh(laserLineGeo, laserScanMat);
    laserLine.position.z = depth * 0.5 + 0.09;
    emblemGroup.add(laserLine);

    // ==========================================
    // 4. CINEMATIC STUDIO LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
    keyLight.position.set(4, 5, 4.5);
    scene.add(keyLight);

    const emeraldRimLight = new THREE.DirectionalLight(0x10b981, 2.4);
    emeraldRimLight.position.set(-5, 2, -3.5);
    scene.add(emeraldRimLight);

    const frontFillLight = new THREE.DirectionalLight(0x94a3b8, 1.4);
    frontFillLight.position.set(-3, -2, 4);
    scene.add(frontFillLight);

    const goldAccentLight = new THREE.DirectionalLight(0xf59e0b, 0.8);
    goldAccentLight.position.set(3, -4, -2);
    scene.add(goldAccentLight);

    // Dynamic Theme Synchronization
    const updateThemeLighting = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        ambientLight.color.setHex(0x1e293b);
        ambientLight.intensity = 1.25;
        keyLight.intensity = 2.7;
        emeraldRimLight.intensity = 2.6;
        outerBezelMat.color.setHex(0x334155);
        faceplateMat.color.setHex(0x1e293b);
        sapphireGlassMat.opacity = 0.10;
      } else {
        // High-end satin titanium in Light mode matching Reference Screenshot 2
        ambientLight.color.setHex(0xdbeafe);
        ambientLight.intensity = 1.7;
        keyLight.intensity = 2.8;
        emeraldRimLight.intensity = 2.0;
        outerBezelMat.color.setHex(0x64748b);
        faceplateMat.color.setHex(0xe2e8f0);
        sapphireGlassMat.opacity = 0.05;
      }
    };
    updateThemeLighting();

    const themeObserver = new MutationObserver(updateThemeLighting);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ==========================================
    // 5. MOUSE TRACKING & PARALLAX
    // ==========================================
    let targetRotX = 0.14;
    let targetRotY = -0.22;
    let isTouch = false;

    const handlePointerMove = (e: MouseEvent) => {
      if (isTouch || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetRotY = -0.22 + normX * 0.42;
      targetRotX = 0.14 - normY * 0.32;
    };

    const handleTouchStart = () => {
      isTouch = true;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Resize Observer with responsive camera distance
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const currentAspect = width / height;
      camera.aspect = currentAspect;
      camera.position.z = computeCameraZ(currentAspect);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Intersection Observer
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    setIsLoaded(true);

    // ==========================================
    // 6. ANIMATION LOOP
    // ==========================================
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous subtle floating levitation
        rootGroup.position.y = baseY + Math.sin(elapsed * 1.4) * 0.04;
        rootGroup.rotation.z = Math.sin(elapsed * 0.9) * 0.015;

        // Slow cinematic precession when mouse is still
        targetRotY += 0.0009;

        // Laser scanner vertical sweep across logo
        laserLine.position.y = Math.sin(elapsed * 1.5) * (logoHeight * 0.48);
        laserScanMat.opacity = 0.5 + Math.sin(elapsed * 3) * 0.35;

        // Outer inspection node orbiting the emblem
        const orbitAngle = elapsed * 0.8;
        const orbitRadius = radius * 1.15;
        nodeMesh.position.set(
          Math.cos(orbitAngle) * orbitRadius,
          Math.sin(orbitAngle) * orbitRadius,
          0.05
        );

        // Counter-rotation of outer gauge ring
        outerRing.rotation.z = -elapsed * 0.15;
      }

      // Smooth lerp towards mouse parallax target
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      logoTexture.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-auto"
      aria-label="3D Uniqueiis Official Company Logo Presentation"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
