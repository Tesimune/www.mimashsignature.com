import { useState, useEffect } from "react";
import PageLayout from "@/Layouts/PageLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import { usePaystackPayment } from "react-paystack";

export default function Payment({ auth, store, orderPickupPrices, paystack_pub }) {
    const [existingCartItems, setExistingCartItems] = useState([]);
    const [gift, setGift] = useState(false);
    const [state, setState] = useState();
    const [delivery, setDelivery] = useState(1500);
    const [location_and_price, setLocation_and_price] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setExistingCartItems(storedCartItems);
        setData("content", storedCartItems);

        // Set default values for state and location_and_price
        if (orderPickupPrices.length > 0) {
            setState(orderPickupPrices[0].state); // Set the default state to the first state in the array
            setLocation_and_price(orderPickupPrices[0].location_and_price); // Set the default location_and_price to the first array in the array
        }
    }, [orderPickupPrices]); // Include orderPickupPrices in the dependency array


    const calculateTotalPrice = () => {
        return existingCartItems.reduce(
            (total, item) =>
                total + item.quantity * (item.selling_price - item.discount),
            0
        );
    };

    const vat = 100;

    const SubtotalToPay =
        calculateTotalPrice() + Number(delivery) + Number(vat);

    const paystack_charges = (subtotal) => {
        const percentageFee = (1.5 / 100) * subtotal;
        const fixedFee = 100;

        // Apply the waived fee for transactions under ₦2500
        if (subtotal < 2500) {
            return 0;
        }

        // Calculate the total fee, capped at ₦2000
        const totalFee = Math.min(percentageFee + fixedFee, 2000);

        return totalFee;
    };

    const charges = paystack_charges(SubtotalToPay) + Number(vat);
    const SubtotalToDisplay =
        calculateTotalPrice() + Number(delivery) + charges;

    const [orderFrom, setOrderFrom] = useState({
        name: auth.user.name ?? "",
        email: auth.user.email ?? "",
        tel: auth.user.tel ?? "",
        address: auth.user.address ?? "",
        state: ""
    });

    const [orderTo, setOrderTo] = useState({
        name: auth.user.name ?? "",
        email: auth.user.email ?? "",
        tel: auth.user.tel ?? "",
        address: auth.user.address ?? "",
        country: "Nigeria", // Add the country
        state: state, // Add the state
    });



    const config = {
        reference: "MS-" + Math.floor(Math.random() * 1000000000 + 1),
        email: orderFrom.email,
        amount: SubtotalToPay * 100, // Amount in kobo
        publicKey: paystack_pub,
    };

    const initializePayment = usePaystackPayment(config);

    
    const { data, setData, errors, post } = useForm({
        reference: config.reference,
        total_price: calculateTotalPrice(),
        paid_price: SubtotalToDisplay,
        received: SubtotalToPay,
        charges,
        order_from: orderFrom,
        order_to: {
            ...orderTo,
            delivery_location: `${orderTo.country}, ${orderTo.state}, ${orderTo.address}, ${orderTo.country}, ${orderTo.state}, ${orderTo.address}`,
        },
        description: "",
        content: "",
    });


    const onSuccess = (reference) => {
        console.log(reference);
        setData("reference", data.reference);
        post(route("order.store", store.username));
    };

    const onClose = () => {
        console.log("closed");
        setLoading(false);
    };


    console.log(data.order_to);

    return (
        <PageLayout>
            <Head title="Payment" />
            <div className="sm:flex sm:justify-center min-h-screen w-full bg-dots-darker bg-center bg-gray-100 selection:bg-gold selection:text-white relative">
                <div className="container mx-auto p-6 lg:p-8">
                    <div className="flex max-w-7xl p-2 md:p-5 md:mx-9">
                        <div className="grid gap-3 h-full w-full">
                            <h3 className="text-center text-4xl font-bold">
                                Order Summary
                            </h3>
                            <form
                                // onSubmit={submit}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    initializePayment(onSuccess, onClose);
                                }}
                                className="bg-gray-50 h-full w-full p-3 md:p-5"
                            >
                                <div className="grid lg:flex mb-6">
                                    <div className="p-3 my-3 lg:my-0 lg:mx-3 w-full border rounded-md">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">
                                                    Name?
                                                </span>
                                            </label>
                                            <input
                                                type="name"
                                                onChange={(e) =>
                                                    setOrderFrom({
                                                        ...orderTo,
                                                        name: e.target.value,
                                                    })
                                                }
                                                value={orderFrom.name}
                                                placeholder="John Doe"
                                                className="input input-bordered bg-white text-slate-700 w-full"
                                                required
                                            />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">
                                                    Email?
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                onChange={(e) =>
                                                    setOrderFrom({
                                                        ...orderTo,
                                                        email: e.target.value,
                                                    })
                                                }
                                                value={orderFrom.email}
                                                placeholder="Email"
                                                className="input input-bordered bg-white text-slate-700 w-full"
                                                required
                                            />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">
                                                    Tel?
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                onChange={(e) =>
                                                    setOrderFrom({
                                                        ...orderTo,
                                                        tel: e.target.value,
                                                    })
                                                }
                                                value={orderFrom.tel}
                                                placeholder="08000000000"
                                                className="input input-bordered bg-white text-slate-700 w-full"
                                                // required
                                            />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">
                                                    Address?
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e) =>
                                                    setOrderFrom({
                                                        ...orderTo,
                                                        address: e.target.value,
                                                    })
                                                }
                                                value={orderFrom.address}
                                                placeholder="No:12 Kaduna, Kaduna"
                                                className="input input-bordered bg-white text-slate-700 w-full"
                                                // required
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="label">
                                                <span className="label-text">
                                                    Send As Gift?
                                                </span>
                                            </label>
                                            <input
                                                type="checkbox"
                                                onChange={(e) => setGift(!gift)}
                                            />
                                        </div>
                                    </div>
                                    {gift && (
                                        <div className="p-3 my-3 lg:my-0 lg:mx-3 w-full border rounded-md">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Name?
                                                    </span>
                                                </label>
                                                <input
                                                    type="name"
                                                    onChange={(e) =>
                                                        setOrderTo({
                                                            ...orderTo,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    value={orderTo.name}
                                                    placeholder="John Doe"
                                                    className="input input-bordered bg-white text-slate-700 w-full"
                                                    required
                                                />
                                            </div>
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Email?
                                                    </span>
                                                </label>
                                                <input
                                                    type="email"
                                                    onChange={(e) =>
                                                        setOrderTo({
                                                            ...orderTo,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    value={orderTo.email}
                                                    placeholder="Email"
                                                    className="input input-bordered bg-white text-slate-700 w-full"
                                                    required
                                                />
                                            </div>
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Tel?
                                                    </span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    onChange={(e) =>
                                                        setOrderTo({
                                                            ...orderTo,
                                                            tel: e.target.value,
                                                        })
                                                    }
                                                    value={orderTo.tel}
                                                    placeholder="08000000000"
                                                    className="input input-bordered bg-white text-slate-700 w-full"
                                                    // required
                                                />
                                            </div>
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Address?
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    onChange={(e) =>
                                                        setOrderTo({
                                                            ...orderTo,
                                                            address:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={orderTo.address}
                                                    placeholder="No:12 Kaduna, Kaduna"
                                                    className="input input-bordered bg-white text-slate-700 w-full"
                                                    // required
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="grid lg:flex gap-5 py-3">
                                    <div className="grid w-full">
                                        <label className="label">
                                            <span className="label-text">
                                                Country?
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setOrderFrom({
                                                    ...orderFrom,
                                                    country: e.target.value,
                                                })
                                            }
                                            value={"Nigeria"}
                                            placeholder="Nigeria"
                                            className="input input-bordered bg-white text-slate-700 w-full"
                                        />
                                    </div>
                                    <div className="grid w-full">
                                        <label className="label">
                                            <span className="label-text">
                                                State?
                                            </span>
                                        </label>

                                        <div className="grid lg:flex gap-5">
                                            <select
                                                onChange={(e) => {
                                                    setState(e.target.value);
                                                    const selectedOrderPickupPrice =
                                                        orderPickupPrices.find(
                                                            (price) =>
                                                                price.state ===
                                                                e.target.value
                                                        );
                                                    setLocation_and_price(
                                                        selectedOrderPickupPrice
                                                            ? selectedOrderPickupPrice.location_and_price
                                                            : []
                                                    );
                                                    setOrderTo({
                                                        ...orderTo,
                                                        state: e.target.value,
                                                    });
                                                }}
                                                value={state}
                                                className="input input-bordered bg-white text-slate-700 w-full"
                                            >
                                                {orderPickupPrices.map(
                                                    (orderPickupPrice) => (
                                                        <option
                                                            key={
                                                                orderPickupPrice.id
                                                            }
                                                            value={
                                                                orderPickupPrice.state
                                                            }
                                                        >
                                                            {
                                                                orderPickupPrice.state
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>

                                            <select
                                                onChange={(e) =>
                                                    setDelivery(e.target.value)
                                                }
                                                value={delivery}
                                                className="input input-bordered bg-white text-slate-700 w-full"
                                            >
                                                {location_and_price.map(
                                                    (lap, index) => (
                                                        <option
                                                            key={index}
                                                            value={lap.price}
                                                        >
                                                            {lap.location} - ₦
                                                            {lap.price}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white w-full border rounded-md">
                                    <div className="flex flex-col justify-between h-full w-full">
                                        <div className="w-full p-3 md:p-5">
                                            {existingCartItems.map(
                                                (Item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-between py-2 border-b"
                                                    >
                                                        <span>{Item.name}</span>
                                                        <span>
                                                            {Item.quantity} × ₦
                                                            {Item.selling_price -
                                                                Item.discount}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="grid items-end w-full border-t">
                                            <div className="grid items-end w-full p-3 text-sm">
                                                <div className="flex justify-between p-1 w-full">
                                                    <span>Total:</span>
                                                    <span>
                                                        ₦{calculateTotalPrice()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between p-1 w-full">
                                                    <span>Delivery:</span>
                                                    <span>₦{delivery}</span>
                                                </div>
                                                <div className="flex justify-between p-1 w-full">
                                                    <span>Charges:</span>
                                                    <span>₦{charges}</span>
                                                </div>
                                                <div className="flex justify-between p-1 w-full">
                                                    <span>Subtotal:</span>
                                                    <span>
                                                        ₦{SubtotalToDisplay}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:justify-end w-full py-3">
                                    <div className="grid md:flex md:flex-row-reverse gap-3 w-full">
                                        <button className="btn btn-primary w-full md:w-fit bg-gold hover:bg-gold/90 text-white">
                                            Submit
                                        </button>
                                        <Link
                                            href={route("cart", store.username)}
                                            className="btn btn-primary w-full md:w-fit bg-black hover:bg-black/90 text-white"
                                        >
                                            Back to cart
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </PageLayout>
    );
}
