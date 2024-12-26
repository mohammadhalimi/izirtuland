'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import BuyEmpty from "./buyEmpty";
import { useRouter } from "next/navigation";

const Buy = () => {
    const [da, setDa] = useState(null);
    const [cart, setCart] = useState([]); 
    const [purchaseCart, setPurchaseCart] = useState([]);
    const route = useRouter();

    useEffect(() => {
        const savedData = localStorage.getItem('cart');
        if (savedData) {
            setDa(JSON.parse(savedData));
        }
    }, []);
   
    const handleAddToCart = (item) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            const itemExists = prevCart.some(cartItem => cartItem.id === item.id);
            if (!itemExists) {
                return [...prevCart, { ...item, quantity: 1 }];
            }
            return updatedCart;
        });

        setPurchaseCart((prevCart) => {
            const updatedCart = prevCart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            const itemExists = prevCart.some(cartItem => cartItem.id === item.id);
            if (!itemExists) {
                return [...prevCart, { ...item, quantity: 1 }];
            }
            return updatedCart;
        });
    };

    const handleRemoveFromLocalStorage = (itemId) => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const updatedCart = JSON.parse(savedCart).filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event("storageUpdate"));
            setDa(updatedCart); 
            setCart(updatedCart);
        }
    };


    const handleRemoveFromCart = (itemId) => {
        setPurchaseCart((prevCart) => prevCart.filter(item => item.id !== itemId));
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    const handleDecreaseQuantity = (itemId) => {
        setPurchaseCart((prevCart) => {
            const updatedCart = prevCart.map(item => {
                if (item.id === itemId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            return updatedCart;
        });
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            const priceWithoutComma = item.price ? item.price.replace(/,/g, '') : '0';
            const itemPrice = parseFloat(priceWithoutComma);
            const validPrice = isNaN(itemPrice) ? 0 : itemPrice;
            return total + validPrice * item.quantity;
        }, 0);
    };

    const formatPrice = (price) => {
        const validPrice = isNaN(price) ? 0 : price;
        return validPrice.toLocaleString();
    };

    const handleFinalPurchase = () => {
        const finalData = {
            items: purchaseCart.map(item => ({
                id: item.id,
                brand: item.brand,
                package:item.package,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                totalPrice: parseFloat(item.price.replace(/,/g, '')) * item.quantity
            })),
            totalAmount: calculateTotalPrice()
        };

        finalData.items.forEach(item => {
            item.totalPrice = item.totalPrice.toLocaleString();
        });

        finalData.totalAmount = finalData.totalAmount.toLocaleString();

        localStorage.setItem('final', JSON.stringify(finalData));

        localStorage.setItem('cart', JSON.stringify([]));

        setDa([]);
        setCart([]);
        setPurchaseCart([]);

        window.dispatchEvent(new Event("storageUpdate"));
        route.push('/userpanel');
    };



    return (
        <>
            {Array.isArray(da) && da.length === 0 ? (
                <BuyEmpty />
            ) : (
                <div className="max-w-screen-xl flex flex-wrap justify-center mx-auto p-2 my-4" dir="rtl">
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                        {Array.isArray(da) && da.map((item, index) => (
                            <div className="relative flex flex-col my-6 bg-white shadow-lg border border-gray-300 rounded-lg w-full" key={index}>
                                <Image
                                    src={item.pic}
                                    layout="responsive"
                                    height={200}
                                    width={150}
                                    alt="product"
                                    className="relative w-full h-1/4 object-cover rounded-md p-4"
                                />
                                <div className="p-3">
                                    <h1 className="mb-1 text-md text-gray-900 md:font-primaryDemibold font-primaryRegular truncate text-right" dir="ltr">
                                        {item.title}
                                    </h1>
                                    <p className="mb-2 text-left font-primaryLight md:font-primaryRegular text-gray-700">{item.price} تومان</p>
                                    {(item.title.includes("مایع") ?
                                        <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">بسته {item.package} لیتری</p>
                                        :
                                        <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">بسته {item.package} کیلویی</p>
                                    )}
                                    <span className={`text-xs font-medium md:font-bold me-2 px-2.5 py-0.5 rounded border ${item.brand.includes('KHAK SHIMI') ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 'bg-green-100 text-green-800 border-green-400'}`}>
                                        {item.brand}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="my-4 inline-block bg-green-500 text-white font-primaryMedium py-2 px-2 rounded hover:bg-green-600 transition duration-300 mx-2"
                                        disabled={purchaseCart.some(cartItem => cartItem.id === item.id)} // Disable button if item is already in purchaseCart
                                    >
                                        {purchaseCart.some(cartItem => cartItem.id === item.id) ? 'اضافه شده' : 'اضافه کردن به خرید'}
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromLocalStorage(item.id)}
                                        className="my-4 inline-block bg-red-500 text-white font-primaryMedium py-2 px-2 rounded hover:bg-red-600 transition duration-300 mx-2"
                                        disabled={purchaseCart.some(cartItem => cartItem.id === item.id)} // Disable if in purchaseCart
                                    >
                                        حذف از سبد خرید
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-wrap justify-center p-4 mt-8" dir="rtl">
                        <div className="w-full bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
                            <div className="mt-8 p-4 bg-gray-100 rounded shadow">
                                {Array.isArray(da) && da.length > 0 ? (
                                    <div>
                                        <div className="font-primaryDemibold">محاسبه قیمت</div>
                                        {purchaseCart.map((item, index) => (
                                            <div key={index} className="grid lg:grid-cols-4 grid-cols-2 text-center gap-2 border-b py-2">

                                                <span className="font-primaryDemibold truncate">{item.quantity} بسته {item.title}</span>
                                                {(item.title.includes("مایع") ?
                                                    <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">بسته {item.package} لیتری</p>
                                                    :
                                                    <p className="mb-2 font-primaryLight md:font-primaryRegular text-gray-900">بسته {item.package} کیلویی</p>
                                                )}
                                                <span className={`font-primaryLight md:font-primaryDemibold me-2 px-2.5 py-0.5 rounded border content-center ${item.brand.includes('KHAK SHIMI') ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 'bg-green-100 text-green-800 border-green-400'}`}>
                                                    {item.brand}
                                                </span>
                                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
                                                    <button onClick={() => handleDecreaseQuantity(item.id)} className="text-white bg-red-500 rounded-lg p-2">-1</button>
                                                    <button onClick={() => handleAddToCart(item)} className="text-white bg-green-500 p-2 rounded-lg">+1</button>
                                                    <button onClick={() => handleRemoveFromCart(item.id)} className="text-white bg-yellow-500 p-2 rounded-lg md:font-primaryMedium font-primaryLight">
                                                        حذف
                                                    </button>
                                                </div>
                                                <span className="font-primaryMedium text-gray-800">
                                                    {formatPrice(isNaN(parseFloat(item.price.replace(/,/g, '')) * item.quantity) ? 0 : parseFloat(item.price.replace(/,/g, '')) * item.quantity)} تومان
                                                </span>
                                            </div>
                                        ))}
                                        <div className="mt-4 flex justify-between items-center">
                                            <h3 className="text-lg font-primaryDemibold">جمع کل:</h3>
                                            <span className="text-xl font-primaryMedium">{formatPrice(calculateTotalPrice())} تومان</span>
                                            <button className="text-lg font-primaryDemibold text-red-600" disabled={purchaseCart.length === 0} onClick={handleFinalPurchase}>خرید نهایی</button>
                                        </div>
                                    </div>
                                ) : (
                                    <BuyEmpty />
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Buy;
