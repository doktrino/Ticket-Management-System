import { Link, useForm } from '@inertiajs/react';

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-bold text-pink-700">{label}</label>
            <div className="mt-1.5">{children}</div>
            {error && <p className="mt-1.5 text-sm font-semibold text-red-600">{error}</p>}
        </div>
    );
}

const input =
    'block w-full rounded-2xl border-pink-200 bg-pink-50/50 text-sm shadow-sm placeholder:text-pink-300 focus:border-pink-500 focus:ring-pink-300';

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
        <select value={data[name]} onChange={(e) => setData(name, e.target.value)} className={input}>
            {values.map((v) => (
                <option key={v} value={v}>{v}</option>
            ))}
        </select>
    );

    return (
        <form onSubmit={submit} className="space-y-6 overflow-hidden rounded-3xl bg-white p-5 shadow-xl shadow-pink-100 ring-1 ring-pink-100 sm:p-8">
            {Object.keys(errors).length > 0 && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
                    Oops! Please fix the highlighted fields and try again.
                </div>
            )}

            <Field label="Title" error={errors.title}>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className={input}
                    placeholder="What's the problem?"
                    maxLength={255}
                />
            </Field>

            <Field label="Description" error={errors.description}>
                <textarea
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={input}
                    placeholder="Tell us the details..."
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
                    className="rounded-full px-6 py-2.5 text-center text-sm font-bold text-pink-600 ring-1 ring-pink-200 hover:bg-pink-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:from-pink-600 hover:to-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving...' : ticket ? 'Update Ticket' : 'Create Ticket'}
                </button>
            </div>
        </form>
    );
}
