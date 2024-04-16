import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../../contexts/ItineraryContext";

export default function AddPlanModal() {
    const [localStartDate, setLocalStartDate] = useState("");
    const [localEndDate, setLocalEndDate] = useState("");
    const [localCity, setLocalCity] = useState("");
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();
    const { setStartDate, setEndDate, setCity, setItineraryId, setCityId } =
        useItinerary();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const getDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate).toISOString().slice(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    let itineraryId = "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Assuming you have a useState for loading state

        const startDateObj = new Date(localStartDate);
        const endDateObj = new Date(localEndDate);
        const response = await fetch(
            "http://localhost:3001/api/itinerary/createItinerary",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: JSON.parse(localStorage.getItem("user")).userId,
                    cityId: "1",
                    cityName: localCity,
                    desc,
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

            // Simulate loading and success states
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
            }, 2000);
        } else {
            console.error("Itinerary Creation failed");
            setLoading(false); // Reset loading state on failure
        }
    };

    useEffect(() => {
        let redirectTimeout;
        if (success) {
            redirectTimeout = setTimeout(() => {
                navigate(`/myplans/${itineraryId}`);
            }, 2000);
        }

        // Clear the timeout if the component unmounts or success changes
        return () => clearTimeout(redirectTimeout);
    }, [success, itineraryId, navigate]);

    return (
        <dialog
            id="add_plan_modal"
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box text-secondary">
                <h3 className="font-bold text-lg">Create a New Itinerary</h3>
                <div className="modal-action justify-center">
                    {!success ? (
                        <>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col justify-center items-center gap-5"
                            >
                                <label className="py-4">
                                    Which city do you want to explore?
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered input-md input-secondary w-full max-w-xs"
                                    value={localCity}
                                    onChange={(e) =>
                                        setLocalCity(e.target.value)
                                    }
                                />
                                <label className="py-4">
                                    Enter start date for your trip
                                </label>
                                <input
                                    type="date"
                                    value={localStartDate}
                                    onChange={(e) =>
                                        setLocalStartDate(e.target.value)
                                    }
                                    min={new Date().toISOString().slice(0, 10)}
                                />
                                <label className="py-4">
                                    Enter end date for your trip
                                </label>
                                <input
                                    type="date"
                                    value={localEndDate}
                                    min={localStartDate}
                                    onChange={(e) =>
                                        setLocalEndDate(e.target.value)
                                    }
                                />
                                <label className="py-4">
                                    Enter a short description for your itinerary
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered input-md input-secondary w-full max-w-xs"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
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
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </>
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
