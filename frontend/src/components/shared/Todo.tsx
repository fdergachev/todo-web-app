import React, { ChangeEvent, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { TodoType } from '../../types/Todo';
import Checkbox from './Checkbox';
import debounce from '../../utils/debounce';
import { useData } from '../DataProvidert';

const Todo = ({ children, ...props }: PropsWithChildren<TodoType>) => {
   const todoRef = useRef<HTMLTextAreaElement>(null);
   const immutablePart = "-- ";
   const [todo, setTodo] = React.useState<string>(props.title);
   const { updateTodo, addTodo, removeTodo } = useData();
   const [isDone, setIsDone] = React.useState<boolean>(props.is_done || false);

   useEffect(() => {
      if (immutablePart.includes(todo)) {
         todoRef.current!.focus()
         todoRef.current!.setSelectionRange(todoRef.current!.value.length, todoRef.current!.value.length)
      }
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
   const debouncedUpdate = useCallback(
      debounce(async (newTodo: { id: number, title?: string, content?: string, is_done?: boolean }) => {
         await updateTodo(newTodo)
      }, 700), []);
   const handleTodoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length < 3) {
         e.preventDefault()
         return;
      }
      if (!e.target.value.startsWith(immutablePart)) {
         const newValue = immutablePart + e.target.value.substring(2, e.target.value.length)
         setTodo(newValue)
         debouncedUpdate({ id: props.id, title: newValue })
         return;
      }
      setTodo(e.target.value)
      debouncedUpdate({ id: props.id, title: e.target.value })

   }
   const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !(e.ctrlKey || e.metaKey)) {
         e.preventDefault();
         await addTodo(props.page_id, "-- ", "")
         todoRef.current!.blur();
      }
      if (e.key === "Escape") {
         todoRef.current!.blur();
      }
   }
   const handleBlur = () => {
      if (todo.length <= 3) {
         removeTodo({ ...props })
      }
   }
   const handleTodoCheck = async (e: ChangeEvent<HTMLInputElement>) => {
      setIsDone(e.target.checked)
      await updateTodo({ id: props.id, is_done: e.target.checked })
   }

   return (
      <div className='text-[28px] flex items-center justify-between gap-10'>
         <textarea ref={todoRef} value={todo} onChange={handleTodoChange} name="description" onInput={handleInput} onKeyDown={handleKeyDown} onBlur={handleBlur}
            className='resize-none w-[60%] bg-transparent outline-none focus:outline-none h-[1lh]'></textarea>
         <div className='flex-auto h-[16px] bg-[radial-gradient(circle,#6B645C_0%,#6B645C_16%,_rgba(107,100,92,0)_16%,_rgba(107,100,92,0)_100%)] bg-bottom [background-size:40px_10px] bg-repeat-x -translate-y-[4px]'>
         </div>
         <Checkbox checked={isDone} onChange={(e) => { handleTodoCheck(e) }} />
      </div>
   );
};

export default Todo;