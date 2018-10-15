function GiveMeYourName(name) {
  return name;
}

const lukas = {
  name: "Lukas",
  surname: "Mironidis",
  age: 30
};

const alex = {
  name: "Alex",
  surname: "Mironidis",
  age: 25
};

console.log("edw", greet(lukas));

function greet(lukas) {
  return (
    "hello my name is " +
    lukas.name +
    lukas.surname +
    "and I am" +
    lukas.age +
    "years old"
  );
}
