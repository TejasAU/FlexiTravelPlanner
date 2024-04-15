import { useNavigate } from "react-router-dom";

export default function ItineraryContainer() {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="inline-block px-3">
                        <div className="card w-96 bg-neutral shadow-xl">
                            <figure>
                                <img
                                    src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                    alt="Shoes"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    Itinerary for City Name
                                </h2>
                                <p>Short optional description here</p>
                                <p>Duration of trip:</p>
                                <p>No. of places added:</p>
                                <div className="card-actions justify-end">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/myplans/1')}
                                    >
                                        View Full Itinerary
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
