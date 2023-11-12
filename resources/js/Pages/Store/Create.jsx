import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';

export default function Create() {
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
              <div className="w-full py-5 sm:px-6 lg:px-9">
                  <form className="flex flex-col gap-5 w-full p-2 md:p-5">
                      <div className="grid lg:grid-cols-3 gap-9">
                          <div className="flex flex-col gap-1 w-full">
                              <label className="label">
                                  <span className="label-text">
                                      Store name?
                                  </span>
                              </label>
                              <input
                                  className="input bg-white w-full outline-none placeholder:text-slate-300"
                                  placeholder="MimashSignature"
                              />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                              <label className="label">
                                  <span className="label-text">
                                      Email address?
                                  </span>
                              </label>
                              <input
                                  className="input bg-white w-full outline-none placeholder:text-slate-300"
                                  placeholder="hello@mimashsignature.com"
                              />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                              <label className="label">
                                  <span className="label-text">
                                      Phone number?
                                  </span>
                              </label>
                              <input
                                  className="input bg-white w-full outline-none placeholder:text-slate-300"
                                  placeholder="+2348067988642"
                              />
                          </div>
                      </div>
                      <div className="grid lg:grid-cols-2 gap-9">
                          <div className="flex flex-col gap-1 w-full">
                              <label className="label">
                                  <span className="label-text">
                                      Store address?
                                  </span>
                              </label>
                              <input
                                  className="input bg-white w-full outline-none placeholder:text-slate-300"
                                  placeholder="No: 12 Kaduna Road"
                              />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                              <label className="label">
                                  <span className="label-text">Category?</span>
                              </label>
                              <input
                                  className="input bg-white w-full outline-none placeholder:text-slate-300"
                                  placeholder="Category"
                              />
                          </div>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                          <label className="label">
                              <span className="label-text">Description?</span>
                          </label>
                          <textarea
                              className="input bg-white h-56 w-full outline-none placeholder:text-slate-300"
                              placeholder="General merchandise"
                          />
                      </div>
                      <div className='flex justify-end'>
                        <button className='btn bg-gold text-white'>submit</button>
                      </div>
                  </form>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}
