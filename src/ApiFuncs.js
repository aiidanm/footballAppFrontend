import axios from "axios";
import { getAuth } from "firebase/auth";
import {auth} from './components/Firebase'

const BASE_URL = "https://footballbackend-d13q.onrender.com"

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); 
        resolve(user);
      }, reject);
    });
  };  const user = auth.currentUser || (await getCurrentUser());

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  } else {
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// add a new player
export const addPlayer = (playerData) => {
  return api
    .post(`/players`, playerData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding player:", error);
      throw error;
    });
};

// get all players
export const getPlayers = (year) => {
  return api
    .get(`/players`, {
      params: {
        year: year
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching players:", error);
      return []
    });
};

export const getGames = (year) => {
  return api
    .get(`/games`, {
      params: {
        year: year
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching games:", error);
      return []
    });
};

// get a player by ID
export const getPlayerById = (id, year) => {
  return api
    .get(`/players/${id}`, {
      params: {
        year: year
      }
    })  
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching player by ID:", error);
      throw error;
    });
};

// update a player by ID
export const updatePlayerById = (id, playerData) => {
  return api
    .put(`/players/${id}`, playerData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating player:", error);
      throw error;
    });
};

// record a new game
export const recordGame = (gameData) => {
  return api
    .post(`/games`, gameData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error recording game:", error);
      throw error;
    });
};

// get a game by ID
export const getGameById = (id) => {
  return api
    .get(`/games/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching game by ID:", error);
      throw error;
    });
};

export const submitAiReq = (prompt, token) => {       
  const data = {
    prompt: prompt,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(data, prompt);

  return api
    .post(`https://footballtestbackend.onrender.com/ai/`, data, config)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    });
};

export const registerLeague = (uid, User) => {
  return api
    .post("/leagues", uid, User)
    .then((leagueId) => {
      if(leagueId) return "signedup"
    })
}

// export const registerUser = (uid, User) => {
//   return api
//     .post("/users", uid, User)
//     .then(())
// }