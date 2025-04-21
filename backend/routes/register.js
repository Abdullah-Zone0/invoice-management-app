import { Router } from 'express';
import { hash } from 'bcrypt';
// import User, { findOne } from '../models/User'; // Adjust the path as needed

const router = Router();

// User registration route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        // const existingUser = await findOne({ email });
        // if (existingUser) {
        //     return res.status(400).json({ message: 'User already exists' });
        // }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;