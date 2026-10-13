import React, { useState } from 'react';
import { loginUser, registerUser } from '../api/client.js';

export default function AuthForm({ onLoginSuccess, t }) {
	const [isLoginView, setIsLoginView] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMsg('');

		try {
			if (isLoginView) {
				const token = await loginUser(email, password);
				onLoginSuccess(token);
			} else {
				await registerUser(name, email, password);
				alert('¡Registro exitoso! Ahora inicia sesión.');
				setIsLoginView(true);
			}
		} catch (err) {
			setErrorMsg(err.message);
		}
	};

	return (
		<div className='max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md mt-10 border border-slate-100 dark:border-slate-700'>
			<div className='flex mb-6 border-b border-slate-200 dark:border-slate-700'>
				<button 
					className={`flex-1 pb-3 font-semibold text-sm transition 
						${isLoginView ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400': 'text-slate-400'} cursor-pointer`} onClick={()=>{setIsLoginView(true); setErrorMsg(''); }}>
							{t.loginTab}
				</button>
				<button
					className={`flex-1 pb-3 font-semibold text-sm transition ${!isLoginView ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400': 'text-slate-400'} cursor-pointer`}>
						{t.reggisterUser}
					</button>
			</div>

			{errorMsg && (
				<div className='mb-4 p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 text-xs rounded-lg'>
					{errorMsg}
				</div>
			)}

			<form onSubmit={handleSubmit} className='space-y-4'>
				{!isLoginView && (
					<div>
						<label className='block text-xs font-semibold mb-1'>{t.name}</label>
						<input type='text' value={name} onChange={(e)=>setName(e.target.value)} required
						className='w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none' />
					</div>
				)}
				<div>
					<label className='block text-xs font-semibold mb-1'>{t.email}</label>
					<input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required
					className='w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none' />
				</div>
				<div>
					<label className='block text-xs font-semibold mb-1'>{t.password}</label>
					<input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required
					className='w-full px-3 py-2 rounded-lx border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none' />
				</div>
				<button type='submit' 
				className='w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-500/20'>
					{isLoginView ? t.loginBtn : t.registerBtn}
				</button>
			</form>
		</div>
	);
}