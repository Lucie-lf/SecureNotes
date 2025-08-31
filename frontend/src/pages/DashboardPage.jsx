import {useAuthStore} from "../store/authStore";
import { useNoteStore } from '../store/noteStore';
import { useState, useEffect } from 'react';
import Header from '../components/header';
import Card from '../components/card';

const DashboardPage = () => {
    const { isCheckingAuth} = useAuthStore();
    const { notes, getNotes, createNote } = useNoteStore();

    useEffect(() => {
        getNotes();
    }, []);

    if (isCheckingAuth) {
        return <div>Loading...</div>
    }

    const handleCreateNote = async () => {
       const title = "Titre";
       const body = "Contenu...";
       await createNote(title, body);
    };


    return(
        <div className="flex flex-col h-screen w-screen bg-blood">
            <Header/>
            <div className="h-screen w-screen grid grid-cols-4 gap-5 p-5">
                {notes.map(notes => (
                    <Card 
                        key={notes._id}
                        _id={notes._id}
                        title={notes.title} 
                        body={notes.body} 
                        date={new Date(notes.createdAt).toLocaleDateString()} 
                    />
                    
                ))}

                <button 
                    className="flex px-2 py-1 text-ciel font-gara text-md border-1 border-dashed border-ciel rounded-full hover:bg-nape hover:text-blood cursor-pointer self-start place-self-start"
                    onClick={handleCreateNote}>
                    ✚
                </button>

            </div>
        </div>

    )
}

export default DashboardPage