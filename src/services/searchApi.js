import axios from "axios";

const key = "21960692-4b154a3b2fc4580fa9db92a45";

const searchApi = ({ query = "", page = 1 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(({ data }) => data.hits);
};

export default searchApi;
