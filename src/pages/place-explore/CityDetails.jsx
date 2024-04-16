import { useState, useRef } from "react";
import POIContainer from "./POIContainer";
import exploreCityOverlay from "../../assets/explore-city-overlay.jpg";
import { useItinerary } from "../../contexts/ItineraryContext";

export default function CityDetails() {
    const { city } = useItinerary();

    return (
        <div
            className="flex flex-col gap-4 bg-opacity-50 text-secondary"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${exploreCityOverlay})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div>
                <h2 className="text-3xl font-semibold pl-8 pt-6">
                    Explore City Name!
                </h2>
            </div>
            <div>
                <h2 className="text-2xl font-semibold pl-8 pt-6">
                    Arts and Entertainment
                </h2>
                <POIContainer city={city} category={10000} />
            </div>
            <div>
                <h2 className="text-2xl font-semibold pl-8 pt-6">
                    Dining and Drinking
                </h2>
                <POIContainer city={city} category={13000} />
            </div>
            <div>
                <h2 className="text-2xl font-semibold pl-8 pt-6">
                    Landmarks and Outdoors
                </h2>
                <POIContainer city={city} category={16000} />
            </div>
        </div>
    );
}
