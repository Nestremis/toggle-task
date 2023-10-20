import React, {useState} from 'react';
import './SortedItems.css';
import { nanoid } from 'nanoid';
import InfoModal from './InfoModal';

function SortedItems({items}) {

  const [showRules, setShowRules] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setShowRules((current) => !current);
    setIsActive((current) => !current);
  };

  return (
    <>
      <div
        type="button"
        onClick={handleClick}
        id="infoButton"
      >
      {items.map((item) => (
        <div
          className='items'
          key={nanoid()}>
          {item}
        </div>
      ))}
    </div>
      <InfoModal />
      {showRules && (
        <div
          className="rules"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleClick}
        >
          {/* { content } */}
          <InfoModal />
        </div>
      )}
    </>
  );
}

export default SortedItems;

