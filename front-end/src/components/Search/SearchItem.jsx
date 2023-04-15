// import ca from "date-fns/esm/locale/ca/index.js";
import { Link } from "react-router-dom";
import classes from "./SearchItem.module.css";

const SearchItem = ({ item }) => {
  return (
    <div className={classes.searchItem}>
      <img src={item.photos[0]} alt='' className={classes.siImg} />
      <div className={classes.siDesc}>
        <h1 className={classes.siTitle}>{item.name}</h1>
        <span className={classes.siDistance}>{item.distance}</span>
        <span className={classes.siTaxiOp}>Free airport taxi</span>
        <span className={classes.siSubtitle}>
          Studio Apartment with Air conditioning
        </span>
        <span className={classes.siFeatures}>{item.description}</span>
        <span className={classes.siCancelOp}>Free cancellation </span>
        <span className={classes.siCancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={classes.siDetails}>
        {item.rating && (
          <div className={classes.fpRating}>
            <button>{item?.rating}</button>
            <span>Excellent</span>
          </div>
        )}
        <div className={classes.siDetailTexts}>
          <span className={classes.siPrice}>{item.cheapestPrice}</span>
          <span className={classes.siTaxOp}>Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className={classes.siCheckButton}>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
