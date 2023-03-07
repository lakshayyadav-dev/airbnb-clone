import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./Layout.jsx";
import Register from "./pages/Register.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account.jsx";

axios.defaults.baseURL = "http://127.0.0.1:3001";
axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Index/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/account/:subpage?" element={<Account/>}/>
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
