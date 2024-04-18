import React, { useEffect, useState } from "react";
import EditActivityModal from "./EditActivityModal";
import DeleteActivityModal from "./DeleteActivityModal";
import { useItinerary } from "../../contexts/ItineraryContext";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";

export default function DayTimeline({ dayActivities}) {
    const [sortedActivities, setSortedActivities] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const { isReadOnly } = useItinerary();

    useEffect(() => {
        const sorted = [...dayActivities].sort((a, b) =>
            a.timeslot.localeCompare(b.timeslot)
        );
        setSortedActivities(sorted);
    }, [dayActivities]);

    useEffect(() => {
        // Handle rerender based on sortedActivities
        console.log("Sorted activities have changed:", sortedActivities);
    }, [sortedActivities]);

    const handleEdit = (activity) => {
        setSelectedActivity(activity);
        setEditModalOpen(true);
    };

    const handleDelete = (activity) => {
        setSelectedActivity(activity);
        setDeleteModalOpen(true);
    };

    const handleUpdateActivity = async (updatedNotes) => {
        console.log(selectedActivity._id + " " + updatedNotes);
        // Update the activity in the state or fetch updated activities from the server
        const response = await fetch(
            "http://localhost:3001/api/itinerary/updateActivity",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    activityId: selectedActivity._id,
                    notes: updatedNotes,
                }),
            }
        );

        if (response.status === 200) {
            const responseData = await response.json();
            console.log(responseData);

            // Update the notes of the selected activity in sortedActivities
            const updatedActivities = sortedActivities.map((activity) =>
                activity._id === selectedActivity._id
                    ? { ...activity, notes: updatedNotes }
                    : activity
            );
            setSortedActivities(updatedActivities);
        } else {
            console.error("Activity update failed");
        }
    };

    const handleDeleteActivity = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/itinerary/deleteActivity/${selectedActivity._id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.status === 200) {
                // Remove the deleted activity from the state
                const updatedActivities = sortedActivities.filter(
                    (activity) => activity._id !== selectedActivity._id
                );
                setSortedActivities(updatedActivities);
            } else {
                console.error("Activity deletion failed");
            }
        } catch (error) {
            console.error("Error deleting activity:", error.message);
        }
    };

    return (
        <ul className="timeline timeline-vertical timeline-snap-icon timeline-compact">
            {sortedActivities.map((entry, index) => (
                <li key={index}>
                    <hr className="bg-secondary" />
                    <div className="timeline-start">{entry.timeslot}</div>
                    <div className="timeline-end timeline-box bg-neutral w-full">
                        <h2 className="text-2xl font-semibold">
                            {entry.title}
                        </h2>
                        <p className="pt-2">Category: {entry.category}</p>
                        <p>Address: {entry.address}</p>
                        <p>Notes: {entry.notes}</p>
                        {!isReadOnly ? (
                            <>
                                <div className="card-actions justify-end">
                                    <div
                                        className="lg:tooltip lg:tooltip-secondary"
                                        data-tip="Edit entry"
                                    >
                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => handleEdit(entry)}
                                        >
                                            <EditIcon />
                                        </button>
                                    </div>
                                    <div
                                        className="lg:tooltip lg:tooltip-secondary"
                                        data-tip="Delete entry"
                                    >
                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => handleDelete(entry)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                    <hr className="bg-secondary" />
                </li>
            ))}
            <EditActivityModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                activity={selectedActivity}
                onUpdate={handleUpdateActivity}
            />
            <DeleteActivityModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                activity={selectedActivity}
                onDelete={handleDeleteActivity}
            />
        </ul>
    );
}
