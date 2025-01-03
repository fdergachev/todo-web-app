import { useEffect, useRef } from 'react';
import Button from './Button';
import Page from '../../types/Page';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataProvidert';
import gsap from 'gsap'

const PageItem = (props: Page & { setTogled: (item: any) => void }) => {
   const { removePage } = useData()
   const bodyRef = useRef<HTMLDivElement>(null)
   const tweenMenuItem = useRef<GSAPTween | null>(null);
   useEffect(() => {
      tweenMenuItem.current = gsap.from(bodyRef.current, {
         duration: 0.4,
         x: 100,
         opacity: 0,
         stagger: 0.1,
      })
   }, [])
   const navigate = useNavigate();
   const habdleClick = () => {
      navigate(`/workspace/${props.id}`)
      props.setTogled((last: any) => !last)
   }
   const handleDelete = (e: any) => {
      e.stopPropagation()
      tweenMenuItem.current?.reverse()
      setTimeout(() => {
         removePage(props.id)
      }, 800)
   }
   function formatDate(date: Date) {
      const day = date.getDate().toString().padStart(2, '0'); // Get day with leading zero
      const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // Get abbreviated month in uppercase
      const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

      return `${day} ${month} ’${year}`;
   }
   return (
      <div ref={bodyRef} onClick={habdleClick} className='bg-BackgroundLight rounded-[10px] cursor-pointer page-item'>
         <div className='flex justify-between items-center pt-[20px] px-[20px]'>
            <p className='text-BackgroundDark font-extrabold text-[24px]'>{props.title}</p>
            <p className='text-Text font-extrabold text-[24px]'>{formatDate(props.created_at)}</p>
         </div>
         <p className='text-Text px-[20px] '>
            {props.description.length > 110 ? props.description.slice(0, 110) + '...' : props.description}
         </p>
         <div className='flex justify-end p-[10px] z-20 relative'>
            <Button small onClick={handleDelete}>delete.</Button>
         </div>
      </div>
   );
};

export default PageItem;