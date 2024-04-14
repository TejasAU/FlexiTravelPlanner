import { useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import DayTimeline from "./DayTimeline";
import { Link } from "react-router-dom";

const tabPanelData = [
    {
        dayNum: 1,
        date: "11/01/2024",
    },
    {
        dayNum: 2,
        date: "12/01/2024",
    },
    {
        dayNum: 3,
        date: "13/01/2024",
    },
    {
        dayNum: 4,
        date: "14/01/2024",
    },
    {
        dayNum: 5,
        date: "15/01/2024",
    },
    {
        dayNum: 6,
        date: "16/01/2024",
    },
];

const tabContentData = [];

const ExploreCityButton = () => {
    return (
        <div className="flex items-center justify-center">
            <button className="btn btn-outline btn-secondary w-2/3">
                Explore Things to Do
            </button>
        </div>
    );
};

export default function DayTimelinev2() {
    const [justifyActive, setJustifyActive] = useState("tab1");

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    return (
        <div className="mb-3">
            <TETabs justify>
                {tabPanelData.map((data, index) => (
                    <TETabsItem
                        onClick={() => handleJustifyClick("tab" + { index })}
                        active={justifyActive === "tab" + { index }}
                        color="secondary"
                        className="duration-300"
                    >
                        <div className="flex flex-col text-base">
                            <div>Day {data.dayNum}</div>
                            <div>{data.date}</div>
                        </div>
                    </TETabsItem>
                ))}
            </TETabs>

            <TETabsContent>
                {tabPanelData.map((_, index) => (
                    <TETabsPane show={justifyActive === "tab" + { index }}>
                        <Link to={"../../explorecity/1"}>
                            <div className="flex items-center justify-center">
                                <button className="btn btn-outline btn-secondary w-2/3">
                                    Explore Things to Do
                                </button>
                            </div>
                        </Link>
                        <DayTimeline test={index + 1} />
                    </TETabsPane>
                ))}
            </TETabsContent>
        </div>
    );
}
