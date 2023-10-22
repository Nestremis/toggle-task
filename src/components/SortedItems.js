import React from 'react';
import './SortedItems.css';
import InfoModal from './InfoModal';

function SortedItems({ items, removeItem }) {
  return (
    <div>
      {items.map((item) => (
        <InfoModal 
          key={item.id} 
          item={item} 
          removeItem={removeItem} 
        />
      ))}
    </div>
  );
}

export default SortedItems;

