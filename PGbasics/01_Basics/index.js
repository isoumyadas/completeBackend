// Here we import the func // But the fact is, you should known where to export and where to import

const { add, sub } = require("./math");
console.log(sub(3, 4));
console.log(add(5, 8));
