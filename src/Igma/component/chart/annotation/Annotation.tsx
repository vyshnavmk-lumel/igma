import React, { useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import {uniqueId} from "lodash";
import {IDispatch, IRootState} from "../../../store/store";
import AnnotationEditor from "./AnnotationEditor";

const Annotation = () => {
	const {notes, showAddNoteBtn} = mapState();
	const updateAnnotation = mapDispatch();
    const annotationCanvasRef = useRef<HTMLDivElement>(null);
	const addNewNote = (e: React.MouseEvent) => {
		if (!showAddNoteBtn) return;
		const target = e.target as HTMLElement;
		const {left, top, width, height} = target.getBoundingClientRect();
		const x = ((e.clientX - left) / width) * 100;
		const y = ((e.clientY - top) / height) * 100;
		const noteId = uniqueId("annotation_");
		updateAnnotation({notes: [...notes, {id: noteId, note: noteId, position: {x, y}}], showAddNoteBtn: false});
	};
	return (
		<>
			{showAddNoteBtn && <div ref={annotationCanvasRef} onClick={addNewNote} className="annotationCanvas" />}
			{notes.map((note) => (
				<AnnotationEditor annotationCanvasRef={annotationCanvasRef} annotationData={note} />
			))}
		</>
	);
};

const mapState = () => {
	return useSelector((state: IRootState) => ({
		notes: state.annotation.notes,
		showAddNoteBtn: state.annotation.showAddNoteBtn,
	}));
};

const mapDispatch = () => {
	return useDispatch<IDispatch>().annotation.update;
};

export default Annotation;
