import {createModel} from "@rematch/core";
import {RootModel} from ".";
import React from "react";

export interface INotePosition {
	x: number;
	y: number;
}

export interface IAnnotationData {
	id: string;
	note: string;
	position: INotePosition;
}

export interface IAnnotationAppearance {
	showBorder: boolean;
	borderWidth: number;
	borderStyle: React.CSSProperties["borderStyle"];
	borderColor: React.CSSProperties["borderColor"];
	fontSize: number;
	backgroundColor: React.CSSProperties["backgroundColor"];
}

export interface IAnnotation {
	show: boolean;
	showAddNoteBtn: boolean;
	notes: IAnnotationData[];
	appearance: IAnnotationAppearance;
}
const initialState: IAnnotation = {
	show: true,
	showAddNoteBtn: false,
	notes: [],
	appearance: {
		showBorder: true,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#000",
		fontSize: 12,
		backgroundColor: "#f6f6f6",
	},
};

export const annotation = createModel<RootModel>()({
	state: initialState,
	reducers: {
		update(state, payload: Partial<IAnnotation>): IAnnotation {
			return {
				...state,
				...payload,
			};
		},
		showAddNoteButton(state): IAnnotation {
			return {
				...state,
				showAddNoteBtn: true,
			};
		},
	},
	effects: (dispatch) => ({
		showAddNoteButton() {
			setTimeout(() => {
				dispatch.annotation.update({showAddNoteBtn: false});
			}, 30000);
		},
	}),
});
