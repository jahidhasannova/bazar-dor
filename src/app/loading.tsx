
export default function Loading() {
    return (
        <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="animate-pulse">
                <div className="h-48 rounded-2xl bg-green-100 dark:bg-gray-800 sm:h-64" />

                <div className="mt-10 flex items-center justify-between">
                    <div className="h-7 w-36 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800"
                        >
                            <div className="h-24 rounded-xl bg-green-50 dark:bg-gray-800 sm:h-32" />
                            <div className="mt-4 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="mt-3 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="mt-5 h-9 rounded-lg bg-green-100 dark:bg-gray-800" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
