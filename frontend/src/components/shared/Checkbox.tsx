import React from 'react';
import { cn } from '../../utils/cn';
import tick from '../../assets/images/tick.svg';
const Checkbox = (props: { checked?: boolean, onChange?: React.ChangeEventHandler<HTMLInputElement> }) => {
   return (
      <div className={cn('w-10 h-10 rounded-[10px] border-2 border-Text relative pointe flex items-center justify-center', props.checked ? "bg-Text" : null)}>
         <input defaultChecked={props.checked} onChange={props.onChange} type="checkbox" className='absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 z-12' />
         <img src={tick} alt="" className={cn('', props.checked ? "block" : "hidden")} />
      </div>
   );
};

export default Checkbox;