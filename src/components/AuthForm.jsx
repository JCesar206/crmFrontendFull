import React, { useState } from 'react';
import { loginUser, registerUser } from '../api/client.js';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';

export default function AuthForm({ onLoginSuccess, t }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          type="button"
          className={`flex-1 pb-3 font-semibold text-sm transition cursor-pointer ${isLoginView ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
          onClick={() => { setIsLoginView(true); setErrorMsg(''); }}
        >
          {t.loginTab}
        </button>
        <button 
          type="button"
          className={`flex-1 pb-3 font-semibold text-sm transition cursor-pointer ${!isLoginView ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
          onClick={() => { setIsLoginView(false); setErrorMsg(''); }}
        >
          {t.registerTab}
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
            <input 
              type='text' value={name} onChange={(e) => setName(e.target.value)} required 
              className='w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>
        )}
        <div>
          <label className='block text-xs font-semibold mb-1'>{t.email}</label>
          <input 
            type='email' value={email} onChange={(e) => setEmail(e.target.value)} required 
            className='w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>
        <div>
          <label className='block text-xs font-semibold mb-1'>{t.password}</label>
          <div className='relative'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className='w-full pl-3 pr-10 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              tabIndex="-1"
            >
              {showPassword ? (
                <RxEyeClosed size={18} />
              ) : (
                <RxEyeOpen size={18} />
              )}
            </button>
          </div>
        </div>
        <button 
          type='submit' 
          className='w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition shadow-md shadow-indigo-500/20 cursor-pointer'
        >
          {isLoginView ? t.loginBtn : t.registerBtn}
        </button>
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          {t.userTest} user3@test.com / {t.passwordTest} User3test
        </p>
      </form>
    </div>
  );
}