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

          <div className="modal-content"> 
            <div className="modal-line">Task: <span className="bolder">{item.name}</span></div>
            <div className="modal-line">Duration: <span className="bolder">{item.duration}</span></div>
            <div className="modal-line">Start time: <span className="longer">{item.startDate}</span></div>
            <div className="modal-line">End Time: <span className="longer">{item.endDate}</span></div>
            <div className="modal-line">Created: <span className="longer">{item.createdTime}</span></div>
          </div>

      </div>
      )}
    </div>
  );
}

export default InfoModal;

