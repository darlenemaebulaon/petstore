import { useEffect, useState } from "react";
import { fetchPets, addPet, updatePet, deletePet } from "./api/Pet_Api";
import PetList from "./components/PetList";
import PetModal from "./components/PetModal";
import "./App.css";

export default function App() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editPetData, setEditPetData] = useState(null);

  const loadPets = async () => {
    const data = await fetchPets();
    setPets(data);
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handleAddClick = () => {
    setEditPetData(null);
    setShowModal(true);
  };

  const handleEditClick = (pet) => {
    setEditPetData(pet);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deletePet(id);
    loadPets();
  };

  const handleSubmit = async (pet) => {
    if (editPetData) {
      await updatePet(editPetData.id, pet);
    } else {
      await addPet(pet);
    }
    setShowModal(false);
    loadPets();
  };

  const filteredPets = pets.filter((pet) => {
    const search = searchTerm.toLowerCase();
    return (
      pet.name.toLowerCase().includes(search) ||
      pet.species.toLowerCase().includes(search) ||
      pet.breed.toLowerCase().includes(search) ||
      pet.gender.toLowerCase().includes(search) ||
      pet.description.toLowerCase().includes(search) ||
      pet.price.toString().includes(search)
    );
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Pet Store</h1>
          <div className="navbar-actions">
            <input
              type="text"
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <button onClick={handleAddClick}>Add Pet</button>
          </div>
        </div>
      </nav>

      <div className="app">
        <PetList pets={filteredPets} onEdit={handleEditClick} onDelete={handleDelete} />
        <PetModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          initialData={editPetData}
        />
      </div>
    </>
  );
}
