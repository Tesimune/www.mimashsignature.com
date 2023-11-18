import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import React from 'react'
import { LuHome, LuLayoutDashboard, LuStore, LuWallet } from "react-icons/lu";


function SideBar() {
  return (
      <div className="z-5">
          <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-side">
                  <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                  ></label>
                  <ul className="menu p-4 w-80 min-h-full bg-white gap-3">
                      {/* <li>
                          <ResponsiveNavLink href='/'>
                              <LuHome />
                              <span>Home</span>
                          </ResponsiveNavLink>
                      </li> */}
                      <li>
                          <ResponsiveNavLink
                              href={route("dashboard")}
                              active={route().current("dashboard")}
                          >
                              <LuLayoutDashboard />
                              <span>Dashboard</span>
                          </ResponsiveNavLink>
                      </li>
                      <li>
                          <ResponsiveNavLink
                              href={route("myStores.index")}
                              active={route().current("myStores.index")}
                          >
                              <LuStore />
                              <span>My Store</span>
                          </ResponsiveNavLink>
                      </li>
                      <li>
                          <ResponsiveNavLink
                            //   href={route("/")}
                            //   active={route().current("/")}
                          >
                              <LuWallet />
                              <span>My Wallet</span>
                          </ResponsiveNavLink>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

export default SideBar