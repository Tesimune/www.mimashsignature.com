import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, orders }) {
    
    {/* // 0 Invoice, 1 Paid and pending, 2 Shipped 3 Received */}
    const status = {
        0: 'Invoice',
        1: 'Paid & Pending',
        2: 'Shipped',
        3: 'Received'
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="pt-9">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex flex-col w-full">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 w-full">
                                You're logged in!
                            </div>
                        </div>
                        <div className="flex flex-col gap-9 p-2 md:p-5 xl:p-10 md:mx-9 mb-20">
                            {orders.length ? (
                                <>
                                    {orders.map((order) => (
                                        <Link
                                            href={route(
                                                "order.view",
                                                order.slug
                                            )}
                                            className="card w-full bg-base-100/5 shadow-xl"
                                        >
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Order: {order.reference}
                                                </h2>
                                                {/* // 0 Invoice, 1 Paid and pending, 2 Shipped 3 Received */}
                                                {order.order_status !==
                                                    undefined && (
                                                    <span>
                                                        {
                                                            status[
                                                                order
                                                                    .order_status
                                                            ]
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </>
                            ) : (
                                <Link
                                    href="/"
                                    className="card w-full bg-base-100/5 shadow-xl"
                                >
                                    <div className="card-body">
                                        No orders yet, go to the shop and start
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
