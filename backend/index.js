import express from 'express';
import { connectToDatabase } from './database/connectionToDatabase.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-route.js';
import notesRoutes from './routes/notes-route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json()); 
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to SecureNotes API :)');
});

connectToDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
