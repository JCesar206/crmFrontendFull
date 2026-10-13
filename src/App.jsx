import React, { useState, useEffect } from 'react';
import { translations } from './translations/index.js';
import Navbar from './components/Navbar.jsx';
import AuthForm from './components/AuthForm.jsx';
import ClientForm from './components/ClientForm';
import ClientTable from './components/ClientTable';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('es');
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  // CRUD States
  const [clients, setClients] = useState(()=>{
    const saved = localStorage.getItem('crm_clients');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Ana Gómez', email: 'ana@empresa.com', phone: '555-0192' },
      { id: 2, name: 'Carlos Ruíz', email: 'carlos@tecnologia.org', phone: '555-8831' }
    ];
  });
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [editingId, setEditingId] = useState(null);

  const t = translations[lang];

  useEffect(()=> {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(()=> {
    localStorage.setItem('crm_clients', JSON.stringify(clients));
  }, [clients]);

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    if (editingId) {
      setClients(clients.map(c => c.id === editingId ? {...c, name: clientName, email: clientEmail, phone: clientPhone} : c));
      setEditingId(null);
    } else {
      setClients([...clients, { id: Date.now(), name: clientName, email: clientEmail, phone: clientPhone || 'NA' }]);
    }
    handleClearClientForm();
  };

  const handleClearClientForm = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setEditingId(null);
  };

  return (
    
  )
}