"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

interface Props {
  activeStepIndex: number;
}

export default function WorkflowTimeline3D({ activeStepIndex }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  const activeIndexRef = useRef(activeStepIndex);
  useEffect(() => {
    activeIndexRef.current = activeStepIndex;
  }, [activeStepIndex]);

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
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0, 0);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 11 Waypoints in a sweeping 3D arc / S-curve
    const points: THREE.Vector3[] = [];
    const count = 11;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = (t - 0.5) * 6.2;
      const y = Math.sin(t * Math.PI) * 0.8 - 0.3;
      const z = Math.cos(t * Math.PI * 2) * 0.5;
      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);

    // Conduit Pipe Tube
    const tubeGeo = new THREE.TubeGeometry(curve, 96, 0.08, 16, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.3,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    rootGroup.add(tubeMesh);

    // Internal Laser Conduit Line
    const laserTubeGeo = new THREE.TubeGeometry(curve, 96, 0.015, 8, false);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.75,
    });
    const laserMesh = new THREE.Mesh(laserTubeGeo, laserMat);
    rootGroup.add(laserMesh);

    // 11 Milestone Node Beacons
    const nodeSpheres: THREE.Mesh[] = [];
    const nodeRings: THREE.Mesh[] = [];

    const inactiveMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.4,
    });

    const passedMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x10b981,
      emissiveIntensity: 0.2,
    });

    const activeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x34d399,
      emissiveIntensity: 0.85,
    });

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.9,
      wireframe: true,
    });

    points.forEach((pt, i) => {
      const sphereGeo = new THREE.SphereGeometry(0.16, 24, 24);
      const sphere = new THREE.Mesh(sphereGeo, inactiveMat);
      sphere.position.copy(pt);
      rootGroup.add(sphere);
      nodeSpheres.push(sphere);

      const rGeo = new THREE.TorusGeometry(0.24, 0.018, 12, 32);
      const ring = new THREE.Mesh(rGeo, ringMat);
      ring.position.copy(pt);
      ring.rotation.x = Math.PI / 2;
      ring.visible = false;
      rootGroup.add(ring);
      nodeRings.push(ring);
    });

    // Mobile Beacon Carrier
    const beaconGeo = new THREE.SphereGeometry(0.19, 24, 24);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    rootGroup.add(beacon);

    // Lighting
    const ambient = new THREE.AmbientLight(0x0e1726, 0.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimEmerald = new THREE.DirectionalLight(0x10b981, 2.4);
    rimEmerald.position.set(-4, -1, -3);
    scene.add(rimEmerald);

    rootGroup.rotation.x = 0.22;

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
    let currentT = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const targetIdx = activeIndexRef.current;
      const targetT = targetIdx / (count - 1);

      // Lerp beacon to target milestone
      currentT += (targetT - currentT) * 0.08;
      const beaconPos = curve.getPoint(Math.max(0, Math.min(1, currentT)));
      beacon.position.copy(beaconPos);

      // Update node materials based on active index
      nodeSpheres.forEach((sphere, i) => {
        if (i === targetIdx) {
          sphere.material = activeMat;
          sphere.scale.setScalar(1.2 + Math.sin(elapsed * 5) * 0.1);
          nodeRings[i].visible = true;
          nodeRings[i].rotation.z = elapsed * 1.5;
        } else if (i < targetIdx) {
          sphere.material = passedMat;
          sphere.scale.setScalar(1.0);
          nodeRings[i].visible = false;
        } else {
          sphere.material = inactiveMat;
          sphere.scale.setScalar(0.85);
          nodeRings[i].visible = false;
        }
      });

      if (!prefersReducedMotion) {
        rootGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
      className="relative w-full h-[180px] sm:h-[220px] flex items-center justify-center pointer-events-auto"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
