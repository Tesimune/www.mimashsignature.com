import { useState, useEffect } from "react";
import PageLayout from '@/Layouts/PageLayout'
import { Link, Head } from "@inertiajs/react";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdWhatsapp } from "react-icons/md";


export default function Cart({ auth, store }) {
    // Initialize cart items using state
    const [existingCartItems, setExistingCartItems] = useState([]);
    const [cartUpdated, setCartUpdated] = useState(false); // Add this line

    // Load existing cart items from local storage on component mount
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        // Filter cart items based on store_id
        const filteredCartItems = storedCartItems.filter(
            (item) => item.store_id === store.id
        );
        setExistingCartItems(filteredCartItems);
    }, []);

    // Effect to listen for changes in local storage
    useEffect(() => {
        const handleStorageChange = () => {
            const storedCartItems =
                JSON.parse(localStorage.getItem("cart")) || [];
            setExistingCartItems(storedCartItems);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [cartUpdated]); // Include cartUpdated in the dependency array

    const handleRemoveItem = (itemId) => {
        const updatedCartItems = existingCartItems.filter(
            (item) => item.id !== itemId
        );
        setExistingCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

const handleQuantityChange = (itemId, newQuantity, newSize, newColor) => {
    // Ensure the new quantity is at least 1
    newQuantity = Math.max(1, newQuantity);

    const updatedCartItems = existingCartItems.map((item) =>
        item.id === itemId
            ? {
                  ...item,
                  quantity: newQuantity,
                  selectedSize: newSize,
                  selectedColor: newColor,
              }
            : item
    );

    setExistingCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
};


    const calculateTotalPrice = () => {
        return existingCartItems.reduce(
            (total, item) => total + item.quantity * (item.selling_price - item.discount),
            0
        );
    };
    
    return (
        <PageLayout user={auth.user}>
            <Head title="Welcome" />
            <div className="container mx-auto py-16 p-3 md:px-16 min-h-screen bg-dots-darker bg-center bg-gray-100 selection:bg-gold selection:text-white">
                <div className="max-w-7xl mx-auto min-h-full bg-white p-6 lg:p-8 rounded-xl">
                    <div className="w-full">
                        <div className="flex justify-between items-center w-full p-3 border-b">
                            <span className="flex items-center">
                                Shopping Cart
                            </span>
                            <button id="my-drawer-4">
                                <GiShoppingBag className="flex items-center" />
                            </button>
                        </div>
                        <div className="w-full">
                            {existingCartItems.map((Item) => (
                                <div
                                    key={Item.id}
                                    className="flex gap-2 p-3 border-b relative"
                                >
                                    <button
                                        className="absolute top-2 right-2 p-3"
                                        onClick={() =>
                                            handleRemoveItem(Item.id)
                                        }
                                    >
                                        <IoMdCloseCircle />
                                    </button>

                                    <div className="bg-slate-200 h-16 w-16 rounded-md">
                                        <img
                                            className="h-full w-full object-cover rounded-md"
                                            src={Item.image[0].url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="grid md:flex justify-between w-full">
                                        <div className="grid gap-2">
                                            <span>{Item.name}</span>
                                            <div className="flex border rounded-md w-24">
                                                <button
                                                    className="w-full border-r"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            Item.id,
                                                            Item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="w-full p-1 text-center outline-none border-none">
                                                    {Item.quantity}
                                                </span>
                                                <button
                                                    className="w-full border-l"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            Item.id,
                                                            Item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span>
                                                {Item.quantity} × ₦
                                                {Item.selling_price -
                                                    Item.discount}
                                            </span>
                                        </div>
                                        <div className="grid justify-end w-full gap-2 items-baseline mr-9 border-slate-200">
                                            <div className="space-x-2 flex justify-end text-sm">
                                                {Item.size?.map((sz) => (
                                                    <label
                                                        key={Math.random(
                                                            0,
                                                            9999
                                                        )}
                                                    >
                                                        <input
                                                            className="sr-only peer"
                                                            name={
                                                                Item.name +
                                                                "size"
                                                            }
                                                            type="checkbox"
                                                            value={sz.size}
                                                            checked={
                                                                Item.selectedSize ===
                                                                sz.size
                                                            }
                                                            onChange={() =>
                                                                handleQuantityChange(
                                                                    Item.id,
                                                                    Item.quantity,
                                                                    sz.size,
                                                                    Item.selectedColor
                                                                )
                                                            }
                                                        />
                                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 border peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                                            {sz.size}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                            <div className="space-x-2 flex justify-end text-sm">
                                                {Item.color?.map((cl) => (
                                                    <label
                                                        className="h-9 w-9"
                                                        key={Math.random(
                                                            0,
                                                            9999
                                                        )}
                                                    >
                                                        <input
                                                            className="sr-only peer"
                                                            name={
                                                                Item.name +
                                                                "color"
                                                            }
                                                            type="checkbox"
                                                            value={cl.color}
                                                            checked={
                                                                Item.selectedColor ===
                                                                cl.color
                                                            }
                                                            onChange={() =>
                                                                handleQuantityChange(
                                                                    Item.id,
                                                                    Item.quantity,
                                                                    Item.selectedSize,
                                                                    cl.color
                                                                )
                                                            }
                                                        />
                                                        <div
                                                            className="h-9 w-full rounded-full peer-checked:border-2 peer-checked:border-green-500"
                                                            style={{
                                                                backgroundColor:
                                                                    cl.color,
                                                            }}
                                                        ></div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-2 p-3 border-t">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₦{calculateTotalPrice()}</span>
                        </div>
                        <div className="flex justify-end gap-2">
                            <div>
                                <a
                                    href=""
                                    className="btn bg-green-500 text-white"
                                >
                                    <MdWhatsapp className="h-5 w-5" />
                                </a>
                            </div>
                            <Link
                                href={route("cart.pay", store.username)}
                                className="btn btn-primary bg-black hover:bg-gold"
                            >
                                checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
