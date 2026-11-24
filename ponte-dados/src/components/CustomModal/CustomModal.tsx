'use client';

import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/navigation";
import { CustomButton } from "../CustomButton/CustomButton";
import { CustomButtonIcon } from "../CustomButtonIcon/CustomButtonIcon";
import styles from "./CustomModal.module.css";

interface CustomModalProps{
    title?: string;
    children?: React.ReactNode;
    show: boolean;
    nf?: string; 
    onClose: () => void;
}

export const CustomModal = (props: CustomModalProps) => {

    const { title, children, show, onClose, nf} = props;

    const router = useRouter();


    return(
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onClose}
      >
        <Modal.Header className={styles.header} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { title }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <CustomButtonIcon src="/icons/edit.svg" onclick={() => router.push(`/novo-pedido?nf=${nf}`)} name="edit" text="" type="button"></CustomButtonIcon>
          <CustomButton text="Fechar" name="closeModal" type="button" onclick={ onClose }/>
        </Modal.Footer>
      </Modal>
    )
}