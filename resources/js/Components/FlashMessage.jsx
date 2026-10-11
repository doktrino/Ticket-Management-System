import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    // Re-show on every new response, auto-dismiss after 4 seconds.
    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash]);

    const message = flash?.success || flash?.error;
    if (!message || !visible) return null;

    const isError = Boolean(flash?.error);

    return (
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6" role="status">
            <div
                className={`flex items-start justify-between rounded-md border px-4 py-3 text-sm ${
                    isError
                        ? 'border-red-200 bg-red-50 text-red-800'
                        : 'border-green-200 bg-green-50 text-green-800'
                }`}
            >
                <span>{message}</span>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="ml-4 font-bold leading-none"
                    aria-label="Dismiss"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
