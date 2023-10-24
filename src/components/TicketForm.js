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
    return {
      formatted: `${hours} h ${minutes} min`,
      numeric: timeDifferenceInSeconds
    };
  }
  const timeDifferenceFormatted = getTimeDifference(startDate, endDate).formatted;
  const timeDifferenceNumeric = getTimeDifference(startDate, endDate).numeric;

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
  const startDateForModal = startDate.toLocaleString();
  const endDateForModal = endDate.toLocaleString();


  const saveTask = () => {
    if (inputValue !== '' && timeDifferenceNumeric > 0) {
      setInputValue(inputValue);
      createdAt(Date());
      const timeDiffResult = getTimeDifference(startDate, endDate);
      setSecsToSum(timeDiffResult.numeric);
      
      const newItem = {
        id: Math.random(),
        name: inputValue,
        startDate: startDateForModal,
        numericStartDate: startDate,
        endDate: endDateForModal,
        createdTime: formattedTimeForModal,
        duration: timeDiffResult.formatted,
        durationNumeric: timeDiffResult.numeric,
      };
      
      setItems([...items, newItem]);
      setInputValue('');
    } 
  };


  const removeItem = (id, durationNumeric) => {
    const subtract = 0 - +durationNumeric;
    setSecsToSum(subtract);
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const sortedItems = items.slice().sort((a, b) => {
    return new Date(a.numericStartDate) - new Date(b.numericStartDate);
  });  


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
            minDate={new Date(startDate)}
            onChange={(date) => setEndDate(date)}
            showIcon
            selected={endDate}
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
        {`${timeDifferenceFormatted}`}
        {/* {timeDifferenceNumeric <= 0 ? '0 h 0 min' : timeDifferenceFormatted} */}
      </div>

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


