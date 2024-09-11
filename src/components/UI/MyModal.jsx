"use client";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ApplicationContext } from "../../context/application-context";

const MyModal = () => {
  const { isModalVisible, showModal, modalTitle, html } =
    useContext(ApplicationContext);

  return (
    <Modal show={isModalVisible} onHide={() => showModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{html ? html : ""}</Modal.Body>
    </Modal>
  );
};

export default MyModal;
