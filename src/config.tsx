import {usePathname} from "next/navigation";

import {Home, Settings, DollarSign, Clock} from "lucide-react"

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
            href: "/faturalar",
            icon: <DollarSign size={20}/>,
            active: isNavItemActive(pathname, "/faturalar"),
            position: "top",
        },
        {
            name: "Yaklaşanlar",
            href: "/yaklasanlar",
            icon: <Clock size={20}/>,
            active: isNavItemActive(pathname, "/yaklasanlar"),
            position: "top" 
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