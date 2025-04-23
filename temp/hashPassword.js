// hashPassword.js
const bcrypt = require('bcrypt');

async function generateHashedPassword() {
    const plainPassword = "mypassword"; // change this
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log("Hashed Password:", hashedPassword);
}

generateHashedPassword();
