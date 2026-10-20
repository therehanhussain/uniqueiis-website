"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

export type NDTMethodType = "UT" | "RT" | "MT" | "PT" | "VT";

interface Props {
  method: NDTMethodType;
}

export default function NDTVisualizer3D({ method }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  // Keep a ref to the current method so the Three.js loop updates dynamically
  const methodRef = useRef<NDTMethodType>(method);
  useEffect(() => {
    methodRef.current = method;
  }, [method]);

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
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.4, 4.8);
    camera.lookAt(0, 0, 0);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- Common Base: Industrial Welded Steel Test Specimen ---
    const steelBlockMat = new THREE.MeshStandardMaterial({
      color: 0x5a6d84, // Clean machined industrial steel
      metalness: 0.72,
      roughness: 0.30,
    });

    const weldMetalMat = new THREE.MeshStandardMaterial({
      color: 0x9fb3c8, // High-sheen welded metal crown / seam
      metalness: 0.85,
      roughness: 0.18,
    });

    // Main steel plates (Left plate & Right plate with bevel joint)
    const plateGeo = new THREE.BoxGeometry(1.6, 0.45, 2.2);

    const leftPlate = new THREE.Mesh(plateGeo, steelBlockMat);
    leftPlate.position.set(-0.95, -0.225, 0);
    rootGroup.add(leftPlate);

    const rightPlate = new THREE.Mesh(plateGeo, steelBlockMat);
    rightPlate.position.set(0.95, -0.225, 0);
    rootGroup.add(rightPlate);

    // Center Butt-Weld Crown / Joint Seam
    const weldGeo = new THREE.CylinderGeometry(0.18, 0.28, 2.2, 24);
    const weldCrown = new THREE.Mesh(weldGeo, weldMetalMat);
    weldCrown.rotation.x = Math.PI / 2;
    weldCrown.position.set(0, 0.04, 0);
    rootGroup.add(weldCrown);

    // --- Dynamic Visualization Groups per Method ---
    // 1. UT Group (Ultrasonic Testing)
    const utGroup = new THREE.Group();
    rootGroup.add(utGroup);

    // Realistic Industrial Angle-Beam Ultrasonic Transducer Probe
    const probeGroup = new THREE.Group();
    probeGroup.position.set(-0.55, 0.0, 0.25);
    utGroup.add(probeGroup);

    // 1a. Angled Perspex / Rexolite Wedge Shoe (base of angle beam probe)
    const wedgeGeo = new THREE.BoxGeometry(0.32, 0.14, 0.36);
    const wedgeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      metalness: 0.1,
      roughness: 0.1,
    });
    const wedgeMesh = new THREE.Mesh(wedgeGeo, wedgeMat);
    wedgeMesh.position.set(0, 0.07, 0);
    probeGroup.add(wedgeMesh);

    // 1b. Transducer Metal Housing (Gold/Brass anodized casing)
    const probeBodyMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.78,
      roughness: 0.22,
    });
    const probeBodyGeo = new THREE.BoxGeometry(0.28, 0.26, 0.32);
    const probeBody = new THREE.Mesh(probeBodyGeo, probeBodyMat);
    probeBody.rotation.z = -0.22; // angled beam transducer orientation
    probeBody.position.set(-0.02, 0.24, 0);
    probeGroup.add(probeBody);

    // 1c. Lemo Coaxial Cable Connector on top
    const connectorGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.12, 16);
    const connectorMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.15,
    });
    const connector = new THREE.Mesh(connectorGeo, connectorMat);
    connector.position.set(-0.04, 0.42, 0);
    probeGroup.add(connector);

    // 1d. Coaxial Cable Lead
    const cableCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.04, 0.48, 0),
      new THREE.Vector3(-0.15, 0.8, -0.1),
      new THREE.Vector3(-0.4, 0.95, -0.3)
    );
    const cableGeo = new THREE.TubeGeometry(cableCurve, 16, 0.016, 8, false);
    const cableMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
    });
    const cableMesh = new THREE.Mesh(cableGeo, cableMat);
    probeGroup.add(cableMesh);

    // 2. Internal Weld Flaw / Defect (Root Planar Crack / Lack of Fusion)
    const defectMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Vivid warning red flaw
      emissive: 0xef4444,
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.3,
    });
    const defectGeo = new THREE.BoxGeometry(0.06, 0.14, 0.32);
    const internalDefect = new THREE.Mesh(defectGeo, defectMat);
    internalDefect.position.set(0, -0.16, 0.25);
    utGroup.add(internalDefect);

    // 3. Sound Beam & Wave Pulses (45-degree angled sound path toward defect)
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Emerald ultrasonic pulse waves
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });
    const waveArcs: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const arcGeo = new THREE.RingGeometry(0.08 + i * 0.08, 0.12 + i * 0.08, 24);
      const arc = new THREE.Mesh(arcGeo, waveMat.clone());
      arc.rotation.y = Math.PI / 2;
      arc.rotation.z = -Math.PI / 4; // 45 degree shear wave
      arc.position.set(-0.55 + i * 0.12, 0.04 - i * 0.05, 0.25);
      utGroup.add(arc);
      waveArcs.push(arc);
    }

    // 2. RT Group (Radiographic Testing)
    const rtGroup = new THREE.Group();
    rootGroup.add(rtGroup);

    // Radiation Source Tube Head
    const sourceGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.5, 24);
    const sourceMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.2,
    });
    const rtSource = new THREE.Mesh(sourceGeo, sourceMat);
    rtSource.position.set(0, 1.4, 0);
    rtGroup.add(rtSource);

    // Radiation Conical Beam (transparent warm gold)
    const beamGeo = new THREE.ConeGeometry(1.2, 1.5, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    const rtBeam = new THREE.Mesh(beamGeo, beamMat);
    rtBeam.position.set(0, 0.65, 0);
    rtGroup.add(rtBeam);

    // Digital Detector Array / Film Plate underneath
    const detectorGeo = new THREE.BoxGeometry(1.4, 0.04, 2.0);
    const detectorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x059669,
      emissiveIntensity: 0.3,
      metalness: 0.5,
    });
    const detectorPlate = new THREE.Mesh(detectorGeo, detectorMat);
    detectorPlate.position.set(0, -0.48, 0);
    rtGroup.add(detectorPlate);

    // 3. MT Group (Magnetic Particle Testing)
    const mtGroup = new THREE.Group();
    rootGroup.add(mtGroup);

    // AC/DC Electromagnetic Yoke
    const yokeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.25,
    });
    const yokeLegGeo = new THREE.BoxGeometry(0.18, 0.7, 0.2);
    const yokeLeg1 = new THREE.Mesh(yokeLegGeo, yokeMat);
    yokeLeg1.position.set(-0.6, 0.35, 0);
    mtGroup.add(yokeLeg1);

    const yokeLeg2 = new THREE.Mesh(yokeLegGeo, yokeMat);
    yokeLeg2.position.set(0.6, 0.35, 0);
    mtGroup.add(yokeLeg2);

    const yokeBarGeo = new THREE.BoxGeometry(1.38, 0.2, 0.2);
    const yokeBar = new THREE.Mesh(yokeBarGeo, yokeMat);
    yokeBar.position.set(0, 0.7, 0);
    mtGroup.add(yokeBar);

    // Magnetic Flux Lines
    const fluxLines: THREE.Line[] = [];
    for (let i = 0; i < 5; i++) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.6, 0.05, -0.4 + i * 0.2),
        new THREE.Vector3(0, 0.2, -0.4 + i * 0.2),
        new THREE.Vector3(0.6, 0.05, -0.4 + i * 0.2)
      );
      const pts = curve.getPoints(24);
      const fluxGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const fluxMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
      });
      const fluxLine = new THREE.Line(fluxGeo, fluxMat);
      mtGroup.add(fluxLine);
      fluxLines.push(fluxLine);
    }

    // 4. PT Group (Liquid Penetrant Testing)
    const ptGroup = new THREE.Group();
    rootGroup.add(ptGroup);

    // White Developer Layer
    const devGeo = new THREE.PlaneGeometry(1.2, 1.8);
    const devMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.8,
      metalness: 0.1,
    });
    const devPlane = new THREE.Mesh(devGeo, devMat);
    devPlane.rotation.x = -Math.PI / 2;
    devPlane.position.set(0, 0.05, 0);
    ptGroup.add(devPlane);

    // Red Dye Penetrant Bleed Indication Line
    const bleedGeo = new THREE.PlaneGeometry(0.04, 0.9);
    const bleedMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, // Red dye
    });
    const bleedMark = new THREE.Mesh(bleedGeo, bleedMat);
    bleedMark.rotation.x = -Math.PI / 2;
    bleedMark.position.set(0, 0.052, 0);
    ptGroup.add(bleedMark);

    // 5. VT Group (Visual Testing)
    const vtGroup = new THREE.Group();
    rootGroup.add(vtGroup);

    // Borescope / Inspection Camera
    const camGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 24);
    const camMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.2,
    });
    const vtCamera = new THREE.Mesh(camGeo, camMat);
    vtCamera.rotation.z = Math.PI / 4;
    vtCamera.position.set(-0.3, 0.5, 0);
    vtGroup.add(vtCamera);

    // Inspection Spotlight Beam
    const spotGeo = new THREE.ConeGeometry(0.5, 0.8, 24, 1, true);
    const spotMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    });
    const lightCone = new THREE.Mesh(spotGeo, spotMat);
    lightCone.rotation.z = Math.PI / 4;
    lightCone.position.set(-0.15, 0.35, 0);
    vtGroup.add(lightCone);

    // --- Balanced Multi-Source Industrial Lighting ---
    // 1. Ambient Light: Soft ambient base so dark tones are visible
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambient);

    // 2. Hemisphere Light: Natural skylight (silver-blue) & ground reflection (slate)
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.3);
    hemiLight.position.set(0, 8, 0);
    scene.add(hemiLight);

    // 3. Key Directional Light: Crisp highlights on metallic surfaces
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // 4. Fill Directional Light: Cool industrial blue fill on left/rear surfaces
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);

    // 5. Emerald Accent Rim: Distinct brand engineering edge highlight
    const rimEmerald = new THREE.DirectionalLight(0x10b981, 1.6);
    rimEmerald.position.set(-4, -2, -4);
    scene.add(rimEmerald);

    // 6. Front Specular Fill: Directly illuminates inspection faces towards camera
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.9);
    frontLight.position.set(0, 3, 6);
    scene.add(frontLight);

    // Dynamic Theme Lighting Synchronization
    const updateThemeLighting = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        ambient.color.setHex(0xe2e8f0);
        ambient.intensity = 0.75;
        hemiLight.intensity = 1.3;
        keyLight.intensity = 2.6;
        steelBlockMat.color.setHex(0x52657a);
        weldMetalMat.color.setHex(0x9fb3c8);
      } else {
        ambient.color.setHex(0xffffff);
        ambient.intensity = 0.95;
        hemiLight.intensity = 1.4;
        keyLight.intensity = 2.8;
        steelBlockMat.color.setHex(0x64748b);
        weldMetalMat.color.setHex(0xa8bccf);
      }
    };
    updateThemeLighting();

    const themeObserver = new MutationObserver(updateThemeLighting);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    rootGroup.rotation.x = 0.4;
    rootGroup.rotation.y = -0.5;

    // Pointer Drag
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

      rootGroup.rotation.y += deltaX * 0.005;
      rootGroup.rotation.x += deltaY * 0.005;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

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
      const currentM = methodRef.current;

      // Visibility toggles
      utGroup.visible = currentM === "UT";
      rtGroup.visible = currentM === "RT";
      mtGroup.visible = currentM === "MT";
      ptGroup.visible = currentM === "PT";
      vtGroup.visible = currentM === "VT";

      if (!isDragging && !prefersReducedMotion) {
        rootGroup.rotation.y += 0.002;
      }

      // Method-specific animations
      if (!prefersReducedMotion) {
        if (currentM === "UT") {
          // Animate ultrasonic wave propagation along the 45-degree sound path
          waveArcs.forEach((arc, idx) => {
            const waveOffset = (elapsed * 1.6 + idx * 0.25) % 1.0;
            // From probe at (-0.55, 0.04, 0.25) to defect at (0, -0.16, 0.25)
            arc.position.x = -0.55 + waveOffset * 0.55;
            arc.position.y = 0.04 - waveOffset * 0.20;
            arc.scale.setScalar(0.7 + waveOffset * 0.6);
            const mat = arc.material as THREE.MeshBasicMaterial;
            mat.opacity = Math.sin(waveOffset * Math.PI) * 0.85;
          });
          // Defect echo pulse (blinks with detection feedback when waves arrive)
          defectMat.emissiveIntensity = 0.5 + Math.sin(elapsed * 4.5) * 0.45;
        } else if (currentM === "RT") {
          // Subtle pulsation of radiation cone
          rtBeam.scale.set(
            1 + Math.sin(elapsed * 4) * 0.04,
            1,
            1 + Math.sin(elapsed * 4) * 0.04
          );
        } else if (currentM === "MT") {
          // Yoke flux oscillation
          fluxLines.forEach((fl, idx) => {
            const mat = fl.material as THREE.LineBasicMaterial;
            mat.opacity = 0.4 + Math.sin(elapsed * 6 + idx) * 0.35;
          });
        } else if (currentM === "PT") {
          // Bleed out pulsation
          bleedMark.scale.set(
            1 + Math.sin(elapsed * 3) * 0.15,
            1,
            1
          );
        } else if (currentM === "VT") {
          // Scan sweep along weld
          lightCone.position.z = Math.sin(elapsed * 1.5) * 0.6;
          vtCamera.position.z = Math.sin(elapsed * 1.5) * 0.6;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
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
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center pointer-events-auto"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
