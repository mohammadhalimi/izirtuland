import Err from "app/not-found";

async function getdata() {
    const res = await fetch("https://izirtuland.ir/pages/api/customer", { cache: "no-store" });
    if (!res.ok) return Err
    return res.json();
}

const Customer = async () => {
    const data = await getdata();
    return (
        <div className="max-w-screen-xl items-center justify-between mx-auto mt-4" dir="rtl">
            <div className="min-h-5">
                {
                    data.map((items) => (
                        items.title.map((item) => (
                            <h1 className="text-xl font-primaryBold text-center" key={item.text}>{item.text}</h1>
                        ))
                    ))
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center mt-8 p-4">
                {
                    data.map((items) => (
                        items.customer.map((item) => (
                            <div key={item.id} className="bg-color2 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 w-full">
                                <h1 className="text-xl font-primaryDemibold mb-2">{item.title}</h1>
                                <p className="font-primaryRegular">{item.message}</p>
                            </div>
                        ))
                    ))
                }
            </div>
        </div>
    )
}

export default Customer;
