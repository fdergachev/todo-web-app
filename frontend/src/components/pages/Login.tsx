import React, { useState } from 'react';
import arrow from '../../assets/images/arrow-main.svg';
import glif from '../../assets/images/glif-log.svg';
import Magnetic from '../shared/Magnetic';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import atGlif from '../../assets/images/at.svg';
import pwdGlif from '../../assets/images/key.svg';
import Input from '../shared/Input';
import * as yup from "yup";
import { useAuth } from '../AuthProvider';

const Login = () => {
   const [error, setError] = useState("")
   const { login } = useAuth();
   const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8).max(25)
   });

   const handleSubmit = async (e: any) => {
      e.preventDefault();

      const formData = {
         email: e.target.email.value,
         password: e.target.password.value,
      };
      // const values = await schema.validate(formData);
      try {
         const values = await schema.validate(formData);
         setError("");
         const response = await login(values);
         if (response) {
            setError(response);
         }
      } catch (err: any) {
         console.log(err.message);
         setError(err.message);
      }

   };
   return (
      <div className='flex-[1] flex justify-end'>
         <div className='w-[66%] flex flex-col'>
            <div className='flex justify-end mt-20 items-start relative'>
               <Link className='absolute top-0 left-0 cursor-pointer z-10' to="/"><img className='rotate-180' src={arrow} alt="Arrow Icon" /></Link>
               <div className='flex flex-col relative w-full'>
                  <p className='absolute top-0 right-0 text-nowrap text-[28px]'>LOG IN INTO YOUR ACCOUNT</p>
                  <h2 className='font-extrabold text-[145px] text-BackgroundDark text-end'>WELCOME BACK</h2>
                  <div className='-mt-5 flex justify-between items-center'>
                     <p className='text-[28px] max-w-[635px] '>-- We’re glad to see you again. Note-taking increase your productivity severalfold. Keep working, champ!</p>
                     <img className='h-6 object-cover' src={glif} alt="Glif icon" />
                  </div>
               </div>

            </div>
            <div className='flex justify-end flex-auto' onSubmit={handleSubmit}>
               <form className='mt-24 flex flex-col' >
                  <div className="w-[500px]  flex-auto ">
                     <div className='flex flex-col gap-8 relative'>
                        <Input placeholder='productive.sir@mail.com' img={atGlif} type='email' name='email' />
                        <Input placeholder='your pwd' img={pwdGlif} type='password' name='password' />
                        {error.length > 0 ? <p className='absolute bottom-0 right-0 translate-y-[150%]'>*{error}</p> : null}
                     </div>
                  </div>
                  <div className='mb-10 w-fit ml-auto '>
                     <Magnetic>
                        <Button classes='' type='submit'>
                           SIGN IN
                        </Button>
                     </Magnetic>
                  </div>
               </form>
            </div>

         </div>
      </div>
   );
};

export default Login;