import useHook from "../../CustomHooks/useHook";
import classes from "./PropertiesList.module.css";
//List properties to the UI component
const PropertyList = () => {
  const { data2, loading, error } = useHook(`${process.env.REACT_APP_URL}/count-by-type`);

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];
  return (
    <div className={classes.pList}>
      {loading ? (
        "Please wait hotels data loading..."
      ) : (
        <>
          {data2.data &&
            images.map((img, i) => (
              <div key={i} className={classes.pListItem}>
                <img
                  src={img}
                  alt=''
                  className={classes.pListImg}
                />
                <div className={classes.pListTitles}>
                  <h1>{data2?.data[i]?.type}</h1>
                  <h2>{data2?.data[i]?.count} {data2?.data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
