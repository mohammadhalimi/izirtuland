"use client"
import { useEffect, useState } from "react"

const Welcome = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://izirtuland.liara.run/pages/api/welcome')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if(isLoading) return <p></p>;
    if(!data) return <p></p>

    return (
        <>
            {
                data.map((items) => (
                    <h1 key={items.id} className="text-3xl font-primaryDemibold text-center text-green-600">{items.title}</h1>
                ))
            }
        </>
    )
}

export default Welcome;