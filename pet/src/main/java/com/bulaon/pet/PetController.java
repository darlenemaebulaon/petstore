package com.bulaon.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bulaon/pets")
@CrossOrigin(origins = "http://localhost:5173")

public class PetController {
    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public Iterable<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Pet> addNewPet(@RequestBody Pet pet) {
        Pet savedPet = petRepository.save(pet);
        return ResponseEntity.ok(savedPet);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Pet>> addPetsBulk(@RequestBody List<Pet> pets) {
        List<Pet> savedPets = petRepository.saveAll(pets);
        return ResponseEntity.ok(savedPets);
    }

    @PutMapping("/{id}")
    public String updatePet(@PathVariable int id, @RequestBody Pet updatedPet) {
        Pet pet = petRepository.findById(id).orElseThrow(() -> new RuntimeException("Pet not found"));

        pet.setName(updatedPet.getName());
        pet.setSpecies(updatedPet.getSpecies());
        pet.setBreed(updatedPet.getBreed());
        pet.setGender(updatedPet.getGender());
        pet.setImage(updatedPet.getImage());
        pet.setDescription(updatedPet.getDescription());
        pet.setPrice(updatedPet.getPrice());

        petRepository.save(pet);
        return "Pet with id " + id + " updated.";
    }

    @DeleteMapping("/{id}")
    public String deletePet(@PathVariable int id) {
        petRepository.deleteById(id);
        return "Pet with id " + id + " deleted.";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable int id) {
        Optional<Pet> pet = petRepository.findById(id);
        return pet.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search/{key}")
    public List<Pet> searchPets(@PathVariable String key) {
        return petRepository.findByNameContainingOrSpeciesContainingOrBreedContainingOrGenderContainingOrDescriptionContaining(
                key, key, key, key, key);
    }

    @GetMapping("/search/price/{price}")
    public List<Pet> getPetsByPrice(@PathVariable Double price) {
        return petRepository.findByPriceLessThanEqual(price);
    }
}