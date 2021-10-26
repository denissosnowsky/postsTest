import s from "./ErrorPage.module.css";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Header from "../../components/Header/Header";

const ErrorPage: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Header
        text={"Back to the List"}
        btnOnClick={() => history.push("/posts")}
        color={"primary"}
        position={"start"}
        icon={"bi bi-arrow-left-circle"}
      />
      <Row>
        <div className={s.text}>{"Some Error"}</div>
      </Row>
    </>
  );
};

export default ErrorPage;
