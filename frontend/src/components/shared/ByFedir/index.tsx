import './style.css';

function ByFedir() {
   return (
      <div className='relative w-[75px]'>
         <div className='absolute  font-bold text-BackgroundDark text-xl flex  main-link'>
            <div className='flex whitespace-nowrap relative overflow-hidden name'>
               <p className='pr-[0.2rem]'>By</p>
               <p className=''>Fedir</p>
               <p className='absolute left-[62px] pl-[0.2rem]'>Derhachov</p>
            </div>
            <p className='text-base -translate-y-1'>©</p>
         </div>
      </div>

   );
}

export default ByFedir;