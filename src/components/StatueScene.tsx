import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/jan-statue.glb')

const ROTATIONS = 3
const TWO_PI = Math.PI * 2

function getScrollProgress(): number {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  if (max <= 0) return 0
  const y = window.scrollY || doc.scrollTop || 0
  return Math.min(1, Math.max(0, y / max))
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function Statue() {
  const { scene } = useGLTF('/jan-statue.glb')
  const group = useRef<THREE.Group>(null)
  const headRig = useRef<THREE.Group>(null)
  const leftLaser = useRef<THREE.Mesh>(null)
  const rightLaser = useRef<THREE.Mesh>(null)
  const eyeLight = useRef<THREE.PointLight>(null)
  const rimLight = useRef<THREE.PointLight>(null)

  const { fitted, headY, headZ } = useMemo(() => {
    const cloned = scene.clone(true)
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const longest = Math.max(size.x, size.y, size.z) || 1
    const target = 2.6
    const scale = target / longest
    cloned.position.set(-center.x, -center.y, -center.z)
    const wrap = new THREE.Group()
    wrap.add(cloned)
    wrap.scale.setScalar(scale)
    cloned.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh
        m.castShadow = true
        m.receiveShadow = true
        const mat = m.material as THREE.MeshStandardMaterial
        if (mat && 'metalness' in mat) {
          mat.metalness = Math.min(0.4, mat.metalness ?? 0)
          mat.roughness = Math.max(0.55, mat.roughness ?? 0.7)
          mat.envMapIntensity = 1.1
        }
      }
    })
    return {
      fitted: wrap,
      headY: (size.y * scale) * 0.38,
      headZ: (size.z * scale) * 0.35,
    }
  }, [scene])

  useFrame((state) => {
    if (!group.current) return
    const s = getScrollProgress()
    const t = state.clock.elapsedTime
    const totalRot = s * TWO_PI * ROTATIONS

    const rotations = totalRot / TWO_PI
    const rotInt = Math.floor(rotations + 1e-6)
    const phase = rotations - rotInt
    const justFinished = rotInt > 0 ? Math.exp(-phase * 5) : 0

    const layDown = smoothstep(0.82, 1.0, s)

    group.current.rotation.y = totalRot * (1 - layDown * 0.6)
    group.current.rotation.x = -0.35 * justFinished - layDown * Math.PI * 0.5
    group.current.position.y = -0.1 - layDown * 0.7
    group.current.position.z = layDown * 0.55

    const baseFlash = justFinished * 8 + layDown * 6
    const jitter = layDown * (0.7 + Math.sin(t * 38) * 0.3)
    if (eyeLight.current) eyeLight.current.intensity = baseFlash + jitter * 4
    if (rimLight.current) rimLight.current.intensity = (justFinished * 2 + layDown * 3) * 0.8

    const laserLen = layDown * 6
    const flicker = 0.92 + Math.sin(t * 44) * 0.08
    const setLaser = (m: THREE.Mesh | null) => {
      if (!m) return
      const len = laserLen * flicker
      m.scale.y = Math.max(0.0001, len)
      m.position.z = len / 2
      m.visible = laserLen > 0.02
    }
    setLaser(leftLaser.current)
    setLaser(rightLaser.current)
  })

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <primitive object={fitted} />

      <group ref={headRig} position={[0, headY, headZ]}>
        <mesh ref={leftLaser} position={[-0.12, 0, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
          <cylinderGeometry args={[0.018, 0.004, 1, 12, 1, true]} />
          <meshBasicMaterial
            color="#ff1424"
            toneMapped={false}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh ref={rightLaser} position={[0.12, 0, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
          <cylinderGeometry args={[0.018, 0.004, 1, 12, 1, true]} />
          <meshBasicMaterial
            color="#ff1424"
            toneMapped={false}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight
          ref={eyeLight}
          position={[0, 0, 0.15]}
          color="#ff0014"
          intensity={0}
          distance={2.5}
          decay={1.6}
        />
        <pointLight
          ref={rimLight}
          position={[0, 0.1, -0.4]}
          color="#ff2030"
          intensity={0}
          distance={3.5}
          decay={2}
        />
      </group>
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#7aa7ff" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#ffb27a" />
    </>
  )
}

export default function StatueScene() {
  useEffect(() => () => useGLTF.clear('/jan-statue.glb'), [])
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 4.2], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />
      <Suspense fallback={null}>
        <Statue />
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.45}
          scale={6}
          blur={2.4}
          far={3}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
