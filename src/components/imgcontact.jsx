import Err from "app/not-found";
import Image from "next/image";

async function getData() {
    const res = await fetch("https://izirtuland.ir/pages/api/contact", { cache: "no-store" });
    if (!res.ok) return <Err />
    return res.json();
}

const ImgContact = async () => {
    const data = await getData();
    return (
        <div className="mb-8">
            {
                data.map((items) => (
                    items.logo.map((item) => (
                        <Image src={`${item.link}`}
                        key={item.id}
                        className="object-cover"
                            width={500}
                            height={500}
                            alt="logo"
                            priority="law"
                        />
                    ))
                ))
            }
        </div>
    )
}

export default ImgContact;