import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import style from "./Loader.module.css";

const loader = () => {
  return (
    <Loader
      className={style.Loader}
      type="Watch"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
};
export default loader;
