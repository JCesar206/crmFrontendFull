import { FaTheRedYeti } from "react-icons/fa";
import ClientTable from "../components/ClientTable";

const API_URL = 'http://127.0.0.1:8000';
export async function loginUser(email, password) {
	const formData = new URLSearchParams();
	formData.append('username', email);
	formData.append('password', password);

	const res = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: formData
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.detail || 'Error al iniciar sesión');
	return data.access_token;
}

export async function registerUser(nombre, email, password) {
	const res = await fetch(`${API_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ nombre, email, password })
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.detail || 'Error al registrarse');
	return data;
}

// CRUD Clientes (Protegido con JWT)
export async function fetchClients(token) {
	const res = await fetch(`${API_URL}/clients`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.detail || 'Error al obtener los clientes');
	return data;
}

export async function createClientApi(clientData, token) {
	const res = await fetch(`${API_URL}/clients`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(clientData)
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.detail || 'Error al crear el cliente');
	return data;
}

export async function updateClientApi(id, clientData, token) {
	const res = await fetch(`${API_URL}/clients/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(clientData)
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.detail || 'Error al actualziar el cliente');
	return data;
}

export async function deleteClientApi(id, token) {
	const res = await fetch(`${API_URL}/clients/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});

	if (!res.ok) {
		const data = await res.json().catch(() => ({}));
		throw new Error(data.detail || 'Error al eliminar el cliente');
	}
	return true;
}