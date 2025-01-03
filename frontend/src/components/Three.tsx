import React, { useEffect, useRef } from 'react';
import { Plus } from './Plus';
import { useFrame } from '@react-three/fiber';
import { Environment, } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';


// function angleToRadians(angle: number): number {
//    return angle * (Math.PI / 180);
// }

const Three = () => {
   const crossRef: any = useRef(null);
   const [prevRef, setPrevRef] = React.useState<String>("/");

   let multiplierX = 1;
   let tl: GSAPTimeline | null = null;
   const location = useLocation();


   useEffect(() => {
      if (tl == null) {
         tl = gsap.timeline({ paused: true });
         tl.add("start")
            .to(crossRef.current.position,
               {
                  x: -2.0,
                  y: -1.0,
                  z: 2,
                  duration: 0.5,
               }, "start")
            .to(crossRef.current.rotation,
               {
                  z: -0.15,
                  duration: 0.5,
               }, "start")
            .add("end")
            .to(crossRef.current.position,
               {
                  x: 0,
                  y: -1.5,
                  z: 0,
                  duration: 0.5,
               }, "end")
            .to(crossRef.current.rotation,
               {
                  z: 0,
                  duration: 0.5,
               }, "end")
      }
      if (location.pathname != '/') {
         tl.tweenFromTo("start", "end");
      } else if (prevRef != "/") {
         tl.play(0.5);
      }
      setPrevRef(location.pathname);
   }, [location]);



   useFrame(() => {
      if (!!crossRef.current) {
         crossRef.current.rotation.y += -0.005 / (multiplierX + 0.01);
      }
   })



   return (
      <>

         <directionalLight intensity={3} position={[2, 3, 2]} />

         <mesh ref={crossRef} scale={0.8} position={[0, -1.5, 0]}>
            <Plus />
         </mesh>

         <Environment preset='warehouse' />
      </>
   );
};

export default Three;