import React, { useState } from 'react';
import './TicketForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SummedTime from './SummedTime';

function TicketForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [inputValue, setInputValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  const [duration, setDuration] = useState('');
  const [secsToSum, setSecsToSum] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function getTimeDifference(startDate, endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);

    return `${hours} hours ${minutes} minutes`;
  }

  const timeDifference = getTimeDifference(startDate, endDate);

  function getTimeToSum(startDate, endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const timeDifferenceInSecs = Math.floor(timeDifferenceInMilliseconds / 1000);

    console.log(timeDifferenceInSecs);
    return timeDifferenceInSecs;
  }
  // const secsDiff = getTimeToSum(startDate, endDate);
  
  const saveTask = () => {
    setSavedValue(inputValue);
    setInputValue('');
    setDuration(getTimeDifference(startDate, endDate));
    // getTimeToSum(startDate, endDate);
    setSecsToSum(getTimeToSum(startDate, endDate));
  };

  return (
    <><div className='ticket'>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add task" />

      <div>
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeFormat="p"
          timeIntervals={1}
          timeInputLabel="Time:"
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeInput 
        />
        <DatePicker
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

        <p>{`Duration: ${timeDifference}`}</p>

        <button
          onClick={() => {
            setStartDate(new Date());
            setEndDate(new Date());
            saveTask();
          }}
        >
          zapisz
        </button>
      </div>
    </div>
    <SummedTime secsToSum={secsToSum} />
    </>
  );
}

export default TicketForm;


