

const Input = (props: { img?: string, placeholder?: string, type?: string, name?: string }) => {
   const { img, ...inputProps } = props
   return (
      <div className={`relative `}>
         <input className={` bg-transparent border-b border-b-Text outline-none focus:outline-none py-[15px] px-[70px] w-full placeholder:text-TextGray text-right `} {...inputProps} />
         <img className='absolute w-6 h-6 block top-1/2 right-[15px] -translate-y-1/2' src={img} alt="" />
      </div>

   );
};

export default Input;