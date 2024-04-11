import MainHero from "./MainHero";
import SubHero from "./SubHero";

const homeData = [
    {
        heading: "Itinerary Adder and Public Itinerary Viewing",
        desc: "Easily create and manage your travel plans with our intuitive itinerary adder. Want inspiration? Explore other users' public itineraries.",
    },
    {
        heading: "Budget Tracker",
        desc: "Stay on top of your finances with our budget tracker. Set a budget for your trip, track your expenses, and get insights into your spending habits.",
    },
    {
        heading: "Packing List",
        desc: "Never forget a thing with our customizable packing lists. Tailor your list based on your destination, duration, and type of trip.",
    },
];
export default function Home() {
    return (
        <div className="overflow-hidden">
            <MainHero />
            {homeData.map((section, index) => (
                <SubHero
                    alignment={index % 2 === 0 ? "left" : "right"}
                    heading={section.heading}
                    desc={section.desc}
                />
            ))}
        </div>
    );
}
