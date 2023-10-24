import React, { useState } from 'react';
import './TicketForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SummedTime from './SummedTime';
import SortedItems from './SortedItems';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';

function TicketForm() {
  const [inputValue, setInputValue] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [secsToSum, setSecsToSum] = useState(0);
  const [items, setItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // function getTimeDifference(startDate, endDate) {
  //   const timeDifferenceInMilliseconds = endDate - startDate;
  //   const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  //   const hours = Math.floor(timeDifferenceInSeconds / 3600);
  //   const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);

  //   return `${hours} h ${minutes} min`;
  // }
  function getTimeDifference(startDate, endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  
    if (timeDifferenceInSeconds >= 0) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
      return `${hours} h ${minutes} min`;
    }
  
    return `${timeDifferenceInSeconds} s`; 
  }
  
  const timeDifference = getTimeDifference(startDate, endDate);

  function getTimeToSum(startDate, endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    
    return timeDifferenceInSeconds;
  }
  
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

  // const saveTask = () => {
  //   setInputValue(inputValue);
  //   setSecsToSum(getTimeToSum(startDate, endDate));
  //   setDuration(getTimeDifference(startDate, endDate));
  //   createdAt(Date());
  //   if (inputValue !== '') {
  //     const newItem = {
  //       id: Math.random(),
  //       name: inputValue,
  //       startDate: startDateForModal,
  //       numericStartDate: startDate,
  //       endDate: endDateForModal,
  //       createdTime: formattedTimeForModal,
  //       duration: timeDifference,
  //       durationNumeric: secsToSum,
  //     };
  //     setItems([...items, newItem]);
  //     setInputValue('');
  //   }
  // };

  const saveTask = () => {
    setInputValue(inputValue);
    setDuration(getTimeDifference(startDate, endDate));
    createdAt(Date());
    const newSecsToSum = getTimeToSum(startDate, endDate);
    setSecsToSum(newSecsToSum);
    if (inputValue !== '') {
      const newItem = {
        id: Math.random(),
        name: inputValue,
        startDate: startDateForModal,
        numericStartDate: startDate,
        endDate: endDateForModal,
        createdTime: formattedTimeForModal,
        duration: timeDifference,
        durationNumeric: newSecsToSum,
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };


  const sortedItems = items.slice().sort((a, b) => {
    return new Date(a.numericStartDate) - new Date(b.numericStartDate);
  });  

  const removeItem = (id, durationNumeric) => {
    const subtract = 0 - +durationNumeric;
    setSecsToSum(subtract);
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
            timeCaption="time"
            minTime={new Date()}
            maxTime={new Date(0, 0, 0, 22, 0)}
          />
        </div>
        <div>
          <DatePicker
            id="end-datepicker"
            minDate={startDate}
            minTime={startDate}
            maxTime={new Date(0, 0, 11, 0)}
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            timeFormat="p"
            timeIntervals={15}
            timeInputLabel="Time:"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect 
            fixedHeight
            timeCaption="time"
          />
        </div>
      </div>

      <div id='task-time'>
        {`${timeDifference}`}
      </div>

      {/* <div id='task-time'>
        {secsToSum >= 0 && `${timeDifference}`}
      </div> */}

      <button
        id="add-task"
        onClick={() => {
          setStartDate(new Date());
          setEndDate(new Date());
          saveTask();
        }}
      >
        <PlusIcon id="plus" width="7vmin" height="7vmin" />
      </button>
    </div>

    <SummedTime secsToSum={secsToSum} />   
    <SortedItems items={sortedItems} removeItem={removeItem} />
    </>
  );
}

export default TicketForm;


