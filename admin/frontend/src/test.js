const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    const saltRounds = 10; // Number of hashing rounds
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("Hashed Password:", hashedPassword);
};

hashPassword("admin@1234");