import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="mt-[100px] flex items-center justify-center flex-col w-[100%] gap-6">
            <h1 className="text-4xl">Login</h1>
            <form className="flex flex-col items-start gap-3 w-1/3">
                <input type="email" placeholder="example@gmail.com" />
                <input type="password" placeholder="password" />
                <button type="submit">Login</button>
                <div className="text-gray-700">
                    Don't have an account? <Link to={"/register"} className="font-bold underline">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;