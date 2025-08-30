import {useAuthStore} from "../store/authStore";
import Header from '../components/header';
import Card from '../components/card';

const DashboardPage = () => {
    const {user, isCheckingAuth} = useAuthStore();

    if (isCheckingAuth) {
        return <div>Loading...</div>
    }
    return(
        <div className="flex flex-col h-screen w-screen bg-blood">
            <Header/>
            <div className="bg-ciel h-screen w-screen grid grid-cols-4 gap-5 p-5">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>

            </div>
        </div>

    )
}

export default DashboardPage