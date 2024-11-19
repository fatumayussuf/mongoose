import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up the MongoDB URI using environment variable for password
const uri = `mongodb+srv://fatumayussuf:${process.env.MONGODB_PASSWORD}@cluster0.r1xw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB connection (Updated with removed deprecated options)
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the Person schema and model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String], required: true }
});

// Create the Person model from the schema
const Person = mongoose.model('Person', personSchema);

// Example 1: Create and Save a Record
const createAndSavePerson = async (personObj) => {
  try {
    const person = new Person(personObj);
    const savedPerson = await person.save();
    console.log("Person saved:", savedPerson);
  } catch (err) {
    console.error("Error saving person:", err);
  }
};

// Example 2: Create Many Records
const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log("People created:", people);
  } catch (err) {
    console.error("Error creating people:", err);
  }
};

// Example 3: Find People by Name
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name: name });
    console.log("People found:", people);
  } catch (err) {
    console.error("Error finding people by name:", err);
  }
};

// Example 4: Find One Person by Food
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log("Person found by food:", person);
  } catch (err) {
    console.error("Error finding person by food:", err);
  }
};

// Example 5: Find a Person by ID
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Person found by ID:", person);
  } catch (err) {
    console.error("Error finding person by ID:", err);
  }
};

// Example 6: Perform Classic Updates (Find, Edit, then Save)
const findEditThenSave = async (personId, food) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push(food);
    const updatedPerson = await person.save();
    console.log("Updated person:", updatedPerson);
  } catch (err) {
    console.error("Error updating person:", err);
  }
};

// Example 7: Perform New Updates (findOneAndUpdate)
const findAndUpdate = async (personName, newAge) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: newAge },
      { new: true }
    );
    console.log("Updated person:", updatedPerson);
  } catch (err) {
    console.error("Error updating person:", err);
  }
};

// Example 8: Delete One Person by ID (Updated)
const removeById = async (personId) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(personId);
    console.log("Deleted person:", deletedPerson);
  } catch (err) {
    console.error("Error deleting person:", err);
  }
};

// Example 9: Delete Many People by Name (Updated)
const removeManyPeople = async (name) => {
  try {
    const result = await Person.deleteMany({ name: name });
    console.log("Removed people:", result);
  } catch (err) {
    console.error("Error removing people:", err);
  }
};

// Example 10: Chain Search Query Helpers
const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: "burrito" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();
    console.log("Query chain result:", data);
  } catch (err) {
    console.error("Error in query chain:", err);
  }
};

// Run the functions with example data
const examplePerson = {
  name: "John Doe",
  age: 30,
  favoriteFoods: ["Pizza", "Burger"]
};

createAndSavePerson(examplePerson);

const arrayOfPeople = [
  { name: "Mary", age: 25, favoriteFoods: ["Pizza", "Ice Cream"] },
  { name: "Peter", age: 35, favoriteFoods: ["Burrito", "Tacos"] }
];

createManyPeople(arrayOfPeople);
findPeopleByName("John Doe");
findOneByFood("Pizza");
findPersonById("64b38f35c8b9c403eb1e19f7");  // Replace with an actual personId
findEditThenSave("64b38f35c8b9c403eb1e19f7", "Hamburger");  // Replace with actual personId
findAndUpdate("John Doe", 25);
removeById("64b38f35c8b9c403eb1e19f7");  // Replace with actual personId
removeManyPeople("Mary");
queryChain();
