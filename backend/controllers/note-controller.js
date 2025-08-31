import { Note } from '../models/notes.js';
import CryptoJS from 'crypto-js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find ({ user: req.userId });
        
        const decryptedNotes = notes.map(note => {
            const decryptedBody = CryptoJS.AES.decrypt(note.body, process.env.CRYPT_SECRET).toString(CryptoJS.enc.Utf8);
            return {
                ...note._doc,
                body: decryptedBody,
            };
        });
        
        
        res.status(200).json({
            success: true, notes: decryptedNotes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch notes"
        });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.userId });
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note introuvable' });
        }
        const decryptedBody = CryptoJS.AES.decrypt(note.body, process.env.CRYPT_SECRET).toString(CryptoJS.enc.Utf8);
        res.status(200).json({
            success: true,
            note: {
                ...note._doc,
                body: decryptedBody,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch note' 
        });
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, body } = req.body;
        const encryptedBody = CryptoJS.AES.encrypt(body, process.env.CRYPT_SECRET).toString();
        console.log("Encrypted body:", encryptedBody);

        const note = await Note.create({ title, body: encryptedBody, user: req.userId });
        console.log("Body stored in DB:", note.body);
        
        res.status(201).json({ 
            success: true, 
            note: { ...note._doc, body },
        });
        console.log("Body stored in DB:", note.body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to create note"
        })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, body } = req.body;
        const encryptedBody = CryptoJS.AES.encrypt(body, process.env.CRYPT_SECRET).toString()
            
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title, body: encryptedBody },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ 
                success: false,
                message: 'Note not found' 
            })};
        res.status(200).json({
            success: true,
            note: { ...note._doc, body },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ 
            success: false,
            message: 'Failed to update note' 
        });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId});
        if (!note){
            return res.status(404).json({ success: false, message: "Note not found"});
        }
        res.status(200).json({success: true, message : "Note deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: "failed to delete note"});
    }
}

export const searchNotes = async (req, res) => {
    try {
        const query = req.query.q || "";
        
        const notes = await Note.find({ 
            user: req.userId,
            title: { $regex: query, $options: "i"},
        });

        const decryptedNotes = notes.map(note => ({ 
            ...note._doc,
            body: CryptoJS.AES.decrypt(note.body, process.env.CRYPT_SECRET).toString(CryptoJS.enc.Utf8),
        }));

        res.status(200).json({success: true, notes: decryptedNotes });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: "sEARCH FAILED"});
    }
}
