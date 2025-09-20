const BASE = "http://localhost:3001";

export async function registerUser(payload) {
  const res = await fetch(`${BASE}/users`, {
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

export async function fetchCurrentUser(token) {
  const res = await fetch(`${BASE}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Impossibile recuperare l'utente");
  return res.json();
}

export async function fetchServices() {
  const res = await fetch(`${BASE}/serviceItems`);
  if (!res.ok) throw new Error("Impossibile recuperare i servizi!");

  const data = await res.json();
  return data.content || [];
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error("Impossibile recuperare le categorie!");

  const data = await res.json();
  return data.content || [];
}

export const createService = async (serviceData, file, token) => {
  if (!token) throw new Error("Token mancante");
  console.log("Token usato:", token);
  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify(serviceData)], { type: "application/json" }));

  if (file) {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) throw new Error("Immagine troppo grande (max 5MB)");
    if (!file.type.startsWith("image/")) throw new Error("File non valido: carica un'immagine");

    formData.append("image", file);
  }

  const res = await fetch(`${BASE}/serviceItems/postService`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!res.ok) {
    let errBody;
    try {
      errBody = await res.json();
    } catch {
      errBody = { message: await res.text().catch(() => "Errore sconosciuto") };
    }
    throw new Error(errBody.message || "Errore nella creazione del servizio");
  }
  try {
    const json = await res.json();
    return json;
  } catch {
    return null;
  }
};
