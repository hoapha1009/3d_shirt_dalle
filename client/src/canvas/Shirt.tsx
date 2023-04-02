import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as easing from 'maath/easing'
import { useAppSelector } from '../app/hooks'

type Props = {}

export default function Shirt({}: Props) {
  const appState = useAppSelector((state) => state.app)
  const logoTexture = useTexture(appState.logoDecal)
  const fullTexture = useTexture(appState.fullDecal)
  const shirtGLTF = useGLTF('/shirt_baked.glb')

  useFrame((state, delta) => {
    easing.dampC((shirtGLTF as any).materials.lambert1.color, appState.color, 0.25, delta)
  })

  return (
    <group>
      <mesh
        castShadow
        geometry={(shirtGLTF as any).nodes.T_Shirt_male.geometry}
        material={(shirtGLTF as any).materials.lambert1}
        material-rougness={1}
        dispose={null}
      >
        {appState.isFullTexture && <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />}

        {appState.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}
