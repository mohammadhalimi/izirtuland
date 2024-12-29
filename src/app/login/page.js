'use client';

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/login';

const Page = () => {
    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/userpass')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const foundUser = data.some(user => user.username === username && user.password === password);
    
        if (foundUser) {
            document.cookie = 'auth-token=yourToken; path=/';
            router.push('/admin');
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است");
        }
    };
    
    return (
        <Login
            username={username}
            password={password}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onLogin={handleLogin}
        />
    );
};

export default Page;






