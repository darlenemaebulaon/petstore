export default function PetList({ pets, onEdit, onDelete }) {
  return (
    <div className="pet-list">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <img src={pet.image} alt={pet.name} width="100" />
          <h3>{pet.name}</h3>
          <p>{pet.species} - {pet.breed}</p>
          <p>{pet.gender}</p>
          <p>{pet.description}</p>
          <p><strong>₱{pet.price}</strong></p>
          <div className="pet-buttons">
            <button className="edit" onClick={() => onEdit(pet)}>Edit</button>
            <button className="delete" onClick={() => onDelete(pet.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
