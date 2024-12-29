import TempContact from "@/components/contact";
import Image from "next/image";

export const metadata = {
    title: 'درباره ما'
}

async function getData() {
    const res = await fetch("https://izirtuland.ir/pages/api/aboutUs", { cache: "no-store" });
    if (!res.ok) return Err
    return res.json();
}

const AboutUs = async () => {
    const data = await getData();
    return (
        <TempContact>
            {
                data.map((items) => (
                    items.about.map((item) => (
                        <>
                            <Image src={`${item.link}`}
                            className="object-cover"
                            width={500}
                            height={500}
                            alt="logo" />
                            <h1 className="font-primaryMedium  md:text-lg text-md p-2 text-justify	leading-relaxed" dir="rtl">
                                {item.text}
                            </h1>
                        </>
                    ))
                ))
            }

        </TempContact>
    )
}

export default AboutUs;