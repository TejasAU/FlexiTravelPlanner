import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../../contexts/ItineraryContext";
import useAuthHandler from "../../hooks/useAuthHandler";

export default function AddPlanModal() {
    const [localStartDate, setLocalStartDate] = useState("");
    const [localEndDate, setLocalEndDate] = useState("");
    const [localCity, setLocalCity] = useState("");
    const navigate = useNavigate();
    const { setStartDate, setEndDate, setCity, setItineraryId } =
        useItinerary();
    const { loading, success, handleAuthAction } = useAuthHandler();

    const getDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate).toISOString().slice(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startDateObj = new Date(localStartDate);
        const endDateObj = new Date(localEndDate);
        let itineraryId = ""
        handleAuthAction(
            async () => {
                const response = await fetch(
                    "http://localhost:3001/api/itinerary/createItinerary",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userId: JSON.parse(localStorage.getItem("user"))
                                .userId,
                            cityId: "1", //TODO: update to FSQ city id
                            isPublic: true,
                            dates: getDates(startDateObj, endDateObj),
                        }),
                    }
                );

                if (response.status === 201) {
                    const responseData = await response.json();
                    console.log(responseData);
                    itineraryId = responseData.message;
                    // Set context states to local ones
                    setStartDate(localStartDate);
                    setEndDate(localEndDate);
                    setCity(localCity);
                    setItineraryId(itineraryId);
                    // Clear the form fields
                    setLocalStartDate("");
                    setLocalEndDate("");
                    setLocalCity("");
                } else {
                    console.error("Itinerary Creation failed");
                }
            },
            () => {
                navigate(`/myplans/${itineraryId}`);
            }
        );
    };

    return (
        <dialog
            id="add_plan_modal"
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box text-secondary">
                <h3 className="font-bold text-lg">Create a New Itinerary</h3>
                <div className="modal-action justify-center">
                    {!success ? (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-center items-center gap-5"
                        >
                            <p className="py-4">
                                Which city do you want to explore?
                            </p>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-md input-secondary w-full max-w-xs"
                                value={localCity}
                                onChange={(e) => setLocalCity(e.target.value)}
                            />
                            <p className="py-4">
                                Enter start date for your trip
                            </p>
                            <input
                                type="date"
                                value={localStartDate}
                                onChange={(e) =>
                                    setLocalStartDate(e.target.value)
                                }
                            />
                            <p className="py-4">Enter end date for your trip</p>
                            <input
                                type="date"
                                value={localEndDate}
                                min={localStartDate}
                                onChange={(e) =>
                                    setLocalEndDate(e.target.value)
                                }
                            />
                            <div>
                                <button type="submit" className="btn">
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-md" />
                                            <div>Creating...</div>
                                        </>
                                    ) : (
                                        "Create Itinerary"
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <p className="text-success">
                                Success! Your itinerary has been created.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </dialog>
    );
}
