import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../../contexts/ItineraryContext";

export default function AddPOIModal({ placeName, address, category }) {
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [timeslot, setTimeslot] = useState("");
    const navigate = useNavigate();
    const { itineraryId, startDate, endDate } = useItinerary();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const getTitleString = (category) => {
        switch (category) {
            case 10000:
                return "Explore";
            case 13000:
                return "Dine at";
            case 16000:
                return "Visit";
            default:
                return "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(placeName + " " + address + " " + category);
        const response = await fetch(
            "http://localhost:3001/api/itinerary/createActivity",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: getTitleString() + placeName,
                    timeslot,
                    address,
                    category,
                    notes: desc,
                    itineraryId,
                    date,
                }),
            }
        );

        if (response.status === 201) {
            const responseData = await response.json();
            console.log(responseData);
            // Simulate loading and success states
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
            }, 2000);
        } else {
            console.error("Activity Creation failed");
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
            id="add_poi_modal"
            className={`modal modal-bottom sm:modal-middle ${
                placeName !== "" && address !== "" && category !== ""
                    ? "modal-open"
                    : ""
            }`}
        >
            <div className="modal-box text-secondary">
                <h3 className="font-bold text-lg">
                    Add an Activity to Itinerary
                </h3>
                <div className="modal-action justify-center">
                    {!success ? (
                        <>
                            <form
                                className="flex flex-col justify-center items-center gap-5"
                            >
                                <label className="py-4">
                                    Enter a short description for the activity
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered input-md input-secondary w-full max-w-xs"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                                <label className="py-4">
                                    On what date do you want to do this
                                    activity?
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={startDate}
                                    max={endDate}
                                />
                                <label className="py-4">
                                    Enter timeslot for activity (hourly
                                    timeslots only)
                                </label>
                                <input
                                    type="time"
                                    step="3600"
                                    value={timeslot}
                                    onChange={(e) =>
                                        setTimeslot(e.target.value)
                                    }
                                />
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-outline btn-secondary"
                                        onClick={handleSubmit}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="loading loading-spinner loading-md" />
                                                <div>Adding...</div>
                                            </>
                                        ) : (
                                            "Add Activity"
                                        )}
                                    </button>
                                </div>
                                <button
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={() =>
                                        setModalData({
                                            placeName: "",
                                            address: "",
                                            category: "",
                                        })
                                    }
                                >
                                    ✕
                                </button>
                            </form>
                        </>
                    ) : (
                        <div>
                            <p className="text-success">
                                Success! Your activity has been created.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </dialog>
    );
}
