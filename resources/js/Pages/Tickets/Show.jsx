import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';

export default function Show({ ticket }) {
    const destroy = () => {
        if (confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Ticket #${ticket.id}`} />

            <div className="mx-auto max-w-2xl space-y-4">
                <Link href={route('tickets.index')} className="text-sm font-bold text-pink-500 hover:underline">
                    ← Back to tickets
                </Link>

                <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-pink-100 ring-1 ring-pink-100">
                    <div className="bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-5 text-white">
                        <p className="text-xs font-bold uppercase tracking-widest text-pink-100">Ticket #{ticket.id}</p>
                        <h1 className="mt-1 break-words text-2xl font-extrabold">{ticket.title}</h1>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <PriorityBadge value={ticket.priority} />
                            <StatusBadge value={ticket.status} />
                            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-500">{ticket.category}</span>
                        </div>

                        {/* Plain text only (React escapes it) - no dangerouslySetInnerHTML */}
                        <p className="mt-5 whitespace-pre-wrap break-words rounded-2xl bg-pink-50/60 p-4 text-gray-700">
                            {ticket.description}
                        </p>

                        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                            <div className="rounded-2xl bg-pink-50/60 p-3">
                                <dt className="text-xs font-bold uppercase text-pink-400">Created</dt>
                                <dd className="font-semibold text-gray-800">{new Date(ticket.created_at).toLocaleString()}</dd>
                            </div>
                            <div className="rounded-2xl bg-pink-50/60 p-3">
                                <dt className="text-xs font-bold uppercase text-pink-400">Last updated</dt>
                                <dd className="font-semibold text-gray-800">{new Date(ticket.updated_at).toLocaleString()}</dd>
                            </div>
                        </dl>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={route('tickets.edit', ticket.id)}
                                className="rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-pink-200"
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                onClick={destroy}
                                className="rounded-full px-6 py-2.5 text-sm font-bold text-red-500 ring-1 ring-red-200 hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
