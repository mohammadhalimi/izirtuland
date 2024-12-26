const LoadContact = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-16 border rounded p-4 gap-4 animate-pulse">
        <div className="min-h-64 bg-gray-300 md:h-full rounded"></div>
        <div dir="rtl" className="order-first md:order-last">
          <form>
            <div className="mb-6 gap-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
              ))}
            </div>
            {[1, 2].map((item) => (
              <div className="mb-6" key={item}>
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
            <div className="mt-4">
              <div className="h-10 bg-blue-300 rounded w-full sm:w-1/2"></div>
            </div>
          </form>
        </div>
      </div>
      

    )
}

export default LoadContact;