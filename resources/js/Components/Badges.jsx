const PRIORITY = {
    Low: 'bg-gray-100 text-gray-700',
    Medium: 'bg-blue-100 text-blue-700',
    High: 'bg-orange-100 text-orange-700',
    Urgent: 'bg-red-100 text-red-700',
};

const STATUS = {
    Open: 'bg-green-100 text-green-700',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-indigo-100 text-indigo-700',
    Closed: 'bg-gray-200 text-gray-700',
};

const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';

export function PriorityBadge({ value }) {
    return <span className={`${base} ${PRIORITY[value] ?? PRIORITY.Low}`}>{value}</span>;
}

export function StatusBadge({ value }) {
    return <span className={`${base} ${STATUS[value] ?? STATUS.Closed}`}>{value}</span>;
}
