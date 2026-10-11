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
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h1>}>
            <Head title={`Ticket #${ticket.id}`} />

            <div className="mx-auto max-w-2xl space-y-4">
                <Link href={route('tickets.index')} className="text-sm text-indigo-600 hover:underline">
                    &larr; Back to tickets
                </Link>

                <div className="rounded-lg bg-white p-4 shadow sm:p-6">
                    <h2 className="break-words text-xl font-semibold text-gray-900">{ticket.title}</h2>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <PriorityBadge value={ticket.priority} />
                        <StatusBadge value={ticket.status} />
                        <span className="text-sm text-gray-500">{ticket.category}</span>
                    </div>

                    {/* Rendered as plain text (React escapes it) - no dangerouslySetInnerHTML */}
                    <p className="mt-5 whitespace-pre-wrap break-words text-gray-700">{ticket.description}</p>

                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm">
                        <div>
                            <dt className="text-gray-500">Created</dt>
                            <dd className="text-gray-800">{new Date(ticket.created_at).toLocaleString()}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Last updated</dt>
                            <dd className="text-gray-800">{new Date(ticket.updated_at).toLocaleString()}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link href={route('tickets.edit', ticket.id)} className="rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500">
                            Edit
                        </Link>
                        <button type="button" onClick={destroy} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
