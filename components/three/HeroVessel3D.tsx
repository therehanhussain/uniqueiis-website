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

    // Renderer
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

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.2);

    // Root Assembly Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials - Industrial Titanium, Steel, Emerald & Gold Accents
    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1e2638,
      metalness: 0.88,
      roughness: 0.28,
    });

    const brushedSteelMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.92,
      roughness: 0.22,
    });

    const polishedFlangeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.15,
    });

    const boltMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.9,
      roughness: 0.3,
    });

    const weldSeamMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      metalness: 0.7,
      roughness: 0.4,
      emissive: 0x10b981,
      emissiveIntensity: 0.25,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.25,
    });

    const laserScanMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.65,
      wireframe: true,
    });

    // 1. Vessel Main Shell (Cylinder)
    const shellGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.4, 48);
    const shell = new THREE.Mesh(shellGeo, darkTitaniumMat);
    rootGroup.add(shell);

    // 2. Torispherical / Dished Heads (Top & Bottom caps)
    const headGeo = new THREE.SphereGeometry(1.2, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const topHead = new THREE.Mesh(headGeo, brushedSteelMat);
    topHead.position.y = 1.7;
    rootGroup.add(topHead);

    const bottomHead = new THREE.Mesh(headGeo, brushedSteelMat);
    bottomHead.position.y = -1.7;
    bottomHead.rotation.x = Math.PI;
    rootGroup.add(bottomHead);

    // 3. Stiffening Rings / Reinforcement Bands
    const ringGeo = new THREE.TorusGeometry(1.22, 0.035, 16, 48);
    const ringTop = new THREE.Mesh(ringGeo, brushedSteelMat);
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = 0.9;
    rootGroup.add(ringTop);

    const ringBottom = new THREE.Mesh(ringGeo, brushedSteelMat);
    ringBottom.rotation.x = Math.PI / 2;
    ringBottom.position.y = -0.9;
    rootGroup.add(ringBottom);

    // 4. Circumferential Weld Seam (Green/Emerald subtle pulse)
    const weldGeo = new THREE.TorusGeometry(1.208, 0.02, 16, 48);
    const weldCenter = new THREE.Mesh(weldGeo, weldSeamMat);
    weldCenter.rotation.x = Math.PI / 2;
    weldCenter.position.y = 0;
    rootGroup.add(weldCenter);

    const weldTop = new THREE.Mesh(weldGeo, weldSeamMat);
    weldTop.rotation.x = Math.PI / 2;
    weldTop.position.y = 1.68;
    rootGroup.add(weldTop);

    // 5. Heavy Process Nozzle & Flange (Right side)
    const nozzleGroup = new THREE.Group();
    nozzleGroup.position.set(1.15, 0.4, 0);
    nozzleGroup.rotation.z = -Math.PI / 2;

    const nozzleNeckGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.9, 32);
    const nozzleNeck = new THREE.Mesh(nozzleNeckGeo, darkTitaniumMat);
    nozzleNeck.position.y = 0.45;
    nozzleGroup.add(nozzleNeck);

    const flangeGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.16, 32);
    const flange = new THREE.Mesh(flangeGeo, polishedFlangeMat);
    flange.position.y = 0.98;
    nozzleGroup.add(flange);

    // Raised Face Flange Ring
    const raisedFaceGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.05, 32);
    const raisedFace = new THREE.Mesh(raisedFaceGeo, brushedSteelMat);
    raisedFace.position.y = 1.07;
    nozzleGroup.add(raisedFace);

    // Flange Stud Bolts (12 Studs)
    const boltGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 12);
    const boltCount = 12;
    const boltRadius = 0.45;
    for (let i = 0; i < boltCount; i++) {
      const angle = (i / boltCount) * Math.PI * 2;
      const bolt = new THREE.Mesh(boltGeo, boltMat);
      bolt.position.set(Math.cos(angle) * boltRadius, 1.0, Math.sin(angle) * boltRadius);
      nozzleGroup.add(bolt);
    }
    rootGroup.add(nozzleGroup);

    // 6. Secondary Nozzle / Instrument Port (Left side)
    const instNozzleGroup = new THREE.Group();
    instNozzleGroup.position.set(-1.18, -0.6, 0.4);
    instNozzleGroup.rotation.set(0, 0.3, Math.PI / 2);

    const instNeckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.6, 24);
    const instNeck = new THREE.Mesh(instNeckGeo, darkTitaniumMat);
    instNeck.position.y = 0.3;
    instNozzleGroup.add(instNeck);

    const instFlangeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.1, 24);
    const instFlange = new THREE.Mesh(instFlangeGeo, goldAccentMat);
    instFlange.position.y = 0.65;
    instNozzleGroup.add(instFlange);
    rootGroup.add(instNozzleGroup);

    // 7. ASME Nameplate / Data Plate
    const plateGeo = new THREE.BoxGeometry(0.65, 0.4, 0.03);
    const plate = new THREE.Mesh(plateGeo, polishedFlangeMat);
    plate.position.set(0, 0.3, 1.215);
    rootGroup.add(plate);

    // 8. Subtle Technical Laser Gauge Ring (Inspection Scanner)
    const scanRingGeo = new THREE.TorusGeometry(1.4, 0.008, 16, 64);
    const scanRing = new THREE.Mesh(scanRingGeo, laserScanMat);
    scanRing.rotation.x = Math.PI / 2;
    rootGroup.add(scanRing);

    // Dynamic Theme Lighting System
    const ambientLight = new THREE.AmbientLight(0x0e1726, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 2.4);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    const goldLight = new THREE.DirectionalLight(0xf59e0b, 0.9);
    goldLight.position.set(3, -4, -2);
    scene.add(goldLight);

    // Synchronize 3D lighting with Active Light / Dark Mode
    const updateThemeLighting = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        ambientLight.color.setHex(0x0e1726);
        ambientLight.intensity = 0.85;
        keyLight.intensity = 2.0;
        darkTitaniumMat.color.setHex(0x1e2638);
      } else {
        // High-end titanium / CAD studio lighting in Light mode
        ambientLight.color.setHex(0xdbeafe);
        ambientLight.intensity = 1.45;
        keyLight.intensity = 2.4;
        darkTitaniumMat.color.setHex(0x2a354d);
      }
    };
    updateThemeLighting();

    const themeObserver = new MutationObserver(updateThemeLighting);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial orientation
    rootGroup.rotation.x = 0.2;
    rootGroup.rotation.y = -0.55;

    // Mouse Tracking for subtle parallax
    let targetRotX = 0.2;
    let targetRotY = -0.55;
    let isTouch = false;

    const handlePointerMove = (e: MouseEvent) => {
      if (isTouch || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetRotY = -0.55 + normX * 0.35;
      targetRotX = 0.2 - normY * 0.25;
    };

    const handleTouchStart = () => {
      isTouch = true;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Intersection Observer (Performance: pause RAF when off-screen)
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

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Continuous extremely slow rotation if reduced motion is false
      if (!prefersReducedMotion) {
        rootGroup.rotation.y += 0.0018;
        targetRotY += 0.0018;

        // Scanner ring vertical sweep
        scanRing.position.y = Math.sin(elapsed * 1.2) * 1.5;
        scanRing.rotation.z = elapsed * 0.2;
      }

      // Smooth lerp towards target mouse rotation
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.04;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.04;

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

      // Memory cleanup
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
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[640px] flex items-center justify-center pointer-events-auto"
      aria-label="3D Pressure Vessel Inspection Component"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Floating Technical HUD Annotations */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 flex flex-col justify-between p-4 sm:p-6">
        {/* Top-Right Tag */}
        <div className="self-end inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/85 dark:bg-black/60 border border-slate-200 dark:border-white/15 backdrop-blur-md text-[11px] font-mono text-slate-700 dark:text-titanium-300 shadow-sm dark:shadow-glass">
          <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
          <span>VESSEL TAG: PV-401A • CL600</span>
        </div>

        {/* Mid-Left Annotation */}
        <div className="self-start hidden sm:flex flex-col gap-1 p-2.5 rounded-lg bg-white/85 dark:bg-black/60 border border-slate-200 dark:border-white/15 backdrop-blur-md text-[10px] font-mono text-slate-700 dark:text-titanium-300 shadow-sm dark:shadow-glass max-w-[210px]">
          <div className="text-emerald-deep dark:text-emerald-accent font-semibold tracking-wider flex items-center justify-between">
            <span>CIRC WELD #W-01</span>
            <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-accent/20 text-emerald-600 dark:text-emerald-400 font-bold">UT 100%</span>
          </div>
          <div className="text-slate-500 dark:text-titanium-400">Thickness: 38.5 mm</div>
          <div className="text-slate-500 dark:text-titanium-400">Alloy: SA-516 Gr 70</div>
        </div>

        {/* Bottom Technical Spec Strip */}
        <div className="self-end flex items-center gap-4 px-3.5 py-1.5 rounded-lg bg-white/85 dark:bg-black/60 border border-slate-200 dark:border-white/15 backdrop-blur-md text-[10px] font-mono text-slate-700 dark:text-titanium-300 shadow-sm dark:shadow-glass">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-titanium-400">STATUS:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">VERIFIED</span>
          </div>
          <div className="w-px h-3 bg-slate-300 dark:bg-white/20" />
          <div className="text-slate-500 dark:text-titanium-400 hidden sm:block">ASME SEC VIII DIV 1</div>
        </div>
      </div>
    </div>
  );
}
