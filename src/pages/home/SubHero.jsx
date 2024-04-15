import { useInView } from "react-intersection-observer";

export default function SubHero({ alignment, heading, desc }) {
    const { ref, inView } = useInView({
        triggerOnce: false, // Only trigger once
        threshold: 0.3, // Trigger when 50% of the element is in view
    });

    return (
        <div
            ref={ref}
            className={
                "hero min-h-screen " +
                (alignment === "left" ? "bg-base-100" : "bg-secondary")
            }
        >
            <div
                className={
                    "hero-content flex-col gap-x-12 " +
                    (alignment === "left"
                        ? "lg:flex-row"
                        : "lg:flex-row-reverse")
                }
                style={{
                    opacity: inView ? 1 : 0,
                    transform: `translateX(${
                        inView ? 0 : alignment === "left" ? "100%" : "-100%"
                    })`,
                    transition:
                        "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                }}
            >
                <div>
                    <h1 className="text-5xl font-bold">{heading}</h1>
                    <p className="py-6">{desc}</p>
                </div>
            </div>
        </div>
    );
}
