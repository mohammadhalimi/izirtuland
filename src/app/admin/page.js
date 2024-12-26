'use client'

import { useRouter } from 'next/navigation';
import Admin from '@/components/admin';

const Page = () => {
    const userouter = useRouter();

    const handleLogout = () => {
        document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        userouter.push('/login');
    };

    return (
        <div>
            <Admin logout={handleLogout}/>
        </div>
    );
};

export default Page;
