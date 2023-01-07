import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
export default function About() {
	// const a = useContext(noteContext);
	// useEffect(() => {
	// 	a.update();
	// 	// eslint-disable-next-line
	// }, []);
	return (
		<div>
			{/* this about {a.state.name} and he is in class {a.state.class} */}
			this about page
		</div>
	);
}
