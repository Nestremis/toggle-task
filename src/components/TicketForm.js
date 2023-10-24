import React, { useState } from 'react';
import './TicketForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SummedTime from './SummedTime';
import SortedItems from './SortedItems';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';

function TicketForm() {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const [savedValue, setSavedValue] = useState('');
  const [duration, setDuration] = useState('');
  const [timeDifferenceInSecs, setTimeDifferenceinSecs] = useState(0);
  const [secsToSum, setSecsToSum] = useState(0);
  const [items, setItems] = useState([]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  function getTimeDifference(startDate, endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);

    return `${hours} h ${minutes} min`;
  }
  const timeDifference = getTimeDifference(startDate, endDate);

  function getTimeToSum(startDate, endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    
    return timeDifferenceInSeconds;
  }
  let timeDifferenceInSeconds;
  const startDateForModal = startDate.toLocaleString();
  const endDateForModal = endDate.toLocaleString();
  
  const createdAt = () => {
    function shorterDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return date.toLocaleString(undefined, options);
    }
    const createdTime = new Date();
    const formattedTime = shorterDate(createdTime);

    return formattedTime;
  }
  const formattedTimeForModal = createdAt();

  const saveTask = () => {
    setSavedValue(inputValue);
    setTimeDifferenceinSecs(timeDifferenceInSeconds);
    if (inputValue !== '') {
      createdAt(Date());
      const newItem = {
        id: Math.random(),
        name: inputValue,
        duration: timeDifference,
        durationInSec: timeDifferenceInSeconds,
        startDate: startDateForModal,
        numericStartDate: startDate,
        endDate: endDateForModal,
        createdTime: formattedTimeForModal,
      };
    setInputValue('');
    setDuration(getTimeDifference(startDate, endDate));
    setSecsToSum(getTimeToSum(startDate, endDate));
    setItems([...items, newItem]);
    }
  };

  const sortedItems = items.slice().sort((a, b) => {
    return new Date(a.numeric) - new Date(b.numeric);
  });  

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <>
    <div className='ticket'>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add task" 
        id="placeholder"
      />

      <div className="pickers">
        <div>
          <DatePicker
            id="start-datepicker"
            minDate={new Date()}
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeFormat="p"
            timeIntervals={15}
            timeInputLabel="Time:"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            fixedHeight
          />
        </div>
        <div>
          <DatePicker
            id="end-datepicker"
            // minDate={new Date()}
            minDate={startDate}
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            timeFormat="p"
            timeIntervals={15}
            timeInputLabel="Time:"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect 
            fixedHeight
          />
        </div>
      </div>

      <div id='task-time'>
        {`${timeDifference}`}
      </div>

      <button
        onClick={() => {
          setStartDate(new Date());
          setEndDate(new Date());
          saveTask();
        }}
      >
        <PlusIcon className="plus" width="7vmin" height="7vmin" />
      </button>
    </div>

    <SummedTime secsToSum={secsToSum} />   
    <SortedItems items={sortedItems} removeItem={removeItem} />
    </>
  );
}

export default TicketForm;


