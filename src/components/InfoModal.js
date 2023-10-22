import React, { useState } from 'react';
import './InfoModal.css';
import { ReactComponent as DeleteIcon } from '../icons/cross.svg';

function InfoModal({ item, removeItem }) {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (

    <div 
      className="items" 
      key={item.id} 
      id={item.id} 
      onClick={handleClick}
    >
      {item.name}
      
      <div 
        className="remove-button" 
        onClick={() => removeItem(item.id)}
      >
        <DeleteIcon className="delete" width="4vmin" height="4vmin" />
      </div>

      {showInfo && (
        <div 
          className="modal"
          key={item.key}
          id={item.id}
        >
         <p> {item.name} {item.duration} </p>      
      </div>
      )}
    </div>
  );
}

export default InfoModal;

