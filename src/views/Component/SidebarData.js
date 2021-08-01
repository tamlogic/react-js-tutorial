import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        path: '/',
        name: 'title.home',
        icon: <AiIcons.AiFillHome className="text-info"/>,
        cName: 'nav-text',
        component: 'home'
    },
    // Auth Routes
    {
        path: '/login',
        name: 'title.login',
        icon: <IoIcons.IoMdPeople className="text-info"/>,
        cName: 'nav-text',
        component: 'login'
    },
    // Dashboard Routes
    {
        path: '/dashboard',
        name: 'title.dashboard',
        icon: <FaIcons.FaHome className="text-info"/>,
        cName: 'nav-text',
        component: 'dashboard'
    }
];