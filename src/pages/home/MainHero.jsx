import mainHeroOverlay from '../../assets/main-hero-overlay.jpg'

export default function MainHero() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${mainHeroOverlay})`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-10 text-5xl font-bold">Unlock Your Perfect Journey</h1>
                    <p className="mb-10 text-xl">
                        Plan, Pack, Preserve, and Prosper on Your Adventures
                    </p>
                    <button className="btn btn-primary">Start Your Journey</button>
                </div>
            </div>
        </div>
    );
}
