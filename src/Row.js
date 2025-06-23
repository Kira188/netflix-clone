import React, { useState, useEffect, useRef } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function Row({ title, isLargeRow, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const videoRef = useRef(null);
  const base_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const searchYouTubeTrailer = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
      } else {
        throw new Error('No video found');
      }
    } catch (error) {
      console.error("YouTube API error:", error);
      return null;
    }
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
      return;
    }

    const name = movie?.name || movie?.title || movie?.original_name || '';
    const year = movie?.first_air_date?.split('-')[0] || movie?.release_date?.split('-')[0] || '';
    const query = `${name} ${year} trailer`;

    const videoId = await searchYouTubeTrailer(query);
    if (videoId) {
      setTrailerUrl(videoId);
      setTimeout(() => {
        videoRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      alert(`No trailer found for: ${name}`);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>

      {trailerUrl && (
        <div ref={videoRef}>
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
