import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import DropDown from "../components/DropDown";

export default function PlacePage(){

    const {id} = useParams();
    const [place, setPlace] = useState();
    const [allPhotos, setAllPhotos] = useState(false);
    const [nbGuests, setNbGuests] = useState(1);
    useEffect(() => {
        axios.get(`/places/${id}`)
        .then(response => {
            setPlace(response.data);
        });
    }, [id])

    const address = place?.address.split(',');
    const newAddress = address?.[0] +', ' + address?.[address?.length - 1];

    if(allPhotos) {
        return (
            <div className="absolute inset-0 bg-black min-h-screen text-white">
                <div className="">
                <h1 className="text-3xl px-8 items-center">Photos of {place?.title}</h1>
                <button type="button" className="flex text-center bg-primary text-white p-2 hover:bg-white hover:text-black hover:font-bold  fixed right-8 font-bold -mt-9" onClick={() => setAllPhotos(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
                <div className="bg-black px-8 grid gap-4 grid-cols-3 py-2">
                {
                    place?.photos?.map((photo, index) => 
                        <img src={'http://localhost:4000/uploads/' + photo?.newName} alt="" className="object-cover h-full" key={index + photo?.newName} />
                    )
                }
                </div>
            </div>
        )
    }

    return(
        <div className="mt-4 bg-gray-100 p-8 -mx-8">
           <h1 className="text-3xl">
            {place?.title}
           </h1>
           <a href={"https://maps.google.com/?q=" + newAddress} target="_blank" className="flex gap-1 items-center font-semibold underline "> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {newAddress}
            </a>
           <div className="grid grid-cols-2 h-[800px] w-full mt-2 gap-2 mb-10">
                <div className="">
                    {
                        place?.photos?.[0] && (
                            <img src={'http://localhost:4000/uploads/' + place?.photos?.[0]?.newName} alt="" className="rounded-tl-lg object-cover w-full h-[400px]" />
                        )
                    }
                </div>
                <div className="group relative flex">
                {
                        place?.photos?.[1] && (
                            <img src={'http://localhost:4000/uploads/' + place?.photos?.[1]?.newName} alt="" className="rounded-tr-lg object-cover h-[400px] w-full" />
                        )
                    }
                </div>
                <div className="">
                {
                        place?.photos?.[2] && (
                            <img src={'http://localhost:4000/uploads/' + place?.photos?.[2]?.newName} alt="" className="rounded-bl-lg object-cover h-[400px] w-full" />
                        )
                    }
                </div>
                <div className="">
                {
                        place?.photos?.[3] && (
                            <img src={'http://localhost:4000/uploads/' + place?.photos?.[3]?.newName} alt="" className="rounded-br-lg object-cover h-[400px] w-full" />
                        )
                    }
                </div>
                <div className="bg-primary text-white w-[200px] gap-2 items-center lg:bottom-[20rem] lg:right-[5rem] md:bottom-[20rem] md:right-[5rem]  2xl:bottom-[25rem] xl:right-[5rem] xl:bottom-[20rem]  justify-center p-2 absolute rounded-lg shadow shadow-md shadow-gray-250 2xl:right-[40rem] flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <button type="button" className="font-bold" onClick={() => setAllPhotos(true)}> Show more photos</button>
                </div>                
           </div>
            <div className="grid grid-cols-[2fr_1fr] items-center gap-2">
                <div className=" border rounded-lg p-2 bg-white items-center grid grid-cols-[1fr]">      
                    <div className="my-4 px-4">
                            <h2 className="font-semibold text-2xl">Description</h2>
                            {place?.description}
                    </div>
                    <div className="grid mb-11">
                        <span className="text-2xl text-center">Check In/Out & Guests </span> <br />
                        <div className="flex justify-between px-24">
                            <span className="font-bold">Check-In: {place?.checkIn} </span>
                            <span className="font-bold">Check-Out: {place?.checkOut} </span>
                            <span className="font-bold">Max number of guests: {place?.maxGuests} </span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <div className="text-2xl text-center mb-2">
                        Price: <span className="font-bold"> €{place?.price}</span> <span className="text-sm">per night</span><br />
                    </div>
                    <div className="border-2 rounded-lg my-4 border-gray-400">
                        <div className="flex">
                            <div className="py-3 px-4">
                                <label htmlFor="date-in" className="font-bold">CHECK-IN</label>
                                <input type="date" name="date-in" id="" />
                            </div>
                            <div className="py-3 px-4 border-l-2 border-gray-400">
                                <label htmlFor="date-out" className="font-bold text-center">CHECK-OUT</label>
                                <input type="date" name="date-out" id="" />
                            </div>
                        </div>
                        <div className="py-3 border-t-2 px-4 grid grid-cols-[2fr_1fr] items-center border-gray-400 text-center">
                            <label htmlFor="" className="mx-2 font-bold">Guests<span className="font-normal">:</span></label>
                            <DropDown guestsNumber={place?.maxGuests} nbGuests={nbGuests} setNbGuests={setNbGuests}/>
                        </div>
                    </div>
                    <button className="primary">Book now</button>
                </div>
            </div>
        </div>
    )
}