import { useParams } from "react-router-dom";
import PlanSchedule from "./PlanSchedule";
import PackingList from "./PackingList";
import BudgetList from "./BudgetList";


export default function PlanDetails() {
    let { planid } = useParams();
    return (
        <div className="flex flex-row flex-1 items-center justify-center min-h-screen gap-10 bg-slate-100">
            <div className="card flex flex-col basis-7/12 text-secondary bg-base-100 shadow-xl mt-4">
                <div className="card-body flex-1">
                    <h2 className="card-title">
                        Timeline for itinerary is displayed here
                    </h2>
                    <PlanSchedule />
                </div>
            </div>
            <div className="flex flex-col basis-3/12 justify-center gap-12">
                <div className="card text-secondary bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">
                            Packing List is displayed here
                        </h2>
                        <PackingList />
                    </div>
                </div>
                <div className="card  text-secondary bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Budget is displayed here</h2>
                        <BudgetList />
                    </div>
                </div>
            </div>
        </div>
    );
}
