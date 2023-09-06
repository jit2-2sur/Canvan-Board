import {useState } from "react";
import Modal from "react-modal";
import AddTask from "./form";
import "./form.css";

Modal.setAppElement("#root");
function ModalForm({ buttonName, tId }) {
    const [taskId, setTaskId] = useState(tId || "");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
        <div>
            <button className="btn2" onClick={openModal}>{ buttonName }</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="custom-modal"
            >
                <div className="centered-content">
                    <AddTask id={taskId} setTaskId={setTaskId} />
                </div>
                <button onClick={closeModal} className="close-button">Close</button>
            </Modal>
        </div>
        </>
    );
}

export default ModalForm;