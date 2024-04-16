import { useEffect, useState } from "react";

export default function SearchItineraries({ itineraries, setFilteredItineraries }) {
    const [cityName, setCityName] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        // Filter itineraries based on the selected city name
        const filtered = itineraries.filter((itinerary) =>
            itinerary.cityName.toLowerCase().includes(cityName.toLowerCase())
        );

        // Sort the filtered itineraries based on the selected sort option
        if (sortOption === "Duration") {
            filtered.sort((a, b) => a.durationOfTrip - b.durationOfTrip);
        } else if (sortOption === "Places Added") {
            filtered.sort((a, b) => a.numberOfPlacesAdded - b.numberOfPlacesAdded);
        }

        // Update the state with the filtered and sorted itineraries
        setFilteredItineraries(filtered);
    }, [cityName, sortOption, itineraries, setFilteredItineraries]);

    return (
        <div className="join">
            <div>
                <div>
                    <input
                        className="input input-bordered join-item"
                        placeholder="Search for city"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                </div>
            </div>
            <select
                className="select select-bordered join-item"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option disabled value="">Sort By</option>
                <option value="Duration">Duration</option>
                <option value="Places Added">Places Added</option>
            </select>
        </div>
    );
}
