const Load = () => {
    return (
        <div className="max-w-screen-xl mx-auto p-2 my-4 h-full" dir="rtl">
            <div className="w-full flex flex-col items-center bg-white md:flex-row md:w-3/4 mx-auto" dir="rtl">
                {[...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between p-4 leading-normal w-full animate-pulse"
                    >
                        <div className="mb-4 h-6 md:h-8 bg-gray-300 rounded w-3/4"></div>
                        <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
                        <div className="my-3 h-4 md:h-5 bg-gray-300 rounded w-full"></div>
                        <div className="my-3 h-4 md:h-5 bg-gray-300 rounded w-5/6"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

async function getdata() {
    const res = await fetch("http://localhost:3000/pages/api/license", { cache: "no-store" });
    if (!res.ok) return <Load />
    return res.json();
}
const License = async () => {
    const data = await getdata();
    return (
        <div className="max-w-screen-xl items-center justify-between mx-auto mt-4" dir="rtl">
            <div className="text-center min-h-5">
                {

                    data.map((items) => (
                        items.title.map((item) => (
                            <h1 className="text-xl font-primaryBold text-center" key={item.id}>{item.text}</h1>
                        ))
                    ))
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center mt-8 p-4">
                {

                    data.map((items) => (
                        items.license.map((item) => (
                            <div className="bg-color1 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 w-full text-center" key={item.id}>
                                <p className="text-xl font-primaryDemibold">
                                    {
                                        item.li
                                    }
                                </p>
                            </div>
                        ))
                    ))
                }
            </div>
        </div>

    )
}

export default License;