import Err from "app/not-found";
import Image from "next/image";

async function getData() {
    const res = await fetch("https://izirtuland.liara.run/pages/api/contact", { cache: "no-store" });
    if (!res.ok) return <Err />
    return res.json();
}

const InfoContact = async () => {
    const data = await getData();
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-y-4 gap-y-2" dir="rtl">
            {
                data.map((items) => (
                    items.head.map((item) => (
                        <div key={item.id} className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white text-center drop-shadow sm:shrink-0 sm:grow sm:basis-0 md:h-full hover:-translate-y-2">
                            <div className="flex justify-center items-center mt-6">
                                <Image src={`${item.link}`} width={70} height={70} alt="logo" />
                            </div>
                            <div className="p-6">
                                <h5 className="mb-2 text-xl font-medium leading-tight font-primaryDemibold">
                                    {item.text}
                                </h5>
                                <p className="mb-4 text-base font-primaryMedium whitespace-pre-line">
                                    {item.contain}
                                </p>
                            </div>
                        </div>
                    ))
                ))
            }
        </div>
    )
}

export default InfoContact;