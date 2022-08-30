import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

export const fetchSongData = async (songName) => {
  try {
    const response = await axios.post("/search", { title: songName });
    return response;
  } catch (err) {
    return err;
  }
};
