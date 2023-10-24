// import React from 'react';
// import './SortedItems.css';
// import InfoModal from './InfoModal';

// function SortedItems({ items, removeItem }) {
//   return (
//     <div>
//       {items.map((item) => (
//         <InfoModal 
//           key={item.id} 
//           item={item} 
//           removeItem={removeItem} 
//         />
//       ))}
//     </div>
//   );
// }

// export default SortedItems;
import React, {useState} from 'react';
import './SortedItems.css';
import InfoModal from './InfoModal';
import { ReactComponent as DeleteIcon } from '../icons/cross.svg';

function SortedItems({ items, removeItem }) {
  const [showInfo, setShowInfo] = useState(null);

  const handleClick = (item) => {
    if (showInfo === item.id) {
      setShowInfo(null); 
    } else {
      setShowInfo(item.id);
    }
  };


  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>

          <div
            className="items"
            id={item.id}
            onClick={() => handleClick(item)}
          >
            {item.name}
            <div
              className="remove-button"
              onClick={() => removeItem(item.id)}
            >
              <DeleteIcon className="delete" width="4vmin" height="4vmin" />
            </div>
          </div>

          <InfoModal
            key={item.id}
            item={items.find((item) => item.id === showInfo)}
            removeItem={removeItem}
            showInfo={showInfo} 
            onClose={() => setShowInfo(null)}
          />

        </div>
      ))}
    </div>
  );
}

export default SortedItems;