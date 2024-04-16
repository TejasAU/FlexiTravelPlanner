import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchItineraries from "./SearchItineraries";

export default function ExplorePlans() {
    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState([]);
    const [filteredItineraries, setFilteredItineraries] = useState([]);

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        try {
            const response = await fetch(
                "http://localhost:3001/api/itinerary/getAllItinerariesWithStats",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.status === 200) {
                const responseData = await response.json();
                setItineraries(responseData);
                setFilteredItineraries(responseData);
            } else {
                console.log("Itinerary fetching failed");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex flex-col gap-4 bg-base-200 text-secondary min-h-screen">
            <div>
                <h2 className="text-3xl font-semibold pl-8 pt-4">
                    Itinerary Viewer
                </h2>
            </div>
            <div>
                <h2 className="text-md font-semibold pl-8 pt-4">
                    Embark on a journey through the eyes of fellow travelers.
                    Explore curated itineraries and discover the world's hidden
                    gems.
                </h2>
            </div>
            <div className="flex flex-col justify-center items-center mt-6 gap-8">
                <SearchItineraries
                    itineraries={itineraries}
                    setFilteredItineraries={setFilteredItineraries}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItineraries.map((itinerary, index) => (
                        <div key={index} className="inline-block px-3">
                            <div className="card w-96 bg-neutral shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        Itinerary for {itinerary.cityName}
                                    </h2>
                                    <p>Created by: {itinerary.userName}</p>
                                    <p>{itinerary.desc}</p>
                                    <p>
                                        Duration of trip:{" "}
                                        {itinerary.durationOfTrip}
                                    </p>
                                    <p>
                                        No. of places added:{" "}
                                        {itinerary.numberOfPlacesAdded}
                                    </p>
                                    <div className="card-actions justify-end">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                navigate(
                                                    `/myplans/${itinerary._id}`
                                                )
                                            }
                                        >
                                            View Full Itinerary
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
