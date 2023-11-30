import React from 'react'
import { Link, Head, useForm } from "@inertiajs/react";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { MdAddBusiness, MdEdit, MdDeleteOutline } from "react-icons/md";

export default function Show({ store, products }) {
      const {delete: remove} = useForm();

    const deleteProduct = (product) => {
        const response = confirm("You Are About To Delete" + " " + product.name);
        if (response) {
            remove(
                route("product.destroy", {
                    store: store.username,
                    product: product.id,
                })
            );
        }
    };
  return (
      <Authenticated store={store}>
          <Head title={store.store_name} />

          <div className="fixed right-5 bottom-5 z-10">
              <Link
                  href={route("product.create", store.username)}
                  className="drawer-button btn btn-primary bg-gold hover:bg-gold/90 rounded-full"
              >
                  <MdAddBusiness className="h-5 w-4" />
              </Link>
          </div>

          <div className="sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 selection:bg-gold selection:text-white">
              <div className="max-w-7xl mx-auto py-16 md:pt-16 p-6 lg:p-8">
                  {/* <div className="flex justify-center pb-5">
                      <Link href={route("store.view", store.username)}>
                          {store.store_name}
                      </Link>
                  </div> */}
                  <div className="flex w-full">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 w-full p-2 md:p-5 xl:p-10 md:mx-9 mb-20">
                          {products.map((product) => (
                              <div
                                  key={product.id}
                                  className="card card-compact w-full bg-base-100 shadow-xl z-0"
                              >
                                  <figure className="h-64">
                                      <img
                                          src={product.image[0].url}
                                          alt={product.name}
                                          className="h-full w-full object-cover"
                                      />
                                  </figure>
                                  <div className="card-body bg-white text-slate-900">
                                      <h2 className="card-title">
                                          {product.name}
                                          <div className="badge badge-secondary bg-gold">
                                              NEW
                                          </div>
                                      </h2>
                                      <p>
                                          {product.description.slice(0, 35)}...
                                      </p>
                                      <p className="">
                                          <span className="line-through">
                                              ₦{product.selling_price}
                                          </span>
                                          <span className="pl-3">
                                              ₦
                                              {product.selling_price -
                                                  product.discount}
                                          </span>
                                          <span className="pl-3">
                                              Stock: {product.quantity}
                                          </span>
                                      </p>
                                      <div className="card-actions justify-start">
                                          {product?.tag?.map((tg) => (
                                              <div
                                                  key={Math.random(0, 9999)}
                                                  className="badge badge-outline"
                                              >
                                                  {tg.tag}
                                              </div>
                                          ))}
                                      </div>
                                      <div className="card-actions justify-end">
                                          <button
                                              onClick={() =>
                                                  deleteProduct(product)
                                              }
                                              className="btn btn-primary bg-red-500 hover:bg-red-500/90"
                                          >
                                              <MdDeleteOutline />
                                          </button>
                                          <Link
                                              href={route("product.edit", [
                                                  store.username,
                                                  product.id,
                                              ])}
                                              className="btn btn-primary bg-gold hover:bg-gold/90"
                                          >
                                              <MdEdit />
                                          </Link>
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
      </Authenticated>
  );
}
