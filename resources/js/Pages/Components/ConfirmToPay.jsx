import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { Link, Head, useForm } from "@inertiajs/react";
import { usePaystackPayment } from "react-paystack";
import { LuMailWarning } from "react-icons/lu";


function ConfirmToPay({ store, paystack_pub, orderData, open, setOpen }) {
    const config = {
        reference: "MS-" + Math.floor(Math.random() * 1000000000 + 1),
        email: orderData.orderFrom.email,
        amount: orderData.SubtotalToPay * 100, // Amount in kobo
        publicKey: paystack_pub,
    };

    const { data, setData, errors, post } = useForm({
        reference: config.reference,
        total_price: orderData.total_price,
        paid_price: orderData.SubtotalToDisplay,
        received: orderData.SubtotalToPay,
        charges: orderData.charges,
        order_from: orderData.orderFrom,
        order_to: orderData.orderTo,
        description: orderData.description,
        content: orderData.content,
    });

    const initializePayment = usePaystackPayment(config);

    const onSubmit = (e) => {
        e.preventDefault();
        initializePayment(onSuccess, onClose);
    };

    const onSuccess = (res) => {
        post(route("order.store", store.username));
        setOpen(false)
    };

    const onClose = () => {
        console.log("closed");
        setOpen(false); // Close the modal, for example
    };

    return (
        <Modal show={open} onClose={(e) => setOpen(false)}>
            <div className="grid py-3 px-5">
                <div className="flex flex-col justify-center gap-3 h-56">
                    <div className="flex justify-center">
                        <span className=" p-3 rounded-full border-2">
                            <LuMailWarning className="h-9 w-9" />
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-3xl">Proceed to Payment?</span>
                    </div>
                </div>
                <div className="flex justify-end items-end gap-3">
                    <button className="btn btn-primary bg-red-500 hover:bg-red-500/90">
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="btn btn-primary bg-gold hover:bg-gold/90"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmToPay;