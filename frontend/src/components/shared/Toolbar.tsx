import React, { Dispatch, SetStateAction } from 'react';
import WellRounded from '../WellRounded';
import IconButton from './IconButton';
import Magnetic from './Magnetic';
import barsRef from '../../assets/images/bars.svg';
import { useData } from '../DataProvidert';
import { useNavigate } from 'react-router-dom';
const Toolbar = (props: { setTogled: Dispatch<SetStateAction<boolean>> }) => {
   const { addPage } = useData();
   const navigate = useNavigate();
   const handleMenuClick = () => {
      props.setTogled((prev) => !prev);
   }
   const handleAddPage = async () => {
      const page = await addPage();
      navigate(`/workspace/${page.id}`)
   }
   return (
      <div className='flex justify-between items-end'>
         <div className='h-6 w-60 [&>*]:object-contain'>
            <WellRounded />
         </div>
         <div className='flex gap-[10px]'>
            <Magnetic>
               <IconButton onclick={handleAddPage}>
                  <div className='relative w-9 h-9 '>
                     <span className='absolute block rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-[2px] bg-BackgroundLight'></span>
                     <span className='absolute block rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-[2px] bg-BackgroundLight'></span>
                  </div>
               </IconButton>
            </Magnetic>
            <Magnetic>
               <IconButton outline onclick={handleMenuClick}>
                  <div className='relative  ml-[-2px]'>
                     <img src={barsRef} alt="" />
                  </div>
               </IconButton>
            </Magnetic>
         </div>
      </div>
   );
};

export default Toolbar;