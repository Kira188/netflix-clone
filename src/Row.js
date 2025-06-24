import React, { useState, useEffect, useRef } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import { auth } from './firebase';
import { saveToContinueWatching, getContinueWatching } from './database';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function Row({ title, isLargeRow, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [currentWatchedTime, setCurrentWatchedTime] = useState(0);
  const [currentMovie, setCurrentMovie] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const base_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    console.log(`[${title}] Mounting row. UID:`, uid);

    if (title === 'Continue Watching' && uid) {
      getContinueWatching(uid)
        .then((data) => {
          console.log(`[${title}] Data from DB:`, data);
          setMovies(data);
        })
        .catch((err) => console.error(`[${title}] Fetch error:`, err));
    } else {
      async function fetchData() {
        try {
          const request = await axios.get(fetchUrl);
          console.log(`[${title}] API fetch result:`, request.data.results);
          setMovies(request.data.results);
        } catch (err) {
          console.error(`[${title}] API fetch error:`, err);
        }
      }
      fetchData();
    }
  }, [fetchUrl, title]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
      start: currentWatchedTime || 0,
    },
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const onPlayerStateChange = (event) => {
    if (event.data === 2 || event.data === 0) {
      const currentTime = playerRef.current?.getCurrentTime?.();
      const uid = auth.currentUser?.uid;
      if (uid && currentMovie && currentTime !== undefined) {
        console.log(`Saving ${currentMovie.title || currentMovie.name} at ${currentTime}s`);
        saveToContinueWatching(uid, currentMovie, Math.floor(currentTime));
      }
    }
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
      console.error('YouTube API error:', error);
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
      console.log(`Playing trailer for ${name}: ${videoId}`);
      setTrailerUrl(videoId);
      setCurrentWatchedTime(movie?.watchedAt || 0);
      setCurrentMovie(movie);
      setTimeout(() => {
        videoRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      alert(`No trailer found for: ${name}`);
    }
  };

  if (!movies || movies.length === 0) {
    console.log(`[${title}] No movies to display`);
    return null;
  }

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
          <Youtube
            videoId={trailerUrl}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
        </div>
      )}
    </div>
  );
}

export default Row;
