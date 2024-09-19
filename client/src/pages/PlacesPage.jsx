/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link, /* Navigate */ useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

export default function PlacesPage(){
    const {action} = useParams();
    const [addedPlacesList, setAddedPlacesList] = useState([]);

    useEffect(() => {
        axios.get('/user-places')
            .then(response => {
                setAddedPlacesList(response.data);
            })
    },[])



    /* if(redirect && action === "new") {
        return <Navigate to={redirect} />
    }; */

    return (
       <>
       <NavBar />

                    
        <div className="m-6">
        { action !== 'new' && (
             <div className="text-center">
                List of all added places <br />
             <Link className="bg-primary inline-flex gap-2 py-2 px-4 rounded-lg text-white" to={'/account/places/new'}> 
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
                 Add new place
             </Link>
            </div>
        )}
        {
             action !== 'new' && (
                <div className="mt-4">
                    {
                        addedPlacesList.length > 0 && addedPlacesList.map(place =>
                            <Link to={'/account/places/' + place._id} key={place.id} className="flex cursor-pointer bg-gray-100 gap-4 p-4 rounded-lg shadow-md shadow-gray-300 mb-4">
                                <div className="grow shrink-0 h-30 w-60 shadow-md shadow-gray-200 z-0  object-cover" >
                                    {
                                        place.photos.length > 0  && (
                                            <img src={"http://localhost:4000/uploads/" + place.photos[0].newName} alt="" className="rounded-lg h-full" key={place.id}/>
                                        )
                                    }
                                </div>
                                <div className="grow-0 shrink" key={place.id}>
                                    <h2 className="text-2xl font-bold" key={place.id}> { place.title } </h2>
                                    <p className="text-sm mt-2" key={place.id}> { place.description } </p>
                                </div>
                            </Link>
                        )
                    }
                </div>
             )
        }
        </div> 
        </>                      
    )
} 