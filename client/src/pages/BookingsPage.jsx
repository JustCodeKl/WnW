import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { Link, useLocation } from "react-router-dom";

export default function BookingsPage(){
    const [bookingList, setBookingList] = useState();
    const {pathname} = useLocation();
    const actualDate = Date.now();
    let action = pathname.split('/')?.[3];

    useEffect(() => {
        axios.get('/user-bookings')
            .then((response) =>{
                if(response.status === 200) {
                    setBookingList(response.data)
                }
            })
    }, []);

    function linkClasses (type=null) {
        let classes = 'inline-flex gap-2 py-2 px-6 rounded-lg shadow-md shadow-gray-250';
        if(type === action){
            classes += ' bg-primary text-white';
        } else classes += ' bg-gray-200';

        return classes
    }
    
    return(
        <>
            <NavBar />
            <nav className="w-full my-6 flex gap-4 justify-center" >
                <Link to="/account/bookings/old" className={linkClasses('old')}> 
                    Old 
                </Link>
                <Link to="/account/bookings/all" className={linkClasses('all')}> 
                    All 
                </Link>
                <Link to="/account/bookings/upcoming" className={linkClasses('upcoming')}> 
                    Upcoming 
                </Link>
            </nav>
                {
                    bookingList?.length > 0 && action === "old" &&  
                                        bookingList?.filter(booking => differenceInCalendarDays(new Date(actualDate), new Date(booking.checkOut)) > 0)
                                        .map((booking, index) => 
                        <>
                            <div className="my-2 bg-gray-100 gap-4  w-full mx-auto flex rounded-lg" key={booking._id + '-' + index}>
                                <div className="w-[180px]" key={index + booking._id}>
                                    {
                                        booking.place.photos.length > 0 && (
                                            <img
                                            src={
                                              "http://localhost:4000/uploads/" +
                                              booking.place.photos[0].newName
                                            }
                                            alt=""
                                            className="h-[120px] w-[180px] rounded-lg object-cover"
                                            key={booking.place._id + booking._id}
                                          />
                                        )
                                    }
                                </div>
                                <div className="py-3 w-full" key={booking._id + index}>
                                    <h2 className="text-xl" key={booking.place._id + index}>{booking.place.title}</h2>
                                    
                                    <div className=" border-t-2 border-gray-300 mt-1 py-2">
                                        <div className="">
                                            {booking.checkIn.split('T')[0] + ' ' + booking.place.checkIn} &rarr; {booking.checkOut.split('T')[0] + ' ' + booking.place.checkOut}    
                                        </div> 
                                        <div className="">  
                                            <span className="border-r mr-2 border-gray-500"> Number of guests: {booking.numberOfGuests} </span>
                                            <span className="border-r mr-2 border-gray-500"> Number of nights: {differenceInCalendarDays(
                                                    new Date(booking.checkOut),
                                                    new Date(booking.checkIn)
                                                    )} </span>
                                            <span> Total price: €{booking.price}</span>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </>
                    )
                }
                 {
                    bookingList?.length > 0 && action === "all" &&  bookingList?.map((booking, index) => 
                        <>
                            <div className="my-2 bg-gray-100 gap-4  w-full mx-auto flex rounded-lg" key={booking._id + '-' + index}>
                                <div className="w-[180px]" key={index + booking._id}>
                                    {
                                        booking.place.photos.length > 0 && (
                                            <img
                                            src={
                                              "http://localhost:4000/uploads/" +
                                              booking.place.photos[0].newName
                                            }
                                            alt=""
                                            className="h-[120px] w-[180px] rounded-lg object-cover"
                                            key={booking.place._id + booking._id}
                                          />
                                        )
                                    }
                                </div>
                                <div className="py-3 w-full" key={booking._id + index}>
                                    <h2 className="text-xl" key={booking.place._id + index}>{booking.place.title}</h2>
                                    
                                    <div className=" border-t-2 border-gray-300 mt-1 py-2">
                                        <div className="">
                                            {booking.checkIn.split('T')[0] + ' ' + booking.place.checkIn} &rarr; {booking.checkOut.split('T')[0] + ' ' + booking.place.checkOut}    
                                        </div> 
                                        <div className="">  
                                            <span className="border-r mr-2 border-gray-500"> Number of guests: {booking.numberOfGuests} </span>
                                            <span className="border-r mr-2 border-gray-500"> Number of nights: {differenceInCalendarDays(
                                                    new Date(booking.checkOut),
                                                    new Date(booking.checkIn)
                                                    )} </span>
                                            <span> Total price: €{booking.price}</span>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    bookingList?.length > 0 && action === "upcoming" &&  
                                        bookingList?.filter(booking => differenceInCalendarDays(new Date(actualDate), new Date(booking.checkOut)) <= 0)
                                        .map((booking, index) => 
                        <>
                            <div className="my-2 bg-gray-100 gap-4  w-full mx-auto flex rounded-lg" key={booking._id + '-' + index}>
                                <div className="w-[180px]" key={index + booking._id}>
                                    {
                                        booking.place.photos.length > 0 && (
                                            <img
                                            src={
                                              "http://localhost:4000/uploads/" +
                                              booking.place.photos[0].newName
                                            }
                                            alt=""
                                            className="h-[120px] w-[180px] rounded-lg object-cover"
                                            key={booking.place._id + booking._id}
                                          />
                                        )
                                    }
                                </div>
                                <div className="py-3 w-full" key={booking._id + index}>
                                    <h2 className="text-xl" key={booking.place._id + index}>{booking.place.title}</h2>
                                    
                                    <div className=" border-t-2 border-gray-300 mt-1 py-2">
                                        <div className="">
                                            {booking.checkIn.split('T')[0] + ' ' + booking.place.checkIn} &rarr; {booking.checkOut.split('T')[0] + ' ' + booking.place.checkOut}    
                                        </div> 
                                        <div className="">  
                                            <span className="border-r mr-2 border-gray-500"> Number of guests: {booking.numberOfGuests} </span>
                                            <span className="border-r mr-2 border-gray-500"> Number of nights: {differenceInCalendarDays(
                                                    new Date(booking.checkOut),
                                                    new Date(booking.checkIn)
                                                    )} </span>
                                            <span> Total price: €{booking.price}</span>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </>
                    )
                }
        </>
    );
}