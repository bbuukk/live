import Link from "next/link";

import { CustomTooltip } from "comps/tooltip";

import s from "./icon_button.module.scss";

const IconButton = ({ href, children, tooltipText }) => {
  return (
    <li>
      <CustomTooltip tooltipText={tooltipText}>
        <Link className={`${s.icon_btn}`} href={href}>
          {children}
        </Link>
      </CustomTooltip>
    </li>
  );
};

export default IconButton;
