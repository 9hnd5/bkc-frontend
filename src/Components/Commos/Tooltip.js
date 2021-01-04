// import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = (props) => {
//   let timeout;
  // const [active, setActive] = useState(props.active);

//   const showTip = () => {
//     timeout = setTimeout(() => {
//       setActive(true);
//     }, props.delay || 400);
//   };

//   const hideTip = () => {
//     clearInterval(timeout);
//     setActive(false);
//   };
//   useEffect(() => {
//       setActive(props.active);
//   }, [props.active]);
  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
    //   onMouseEnter={showTip}
    //   onMouseLeave={hideTip}
      style={{width: "100%"}}
    >
      {/* Wrapping */}
      {props.children}
      {props.active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
