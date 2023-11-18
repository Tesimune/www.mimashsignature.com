import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import {
    HiOutlineMenuAlt2,
    HiOutlineSearch,
    HiOutlineUser,
} from "react-icons/hi";
import SideBar from "./Components/SideBar";



export default function Authenticated({ user, header, store, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 fixed w-full z-10 rounded-full mt-2">
                <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                                htmlFor="my-drawer"
                            >
                                <HiOutlineMenuAlt2 className="h-5 w-5" />
                            </label>
                            <SideBar />
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link
                            href="/"
                            className="btn btn-ghost normal-case text-xs"
                        >
                            {store?.store_name.slice(0, 19)}
                        </Link>
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

            <div className="pt-9">
                <main>{children}</main>
            </div>
        </div>
    );
}
