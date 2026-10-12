import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-rose-50 to-fuchsia-200 px-4 py-8">
            <Link href="/" className="mb-6 text-center">
                <span className="block text-4xl font-extrabold tracking-tight text-pink-600">HelpDesk</span>
                <span className="block text-sm font-semibold text-pink-400">Tickets, tidy and pretty</span>
            </Link>

            <div className="w-full max-w-md rounded-3xl bg-white px-6 py-8 shadow-2xl shadow-pink-300/40 ring-1 ring-pink-100 sm:px-8">
                {children}
            </div>
        </div>
    );
}
