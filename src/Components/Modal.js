import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // Import the CSS for styling
import AuthForm from './SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { closeLoginModal } from './ModalSlice'; // Import close action
import { OrderConfirmed } from './OrderConfirmed';

export default function CustomModal() {
  const dispatch = useDispatch();
  const showLoginModal = useSelector(state => state.modal.showLoginModal);
  
  // Close modal handler
  const handleCloseModal = () => {
    dispatch(closeLoginModal());
  };

  return (
    <div className='z-10'>
    <Modal 
      open={showLoginModal === "SignUP" || showLoginModal === "Order"} 
      onClose={handleCloseModal} 
      
      center
      classNames= "rounded-lg border h-96"
    >
    {showLoginModal === "SignUP"  && <AuthForm handleCloseModal = {handleCloseModal} />}
    {showLoginModal === "Order"  && <OrderConfirmed handleCloseModal = {handleCloseModal} />}
    </Modal>
    </div>
  );
}
