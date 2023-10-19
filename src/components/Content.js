import React from 'react';
import './Content.css';
import TicketForm from './TicketForm';
// import SortedItems from './SortedItems';
import InfoModal from './InfoModal'; 

function Content() {
  return (
    <main>
     <TicketForm />
     {/* <SortedItems /> */}
     <InfoModal />
    </main>
  );
}

export default Content;
