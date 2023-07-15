import React from "react";
import Chart from "../Chart";
import Annotation from "./Annotation";

interface IAnnotationProps {
	showSideMenu: boolean;
	sideMenuWidth: number;
}

const AnnotationWrapper = (props: IAnnotationProps) => {
	const {showSideMenu, sideMenuWidth} = props;
	const chartContainerStyle: React.CSSProperties = {
		width: showSideMenu ? `calc(100% - ${sideMenuWidth}px)` : "100%",
	};
	return (
		<main className="chartContainer" style={chartContainerStyle}>
			<Chart />
			<Annotation />
		</main>
	);
};

export default AnnotationWrapper;
