import React, { PropsWithChildren } from 'react';
import './style.css';

function FlipText(props: PropsWithChildren<{}>) {
   return (
      <div className='body relative overflow-hidden inline-flex cursor-pointer leading-[120%]'>
         <div className='relative '>
            {props.children}
         </div>
         <div className='absolute top-full'>
            {props.children}
         </div>
      </div>
   );
}

export default FlipText;