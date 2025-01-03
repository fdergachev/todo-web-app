import WellRounded from '../WellRounded';
import arrowSub from '../../assets/images/arrow-main.svg';
import Button from '../shared/Button/index';
import Magnetic from '../shared/Magnetic';
import { Link } from 'react-router-dom';
const Welcome = () => {
   return (
      <div className='mt-[7.5rem] flex flex-col flex-[1]'>
         <WellRounded />
         <div className='flex justify-between flex-1'>
            <div className='mt-20'>
               <img src={arrowSub} alt="arrowIco" />
               <div className='text-[28px] mt-[5.625rem] w-[500px]'>
                  -- Let’s go and ace those goals with our assistance. Do not ever underestimate the power of writing things down.
               </div>
               <Magnetic>
                  <Link to="/registration">
                     <Button classes='mt-[1.875rem]'>
                        MAKE A NOTE
                     </Button>
                  </Link>

               </Magnetic>
            </div>
            <div className='flex flex-col justify-end text-end'>
               <div className='relative'>
                  <p className='absolute -top-2 right-0'>ASSITING YOU SINCE</p>
                  <p className='text-Accent font-extrabold text-[145px] leading-[120%]'>2024</p>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Welcome;