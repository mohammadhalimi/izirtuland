'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserPanel from "@/components/UserPanel";
import Err from "app/not-found";
import dynamic from "next/dynamic";

const componentMap = {
  UserPanel: dynamic(() => import('@/components/UserPanel')),
  OrderRewiew: dynamic(() => import('@/components/OrderRewiew')),
  CompletedOrders: dynamic(() => import('@/components/CompletedOrders'))
};

const Useer = ({ params }) => {
  const [selectedContent, setSelectedContent] = useState(<UserPanel />);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://izirtuland.ir/pages/api/usermenu');
        const data = await response.json();

        const items = data.map((item) => ({
          ...item,
          content: item.component
            ? componentMap[item.component]
            : item.content,
        }));

        setMenuItems(items);
        setMenuLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    fetch('https://izirtuland.ir/pages/api/sendsms')
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

  if (loading || menuLoading) {
    return (
      <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-md mb-4 w-1/3 mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded-md mb-4 w-1/2 mx-auto"></div>
            <div className="h-10 bg-gray-300 rounded-md mb-4 w-full"></div>
            <div className="h-10 bg-gray-300 rounded-md mb-4 w-full"></div>
            <div className="h-10 bg-gray-300 rounded-md mb-4 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return <Err />;

  const handleLinkClick = (content, index) => {
    setSelectedContent(content);
    setActiveIndex(index);
  };

  const handleLogout = () => {
    document.cookie = 'user-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    router.push('/signup');
  };

  return (
    <div className="max-w-screen-xl items-center justify-between mx-auto my-4">
      {data.map((item) => (
        <div className="w-full" key={item.id} dir="rtl">
          {item.receptor == params.userpanelId && (
            <nav className="bg-white border-gray-200">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="w-full md:w-auto">
                  <ul className="font-primaryDemibold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                    {menuItems.map((item, index) => (
                      <li key={item.id} className="my-2 md:my-0">
                        <p
                          onClick={() => handleLinkClick(item.content, index)}
                          className={`block p-2 border-2 rounded-lg hover:cursor-pointer ${activeIndex === index
                            ? 'bg-white text-blue-500 border-blue-500'
                            : 'bg-blue-500 text-white border-blue-500 hover:bg-white hover:text-blue-500'
                            }`}
                        >
                          {item.title}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          )}
        </div>
      ))}
      <div className="p-4 rounded-lg mt-4 ">
        {selectedContent ? (
          typeof selectedContent === 'function' ? (
            <selectedContent />
          ) : (
            <div>
              {selectedContent}
            </div>
          )
        ) : (
          <p>هیچ محتوایی انتخاب نشده است.</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <button className="w-1/2 bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors font-primaryMedium content-center" onClick={handleLogout}>
          خروج از پنل کاربری
        </button>
      </div>

    </div>
  )
}

export default Useer;
