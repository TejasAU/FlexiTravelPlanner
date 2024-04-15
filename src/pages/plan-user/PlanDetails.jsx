import { useParams } from "react-router-dom";
import PlanSchedule from "./PlanSchedule";


export default function PlanDetails() {
    return (
        <div className="flex flex-row flex-1 items-center justify-center min-h-screen gap-10 bg-slate-100">
            <div className="card flex flex-col basis-10/12 text-secondary bg-base-100 shadow-xl mt-4">
                <div className="card-body flex-1">
                    <h2 className="card-title">
                        Timeline for itinerary is displayed here
                    </h2>
                    <PlanSchedule />
                </div>
            </div>
        </div>
    );
}
