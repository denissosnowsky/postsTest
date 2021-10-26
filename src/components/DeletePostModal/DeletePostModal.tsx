import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./DeletePostModal.module.css";

interface DeletePostModalPropsType {
  isShow: number;
  setShow: (value: number) => void;
  deleteClb: () => void;
  title: string;
}

const DeletePostModal: React.FC<DeletePostModalPropsType> = ({
  isShow,
  setShow,
  deleteClb,
  title,
}) => {
  const handleCancel = () => {
    setShow(0);
  };

  const handleConfirm = () => {
    deleteClb();
    setShow(0);
  };

  return (
    <Modal
      size="lg"
      show={Boolean(isShow)}
      onHide={() => {}}
      className={s.wrapper}
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          {`Do You really want to delete "${title}" post?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              No
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              className="my-2 w-75"
              onClick={handleConfirm}
            >
              Yes
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default DeletePostModal;