import ItineraryContainer from "./ItineraryContainer"
import SearchItineraries from "./SearchItineraries"

export default function ExplorePlans() {
    return (
        <div className="flex flex-col gap-4 bg-base-200 text-secondary min-h-screen"
        >
            <div>
                <h2 className="text-3xl font-semibold pl-8 pt-4">Itinerary Viewer</h2>
            </div>
            <div>
                <h2 className="text-md font-semibold pl-8 pt-4">Embark on a journey through the eyes of fellow travelers. Explore curated itineraries and discover the world's hidden gems.</h2>
            </div>
            <div className="flex flex-col justify-center items-center mt-6 gap-8">
                <SearchItineraries />
                <ItineraryContainer />
            </div>
        </div>
    
    )
}
