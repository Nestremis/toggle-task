import React from 'react';
import './Content.css';
import TicketForm from './TicketForm';
import SummedTime from './SummedTime';
import SortedItems from './SortedItems';
import InfoModal from './InfoModal'; 

function Content() {
  return (
    <main>
     <TicketForm />
     <SummedTime />
     <SortedItems />
     <InfoModal />
    </main>
  );
}

export default Content;
