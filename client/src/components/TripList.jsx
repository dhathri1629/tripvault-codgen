import React, { useEffect, useState } from "react";

import TripCard from "./TripCard";

import { getTrips } from "../services/tripService";

import "../styles/tripList.css";


function TripList(){

const [trips,setTrips] = useState([]);
const [loading,setLoading] = useState(true);



useEffect(()=>{

fetchTrips();

},[]);



const fetchTrips = async()=>{

try{

const response = await getTrips();

setTrips(response.data);

}

catch(error){

console.log("Error fetching trips",error);

}

finally{

setLoading(false);

}

};



return(

<div className="trip-list">


<h2>
🧳 My Trips
</h2>



{
loading ?

<p>Loading trips...</p>


:

trips.length === 0 ?

<p>
No trips found. Start your first journey!
</p>


:

<div className="trip-grid">

{

trips.map((trip)=>(

<TripCard

key={trip._id}

trip={trip}

/>

))

}

</div>

}



</div>

);

}


export default TripList;