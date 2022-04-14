import React, { useState } from 'react';
import './OrderFilter.css';
import { OrderFilterButton } from './OrderFilterButton';
const ORDERS = ['RATING', 'LAST_UPDATE'];
const OrderFilter = () => {
  const [hiddenPannel, setHiddenPannel] = useState(true);

  const mouseLeaveHandler = () => {
    setHiddenPannel(true);
  };

  const clickHandler = () => {
    setHiddenPannel(!hiddenPannel);
  };

  return (
    <div className='order-filter' onMouseLeave={mouseLeaveHandler}>
      <button className='button' onClick={clickHandler}>
        Order
        <img className='button__icon' src='/assets/arrow_icon.webp' />
      </button>
      {hiddenPannel ? (
        ''
      ) : (
        <div className='order-panel'>
          {ORDERS.map((order) => {
            return <OrderFilterButton key={order} order={order} />;
          })}
        </div>
      )}
    </div>
  );
};

export { OrderFilter };
