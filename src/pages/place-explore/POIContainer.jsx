import React, { useEffect, useRef, useState } from "react";
import AddPOIModal from "./AddPOIModal";
import apiKeys from "../../../apiKeys";
import LeftChevronIcon from "../../icons/LeftChevronIcon";
import RightChevronIcon from "../../icons/RightChevronIcon";

export default function POIContainer({ city, category }) {
    const containerRef = useRef(null);
    const apiKey = apiKeys.foursquare;
    const [placesData, setPlacesData] = useState([]);
    const [modalData, setModalData] = useState({ placeName: "", address: "", category: "" });
    
    const scrollRight = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: 300, // Scroll distance
                behavior: "smooth",
            });
        }
    };

    const scrollLeft = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

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
