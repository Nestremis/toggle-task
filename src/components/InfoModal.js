import React from 'react';
import './InfoModal.css';

function InfoModal({itemInfo}) {
  return (
    <div className='modal'>
      <p>{itemInfo}</p>      
         {/* {showInfo && (
        <div
          // className="rules"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleClick}
        >
          <InfoModal itemInfo />
        </div>
      )} */}
    </div>
  );
}

export default InfoModal;
