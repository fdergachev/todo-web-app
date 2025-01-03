import { forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

const FlipTextTrigger = forwardRef(({ children }: PropsWithChildren, ref) => {
   const bodyRef = useRef(null);
   const firstElement = useRef(null);
   const secondElement = useRef(null);
   const thirdElement = useRef(null);
   let animation = useRef(gsap.timeline({ paused: true }));


   useEffect(() => {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("someEase", ".16,1,.3,1");
      if (firstElement.current && secondElement.current) {
         animation.current
            .add("enter")
            .to(firstElement.current, { y: "-100%", duration: 0.4, ease: "power3.in" }, "enter")
            .to(secondElement.current, { top: 0, duration: 0.4, ease: "power3.in" }, "enter")
            .add("exit")
            .to(thirdElement.current, { top: 0, duration: 0.25 }, "exit")
            .to(secondElement.current, { top: "-100%", duration: 0.25 }, "exit")
      }
   }, []);

   useImperativeHandle(ref, () => ({
      play() {
         animation.current.tweenFromTo("enter", "exit");
      },
      reverse() {
         animation.current.play();
      }
   }));

   return (
      <div ref={bodyRef} className=' relative overflow-hidden inline-flex cursor-pointer leading-[120%]'>
         <div ref={firstElement} className='relative '>
            {children}
         </div>
         <div ref={secondElement} className='absolute top-full '>
            {children}
         </div>
         <div ref={thirdElement} className='absolute top-full '>
            {children}
         </div>
      </div>
   );
});

export default FlipTextTrigger;