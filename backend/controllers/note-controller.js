import { Note } from '../models/notes.js';

export const getNotes = async (req, res) => {
    try {
        console.log("req.userId =", req.userId);
        const notes = await Note.find ({ user: req.userId });
        console.log("notes found =", notes);
        res.status(200).json({
            success: true, notes
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
        const note = await Note.findById({ _id: req.params.id });
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note introuvable' });
        }
        res.status(200).json({
            success: true,
            note
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
        console.log("req.body:", req.body);
        const note = await Note.create({ ...req.body, user: req.userId });
        res.status(201).json({ 
            success: true, 
            note 
        })
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
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ 
                success: false,
                message: 'Note not found' 
            })};
        res.status(200).json({
            success: true,
            note
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
        let query = req.query.q;
        
        if (!query || query.trim() === "") {
            query = "";
        }
        const notes = await Note.find({ 
            user: req.userId,
            $or: [
                { title: { $regex: query, $options: "i"}},
                { body: { $regex: query, $options: "i"}},

            ],
        });
        res.status(200).json({success: true, notes});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: "sEARCH FAILED"});
    }
}
