import { React, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
	const context = useContext(noteContext);
	const { note, updateNote } = props;
	const { deleteNote } = context;
	return (
		<div className="col-md-3 my-2">
			<div className="card my-3">
				<div className="card-body">
					<div className="d-flex align-middle">
						<h5 className="card-title mx-2">{note.title}</h5>
						<i
							onClick={() => {
								deleteNote(note._id);
								props.showAlert("Note Deleted Successfully", "success");
							}}
							className="fa-solid fa-trash-can my-1 mx-1"
						></i>
						<i
							onClick={() => {
								updateNote(note);
							}}
							className="fa-solid fa-pen-to-square my-1 mx-1"
						></i>
					</div>
					<hr />
					<p className="card-text">{note.description}</p>
				</div>
			</div>
		</div>
	);
}
