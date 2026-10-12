const PRIORITY = {
    Low: 'bg-slate-100 text-slate-600 ring-slate-200',
    Medium: 'bg-sky-100 text-sky-700 ring-sky-200',
    High: 'bg-amber-100 text-amber-700 ring-amber-200',
    Urgent: 'bg-red-500 text-white ring-red-600',
};

const STATUS = {
    Open: 'bg-pink-100 text-pink-700 ring-pink-200',
    'In Progress': 'bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200',
    Resolved: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    Closed: 'bg-gray-200 text-gray-600 ring-gray-300',
};

const BORDER = {
    Low: 'border-l-slate-300',
    Medium: 'border-l-sky-400',
    High: 'border-l-amber-400',
    Urgent: 'border-l-red-500',
};

const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset';

export const priorityBorder = (value) => BORDER[value] ?? BORDER.Low;

export function PriorityBadge({ value }) {
    return <span className={`${base} ${PRIORITY[value] ?? PRIORITY.Low}`}>{value}</span>;
}

export function StatusBadge({ value }) {
    return <span className={`${base} ${STATUS[value] ?? STATUS.Closed}`}>{value}</span>;
}
