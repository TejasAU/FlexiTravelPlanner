import userPlansOverlay from "../../assets/user-plans-overlay.jpg";
import { Link } from "react-router-dom";
import AddPlanModal from "./AddPlanModal";
import PlusIcon from "../../components/PlusIcon";

const userItineraries = [
    {
        id: 1,
        title: "Itinerary for City 1",
        desc: "Short optional description here",
        isBudgetSet: true,
        isListSet: true,
        isPublic: true,
    },
    {
        id: 2,
        title: "Itinerary for City 2",
        desc: "Short optional description here",
        isBudgetSet: false,
        isListSet: false,
        isPublic: false,
    },
    {
        id: 3,
        title: "Itinerary for City 3",
        desc: "Short optional description here",
        isBudgetSet: true,
        isListSet: false,
        isPublic: false,
    },
    {
        id: 4,
        title: "Itinerary for City 4",
        desc: "Short optional description here",
        isBudgetSet: false,
        isListSet: true,
        isPublic: true,
    },
];

const PublicIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const PrivateIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path
                fillRule="evenodd"
                d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                clipRule="evenodd"
            />
            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
        </svg>
    );
};

const ItineraryContainer = ({ itinerary }) => {
    const { id, title, desc, isBudgetSet, isListSet, isPublic } = itinerary;
    return (
        <div className="collapse collapse-plus bg-neutral">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-medium">{title}</div>
            <div className="collapse-content">
                <p>{desc}</p>
                <p className="inline-block">
                    Budget Set:
                    {isBudgetSet ? (
                        <div className="text-success inline-block pl-2">
                            Yes
                        </div>
                    ) : (
                        <div className="text-error inline-block pl-2">No</div>
                    )}
                </p>
                <p>
                    Packing List Created:
                    {isListSet ? (
                        <div className="text-success inline-block pl-2">
                            Yes
                        </div>
                    ) : (
                        <div className="text-error inline-block pl-2">No</div>
                    )}
                </p>
                <p className="flex items-center gap-2">
                    Visibility:
                    {isPublic ? (
                        <div className="flex items-center gap-2">
                            <div>Public</div>
                            <PublicIcon />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div>Private</div>
                            <PrivateIcon />
                        </div>
                    )}
                </p>
                <div className="card-actions justify-end">
                    <Link to={`${id}`}>
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
    function handleAddItinerary() {
        document.getElementById("add_plan_modal").showModal();
    }

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
                        onClick={handleAddItinerary}
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
