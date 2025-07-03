import React, { useState } from 'react';
import DroneGame from './DroneGame';

const DroneGameWrapper = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <DroneGame onPlayInWindow={openModal} />
      {showModal && (
        <DroneGame 
          inModal={true} 
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default DroneGameWrapper;