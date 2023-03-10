
// 상위 App
import { DatePicker } from "antd";

import "../../css/header/header.css";

function Header() {

    const onChange = () => {
      console.log("changed");
    }

    return (
      <div className="header">
        <span>Schedule Manager</span>
      </div>
    );
  }
  
  export default Header;
  