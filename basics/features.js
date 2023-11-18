const animal = "Tiger";
const animal1 = "Lion";
const animal2 = "Elephant";
const animal3 = "Deer";

// Defualt way to export => module.exports = animal
//latest and recommeded way
export default animal; // you can use this way for single use or
export { animal, animal2, animal1, animal3 };

// insted of doing this you can also do this
//{
// export const animal = "Tiger";
// export const animal1 = "Lion";
// export const animal2 = "Elephant";
// export const animal3 = "Deer";
//}

// Same you can export any function you've created

export const generateRandomNumber = () => {
  return `${~~(Math.random() * 100)}%`;
};
