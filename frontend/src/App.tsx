import { Suspense, useContext, useEffect, useState } from 'react'

import { useLocation, Outlet } from 'react-router-dom'

import Header from './components/Header'
import { Canvas } from '@react-three/fiber'
import Three from './components/Three'
import fallbackImage from './assets/images/image-main.png'
import { useAuth } from './components/AuthProvider'
import './App.css'


function App() {
   const { user } = useAuth()


   return (
      <div className='relative bg-BackgroundLight noize'>
         <div className='min-h-[100dvh] pt-[30px] p-[50px] flex flex-col z-10 relative'>
            <Header />
            <Outlet />
         </div>

         <Canvas shadows className='h-[100dvh] !absolute top-0 left-0 z-[22] !pointer-events-none'>
            <Suspense fallback={null}>
               <Three />
            </Suspense>
         </Canvas>

      </div>

   )
}

function Fallback() {
   return (
      <div className='w-full h-full flex items-center justify-center'>
         <img src={fallbackImage} alt="fallbackImage" />
      </div>
   )
}

export default App