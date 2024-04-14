import React, { useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import DayTimeline from "./DayTimeline";

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
                <TETabsItem
                    onClick={() => handleJustifyClick("tab1")}
                    active={justifyActive === "tab1"}
                    color="secondary"
                    className="duration-300"
                >
                    <div className="flex flex-col text-base">
                        <div>Day 1</div>
                        <div>11/01/2024</div>
                    </div>
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                    color="secondary"
                >
                    <div className="flex flex-col text-base">
                        <div>Day 2</div>
                        <div>12/01/2024</div>
                    </div>
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleJustifyClick("tab3")}
                    active={justifyActive === "tab3"}
                    color="secondary"
                >
                    <div className="flex flex-col text-base">
                        <div>Day 3</div>
                        <div>13/01/2024</div>
                    </div>
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleJustifyClick("tab4")}
                    active={justifyActive === "tab4"}
                    color="secondary"
                >
                    <div className="flex flex-col text-base">
                        <div>Day 4</div>
                        <div>14/01/2024</div>
                    </div>
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleJustifyClick("tab5")}
                    active={justifyActive === "tab5"}
                    color="secondary"
                >
                    <div className="flex flex-col text-base">
                        <div>Day 5</div>
                        <div>15/01/2024</div>
                    </div>
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleJustifyClick("tab6")}
                    active={justifyActive === "tab6"}
                    color="secondary"
                >
                    <div className="flex flex-col text-base">
                        <div>Day 6</div>
                        <div>16/01/2024</div>
                    </div>
                </TETabsItem>
            </TETabs>

            <TETabsContent>
                <TETabsPane show={justifyActive === "tab1"}>
                    <div className="flex items-center justify-center">
                        <button className="btn btn-outline btn-secondary w-2/3">
                            Explore Things to Do
                        </button>
                    </div>
                    <DayTimeline test={1} />
                </TETabsPane>
                <TETabsPane show={justifyActive === "tab2"}>
                    <div className="flex items-center justify-center">
                        <button className="btn btn-outline btn-secondary w-2/3">
                            Explore Things to Do
                        </button>
                    </div>
                    <DayTimeline test={2} />
                </TETabsPane>
                <TETabsPane show={justifyActive === "tab3"}>
                    <div className="flex items-center justify-center">
                        <button className="btn btn-outline btn-secondary w-2/3">
                            Explore Things to Do
                        </button>
                    </div>
                    <DayTimeline test={3} />
                </TETabsPane>
                <TETabsPane show={justifyActive === "tab4"}>
                    <div className="flex items-center justify-center">
                        <button className="btn btn-outline btn-secondary w-2/3">
                            Explore Things to Do
                        </button>
                    </div>
                    <DayTimeline test={4} />
                </TETabsPane>
                <TETabsPane show={justifyActive === "tab5"}>
                    <div className="flex items-center justify-center">
                        <button className="btn btn-outline btn-secondary w-2/3">
                            Explore Things to Do
                        </button>
                    </div>
                    <DayTimeline test={5} />
                </TETabsPane>
                <TETabsPane show={justifyActive === "tab6"}>
                    <div className="flex items-center justify-center">
                        <button className="btn btn-outline btn-secondary w-2/3">
                            Explore Things to Do
                        </button>
                    </div>
                    <DayTimeline test={6} />
                </TETabsPane>
            </TETabsContent>
        </div>
    );
}
