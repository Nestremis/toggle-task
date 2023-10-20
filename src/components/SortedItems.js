// import React, {useState} from 'react';
// import './SortedItems.css';
// import { nanoid } from 'nanoid';
// import InfoModal from './InfoModal';

// function SortedItems({items}) {

//   const [showInfo, setShowInfo] = useState(false);
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     setShowInfo((current) => !current);
//     setIsActive((current) => !current);
//   };

//   return (
//     <>
//       <div
//         type="button"
//         onClick={handleClick}
//         id="infoButton"
//       >
//       {items.map((item) => (
//         <div
//           className='items'
//           key={nanoid()}
//         >
//           {item}

//           {showInfo && (
//             <div
//               role="button"
//               tabIndex={0}
//               onClick={handleClick}
//               onKeyPress={handleClick}
//             >
//               <InfoModal itemInfo={item} />
//             </div>
//           )}

//         </div>
//       ))}
//     </div>
//     </>
//   );
// }

// export default SortedItems;

import React, { useState, useRef, useEffect } from 'react';
import './SortedItems.css';
import { nanoid } from 'nanoid';
import InfoModal from './InfoModal';

function SortedItems({ items }) {
  const [showInfo, setShowInfo] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef(null);

  const handleClick = () => {
    setShowInfo((current) => !current);
    setIsActive((current) => !current);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowInfo(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div type="button" onClick={handleClick} id="infoButton">
      {items.map((item) => (
        <div className="items" key={nanoid()}>
          {item}

          {showInfo && (
            <div ref={modalRef}>
              <InfoModal itemInfo={item} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SortedItems;
