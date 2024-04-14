import { useRef } from "react";

export default function POIContainer() {
    const containerRef = useRef(null);

    const scrollRight = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: 300, // Adjust the scroll distance as needed
                behavior: "smooth", // Add smooth scrolling animation
            });
        }
    };

    const scrollLeft = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: -300, // Adjust the scroll distance as needed
                behavior: "smooth", // Add smooth scrolling animation
            });
        }
    };

    const LeftChevronIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );

    const RightChevronIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
    return (
        <div className="flex mx-7 my-3 justify-center items-center gap-6">
            <button
                className="btn btn-circle btn-secondary"
                onClick={scrollLeft}
            >
                <LeftChevronIcon />
            </button>
            <div
                ref={containerRef}
                className="mt-6 flex flex-nowrap overflow-x-scroll no-scrollbar pb-4"
            >
                {/* Your city card components here */}
                {/* For demonstration, I've used a placeholder */}
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
                                <h2 className="card-title">Place Name</h2>
                                <p>
                                    Address
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-secondary">
                                        Add to Itinerary
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="btn btn-circle btn-secondary"
                onClick={scrollRight}
            >
                <RightChevronIcon />
            </button>
        </div>
    );
}
