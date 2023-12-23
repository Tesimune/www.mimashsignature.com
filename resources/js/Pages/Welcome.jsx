import { useState, useEffect } from "react";
import PageLayout from "@/Layouts/PageLayout";
import { Link, Head } from "@inertiajs/react";
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import Show from "./Store/Product/Show";


export default function Welcome({ auth, products }) {
    // Initialize cart items using state
    const [existingCartItems, setExistingCartItems] = useState([]);
    const [totalForCart, setTotalForCart] = useState(0);

    // Load existing cart items from local storage on component mount
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setExistingCartItems(storedCartItems);
    }, []);

    // Update local storage and totalForCart whenever existingCartItems changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(existingCartItems));

        // Calculate total for items with store_id equal to 2
        const total = existingCartItems.filter(
            (item) => item.store_id === store.id
        );

        setTotalForCart(total.length);
    }, [existingCartItems]);

    const handleAddToCart = (product) => {
        const { id, store_id, price } = product;

        // Get the existing cart items for the specific store_id
        const storeCartItems =
            existingCartItems.filter((item) => item.store_id === store_id) ||
            [];

        // Check if the item is already in the cart
        const isItemInCart = storeCartItems.some((item) => item.id === id);

        if (!isItemInCart) {
            // Add the new item to the cart for the specific store_id
            const updatedCartItems = [
                ...existingCartItems,
                { ...product, quantity: 1 },
            ];
            setExistingCartItems(updatedCartItems);

            // Show an alert when the item is added
            // alert(`${product.name} added to the cart!`);
        } else {
            // Remove the item if it's already in the cart (toggle functionality)
            const updatedCartItems = existingCartItems.filter(
                (item) => item.id !== id
            );
            setExistingCartItems(updatedCartItems);

            // Show an alert when the item is removed
            alert(`${product.name} removed from the cart!`);
        }
    };

    const [searchFilter, setSearchFilter] = useState("");
    const store = {
        id: 1,
        username: "Mimashsignature",
    };

    return (
        <PageLayout user={auth.user} store={store} totalForCart={totalForCart}>
            <Head title="Welcome" />
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
                                        <figure className="h-64 w-full">
                                            <img
                                                src={product.image[0].url}
                                                alt={product.name}
                                                className="object-cover h-full w-full"
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
                                                    Products
                                                </div>
                                                {product?.tag?.map((tg) => (
                                                    <div
                                                        key={Math.random(
                                                            0,
                                                            9999
                                                        )}
                                                        className="badge badge-outline"
                                                    >
                                                        {tg.tag}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="card-actions justify-end">
                                                <Show
                                                    product={product}
                                                    existingCartItems={
                                                        existingCartItems
                                                    }
                                                    setExistingCartItems={
                                                        setExistingCartItems
                                                    }
                                                    handleAddToCart={
                                                        handleAddToCart
                                                    }
                                                >
                                                    <span className="btn btn-primary bg-gold hover:bg-gold/90">
                                                        Show
                                                    </span>
                                                </Show>
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
                                                        <MdRemoveShoppingCart className="h-5 w-5 text-red-700" />
                                                    ) : (
                                                        <MdShoppingCart className="h-5 w-5 text-blue-700" />
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
