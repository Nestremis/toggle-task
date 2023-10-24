import React from 'react';
import './InfoModal.css';

function InfoModal({ item, showInfo, onClose }) {
  if (!item) {
    return null; 
  }
  const modalStyle = showInfo ? {} : { display: 'none' };

  return (
    <div>
      {showInfo && (
        <div 
          className="modal"
          id={item.id}
          style={modalStyle}
        >
          <button className="close-button" onClick={onClose}>Close</button>

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

