import React, {useState} from 'react'
import logoSrc from "../../static/images/logo_without_name.png";
import Modal from 'react-modal';
import cityViewImage from "../../static/images/cityofgold.jpg";
import { MdOutlineClose } from "react-icons/md";

const AssetDetails = ({id}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Open Popup on Image Click
    const openModal = () => setIsOpen(true);
    
    // Close popup
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <div className='conversion__image active' onClick={() => setIsOpen}>
                <img src={logoSrc} alt="conversion-image" width={400} height={400}/>
            </div>
            <>
                <div className='conversion__image active' onClick={openModal}>
                    <img src={cityViewImage} alt="conversion-image" width={400} height={400} />
                </div>
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
                            <img src={cityViewImage} alt="conversion-image" width={200} height={200} />
                        </div>
                        <div className='asset__image__popup__content'>
                            <h1>Demo Heading</h1>
                            <ul className='asset__feature__list'>
                                <li>Feature 1 : Hello</li>
                                <li>Feature 2 : No Of bedroom</li>
                                <li>Feature 3 : </li>
                                <li>Feature 4 :</li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </>
        </>
    )
}

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 10,
        backgroundColor: "#161616",
        border: "none",
        borderRadius: "none",

    },
    overlay: {
        zIndex: 2,
        backgroundColor: "rgba(0, 0, 0, 0.9)"

    }
}

export default AssetDetails
