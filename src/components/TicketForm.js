import React, { useState } from 'react';
import './TicketForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TicketForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function getTimeDifference(startDate, endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);

    return `${hours} hours ${minutes} minutes`;
  }

  const timeDifference = getTimeDifference(startDate, endDate);

  return (
    <div className='ticket'>
      <p>Add item</p>
      <input />
      <div>
        <DatePicker 
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          locale="pt-BR"
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
          locale="pt-BR"
          timeFormat="p"
          timeIntervals={1}
          timeInputLabel="Time:"
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeInput
        />
        <p>{`Duration: ${timeDifference}`}</p>
      </div>
    </div>
  );
}

export default TicketForm;
