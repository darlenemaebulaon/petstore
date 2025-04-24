import { useState, useEffect } from "react";

export default function PetModal({ visible, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(initialData || {
    name: "", species: "", breed: "", gender: "", image: "", description: "", price: ""
  });

  useEffect(() => {
    setForm(initialData || {
      name: "", species: "", breed: "", gender: "", image: "", description: "", price: ""
    });
  }, [initialData]);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? "Edit Pet" : "Add Pet"}</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
