const db = require('../config/connections');
const { User, Pet} = require('../models');
const userSeeds = require('./users.json')
const petSeeds = require('./pets.json')

db.once('open', async () => {
    try {
        await User.deleteMany({}); //working
        await Pet.deleteMany({}); //working

        await User.create(userSeeds); //working
        const userList = await User.find({})
        for (let i = 0; i < petSeeds.length; i++) {
            const seedPet = await Pet.create(petSeeds[i])
            const user = await User.findOneAndUpdate(
                {_id: userList[i]._id},
                { $addToSet:{petsForAdoption: seedPet._id} }
            )
            console.log(`${seedPet.name} added to ${userList[i].username}`)
        }
    } catch (err) {
        console.err(err);
        process.exit(1)
    }
    console.log('Seeds planted')
    process.exit(0)
})