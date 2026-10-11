import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const navLink = (active) =>
        `rounded-md px-3 py-2 text-sm font-medium ${
            active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
        }`;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard')} className="mr-4 text-lg font-bold text-indigo-600">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-1 md:flex">
                            <Link href={route('dashboard')} className={navLink(route().current('dashboard'))}>
                                Dashboard
                            </Link>
                            <Link href={route('tickets.index')} className={navLink(route().current('tickets.index'))}>
                                Tickets
                            </Link>
                        </div>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href={route('tickets.create')}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            New Ticket
                        </Link>
                        <Link href={route('profile.edit')} className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                            {auth.user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                    >
                        {open ? '✕' : '☰'}
                    </button>
                </div>

                {open && (
                    <div className="space-y-1 border-t border-gray-200 px-4 py-3 md:hidden">
                        <p className="px-3 pb-2 text-sm font-semibold text-gray-800">{auth.user.name}</p>
                        <Link href={route('dashboard')} className={`block ${navLink(route().current('dashboard'))}`}>
                            Dashboard
                        </Link>
                        <Link href={route('tickets.index')} className={`block ${navLink(route().current('tickets.index'))}`}>
                            Tickets
                        </Link>
                        <Link
                            href={route('tickets.create')}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                        >
                            New Ticket
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">{header}</div>
                </header>
            )}

            <FlashMessage />

            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
        </div>
    );
}
