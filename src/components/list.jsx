import Err from "app/not-found";

async function getData() {
    const res = await fetch("https://izirtuland.ir/pages/api/list", { cache: "no-store" });
    if (!res.ok) return <Err />
    return res.json();
}

const ListTitle = async () => {
    const data = await getData();
    return (
        <div dir="rtl">
            {data.map((items) =>
                items.list.map((item) => (

                        <div
                            key={item.id}
                            className="p-6 mb-4"
                        >
                            <h1 className="lg:text-xl text-lg font-bold mb-2 font-primaryDemibold">{item.title}</h1>
                            <p className="mb-4 text-justify	leading-relaxed md:text-lg text-md font-primaryRegular whitespace-pre-line">{item.text}</p>
                            <p className="mb-4 text-justify	leading-relaxed md:text-lg text-md font-primaryMedium">{item.listProduct}</p>
                            <p className="md:text-lg text-md font-primaryMedium text-color2">{item.product}</p>
                            <p className="md:text-lg text-md text-justify leading-relaxed font-primaryDemibold text-red-600 px-2.5 py-0.5">{item.warning}</p>
                        </div>
                ))
            )}
        </div>

    )
}

export default ListTitle;