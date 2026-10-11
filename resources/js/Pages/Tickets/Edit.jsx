import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';

export default function Edit({ ticket, options }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Edit Ticket</h1>}>
            <Head title="Edit Ticket" />
            <div className="mx-auto max-w-2xl">
                <TicketForm ticket={ticket} options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
