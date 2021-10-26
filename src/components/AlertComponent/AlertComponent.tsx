import s from "./AlertComponent.module.css";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/store";

const AlertComponent: React.FC = () => {
  const error = useSelector((state: StateType) => state.alertReducer.error);
  const success = useSelector((state: StateType) => state.alertReducer.success);

  return (
    <>
      {error && (
        <Alert variant="danger" className={s.alertError}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className={s.alertSuccess}>
          {success}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
