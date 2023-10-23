import React, { useState } from 'react';
import './TicketForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SummedTime from './SummedTime';
import SortedItems from './SortedItems';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';

function TicketForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [inputValue, setInputValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  const [duration, setDuration] = useState('');
  const [secsToSum, setSecsToSum] = useState(0);

  const [items, setItems] = useState([]);
  console.log(items);

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
    const timeDifferenceInSecs = Math.floor(timeDifferenceInMilliseconds / 1000);

    return timeDifferenceInSecs;
  }

  const startDateForModal = startDate.toLocaleString();
  const endDateForModal = endDate.toLocaleString();
  // const createdAtForModal = dat
  // console.log(createdAtForModal);
  const createdAt = () => {
    function shorterDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return date.toLocaleString(undefined, options);
    }
    const createdTime = new Date();
    const formattedTime = shorterDate(createdTime);

    return formattedTime;
  }
  const shorterTimeFormat = createdAt();
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const saveTask = () => {
    setSavedValue(inputValue);
    if (inputValue !== '') {
      createdAt(Date());
      const newItem = {
        id: Math.random(),
        name: inputValue,
        duration: timeDifference,
        startDate: startDateForModal,
        endDate: endDateForModal,
        // createdTime: Date().toLocaleString().slice("GMT")
        createdTime: shorterTimeFormat,
      };
    setInputValue('');
    setDuration(getTimeDifference(startDate, endDate));
    setSecsToSum(getTimeToSum(startDate, endDate));
    setItems([...items, newItem]);
    }
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <><div className='ticket'>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add task" 
        id="task-name"
      />

      <div className="pickers">
        <div>
          <DatePicker
            id="start-datepicker"
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeFormat="p"
            timeIntervals={1}
            timeInputLabel="Time:"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeInput 
          />
        </div>
        <div>
          <DatePicker
            id="end-datepicker"
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            timeFormat="p"
            timeIntervals={1}
            timeInputLabel="Time:"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeInput
            showTimeSelect 
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
    
    <SortedItems items={items} removeItem={removeItem} />
    </>
  );
}

export default TicketForm;


