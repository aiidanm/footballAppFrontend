import axios from "axios";
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



export const registerLeague = (uid, playerName) => {
  return api
    .post("/leagues", uid, playerName)
    .then(({league_id}) => {
      if(league_id) return "signedup"
    })
}

export const joinLeague = ({uid, playerName, leagueCode, email}) => {
  return api
    .post("/leagues/join", {uid, playerName, leagueCode, email})
    .then((res) => {
      if(res.message === "success"){
        return res.message
      }
    })
}

export const getRoles = (idToken) => {
  return api 
    .post("/leagues/login", {}, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {
      console.log(res)
      return res.data.user
    })
    .catch((err) => console.log(err))
}

