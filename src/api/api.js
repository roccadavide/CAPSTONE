const BASE = "http://localhost:3001";

export async function registerUser(payload) {
  const res = await fetch(`${BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  try {
    return res.ok ? JSON.parse(text) : Promise.reject(JSON.parse(text));
  } catch {
    return res.ok ? text : Promise.reject(text);
  }
}

export async function loginUser(payload) {
  const res = await fetch(`${BASE}/noAuth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  if (!text) {
    return res.ok ? null : Promise.reject({ message: "Errore dal server" });
  }

  try {
    return res.ok ? JSON.parse(text) : Promise.reject(JSON.parse(text));
  } catch {
    return res.ok ? text : Promise.reject({ message: text });
  }
}
