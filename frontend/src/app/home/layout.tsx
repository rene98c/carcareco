'use server'
 
 
import { cookies } from 'next/headers';
import Nav from './_components/layout/Nav'
import NavDialog from './_components/layout/NavDialog'
import ToastMessages from '@/_components/ToastMessages' 
import { httpGet } from '@/_lib/server/query-api';
import { redirect } from 'next/navigation';

 
export default async function Layout({ children }: { children: React.ReactNode }) {
    
    const response = await httpGet('users/profile/fullname');
    const fullName =  await response.text();
    
    if(!fullName) {
        redirect('/home/logout'); 
    }
 
    const jwt = (await cookies()).get('jwt')?.value;
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/profilepicture/${jwt}`
    return (
        <>
            {/* <Timeout></Timeout> */}
            <ToastMessages></ToastMessages>
            <div>
                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-62 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                      <Nav  imageUrl={imageUrl} fullName={fullName}  onSmallScreen={false}></Nav>   
                    </div>
                </div>
                 <NavDialog imageUrl={imageUrl} fullName={fullName} ></NavDialog>   
                {children}
              
              </div>
        </>
    )
}
