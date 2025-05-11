import React from 'react';

export default function EventStatusBadge({ startDate, endDate }) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let status = 'upcoming';
  if (now >= start && now <= end) {
    status = 'ongoing';
  } else if (now > end) {
    status = 'completed';
  }

  const getColor = () => {
    if (status === 'ongoing') return 'bg-green-600';
    if (status === 'completed') return 'bg-gray-500';
    return 'bg-blue-500';
  };

  return (
    <span className={`${getColor()} text-white text-xs px-2 py-1 rounded w-fit`}>
      {status}
    </span>
  );
}
