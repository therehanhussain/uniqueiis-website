"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

interface Props {
  activeDiscipline: string;
}

export default function CapabilitiesMachinery3D({ activeDiscipline }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  const activeRef = useRef(activeDiscipline);
  useEffect(() => {
    activeRef.current = activeDiscipline;
  }, [activeDiscipline]);

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
    camera.position.set(0, 1.8, 5.0);
    camera.lookAt(0, 0, 0);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Standard Industrial Materials
    const baseMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.88,
      roughness: 0.3,
    });

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.92,
      roughness: 0.22,
    });

    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x10b981,
      emissiveIntensity: 0.65,
      metalness: 0.8,
      roughness: 0.2,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
    });

    // 1. Skid Frame (Structural Steel & Mechanical)
    const skidGroup = new THREE.Group();
    rootGroup.add(skidGroup);

    const skidBaseGeo = new THREE.BoxGeometry(3.6, 0.15, 2.0);
    const skidMesh = new THREE.Mesh(skidBaseGeo, baseMetalMat);
    skidMesh.position.y = -0.9;
    skidGroup.add(skidMesh);

    // I-beam longitudinal flanges
    const beamGeo = new THREE.BoxGeometry(3.6, 0.25, 0.1);
    const beamFront = new THREE.Mesh(beamGeo, steelMat);
    beamFront.position.set(0, -0.75, 0.95);
    skidGroup.add(beamFront);

    const beamBack = new THREE.Mesh(beamGeo, steelMat);
    beamBack.position.set(0, -0.75, -0.95);
    skidGroup.add(beamBack);

    // 2. Rotating Turbine / Pump Volute Casing (Rotating Equipment)
    const rotatingGroup = new THREE.Group();
    rootGroup.add(rotatingGroup);

    const pumpCasingGeo = new THREE.CylinderGeometry(0.75, 0.85, 0.8, 36);
    const pumpCasing = new THREE.Mesh(pumpCasingGeo, baseMetalMat);
    pumpCasing.rotation.z = Math.PI / 2;
    pumpCasing.position.set(-0.5, -0.2, 0);
    rotatingGroup.add(pumpCasing);

    // Impeller rotor shaft
    const shaftGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.6, 24);
    const shaft = new THREE.Mesh(shaftGeo, steelMat);
    shaft.rotation.z = Math.PI / 2;
    shaft.position.set(-0.5, -0.2, 0);
    rotatingGroup.add(shaft);

    // Impeller Blades ring
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(-0.5, -0.2, 0);
    for (let i = 0; i < 6; i++) {
      const bladeGeo = new THREE.BoxGeometry(0.1, 0.55, 0.05);
      const blade = new THREE.Mesh(bladeGeo, goldAccentMat);
      blade.rotation.x = (i / 6) * Math.PI * 2;
      blade.position.y = 0.28;
      rotorGroup.add(blade);
    }
    rotatingGroup.add(rotorGroup);

    // 3. Piping Spool (Piping)
    const pipingGroup = new THREE.Group();
    rootGroup.add(pipingGroup);

    const pipeGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.4, 32);
    const dischargePipe = new THREE.Mesh(pipeGeo, baseMetalMat);
    dischargePipe.position.set(-0.5, 0.7, 0);
    pipingGroup.add(dischargePipe);

    // 4. Heavy Industrial Valve & Actuator (Valves)
    const valvesGroup = new THREE.Group();
    rootGroup.add(valvesGroup);

    const valveGeo = new THREE.BoxGeometry(0.7, 0.5, 0.5);
    const valveBody = new THREE.Mesh(valveGeo, steelMat);
    valveBody.position.set(-0.5, 0.75, 0);
    valvesGroup.add(valveBody);

    const actuatorStemGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
    const actuatorStem = new THREE.Mesh(actuatorStemGeo, steelMat);
    actuatorStem.position.set(-0.5, 1.15, 0);
    valvesGroup.add(actuatorStem);

    const handwheelGeo = new THREE.TorusGeometry(0.35, 0.035, 12, 24);
    const handwheel = new THREE.Mesh(handwheelGeo, goldAccentMat);
    handwheel.rotation.x = Math.PI / 2;
    handwheel.position.set(-0.5, 1.45, 0);
    valvesGroup.add(handwheel);

    // 5. Electric Motor Drive Unit (Electrical & Instrumentation)
    const electricalGroup = new THREE.Group();
    rootGroup.add(electricalGroup);

    const motorGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.2, 32);
    const motorMesh = new THREE.Mesh(motorGeo, baseMetalMat);
    motorMesh.rotation.z = Math.PI / 2;
    motorMesh.position.set(0.9, -0.2, 0);
    electricalGroup.add(motorMesh);

    // Motor Terminal Box (Junction Box)
    const jBoxGeo = new THREE.BoxGeometry(0.35, 0.25, 0.35);
    const jBox = new THREE.Mesh(jBoxGeo, steelMat);
    jBox.position.set(0.9, 0.45, 0);
    electricalGroup.add(jBox);

    // Rigid Electrical Conduit
    const conduitGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 12);
    const conduit = new THREE.Mesh(conduitGeo, steelMat);
    conduit.position.set(0.9, 0.2, 0.2);
    electricalGroup.add(conduit);

    // Lighting
    const ambient = new THREE.AmbientLight(0x0e1726, 0.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimEmerald = new THREE.DirectionalLight(0x10b981, 2.4);
    rimEmerald.position.set(-5, 2, -4);
    scene.add(rimEmerald);

    const goldLight = new THREE.DirectionalLight(0xf59e0b, 0.8);
    goldLight.position.set(3, -4, 2);
    scene.add(goldLight);

    // Dynamic Theme Lighting Synchronization
    const updateThemeLighting = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        ambient.color.setHex(0x0e1726);
        ambient.intensity = 0.9;
        keyLight.intensity = 2.2;
        baseMetalMat.color.setHex(0x1e293b);
      } else {
        ambient.color.setHex(0xdbeafe);
        ambient.intensity = 1.5;
        keyLight.intensity = 2.5;
        baseMetalMat.color.setHex(0x2d3a54);
      }
    };
    updateThemeLighting();

    const themeObserver = new MutationObserver(updateThemeLighting);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    rootGroup.rotation.x = 0.3;
    rootGroup.rotation.y = -0.55;

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
      const activeName = (activeRef.current || "").toLowerCase();

      // Dynamic Highlight Based on Active Discipline
      if (activeName.includes("rotating")) {
        pumpCasing.material = highlightMat;
      } else {
        pumpCasing.material = baseMetalMat;
      }

      if (activeName.includes("valves")) {
        valveBody.material = highlightMat;
      } else {
        valveBody.material = steelMat;
      }

      if (activeName.includes("piping")) {
        dischargePipe.material = highlightMat;
      } else {
        dischargePipe.material = baseMetalMat;
      }

      if (activeName.includes("electrical") || activeName.includes("instrumentation")) {
        motorMesh.material = highlightMat;
      } else {
        motorMesh.material = baseMetalMat;
      }

      if (activeName.includes("structural") || activeName.includes("mechanical")) {
        skidMesh.material = highlightMat;
      } else {
        skidMesh.material = baseMetalMat;
      }

      // Impeller rotation
      if (!prefersReducedMotion) {
        rotorGroup.rotation.x += 0.03;
      }

      // Subtle ambient orbit when idle
      if (!isDragging && !prefersReducedMotion) {
        rootGroup.rotation.y += 0.0015;
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
      className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center pointer-events-auto"
      aria-label="3D Machinery Technical Cross-Discipline Assembly"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
