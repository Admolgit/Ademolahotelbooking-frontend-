import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.css"
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../../contextapi/SearchContext"

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const {dispatch} = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: {destination, dates, options}})
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className={classes.header}>
      <div
        className={
          type === `${classes.list} ? ${classes.headerContainer} ${classes.istMode} : ${classes.headerContainer}`
        }
      >
        <div className={classes.headerList}>
          <div className={`${classes.headerListItem} ${classes.active}`}>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== `${classes.list}` && (
          <>
            <h1 className={classes.headerTitle}>
              A lifetime of discounts? It's Genius.
            </h1>
            <p className={classes.headerDesc}>
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Ademolabooking account
            </p>
            <button className={classes.headerBtn}>
              <Link to='/auth/login'>
                Sign in
              </Link>
                / 
              <Link to='/auth/register'>
                Register
              </Link>
            </button>
            <div className={classes.headerSearch}>
              <div className={classes.headerSearchItem}>
                <FontAwesomeIcon icon={faBed} className={classes.headerIcon} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className={classes.headerSearchInput}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className={classes.headerSearchItem}>
                <FontAwesomeIcon icon={faCalendarDays} className={classes.headerIcon} />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className={classes.headerSearchText}
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className={classes.date}
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className={classes.headerSearchItem}>
                <FontAwesomeIcon icon={faPerson} className={classes.headerIcon} />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className={classes.headerSearchText}
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className={classes.options}>
                    <div className={classes.optionItem}>
                      <span className={classes.optionText}>Adult</span>
                      <div className={classes.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={classes.optionCounterButton}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className={classes.optionCounterNumber}>
                          {options.adult}
                        </span>
                        <button
                          className={classes.optionCounterButton}
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={classes.optionItem}>
                      <span className={classes.optionText}>Children</span>
                      <div className={classes.optionCounter}>
                        <button
                          disabled={options.children <= 0}
                          className={classes.optionCounterButton}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className={classes.optionCounterNumber}>
                          {options.children}
                        </span>
                        <button
                          className={classes.optionCounterButton}
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={classes.optionItem}>
                      <span className={classes.optionText}>Room</span>
                      <div className={classes.optionCounter}>
                        <button
                          disabled={options.room <= 1}
                          className={classes.optionCounterButton}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className={classes.optionCounterNumber}>
                          {options.room}
                        </span>
                        <button
                          className={classes.optionCounterButton}
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={classes.headerSearchItem}>
                <button className={classes.headerBtns} onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;