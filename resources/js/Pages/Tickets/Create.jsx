import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';

export default function Create({ options }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-extrabold text-pink-700">New Ticket</h1>}>
            <Head title="New Ticket" />
            <div className="mx-auto max-w-2xl">
                <TicketForm options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
