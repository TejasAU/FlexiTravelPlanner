import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate("/")
    const { loginUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: firstName + " " + lastName,
            email,
            password,
        };

        try {
            const response = await fetch(
                "http://localhost:3001/api/users/createUser",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const responseData = await response.json();
            console.log(responseData);
            const userDetails = {
                userId: responseData.user._id,
                name: responseData.user.name
            }
            localStorage.setItem('user', JSON.stringify(userDetails));
            loginUser(userDetails);
            navigate("/")
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form
            className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5"
            onSubmit={handleSubmit}
        >
            <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
                {/* <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
           // Add usericon image
              <img
                src="usericon.png"
                alt="login"
                className="h-[500px]"
              />
            </div> */}
                <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
                    <h1 className="text-center text-2xl sm:text-3xl font-semibold text-secondary-content">
                        Create Account
                    </h1>
                    <div className="w-full mt-5 sm:mt-8">
                        <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter Your First Name"
                                    value={firstName}
                                    className="input input-bordered input-secondary w-full max-w-xs text-black placeholder:text-black/70"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Your Last Name"
                                    value={lastName}
                                    className="input input-bordered input-secondary w-full max-w-xs text-black placeholder:text-black/70"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                value={email}
                                className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="Password"
                                placeholder="Enter Your Password"
                                value={password}
                                className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex items-center gap-1.5  justify-start pl-2">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="checkbox-xs checkbox-secondary"
                                        />
                                    </label>
                                </div>
                                <h3 className="flex items-center whitespace-nowrap text-xs text-black">
                                    I agree to the
                                    <span className="text-secondary-content">
                                        &nbsp;Terms
                                    </span>
                                    &nbsp;and
                                    <span className="text-secondary-content">
                                        &nbsp;Privacy Policy
                                    </span>
                                    .
                                </h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                                <button
                                    type="submit"
                                    className="btn btn-outline btn-secondary btn-block max-w-[200px]"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
