import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./ChangePostModal.module.css";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorThunk } from "../../redux/alertReducer";

interface ChangePostModalPropsType {
  title: string;
  body: string;
  isShow: number;
  setShow: (value: number) => void;
  changeClb: (title: string, body: string) => void;
}

const ChangePostModal: React.FC<ChangePostModalPropsType> = ({
  title,
  body,
  isShow,
  setShow,
  changeClb,
}) => {
  const [titleVar, setTitleVar] = useState<string>(title);
  const [bodyVar, setBodyVar] = useState<string>(body);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setShow(0);
  };

  const handleAdd = () => {
    if (titleVar && bodyVar) {
      changeClb(titleVar, bodyVar);
      setShow(0);
    } else {
      dispatch(setErrorThunk("Fill in all fields"));
    }
  };

  return (
    <Modal
      size="lg"
      show={Boolean(isShow)}
      onHide={() => {}}
      className={s.wrapper}
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">Change Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="m-3" controlId="title">
            <Col md={3} className={s.firstCol}>
              <Form.Label column sm="2">
                Title:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Fill in the title"
                value={titleVar}
                onChange={(e) => setTitleVar(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="body">
            <Col md={3} className={s.firstCol}>
              <Form.Label column sm="2">
                Body:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                as="textarea"
                placeholder="Fill in the body"
                value={bodyVar}
                onChange={(e) => setBodyVar(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="success" className="my-2 w-75" onClick={handleAdd}>
              Change
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePostModal;
