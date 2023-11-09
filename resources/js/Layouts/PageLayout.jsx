import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import {
    HiOutlineMenuAlt2,
    HiOutlineSearch,
    HiOutlineUser,
} from "react-icons/hi";
import SideCart from "./Components/SideCart";


export default function PageLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 fixed w-full z-10 rounded-full mt-2">
                <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <Link
                                href="/"
                                className="btn btn-ghost normal-case bg-slate-100 text-gold rounded-full"
                            >
                                <ApplicationLogo />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle">
                            <HiOutlineSearch className="h-5 w-5" />
                        </button>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="btn btn-ghost btn-circle">
                                    <button type="button">
                                        <HiOutlineUser className="h-5 w-5" />
                                    </button>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
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
                <SideCart />
            </div>

            <div className="pt-16">
                <main>{children}</main>
            </div>
        </div>
    );
}
