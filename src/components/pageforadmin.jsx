'use client';
import { useState, useEffect } from 'react';
import Err from 'app/not-found';
import Search from './searchbar';

const PageForAdmin = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [newProduct, setNewProduct] = useState({ title: '', text: '', table: '', price: '', pic: '', brand: '', package: '', buy: '', id: '' });
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedData, setEditedData] = useState({ title: '', text: '', table: '', price: '', pic: '', brand: '', package: '', buy: '', id: '', _id: '' });
    useEffect(() => {
        fetch('https://izirtuland.ir/pages/api/pageproduct')
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

    const deleteItem = async (_id) => {
        console.log("Deleting item with ID:", _id);
        try {
            const res = await fetch('https://izirtuland.ir/pages/api/pageproduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id }),
            });
            if (res.ok) {
                setData(data.filter(item => item._id !== _id));
            } else {
                const errorData = await res.json();
                console.error("Failed to delete item:", errorData);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleEdit = (item) => {
        setEditingItemId(item._id);
        setEditedData(item);
    };

    const updateItem = async () => {
        try {
            const res = await fetch('https://izirtuland.ir/pages/api/pageproduct', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedData),
            });
            if (res.ok) {
                const updatedItem = await res.json();
                setData(prevData =>
                    prevData.map(item =>
                        item._id === editingItemId ? { ...item, ...updatedItem } : item
                    )
                );
                setEditingItemId(null);
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const addNewProduct = async () => {
        try {
            const res = await fetch('https://izirtuland.ir/pages/api/pageproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            if (res.ok) {
                const addedProduct = await res.json();
                setData([...data, addedProduct]);
                setNewProduct({ title: '', text: '', table: '', price: '', pic: '', brand: '', package: '', buy: '', id: '' });
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    if (isLoading) return <p>در حال بارگذاری</p>;
    if (!data) return <Err />;

    const filteredData = data.filter(item => item.title.includes(searchQuery)).sort((a, b) => Number(a.id) - Number(b.id));
    return (
        <div className="w-full font-primaryMedium">
            <div className="new-product-form grid grid-cols-1 gap-4 md:grid-cols-2">
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="text" value={newProduct.text} onChange={(e) => setNewProduct({ ...newProduct, text: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="table" value={newProduct.table} onChange={(e) => setNewProduct({ ...newProduct, table: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Pic" value={newProduct.pic} onChange={(e) => setNewProduct({ ...newProduct, pic: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Brand" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Package" value={newProduct.package} onChange={(e) => setNewProduct({ ...newProduct, package: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Buy" value={newProduct.buy} onChange={(e) => setNewProduct({ ...newProduct, buy: e.target.value })} />
                <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Id" value={newProduct.id} onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })} />
                <button className="col-span-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all" onClick={addNewProduct}>Add Product</button>
            </div>
            <div className="mb-4 w-full">
                <Search onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
            </div>
            {filteredData.map((item) => (
                <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md" key={item.id}>
                    {editingItemId === item._id ? (
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.title} onChange={(e) => setEditedData({ ...editedData, title: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.text} onChange={(e) => setEditedData({ ...editedData, text: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.table} onChange={(e) => setEditedData({ ...editedData, table: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.price} onChange={(e) => setEditedData({ ...editedData, price: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.pic} onChange={(e) => setEditedData({ ...editedData, pic: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.brand} onChange={(e) => setEditedData({ ...editedData, brand: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.package} onChange={(e) => setEditedData({ ...editedData, package: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.buy} onChange={(e) => setEditedData({ ...editedData, buy: e.target.value })} />
                            <input className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={editedData.id} onChange={(e) => setEditedData({ ...editedData, id: e.target.value })} />
                            <button className='bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all ml-4' onClick={updateItem}>Save</button>
                            <button className='bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-all' onClick={() => setEditingItemId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>{item.title}</p>
                            <p>{item.text}</p>
                            <p>table {item.table}</p>
                            <p>{item.price}</p>
                            <p>picture {item.pic}</p>
                            <p>{item.brand}</p>
                            <p>بسته بندی :{item.package}</p>
                            <p>{item.buy}</p>
                            <p>ای دی مربوطه :{item.id}</p>
                            <p>{item._id}</p>
                            <button className="bg-blue-500 text-white rounded-md ml-6 p-4"  onClick={() => handleEdit(item)}>Edit</button>
                            <button className="bg-red-500 text-white rounded-md p-4"  onClick={() => deleteItem(item._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PageForAdmin;