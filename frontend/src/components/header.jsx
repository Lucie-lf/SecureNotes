import { useAuthStore } from "../store/authStore";

function Header() {
const { user, logout } = useAuthStore();

const handleLogout = async () => {
    await logout();
  };

    return (
        <header className="flex flex-row justify-between m-5 items-center">
            <p className="text-ciel font-gara text-2xl">{user.name}'s secret notes.</p>
            <div className=""><input className="bg-nape rounded-xs w-[40%] h-7"></input></div>
            <button className="border-1 px-2 rounded-full font-gara border-ciel text-ciel hover:border-none hover:bg-ciel hover:text-blood cursor-pointer" onClick={handleLogout}>❧</button>
        </header>
    )
}

export default Header;