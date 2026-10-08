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

    // 1. Dark Navy Core Sphere
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
    });

    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius);
      const pinGeo = new THREE.SphereGeometry(hub.isHQ ? 0.055 : 0.032, 16, 16);
      const pinMesh = new THREE.Mesh(pinGeo, hub.isHQ ? hqPinMat : pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      // Connection Arcs originating from HQ to international hubs
      if (!hub.isHQ) {
        const midPoint = new THREE.Vector3()
          .addVectors(hqPos, pos)
          .multiplyScalar(0.5);
        const distance = hqPos.distanceTo(pos);
        // Elevate midpoint above globe surface to create graceful 3D arc
        midPoint.normalize().multiplyScalar(globeRadius + distance * 0.28);

        const curve = new THREE.QuadraticBezierCurve3(hqPos, midPoint, pos);
        const curvePoints = curve.getPoints(36);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const arcMat = new THREE.LineBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.45,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        arcGroup.add(arcLine);
      }
    });

    // Outer Subtle Atmosphere Glow Ring
    const atmoRingGeo = new THREE.RingGeometry(globeRadius * 0.99, globeRadius * 1.05, 64);
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

      // Continuous gentle rotation if not dragging and not reduced motion
      if (!isDragging && !prefersReducedMotion) {
        globeGroup.rotation.y += 0.0018;
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
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center pointer-events-auto"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Floating HUD Badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-titanium-300">
        <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
        <span>UIIS GLOBAL COORDINATION NETWORK</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-titanium-400">
        <span className="text-emerald-accent">HQ:</span>
        <span className="text-white font-bold">AL-KHOBAR, SAUDI ARABIA</span>
      </div>
    </div>
  );
}
