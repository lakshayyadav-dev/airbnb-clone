import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/register", {
                name,
                email,
                password
            }).then(() => alert("User registered successfully!")).catch(err => alert(err.response.data.message));
        } catch (err) {
            alert("Registration failed. Please try again later.");
        }
    }

    return (
        <div className="mt-[100px] flex items-center justify-center flex-col w-[100%] gap-6">
            <h1 className="text-4xl">Register</h1>
            <form className="flex flex-col items-start gap-3 w-1/3" onSubmit={registerUser}>
                <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}/>
                <input type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>

                <button type="submit">Register</button>

                <div className="text-gray-700">
                    Already have an account? <Link to={"/login"} className="font-bold underline">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;