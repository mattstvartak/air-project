'use client';

import { useRouter } from 'next/navigation';

const ROOT_BOARD_ID = 'c74bbbc8-602b-4c88-be71-9e21b36b0514';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <button
        onClick={() => router.push(`/b/${ROOT_BOARD_ID}`)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-sm"
      >
        View Root Board
      </button>
    </div>
  );
}
