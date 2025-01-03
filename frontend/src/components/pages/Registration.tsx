import React, { useState } from 'react';
import Input from '../shared/Input';
import Magnetic from '../shared/Magnetic';
import Button from '../shared/Button';
import arrow from '../../assets/images/arrow-main.svg';
import atGlif from '../../assets/images/at.svg';
import pwdGlif from '../../assets/images/key.svg';
import glif from '../../assets/images/glif-reg.svg';
import pwdDupGlif from '../../assets/images/key-outline.svg';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const Registration = () => {
   const [error, setError] = useState("")
   const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8).max(25).test("Password match", "Passwords do not match", function (pwd) {
         return pwd === this.parent.c_password;
      }),
      c_password: yup.string().required().min(8).max(25).test("Password match", "Passwords do not match", function (pwd) {
         return pwd === this.parent.password;
      }),
   });
   const { authorize } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e: any) => {
      e.preventDefault();

      const formData = {
         email: e.target.email.value,
         password: e.target.password.value,
         c_password: e.target.c_password.value,
      };
      // const values = await schema.validate(formData);
      try {
         const values = await schema.validate(formData);
         setError("");
         // TODO: fetch here
         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
               method: "POST",
               headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ ...values, name: values.email }),
            });
            const res = await response.json();
            console.log(res);
            if (res) {
               console.log(res);
               localStorage.setItem("site", res.accessToken);
               const user = await authorize();
               if (user) {
                  navigate("/workspace");
               }
               else {
                  setError("Unhandeled error occured, please try again later");
               }
               return;
               // setToken(res.accessToken);
               // localStorage.setItem("site", res.accessToken);
            }
            setError(res.message);
         } catch (err) {
            console.error(err);
         }
      } catch (err: any) {
         setError(err.message);
      }

   };
   return (
      <div className='flex-[1] flex justify-end'>
         <div className='w-[66%] flex flex-col'>
            <div className='flex justify-end mt-20 items-start relative'>
               <Link className='absolute top-0 left-0 cursor-pointer z-10' to="/"><img className='rotate-180' src={arrow} alt="Arrow Icon" /></Link>
               <div className='flex flex-col relative w-full'>
                  <p className='absolute top-0 right-0 text-nowrap text-[28px]'>MAKE AN ACCOUNT</p>
                  <h2 className='font-extrabold text-[145px] text-BackgroundDark text-end'>BUT FIRST</h2>
                  <div className='-mt-5 flex justify-between items-center'>
                     <p className='text-[28px] max-w-[636px] ml-[120px]'>-- None of your data is collected or saved, beside that which mentioned in our Privacy Policy.   </p>
                     <img className='h-6 object-cover' src={glif} alt="Glif icon" />
                  </div>
               </div>

            </div>
            <div className='flex justify-end flex-auto'>
               <form className='mt-12 flex flex-col ' onSubmit={handleSubmit}>
                  <div className="w-[500px] flex-auto ">
                     <div className='flex flex-col gap-8 relative '>
                        <Input placeholder='productive.sir@mail.com' img={atGlif} type='email' name='email' />
                        <Input placeholder='some strong pwd' img={pwdGlif} type='password' name='password' />
                        <Input placeholder='repeat strong pwd' img={pwdDupGlif} type='password' name='c_password' />
                        {error.length > 0 ? <p className='absolute  bottom-0 right-0 translate-y-[150%]'>*{error}</p> : null}
                     </div>

                  </div>

                  <div className='mb-10 flex w-fit ml-auto'>
                     <Magnetic>
                        <Button type='submit' classes=''>
                           CREATE AN ACCOUNT
                        </Button>
                     </Magnetic>
                  </div>
               </form>
            </div>

         </div>
      </div >
   );
};

export default Registration;