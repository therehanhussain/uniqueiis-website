"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

export type InspectionPointId = "MATERIAL" | "WELD" | "THICKNESS" | "SURFACE" | "DIMENSION" | "QUALITY";

export interface InspectionData {
  id: InspectionPointId;
  label: string;
  code: string;
  nominal: string;
  method: string;
  standard: string;
  status: "COMPLIANT" | "VERIFIED" | "ACCEPTED";
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
}

export const INSPECTION_POINTS: InspectionData[] = [
  {
    id: "MATERIAL",
    label: "Material Chemistry & Metallurgy",
    code: "SA-106 Gr. B / API 5L X52",
    nominal: "Carbon Eq: 0.38% max • Charpy V-Notch @ -20°C",
    method: "Positive Material Identification (PMI / XRF) + MTC Review",
    standard: "ASTM A106 / NACE MR0175",
    status: "VERIFIED",
    cameraPos: [-2.2, 1.4, 3.8],
    targetPos: [-1.2, 0.2, 0],
  },
  {
    id: "WELD",
    label: "Circumferential Butt Weld",
    code: "Joint #BW-01 • GTAW + SMAW",
    nominal: "Full Penetration V-Groove • 100% Volumetric",
    method: "Phased Array Ultrasonic (PAUT) & Visual 360° Inspection",
    standard: "ASME Sec IX / ASME B31.3",
    status: "ACCEPTED",
    cameraPos: [0, 1.8, 3.6],
    targetPos: [0, 0, 0],
  },
  {
    id: "THICKNESS",
    label: "Wall Thickness Verification",
    code: "Sch 160 Nominal (18.26 mm)",
    nominal: "Min Allowable: 15.98 mm • Measured: 18.42 mm",
    method: "Precision Digital Ultrasonic Thickness Gauge (UTG)",
    standard: "ASME Sec V Art. 5",
    status: "VERIFIED",
    cameraPos: [1.6, 1.6, 3.6],
    targetPos: [0.9, 0.4, 0],
  },
  {
    id: "SURFACE",
    label: "Surface Profile & Cleanliness",
    code: "SSPC-SP 10 / NACE No. 2",
    nominal: "Anchor Profile: 65 - 85 µm • Salt Contam: < 20 mg/m²",
    method: "Surface Profile Gauge & Bresle Soluble Salt Extraction",
    standard: "ISO 8501-1 / NACE SP0188",
    status: "COMPLIANT",
    cameraPos: [-2.6, -0.6, 3.5],
    targetPos: [-1.8, -0.2, 0],
  },
  {
    id: "DIMENSION",
    label: "Geometric & Flange Tolerances",
    code: "Class 600 Raised Face (RF)",
    nominal: "OAL: 1,850 mm ± 1.5 mm • Flange Tilt: < 0.25°",
    method: "Calibrated Vernier, Flange Square & Laser Alignment",
    standard: "ASME B16.5 / PFI ES-3",
    status: "ACCEPTED",
    cameraPos: [3.4, 1.0, 3.2],
    targetPos: [2.1, 0, 0],
  },
  {
    id: "QUALITY",
    label: "Hydrostatic & Quality Sign-Off",
    code: "ITP Hold Point #HP-08",
    nominal: "Proof Test: 22.8 MPa (1.5x DP) Held 120 mins",
    method: "Hydrostatic Proof Test + QA/QC Hard Stamp Witnessing",
    standard: "ISO 9001:2015 / Aramco QM",
    status: "COMPLIANT",
    cameraPos: [0.2, 2.8, 3.2],
    targetPos: [0, 0.8, 0],
  },
];

interface Props {
  activePoint: InspectionPointId;
  onSelectPoint: (id: InspectionPointId) => void;
}

