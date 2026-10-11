import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import Pagination from '@/Components/Pagination';

export default function Index({ tickets, filters, options }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [priority, setPriority] = useState(filters.priority ?? '');

    const apply = (next) => {
        const params = { search, status, priority, ...next };
        Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);
        router.get(route('tickets.index'), params, { preserveState: true, replace: true });
    };

    const reset = () => {
        setSearch('');
        setStatus('');
        setPriority('');
        router.get(route('tickets.index'));
    };

    const destroy = (ticket) => {
        if (confirm(`Delete "${ticket.title}"? This cannot be undone.`)) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    const hasFilters = Boolean(filters.search || filters.status || filters.priority);
    const sel = 'rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">My Tickets</h1>
                    <Link href={route('tickets.create')} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                        New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => { e.preventDefault(); apply({}); }}
                className="mb-4 flex flex-col gap-3 sm:flex-row"
            >
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title..."
                    className={`${sel} sm:flex-1`}
                />
                <select value={status} onChange={(e) => { setStatus(e.target.value); apply({ status: e.target.value }); }} className={sel}>
                    <option value="">All statuses</option>
                    {options.statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={priority} onChange={(e) => { setPriority(e.target.value); apply({ priority: e.target.value }); }} className={sel}>
                    <option value="">All priorities</option>
                    {options.priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <button type="submit" className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                    Search
                </button>
                {hasFilters && (
                    <button type="button" onClick={reset} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Reset
                    </button>
                )}
            </form>

            {tickets.data.length === 0 ? (
                <div className="rounded-lg bg-white p-10 text-center shadow">
                    <p className="text-lg font-medium text-gray-800">
                        {hasFilters ? 'No tickets match your filters.' : 'No tickets yet.'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {hasFilters ? 'Try changing or resetting the filters.' : 'Create your first ticket to get started.'}
                    </p>
                    {!hasFilters && (
                        <Link href={route('tickets.create')} className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                            Create a ticket
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Created</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">
                                            <Link href={route('tickets.show', t.id)} className="hover:text-indigo-600">{t.title}</Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><PriorityBadge value={t.priority} /></td>
                                        <td className="px-4 py-3"><StatusBadge value={t.status} /></td>
                                        <td className="px-4 py-3 text-gray-600">{new Date(t.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Link href={route('tickets.edit', t.id)} className="mr-3 text-indigo-600 hover:underline">Edit</Link>
                                            <button type="button" onClick={() => destroy(t)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <div key={t.id} className="rounded-lg bg-white p-4 shadow">
                                <Link href={route('tickets.show', t.id)} className="font-semibold text-gray-900">{t.title}</Link>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                    <span className="text-xs text-gray-500">{t.category}</span>
                                </div>
                                <div className="mt-3 flex gap-4 text-sm">
                                    <Link href={route('tickets.edit', t.id)} className="text-indigo-600">Edit</Link>
                                    <button type="button" onClick={() => destroy(t)} className="text-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination links={tickets.links} />
                </>
            )}
        </AuthenticatedLayout>
    );
}
