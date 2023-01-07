import NoteContext from "./noteContext";
import { useState } from "react";
export default function NoteState(props) {
	// const s1 = {
	// 	name: "Harry",
	// 	class: "5b",
	// };

	// const [state, setSate] = useState(s1);
	// const update = () => {
	// 	setTimeout(() => {
	// 		setSate({
	// 			name: "larry",
	// 			class: "10b",
	// 		});
	// 	}, 3000);
	// };
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);

	const host = "http://localhost:5000";

	//get all notes
	const getNotes = async () => {
		//Api call
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});

		const note = await response.json();
		setNotes(note);
	};

	//Add a Note
	const addNote = async (title, description, tag) => {
		//Api call
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();
		setNotes(notes.concat(json));
	};

	//Edit a Note
	const editNote = async (id, title, description, tag) => {
		//Api call
		// eslint-disable-next-line
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }),
		});

		// eslint-disable-next-line
		// const json = await response.json();

		let newNotes = JSON.parse(JSON.stringify(notes));
		//logic to edit in client
		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};

	//Delete a Note
	const deleteNote = async (id) => {
		//Api call
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});

		const note = await response.json();
		setNotes(note);

		// console.log("deleting note" + id);
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	return (
		// <NoteContext.Provider value={{ state: state, update: update }}>
		// 	{props.children}
		// </NoteContext.Provider>
		<NoteContext.Provider
			value={{ notes, addNote, editNote, deleteNote, getNotes }}
		>
			{props.children}
		</NoteContext.Provider>
	);
}
