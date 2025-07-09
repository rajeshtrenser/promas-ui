'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import router from 'next/router';

export default function Dashboard() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        router.push('/');
    };

    return (
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg mb-6">Logged in as: <span className="font-medium text-blue-600">{userEmail}</span></p>
        <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}