import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { translations } from '../translations/index.js';

export default function Footer({ lang = 'es' }) {
    const t = translations[lang] || translations['es'];

    return (
        <footer className='w-full px-14 py-6'>
          <div className='w-full bg-white/80 dark:bg-gray-900/85 backdrop-blur-xl shadow-md rounded-full border border-slate-100 dark:border-slate-800 transition-colors'>
            <div className='max-w-6xl mx-auto px-6 py-6 flex flex-col items-center gap-4'>
                {/* Social icons */}
                <div className='flex gap-6'>
                    <a href='https://github.com/JCesar206' target='_blank' rel='noreferrer'
                        className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition' title="GitHub">
                        <FaGithub size={20}/>
                    </a>
                    <a href='https://www.linkedin.com/in/jcesar206' target='_blank' rel='noreferrer'
                        className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition' title="LinkedIn">
                        <FaLinkedin size={20}/>
                    </a>
                    <a href='mailto:jcesar206@hotmail.com' className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition' title="Outlook">
                        <FaEnvelope size={20}/>
                    </a>
                    <a href='mailto:jcesary06@gmail.com' className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition' title="Gmail">
                        <SiGmail size={20}/>
                    </a>
                </div>
                
                {/* Copyright bilingüe */}
                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center font-medium'>
                    &copy; {new Date().getFullYear()} {t.footerTitle || 'CRM Pro'} | Juls | {t.rights || 'Todos los derechos reservados'}
                </p>
            </div>
          </div>
        </footer>
    );
}