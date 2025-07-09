'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { notify } from '@/components/ui/toast';
import { post } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    const res = await post('/users/login', { email, password });
    setLoading(false);

    if (res.token) {
      document.cookie = `token=${res.token}; path=/;`;
      notify('Login successful!', 'success');
      router.push('/dashboard');
    } else {
      notify('Invalid credentials', 'error');
      console.log("TEST", res);
    }
  };

  return (
      <div className="bg-gray-100 flex h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded-md p-8">

                <img className="mx-auto h-12 w-auto" src="https://www.trenser.com/wp-content/themes/Trenser/img/trenser-logo.svg" alt="" />

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Welcome Back!
                </h2>
                <form className="space-y-6 mt-4" action="#" method="POST">
                    <div>
                        {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">Email</label> */}
                        <div className="mt-1">
                          <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label> */}
                        <div className="mt-1">
                          <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          />
                          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <div>
                      <Button onClick={handleLogin} disabled={loading} className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                        {loading ? <Loader size={20} className="mx-auto" /> : 'Login'}
                      </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}
