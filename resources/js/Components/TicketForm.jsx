import { Link, useForm } from '@inertiajs/react';

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1">{children}</div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

const input = 'block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function TicketForm({ ticket = null, options }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        priority: ticket?.priority ?? 'Medium',
        status: ticket?.status ?? 'Open',
        category: ticket?.category ?? options.categories[0],
    });

    const submit = (e) => {
        e.preventDefault();
        if (ticket) {
            put(route('tickets.update', ticket.id));
        } else {
            post(route('tickets.store'));
        }
    };

    const select = (name, values) => (
        <select
            value={data[name]}
            onChange={(e) => setData(name, e.target.value)}
            className={input}
        >
            {values.map((v) => (
                <option key={v} value={v}>{v}</option>
            ))}
        </select>
    );

    return (
        <form onSubmit={submit} className="space-y-5 rounded-lg bg-white p-4 shadow sm:p-6">
            {Object.keys(errors).length > 0 && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Please fix the errors below and try again.
                </div>
            )}

            <Field label="Title" error={errors.title}>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className={input}
                    maxLength={255}
                />
            </Field>

            <Field label="Description" error={errors.description}>
                <textarea
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={input}
                />
            </Field>

            <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Priority" error={errors.priority}>
                    {select('priority', options.priorities)}
                </Field>
                <Field label="Status" error={errors.status}>
                    {select('status', options.statuses)}
                </Field>
                <Field label="Category" error={errors.category}>
                    {select('category', options.categories)}
                </Field>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                    href={ticket ? route('tickets.show', ticket.id) : route('tickets.index')}
                    className="rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : ticket ? 'Update Ticket' : 'Create Ticket'}
                </button>
            </div>
        </form>
    );
}
