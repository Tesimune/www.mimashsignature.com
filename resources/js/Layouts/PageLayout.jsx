import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import {
    HiOutlineMenuAlt2,
    HiOutlineSearch,
    HiOutlineUser,
} from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import SideCart from "./Components/SideCart";
import { GiShoppingBag } from "react-icons/gi";


export default function PageLayout({ user, header, children, existingCartItems }) {
    
    const cartTotal = existingCartItems?.length

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 fixed w-full z-10 rounded-full mt-2">
                <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <Link
                                href={route("home")}
                                className="btn btn-ghost normal-case bg-slate-100 text-gold rounded-full"
                            >
                                <ApplicationLogo />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-end flex items-center">
                        <button className="btn btn-ghost btn-circle">
                            <HiOutlineSearch className="h-5 w-5" />
                        </button>
                        <Link
                            href={route("stores.stores")}
                            className="btn btn-ghost btn-circle"
                        >
                            <BsShop className="h-5 w-5" />
                        </Link>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="btn btn-ghost btn-circle">
                                    <button type="button">
                                        <HiOutlineUser className="h-5 w-5" />
                                    </button>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("home")}>
                                    Home
                                </Dropdown.Link>
                                <Dropdown.Link href={route("dashboard")}>
                                    Dashboard
                                </Dropdown.Link>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </nav>

            <div className="fixed right-5 bottom-5 z-10">
                {/* <SideCart /> */}
                <Link
                    href={route("cart")}
                    className="btn btn-primary bg-gold hover:bg-gold/90 rounded-full"
                >
                    <GiShoppingBag className="h-5 w-4" />
                    {cartTotal}
                </Link>
            </div>

            <div className="pt-16">
                <main>{children}</main>
            </div>
        </div>
    );
}
