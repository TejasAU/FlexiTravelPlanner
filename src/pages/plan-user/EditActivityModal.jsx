import React, { useState } from "react";

export default function EditActivityModal({ isOpen, onClose, activity, onUpdate }) {
    const [notes, setNotes] = useState(activity ? activity.notes : "");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the activity notes
        console.log("Updating notes:", notes);
        onUpdate(notes); // Trigger re-render of DayTimeline component
        onClose();
    };

    return (
        <dialog
            id="edit_activity_modal"
            className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`}
            open={isOpen}
            onClose={onClose}
        >
            <div className="modal-box text-secondary">
                <h3 className="font-bold text-lg">Edit Activity</h3>
                <div className="modal-action justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center gap-5"
                    >
                        <label className="py-4">Update notes for the activity</label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-md input-secondary w-full max-w-xs"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <div>
                            <button type="submit" className="btn btn-outline btn-secondary">
                                Update Activity
                            </button>
                        </div>
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
