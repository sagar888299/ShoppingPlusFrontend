import React, { useState } from 'react';
import Order from './Order'; 
import PaymentGateway from './PaymentGateway';

export default function Checkout() {
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
 
 
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Loading state

  const handlePayment = () => {
    setTimeout(() => {
      setPaymentStatus('success');
      alert('Payment successful! Payment ID: DUMMY12345');
    }, 2000);
  };

  const handleOpenPaymentGateway = () => {
    setIsPaymentGatewayOpen(true);
  };

  const handleClosePaymentGateway = () => {
    setIsPaymentGatewayOpen(false);
  };

  return (
    <div>
      <Order onMakePayment={handleOpenPaymentGateway} isOpen = {isOpen} setIsLoading = {setIsLoading} isLoading = {isLoading} setIsOpen = {setIsOpen} handlePayment = {handlePayment} handleOpenPaymentGateway = {handleOpenPaymentGateway} />
      {isPaymentGatewayOpen && (
        <PaymentGateway onClose={handleClosePaymentGateway} isOpen = {isOpen} paymentStatus = {paymentStatus}/>
      )}
    </div>
  );
}
