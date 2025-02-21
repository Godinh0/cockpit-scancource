import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, FileSpreadsheet, Home } from "lucide-react";
import Link from "next/link";
import * as React from "react";

type Menu = {
    label: string;
    name: string;
    icon: React.ReactNode;
    submenu?: Submenu[];
    href: string;
};

type Submenu = {
    name: string;
    icon: React.ReactNode;
    href: string;
};

export function SidebarMenu() {
    const menus: Menu[] = [
        {
            label: "",
            name: "Dashboard",
            icon: <Home color="#EF7925" size={24} />, // Aumenta o tamanho do ícone
            href: "/home",
        },
        {
            label: "",
            name: "Relatório",
            icon: <FileSpreadsheet color="#EF7925" size={24} />, // Aumenta o tamanho do ícone
            href: "/home",
        },
    ];

    const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

    return (
        <ScrollArea className="h-screen w-2/10 rounded-md border-r border-[#E6EFF5] flex flex-col items-center p-2">
            <div className="mt-5 w-full">
                {uniqueLabels.map((label, index) => (
                    <React.Fragment key={label}>
                        {menus
                            .filter((menu) => menu.label === label)
                            .map((menu) => (
                                <React.Fragment key={menu.name}>
                                    {menu.submenu && menu.submenu.length > 0 ? (
                                        <Accordion
                                            key={menu.name}
                                            type="single"
                                            className="p-0 font-normal w-full"
                                            collapsible
                                        >
                                            <AccordionItem value="item-1" className="m-0 p-0 font-normal">
                                                <AccordionTrigger className="flex flex-col items-center text-center text-[#EF7925] text-xs">
                                                    <div className=" text-[#EF7925]flex flex-col items-center">
                                                        <div className="text-[#EF7925] w-8 h-8 flex justify-center items-center">{menu.icon}</div>
                                                        {menu.name}
                                                    </div>
                                                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {menu.submenu.map((submenu) => (
                                                        <Link
                                                            key={submenu.name}
                                                            href={submenu.href}
                                                            className="flex flex-col items-center text-xs p-2 text-gray-400 hover:bg-[#F5F7FA] hover:text-white rounded-md w-full"
                                                        >
                                                            <div className="w-8 h-8 flex justify-center items-center">{submenu.icon}</div>
                                                            {submenu.name}
                                                        </Link>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <div key={menu.name} className="w-full flex justify-center">
                                            <Link
                                                href={menu.href}
                                                className="flex flex-col items-center text-xs p-2 hover:bg-[#F5F7FA] text-[#EF7925] rounded-md w-full"
                                            >
                                                <div className="w-8 h-8 flex justify-center items-center">{menu.icon}</div>
                                                {menu.name}
                                            </Link>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    );
}
