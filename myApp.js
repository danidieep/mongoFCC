const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('dotenv').config();
const {MONGO_URI} = process.env
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {
  let bachicha = new Person({name: "Lore Bachicha", age: 21, favoriteFoods:["huevos",  "salchicha", "Avena", "manzana"]})
  bachicha.save((err, data) =>{
    if(err) return console.log(err)
    done(null, data);
  })
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) =>{
  if(err) return console.log(err)
  // console.log(personFound)
  done(null, personFound );
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, personFound) =>{
    if (err) return console.log(err)
    // console.log(personFound)
    done(null , personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err, personFound) =>{
    if (err) return console.log(err)
    // console.log(personFound)
    done(null , personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id:personId}, (err, personFound) =>{
    if (err) return console.log(err)
    personFound.favoriteFoods.push(foodToAdd)
    personFound.save((err, data) =>{
      if(err) return console.log(err)
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOne({name:personName}, (err, personFound) =>{
    if (err) return console.log(err)
    personFound.age = ageToSet
    console.log(personFound)
    personFound.save((err, data) =>{
      if(err) return console.log(err)
      done(null, data);
    })
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete({_id:personId}, (err, personFound) =>{
    if (err) return console.log(err)
      done(null, personFound);
  }) 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name:nameToRemove}, (err, personFound) =>{
    if (err) return console.log(err)
    console.log(personFound)
      done(null, personFound);
    })
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";
  await Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({age:0})
  // console.log(orden)
  .exec((err, people) =>{
    if (err) return console.log(err)
    done(null, people);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
