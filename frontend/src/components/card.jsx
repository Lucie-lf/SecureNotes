import { useState } from 'react';
import { useNoteStore } from '../store/noteStore';

function Card({ _id, title, body, date }) {

const { deleteNote, updateNote } = useNoteStore();
const [isEditing, setIsEditing] = useState(false);
const [editedBody, setEditedBody] = useState(body);
const [editedTitle, setEditedTitle] = useState(title);

const handleDelete = async () => {
    await deleteNote(_id);
  };

const handleEdit = () => {
    setIsEditing(true);
  };

const handleChangeTitle = (e) => {
    setEditedTitle(e.target.value);
};

const handleChangeBody = (e) => {
    setEditedBody(e.target.value);
};

const handleSauv = async (e) => {
    if (e.key === 'Enter'|| e.type === 'blur') {
        e.preventDefault();
        await updateNote(_id, { title: editedTitle }, { body: editedBody });
        setIsEditing(false);
    }
}

    return (
        <div className="flex flex-col gap-2 bg-blood">
            <div className="flex flex-col justify-between bg-nape rounded-xs p-5 h-full">
                <div className="gap-1">
                    <textarea 
                        className="text-ciel w-full font-gara text-xl resize-none border-none outline-none cursor-pointer"
                        value={editedTitle}
                        readOnly={!isEditing}
                        onClick={handleEdit}
                        onChange={handleChangeTitle}
                        onKeyDown={handleSauv}
                        maxLength={50}
                    />
                    <textarea 
                        className="text-blood font-gara text-md w-full h-full bg-nape resize-none border-none outline-none cursor-pointer"
                        value={editedBody}
                        readOnly={!isEditing}
                        onClick={handleEdit}
                        onChange={handleChangeBody}
                        onKeyDown={handleSauv}
                        maxLength={200}
                    />
                </div> 
            
                <div className="flex flex-row justify-end gap-1">
                    
                    <button 
                        className="border-1 px-2 rounded-full font-gara border-ciel text-ciel hover:bg-ciel hover:text-blood cursor-pointer" 
                        onClick={handleDelete}>
                            🗑
                    </button>
                </div>
                
            </div>

            <div className="font-gara italic text-ciel text-end">
                <p>
                    {date}
                </p>
            </div>
        </div>
    )
}

export default Card;