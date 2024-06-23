import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useContext } from 'react';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const Success = searchParams.get('Success');
  const orderId = searchParams.get('orderId');
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + '/api/order/verify', {
      Success,
      orderId,
    });
    console.log(Success, orderId);
    console.log(response.data.Success);
    if (response.data.Success) {
      navigate('/myorders');
    } else {
      navigate('/');
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
