import MainHero from "./MainHero";
import SubHero from "./SubHero";

const homeData = [
    {
        heading: "Itinerary Adder and Modify Events",
        desc: "Easily create and manage your travel plans with our intuitive itinerary adder. Modify events in your itinerary to customize your travel experience.",
    },
    {
        heading: "Public Itinerary Viewing",
        desc: "Explore other users' public itineraries for inspiration and ideas. Get insights into popular destinations and travel routes.",
    },
    {
        heading: "Explore Things to Do",
        desc: "Discover exciting things to do in your destination city and add them to your itinerary for a personalized travel experience.",
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
