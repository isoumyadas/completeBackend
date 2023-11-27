// This is first way to export
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}

module.exports = {
  add,
  sub, // Here we export the module
};

// Second way to export

// exports.add = (a, b) => {
//   a + b;
// };
// exports.sub = (a, b) => {
//   a + b;
// };
