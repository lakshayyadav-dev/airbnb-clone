import React from "react";

const Perks = ({selected, onChange}) => {
    return (
        <>
            <label className="border-2 border-gray-300 p-4 flex rounded-[10px] gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <span>Wifi</span>
            </label>
            <label className="border-2 border-gray-300 p-4 flex rounded-[10px] gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <span>Free Parking Spot</span>
            </label>
            <label className="border-2 border-gray-300 p-4 flex rounded-[10px] gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <span>TV</span>
            </label>
            <label className="border-2 border-gray-300 p-4 flex rounded-[10px] gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <span>Pets</span>
            </label>
            <label className="border-2 border-gray-300 p-4 flex rounded-[10px] gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <span>Private Entrance</span>
            </label>
            <label className="border-2 border-gray-300 p-4 flex rounded-[10px] gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <span>Washer</span>
            </label>
        </>
    );
};

export default Perks;