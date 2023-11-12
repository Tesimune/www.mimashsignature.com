import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ stores }) {
  return (
      <AuthenticatedLayout
          // user={auth.user}
          header={
              <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  My stores
              </h2>
          }
      >
          <Head title="My stores" />

          <div className="sm:flex sm:justify-center sm:items-center pt-9">
              <div className="max-w-7xl mx-auto p-6 lg:p-8">
                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-9">
                      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                          <div className="p-6 text-gray-900">My Store's</div>
                      </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 p-2 md:p-5 xl:p-10 md:mx-9 mb-20">
                      <Link
                          href={route("store.create")}
                          className="card w-full bg-base-100 shadow-xl image-full z-0"
                      >
                          <figure>
                              <img
                                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                  alt="Shoes"
                              />
                          </figure>
                          <div className="card-body">
                              <h2 className="card-title">Create!</h2>
                              <p>Create a new store.</p>
                          </div>
                      </Link>
                      {stores.map((store) => (
                          <div
                              key={store.id}
                              className="card w-full bg-base-100 shadow-xl image-full z-0"
                          >
                              <figure>
                                  <img
                                      src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                      alt="Shoes"
                                  />
                              </figure>
                              <div className="card-body">
                                  <h2 className="card-title">Order's!</h2>
                                  <p>Check order's current status.</p>
                                  {/* <div className="card-actions justify-end">
                                            <button className="btn btn-primary bg-gold">
                                                Order's
                                            </button>
                                        </div> */}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}
