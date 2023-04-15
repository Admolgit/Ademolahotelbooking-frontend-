import React, { useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import classes from "./Reserve.module.css";
import useHook from "../../CustomHooks/useHook";
import { SearchContext } from "../../contextapi/SearchContext";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = React.useState([]);

  const { dates } = useContext(SearchContext);

  const { data2, loading, error } = useHook(`/room/${hotelId}`);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let list = [];

    while (date < end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const allHotelRoomsDates = getDatesInRange(
    dates[0]?.startDate,
    dates[0]?.endDate
  );

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const roomIsAvailable = (roomNumber) => {
    const roomIsFound = roomNumber.unavailableDates.some((roomDate) => {
      return allHotelRoomsDates.includes(new Date(dates).getTime());
    });

    return !roomIsFound;
  };

  const handleClick = async () => {
    try {
      const r = await Promise.allSettled(
        selectedRooms.map((roomId) => {
        const res =  axios.put(`/rooms/${roomId}`, {
          dates: allHotelRoomsDates,
        });
        return res.data;
      }));

      console.log(r)
    } catch (err) {}
    
  };

  return (
    <div className={classes.reserve}>
      <div className={classes.rContainer}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={classes.rClose}
          onClick={() => setOpen(false)}
        />
        <span>Select your room: </span>
        {data2?.data?.list?.map((data) => (
          <div className={classes.rItem}>
            <div className={classes.rItemInfo} key={data.id}>
              <div className={classes.rTitle}>Title: {data.title}</div>
              <div className={classes.rDesc}>
                Description: {data.description}
              </div>
              <div className={classes.rMax}>
                Maximum People: {data.maximumPeople}
              </div>
              <div className={classes.rMax}>Price: {data.cheapestPrice}</div>
            </div>
            {data.roomNumbers.map((roomNumber) => (
              <div className={classes.room} key={roomNumber._id}>
                <label>Room Number: {roomNumber.number}</label>
                <input
                  type='checkbox'
                  value={roomNumber._id}
                  onChange={handleSelect}
                  disabled={!roomIsAvailable(roomNumber)}
                />
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleClick} className={classes.rButton}>
          Reserve Now!
        </button>
      </div>
    </div>
  )
};

export default Reserve;
