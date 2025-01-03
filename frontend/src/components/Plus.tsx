
import React, { useRef } from 'react'
import { useGLTF, OrthographicCamera, MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import crossModel from '../assets/3d/cross.glb?url'
import { useControls } from 'leva'
import { color } from 'three/webgpu'

// import concreteDiff from '../assets/3d/textures/dirty_concrete_diff_1k.jpg';
// import concreteDisp from '../assets/3d/textures/dirty_concrete_disp_1k.jpg'
// import concreteArm from '../assets/3d/textures/dirty_concrete_arm_1k.jpg'

//@ts-ignore
export function Plus(props: React.ComponentProps<any>) {
   const { nodes, materials } = useGLTF(crossModel)

   // const concreteTexture = useTexture({
   //    map: concreteDiff,
   //    displacementMap: concreteDisp,
   //    aoMap: concreteArm,
   //    roughnessMap: concreteArm,
   //    metalnessMap: concreteArm,

   // })

   // const materialProps = useControls({
   //    thickness: { value: 3, min: 0, max: 3, step: 0.05 },
   //    roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
   //    transmission: { value: 0.6, min: 0, max: 1, step: 0.1 },
   //    ior: { value: 0.5, min: 0, max: 3, step: 0.1 },
   //    chromaticAberration: { value: 0.00, min: 0, max: 1 },
   //    backside: { value: true },
   //    color: { value: '#ffffff' },
   //    // #d3d3d3
   // })


   return (
      <group {...props} dispose={null}>
         <group scale={0.01}>
            <mesh
               castShadow
               receiveShadow
               //@ts-ignore
               geometry={nodes['5_-_SHAPE__-_The_Strange_Cannelé'].geometry}
            //@ts-ignore
            // material={nodes['5_-_SHAPE__-_The_Strange_Cannelé'].material}
            >
               <meshStandardMaterial color={"#ffffff"} roughness={0} />
               {/* <MeshTransmissionMaterial
                  // {...materialProps}
                  thickness={3}
                  roughness={0.5}
                  transmission={0.6}
                  ior={0.5}
                  chromaticAberration={0.00}
                  backside={true}
                  color={'#ffffff'}
               /> */}

            </mesh>
            {/* @ts-ignore */}
            <directionalLight intensity={0.7} decay={2} rotation={[-0.506, 0.629, 0.756]} />
            <OrthographicCamera
               makeDefault={false}
               far={100000}
               near={0}
               position={[32.49, 131.688, 990.759]}
               rotation={[-0.132, 0.032, 0.004]}
            />
         </group>
      </group>
   )
}

useGLTF.preload(crossModel)

