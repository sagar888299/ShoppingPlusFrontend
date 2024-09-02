import React, { useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import confetti from 'canvas-confetti';
import 'react-responsive-modal/styles.css';
import { useNavigate } from 'react-router-dom';
import { closeLoginModal } from './ModalSlice';
import { useDispatch } from 'react-redux';

export function OrderConfirmed({ handleCloseModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseModalAndNavigate = () => {
    dispatch(closeLoginModal("false"));
    navigate("/");
  };

  useEffect(() => {
    // Launch confetti when the modal opens
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <Modal open={true} onClose={handleCloseModal} center classNames={{ modal: 'rounded-lg p-8' }}>
      <div className="text-center">
        <div className="checkmark-container mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            className="checkmark"
          >
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14 26l7.6 7.6L38 18" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
        <p className="mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            onClick={() => navigate("/myOrder")}
          >
            Track Order
          </button>
          <button
            onClick={handleCloseModalAndNavigate}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
