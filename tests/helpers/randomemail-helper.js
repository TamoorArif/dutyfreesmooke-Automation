// helpers/randomemail-helper.js
function generateRandomEmail() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';

  // Generate 8 random letters
  for (let i = 0; i < 8; i++) {
    randomString += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return `user_${randomString}@yopmail.com`;
}

module.exports = { generateRandomEmail };