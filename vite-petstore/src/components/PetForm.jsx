import { useState } from "react";
import { addPet } from "../api/Pet_Api";

export default function PetForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "", species: "", breed: "", gender: "", image: "", description: "", price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet(form);
      setForm({ name: "", species: "", breed: "", gender: "", image: "", description: "", price: "" });
      onAdd();
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pet-form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="species" value={form.species} onChange={handleChange} placeholder="Species" required />
      <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" required />
      <select name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Add Pet</button>
    </form>
  );
}
