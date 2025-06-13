import axios from "axios";
import { getAuth } from "firebase/auth";

const BASE_URL = "https://footballbackend-d13q.onrender.com";

// add a new player
export const addPlayer = (playerData) => {
  return axios
    .post(`${BASE_URL}/players`, playerData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding player:", error);
      throw error;
    });
};

// get all players
export const getPlayers = () => {
  return axios
    .get(`${BASE_URL}/players`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching players:", error);
      throw error;
    });
};

export const getGames = () => {
  return axios
    .get(`${BASE_URL}/games/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching games:", error);
      throw error;
    });
};

// get a player by ID
export const getPlayerById = (id) => {
  return axios
    .get(`${BASE_URL}/players/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching player by ID:", error);
      throw error;
    });
};

// update a player by ID
export const updatePlayerById = (id, playerData) => {
  return axios
    .put(`${BASE_URL}/players/${id}`, playerData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating player:", error);
      throw error;
    });
};

// record a new game
export const recordGame = (gameData) => {
  return axios
    .post(`${BASE_URL}/games`, gameData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error recording game:", error);
      throw error;
    });
};

// get a game by ID
export const getGameById = (id) => {
  return axios
    .get(`${BASE_URL}/games/${id}`)
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

  return axios
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

// get a list of games
// export const getGames = (limit = 10) => {
//   return axios.get(`${BASE_URL}/games`, { params: { limit } })
//     .then(response => {
//       console.log(response)

//       return response.data
//     })
//     .catch(error => {
//       console.error('Error fetching games:', error);
//       throw error;
//     });
// };
