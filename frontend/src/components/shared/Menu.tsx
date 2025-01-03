import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { cn } from '../../utils/cn';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import calendarIcon from '../../assets/images/calendar.svg';
import FlipText from './FlipText';
import PageItem from './PageItem';
import { useData } from '../DataProvidert';
import Page from '../../types/Page';

const Menu = (props: { togled: boolean, setTogled: Dispatch<SetStateAction<boolean>> }) => {
   const cursor = useRef(null);
   const cursorLabel = useRef(null);
   const tweenCursor = useRef<GSAPTween | null>(null);
   const tweenLabel = useRef<GSAPTween | null>(null);
   const tweenCurve = useRef<GSAPTween | null>(null);
   const tweenMenu = useRef<GSAPTween | null>(null);
   const tweenMenuItems = useRef<GSAPTween | null>(null);
   const { logout } = useAuth();
   const navigate = useNavigate();
   const { pages } = useData();

   // useEffect(() => {

   //    tweenMenuItems.current = gsap.from(".page-item", {
   //       duration: 0.8,
   //       x: 100,
   //       opacity: 0,
   //       stagger: 0.1,
   //       paused: true
   //    });
   // }, [pages])
   useEffect(() => {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("someEase", ".76,.1,.24,1");

      tweenCursor.current = gsap.fromTo(cursor.current, {
         scale: 0,
         duration: 0.4,
         ease: "someEase",
      }, {
         scale: 1,
         paused: true,
      });
      tweenLabel.current = gsap.fromTo(cursorLabel.current, {
         paused: true,
         scale: 0,
         duration: 0.4,
         ease: "someEase",
      }, {
         scale: 1,
         paused: true,
      });
      tweenCurve.current = gsap.to(".path", {
         attr: { d: targetPath },
         duration: 0.8,
         ease: "someEase",
      });
      tweenMenu.current = gsap.to(".nav-menu", {
         duration: 0.8,
         xPercent: 0,
         x: 0,
         ease: "someEase",
         paused: true,
      });

      const moveCursorX = gsap.quickTo(cursor.current, "left", {
         duration: 0.5,
         ease: "power3",
      });
      const moveCursorY = gsap.quickTo(cursor.current, "top", {
         duration: 0.5,
         ease: "power3",
      });
      const moveCursorLabelX = gsap.quickTo(cursorLabel.current, "left", {
         duration: 0.45,
         ease: "power3",
      });
      const moveCursorLabelY = gsap.quickTo(cursorLabel.current, "top", {
         duration: 0.45,
         ease: "power3",
      });
      window.addEventListener("mousemove", (e) => {
         moveCursorX(e.pageX);
         moveCursorY(e.pageY);
         moveCursorLabelX(e.pageX);
         moveCursorLabelY(e.pageY);
      });
   }, [])
   if (props.togled) {
      tweenCurve.current?.play();
      tweenMenu.current?.play();
      tweenMenuItems.current?.play();
   } else {
      tweenCurve.current?.reverse();
      tweenMenu.current?.reverse();
      tweenMenuItems.current?.reverse();
   }
   const handleMouseEnter = () => {
      tweenCursor.current?.play();
      tweenLabel.current?.play();
   }
   const handleMouseLeave = () => {
      tweenCursor.current?.reverse();
      tweenLabel.current?.reverse();
   }
   const handleClose = () => {
      props.setTogled(false);
   }
   const handleLogout = () => {
      logout();
      navigate("/login");
   }

   const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;
   const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;
   return (
      <div className='h-[100dvh] fixed top-0 left-0  z-30 w-[100vw] pointer-events-none' >
         <div className={cn('absolute top-0 left-0 h-full w-full cursor-pointer  transition-all duration-[0.8s] ease-in-out', props.togled ? "backdrop-blur-[2px] pointer-events-auto" : "backdrop-blur-0 pointer-events-none")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClose}>
         </div>
         <div className='fixed top-0 right-0 h-[100dvh] z-40  '>
            <div className='nav-menu h-[100dvh] flex flex-col w-[610px] bg-BackgroundDark translate-x-[calc(100%+100px)] relative pointer-events-auto'>
               <div className='flex justify-between items-center p-[30px] pb-[20px]  '>
                  <div className='border border-TextGray rounded-[10px] px-[10px] text-TextGray flex gap-[5px] items-center'>
                     01/01
                     <img src={calendarIcon} alt="calendar" className='w-[20px] h-[20px] ' />
                  </div>
                  <div className='text-TextDark uppercase cursor-pointer' onClick={handleLogout}>
                     (<FlipText>Log out</FlipText>)
                  </div>
               </div>
               <svg className='absolute top-0 left-[-99px] w-[100px] h-full stroke-none pointer-events-none' >
                  <path className="path  fill-BackgroundDark" d={initialPath}> </path>
               </svg>
               <div className='mx-[20px] h-[1px] flex-none bg-Accent'>
               </div>
               <div className='my-[10px] py-[30px] px-[30px] flex-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] 
                     [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1)_5%,rgba(0,0,0,1)_95%,rgba(0,0,0,0)_100%)]'>
                  <div className='overflow-y-scroll flex flex-col gap-[10px] overflow-x-hidden'>
                     {pages ? pages.map((item: Page) => <PageItem key={item.id} {...item} setTogled={props.setTogled} />) : null}
                  </div>
               </div>
               <div className='p-[30px] pt-0'>
                  <p className='uppercase text-TextGray opacity-50'>(Socials)</p>
                  <div className='flex justify-between mt-[30px]'>
                     <FlipText>
                        <a href="" rel='nofollow' className='text-TextGray mr-[2px]'>Github</a>
                     </FlipText>
                     <FlipText>
                        <a href="" rel='nofollow' className='text-TextGray mr-[2px]'>LinkedIn</a>
                     </FlipText>
                     <FlipText>
                        <a href="" rel='nofollow' className='text-TextGray mr-[2px]'>Email</a>
                     </FlipText>
                  </div>
               </div>
            </div>

         </div>
         <div ref={cursor} className='w-[70px] h-[70px] bg-BackgroundDark rounded-full -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none scale-0'>

         </div>
         <div ref={cursorLabel} className='text-BackgroundLight font-extrabold w-20 h-20 flex items-center scale-0 bg-transparent -translate-x-1/2 -translate-y-1/2 justify-center rounded-full absolute pointer-events-none'>
            X
         </div>
      </div >
   );
};

export default Menu;