import React, { useState, useEffect } from 'react';
import { translations } from './translations/index.js';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { fetchClients, createClientApi, updateClientApi, deleteClientApi } from './api/client.js';
import Navbar from './components/Navbar.jsx';
import AuthForm from './components/AuthForm.jsx';
import ClientForm from './components/ClientForm.jsx';
import ClientTable from './components/ClientTable.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  const [lang, setLang] = useState('es');
  const [darkMode, setDarkMode] = useState(false);
  const { token, login, logout } = useAuth();

  // Estados del CRUD con API real
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [editingId, setEditingId] = useState(null);

  const t = translations[lang];

  // Cambiar tema Dark/Light
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cargar clientes desde el Backend cuando el usuario tenga sesión activa
  useEffect(() => {
    if (token) {
      loadClients();
    }
  }, [token]);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await fetchClients(token);
      setClients(data);
      setError('');
    } catch (err) {
      setError(err.message);
      if (err.message.includes('401') || err.message.includes('credenciales')) {
        logout(); // Si el token expira o es inválido, cerramos sesión limpiamente
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejar Guardar (Crear o Editar en Backend)
  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    try {
      const clientData = { name: clientName, email: clientEmail, phone: clientPhone || null };
      
      if (editingId) {
        await updateClientApi(editingId, clientData, token);
      } else {
        await createClientApi(clientData, token);
      }

      await loadClients(); // Recargamos la lista desde MySQL
      handleClearClientForm();
    } catch (err) {
      setError(err.message);
    }
  };

  // Manejar Eliminación en Backend
  const handleDeleteClient = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este cliente?")) return;
    try {
      await deleteClientApi(id, token);
      await loadClients();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClient = (client) => {
    setEditingId(client.id);
    setClientName(client.name);
    setClientEmail(client.email);
    setClientPhone(client.phone || '');
  };

  const handleClearClientForm = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Navbar 
        lang={lang} setLang={setLang} 
        darkMode={darkMode} setDarkMode={setDarkMode} 
        token={token} onLogout={logout} t={t} 
      />

      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6">
        {!token ? (
          <AuthForm onLoginSuccess={login} t={t} />
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 text-xs rounded-lg">
                {error}
              </div>
            )}

            <ClientForm 
              clientName={clientName} setClientName={setClientName}
              clientEmail={clientEmail} setClientEmail={setClientEmail}
              clientPhone={clientPhone} setClientPhone={setClientPhone}
              editingId={editingId} onSave={handleSaveClient} onClear={handleClearClientForm} t={t}
            />

            {loading ? (
              <p className="text-center py-6 text-slate-400 text-sm">Cargando datos del servidor...</p>
            ) : (
              <ClientTable 
                clients={clients} 
                onEdit={handleEditClient}
                onDelete={handleDeleteClient}
                t={t}
              />
            )}
          </div>
        )}
      </main>

      <Footer lang={lang}/>
    </div>
  );
}

export default App;