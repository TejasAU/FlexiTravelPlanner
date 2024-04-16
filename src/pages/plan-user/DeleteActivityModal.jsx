import React from "react";

export default function DeleteActivityModal({ isOpen, onClose, activity, onDelete }) {
    const handleDelete = () => {
        // Delete the activity
        console.log("Deleting activity:", activity);
        onDelete(); // Trigger re-render of DayTimeline component
        onClose();
    };

    return (
        <dialog
            id="delete_activity_modal"
            className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`}
            open={isOpen}
            onClose={onClose}
        >
            <div className="modal-box text-secondary">
                <h3 className="font-bold text-lg">Delete Activity</h3>
                <div className="modal-action justify-center">
                    <p>Are you sure you want to delete this activity?</p>
                    <div className="flex justify-center gap-4">
                        <button className="btn btn-outline btn-secondary" onClick={handleDelete}>
                            Yes, Delete
                        </button>
                        <button className="btn btn-outline btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
