import Image from "next/image";
import Link from "next/link";

const Load = () => {
    return (
        <div className="max-w-screen-xl items-center justify-between mx-auto my-4">
            <div dir="rtl">
                {[...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className="h-6 bg-gray-300 rounded-full w-3/4 mx-auto my-2 animate-pulse"
                    ></div>
                ))}
            </div>
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center gap-y-4 mt-8"
                dir="rtl"
            >
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center bg-gray-200 rounded shadow-md p-4 w-full animate-pulse"
                    >
                        <div className="h-5 bg-gray-400 rounded w-3/4 mb-4"></div>
                        <div className="bg-gray-300 rounded-md w-[400px] h-[200px] md:h-[300px]"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

async function getdata() {
    const res = await fetch("https://izirtuland.liara.run/pages/api/blog", { cache: "no-store" });
    if (!res.ok) return <Load />;
    return res.json();
}

const Blog = async () => {
    const data = await getdata();
    return (
        <div className="max-w-screen-xl items-center justify-between mx-auto my-4">
            <div dir="rtl">
                {data.map((items) =>
                    items.title.map((item, idx) => (
                        <h1 key={idx} className="text-xl font-primaryBold text-center">
                            {item.text}
                        </h1>
                    ))
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center gap-y-4 mt-8" dir="rtl">
                {data.map((items) =>
                    items.post.map((item) => (
                        <div className="flex flex-col items-center" key={item.id}>
                            <h1 className="text-center md:text-md text-lg md:font-primaryMedium font-primaryDemibold mb-6">
                                {item.title}
                            </h1>
                            <Link href={`${item.posts}`} key={item.id}>
                                <Image
                                    src={`${item.link}`}
                                    width={400}
                                    height={400}
                                    alt="logo"
                                    className="object-cover md:w-[400px] md:h-[300px] w-[400px] h-[200px] rounded drop-shadow mx-auto duration-300 hover:scale-105"
                                />
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Blog;
