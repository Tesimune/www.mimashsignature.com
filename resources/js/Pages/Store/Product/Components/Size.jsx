import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";

function Color({ size, setSize }) {
    const [newSize, setNewSize] = useState("");
    
    const removeSize = (itemToRemove) => {
        // Use filter to create a new array excluding the item to be removed
        const newArray = size.filter((_, index) => index !== itemToRemove);

        // Set the state with the new array
        setSize("size", newArray);
    };


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-2">
            {size.length > 0 && (
                <>
                    {size.map((sz, index) => (
                        <div
                            onClick={() => removeSize(index)}
                            key={index}
                            className="cursor-pointer border-2 p-2 rounded-xl"
                        >
                            <span className="h-9 rounded-xl">{sz.size}</span>
                        </div>
                    ))}
                </>
            )}

            <div className="flex items-center gap-3 p-3">
                <input
                    value={newSize}
                    type="number"
                    onChange={(e) => setNewSize(e.target.value)}
                    className="input bg-slate-200 w-20 text-slate-800 border-none outline-none placeholder:text-slate-400"
                    placeholder="14"
                />
                {newSize && (
                    <span
                        onClick={() =>
                            setSize("size", [...size, { size: newSize }])
                        }
                        className="bg-slate-200 h-full p-3 text-slate-800 cursor-pointer rounded-xl"
                    >
                        <MdAddCircle className="h-6 w-6" />
                    </span>
                )}
            </div>
        </div>
    );
}

export default Color;
