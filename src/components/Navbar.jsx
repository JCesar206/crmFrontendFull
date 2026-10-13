import React from 'react';

export default function Navbar({ lang, setLang, darkMode, setDarkMode, token, onLogout, t }) {
	return (
		<header className='w-full bg-white dark:bg-slate-80 shadow-sm px-6 py-4 flex flex-wrap justify-between items-center gap-4 transition-colors'>
			<div>
				<h1 className='text-xl font-bold text-indigo-600 dark:text-indigo-400'>{t.title}</h1>
				<p className='text-xs text-slate-500 dark:text-slate-400'>{t.subtitle}</p>
			</div>
			<div className='flex items-center gap-3'>
				<button onClick={()=>setLang(lang === 'es' ? 'en' : 'es')}
				className='px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer'>{lang.toUpperCase()}</button>

				<button onClick={()=>setDarkMode(!darkMode)}
				className='px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer'>
					{darkMode ? 'Light' : 'Dark'}
				</button>

				{token && (
					<button onClick={onLogout} className='px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition cursor-pointer'>{t.logoutBtn}</button>
				)}
			</div>
		</header>
	);
}