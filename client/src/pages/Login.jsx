import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    const loginUser = async e => {
        e.preventDefault();

        try {
            const userInfo = await axios.post("/login", { email, password }, { withCredentials: true });
            setUser(userInfo.data);
            setRedirect(true);
        } catch (err) {
            alert("Login Failed");
        }
    };

    if (redirect) {
        return <Navigate to={"/"}/>;
    }

    return (
        <div className="mt-[100px] flex items-center justify-center flex-col w-[100%] gap-6">
            <h1 className="text-4xl">Login</h1>
            <form className="flex flex-col items-start gap-3 w-1/3" onSubmit={loginUser}>
                <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
                <div className="text-gray-700">
                    Don't have an account? <Link to={"/register"} className="font-bold underline">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;