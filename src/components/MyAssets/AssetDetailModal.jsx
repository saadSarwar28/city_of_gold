/***
 * This is Popup component for Asset 
 ***/

import React from 'react'
import Modal from "react-modal"
import { MdOutlineClose } from "react-icons/md";

const AssetDetailModal = ({
  isOpen, 
  closeModal,
  heading,
  featureOne,
  featureTwo,
  featureThree,
  featureFour,
  imgSrc,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={styles}
    >
      <div className='asset__image__popup'>
        <MdOutlineClose
          size={20}
          className="close-button"
          onClick={closeModal}
        />
        <div className='asset__image__popup__image'>
          <img 
            src={imgSrc} 
            alt="asset-image" 
            width={200} 
            height={200} 
          />
        </div>
        <div className='asset__image__popup__content'>
          <h1>{heading}</h1>
          <ul className='asset__feature__list'>
            <li>Feature 1 : {featureOne}</li>
            <li>Feature 2 : {featureTwo}</li>
            <li>Feature 3 : {featureThree}</li>
            <li>Feature 4 : {featureFour}</li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}

// Styling for Modal
const styles = {
  // Modal Content Styling
  content: {
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    backgroundColor: "#161616",
    border: "none",
    borderRadius: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    inset: "auto",
    marginInline: "20px",

  },

  // Modal Overlay styling
  overlay: {
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "0 20px",
  }
}

export default AssetDetailModal