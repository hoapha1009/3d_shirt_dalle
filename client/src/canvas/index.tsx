import { Center, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import Shirt from './Shirt'

type Props = {}

export default function CanvasModel({}: Props) {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 0],
        fov: 25
      }}
      gl={{
        preserveDrawingBuffer: true
      }}
      className='h-full w-full max-w-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />
      <Environment preset='city' />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}
