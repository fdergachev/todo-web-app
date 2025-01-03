import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import FlipTextTrigger from './FlipTextTrigger';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';


const IconButton = (props: PropsWithChildren<{ classes?: string, outline?: boolean, onclick?: any }>) => {
   const timeline = useRef<any>()
   let timeoutId: number;
   const circleRef = useRef(null);
   useEffect(() => {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("someEase", ".76,.1,.24,1");
      timeline.current = gsap.timeline({ paused: true });
      timeline.current.to(
         circleRef.current,
         {
            top: "-25%",
            width: "150%",
            duration: 0.4,
            ease: "power3.in",
         },
         "enter",
      );
      timeline.current.to(
         circleRef.current,
         {
            top: "-150%",
            width: "125%",
            duration: 0.25,
         },
         "exit",
      );
   }, []);
   const handleMouseEnter = () => {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
      timeline.current.tweenFromTo("enter", "exit"); // from enters start time until exits start time
   };
   const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
         timeline.current.play();
      }, 200);
   };

   return (
      <div onClick={props.onclick} className={cn('relative overflow-hidden rounded-full', props.classes ? props.classes : "")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
         <button className={cn(" relative h-[70px] w-[70px] items-center justify-center tracking-normal text-BackgroundLight font-extrabold  flex rounded-full  gap-[2px] cursor-pointer btn-body", props.outline ? "border-[2px] border-Accent" : "bg-Accent")} >
            <div className='flex'>
               <div className='flex z-20'>
                  {props.children}
               </div>
            </div>
         </button>
         <div ref={circleRef} className={cn('absolute h-[150%] w-[100%] rounded-[50%] left-1/2 -translate-x-1/2 top-full  cursor-pointer', props.outline ? "bg-Button" : "bg-Button")}>
         </div>
      </div>

   );
}

export default IconButton;