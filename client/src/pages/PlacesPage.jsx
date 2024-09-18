/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PerksLabel from "../components/PerksLabel";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";

export default function PlacesPage(){
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [guests, setGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [redirect, setRedirect] = useState();
    const [addedPlacesList, setAddedPlacesList] = useState([]);

    useEffect(() => {
        axios.get('/places')
            .then(response => {
                setAddedPlacesList(response.data);
            })
    },[])


    function change(val, func){
        func(val.target.value);
    }

    async function addNewPlace(ev){
        ev.preventDefault();
        /* const {data} =  */await axios.post('/places',  {
            title, address,
            addedPhotos, description,
            perks, extraInfo,
            checkin, checkout, guests
        });
        setRedirect('/account/places');
    }

    if(redirect && action === "new") {
        return <Navigate to={redirect} />
    };

    return (
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
                    <div className="mt-4 ">
                        {
                            addedPlacesList.length > 0 && addedPlacesList.map(place =>
                                <div key={place.id} className="bg-gray-200 p-4 rounded-lg">
                                    <div>
                                        {
                                            place.photos.length > 0  && (
                                                <img src={"http://localhost:4000/uploads/" + place.photos[0].newName} alt=""  className=" h-60 w-60rounded-lg shadow-md shadow-gray-200 z-0  object-cover" />
                                            )
                                        }
                                    </div>
                                    {
                                        place.title
                                    }
                                </div>
                            )
                        }
                    </div>
                 )
            }
            {
                action === "new" && (
                    <div>
                        <form onSubmit={addNewPlace}>
                            <h2 className="text-2xl mt-4">Title</h2>
                            <p className="text-gray-400 text-sm -mb-3">Title for your place. Should be short and catchy as in advertisement.</p>
                            <input type="text" placeholder="title" name="title" id="title" value={title} onChange={e => change(e, setTitle)}/>
                            <h2 className="text-2xl mt-4">Address</h2>
                            <p className="text-gray-400 text-sm -mb-3">Address for this place.</p>
                            <input type="text" name="" id="address" placeholder="address" value={address} onChange={e => change(e, setAddress)}/>
                            <h2 className="text-2xl mt-4">Photos</h2>
                            <p className="text-gray-400 text-sm -mb-3">more = better.</p> 
                            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                            <h2 className="text-2xl mt-4">Description</h2>
                            <p className="text-gray-400 text-sm -mb-3">Description of the place.</p>
                            <textarea id="description" value={description} onChange={e => change(e, setDescription)}/>
                            <h2 className="text-2xl mt-4">Perks</h2>
                            <p className="text-gray-400 text-sm">Select all the perks of your place.</p> 
                            <PerksLabel selected={perks} onChange={setPerks}/>
                            <h2 className="text-2xl mt-4">Extra info</h2>
                            <p className="text-gray-400 text-sm -mb-3">Information about the house rules.</p> 
                            <textarea value={extraInfo} onChange={e => change(e, setExtraInfo)}/>
                            
                            <h2 className="text-2xl mt-4">Check in&out times</h2>
                            <p className="text-gray-400 text-sm">Add check in and out times. Remember to have some time window for cleaning between guests.</p> 
                            <div className="grid sm:grid-cols-3 gap-4 mt-2">
                                <div>
                                    <h4 className=" mb-1">Check-in</h4>
                                    <input type="time" name="" id="checkin" className="border py-2 px-6 rounded-lg" value={checkin} onChange={e => change(e, setCheckin)}/>
                                </div>
                                <div>
                                    <h4 className="mb-1">Check-out</h4>
                                    <input type="time" name="" id="checkout" className="border py-2 px-6 rounded-lg" value={checkout} onChange={e => change(e, setCheckout)}/>
                                </div>
                                <div>
                                    <h4 className="mb-1">Max number of guests</h4>
                                    <input type="number" name="" id="guests" className="border py-2 px-6 rounded-lg" value={guests} onChange={e => change(e, setGuests)}/>
                                </div>
                            </div>
                            <button type="submit" className="primary my-4">Save</button>
                        </form>
                    </div>
                )
            }
        </div>                       
    )
} 