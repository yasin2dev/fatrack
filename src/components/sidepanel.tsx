"use client"

import React from "react"
import {useState, useEffect, Fragment} from "react"


import {cn} from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/tooltip';

import {NavItems} from "@/config";
import Link from "next/link";

import {ChevronLeft, ChevronRight} from "lucide-react";

export default function SidePanel() {
    const navItems = NavItems();

    const [isSidepanelExpanded, setIsSidepanelExpanded] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = window.localStorage.getItem("sidepanelExpanded");
            if (saved === null) {
                return true;
            }
            return JSON.parse(saved);
        }
        return true;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem("sidepanelExpanded",
                JSON.stringify(isSidepanelExpanded),
            );
        }
    }, [isSidepanelExpanded]);

    const toggleSidepanel = () => {
        setIsSidepanelExpanded(!isSidepanelExpanded);
    }

    return (
        <div className={cn(isSidepanelExpanded ? 'w-[200px]' : "w-[60px]", 'border-r border-r-white transition-all duration-300 ease-in-out transform hidden sm:flex h-fill')}>
            <aside className={"flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1"}>
                <div className={"mt-4 relative pb-2"}>
                    <div className={"flex flex-col space-y-1"}>
                        {navItems.map((item, idx) => {
                            if (item.position === "top") {
                                return (
                                    <Fragment key={idx}>
                                        <div className={"space-y-1"}>
                                            <SideNavItem
                                                label={item.name}
                                                icon={item.icon}
                                                path={item.href}
                                                active={item.active}
                                                isSidebarExpanded={isSidepanelExpanded}
                                            />
                                        </div>
                                    </Fragment>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className={"sticky bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200 block"}>
                    {navItems.map((item, idx) => {
                        if (item.position === "bottom") {
                            return (
                                <Fragment key={idx}>
                                    <div className={"space-y-1"}>
                                        <SideNavItem
                                            label={item.name}
                                            icon={item.icon}
                                            path={item.href}
                                            active={item.active}
                                            isSidebarExpanded={isSidepanelExpanded}
                                        />
                                    </div>
                                </Fragment>
                            )
                        }
                    })}
                </div>
            </aside>
            <div className={"relative"}>
                <button
                    type="button"
                    className={"absolute bottom-32 right-[-12px] flex h-6 w-6 items-center rounded-full bg-amber-500 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"}
                    onClick={toggleSidepanel}
                >
                    {isSidepanelExpanded ? (<ChevronLeft size={16} className={"mx-auto"}/>) : (<ChevronRight size={16} className={"mx-auto"}/>)}
                </button>
            </div>
        </div>
    )
}
export const SideNavItem: React.FC<{
    label: string;
    icon: any;
    path: string;
    active: boolean;
    isSidebarExpanded: boolean;
}> = ({label, icon, path, active, isSidebarExpanded}) => {
    return (
        <>
            {isSidebarExpanded ? (
                <Link
                    href={path}
                    className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                        active
                            ? 'font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white'
                            : 'hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                    }`}
                >
                    <div
                        className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                        {icon}
                        <span>{label}</span>
                    </div>
                </Link>
            ) : (
                <TooltipProvider delayDuration={70}>
                <Tooltip>
                        <TooltipTrigger>
                            <Link
                                href={path}
                                className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                                    active
                                        ? 'font-base text-sm bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white'
                                        : 'hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                                }`}
                            >
                                <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                                    {icon}
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            side="left"
                            className="px-3 py-1.5 text-xs"
                            sideOffset={10}
                        >
                            <span>{label}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </>
    );
};