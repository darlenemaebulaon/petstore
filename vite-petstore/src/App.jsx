import { useEffect, useState } from "react";
import { fetchPets, addPet, updatePet, deletePet } from "./api/PetApi";
import PetList from "./components/PetList";
import PetModal from "./components/PetModal";
import "./App.css";

export default function App() {
  const [pets, setPets] = useState([]);
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

  return (
    <div className="app">
      <h1>Pet Store</h1>
      <button onClick={handleAddClick}>Add Pet</button>
      <PetList pets={pets} onEdit={handleEditClick} onDelete={handleDelete} />
      <PetModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={editPetData}
      />
    </div>
  );
}
