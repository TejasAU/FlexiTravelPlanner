import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthHandler from "../hooks/useAuthHandler";
import { useUser } from "../contexts/UserContext";

const LoginIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
    >
        <path
            fillRule="evenodd"
            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
            clipRule="evenodd"
        />
        <path
            fillRule="evenodd"
            d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
            clipRule="evenodd"
        />
    </svg>
);

const RegisterIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
    >
        <path
            fillRule="evenodd"
            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
            clipRule="evenodd"
        />
        <path
            fillRule="evenodd"
            d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
            clipRule="evenodd"
        />
    </svg>
);

const LogoutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
    >
        <path
            fillRule="evenodd"
            d="M10 2a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 10 2ZM5.404 4.343a.75.75 0 0 1 0 1.06 6.5 6.5 0 1 0 9.192 0 .75.75 0 1 1 1.06-1.06 8 8 0 1 1-11.313 0 .75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
        />
    </svg>
);

export default function Navbar() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    const { user, logoutUser } = useUser();


    const handleLogout = () => {
        setLoading(true)
        localStorage.removeItem("user");
        logoutUser(); // Update user context
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            // Reset success message after 2 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 2000);

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }, 2000);
    };

    return (
        <div className="navbar bg-secondary text-secondary-content rounded-b-sm shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link to={`/`}>Home</Link>
                        </li>
                        <li>
                            <Link to={`exploreplans`}>Explore Itineraries</Link>
                        </li>
                        <li>
                            <Link to={`myplans`}>My Itineraries</Link>
                        </li>
                    </ul>
                </div>
                <Link to={`/`}>
                    <a className="btn btn-ghost text-xl">Wayfinder</a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`exploreplans`}>Explore Itineraries</Link>
                    </li>
                    <li>
                        <Link to={`myplans`}>My Itineraries</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {user ? (
                    <>
                        <div className="font-semibold">Hello, {user.name}!</div>
                        <button
                            type="submit"
                            className={`btn btn-outline ${
                                success ? "btn-success" : "btn-neutral"
                            }`}
                            onClick={handleLogout}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-md" />
                                    <div>Logging out...</div>
                                </>
                            ) : success ? (
                                "Logged out successfully!"
                            ) : (
                                <>
                                    <LogoutIcon />
                                    Log Out
                                </>
                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <Link to={`login`}>
                            <button className="btn btn-outline btn-neutral">
                                <LoginIcon />
                                Login
                            </button>
                        </Link>
                        <Link to={`signup`}>
                            <button className="btn btn-outline btn-neutral">
                                <RegisterIcon />
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
