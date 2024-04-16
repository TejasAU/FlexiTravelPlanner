import React, { useEffect, useRef, useState } from "react";
import AddPOIModal from "./AddPOIModal";
import apiKeys from "../../../apiKeys";

export default function POIContainer({ city, category }) {
    const containerRef = useRef(null);
    const apiKey = apiKeys.foursquare;
    const [placesData, setPlacesData] = useState([]);
    const [modalData, setModalData] = useState({ placeName: "", address: "", category: "" });
    const scrollRight = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: 300, // Adjust the scroll distance as needed
                behavior: "smooth", // Add smooth scrolling animation
            });
        }
    };

    const scrollLeft = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: -300, // Adjust the scroll distance as needed
                behavior: "smooth", // Add smooth scrolling animation
            });
        }
    };

    const LeftChevronIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );

    const RightChevronIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );

    const handleAddPOI = (placeName, address, category) => {
        setModalData({ placeName, address, category });
    };

    const getCategoryString = (category) => {
        switch (category) {
            case 10000:
                return "Arts and Entertainment";
            case 13000:
                return "Dining and Drinking";
            case 16000:
                return "Landmark and Outdoors";
            default:
                return "";
        }
    };

    useEffect(() => {
        const placeSearch = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: apiKey,
                    },
                };

                try {
                    const response = await fetch(
                        `https://api.foursquare.com/v3/places/search?categories=${category}&fields=fsq_id%2Cname%2Clocation%2Cphotos&near=${city}`,
                        options
                    );
                    const data = await response.json();
                    console.log(data.results);
                    setPlacesData(data.results);
                } catch (error) {
                    console.error(error);
                }
            } catch (err) {
                console.error(err);
            }
        };
        placeSearch();
    }, []);

    return (
        <div className="flex mx-7 my-3 justify-center items-center gap-6">
            <button
                className="btn btn-circle btn-secondary"
                onClick={scrollLeft}
            >
                <LeftChevronIcon />
            </button>
            <div
                ref={containerRef}
                className="mt-6 flex flex-nowrap overflow-x-scroll no-scrollbar pb-4"
            >
                {placesData?.map((place, index) => (
                    <div key={index} className="inline-block px-3">
                        <div className="card w-96 bg-neutral shadow-xl">
                            <figure>
                                <img
                                    src={
                                        place.photos[0]?.prefix +
                                        "226x384" +
                                        place.photos[0]?.suffix
                                    }
                                    alt="Photo of a place"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{place.name}</h2>
                                <p>{place.location.formatted_address}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            handleAddPOI(
                                                place.name,
                                                place.location
                                                    .formatted_address,
                                                getCategoryString(category)
                                            )
                                        }
                                    >
                                        Add to Itinerary
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="btn btn-circle btn-secondary"
                onClick={scrollRight}
            >
                <RightChevronIcon />
            </button>
            <AddPOIModal
                placeName={modalData.placeName}
                address={modalData.address}
                category={modalData.category}
            />
        </div>
    );
}
