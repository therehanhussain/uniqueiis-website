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

    const valveChestGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.45, 24);
    const valveChest = new THREE.Mesh(valveChestGeo, baseMetalMat);
    valveChest.position.set(-0.5, 1.1, 0);
    valvesGroup.add(valveChest);

    const actuatorStemGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
    const actuatorStem = new THREE.Mesh(actuatorStemGeo, steelMat);
    actuatorStem.position.set(-0.5, 1.5, 0);
    valvesGroup.add(actuatorStem);

    const handwheelGeo = new THREE.TorusGeometry(0.32, 0.035, 16, 24);
    const handwheel = new THREE.Mesh(handwheelGeo, goldAccentMat);
    handwheel.rotation.x = Math.PI / 2;
    handwheel.position.set(-0.5, 1.75, 0);
    valvesGroup.add(handwheel);

    // 5. GRE/GRP Sleeve / Composite Section
    const grpGroup = new THREE.Group();
    rootGroup.add(grpGroup);

    const grpSleeveGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.6, 32);
    const grpMat = new THREE.MeshStandardMaterial({
      color: 0x047857,
      metalness: 0.4,
      roughness: 0.5,
    });
    const grpSleeve = new THREE.Mesh(grpSleeveGeo, grpMat);
    grpSleeve.position.set(-0.5, 0.3, 0);
    grpGroup.add(grpSleeve);

    // 6. Electric Motor Drive & Terminal Box (Electrical & Instrumentation)
    const electricalGroup = new THREE.Group();
    rootGroup.add(electricalGroup);

    const motorGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.2, 32);
    const motor = new THREE.Mesh(motorGeo, baseMetalMat);
    motor.rotation.z = Math.PI / 2;
    motor.position.set(0.9, -0.2, 0);
    electricalGroup.add(motor);

    // Junction Box
    const jBoxGeo = new THREE.BoxGeometry(0.4, 0.45, 0.4);
    const jBox = new THREE.Mesh(jBoxGeo, baseMetalMat);
    jBox.position.set(0.9, 0.45, 0);
    electricalGroup.add(jBox);

    // Conduit wire tubing
    const conduitGeo = new THREE.TorusGeometry(0.25, 0.04, 12, 24, Math.PI);
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
      const disc = activeRef.current.toLowerCase();

      // Slow smooth idle rotation
      if (!isDragging && !prefersReducedMotion) {
        rootGroup.rotation.y += 0.0018;
        rotorGroup.rotation.x = elapsed * 2.5; // Impeller spins smoothly
      }

      // Dynamic Highlight switching
      const isRotating = disc.includes("rotating");
      const isPiping = disc.includes("piping");
      const isValves = disc.includes("valve");
      const isGrp = disc.includes("gre") || disc.includes("grp");
      const isStructural = disc.includes("structural") || disc.includes("mechanical");
      const isElectrical = disc.includes("electrical") || disc.includes("instrumentation");

      pumpCasing.material = isRotating ? highlightMat : baseMetalMat;
      dischargePipe.material = isPiping ? highlightMat : baseMetalMat;
      valveChest.material = isValves ? highlightMat : baseMetalMat;
      grpSleeve.material = isGrp ? highlightMat : grpMat;
      skidMesh.material = isStructural ? highlightMat : baseMetalMat;
      motor.material = isElectrical ? highlightMat : baseMetalMat;
      jBox.material = isElectrical ? highlightMat : baseMetalMat;

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
      className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center pointer-events-auto"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-titanium-300">
        <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
        <span>3D ASSEMBLY • ACTIVE FOCUS: {activeDiscipline.toUpperCase()}</span>
      </div>

      <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-titanium-400">
        <span>DRAG TO INSPECT SKID</span>
      </div>
    </div>
  );
}
