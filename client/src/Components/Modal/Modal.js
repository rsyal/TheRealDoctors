import React from "react";
import ReactModal from 'react-modal';

const Modal = ({ handleClose, show, children, btnText }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <ReactModal 
           isOpen={show}
           contentLabel="Minimal Modal Example"
        > {children}
        <button onClick={handleClose}>{btnText}</button>
        </ReactModal>
      </div>

     /* { <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>} */

  );
}

export default Modal;