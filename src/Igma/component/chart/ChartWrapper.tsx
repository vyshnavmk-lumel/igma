import classNames from "classnames";
import React, {useState} from "react";
import {connect} from "react-redux";
import {IDispatch, IRootState} from "../../store/store";
import SideMenu from "../sidemenu/SideMenu";
import AnnotationWrapper from "./annotation/AnnotationWrapper";

const DEFAULT_SIDE_MENU_WIDTH = 220;

type IChartWrapper = TMapState & TMapDispatch;
const ChartWrapper = (props: IChartWrapper) => {
	const {dimensions, showAddBtn: annotationAddBtn} = props;
	const [showSideMenu, setSideMenu] = useState(false);
	const [sideMenuWidth, setSideMenuWidth] = useState(0);
	const toggleSideMenu = () => {
		setSideMenuWidth(showSideMenu ? 0 : DEFAULT_SIDE_MENU_WIDTH);
		setSideMenu(!showSideMenu);
	};
	const wrapperStyle: React.CSSProperties = {
		height: dimensions.height,
		width: "100%",
	};

	return (
		<div className="chartWrapper" style={wrapperStyle}>
			<SideMenu
				showSideMenu={showSideMenu}
				toggleSideMenu={toggleSideMenu}
				sideMenuWidth={sideMenuWidth}
				setSideMenuWidth={setSideMenuWidth}
			/>
			<AnnotationWrapper showSideMenu={showSideMenu} sideMenuWidth={sideMenuWidth} />
		</div>
	);
};

const mapState = (state: IRootState) => ({
	dimensions: state.dimensions,
	showAddBtn: state.annotation.showAddNoteBtn,
});
const mapDispatch = (dispatch: IDispatch) => ({});
type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(ChartWrapper);
