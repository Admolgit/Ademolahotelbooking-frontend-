import classes from "./MailList.module.css"
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/Search/SearchItem";
import useHook from "../../CustomHooks/useHook";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination);
  const [dates, setDates] = useState(location?.state?.dates);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location?.state?.options);

  const { data2, loading, error, reFetchData } = useHook(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);
  console.log(data2);

  const handleClick = () => {
    reFetchData();
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className={classes.listContainer}>
        <div className={classes.listWrapper}>
          <div className={classes.listSearch}>
            <h1 className={classes.lsTitle}>Search</h1>
            <div className={classes.lsItem}>
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className={classes.lsItem}>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{
                `${format(
                  dates[0]?.startDate,
                  "MM/dd/yyyy"
                )} to ${format(
                  dates[0]?.endDate, 
                  "MM/dd/yyyy")}`
              }
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className={classes.lsItem}>
              <label>Options</label>
              <div className={classes.lsOptions}>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className={classes.lsOptionInput}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className={classes.lsOptionInput}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={classes.lsOptionInput}
                    // placeholder={options.adult}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>Children</span>
                  <input
                    type="number"
                    min={0}
                    className={classes.lsOptionInput}
                    // placeholder={options.children}
                  />
                </div>
                <div className={classes.lsOptionItem}>
                  <span className={classes.lsOptionText}>Room</span>
                  <input
                    type="number"
                    min={1}
                    className={classes.lsOptionInput}
                    // placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className={classes.listResult}>
            {loading ? (
              "loading"
            ) : (
              <>
                {data2?.hotel?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;