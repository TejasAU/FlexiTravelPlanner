import { useEffect, useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import DayTimeline from "./DayTimeline";
import { Link } from "react-router-dom";
import { useItinerary } from "../../contexts/ItineraryContext";
import { useParams } from "react-router-dom";

const ExploreCityButton = () => {
    return (
        <div className="flex items-center justify-center">
            <button className="btn btn-outline btn-secondary w-2/3">
                Explore Things to Do
            </button>
        </div>
    );
};

export default function PlanDetails() {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const [itinerary, setItinerary] = useState({});
    const {
        setCity,
        setItineraryId,
        setCityId,
        setStartDate,
        setEndDate,
        isReadOnly,
    } = useItinerary();

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    const { itineraryId } = useParams();
    useEffect(() => {
        const fetchSingleItinerary = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/itinerary/getItineraryById/${itineraryId}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (response.ok) {
                    const responseData = await response.json();
                    setItinerary(responseData.message);
                    const startDate = responseData.message.schedule[0].date;
                    const length = responseData.message.schedule.length;
                    const endDate =
                        responseData.message.schedule[length - 1].date;
                    // Update Context
                    setItineraryId(itineraryId);
                    setCityId(responseData.message.cityId);
                    setCity(responseData.message.cityName);
                    setStartDate(startDate);
                    setEndDate(endDate);
                } else {
                    console.log("Itinerary fetching failed");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSingleItinerary();
    }, []);

    return (
        <div className="flex flex-row flex-1 items-center justify-center min-h-screen gap-10 bg-slate-100">
            <div className="card flex flex-col basis-10/12 text-secondary bg-base-100 shadow-xl mt-4">
                <div className="card-body flex-1">
                    <h2 className="card-title">
                        Timeline for itinerary is displayed here
                    </h2>
                    <div className="mb-3">
                        <TETabs justify>
                            {itinerary.schedule?.map((dayData, index) => {
                                return (
                                    <TETabsItem
                                        onClick={() =>
                                            handleJustifyClick(
                                                "tab" + (index + 1)
                                            )
                                        }
                                        active={
                                            justifyActive ===
                                            "tab" + (index + 1)
                                        }
                                        color="secondary"
                                        className="duration-300"
                                    >
                                        <div className="flex flex-col text-base">
                                            <div>Day {index + 1}</div>
                                            <div>{dayData.date}</div>
                                        </div>
                                    </TETabsItem>
                                );
                            })}
                        </TETabs>

                        <TETabsContent>
                            {itinerary.schedule?.map((dayData, index) => (
                                <TETabsPane
                                    show={justifyActive === "tab" + (index + 1)}
                                >
                                    <Link to={"../../explorecity/1"}>
                                        {!isReadOnly ? (
                                            <ExploreCityButton />
                                        ) : null}
                                    </Link>
                                    <DayTimeline
                                        dayActivities={dayData.activities}
                                    />
                                </TETabsPane>
                            ))}
                        </TETabsContent>
                    </div>
                </div>
            </div>
        </div>
    );
}
