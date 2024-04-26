import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    <div className='w-full h-auto text-center bg-zinc-700 py-2'>
      <h1 className='text-white text-4xl'>Movie Search App</h1>
      <input type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search movie'
        className='w-96 mx-auto my-10 py-1 border px-2 border-black sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5' />
      <button onClick={fetchData} className='bg-red-500 px-8 py-1 text-white font-bold'>Search</button>
      <div className="mt-5 flex flex-wrap justify-center text-white">
        {data.map(movie => (
          <div className='w-[45%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[15%] my-5 mx-2 px-2 shadow-2xl' key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} className='h-64 w-full object-cover' />
            <h2 className="text-xl mt-2">{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
