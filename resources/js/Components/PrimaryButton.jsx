export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:from-pink-600 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 ${
                    disabled && 'opacity-25'
                } ` + className
            }
        >
            {children}
        </button>
    );
}
