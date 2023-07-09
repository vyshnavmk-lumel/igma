import React, { useRef } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { IconButton } from "@mui/material";

interface ISideMenu {
  showSideMenu: boolean;
  toggleSideMenu: () => void;
}
const SideMenu = (props: ISideMenu) => {
  const { showSideMenu, toggleSideMenu } = props;
  const sideMenuOpenRef = useRef<HTMLDivElement>(null);

  const highlightIcon = () => {
    sideMenuOpenRef.current.style.opacity = "1";
  };
  const removeHighlight = () => {
    sideMenuOpenRef.current.style.opacity = "0.3";
  };
  const backgroundColor = "#3e1d95";
  const fontColor = "#c6c1e1";
  const btnBg = "#a092cb";
  const sideMenuWrapStyle: React.CSSProperties = {
    width: showSideMenu ? "220px" : "0",
    background: backgroundColor,
  };
  return (
    <>
      {!showSideMenu && (
        <div
          ref={sideMenuOpenRef}
          className="sideMenuOpener"
          onClick={toggleSideMenu}
          onMouseEnter={highlightIcon}
          onMouseLeave={removeHighlight}
        >
          <KeyboardArrowRightIcon fontSize="large" />
        </div>
      )}
      <aside className="sideMenuWrap" style={sideMenuWrapStyle}>
        {showSideMenu && (
          <button
            className="sideMenuCloser"
            onClick={toggleSideMenu}
            style={{ background: btnBg }}
          >
            <KeyboardArrowLeftIcon fontSize="large" style={{ color: "#fff" }} />
          </button>
        )}
      </aside>
      ;
    </>
  );
};

export default SideMenu;
