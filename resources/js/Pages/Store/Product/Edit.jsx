import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import ImageUpload from "@/Layouts/Components/ImageUpload";
import Color from "@/Pages/Store/Product/Components/Color";
import Size from "@/Pages/Store/Product/Components/Size";
import Tag from "@/Pages/Store/Product/Components/Tag";


export default function Edit({ store, product, thumbnails }) {
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    const { data, setData, errors, put } = useForm({
        name: product.name ?? "",
        cost_price: product.cost_price ?? "",
        selling_price: product.selling_price ?? "",
        discount: product.discount ?? "",
        quantity: product.quantity ?? "",
        color: product.color ?? "",
        size: product.size ?? "",
        image: product.image ?? "",
        tag: product.tag ?? "",
        description: product.description ?? "",
        store_id: product.store_id ?? store.id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("product.update", { store: store.username, product: product.id }));
    };

    return (
        <AuthenticatedLayout
        // user={auth.user}
        >
            <Head title="Create product" />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-9 pt-9">
                    <div className="bg-white flex gap-2 p-6 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">Create product,</div>
                        <div className="text-gray-900">{store.name}</div>
                    </div>
                </div>
                <div className="max-w-7xl py-5 sm:px-6 lg:px-9">
                    <form
                        onSubmit={submit}
                        className="bg-white flex flex-col gap-5 w-full p-2 md:p-5 sm:rounded-lg"
                    >
                        <div className="grid lg:grid-cols-2 gap-9">
                            <div>
                                <div className="flex flex-col gap-1 w-full">
                                    {errors.image && (
                                        <p className="text-red-500">
                                            {errors.image}
                                        </p>
                                    )}
                                    <label className="label">
                                        <span className="label-text">
                                            Image?
                                        </span>
                                    </label>
                                    <div className="bg-gray-300 h-96 w-full rounded-xl">
                                        {data.image.length ? (
                                            <img
                                                className="h-full w-full rounded-xl object-cover"
                                                src={data.image[0].url} // Assuming img is an array with a 'url' property
                                                alt={data.image[0].url} // Consider providing more meaningful alt text
                                            />
                                        ) : null}
                                    </div>
                                    <div>
                                        <ImageUpload
                                            thumbnails={thumbnails}
                                            store={store}
                                            image={data.image}
                                            setImage={setData}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex flex-col gap-1 w-full">
                                        {errors.color && (
                                            <p className="text-red-500">
                                                {errors.color}
                                            </p>
                                        )}
                                        <label className="label">
                                            <span className="label-text">
                                                Color's?
                                            </span>
                                        </label>
                                        <Color
                                            color={data.color}
                                            setColor={setData}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        {errors.size && (
                                            <p className="text-red-500">
                                                {errors.size}
                                            </p>
                                        )}
                                        <label className="label">
                                            <span className="label-text">
                                                Size's?
                                            </span>
                                        </label>
                                        <Size
                                            size={data.size}
                                            setSize={setData}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        {errors.tag && (
                                            <p className="text-red-500">
                                                {errors.tag}
                                            </p>
                                        )}
                                        <label className="label">
                                            <span className="label-text">
                                                Tag's?
                                            </span>
                                        </label>
                                        <Tag tag={data.tag} setTag={setData} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-9">
                                <div className="flex flex-col gap-1 w-full">
                                    {errors.name && (
                                        <p className="text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                    <label className="label">
                                        <span className="label-text">
                                            Product name?
                                        </span>
                                    </label>
                                    <input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                        placeholder="Bag"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    {errors.cost_price && (
                                        <p className="text-red-500">
                                            {errors.cost_price}
                                        </p>
                                    )}
                                    <label className="label">
                                        <span className="label-text">
                                            Cost price?
                                        </span>
                                    </label>
                                    <input
                                        value={data.cost_price}
                                        onChange={(e) =>
                                            setData(
                                                "cost_price",
                                                e.target.value
                                            )
                                        }
                                        className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                        placeholder="4000"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {errors.selling_price && (
                                        <p className="text-red-500">
                                            {errors.selling_price}
                                        </p>
                                    )}
                                    <label className="label">
                                        <span className="label-text">
                                            Selling price?
                                        </span>
                                    </label>
                                    <input
                                        value={data.selling_price}
                                        onChange={(e) =>
                                            setData(
                                                "selling_price",
                                                e.target.value
                                            )
                                        }
                                        className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                        placeholder="5000"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    {errors.discount && (
                                        <p className="text-red-500">
                                            {errors.discount}
                                        </p>
                                    )}
                                    <label className="label">
                                        <span className="label-text">
                                            Discount?
                                        </span>
                                    </label>
                                    <input
                                        value={data.discount}
                                        onChange={(e) =>
                                            setData("discount", e.target.value)
                                        }
                                        className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                        placeholder="100"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    {errors.quantity && (
                                        <p className="text-red-500">
                                            {errors.quantity}
                                        </p>
                                    )}
                                    <label className="label">
                                        <span className="label-text">
                                            Quantity on stock?
                                        </span>
                                    </label>
                                    <input
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
                                        }
                                        className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                        placeholder="20"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    {errors.description && (
                                        <p className="text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                    <label className="label">
                                        <span className="label-text">
                                            Description?
                                        </span>
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="input bg-slate-200 h-56 w-full text-slate-800 border-none outline-none placeholder:text-s4ate-300"
                                        placeholder="General merchandise"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn bg-gold text-white"
                            >
                                submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
