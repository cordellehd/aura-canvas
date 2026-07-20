import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Stars, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import type { Mesh, Group } from "three";

/**
 * Interactive orb that rotates toward the pointer with parallax.
 * All 3D lives inside <Canvas> — this module must only be imported
 * inside a ClientOnly boundary because three.js needs the DOM.
 */
function Orb() {
  const mesh = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  useFrame((state) => {
    const { x, y } = state.pointer;
    if (group.current) {
      group.current.rotation.y += (x * 0.6 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-y * 0.4 - group.current.rotation.x) * 0.05;
      group.current.position.x += (x * 0.3 - group.current.position.x) * 0.06;
      group.current.position.y += (y * 0.2 - group.current.position.y) * 0.06;
    }
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh ref={mesh} castShadow receiveShadow>
          <icosahedronGeometry args={[1.4, 12]} />
          <MeshDistortMaterial
            color="#a06bff"
            emissive="#4a1fbf"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
            distort={0.45}
            speed={1.6}
          />
        </mesh>
        {/* orbiting ring */}
        <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
          <torusGeometry args={[2.1, 0.02, 16, 200]} />
          <meshStandardMaterial color="#5ee4ff" emissive="#5ee4ff" emissiveIntensity={1.4} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 1.2, 0.6]}>
          <torusGeometry args={[2.5, 0.015, 16, 200]} />
          <meshStandardMaterial color="#a06bff" emissive="#a06bff" emissiveIntensity={1.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 6, 5]}
        intensity={1.6}
        color="#c7a6ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, -3, -2]} intensity={2} color="#5ee4ff" />

      <Suspense fallback={null}>
        <Stars radius={80} depth={40} count={2500} factor={4} saturation={0} fade speed={0.6} />
        <Orb />
        <ContactShadows position={[0, -1.9, 0]} opacity={0.4} scale={8} blur={2.6} far={4} />
        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
