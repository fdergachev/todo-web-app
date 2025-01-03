import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Toolbar from '../shared/Toolbar';
import Menu from '../shared/Menu';
import { useData } from '../DataProvidert';
import Page from '../../types/Page';

const Workspace = () => {
   const params = useParams();
   const navigate = useNavigate();
   const [togled, setTogled] = React.useState(false);
   const { pages, addPage } = useData();
   useEffect(() => {
      if (!params.id) {
         if (pages && pages.length > 0) {
            const recent = Math.max(...pages.map((page: any) => page.updated_at))
            const recentPage = pages.filter((page: any) => page.updated_at !== recent)[0]
            navigate(`/workspace/${recentPage.id}`)
         }
         else if (pages) {
            addPage().then((res: Page) => {
               navigate(`/workspace/${res.id}`)
            })
         }
         //TODO: Check if ther is any pages of the user. If not create one. Redirect to the last created page.
      }
      else if (pages && pages.length > 0) {
         const page = pages.filter((page: any) => page.id == params.id)[0];
         if (!page) {
            navigate(`/workspace/${pages[0].id}`)
         }
      } else if (pages) {
         addPage().then((res: Page) => {
            navigate(`/workspace/${res.id}`)
         })
      }
   }, [params, pages])

   return (
      <div className='relative bg-BackgroundLight noize'>
         <div className='min-h-[100dvh] pt-[30px] p-[50px] flex flex-col z-10 relative [&>*:nth-child(1)]:flex-auto'>
            <Outlet />
            <Toolbar setTogled={setTogled} />
            <Menu togled={togled} setTogled={setTogled} />
         </div>
      </div>
   );
};

export default Workspace;