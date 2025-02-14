

import { Metadata } from "next";
import NavbarComponent from "../components/Navbar";
import { SidebarMenu } from "../components/Sidebar";


export const metadata: Metadata = {
    title: 'Home',
    description: 'Home Page',
}
function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen overflow-hidden">
            <NavbarComponent />
            <div className="flex">
                <div className="hidden sm:block w-30"> {/* Defina um tamanho fixo para o Sidebar */}
                    <SidebarMenu />
                </div>
                <main className="flex-1 max-w-[calc(100vw-100px)] p-4 bg-[#F5F7FA] overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default RootLayout;
