'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Header = () => {

    const link_list = [
        {'name': 'Home', 'href':'/'},
        {'name': 'Cars', 'href':'/cars'},
        {'name': 'New Car', 'href':'/new'},
    ]
    const pathname = usePathname()

    return (
        <nav className=" bg-slate-50 flex flex-row justify-between relative items-center font-mono h-16">
            <div className="basis-1/2">
                <Link 
                    href={'/'} 
                    className={clsx(
                        "bg-gray-50 p-3 rounded-md hover:bg-sky-100 hover:text-blue-600", 
                        {'bg-sky-100 text-blue-600': pathname === '/'},)}
                >
                    Cars
                </Link>
            </div>
            <div className="basis-1/2 flex flex-row justify-end ">
                {link_list.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md mr-2 bg-gray-50 p-3 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {'bg-sky-100 text-blue-600': pathname === link.href},)}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
export default Header