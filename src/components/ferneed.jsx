'use server'
import Image from "next/image";

const Load = () => {
    return (
        <div className="max-w-screen-xl mx-auto p-2 my-4 h-full" dir="rtl">
            <div className="w-full flex flex-col items-center bg-white md:flex-row md:w-3/4 mx-auto" dir="rtl">
                {[...Array(1)].map((_, index) => (
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
    const res = await fetch("https://izirtuland.liara.run/pages/api/need", { cache: "no-store" });
    if (!res.ok) return <Load />
    return res.json();
}

const FertiNeed = async () => {
    const data = await getdata();

    return (
        <div className="max-w-screen-xl mx-auto p-2 my-4 h-full" dir="rtl">
            <div className="w-full flex flex-col items-center bg-white md:flex-row md:w-3/4 mx-auto" dir="rtl">
                {
                    data.map((items) => (
                        items.need.map((item) => (
                            <div key={item.title} className="flex flex-col justify-between p-4 leading-normal w-full">
                                <h1 className="mb-4 md:text-2xl text-xl font-primaryDemibold tracking-tight text-gray-900">{item.title}</h1>
                                <picture>
                                    <Image
                                        className="object-cover w-full h-96 rounded-lg"
                                        width={700}
                                        height={1000}
                                        src={item.link}
                                        alt="fer need"
                                        priority='low'
                                        layout="responsive"
                                    />
                                </picture>
                                <p className="my-3 font-primaryRegular text-base md:text-lg md:font-primaryMedium text-gray-700">{item.text}</p>
                            </div>
                        ))
                    ))
                }
            </div>
        </div>
    )
}

export default FertiNeed;