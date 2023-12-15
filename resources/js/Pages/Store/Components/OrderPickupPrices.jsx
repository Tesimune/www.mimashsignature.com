import { useForm } from '@inertiajs/react';
import React from 'react'

function OrderPickupPrices({ orderPickupPrices }) {
      const { delete: remove } = useForm();

      const deleteLocation = (orderPickupPrice) => {
          const response = confirm("You Are About To Delete");
          if (response) {
              remove(route("orderPickupPrice.destroy", orderPickupPrice));
          }
      };
    return (
        <div className="grid gap-3 pb-28">
            {orderPickupPrices.map((orderPickupPrice) => (
                <div
                    key={orderPickupPrice.id}
                    className="dropdown dropdown-end dropdown-bottom"
                >
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn flex justify-between bg-gold text-white"
                    >
                        <h3>{orderPickupPrice.country}</h3>
                        <h3>{orderPickupPrice.state}</h3>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu bg-white text-black p-2 shadow rounded-box w-52"
                    >
                        <li>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_1")
                                        .showModal()
                                }
                            >
                                Show
                            </button>
                        </li>
                        <li>
                            <a>Edit</a>
                        </li>
                        <li>
                            <button
                                onClick={() => deleteLocation(orderPickupPrice)}
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box bg-white text-black">
                            <h3 className="font-bold text-lg">
                                {orderPickupPrice.state}
                            </h3>
                            <div className="py-4">
                                {orderPickupPrice.location_and_price.map(
                                    (lap, index) => (
                                        <div
                                            className="flex justify-between border p-2"
                                            key={index}
                                        >
                                            <h4>{lap.location}</h4>
                                            <h4>{lap.price}</h4>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            ))}
        </div>
    );
}

export default OrderPickupPrices