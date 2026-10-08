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
      color: 0x242e42,
      metalness: 0.85,
      roughness: 0.32,
    });

    const weldMetalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.25,
    });

    // Main steel plates (Left plate & Right plate with bevel joint)
    const plateGeo = new THREE.BoxGeometry(1.6, 0.45, 2.2);

    const leftPlate = new THREE.Mesh(plateGeo, steelBlockMat);
    leftPlate.position.set(-0.95, -0.225, 0);
    rootGroup.add(leftPlate);

    const rightPlate = new THREE.Mesh(plateGeo, steelBlockMat);
    rightPlate.position.set(0.95, -0.225, 0);
    rootGroup.add(rightPlate);

    // Center Butt-Weld Crown
    const weldGeo = new THREE.CylinderGeometry(0.18, 0.28, 2.2, 24);
    const weldCrown = new THREE.Mesh(weldGeo, weldMetalMat);
    weldCrown.rotation.x = Math.PI / 2;
    weldCrown.position.set(0, 0.04, 0);
    rootGroup.add(weldCrown);

    // --- Dynamic Visualization Groups per Method ---
    // 1. UT Group (Ultrasonic Testing)
    const utGroup = new THREE.Group();
    rootGroup.add(utGroup);

    // Probe
    const probeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Brass/Gold probe body
      metalness: 0.8,
      roughness: 0.2,
    });
    const probeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.4);
    const utProbe = new THREE.Mesh(probeGeo, probeMat);
    utProbe.position.set(-0.45, 0.2, 0);
    utGroup.add(utProbe);

    // Wave pulses (3 sound wave arcs)
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });
    const waveArcs: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const arcGeo = new THREE.RingGeometry(0.15 + i * 0.18, 0.18 + i * 0.18, 24);
      const arc = new THREE.Mesh(arcGeo, waveMat);
      arc.rotation.x = Math.PI / 2;
      arc.position.set(-0.45 + i * 0.12, -0.05 - i * 0.08, 0);
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

    // Electromagnetic Yoke (U-shape body)
    const yokeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.8,
      roughness: 0.3,
    });
    const yokeBarGeo = new THREE.BoxGeometry(1.2, 0.22, 0.25);
    const yokeBar = new THREE.Mesh(yokeBarGeo, yokeMat);
    yokeBar.position.set(0, 0.6, 0);
    mtGroup.add(yokeBar);

    const legGeo = new THREE.BoxGeometry(0.2, 0.5, 0.25);
    const leftLeg = new THREE.Mesh(legGeo, yokeMat);
    leftLeg.position.set(-0.5, 0.3, 0);
    mtGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, yokeMat);
    rightLeg.position.set(0.5, 0.3, 0);
    mtGroup.add(rightLeg);

    // Magnetic flux curve lines
    const fluxLines: THREE.Line[] = [];
    for (let f = 0; f < 5; f++) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.45, 0.05, (f - 2) * 0.25),
        new THREE.Vector3(0, 0.35, (f - 2) * 0.25),
        new THREE.Vector3(0.45, 0.05, (f - 2) * 0.25)
      );
      const points = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      mtGroup.add(line);
      fluxLines.push(line);
    }

    // 4. PT Group (Penetrant Testing)
    const ptGroup = new THREE.Group();
    rootGroup.add(ptGroup);

    // White Developer Layer
    const devLayerGeo = new THREE.PlaneGeometry(1.2, 1.8);
    const devLayerMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
      metalness: 0.05,
      transparent: true,
      opacity: 0.85,
    });
    const devLayer = new THREE.Mesh(devLayerGeo, devLayerMat);
    devLayer.rotation.x = -Math.PI / 2;
    devLayer.position.set(0, 0.06, 0);
    ptGroup.add(devLayer);

    // Red Dye Penetrant Bleed-Out Indication along crack
    const indicationGeo = new THREE.PlaneGeometry(0.08, 0.6);
    const indicationMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48, // Vivid scarlet red penetrant indication
      side: THREE.DoubleSide,
    });
    const bleedMark = new THREE.Mesh(indicationGeo, indicationMat);
    bleedMark.rotation.x = -Math.PI / 2;
    bleedMark.position.set(0, 0.065, 0);
    ptGroup.add(bleedMark);

    // 5. VT Group (Visual Testing)
    const vtGroup = new THREE.Group();
    rootGroup.add(vtGroup);

    // High precision optical borescope / inspection camera
    const camBodyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 24);
    const camMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const vtCamera = new THREE.Mesh(camBodyGeo, camMat);
    vtCamera.rotation.z = Math.PI / 3;
    vtCamera.position.set(-0.6, 0.8, 0);
    vtGroup.add(vtCamera);

    // Spotlight Cone onto weld
    const spotGeo = new THREE.ConeGeometry(0.5, 0.9, 24, 1, true);
    const spotMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const lightCone = new THREE.Mesh(spotGeo, spotMat);
    lightCone.rotation.z = -Math.PI / 4;
    lightCone.position.set(-0.25, 0.45, 0);
    vtGroup.add(lightCone);

    // Lighting
    const ambient = new THREE.AmbientLight(0x0e1726, 0.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimEmerald = new THREE.DirectionalLight(0x10b981, 2.2);
    rimEmerald.position.set(-5, -2, -3);
    scene.add(rimEmerald);

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
          // Pulse waves
          waveArcs.forEach((arc, idx) => {
            const waveOffset = (elapsed * 2 + idx * 0.3) % 1.2;
            arc.scale.setScalar(0.7 + waveOffset * 0.5);
            arc.position.x = -0.45 + waveOffset * 0.4;
            arc.position.y = -0.05 - waveOffset * 0.25;
          });
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
