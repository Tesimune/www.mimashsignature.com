import PageLayout from '@/Layouts/PageLayout';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <PageLayout>
            <Head title="Welcome" />
            <div className="sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 selection:bg-gold selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 p-2 md:p-5 xl:p-10 md:mx-9 mb-20">
                            <div className="card card-compact w-full bg-base-100 shadow-xl z-0">
                                <figure>
                                    <img
                                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                        alt="Shoes"
                                    />
                                </figure>
                                <div className="card-body bg-white text-slate-900">
                                    <h2 className="card-title">
                                        Shoes!
                                        <div className="badge badge-secondary bg-gold">
                                            NEW
                                        </div>
                                    </h2>
                                    <p>
                                        If a dog chews shoes whose shoes does he
                                        choose?
                                    </p>
                                    <div className="card-actions justify-start">
                                        <div className="badge badge-outline">
                                            Fashion
                                        </div>
                                        <div className="badge badge-outline">
                                            Products
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary bg-gold hover:bg-gold/90">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-compact w-full bg-base-100 shadow-xl z-0">
                                <figure>
                                    <img
                                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                        alt="Shoes"
                                    />
                                </figure>
                                <div className="card-body bg-white text-slate-900">
                                    <h2 className="card-title">
                                        Shoes!
                                        <div className="badge badge-secondary bg-gold">
                                            NEW
                                        </div>
                                    </h2>
                                    <p>
                                        If a dog chews shoes whose shoes does he
                                        choose?
                                    </p>
                                    <div className="card-actions justify-start">
                                        <div className="badge badge-outline">
                                            Fashion
                                        </div>
                                        <div className="badge badge-outline">
                                            Products
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary bg-gold hover:bg-gold/90">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-compact w-full bg-base-100 shadow-xl z-0">
                                <figure>
                                    <img
                                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                        alt="Shoes"
                                    />
                                </figure>
                                <div className="card-body bg-white text-slate-900">
                                    <h2 className="card-title">
                                        Shoes!
                                        <div className="badge badge-secondary bg-gold">
                                            NEW
                                        </div>
                                    </h2>
                                    <p>
                                        If a dog chews shoes whose shoes does he
                                        choose?
                                    </p>
                                    <div className="card-actions justify-start">
                                        <div className="badge badge-outline">
                                            Fashion
                                        </div>
                                        <div className="badge badge-outline">
                                            Products
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary bg-gold hover:bg-gold/90">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
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
        </PageLayout>
    );
}
