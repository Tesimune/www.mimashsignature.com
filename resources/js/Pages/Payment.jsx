import { useState, useEffect } from "react";
import PageLayout from "@/Layouts/PageLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import { usePaystackPayment } from "react-paystack";

export default function Payment({ auth, store, paystack_pub }) {
    const [existingCartItems, setExistingCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setExistingCartItems(storedCartItems);
    }, []);

      const calculateTotalPrice = () => {
          return existingCartItems.reduce(
              (total, item) =>
                  total + item.quantity * (item.selling_price - item.discount),
              0
          );
      };
    const vat = 200;
    const Subtotal = calculateTotalPrice() + vat;

    const [loading, setLoading] = useState(false);

    const { data, setData, errors, post } = useForm({
        name: auth.user.name ?? "",
        email: auth.user.email ?? "",
        tel: auth.user.tel ?? "",
        address: auth.user.address ?? "",
    });
    const config = {
        reference: "MS-" + Math.floor(Math.random() * 1000000000 + 1),
        email: data.email,
        amount: (Subtotal + 200) * 100, // Amount in kobo
        publicKey: paystack_pub,
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = (reference) => {
        console.log(reference);
        setLoading(false);
        submit()
    };

    const onClose = () => {
        console.log("closed");
        setLoading(false);
    };

    function submit(e) {
        e.preventDefault();
        post(route("order.store"));        
    }

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
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    initializePayment(onSuccess, onClose);
                                }}
                                className="bg-gray-50 h-full w-full p-3 md:p-5"
                            >
                                <div className="grid lg:grid-cols-2 mb-6">
                                    <div className="p-3 my-3 lg:my-0 lg:mx-3 border rounded-md">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">
                                                    Name?
                                                </span>
                                            </label>
                                            <input
                                                type="name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.name}
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
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.email}
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
                                                    setData(
                                                        "tel",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.tel}
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
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.address}
                                                placeholder="No:12 Kaduna, Kaduna"
                                                className="input input-bordered bg-white text-slate-700 w-full"
                                                // required
                                            />
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
                                                            <span>
                                                                {Item.name}
                                                            </span>
                                                            <span>
                                                                {Item.quantity}{" "}
                                                                × ₦
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
                                                            ₦
                                                            {calculateTotalPrice()}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between p-1 w-full">
                                                        <span>Vat:</span>
                                                        <span>₦{vat}</span>
                                                    </div>
                                                    <div className="flex justify-between p-1 w-full">
                                                        <span>Subtotal:</span>
                                                        <span>₦{Subtotal}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:justify-end w-full">
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
