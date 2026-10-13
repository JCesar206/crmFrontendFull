const API_URL = "http://127.0.0.1:8000";
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