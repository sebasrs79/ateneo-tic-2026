'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Interactive floating particles & neural network nodes
function NeuralNetworkMesh({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 320 : 900;
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const skyColor = new THREE.Color('#36d9ff');
    const redColor = new THREE.Color('#f83550');
    const blueColor = new THREE.Color('#147cf5');

    for (let i = 0; i < count; i++) {
      // Cylindrical / spherical spread across scene depth
      const radius = 18 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45;

      // Color distribution: mostly sky cyan, with neural accents of red and blue
      const rand = Math.random();
      const chosenColor = rand > 0.82 ? redColor : rand > 0.55 ? blueColor : skyColor;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Gentle rotation + parallax tracking
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.02;

    const targetX = mouseRef.current.x * 0.6;
    const targetY = mouseRef.current.y * 0.6;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.03;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.14 : 0.18}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Cyber perspective ground grid
function CyberPerspectiveGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((_, delta) => {
    if (!gridRef.current) return;
    // Slow futuristic travel effect
    gridRef.current.position.z = (gridRef.current.position.z + delta * 1.5) % 4;
  });

  return (
    <group position={[0, -12, -10]} rotation={[0.25, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[80, 40, '#36d9ff', '#0b264a']}
        position={[0, 0, 0]}
      />
    </group>
  );
}

// Luminous orbital data rings
function OrbitalTechRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.2;
      ring1.current.rotation.y += delta * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.25;
      ring2.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <group position={[12, 3, -15]}>
      <mesh ref={ring1}>
        <torusGeometry args={[5, 0.03, 16, 64]} />
        <meshBasicMaterial color="#36d9ff" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[6.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#f83550" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function SceneBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Test WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 pointer-events-none -z-20 bg-night"
        aria-hidden="true"
      />
    );
  }

  // Graceful CSS Fallback if WebGL isn't supported
  if (!webglSupported) {
    return (
      <div
        className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_#0b2246_0%,_#071325_70%)]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#36d9ff10_1px,transparent_1px),linear-gradient(to_bottom,#36d9ff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={isMobile ? [1, 1.3] : [1, 1.8]}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <NeuralNetworkMesh isMobile={isMobile} />
        {!isMobile && <CyberPerspectiveGrid />}
        {!isMobile && <OrbitalTechRings />}
      </Canvas>

      {/* Layered Cyber Atmosphere Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-night/40 to-night pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-red/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}
