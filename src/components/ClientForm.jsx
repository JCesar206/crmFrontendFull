import React from 'react';

export default function ClientForm({ clientName, setClientName, clientEmail, setClientEmail, clientPhone, setClientPhone, editingId, onSave, onClear, t }) {
	return (
		<div className='bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700'>
			<h2 className='text-lg font-bold mb-4 text-indigo-600 dark:text-indigo-400'>{t.clientManager}</h2>
			<form onSubmit={onSave} className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4'>
				<input type='text' placeholder={t.clientName} value={clientName}
				onChange={(e)=>setClientName(e.target.value)} required
				className='px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-indigo-500' />

				<input type='email' placeholder={t.clientEmail} value={clientEmail}
				onChange={(e)=>setClientEmail(e.target.value)} required
				className='px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-indigo-500' />

				<input type='number' placeholder={t.clientPhone} value={clientPhone}
				onChange={(e)=>setClientPhone(e.target.value)} required
				className='px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-indigo-500' />

				<div className='sm:col-span-3 flex flex-wrap gap-2 pt-2'>
					<button type='submit' 
					className='flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition cursor-pointer'>{editingId ? t.editClient : t.addClient}</button>
					<button type='button' onClick={onClear}
					className='px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 font-semibold rounded-lg text-sm transition cursor-pointer'>{t.clearBtn}</button>
				</div>
			</form>
		</div>
	);
}