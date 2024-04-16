import { useUser } from "../../contexts/UserContext";

export default function AddPOIModal() {
    const {startDate, endDate} = useUser()

    return (
        <dialog
            id="add_poi_modal"
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box text-secondary">
                <h3 className="font-bold text-lg">
                    Add a New Activity To Itinerary
                </h3>
                <div className="modal-action">
                    <form method="dialog">
                        <p className="py-4">Add a description (optional)</p>
                        <input />
                        <p>Select date for this activity</p>
                        <input type="date" min={startDate} max={endDate} />
                        <p className="py-4">
                            Select a timeslot for this activity
                        </p>
                        <input type="time" step="3600"/>
                        <button className="btn">
                            Create Event for Itinerary
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
