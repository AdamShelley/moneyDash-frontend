import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      {!props.noHeader && (
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
      )}
      {props.noForm ? (
        <div className="form-content">{props.children}</div>
      ) : (
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
          {!props.noFooter && (
            <footer className={`modal__footer ${props.footerClass}`}>
              {props.footer}
            </footer>
          )}
        </form>
      )}
    </div>
  );
  if (props.notModalHook) {
    return content;
  } else {
    return ReactDOM.createPortal(
      content,
      document.getElementById("modal-hook")
    );
  }
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {/* Black background Modal */}
      {props.show && props.asOverlay && !props.overlayTransparent && (
        <Backdrop onClick={props.onCancel} />
      )}
      {/* Transparent background Modal */}
      {props.show && props.asOverlay && props.overlayTransparent && (
        <Backdrop transparentModal onClick={props.onCancel} />
      )}
      {/* No background */}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default Modal;
