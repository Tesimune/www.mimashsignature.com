import React from 'react'
import { GiShoppingBag } from "react-icons/gi"
import { IoMdCloseCircle } from "react-icons/io"

function SideCart() {
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
                              <button
                                  id="my-drawer-4"
                              >
                                  <GiShoppingBag className="flex items-center" />
                              </button>
                          </div>
                          <div>
                              <div className="flex gap-2 p-3 border-b relative">
                                  <button className="absolute top-2 right-2 p-3">
                                      <IoMdCloseCircle />
                                  </button>
                                  <div className="bg-slate-200 h-16 w-16 rounded-md">
                                      <img
                                          className="h-full w-full object-cover rounded-md"
                                          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                          alt=""
                                      />
                                  </div>
                                  <div className="grid gap-2">
                                      <span>Cart Item 1</span>
                                      <div className="flex border rounded-md w-24">
                                          <button className="w-full border-r">
                                              -
                                          </button>
                                          <input
                                              min={1}
                                              className="w-full p-1 text-center outline-none border-none"
                                          />
                                          <button className="w-full border-l">
                                              +
                                          </button>
                                      </div>
                                      <span>1 × ₦3,950</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="grid gap-2 p-3 border-t">
                          <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>₦4,049</span>
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

export default SideCart