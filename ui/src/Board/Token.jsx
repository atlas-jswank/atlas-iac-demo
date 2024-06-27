import Mascot from "../assets/mascot.png";
import MascotBlue from "../assets/mascot-blue.png";

export function Token() {
  return <img className="token" src={Mascot} />;
}

export function TokenBlue() {
  return <img className="token" src={MascotBlue} />;
}
