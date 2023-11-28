import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { MdOutlineColorLens } from "react-icons/md";

function Color({ color, setColor }) {
    const [show, setShow] = useState(false);
    const [newColor, setNewColor] = useState("#e00000");

    const select = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    const removeColor = (itemToRemove) => {
        // Use filter to create a new array excluding the item to be removed
        const newArray = color.filter((_, index) => index !== itemToRemove);

        // Set the state with the new array
        setColor('color', newArray);
    };


    return (
        <div>
            <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2">
                {color.length ? (
                    <>
                        {color.map((cl, index) => (
                            <div
                                onClick={() => removeColor(index)}
                                key={index}
                                className="cursor-pointer border-2 rounded-full"
                            >
                                <div
                                    className="h-9 w-full rounded-full"
                                    style={{ backgroundColor: cl.color }}
                                ></div>
                            </div>
                        ))}
                    </>
                ) : null}
                <section
                    className="h-9 w-9 cursor-pointer border-2 rounded-full relative"
                    onClick={select}
                >
                    <div className="flex justify-center items-center gap-3 h-full w-full absolute inset-0">
                        <MdOutlineColorLens className="h-5 w-5" />
                    </div>
                </section>
            </div>

            <Modal show={show} onClose={closeModal}>
                <div className="grid gap-5 p-3 scroll overflow-auto">
                    <div className="w-full p-2 border-2">
                        <label>Click to Select Color</label>
                        <div className="flex justify-center items-center gap-3 p-3">
                            <input
                                value={newColor}
                                onChange={(e) => setNewColor(e.target.value)}
                                type="color"
                                className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                            />
                            <button
                                onClick={() => {
                                    setColor("color", [
                                        ...color,
                                        { color: newColor },
                                    ]);
                                    setShow(false);
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Color;
