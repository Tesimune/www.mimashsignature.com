import React, { useState } from 'react'
import { useForm } from '@inertiajs/react';

function CreateOrderPickupPrice({ storeData }) {
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    const addLocationAndPrice = () => {
        if (location === "" || price === "") {
            alert("Location/Price can't be empty.");
        } else {
            setData("location_and_price", [
                ...data.location_and_price,
                { location, price },
            ]);
            setLocation("");
            setPrice("");
        }
    };


    const removeLocationAndPrice = (indexToRemove) => {
        setLocation_and_price((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );
        setData("location_and_price", location_and_price);
    };

    const { data, setData, errors, post } = useForm({
        country: "Nigeria",
        state: "",
        location_and_price: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("orderPickupPrice.store", storeData.username));
    };


    return (
        <div>
            <form
                onSubmit={submit}
                className="bg-white flex flex-col gap-5 w-full p-2 md:p-5 sm:rounded-lg"
            >
                <div className="grid lg:grid-cols-2 gap-9">
                    <div className="flex flex-col gap-1 w-full">
                        {errors.country && (
                            <p className="text-red-500">{errors.country}</p>
                        )}
                        <label className="label">
                            <span className="label-text">Country name?</span>
                        </label>
                        <input
                            value={data.country}
                            className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                            placeholder="MimashSignature"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        {errors.state && (
                            <p className="text-red-500">{errors.state}</p>
                        )}
                        <label className="label">
                            <span className="label-text">State?</span>
                        </label>
                        <input
                            value={data.state}
                            onChange={(e) => setData("state", e.target.value)}
                            className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                            placeholder="Kaduna"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {errors.location_and_price && (
                            <p className="text-red-500">
                                {errors.location_and_price}
                            </p>
                        )}
                        {data.location_and_price.map((lp, index) => (
                            <div
                                key={index}
                                onClick={() => removeLocationAndPrice(index)}
                                className="flex justify-between bg-slate-200 w-full py-2 px-3 rounded-md text-slate-800 border-none hover:bg-red-500 cursor-pointer"
                            >
                                <span>{lp.location}</span>
                                <span>{lp.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-2 bg-slate-100 p-2">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="label">
                                <span className="label-text">Location?</span>
                            </label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                placeholder="Kawo"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="label">
                                <span className="label-text">
                                    Delivery Price?
                                </span>
                            </label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                placeholder="1500"
                            />
                        </div>
                        <span
                            onClick={addLocationAndPrice}
                            className="btn bg-gold text-white"
                        >
                            Add Location and Price
                        </span>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn bg-gold text-white">submit</button>
                </div>
            </form>
        </div>
    );
}

export default CreateOrderPickupPrice