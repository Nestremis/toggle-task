import React from 'react';
import './SortedItems.css';

function SortedItems({taskName}) {
  return (
    <div className='items'>
      <p>{taskName}</p>
    </div>
  );
}

export default SortedItems;
