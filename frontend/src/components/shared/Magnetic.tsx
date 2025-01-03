import React, { MouseEventHandler, PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children, ...props }: PropsWithChildren<{}>) => {
   const itemRef = useRef(null);
   const xTo = useRef<any>()
   const yTo = useRef<any>()
   useEffect(() => {
      if (itemRef.current) {
         xTo.current = gsap.quickTo(itemRef.current, "x", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
         });
         yTo.current = gsap.quickTo(itemRef.current, "y", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
         });
      }
   }, [])
   const handleMove: MouseEventHandler = (e) => {
      e.preventDefault();
      const { clientX, clientY } = e;
      const { width, height, left, top } = (itemRef.current as any).getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo.current(x * 0.7);
      yTo.current(y * 0.7);
   }
   const hanndleLeave: MouseEventHandler = (e) => {
      e.preventDefault();
      xTo.current(0);
      yTo.current(0);
   }

   return (
      <div ref={itemRef} className='w-fit' onMouseMove={handleMove} onMouseLeave={hanndleLeave}>
         {children}
      </div>
   );
};

export default Magnetic;