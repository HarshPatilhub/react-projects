import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=413c00fd`);
      setData(response.data.Search || []);
    } catch (error) {
      console.log("Error while fetching data", error);
    }
  };

  useEffect(() => {
    if (search.trim() !== "") {
      fetchData();
    } else {
      setData([]); // Clear previous search results if search query is empty
    }
  }, [search]);

  return (
    <div className={`text-center h-auto py-8 bg-gray-900 ${data.length === 0 ? 'h-full' : ''}`}>
      <h1 className='text-white text-4xl font-semibold mb-8'>Discover Movies</h1>
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search movie'
          className='w-80 sm:w-96 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500'
        />
        <button
          onClick={fetchData}
          className='ml-4 bg-red-500 px-6 py-2 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110'
        >
          Search
        </button>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map(movie => (
          <div
            key={movie.imdbID}
            className='bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer'
            onClick={() => openYouTubePage()}
          >
            <img src={movie.Poster} alt={movie.Title} className='h-64 w-full object-cover' />
            <div className='p-4'>
              <h2 className="text-xl font-semibold mb-2 text-white cursor-pointer hover:text-red-500">{movie.Title}</h2>
              <p className="text-gray-400">Year: {movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
