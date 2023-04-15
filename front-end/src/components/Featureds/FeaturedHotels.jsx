import classes from "./FeaturedHotels.module.css";
import useHook from "../../CustomHooks/useHook";

const Featured = () => {
  const { data, loading, error } = useHook(`${process.env.REACT_APP_URL}/count-by-city?cities=V.I,Lagos,Ikeja`);
  
  return (
    <div className={classes.featured}>
      {loading ? (
        "Please wait hotels data loading..."
      ) : (
        <>
          <div className={classes.featuredItem}>
            <img
              src='https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o='
              alt=''
              className={classes.featuredImg}
            />
            <div className={classes.featuredTitles}>
              <h1>V.I</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className={classes.featuredImg}>
            <img
              src='https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o='
              alt=''
              className={classes.featuredImg}
            />
            <div className={classes.featuredTitles}>
              <h1>Lagos</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className={classes.featuredItem}>
            <img
              src='https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o='
              alt=''
              className={classes.featuredImg}
            />
            <div className={classes.featuredTitles}>
              <h1>Ikeja</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
