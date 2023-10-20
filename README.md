# Pets Spot
This application is a place for prospective pet-parents can find
pets listed for rehoming/adoption. All data is user provided.

## User Story
* Looking for pet
    
        AS A pet-person
        I WANT to browse pets in need of a home
        SO THAT I can look for a potential surrogate-child

* Putting pet up for adoption
        
        AS A listing-person
        I WANT to put my pet up for adoption
        SO THAT I can give my furry friend a loving home     

## Backend:

* Data -

        Pets
            |
            Pets.healthSchema
        Users
        Listing

### Models -

- Pet Data:

        img: Picture(s) of doggo!
        species: Cat/Dog!
        name: Dogcat!
        age: Age!
        Sex: F/M
        description: User supplied, describing the pet
        breed: Labrador (optional or "other" option)
        tempermant: Social/Skittish? (optional)
        child-friendly: (User Sourced)
        allergies (optional)
        medical history { healthSchema }

<!-- activity-needs:  -->
<!-- size: Small/Medium/Large  -->

- User Data:

        username: string!
        email: string!
        password: string!
        location: PUBLISH THEIR IP ADDRESS
        petToRehome: [PetId]

* Listing Data:

        DateCreated
        dateEnds
        Pet: { Pet }
        postedBy: {User}
        distance: range the person is willing to drive

<!-- adoptionOpen: boolean -->

# Front-End

## Pages

* homePage
* searchedPets
* viewPet

## Components
* Nav
* searchComponent
* listingCardComponent
* fullListingComponent
* LoginForm
* SignupForm

## Functionality

- Filters for pet search
        
        Species Cat/Dog
        Location  zip-code/enter address?
        searchRadius with km/miles toggle?
        Gender M/F/Any
        child-safe

- Listing form:

        Name
        Age
        Sex: Radio buttons?
        Species:
        Breed
        Temperment
        child-safe?
        medicalHistory: {
                        allergies
                        vaccinated
                        Spayed/Neutered
                        }
        Description
        Img uploads



## Nice To Haves

* Chat feature

