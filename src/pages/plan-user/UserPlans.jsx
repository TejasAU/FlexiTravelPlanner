import userPlansOverlay from "../../assets/user-plans-overlay.jpg";
import { Link } from "react-router-dom";
import AddPlanModal from "./AddPlanModal";
import PlusIcon from "../../icons/PlusIcon";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";

const ItineraryContainer = ({ itinerary }) => {
    const { _id, cityName, desc } = itinerary;
    return (
        <div className="collapse collapse-plus bg-neutral">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-medium">
                Itinerary for {cityName}
            </div>
            <div className="collapse-content">
                <p>{desc}</p>
                <div className="card-actions justify-end">
                    <Link to={`${_id}`}>
                        <button className="btn btn-secondary">
                            Click here for more details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function UserPlans() {
    const { user } = useUser();
    const [userItineraries, setUserItineraries] = useState([]);

    function handleOpenModal() {
        document.getElementById("add_plan_modal").showModal();
    }

    useEffect(() => {
        const fetchUserItineraries = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/itinerary/getItinerariesByUser/${user.userId}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                    setUserItineraries(responseData);
                } else {
                    console.log("Itinerary fetching failed");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserItineraries();
    }, []);

    return (
        <div
            className="flex items-center justify-center min-h-screen"
            style={{
                backgroundImage: `url(${userPlansOverlay})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="card w-3/4 h-3/4 text-secondary bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Here are your itineraries</h2>
                    {userItineraries.map((itinerary) => (
                        <ItineraryContainer itinerary={itinerary} />
                    ))}
                </div>
                <div className="flex items-center justify-center pb-8">
                    <button
                        className="btn btn-wide btn-outline btn-secondary"
                        onClick={handleOpenModal}
                    >
                        <PlusIcon />
                        Add an Itinerary
                        <AddPlanModal />
                    </button>
                </div>
            </div>
        </div>
    );
}