export default function InspectionVessel3D({ activePoint, onSelectPoint }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  // References for camera tweening
  const camPosRef = useRef(new THREE.Vector3(0, 1.8, 4.2));
  const camTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const controlsTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  // Sync camera destination when activePoint changes
  useEffect(() => {
    const point = INSPECTION_POINTS.find((p) => p.id === activePoint);
    if (point) {
      camPosRef.current.set(...point.cameraPos);
      controlsTargetRef.current.set(...point.targetPos);
    }
  }, [activePoint]);

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
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 4.2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Engineering Materials
    const titaniumPipeMat = new THREE.MeshStandardMaterial({
      color: 0x242e42,
      metalness: 0.88,
      roughness: 0.28,
    });

    const flangeForgedMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.92,
      roughness: 0.22,
    });

    const machinedFaceMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.14,
    });

    const valveBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.35,
    });

    const weldBeadMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x10b981,
      emissiveIntensity: 0.35,
      metalness: 0.75,
      roughness: 0.3,
    });

    const studBoltMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.9,
      roughness: 0.25,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
    });

    const indicatorMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    // 1. Horizontal Pipe Body (Left Spool: L = 1.6, Right Spool: L = 1.6)
    const pipeGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.8, 36);

    const leftPipe = new THREE.Mesh(pipeGeo, titaniumPipeMat);
    leftPipe.rotation.z = Math.PI / 2;
    leftPipe.position.x = -1.0;
    rootGroup.add(leftPipe);

    const rightPipe = new THREE.Mesh(pipeGeo, titaniumPipeMat);
    rightPipe.rotation.z = Math.PI / 2;
    rightPipe.position.x = 1.0;
    rootGroup.add(rightPipe);

    // 2. Central Flange / Valve Assembly (Center at x = 0)
    const valveChestGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.65, 32);
    const valveChest = new THREE.Mesh(valveChestGeo, valveBodyMat);
    valveChest.rotation.z = Math.PI / 2;
    rootGroup.add(valveChest);

    // Valve Bonnet & Stem
    const bonnetGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.9, 24);
    const bonnet = new THREE.Mesh(bonnetGeo, valveBodyMat);
    bonnet.position.y = 0.7;
    rootGroup.add(bonnet);

    const handwheelRimGeo = new THREE.TorusGeometry(0.48, 0.04, 16, 32);
    const handwheel = new THREE.Mesh(handwheelRimGeo, goldAccentMat);
    handwheel.rotation.x = Math.PI / 2;
    handwheel.position.y = 1.25;
    rootGroup.add(handwheel);

    // 3. Circumferential Butt Weld Joint (WELD point at x = -0.55)
    const weldGeo = new THREE.TorusGeometry(0.556, 0.024, 16, 48);
    const weld = new THREE.Mesh(weldGeo, weldBeadMat);
    weld.rotation.y = Math.PI / 2;
    weld.position.x = -0.55;
    rootGroup.add(weld);

    // 4. Ultrasonic Probe Indicator (THICKNESS point at x = 0.85)
    const probeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 16);
    const probe = new THREE.Mesh(probeGeo, goldAccentMat);
    probe.position.set(0.85, 0.64, 0);
    rootGroup.add(probe);

    // 5. Heavy Weld Neck Flanges at both ends
    const flangeGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.2, 36);
    const raisedFaceGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.06, 36);
    const boltGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 12);

    const makeFlange = (posX: number, flip: boolean) => {
      const fGroup = new THREE.Group();
      fGroup.position.x = posX;
      fGroup.rotation.z = Math.PI / 2;

      const fMesh = new THREE.Mesh(flangeGeo, flangeForgedMat);
      fGroup.add(fMesh);

      const rfMesh = new THREE.Mesh(raisedFaceGeo, machinedFaceMat);
      rfMesh.position.y = flip ? -0.12 : 0.12;
      fGroup.add(rfMesh);

      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        const b = new THREE.Mesh(boltGeo, studBoltMat);
        b.position.set(Math.cos(ang) * 0.76, 0, Math.sin(ang) * 0.76);
        fGroup.add(b);
      }
      return fGroup;
    };

    rootGroup.add(makeFlange(-1.95, true));
    rootGroup.add(makeFlange(1.95, false));

    // 6. Laser Inspection Ring Scanner (moves dynamically)
    const laserReticleGeo = new THREE.TorusGeometry(0.68, 0.015, 16, 48);
    const laserReticle = new THREE.Mesh(laserReticleGeo, indicatorMat);
    laserReticle.rotation.y = Math.PI / 2;
    rootGroup.add(laserReticle);

    // Lighting
    const ambient = new THREE.AmbientLight(0x0e1726, 0.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimEmerald = new THREE.DirectionalLight(0x10b981, 2.4);
    rimEmerald.position.set(-6, -2, -4);
    scene.add(rimEmerald);

    const warmFill = new THREE.DirectionalLight(0xf59e0b, 0.8);
    warmFill.position.set(2, -4, 3);
    scene.add(warmFill);

    // Synchronize 3D Lighting with Light / Dark theme
    const updateThemeLighting = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        ambient.color.setHex(0x0e1726);
        ambient.intensity = 0.9;
        keyLight.intensity = 2.2;
        titaniumPipeMat.color.setHex(0x242e42);
      } else {
        ambient.color.setHex(0xdbeafe);
        ambient.intensity = 1.5;
        keyLight.intensity = 2.5;
        titaniumPipeMat.color.setHex(0x334155);
      }
    };
    updateThemeLighting();

    const themeObserver = new MutationObserver(updateThemeLighting);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Pointer Drag / Orbit
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

      rootGroup.rotation.y += deltaX * 0.005;
      rootGroup.rotation.x += deltaY * 0.005;
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
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
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

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation towards selected point
      camera.position.lerp(camPosRef.current, 0.04);
      camTargetRef.current.lerp(controlsTargetRef.current, 0.04);
      camera.lookAt(camTargetRef.current);

      // Idle rotation when not dragging
      if (!isDragging && !prefersReducedMotion) {
        rootGroup.rotation.y += 0.0015;
      }

      // Scanner laser oscillation
      if (!prefersReducedMotion) {
        laserReticle.position.x = Math.sin(elapsed * 1.5) * 1.4;
      }

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
      className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center pointer-events-auto"
      aria-label="3D Spool Assembly Interactive Inspection"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
