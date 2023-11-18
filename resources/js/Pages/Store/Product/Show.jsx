import Modal from "@/Components/Modal";
import React, { useState, useEffect } from "react";
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";

export default function Show({
    children,
    product,
    existingCartItems,
    setExistingCartItems,
    handleAddToCart,
}) {
    const [show, setShow] = useState(false);
    const [buyNowItems, setBuyNowItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState(
        product.selectedSize || ""
    );
    const [selectedColor, setSelectedColor] = useState(
        product.selectedColor || ""
    );

    const handleQuantityChange = (itemId, newQuantity, newSize, newColor) => {
        // Update buyNowItems as well
        const updatedBuyNowItems = buyNowItems.map((item) =>
            item.id === itemId
                ? {
                      ...item,
                      quantity: newQuantity,
                      selectedSize: newSize,
                      selectedColor: newColor,
                  }
                : item
        );
        setBuyNowItems(updatedBuyNowItems);
        localStorage.setItem("buyNowItems", JSON.stringify(updatedBuyNowItems));
    };

    const handleBuyNow = () => {
        // Add the current product to buyNowItems
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.selling_price - product.discount,
            selectedColor,
            selectedSize,
        };

        setBuyNowItems([...buyNowItems, newItem]);
        localStorage.setItem(
            "buyNowItems",
            JSON.stringify([...buyNowItems, newItem])
        );

        console.log(buyNowItems)

    };

    useEffect(() => {
        const storedBuyNowItems =
            JSON.parse(localStorage.getItem("buyNowItems")) || [];
        setBuyNowItems(storedBuyNowItems);
    }, []);

    return (
        <div>
            <button className="" onClick={() => setShow(true)}>
                {children}
            </button>
            <Modal show={show} onClose={() => setShow(false)}>
                <div className="">
                    <div className="flex justify-between p-3 border-b">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <button onClick={() => setShow(false)}>X</button>
                    </div>
                    <div className="grid md:flex font-sans py-5 px-3">
                        <div className="flex p-4 space-x-4 w-full lg:w-48 bg-white overflow-x-auto scroll">
                            {product.image.map((img) => (
                                <div
                                    key={img.id}
                                    className="bg-white h-56 w-48 flex-none relative"
                                >
                                    <img
                                        src={img.url}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

                        <form className="flex-auto p-6">
                            <div className="flex flex-wrap">
                                <h1 className="flex-auto text-lg font-semibold text-slate-900">
                                    {product.name}
                                </h1>
                                <div className="text-lg font-semibold text-slate-500">
                                    <p className="">
                                        <span className="line-through">
                                            ₦{product.selling_price}
                                        </span>
                                        <span className="pl-3   ">
                                            ₦
                                            {product.selling_price -
                                                product.discount}
                                        </span>
                                    </p>
                                </div>
                                <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                                    In stock: {product.quantity}
                                </div>
                            </div>
                            <div className="grid justify-end w-full gap-2 items-baseline mr-9 mb-6 border-slate-200">
                                <div className="space-x-2 flex justify-end text-sm">
                                    {product.size?.map((sz, index) => (
                                        <label key={index}>
                                            <input
                                                className="sr-only peer"
                                                name={product.name + "size"}
                                                type="checkbox"
                                                value={sz.size}
                                                checked={
                                                    selectedSize === sz.size
                                                }
                                                onChange={() =>
                                                    setSelectedSize(sz.size)
                                                }
                                            />
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 border peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                                {sz.size}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <div className="space-x-2 flex justify-end text-sm">
                                    {product.color?.map((cl, index) => (
                                        <label key={index}>
                                            <input
                                                className="sr-only peer"
                                                name={product.name + "color"}
                                                type="checkbox"
                                                value={cl.color}
                                                checked={
                                                    selectedColor === cl.color
                                                }
                                                onChange={() =>
                                                    setSelectedColor(cl.color)
                                                }
                                            />
                                            <div
                                                className="h-9 w-9 rounded-full peer-checked:border-2 peer-checked:border-green-500"
                                                style={{
                                                    backgroundColor: cl.color,
                                                }}
                                            ></div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-4 mb-6 text-sm font-medium">
                                <div className="flex-auto flex space-x-4">
                                    <button
                                        className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                                        type="button"
                                        onClick={handleBuyNow}
                                    >
                                        Buy now
                                    </button>
                                    <button
                                        className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                                        type="button"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        {existingCartItems.some(
                                            (item) => item.id === product.id
                                        ) ? (
                                            <MdRemoveShoppingCart className="h-6 w-6 text-red-700" />
                                        ) : (
                                            <MdShoppingCart className="h-6 w-6 text-blue-700" />
                                        )}
                                    </button>
                                </div>
                                <button
                                    className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                                    type="button"
                                    aria-label="Like"
                                >
                                    <GoHeartFill />
                                </button>
                            </div>

                            <p className="text-sm text-slate-700">
                                {product.description.slice(0, 25)}
                            </p>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
