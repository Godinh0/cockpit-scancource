'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import * as Icon from 'react-feather';
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "./Provider";
import { SidebarMenu } from './Sidebar';



export default function NavbarComponent() {

    const router = useRouter();
    const theme = useContext(ThemeContext);
    const { setTheme } = useTheme()

    const onDarkModeToggle = (e: boolean) => {
        setTheme(e ? 'dark' : 'light');
        theme?.setTheme(e ? 'dark' : 'light');
    }


    const logout = () => {
        localStorage.removeItem('user');

        router.replace('/');
        router.refresh();
    }

    return (
        <header className="sticky top-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-primary bg-white dark:text-white text-sm py-4 ">
            <nav className="max-w-full w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <div className="sm:hidden">
                            <Sheet>
                                <SheetTrigger className='text-white mt-2'><Menu /></SheetTrigger>
                                <SheetContent side={"left"} className="w-[300px] sm:w-[340px]">
                                    <SheetHeader>
                                        <SheetTitle className='text-left text-xl font-bold ml-3'>Brand</SheetTitle>
                                        <SheetDescription>
                                            <SidebarMenu />
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div
                            className="h-12 w-12 bg-cover bg-center rounded-full ml-10"
                            style={{
                                backgroundImage: `url("https://avatars.githubusercontent.com/u/30700779?s=200&v=4")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                    </div>
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <a className="font-medium text-[#8BA3CB]" href="#" aria-current="page">Username</a>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => logout()} className="text-red-400 py-2">
                                    <span><Icon.LogOut size={15} className="mr-2" /></span> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
        </header>
    );



}
