import { useState, useEffect } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";



function SideCart() {
    // Initialize cart items using state
    const [existingCartItems, setExistingCartItems] = useState([]);

    // Load existing cart items from local storage on component mount
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart"));
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

    const handleRemoveItem = (itemId) => {
        const updatedCartItems = existingCartItems.filter(
            (item) => item.id !== itemId
        );
        setExistingCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedCartItems = existingCartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setExistingCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const calculateTotalPrice = () => {
        return existingCartItems.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );
    };

    return (
        <div>
            <div className="drawer drawer-end">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label
                        htmlFor="my-drawer-4"
                        className="drawer-button btn btn-primary bg-gold hover:bg-gold/90 rounded-full"
                    >
                        <GiShoppingBag className="h-5 w-4" />
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="menu justify-between w-80 min-h-full bg-white">
                        <div>
                            <div className="flex justify-between items-center p-3 border-b">
                                <span className="flex items-center">
                                    Shopping Cart
                                </span>
                                <button id="my-drawer-4">
                                    <GiShoppingBag className="flex items-center" />
                                </button>
                            </div>
                            <div>
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
                                                src={Item.img}
                                                alt=""
                                            />
                                        </div>
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
                                                {Item.quantity} × ₦{Item.price}
                                            </span>
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
                            <button className="btn btn-primary bg-black hover:bg-gold w-full">
                                checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideCart;
