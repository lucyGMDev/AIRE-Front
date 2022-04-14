import React, { useContext } from 'react';
import { FiltersContext } from '../../context/FiltersContext';
const OrderFilterButton = ({ order }) => {
  const { orderFilters, setOrderFilters } = useContext(FiltersContext);
  const clickHandler = () => {
    if (orderFilters !== order) {
      setOrderFilters(order);
    } else {
      setOrderFilters('');
    }
  };

  return (
    <button
      className={`blue-button ${
        orderFilters === order ? 'blue-button--checked' : ''
      }`}
      onClick={clickHandler}
    >
      {order}
    </button>
  );
};

export { OrderFilterButton };
