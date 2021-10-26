import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./AddPostModal.module.css";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorThunk } from "../../redux/alertReducer";

interface AddPostModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addClb: (title: string, body: string) => void;
}

const AddPostModal: React.FC<AddPostModalPropsType> = ({
  isShow,
  setShow,
  addClb,
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const dispatch = useDispatch();

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (title && body) {
      addClb(title, body);
    } else {
      dispatch(setErrorThunk("Fill in all fields"));
    }
  };

  return (
    <Modal size="lg" show={isShow} onHide={() => {}} className={s.wrapper}>
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Add New Post
        </Modal.Title>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={body}
                onChange={(e) => setBody(e.target.value)}
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
              Add
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddPostModal;
