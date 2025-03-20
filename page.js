import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Explore The World</h1>
      <p className="text-lg mb-6 text-center max-w-md drop-shadow-md">
        Discover amazing destinations, book exciting tours, and plan your perfect trip with us.
      </p>
      <Link href="/live_travel">
        <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-xl hover:bg-gray-200 transition-transform transform hover:scale-105">
          Start Your Journey
        </button>
      </Link>
    </div>
  );
}