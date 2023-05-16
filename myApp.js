require('dotenv').config();

/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI); // DON'T FORGET URI FROM MONGO DB 

// 2 Create a Model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods:
    [String]
});

const Person = mongoose.model('Person', personSchema);

// 3 Create and Save a Record of a Model
var createAndSavePerson = (done) => {
  var persona = new Person(
    {
      name: "William Step",
      age: 34,
      favoriteFoods: ["meat", "rice", "vegetables"]
    });

  persona.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

// 5 Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

// 6 Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, foundByFood) {
    if (err) return console.log(err);
    done(null, foundByFood);
  });
};

// 7 Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, foundById) {
    if (err) return console.log(err);
    done(null, foundById);
  });
};

// 8 Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, function(err, person) {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

// 9 Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // findOneAndUpdate uses ( conditions , update , options , callback ) as arguments.
  // Note: You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function(err, updateAge) {
      if (err) return console.log(err); done(null, updateAge);
    })
};

// 10 Delete One Document Using model.findByIdAndRemove
var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if (err) return console.log(err);
      done(null, removedDoc);
    }
  );
};

// 11 Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
  {name: nameToRemove}, 
  function(err, removeFromDoc) {
    if(err) return console.log(err);
    done(null, removeFromDoc)
    }
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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

