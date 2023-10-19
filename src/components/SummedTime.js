import React, {useEffect, useState} from 'react';
import './SummedTime.css';

function SummedTime({secsToSum}) {
  const [sumTime, setSumTime] = useState(secsToSum);

  console.log(secsToSum);
  console.log(sumTime);
  
  
  useEffect(() => {
    setSumTime((sumTime) => sumTime + secsToSum);
  }, [secsToSum]);
  
  const hours = Math.floor(sumTime / 3600);
  const minutes = Math.floor((sumTime % 3600) / 60);

  return (
    <div className='summed-time'>
       <p>{`Duration: ${hours} hours ${minutes} minutes`}</p>
    </div>
  );
}

export default SummedTime;


