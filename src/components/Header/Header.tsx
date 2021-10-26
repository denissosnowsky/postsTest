import s from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface HeaderPropsType {
  btnOnClick: () => void;
  text: string;
  color: string;
  position: "end" | "start";
  icon?: string;
  secondBtn?: boolean;
  secBtnOnClick?: () => void;
  secText?: string;
}

const Header: React.FC<HeaderPropsType> = ({
  btnOnClick,
  text,
  color,
  position,
  icon,
  secondBtn,
  secBtnOnClick,
  secText,
}) => {
  return (
    <div className={s.header}>
      <Container className={s.container} style={{ justifyContent: position }}>
        {position === "end" && secondBtn && (
          <Button
            onClick={() => secBtnOnClick && secBtnOnClick()}
            size="lg"
            className={s.secBtn}
            variant="info"
          >
            {secText}
          </Button>
        )}
        <Button onClick={() => btnOnClick()} variant={color} size="lg">
          {icon && <i className={icon}></i>} {text}
        </Button>
        {position === "start" && secondBtn && (
          <Button
            onClick={() => secBtnOnClick && secBtnOnClick()}
            size="lg"
            className={s.secBtn}
            variant="info"
          >
            {secText}
          </Button>
        )}
      </Container>
    </div>
  );
};

export default Header;
