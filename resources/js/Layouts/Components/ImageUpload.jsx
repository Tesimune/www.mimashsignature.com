import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

function ImageUpload({ thumbnails, store, image, setImage }) {
    const [show, setShow] = useState(false);

    const select = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    const { data, setData, errors, post } = useForm({
        upload: "",
        type: "img",
        store_id: store.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("upload"));
    };
    // console.log(img)
    const removeImage = (itemToRemove) => {
        // Use filter to create a new array excluding the item to be removed
        const newArray = image.filter((_, index) => index !== itemToRemove);

        // Set the state with the new array
        setImage('image', newArray);
    };
    
    const handleImageError = (e) => {
        e.target.src = "/mimash.png"; // Replace with your fallback image URL
    };

    return (
        <div>
            <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2">
                {image.length ? (
                    <>
                        {image.map((im, index) => (
                            <div
                                onClick={() => removeImage(index)}
                                key={index}
                                className="h-16 w-16 cursor-pointer border-2 rounded-xl relative"
                            >
                                <img
                                    className="h-full w-full rounded-xl object-cover"
                                    src={im.url}
                                    alt={im.url}
                                    onError={handleImageError}
                                />
                            </div>
                        ))}
                    </>
                ) : null}
                <section
                    className="h-16 w-16 cursor-pointer border-2 rounded-xl relative"
                    onClick={select}
                >
                    <div className="flex justify-center items-center gap-3 h-full w-full absolute inset-0">
                        <MdOutlinePhotoSizeSelectActual className="h-5 w-5" />
                    </div>
                </section>
            </div>

            <Modal show={show} onClose={closeModal}>
                <div className="grid lg:grid-cols-2 gap-5 h-[450px] p-3 scroll overflow-auto">
                    {thumbnails.map((thumbnail) => (
                        <div key={thumbnail.id} className="w-full p-2 border-2">
                            <img
                                onClick={(e) => {
                                    setImage("image", [
                                        ...image,
                                        {
                                            id: thumbnail.id,
                                            url: thumbnail.upload,
                                        },
                                    ]);
                                    setShow(false);
                                }}
                                src={thumbnail.upload}
                                alt={thumbnail.upload}
                                onError={handleImageError}
                            />
                            <div className="flex justify-center items-center gap-3 p-3">
                                <span
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        setImage("image", [
                                            ...image,
                                            {
                                                id: thumbnail.id,
                                                url: thumbnail.upload,
                                            },
                                        ]);
                                        setShow(false);
                                    }}
                                >
                                    Select
                                </span>
                                <button>Get url</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-2 border-t overflow-auto">
                    <form onSubmit={submit}>
                        <div className="grid md:flex-col gap-2 w-full">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData("upload", e.target.files)
                                }
                                className="w-full py-3 px-5 border-l-8 border-as rounded outline-none"
                                multiple
                            />
                            {errors.upload && (
                                <p className="text-red-500">{errors.upload[0]}</p>
                            )}
                            {errors.type && (
                                <p className="text-red-500">{errors.type}</p>
                            )}
                            {errors.user_id && (
                                <p className="text-red-500">{errors.user_id}</p>
                            )}
                        </div>
                        <div className="grid md:flex justify-end">
                            <span
                                onClick={(e) => post(route("upload"))}
                                className="bg-as/20 text-black/90 py-3 px-5 border-l-8 border-as cursor-pointer rounded"
                            >
                                Submit
                            </span>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default ImageUpload;
