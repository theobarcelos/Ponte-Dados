'use client';

import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { CustomButton } from "../CustomButton/CustomButton";

interface CustomModalProps{
    title?: string;
    children?: React.ReactNode;
    show: boolean;
    onClose: () => void;
}

export const CustomModal = (props: CustomModalProps) => {
    
    const [modalShow, setModalShow] = useState(true);

    const { title, children, show, onClose } = props;

    return(
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { title }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text="Fechar" name="closeModal" type="button" onclick={ onClose }/>
        </Modal.Footer>
      </Modal>
    )
}