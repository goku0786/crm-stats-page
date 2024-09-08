export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg text-center">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
}