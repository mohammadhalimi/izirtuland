const LoadingHeader = () => {
    return (
        <nav className="bg-white relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center rtl:space-x-reverse animate-pulse">
                        <div className="h-12 w-16 bg-gray-200 rounded-md"></div>
                        <div className="h-8 w-32 bg-gray-200 rounded-md ml-2"></div>
                    </div>
                    <div className="h-10 w-32 bg-gray-200 rounded-md hidden lg:block"></div>
                    <div className='border px-2 ms-2 rounded lg:block hidden'>
                        <div className='flex flex-wrap items-center'>
                            <div className="h-8 w-20 bg-gray-200 rounded-md m-2"></div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 animate-pulse"
                >
                    <span className="sr-only">Open main menu</span>
                    <div className="h-1 w-8 bg-gray-200 rounded"></div>
                    <div className="h-1 w-8 bg-gray-200 rounded mt-1"></div>
                    <div className="h-1 w-8 bg-gray-200 rounded mt-1"></div>
                </button>
                <div className="hidden w-full md:block md:w-auto" dir="rtl">
                    <ul className="font-primaryDemibold text-lg flex flex-col mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-white">
                        {[...Array(4)].map((_, index) => (
                            <li key={index} className="animate-pulse">
                                <div className="h-8 w-32 bg-gray-200 rounded-md py-2 px-3"></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default LoadingHeader;