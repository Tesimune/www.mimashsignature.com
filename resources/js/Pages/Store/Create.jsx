import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';

export default function Create() {

    const { data, setData, errors, post } = useForm({
        email: "",
        tel: "",
        country: "",
        state: "",
        zip_code: "",
        store_address: "",
        store_name: "",
        store_type: "",
        store_description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("myStore.store"));
    };

  return (
      <AuthenticatedLayout
          // user={auth.user}
          header={
              <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  My stores
              </h2>
          }
      >
          <Head title="Create store" />

          <div className="max-w-7xl mx-auto p-6 lg:p-8">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-9 pt-9">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      <div className="p-6 text-gray-900">My Store's</div>
                  </div>
              </div>
              <div className="max-w-7xl py-5 sm:px-6 lg:px-9">
                  <form
                      onSubmit={submit}
                      className="bg-white flex flex-col gap-5 w-full p-2 md:p-5 sm:rounded-lg"
                  >
                      <div className="grid lg:grid-cols-3 gap-9">
                          <div className="flex flex-col gap-1 w-full">
                              {errors.store_name && (
                                  <p className="text-red-500">
                                      {errors.store_name}
                                  </p>
                              )}
                              <label className="label">
                                  <span className="label-text">
                                      Store name?
                                  </span>
                              </label>
                              <input
                                  value={data.store_name}
                                  onChange={(e) =>
                                      setData("store_name", e.target.value)
                                  }
                                  className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                  placeholder="MimashSignature"
                              />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                              {errors.email && (
                                  <p className="text-red-500">{errors.email}</p>
                              )}
                              <label className="label">
                                  <span className="label-text">
                                      Email address?
                                  </span>
                              </label>
                              <input
                                  value={data.email}
                                  onChange={(e) =>
                                      setData("email", e.target.value)
                                  }
                                  className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                  placeholder="hello@mimashsignature.com"
                              />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                              {errors.tel && (
                                  <p className="text-red-500">{errors.tel}</p>
                              )}
                              <label className="label">
                                  <span className="label-text">
                                      Phone number?
                                  </span>
                              </label>
                              <input
                                  value={data.tel}
                                  onChange={(e) =>
                                      setData("tel", e.target.value)
                                  }
                                  className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                  placeholder="+2348067988642"
                              />
                          </div>
                      </div>
                      <div className="grid lg:grid-cols-3 gap-9">
                          <div className="flex flex-col gap-1 w-full">
                              {errors.country && (
                                  <p className="text-red-500">
                                      {errors.country}
                                  </p>
                              )}
                              <label className="label">
                                  <span className="label-text">Country?</span>
                              </label>
                              <input
                                  value={data.country}
                                  onChange={(e) =>
                                      setData("country", e.target.value)
                                  }
                                  className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                  placeholder="Nigeria"
                              />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                              {errors.state && (
                                  <p className="text-red-500">{errors.state}</p>
                              )}
                              <label className="label">
                                  <span className="label-text">State?</span>
                              </label>
                              <input
                                  value={data.state}
                                  onChange={(e) =>
                                      setData("state", e.target.value)
                                  }
                                  className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                  placeholder="Kaduna"
                              />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                              {errors.zip_code && (
                                  <p className="text-red-500">
                                      {errors.zip_code}
                                  </p>
                              )}
                              <label className="label">
                                  <span className="label-text">ZIP code?</span>
                              </label>
                              <input
                                  value={data.zip_code}
                                  onChange={(e) =>
                                      setData("zip_code", e.target.value)
                                  }
                                  className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                                  placeholder="811104"
                              />
                          </div>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                          {errors.store_address && (
                              <p className="text-red-500">
                                  {errors.store_address}
                              </p>
                          )}
                          <label className="label">
                              <span className="label-text">Store address?</span>
                          </label>
                          <input
                              value={data.store_address}
                              onChange={(e) =>
                                  setData("store_address", e.target.value)
                              }
                              className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                              placeholder="No: 12 Kaduna Road"
                          />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                          {errors.store_type && (
                              <p className="text-red-500">
                                  {errors.store_type}
                              </p>
                          )}
                          <label className="label">
                              <span className="label-text">Category?</span>
                          </label>
                          <input
                              value={data.store_type}
                              onChange={(e) =>
                                  setData("store_type", e.target.value)
                              }
                              className="input bg-slate-200 w-full text-slate-800 border-none outline-none placeholder:text-slate-400"
                              placeholder="Category"
                          />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                          {errors.store_description && (
                              <p className="text-red-500">
                                  {errors.store_description}
                              </p>
                          )}
                          <label className="label">
                              <span className="label-text">Description?</span>
                          </label>
                          <textarea
                              value={data.store_description}
                              onChange={(e) =>
                                  setData("store_description", e.target.value)
                              }
                              className="input bg-slate-200 h-56 w-full text-slate-800 border-none outline-none placeholder:text-s4ate-300"
                              placeholder="General merchandise"
                          />
                      </div>
                      <div className="flex justify-end">
                          <button className="btn bg-gold text-white">
                              submit
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}
