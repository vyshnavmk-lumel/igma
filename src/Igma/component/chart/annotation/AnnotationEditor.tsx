import React, {useRef} from "react";
import Draggable from "react-draggable";
import {IAnnotationData} from "../../../store/models/annotation";
import {useDispatch, useSelector} from "react-redux";
import {IDispatch, IRootState} from "../../../store/store";

interface IAnnotationEditorProps {
	annotationData: IAnnotationData;
	annotationCanvasRef: React.MutableRefObject<HTMLDivElement>;
}
const AnnotationEditor = ({annotationData, annotationCanvasRef}: IAnnotationEditorProps) => {
	console.log("annotationData", annotationData);

	const {note, position, id} = annotationData;
	const updateAnnotation = mapDispatch();
	const {appearance, notes} = mapState();
	const {fontSize, backgroundColor, showBorder, borderColor, borderWidth, borderStyle} = appearance;
	const currentAnnotationRef = useRef<HTMLDivElement>(null);
	const showAnnotationCanvas = () => {
		updateAnnotation({showAddNoteBtn: true});
	};
	const hideAnnotationCanvas = () => {
		updateAnnotation({showAddNoteBtn: false});
	};
	const border: React.CSSProperties["border"] = showBorder ? `${borderWidth}px ${borderStyle} ${borderColor}` : "none";
	const annotationItemStyle: React.CSSProperties = {left: `${position.x}%`, top: `${position.y}%`, backgroundColor, fontSize, border, transform: "none"};
	const onStop = () => {
		const {clientWidth, clientHeight} = annotationCanvasRef.current;
		const target = currentAnnotationRef.current;
		const x = (target.offsetLeft / clientWidth) * 100;
		const y = (target.offsetHeight / clientHeight) * 100;
		const newNotes = notes.map((note) => {
			if (note.id === id) {
				return {...annotationData, position: {x, y}};
			}
			return note;
		});
        setTimeout(() => {
            updateAnnotation({notes: newNotes});
        }, 250);
	};

	return (
		<Draggable onStop={onStop}>
			<div
				ref={currentAnnotationRef}
				className="annotation-item"
				onMouseEnter={showAnnotationCanvas}
				onMouseLeave={hideAnnotationCanvas}
				style={annotationItemStyle}
			>
				{note}
			</div>
		</Draggable>
	);
};

const mapState = () => {
	return useSelector((state: IRootState) => ({
		appearance: state.annotation.appearance,
		notes: state.annotation.notes,
	}));
};
const mapDispatch = () => {
	return useDispatch<IDispatch>().annotation.update;
};

export default AnnotationEditor;
