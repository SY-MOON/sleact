import React, { CSSProperties, FC, useCallback } from 'react';
import { CloseModalButton, CreateModal } from './style';
interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  closeButton?: boolean;
}

const Modal: FC<Props> = ({ children, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

Modal.defaultProps = {
  closeButton: true,
};

export default Modal;
