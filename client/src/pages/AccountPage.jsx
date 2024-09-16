import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage(){

    const { subpage } = useParams();
    const { ready, user, setUser, logout, setLogout} = useContext(UserContext);

    async function logoutUser(){
        await axios.post('/logout');
        setUser(null);
        setLogout(true);

    }

    if(!ready) return 'Loading...';

    if(logout) { return < Navigate to={'/'} />};

    if(!user && ready) { return <Navigate to="/login" />; }

    return (
        <div>
            <nav className="w-full mt-8 flex gap-4 justify-center" >
                <Link to="/account" className={subpage?'py-2 px-6':'py-2 px-6 bg-primary text-white rounded-lg'}/*"py-2 px-6 "*/> My profile </Link>
                <Link to="/account/bookings" className={subpage === "bookings" ?'py-2 px-6 bg-primary text-white rounded-lg':'py-2 px-6'}> My bookings </Link>
                <Link to="/account/places" className={subpage === "places" ?'py-2 px-6 bg-primary text-white rounded-lg':'py-2 px-6'}> My accommodations </Link>
            </nav>

            {
                !subpage && (
                    <div className="text-center  max-w-lg mx-auto mt-4">
                        Logged as {user.name} ({user.email})
                        <br />
                        <button onClick={logoutUser} className="primary max-w-sm mt-4"> Logout </button>
                    </div>
                )
            }
        </div>
    )
}