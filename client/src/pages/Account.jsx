import React, { useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const Account = () => {
    const { user, ready } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) subpage = "profile";

    const logout = async () => {
        await axios.post("/logout");
        window.location.reload();
    }

    if (!ready) {
        return "Loading...";
    }

    if (ready && !user) {
        return <Navigate to={"/login"}/>;
    }


    const linkClasses = (type) => {
        let classes = "py-2 px-6";

        if (type === subpage) {
            classes += " bg-primary text-white rounded-full";
        }

        return classes;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-4 mb-12">
                <Link className={linkClasses("profile")} to={"/account/"}>My Profile</Link>
                <Link className={linkClasses("bookings")} to={"/account/bookings"}>My Bookings</Link>
                <Link className={linkClasses("places")} to={"/account/places"}>My Accommodations</Link>
            </nav>
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} type="button" className="secondary mt-4 max-w-[100px]">Logout</button>
                </div>
            )}
        </div>
    );
};

export default Account;