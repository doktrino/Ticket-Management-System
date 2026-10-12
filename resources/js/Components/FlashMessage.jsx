import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    // Show again on every new response, auto-dismiss after 4 seconds.
    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash]);

    const message = flash?.success || flash?.error;
    if (!message || !visible) return null;

    const isError = Boolean(flash?.error);

    return (
        <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm" role="status">
            <div
                className={`flex items-start justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-xl ${
                    isError
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 shadow-red-200'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200'
                }`}
            >
                <span>{isError ? '✕ ' : '✓ '}{message}</span>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="text-lg font-bold leading-none opacity-80 hover:opacity-100"
                    aria-label="Dismiss"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
