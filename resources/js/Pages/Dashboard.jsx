import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';

export default function Dashboard({ stats, recent }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Object.entries(stats).map(([status, total]) => (
                    <div key={status} className="rounded-lg bg-white p-4 shadow">
                        <p className="text-sm text-gray-500">{status}</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">{total}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-lg bg-white p-4 shadow sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">Recent tickets</h2>
                    <Link href={route('tickets.index')} className="text-sm text-indigo-600 hover:underline">
                        View all
                    </Link>
                </div>

                {recent.length === 0 ? (
                    <p className="text-sm text-gray-500">No tickets yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {recent.map((t) => (
                            <li key={t.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                                <Link href={route('tickets.show', t.id)} className="font-medium text-gray-800 hover:text-indigo-600">
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
