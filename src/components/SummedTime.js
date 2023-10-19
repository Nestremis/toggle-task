import React, {useEffect, useState} from 'react';
import './SummedTime.css';

function SummedTime({secsToSum}) {
  const [sumTime, setSumTime] = useState(secsToSum);
    
  useEffect(() => {
    setSumTime((sumTime) => sumTime + secsToSum);
  }, [secsToSum]);
  
  const hours = Math.floor(sumTime / 3600);
  const minutes = Math.floor((sumTime % 3600) / 60);

  return (
    <div className='summed-time'>
       <p>{`All tasks duration: ${hours} hours ${minutes} minutes`}</p>
    </div>
  );
}

export default SummedTime;


