const API_URL = "http://localhost:8080/bulaon/pets";  // Fixed URL

export const fetchPets = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addPet = async (pet) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });

    if (!res.ok) {
      throw new Error('Failed to add pet');
    }
    return await res.json();
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
};

export const updatePet = async (id, pet) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
  return await res.text(); // response is a String
};

export const deletePet = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.text();
};
