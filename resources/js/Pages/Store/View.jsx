import { useState, useEffect } from "react";
import PageLayout from "@/Layouts/PageLayout";
import { Link, Head } from "@inertiajs/react";
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

export default function View({ store, products }) {
    // Initialize cart items using state
    const [existingCartItems, setExistingCartItems] = useState([]);

    // Load existing cart items from local storage on component mount
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setExistingCartItems(storedCartItems);
    }, []);

    // Update local storage whenever existingCartItems changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(existingCartItems));
    }, [existingCartItems]);

    const handleAddToCart = (product) => {
        // Get the product details you want to store
        const cartItem = {
            id: product.id,
            name: product.name,
            img: product.image[0].url,
            price: product.selling_price - product.discount,
            quantity: 1,
        };

        // Check if the item is already in the cart
        const isItemInCart = existingCartItems.some(
            (item) => item.id === cartItem.id
        );

        if (!isItemInCart) {
            // Add the new item to the cart
            const updatedCartItems = [...existingCartItems, cartItem];
            setExistingCartItems(updatedCartItems);

            // Show an alert when the item is added
            // alert(`${cartItem.name} added to the cart!`);
        } else {
            // Remove the item if it's already in the cart (toggle functionality)
            const updatedCartItems = existingCartItems.filter(
                (item) => item.id !== cartItem.id
            );
            setExistingCartItems(updatedCartItems);

            // Show an alert when the item is removed
            alert(`${cartItem.name} removed from the cart!`);
        }
    };

    const [searchFilter, setSearchFilter] = useState("");

    
    return (
        <PageLayout existingCartItems={existingCartItems}>
            <Head title={store.store_name} />

            <div className="sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 selection:bg-gold selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex max-w-7xl p-2 md:p-5 md:mx-9">
                        <input
                            placeholder="Search"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            className="w-full outline-none border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="flex justify-center">
                        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-9 p-2 md:p-5 xl:p-10 md:mx-9 mb-20">
                            {products
                                .filter((product) =>
                                    product.name
                                        .toLowerCase()
                                        .includes(searchFilter.toLowerCase())
                                )
                                .map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="card card-compact w-full bg-base-100 shadow-xl z-0"
                                    >
                                        <figure className="h-64">
                                            <img
                                                src={product.image[0].url}
                                                alt={product.name}
                                            />
                                        </figure>
                                        <div className="card-body bg-white text-slate-900">
                                            <h2 className="card-title">
                                                {product.name}
                                                <div className="badge badge-secondary bg-gold">
                                                    NEW
                                                </div>
                                            </h2>
                                            <p className="">
                                                <span className="line-through">
                                                    ₦{product.selling_price}
                                                </span>
                                                <span className="pl-3   ">
                                                    ₦
                                                    {product.selling_price -
                                                        product.discount}
                                                </span>
                                                <span className="pl-3">
                                                    Stock: {product.quantity}
                                                </span>
                                            </p>
                                            <div className="card-actions justify-start">
                                                <div className="badge badge-outline">
                                                    Fashion
                                                </div>
                                                <div className="badge badge-outline">
                                                    Products
                                                </div>
                                            </div>
                                            <div className="card-actions justify-end">
                                                <button className="btn btn-primary bg-gold hover:bg-gold/90">
                                                    Buy Now
                                                </button>
                                                <button
                                                    className="btn btn-primary bg-gold/30 hover:bg-gold/50"
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            product,
                                                            () =>
                                                                setCartUpdated(
                                                                    !cartUpdated
                                                                )
                                                        )
                                                    }
                                                >
                                                    {existingCartItems.some(
                                                        (item) =>
                                                            item.id ===
                                                            product.id
                                                    ) ? (
                                                        <MdRemoveShoppingCart className="text-red-700" />
                                                    ) : (
                                                        <MdShoppingCart className="text-blue-700" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
