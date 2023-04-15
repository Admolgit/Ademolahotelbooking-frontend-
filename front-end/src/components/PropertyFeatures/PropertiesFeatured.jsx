import useHook from "../../CustomHooks/useHook";
import classes from "./PropertiesFeatured.module.css";

const FeaturedProperties = () => {
  const { data2, loading, error } = useHook(
    `${process.env.REACT_APP_URL}/hotels?featured=true&limit=4&min=10&max=200`
  );
  return (
    <div className={classes.fp}>
      {loading ? (
        "Please wait hotels data loading..."
      ) : (
        <>
          {data2?.data?.hotel?.map((item, i) => (
            <div className={classes.fpItem} key={item._id}>
              <img
                src={item?.photos[0]}
                alt=''
                className={classes.fpImg}
              />
              <span className={classes.fpName}>{item?.name}</span>
              <span className={classes.fpCity}>{item?.city}</span>
              <span className={classes.fpPrice}>Starting from ${item?.cheapestPrice}</span>
              {item.rating && <div className={classes.fpRating}>
                <button>{item?.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
