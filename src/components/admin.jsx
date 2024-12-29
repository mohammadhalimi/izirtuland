'use client'
import { useState, useEffect } from 'react';
import ListForAdmin from './listforadmin';
import dynamic from 'next/dynamic';
import Welcome from './welcome';

const componentMap = {
  ListForAdmin: dynamic(() => import('./listforadmin')),
  PageForAdmin: dynamic(() => import('./pageforadmin')),
  OrderForAdmin: dynamic(() => import('./OrderForAdmin'))
};

const Admin = ({ logout }) => {
  const [selectedContent, setSelectedContent] = useState(<ListForAdmin />);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://izirtuland.ir/pages/api/menuitem');
        const data = await response.json();

        const items = data.map((item) => ({
          ...item,
          content: item.component
            ? componentMap[item.component] 
            : item.content, 
        }));

        setMenuItems(items); 
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleLinkClick = (content, index) => {
    setSelectedContent(content);
    setActiveIndex(index);
  };

  return (
    <div className="w-full items-center justify-between mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6" dir="rtl">
      <Welcome />
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-primaryDemibold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              {menuItems.map((item, index) => (
                <li key={item.key}>
                  <p
                    onClick={() => handleLinkClick(item.content, index)}
                    className={`block py-2 px-3 rounded ${activeIndex === index ? 'text-blue-700' : 'hover:text-blue-700'
                      } md:border-0 md:p-0 hover:cursor-pointer`}
                  >
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        {selectedContent ? (
          typeof selectedContent === 'function' ? (
            <selectedContent />
          ) : (
            <div>{selectedContent}</div>
          )
        ) : (
          <p>هیچ محتوایی انتخاب نشده است.</p>
        )}
      </div>
      <button
        onClick={logout}
        className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors font-primaryMedium"
      >
        خروج
      </button>
    </div>
  );
}

export default Admin;
