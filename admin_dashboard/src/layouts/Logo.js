import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";
import LogoIcon from "../assets/images/logos/logo.png";

const Logo = () => {
  return (
      <Link to="/">
        <img src={LogoIcon} alt="logo" width={70} />
      </Link>
  );
};

export default Logo;
