import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';

const TINTS = {
    Open: 'from-pink-400 to-pink-500',
    'In Progress': 'from-fuchsia-400 to-fuchsia-500',
    Resolved: 'from-emerald-400 to-teal-500',
    Closed: 'from-gray-300 to-gray-400',
};

export default function Dashboard({ stats, recent }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="rounded-3xl bg-gradient-to-r from-pink-500 via-pink-400 to-fuchsia-500 p-6 text-white shadow-xl shadow-pink-200 sm:p-8">
                <p className="text-sm font-semibold text-pink-100">Welcome back,</p>
                <h1 className="text-3xl font-extrabold">{auth.user.name}</h1>
                <p className="mt-1 text-sm text-pink-50">Here's what's happening with your tickets.</p>
                <Link
                    href={route('tickets.create')}
                    className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-extrabold text-pink-600 shadow-md hover:bg-pink-50"
                >
                    ＋ New Ticket
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Object.entries(stats).map(([status, total]) => (
                    <div key={status} className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-pink-100 ring-1 ring-pink-100">
                        <div className={`h-2 bg-gradient-to-r ${TINTS[status] ?? TINTS.Closed}`} />
                        <div className="p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-pink-400">{status}</p>
                            <p className="mt-1 text-4xl font-extrabold text-pink-600">{total}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-3xl bg-white p-5 shadow-lg shadow-pink-100 ring-1 ring-pink-100 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-extrabold text-pink-700">Recent tickets</h2>
                    <Link href={route('tickets.index')} className="text-sm font-bold text-pink-500 hover:underline">
                        View all →
                    </Link>
                </div>

                {recent.length === 0 ? (
                    <p className="rounded-2xl bg-pink-50 p-6 text-center text-sm font-semibold text-pink-400">
                        No tickets yet. Create your first one!
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {recent.map((t) => (
                            <li
                                key={t.id}
                                className="flex flex-col gap-2 rounded-2xl bg-pink-50/60 p-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <Link href={route('tickets.show', t.id)} className="font-bold text-gray-800 hover:text-pink-600">
                                    {t.title}
                                </Link>
                                <div className="flex gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
