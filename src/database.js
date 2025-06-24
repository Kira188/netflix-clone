import { getDatabase, ref, set, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save a movie to continue watching using a timestamp key
export const saveToContinueWatching = (userId, movie, timestamp = 0) => {
  const movieWithTimestamp = {
    ...movie,
    watchedAt: timestamp,
    savedAt: Date.now(), // ← actual save time
  };

  const key = Date.now(); // use save time as key
  set(ref(getDatabase(), `continueWatching/${userId}/${key}`), movieWithTimestamp);
};

// Get the continue watching list
export const getContinueWatching = async (userId) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `continueWatching/${userId}`));
  if (snapshot.exists()) {
    const data = Object.values(snapshot.val());

    // Sort by most recently watched first
    data.sort((a, b) => b.watchedAt - a.watchedAt);

    const seen = new Set();
    const deduped = data.filter((movie) => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });

    return deduped;
  } else {
    return [];
  }
};

