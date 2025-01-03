import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import Page from '../types/Page';
import { TodoType } from '../types/Todo';
const DataContext = createContext({});

export const DataProvidert = ({ children }: PropsWithChildren<{}>) => {
   const [pages, setPages] = useState<Page[] | null>(null);
   const { token } = useAuth();
   const [todos, setTodos] = useState<TodoType[] | null>(null);

   const fetchPages = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/pages`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            }
         });
         const res = await response.json();
         if (res) {
            const pagesProcessed = res.map((page: any) => {
               return { ...page, created_at: new Date(page.created_at), updated_at: new Date(page.updated_at) }
            });
            setPages(pagesProcessed);
            return;
         }
         throw new Error(res.message);
      } catch (err) {
         console.error(err);
         return null;
      }
   }
   const addPage = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/pages`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: "New Page", description: "I'm description, change me pls :)" })
         });
         const res = await response.json();
         if (res) {
            await fetchPages();
            return res;
         }
         throw new Error(res.message);
      } catch (err) {
         console.error(err);
         return null;
      }
   }
   const removePage = async (id: string) => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/${id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            }
         });
         if (response.ok) {
            fetchPages();
            return;
         }
         throw new Error(response.toString());
      } catch (err) {
         console.error(err);
         return null;
      }

   }
   const updatePage = async (id: number, title: string, description: string) => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
         });
         if (response.ok) {
            fetchPages();
            return;
         }
         throw new Error(response.toString());
      } catch (err) {
         console.error(err);
         return null;
      }
   }

   // TODO: Continue from here. Make fetch by page id
   const fetchTodosByPage = async (pageId: number) => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/page/${pageId}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            }
         });
         const res = await response.json();
         if (res) {
            setTodos(res);
            return;
         }
         throw new Error(res.message);
      } catch (err) {
         console.error(err);
         return null;
      }
   }
   const updateTodo = async (todo: { id: number, title?: string, content?: string, is_done?: boolean }) => {
      try {
         const { id, ...request } = todo
         console.log(request, todo)
         const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${todo.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(request)
         });
         const res = await response.json();
         if (response.ok) {
            await fetchTodosByPage(res.page_id);
            return;
         }
         throw new Error(response.toString());
      } catch (err) {
         console.error(err);
         return null;
      }
   }

   const addTodo = async (pageId: number, title: string, content: string) => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ page_id: pageId, title: title, content: content })
         });
         if (response.ok) {
            await fetchTodosByPage(pageId);
            return;
         }
         throw new Error(response.toString());
      } catch (err) {
         console.error(err);
         return null;
      }
   }
   const removeTodo = async (todo: TodoType) => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${todo.id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            }
         })
         if (response.ok) {
            fetchTodosByPage(todo.page_id);
            return;
         }
         throw new Error(response.toString());
      } catch (err) {
         console.error(err);
         return null;
      }
   }

   useEffect(() => {
      fetchPages();
   }, [])
   return (
      <DataContext.Provider value={{ pages, addPage, removePage, updatePage, todos, fetchTodosByPage, updateTodo, addTodo, removeTodo }}>
         {children}
      </ DataContext.Provider>
   );
};

export const useData = (): any => useContext(DataContext);