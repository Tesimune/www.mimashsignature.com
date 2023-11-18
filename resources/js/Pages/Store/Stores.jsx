import React from "react";
import { Head, Link } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";

export default function Stores({ stores }) {
    return (
        <PageLayout
            // user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Stores
                </h2>
            }
        >
            <Head title="Stores" />

            <div className="sm:flex sm:justify-center sm:items-center pt-9">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-9">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">Store's</div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 p-2 md:p-5 xl:p-10 md:mx-9 mb-20">
                        {stores.map((store) => (
                            <Link
                                href={route("store.view", store.username)}
                                key={store.id}
                                className="card w-full bg-base-100 shadow-xl image-full z-0"
                            >
                                <figure>
                                    <img
                                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                        alt="Shoes"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {store.store_name}
                                    </h2>
                                    <p>
                                        {store.store_description.slice(0, 30)}
                                        ...
                                    </p>
                                    <div className="card-actions justify-end"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
