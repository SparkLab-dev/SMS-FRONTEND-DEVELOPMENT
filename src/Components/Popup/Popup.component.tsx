import { FC, ReactNode } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "./style/Popup.style";

import GenericButton from "Components/GenericButton/GenericButton.component";
type popupProps = {
  isOpen?: boolean;
  onClose?: any;
  headerContent?: ReactNode;
  bodyContent?: ReactNode;
  footerContent?: ReactNode;
};
const Popup: FC<popupProps> = ({
  isOpen,
  onClose,
  headerContent,
  bodyContent,
  footerContent,
}) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>{headerContent}</ModalHeader>
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>
          {footerContent}
          <GenericButton onClick={onClose} name="Close" />
        </ModalFooter>
      </Modal>
    </ModalOverlay>
  );
};

export default Popup;
