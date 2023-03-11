import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Components/Perks.jsx";
import axios from "axios";

const Places = () => {
    const { action } = useParams();

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);

    const addPhotoByLink = async () => {
        const { data: fileName } = await axios.post("/upload-by-link", { link: photoLink });
        setAddedPhotos(prev => {
            return [...prev, fileName.fileName];
        });

        setPhotoLink("");
    };

    const uploadPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i])
        }

        axios.post("/upload", data, {
            headers: "Content-Type: multipart/form-data"
        }).then(res => {
            const { data: fileNames } = res;
            setAddedPhotos(prev => {
                return [...prev, ...fileNames];
            });
        });
    };

    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 pl-4 pr-6 rounded-full"
                        to={"/account/places/new"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        New Place
                    </Link>
                </div>

            )}

            {action === "new" && (
                <div>
                    <form>
                        <h2 className="text-xl mt-8 mb-2">Title</h2>
                        <input
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <h2 className="text-xl mt-8 mb-2">Address</h2>
                        <input
                            type="text"
                            placeholder="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />

                        <h2 className="text-xl mt-8 mb-2">Photos</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add using a url"
                                value={photoLink}
                                onChange={e => setPhotoLink(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-gray-500 text-white w-1/6 rounded-[10px]"
                                onClick={addPhotoByLink}
                            >
                                Add Photo
                            </button>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="h-[200px]">
                                    <img
                                        className="rounded-[10px] w-full h-full object-cover"
                                        src={`http://localhost:3001/uploads/${link}`}
                                        alt={link}
                                    />
                                </div>
                            ))}
                            <label
                                className="bg-transparent border-[3px] border-gray-500 rounded-[10px] text-[28px]
                                text-gray-500 flex items-center justify-center gap-2 cursor-pointer h-[200px]"
                            >
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-10 h-10"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>


                                Upload
                            </label>
                        </div>

                        <h2 className="text-xl mt-8 mb-2">Description</h2>
                        <textarea
                            placeholder="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <h2 className="text-xl mt-8 mb-2">Perks</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>


                        <h2 className="text-xl mt-8 mb-2">Extra Info</h2>
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}/>
                        <h2 className="text-xl mt-8 mb-2">Check In & Out Times | Max Guests</h2>

                        <div className="grid sm:grid-cols-3 gap-2">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Check In Time (eg. 12:00)"
                                    value={checkIn}
                                    onChange={e => setCheckIn(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Check Out Time (eg. 18:00)"
                                    value={checkOut}
                                    onChange={e => setCheckOut(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Max Guests (eg .8)"
                                    value={maxGuests}
                                    onChange={e => setMaxGuests(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <button type="submit" className="primary mt-8">Add Place</button>
                    </form>
                </div>
            )}

        </div>
    );
};

export default Places;