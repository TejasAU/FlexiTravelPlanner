import { useEffect, useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import DayTimeline from "./DayTimeline";
import { Link } from "react-router-dom";
import { useItinerary } from "../../contexts/ItineraryContext";

const ExploreCityButton = () => {
    return (
        <div className="flex items-center justify-center">
            <button className="btn btn-outline btn-secondary w-2/3">
                Explore Things to Do
            </button>
        </div>
    );
};

export default function PlanSchedule() {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const { startDate, endDate, city } = useItinerary();
    const [dates, setDates] = useState([])
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    const getDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate).toISOString().slice(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    useEffect(() => {
        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)
        const datesBetween = getDates(startDateObj, endDateObj);
        setDates(datesBetween);
    }, []);

    return (
        <div className="mb-3">
            <TETabs justify>
                {dates.map((date, index) => {
                    return (
                        <TETabsItem
                            onClick={() =>
                                handleJustifyClick("tab" + (index + 1))
                            }
                            active={justifyActive === "tab" + (index + 1)}
                            color="secondary"
                            className="duration-300"
                        >
                            <div className="flex flex-col text-base">
                                <div>Day {index + 1}</div>
                                <div>{date}</div>
                            </div>
                        </TETabsItem>
                    );
                })}
            </TETabs>

            <TETabsContent>
                {dates.map((_, index) => (
                    <TETabsPane show={justifyActive === "tab" + (index + 1)}>
                        <Link to={"../../explorecity/1"}>
                            <ExploreCityButton />
                        </Link>
                        <DayTimeline test={index + 1} />
                    </TETabsPane>
                ))}
            </TETabsContent>
        </div>
    );
}
