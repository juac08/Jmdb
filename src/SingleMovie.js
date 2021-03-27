import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState({ show: false, msg: "" });
  const [loading, setLoading] = useState(true);

  const fetchMovie = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      if (data.Response === "False") {
        setError({ show: true, msg: data.Error });
        setLoading(false);
      } else {
        setMovie(data);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if(loading) return <div className="loading"></div>
  if(error.show){
   return <div className="page-error">
      <h1>{error.msg}</h1>
      <Link to='/' className='btn'>
        back
      </Link>
    </div>
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year,Runtime} = movie;
  return (
    <section className='single-movie'>
      <img src={poster} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4 style={{color:'green'}}>IMDB {movie.imdbRating} / 10</h4>
        <p>{Runtime}</p>
        <p>{movie.Actors}</p>
        <h4>{year}</h4>
        <Link to='/' className='btn'>
          back to movies
        </Link>
      </div>
    </section>
  )
};

export default SingleMovie;
