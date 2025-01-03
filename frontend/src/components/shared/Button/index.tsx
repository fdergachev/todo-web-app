import { PropsWithChildren, useEffect, useRef } from 'react';
import arrow from '../../../assets/images/arrow-button.svg';
import { cn } from '../../../utils/cn';
import './style.css';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import FlipTextTrigger from '../FlipTextTrigger';

function Button(props: PropsWithChildren<{ classes?: string, type?: "button" | "submit" | "reset" | undefined, small?: boolean, onClick?: (e: any) => void }>) {
   const timeline = useRef<any>()
   let timeoutId: number;
   const circleRef = useRef(null);
   const flipRef = useRef(null);
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
      (flipRef.current as any).play();
   };
   const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
         timeline.current.play();
         (flipRef.current as any).reverse();
      }, 200);
   };

   return (
      <div className={cn('relative overflow-hidden rounded-full', props.classes ? props.classes : "")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={props.onClick ? props.onClick : () => { }}>
         <button type={props.type} className={cn(" relative  tracking-normal text-BackgroundLight  bg-Accent flex rounded-full w-[fit-content] gap-[2px] cursor-pointer btn-body", props.small ? "px-[10px] pt-[4px] pb-[5px]" : "font-extrabold px-[50px] py-5")} >
            <FlipTextTrigger ref={flipRef}>
               <div className='flex'>
                  <div className='flex z-20'>
                     {props.children}
                  </div>
                  {!props.small &&
                     <img className=' z-20' src={arrow} alt="arrowIcon" />
                  }
               </div>

            </FlipTextTrigger>
         </button>
         <div ref={circleRef} className='absolute h-[150%] w-[100%] rounded-[50%] left-1/2 -translate-x-1/2 top-full bg-Button cursor-pointer'>
         </div>
      </div>

   );
}

export default Button;