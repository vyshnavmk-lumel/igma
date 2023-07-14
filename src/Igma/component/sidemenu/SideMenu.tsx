import React, { useRef } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { NumberSize, Resizable } from "re-resizable";
import { ColorPalletService } from "../../service/ColorPalletService";
import { Direction } from "re-resizable/lib/resizer";

interface ISideMenu {
  showSideMenu: boolean;
  sideMenuWidth: number;
  toggleSideMenu: () => void;
  setSideMenuWidth: (sideMenuWidth: number) => void;
}
const SideMenu = (props: ISideMenu) => {
  const { showSideMenu, toggleSideMenu, sideMenuWidth, setSideMenuWidth } =
    props;
  const { backgroundColor, buttonBackground } =
    ColorPalletService.getColorPallet().sideMenu;
  const sideMenuOpenRef = useRef<HTMLDivElement>(null);

  const highlightIcon = () => {
    sideMenuOpenRef.current.style.opacity = "1";
  };
  const removeHighlight = () => {
    sideMenuOpenRef.current.style.opacity = "0.3";
  };
  const sideMenuWrapStyle: React.CSSProperties = {
    width: showSideMenu ? "100%" : 0,
    background: backgroundColor,
  };
  const handleResize = (
    event: MouseEvent | TouchEvent,
    direction: Direction,
    elementRef: HTMLElement,
    delta: NumberSize
  ) => {
    setSideMenuWidth(sideMenuWidth + delta.width);
  };
  const sideMenuContainerStyle: React.CSSProperties = {
    borderRight: showSideMenu ? "solid 6px transparent" : "none",
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
      <Resizable
        className="sideMenuContainer"
        style={sideMenuContainerStyle}
        size={{
          width: sideMenuWidth,
          height: "100vh",
        }}
        enable={{ right: true }}
        onResizeStop={handleResize}
        minWidth={showSideMenu ? 100 : 0}
        maxWidth={400}
      >
        <aside className="sideMenuWrap" style={sideMenuWrapStyle}>
          {showSideMenu && (
            <button
              className="sideMenuCloser"
              onClick={toggleSideMenu}
              style={{ background: buttonBackground }}
            >
              <KeyboardArrowLeftIcon
                fontSize="large"
                style={{ color: "#fff" }}
              />
            </button>
          )}
        </aside>
      </Resizable>
    </>
  );
};

export default SideMenu;
