import React, { useState, useEffect } from 'react';

const Image = () => {
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = image;
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=MBqby08f68OjRzvoq5p6MUAVNpMupFPmtmslOAb2CkI&query=${searchQuery}`);
      const imageData = await response.json();
      setData(imageData.results);
    } catch (error) {
      console.log("error while fetching images", error);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <form onSubmit={handleSubmit} className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder='Search here'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 mr-2 w-2/3"
        />
        <button type='submit' className="p-2 bg-blue-500 text-white">Search</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {
          data.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg">
              <img src={item.urls.regular} alt=""  className="w-full h-auto"  width={200} height={300}/>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Image;
