import React, { ChangeEvent, PropsWithChildren, useEffect, useRef } from 'react';
import { TodoType } from '../../types/Todo';
import Checkbox from './Checkbox';

const Todo = ({ children, ...props }: PropsWithChildren<TodoType>) => {
   const todoRef = useRef<HTMLTextAreaElement>(null);
   const [todo, setTodo] = React.useState<string>("-- " + props.text);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         todoRef.current!.style.height = "";
         todoRef.current!.style.height = todoRef.current!.scrollHeight + "px";
      }, 200)
      return () => clearTimeout(timeoutId)
   }, [])

   const handleInput = (e: any) => {
      e.target.style.height = "";
      e.target.style.height = e.target.scrollHeight + "px"
   }
   const immutablePart = "-- ";
   const handleTodoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length < 3) {
         e.preventDefault()
         return;
      }
      if (!e.target.value.startsWith(immutablePart)) {
         setTodo(immutablePart + e.target.value)
         return;
      }
      setTodo(e.target.value)

   }

   return (
      <div className='text-[28px] flex items-center justify-between gap-10'>
         <textarea ref={todoRef} value={todo} onChange={handleTodoChange} name="description" onInput={handleInput}
            className='resize-none w-[60%] bg-transparent outline-none focus:outline-none h-[1lh]'></textarea>
         <div className='flex-auto h-[16px] bg-[radial-gradient(circle,#6B645C_0%,#6B645C_16%,_rgba(107,100,92,0)_16%,_rgba(107,100,92,0)_100%)] bg-bottom [background-size:40px_10px] bg-repeat-x -translate-y-[4px]'>

         </div>
         {children}
      </div>
   );
};

export default Todo;