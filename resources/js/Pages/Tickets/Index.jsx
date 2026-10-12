import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge, priorityBorder } from '@/Components/Badges';
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
    const sel =
        'rounded-2xl border-pink-200 bg-pink-50/50 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-300';

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-3xl font-extrabold text-pink-700">My Tickets</h1>
                    <p className="text-sm font-semibold text-pink-400">{tickets.total} total</p>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => { e.preventDefault(); apply({}); }}
                className="mb-6 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-lg shadow-pink-100 ring-1 ring-pink-100 sm:flex-row"
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
                <button type="submit" className="rounded-full bg-pink-500 px-5 py-2 text-sm font-bold text-white hover:bg-pink-600">
                    Search
                </button>
                {hasFilters && (
                    <button type="button" onClick={reset} className="rounded-full px-5 py-2 text-sm font-bold text-pink-600 ring-1 ring-pink-200 hover:bg-pink-50">
                        Reset
                    </button>
                )}
            </form>

            {tickets.data.length === 0 ? (
                <div className="rounded-3xl bg-white p-10 text-center shadow-lg shadow-pink-100 ring-1 ring-pink-100">
                    <p className="text-5xl">🎀</p>
                    <p className="mt-3 text-xl font-extrabold text-pink-700">
                        {hasFilters ? 'No tickets match your filters.' : 'No tickets yet.'}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-pink-400">
                        {hasFilters ? 'Try changing or resetting the filters.' : 'Create your first ticket to get started.'}
                    </p>
                    {!hasFilters && (
                        <Link
                            href={route('tickets.create')}
                            className="mt-5 inline-block rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-200"
                        >
                            ＋ Create a ticket
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-3xl bg-white shadow-lg shadow-pink-100 ring-1 ring-pink-100 md:block">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-left text-xs font-bold uppercase tracking-wide text-white">
                                <tr>
                                    <th className="px-5 py-4">Title</th>
                                    <th className="px-4 py-4">Category</th>
                                    <th className="px-4 py-4">Priority</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Created</th>
                                    <th className="px-5 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-50">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-pink-50/60">
                                        <td className="px-5 py-4 font-bold text-gray-800">
                                            <Link href={route('tickets.show', t.id)} className="hover:text-pink-600">{t.title}</Link>
                                        </td>
                                        <td className="px-4 py-4 text-gray-500">{t.category}</td>
                                        <td className="px-4 py-4"><PriorityBadge value={t.priority} /></td>
                                        <td className="px-4 py-4"><StatusBadge value={t.status} /></td>
                                        <td className="px-4 py-4 text-gray-500">{new Date(t.created_at).toLocaleDateString()}</td>
                                        <td className="px-5 py-4 text-right">
                                            <Link href={route('tickets.edit', t.id)} className="mr-4 font-bold text-pink-500 hover:underline">Edit</Link>
                                            <button type="button" onClick={() => destroy(t)} className="font-bold text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-4 md:hidden">
                        {tickets.data.map((t) => (
                            <div
                                key={t.id}
                                className={`rounded-3xl border-l-8 bg-white p-4 shadow-lg shadow-pink-100 ring-1 ring-pink-100 ${priorityBorder(t.priority)}`}
                            >
                                <Link href={route('tickets.show', t.id)} className="break-words text-base font-extrabold text-gray-800">
                                    {t.title}
                                </Link>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                    <span className="text-xs font-semibold text-pink-400">{t.category}</span>
                                </div>
                                <div className="mt-4 flex gap-3 text-sm font-bold">
                                    <Link href={route('tickets.edit', t.id)} className="flex-1 rounded-full bg-pink-50 py-2 text-center text-pink-600">Edit</Link>
                                    <button type="button" onClick={() => destroy(t)} className="flex-1 rounded-full bg-red-50 py-2 text-red-500">Delete</button>
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
