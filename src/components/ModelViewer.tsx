import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import type { ModelShape } from "@/data/artworks";

function ProceduralModel({ shape }: { shape: ModelShape }) {
  const group = useRef<THREE.Group>(null);

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9a84c",
        metalness: 1,
        roughness: 0.25,
      }),
    [],
  );
  const stoneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7a7065",
        metalness: 0.05,
        roughness: 0.85,
      }),
    [],
  );
  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4a2d18",
        metalness: 0.1,
        roughness: 0.7,
      }),
    [],
  );
  const leatherMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#5a3520",
        metalness: 0.05,
        roughness: 0.8,
      }),
    [],
  );

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.25;
  });

  return (
    <group ref={group}>
      {shape === "chest" && (
        <group>
          <mesh material={woodMat} position={[0, 0, 0]} castShadow>
            <boxGeometry args={[2, 1.1, 1.2]} />
          </mesh>
          <mesh material={woodMat} position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 2, 32, 1, false, 0, Math.PI]} />
          </mesh>
          {[-0.8, 0.8].map((x) => (
            <mesh key={x} material={goldMat} position={[x, 0, 0]}>
              <boxGeometry args={[0.12, 1.3, 1.25]} />
            </mesh>
          ))}
          <mesh material={goldMat} position={[0, 0, 0.62]}>
            <boxGeometry args={[0.4, 0.3, 0.05]} />
          </mesh>
        </group>
      )}
      {shape === "fountain" && (
        <group>
          <mesh material={stoneMat} position={[0, -0.5, 0]}>
            <cylinderGeometry args={[1.4, 1.5, 0.3, 32]} />
          </mesh>
          <mesh material={stoneMat} position={[0, 0, 0]}>
            <cylinderGeometry args={[1, 1.1, 0.4, 32]} />
          </mesh>
          <mesh material={stoneMat} position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 0.5, 32]} />
          </mesh>
          <mesh material={stoneMat} position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.15, 0.25, 0.4, 16]} />
          </mesh>
        </group>
      )}
      {shape === "lantern" && (
        <group>
          <mesh material={goldMat} position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.55, 0.6, 0.15, 8]} />
          </mesh>
          <mesh material={goldMat} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 1.2, 8, 1, true]} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#ffb347"
              emissive="#ff8800"
              emissiveIntensity={2}
            />
          </mesh>
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffaa55" distance={3} />
          <mesh material={goldMat} position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.55, 0.5, 0.4, 8]} />
          </mesh>
          <mesh material={goldMat} position={[0, 1.1, 0]}>
            <torusGeometry args={[0.12, 0.04, 8, 16]} />
          </mesh>
        </group>
      )}
      {shape === "gargoyle" && (
        <group>
          <mesh material={stoneMat} position={[0, -0.7, 0]}>
            <boxGeometry args={[1.2, 0.3, 1]} />
          </mesh>
          <mesh material={stoneMat} position={[0, 0, 0]}>
            <boxGeometry args={[0.7, 1.1, 0.7]} />
          </mesh>
          <mesh material={stoneMat} position={[0, 0.8, 0.1]}>
            <sphereGeometry args={[0.45, 16, 16]} />
          </mesh>
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} material={stoneMat} position={[x, 1.15, 0.1]}>
              <coneGeometry args={[0.08, 0.25, 8]} />
            </mesh>
          ))}
          {[-1, 1].map((s) => (
            <mesh
              key={s}
              material={stoneMat}
              position={[s * 0.55, 0.3, -0.1]}
              rotation={[0, 0, s * 0.4]}
            >
              <boxGeometry args={[0.6, 0.8, 0.08]} />
            </mesh>
          ))}
        </group>
      )}
      {shape === "sword" && (
        <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
          <group rotation={[0, 0, 0]}>
            <mesh material={goldMat} position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
            </mesh>
            <mesh material={leatherMat} position={[0, 0.95, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
            </mesh>
            <mesh material={goldMat} position={[0, 0.7, 0]}>
              <boxGeometry args={[0.7, 0.12, 0.18]} />
            </mesh>
            <mesh
              position={[0, -0.2, 0]}
              material={
                new THREE.MeshStandardMaterial({
                  color: "#c0c4c8",
                  metalness: 1,
                  roughness: 0.15,
                })
              }
            >
              <boxGeometry args={[0.15, 1.6, 0.04]} />
            </mesh>
            <mesh position={[0, -1, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.1, 0.04]} />
              <meshStandardMaterial color="#c0c4c8" metalness={1} roughness={0.15} />
            </mesh>
          </group>
        </Float>
      )}
      {shape === "tome" && (
        <group rotation={[-0.3, 0, 0]}>
          <mesh material={leatherMat} position={[0, -0.05, 0]}>
            <boxGeometry args={[1.8, 0.1, 1.3]} />
          </mesh>
          <mesh
            position={[-0.45, 0.05, 0]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[0.85, 0.04, 1.2]} />
            <meshStandardMaterial color="#f0e6c8" roughness={0.9} />
          </mesh>
          <mesh position={[0.45, 0.05, 0]}>
            <boxGeometry args={[0.85, 0.04, 1.2]} />
            <meshStandardMaterial
              color="#f0e6c8"
              emissive="#c9a84c"
              emissiveIntensity={0.3}
              roughness={0.9}
            />
          </mesh>
          <mesh material={goldMat} position={[0, 0.08, 0]}>
            <boxGeometry args={[0.04, 0.06, 1.25]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function ModelViewer({ shape }: { shape: ModelShape }) {
  return (
    <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0 spotlight pointer-events-none z-10" />
      <div className="absolute inset-0 vignette pointer-events-none z-10" />
      <Canvas
        shadows
        camera={{ position: [3, 2, 4], fov: 38 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 8, 18]} />
        <ambientLight intensity={0.15} />
        <spotLight
          position={[0, 6, 2]}
          angle={0.5}
          penumbra={0.8}
          intensity={80}
          color="#e8c07a"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-4, 2, -3]} intensity={8} color="#3a2a1a" />
        <Suspense fallback={null}>
          <ProceduralModel shape={shape} />
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.7}
            scale={8}
            blur={2.5}
            far={3}
          />
          <Environment preset="warehouse" environmentIntensity={0.3} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          autoRotate={false}
          minDistance={3}
          maxDistance={9}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          dampingFactor={0.08}
        />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/80 pointer-events-none">
        Drag to orbit · Scroll to zoom
      </div>
      <div className="absolute top-4 left-4 z-20 text-[10px] tracking-[0.3em] uppercase text-gold/80">
        ✦ Live Exhibit
      </div>
    </div>
  );
}
