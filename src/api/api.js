const BASE = "http://localhost:3001";

// ---------------------------------- USERS ----------------------------------

// -------------------------- LOGIN --------------------------
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

// -------------------------- GET --------------------------
export async function fetchCurrentUser(token) {
  const res = await fetch(`${BASE}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Impossibile recuperare l'utente");
  return res.json();
}

// -------------------------- POST --------------------------
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

// ---------------------------------- CATEGORIES ----------------------------------

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error("Impossibile recuperare le categorie!");

  const data = await res.json();
  return data.content || [];
}

// ---------------------------------- SERVICES ----------------------------------

// -------------------------- GET --------------------------
export async function fetchServices() {
  const res = await fetch(`${BASE}/serviceItems`);
  if (!res.ok) throw new Error("Impossibile recuperare i servizi!");

  const data = await res.json();
  return data.content || [];
}

// -------------------------- POST --------------------------
export const createService = async (serviceData, file, token) => {
  if (!token) throw new Error("Token mancante");

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

// -------------------------- PUT --------------------------
export const updateService = async (serviceId, serviceData, file, token) => {
  if (!token) throw new Error("Token mancante");

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify(serviceData)], { type: "application/json" }));

  if (file) {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) throw new Error("Immagine troppo grande (max 5MB)");
    if (!file.type.startsWith("image/")) throw new Error("File non valido: carica un'immagine");

    formData.append("image", file);
  }

  const res = await fetch(`${BASE}/serviceItems/${serviceId}`, {
    method: "PUT",
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
    throw new Error(errBody.message || "Errore nell'aggiornamento del servizio");
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
};

// -------------------------- DELETE --------------------------
export const deleteService = async (serviceId, token) => {
  if (!token) throw new Error("Token mancante");

  const res = await fetch(`${BASE}/serviceItems/${serviceId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Errore eliminazione servizio: ${errorText}`);
  }

  return true;
};

// ---------------------------------- PRODUCTS ----------------------------------

// -------------------------- GET --------------------------
export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Impossibile recuperare i prodotti!");

  const data = await res.json();
  return data.content || [];
}

// -------------------------- POST --------------------------
export const createProduct = async (productData, file, token) => {
  if (!token) throw new Error("Token mancante");

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify(productData)], { type: "application/json" }));

  if (file) {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) throw new Error("Immagine troppo grande (max 5MB)");
    if (!file.type.startsWith("image/")) throw new Error("File non valido: carica un'immagine");

    formData.append("image", file);
  }

  const res = await fetch(`${BASE}/products/postProduct`, {
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
    throw new Error(errBody.message || "Errore nella creazione del prodotto");
  }
  try {
    const json = await res.json();
    return json;
  } catch {
    return null;
  }
};

// -------------------------- PUT --------------------------
export const updateProduct = async (productId, productData, file, token) => {
  if (!token) throw new Error("Token mancante");

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify(productData)], { type: "application/json" }));

  if (file) {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) throw new Error("Immagine troppo grande (max 5MB)");
    if (!file.type.startsWith("image/")) throw new Error("File non valido: carica un'immagine");

    formData.append("image", file);
  }

  const res = await fetch(`${BASE}/products/${productId}`, {
    method: "PUT",
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
    throw new Error(errBody.message || "Errore nell'aggiornamento del prodotto");
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
};

// -------------------------- DELETE --------------------------
export const deleteProduct = async (productId, token) => {
  if (!token) throw new Error("Token mancante");

  const res = await fetch(`${BASE}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Errore eliminazione prodotto: ${errorText}`);
  }

  return true;
};
