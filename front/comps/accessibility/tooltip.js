import { Tooltip, OverlayTrigger } from "react-bootstrap";
import s from "./tooltip.module.scss";

export const CustomTooltip = ({
  children,
  tooltipText,
  placement = "bottom",
  show = 400,
  hide = 200,
}) => {
  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: show, hide: hide }}
      overlay={renderTooltip(tooltipText)}
    >
      {children}
    </OverlayTrigger>
  );
};

function renderTooltip(props) {
  return <Tooltip className={`${s.tooltip}`}>{props}</Tooltip>;
}
