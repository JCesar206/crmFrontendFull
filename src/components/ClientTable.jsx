import React from 'react';

export default function ClientTable({ clients, onEdit, onDelete, t }) {
	return (
		<div className='bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700'>
			{clients.length === 0 ? (
				<p className='p-6 text-center text-slate-400 text-sm'>{t.noClients}</p>
				) : (
					<div className='overflow-x-auto'>
						<table className='w-full text-left border-collapse'>
							<thead>
								<tr className='bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400'>
									<th className='p-4'>{t.clientName}</th>
									<th className='p-4'>{t.clientEmail}</th>
									<th className='p-4'>{t.clientPhone}</th>
									<th className='p-4 text-right'>{t.actions}</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100 dark:divide-slate-700 text-sm'>
								{clients.map(client => (
									<tr key={client.id} className='hover:bg-slate-50 dark:hover:bg-slate-700/30 transition'>
										<td className='p-4 font-medium'>{client.name}</td>
										<td className='p-4 text-slate-500 dark:text-slate-400'>{client.email}</td>
										<td className='p-4 text-slate-500 dark:text-slate-400'>{client.phone}</td>
										<td className='p-4 text-right space-x-2'>
											<button onClick={()=>onEdit(client)}
											className='px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-md hover:bg-amber-200 transition'>{t.edit}</button>
											<button onClick={()=>onDelete(client.id)}
											className='px-2.5 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-md hover:bg-rose-200 transition'>{t.delete}</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
		</div>
	);
}