import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const item = (active) =>
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
            active ? 'bg-white text-pink-600 shadow-lg' : 'text-pink-50 hover:bg-white/20'
        }`;

    const initial = auth.user.name?.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-rose-50 md:flex">
            {/* Desktop sidebar */}
            <aside className="hidden w-64 shrink-0 flex-col justify-between bg-gradient-to-b from-pink-500 via-pink-500 to-fuchsia-600 p-5 text-white md:sticky md:top-0 md:flex md:h-screen">
                <div className="space-y-8">
                    <Link href={route('dashboard')} className="block px-2">
                        <span className="block text-2xl font-extrabold tracking-tight">HelpDesk</span>
                        <span className="block text-xs font-semibold text-pink-100">Tickets, tidy and pretty</span>
                    </Link>

                    <nav className="space-y-2">
                        <Link href={route('dashboard')} className={item(route().current('dashboard'))}>
                            <span>◆</span> Dashboard
                        </Link>
                        <Link href={route('tickets.index')} className={item(route().current('tickets.index'))}>
                            <span>☰</span> Tickets
                        </Link>
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white/20 px-4 py-3 text-sm font-extrabold ring-2 ring-white/60 transition hover:bg-white hover:text-pink-600"
                        >
                            <span>＋</span> New Ticket
                        </Link>
                    </nav>
                </div>

                <div className="rounded-3xl bg-white/15 p-4">
                    <Link href={route('profile.edit')} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-extrabold text-pink-600">
                            {initial}
                        </span>
                        <span className="min-w-0 truncate text-sm font-bold">{auth.user.name}</span>
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="mt-3 w-full rounded-xl bg-white/20 px-3 py-2 text-sm font-bold transition hover:bg-white hover:text-pink-600"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            <div className="min-w-0 flex-1">
                {/* Mobile top bar */}
                <div className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white md:hidden">
                    <div className="flex h-14 items-center justify-between px-4">
                        <Link href={route('dashboard')} className="text-lg font-extrabold">HelpDesk</Link>
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="rounded-xl bg-white/20 px-3 py-1.5 text-lg font-bold"
                            aria-label="Toggle menu"
                        >
                            {open ? '✕' : '☰'}
                        </button>
                    </div>

                    {open && (
                        <div className="space-y-2 px-4 pb-4">
                            <p className="px-2 text-sm font-extrabold">{auth.user.name}</p>
                            <Link href={route('dashboard')} className={item(route().current('dashboard'))}>Dashboard</Link>
                            <Link href={route('tickets.index')} className={item(route().current('tickets.index'))}>Tickets</Link>
                            <Link
                                href={route('tickets.create')}
                                className="block rounded-2xl bg-white px-4 py-3 text-center text-sm font-extrabold text-pink-600"
                            >
                                ＋ New Ticket
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full rounded-2xl bg-white/20 px-4 py-3 text-sm font-bold"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>

                <FlashMessage />

                <main className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
                    {header && <div className="mb-6">{header}</div>}
                    {children}
                </main>
            </div>
        </div>
    );
}
