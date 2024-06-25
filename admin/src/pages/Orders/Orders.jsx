import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/listOrders');
    if (response.data.Success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h2>Orders Page</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ', '}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', ' +
                    order.address.zipCode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>Total Price: $ {order.amount}</p>
            <select>
              <option value="food processing">food processing</option>
              <option value="out of delivery">out of delivery</option>
              <option value="delivered">delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
