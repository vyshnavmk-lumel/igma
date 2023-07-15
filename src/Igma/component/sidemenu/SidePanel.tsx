import React from "react";
import {connect} from "react-redux";
import {IDispatch, IRootState} from "../../store/store";

type ISidePanel = TMapState & TMapDispatch;

const SidePanel = (props: ISidePanel) => {
    const {showAddNoteButton} = props;
   
	return (
		<div>
			<h2>SidePanel</h2>
			<button onClick={showAddNoteButton}> Add annotation </button>
		</div>
	);
};

const mapState = (state: IRootState) => ({
});
const mapDispatch = (dispatch: IDispatch) => ({
    showAddNoteButton: dispatch.annotation.showAddNoteButton,
});
type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(SidePanel);
