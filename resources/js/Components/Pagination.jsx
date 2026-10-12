import { Link } from '@inertiajs/react';

// Laravel sends labels like "&laquo; Previous". Convert entities in JS
// instead of using dangerouslySetInnerHTML.
const clean = (label) => label.replace('&laquo;', '«').replace('&raquo;', '»');

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Pagination">
            {links.map((link, i) => {
                const classes = `rounded-full px-4 py-2 text-sm font-bold transition ${
                    link.active
                        ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-md shadow-pink-200'
                        : 'bg-white text-pink-600 ring-1 ring-pink-200 hover:bg-pink-50'
                }`;

                return link.url ? (
                    <Link key={i} href={link.url} className={classes} preserveScroll>
                        {clean(link.label)}
                    </Link>
                ) : (
                    <span key={i} className={`${classes} cursor-not-allowed opacity-40`}>
                        {clean(link.label)}
                    </span>
                );
            })}
        </nav>
    );
}
