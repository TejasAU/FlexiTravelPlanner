export default function SearchItineraries() {
    return (
        <div className="join">
            <div>
                <div>
                    <input
                        className="input input-bordered join-item"
                        placeholder="Search for city"
                    />
                </div>
            </div>
            <select className="select select-bordered join-item">
                <option disabled selected className="font-semibold">
                    Sort By
                </option>
                <option>Duration</option>
                <option>Places Added</option>
            </select>
            <div className="indicator">
                <button className="btn join-item">Search</button>
            </div>
        </div>
    );
};