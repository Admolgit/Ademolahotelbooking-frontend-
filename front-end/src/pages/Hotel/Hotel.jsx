import classes from "./Hotel.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import useHook from "../../CustomHooks/useHook";
import { SearchContext } from "../../contextapi/SearchContext";
import { AuthContext } from "../../contextapi/AuthContext";
import Reserve from "../../components/Reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  // Getting parameters from hotels url
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data2, loading, error } = useHook(`/hotels/${id}`);
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const dayDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return dayDiff;
  }

  const days = dayDifference(dates["0"]?.startDate, dates["0"]?.endDate);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if(user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? (
        "Data loading"
      ) : (
        <div className={classes.hotelContainer}>
          {open && (
            <div className={classes.slider}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={classes.close}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className={classes.arrow}
                onClick={() => handleMove("l")}
              />
              <div className={classes.sliderWrapper}>
                <img
                  src={photos[slideNumber].src}
                  alt=''
                  className={classes.sliderImg}
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className={classes.arrow}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className={classes.hotelWrapper}>
            <button className={classes.bookNow}>Reserve or Book Now!</button>
            <h1 className={classes.hotelTitle}>{data2?.data?.hotel?.name}</h1>
            <div className={classes.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data2?.data?.hotel?.address}</span>
            </div>
            <span className={classes.hotelDistance}>
            {data2?.data?.hotel?.distance}
            </span>
            <span className={classes.hotelPriceHighlight}>
              Book a stay over N{data2?.data?.hotel?.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className={classes.hotelImages}>
              {data2?.data?.hotel?.photos.map((photo, i) => (
                <div className={classes.hotelImgWrapper} key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=''
                    className={classes.hotelImg}
                  />
                </div>
              ))}
            </div>
            <div className={classes.hotelDetails}>
              <div className={classes.hotelDetailsTexts}>
                <h1 className={classes.hotelTitle}>
                  Stay in the heart of City
                </h1>
                <p className={classes.hotelDesc}>
                {data2?.data?.hotel?.description}
                </p>
              </div>
              <div className={classes.hotelDetailsPrice}>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>N{days * data2?.data?.hotel?.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          {/* <MailList /> */}
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
