import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Todo from './Todo';
import { useData } from '../DataProvidert';
import debounce from '../../utils/debounce';
import Page from '../../types/Page';
import { TodoType } from '../../types/Todo';

const Editor = () => {
   const params = useParams();
   const titleRef: any = useRef(null);
   const descriptionRef: any = useRef(null);
   const { pages, updatePage, fetchTodosByPage, todos, addTodo } = useData();
   const [pageDetails, setPageDetails] = useState({ id: 1, title: "Loading...", description: 'Loading...', updated_at: new Date(), created_at: new Date() });
   const [todosLocal, setLocalTodos] = useState<TodoType[] | null>(null);
   useEffect(() => {
      if (pages && pages.length > 0) {
         const page = pages.filter((page: any) => page.id == params.id)[0];
         if (!page) return;
         setPageDetails({ ...page })
         setTimeout(() => {
            resizeTextarea()
         }, 200)
         fetchTodosByPage(page.id)
      }
   }, [params, pages])
   useEffect(() => {
      if (todos && todos.length > 0)
         setLocalTodos(todos)
      else if (todos && todos.length === 0)
         addTodo(pageDetails.id, "-- New todo", "")
   }, [todos])
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         resizeTextarea()
      }, 200)
      return () => clearTimeout(timeoutId)
   }, [])
   function resizeTextarea() {
      titleRef.current.style.height = "";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
      descriptionRef.current.style.height = "";
      descriptionRef.current.style.height = descriptionRef.current.scrollHeight + "px";
   }
   const handleInput = (e: any) => {
      e.target.style.height = "";
      e.target.style.height = e.target.scrollHeight + "px"
      // e.target.style.backgroundColor = "red"
   }
   const debouncedUpdate = useCallback(
      debounce(async (newPageDetails: Page) => {
         await updatePage(newPageDetails.id, newPageDetails.title, newPageDetails.description)
      }, 700), []);
   const handleDetailsChange = (e: any) => {
      const newPageDetails = { ...pageDetails, [e.target.name]: e.target.value }
      setPageDetails(newPageDetails)
      debouncedUpdate(newPageDetails)
   }

   function formatDate(date: Date) {
      const day = date.getDate().toString().padStart(2, '0'); // Get day with leading zero
      const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // Get abbreviated month in uppercase
      const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

      return `${day} ${month} ’${year}`;
   }
   function formatDateWithUTCOffset(date: Date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const offset = date.getTimezoneOffset(); // Returns the offset in minutes from UTC
      const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
      const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, '0');
      const sign = offset <= 0 ? "+" : "-";
      return `${hours}:${minutes} UTC ${sign}${offsetHours}:${offsetMinutes}`;
   }

   return (
      <div>
         <div className='flex flex-col'>
            <div className='flex justify-between font-extrabold text-[5rem]'>
               <textarea ref={titleRef} onInput={handleInput} className='outline-none focus:outline-none bg-transparent text-BackgroundDark resize-none h-[1lh] max-w-[50%] rounded-3xl' name="title" value={pageDetails.title} onChange={handleDetailsChange}></textarea>
               <p className='text-Accent text-right'>{formatDate(pageDetails.updated_at)}</p>
            </div>
            <div className='flex justify-between text-[28px]'>
               <textarea ref={descriptionRef} value={pageDetails.description} onChange={handleDetailsChange} name="description" onInput={handleInput}
                  className='resize-none w-[45%] bg-transparent outline-none focus:outline-none h-[1lh]'></textarea>
               <p>{formatDateWithUTCOffset(pageDetails.created_at)}</p>
            </div>
            <div className='w-full h-[1px] bg-Separator rounded-full mt-[30px]'></div>
            {todosLocal
               ?
               <div className='mt-[70px] flex flex-col gap-1'>
                  {todosLocal.map((todo: TodoType) =>
                     <Todo {...todo} key={todo.id} >
                     </Todo>
                  )}
               </div>
               :
               <div>
                  Loading...
               </div>
            }
         </div>
      </div>
   );
};

export default Editor;