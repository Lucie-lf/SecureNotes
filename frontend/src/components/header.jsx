import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNoteStore } from '../store/noteStore';

function Header() {
const { user, logout } = useAuthStore();
const { searchNotes } = useNoteStore();
const [inputSearch, setInputSearch] = useState("");

const handleLogout = async () => {
    await logout();
  };

const handleSearch = async () => {
    if (!inputSearch) return;
    await searchNotes(inputSearch);
};

    return (
        <header className="flex flex-row justify-between m-5 items-center">
            <p className="text-ciel font-gara text-2xl">{user.name}'s secret notes.</p>
            <div className="flex flex-row gap-2 items-center bg-nape rounded-xs p-1">
                <input 
                    className="bg-none outline-none font-gara text-blood placeholder:text-blood px-2"
                    placeholder="Search..."
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                >
                </input>
                <button 
                    className="border-1 px-2 rounded-full font-gara border-ciel text-ciel hover:bg-ciel hover:text-blood cursor-pointer"
                    onClick={() => handleSearch()}>
                        ❧
                </button>
            </div>
            <button 
                className="border-1 px-2 rounded-full font-gara border-ciel text-ciel hover:bg-ciel hover:text-blood cursor-pointer font-bold" 
                onClick={handleLogout}>
                    LOGOUT
            </button>
        </header>
    )
}

export default Header;