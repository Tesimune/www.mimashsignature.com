import Modal from '@/Components/Modal';
import PageLayout from '@/Layouts/PageLayout'
import { Head } from '@inertiajs/react';
import React, { useState } from 'react'

export default function View({ auth, order }) {
    const [success, setSuccess] = useState(true);
    setTimeout(() => {
        setSuccess(false);
    }, 5000);
    // console.log(order);

    return (
        <PageLayout user={auth.user}>
            <Head title="Order" />
            <div className="max-w-7xl mx-auto py-9 px-3 lg:px-36 xl:px-48">
                <div className="bg-white flex flex-col items-center py-9 px-3 md:px-9 lg:px-9">
                    <div className="flex justify-between w-full">
                        <div className="grid gap-3 w-full">
                            <span className="md:text-2xl">
                                Order Reference: {order.reference}
                            </span>
                            <span className="md:text-sm">
                                Date: {order.created_at}
                            </span>
                            <span className="md:text-sm">
                                Paid: ₦{order.paid_price}
                            </span>
                        </div>
                        <div>
                            {order.order_status == 1 ? (
                                <span className="text-red-500">Pending</span>
                            ) : (
                                <span className="text-yellow-500">Shipped</span>
                            )}
                        </div>
                    </div>
                    <div className="grid w-full">
                        {order.content.map((cn, index) => (
                            <div
                                key={index}
                                className="flex justify-between w-full p-3 border-b"
                            >
                                <span>{cn.name}</span>
                                <span>
                                    {cn.quantity} x ₦
                                    {cn.cost_price - cn.discount}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-5 w-full py-3">
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="grid gap-2">
                                <span className="font-bold">Ordered By:</span>
                                <div className="grid gap-1 text-sm">
                                    <span>Name: {order.order_from.name}</span>
                                    <span>Email: {order.order_from.email}</span>
                                    <span>Contact: {order.order_from.tel}</span>
                                    <span>
                                        Address: {order.order_from.address}
                                    </span>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <span className="font-bold">Deliver To:</span>
                                <div className="grid gap-1 text-sm">
                                    <span>Name: {order.order_to.name}</span>
                                    <span>Email: {order.order_to.email}</span>
                                    <span>Contact: {order.order_to.tel}</span>
                                    <span>
                                        Address: {order.order_to.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>Delivery Country:</span>
                            <span>Delivery State:</span>
                            <span>Delivery Location:</span>
                        </div>
                        <span className="md:text-sm">
                            Description: {order.description}
                        </span>
                    </div>
                </div>
            </div>
            <Modal show={success} onClose={() => setSuccess(false)}>
                <div className="bg-white flex flex-col items-center py-9 px-3">
                    <img src="/success.gif" className="rounded-full" />
                    <div className="grid text-center gap-3">
                        <span className="text-2xl">Payment Successful</span>
                        <span className="text-md">Order Submitted</span>
                        <span className="text-sm">
                            Order Reference: {order.reference}
                        </span>
                    </div>
                </div>
            </Modal>
        </PageLayout>
    );
}
