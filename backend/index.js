import express from 'express';
import { connectToDatabase } from './database/connectionToDatabase.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-route.js';
dotenv.config();

const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Welcome to SecureNotes API :)');
});

connectToDatabase();

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
