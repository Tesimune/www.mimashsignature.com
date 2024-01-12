import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { MdDelete } from "react-icons/md";

function Category({ store, categories, category, setCategory }) {
    const [show, setShow] = useState(false);
    
    function getCategoryNameById(categories, category) {
        for (const ct of categories) {
            if (ct.id == category) {
                return ct.name;
            }
        }
        // Return a default value or handle the case when no match is found
        return "Category not found";
    }
    
    const categoryName = getCategoryNameById(categories, category);


    const select = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    const { data, setData, errors, post } = useForm({
        name: "",
        description: "",
        store_id: store.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("category.store", store));
    };

    const { delete: remove } = useForm();

    const deleteCategory = (ct) => {
        const response = confirm(
            "You Are About To Delete" + " " + ct.name
        );
        if (response) {
            remove(
                route("category.destroy", {
                    store: store.username,
                    category: ct,
                })
            );
        }
    };

    return (
        <div>
            <div className="grid gap-2">
                <section
                    className="cursor-pointer border-2 rounded-xl"
                    onClick={select}
                >
                    {categoryName.length ? (
                        <span className="flex justify-center items-center gap-3 h-full w-full">
                            {categoryName}
                        </span>
                    ) : (
                        <span className="flex justify-center items-center gap-3 h-full w-full">
                            Category
                        </span>
                    )}
                </section>
            </div>

            <Modal show={show} onClose={closeModal}>
                <div className="flex flex-col gap-5 h-[430px] p-3 scroll overflow-auto">
                    {categories.map((ct) => (
                        <div
                            key={ct.id}
                            className="flex w-full border-2 cursor-pointer"
                        >
                            <span
                                className="flex w-full p-2"
                                onClick={(e) => {
                                    setCategory("category", ct.id);
                                    setShow(false);
                                }}
                            >
                                {ct.name}
                            </span>
                            <button
                                onClick={() => deleteCategory(ct)}
                                className="bg-red-500 text-white p-2 border-0 outline-none"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-2 border-t overflow-auto">
                    <form className="flex flex-col gap-2" onSubmit={submit}>
                        <div className="grid md:flex-col gap-2 w-full">
                            <input
                                type="text"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full py-3 px-5 border-l-8 border-as rounded outline-none"
                            />
                            {errors.name && (
                                <p className="text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <div className="grid md:flex justify-end">
                            <span
                                onClick={(e) =>
                                    post(route("category.store", store))
                                }
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

export default Category;
