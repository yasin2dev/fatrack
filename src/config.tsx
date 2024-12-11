import {usePathname} from "next/navigation";

import {Home, Settings, DollarSign} from "lucide-react"

export const NavItems = () => {
    const pathname = usePathname();

    function isNavItemActive(pathname: string, nav: string) {
        return pathname.includes(nav);
    }

    return [
        {
            name: "Anasayfa",
            href: "/",
            icon: <Home size={20}/>,
            active: pathname === "/",
            position: "top",
        },
        {
            name: "Faturalar",
            href: "/bills",
            icon: <DollarSign size={20}/>,
            active: isNavItemActive(pathname, "/bills"),
            position: "top",
        },
        {
            name: 'Ayarlar',
            href: '/settings',
            icon: <Settings size={20} />,
            active: isNavItemActive(pathname, '/settings'),
            position: 'bottom',
        },
    ]
}