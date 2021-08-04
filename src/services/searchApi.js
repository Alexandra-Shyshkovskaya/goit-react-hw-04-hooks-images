import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.params = {
  key: "21960692-4b154a3b2fc4580fa9db92a45",
  image_type: "photo",
  orientation: "horizontal",
  per_page: 12,
};

const searchApi = async (query, page) => {
  try {
    const { data } = await axios.get("", {
      params: {
        q: query,
        page,
      },
    });
    return data.hits;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default searchApi;
