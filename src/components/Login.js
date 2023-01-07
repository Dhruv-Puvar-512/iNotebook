import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
	const [credentials, setCredentials] = useState({ email: "", password: "" });

	let history = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://localhost:5000/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			//save the auth token and redirect
			localStorage.setItem("token", json.authtoken);
			props.showAlert("logged in Successfully", "success");
			history("/");
		} else {
			props.showAlert("Invalid Details", "danger");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="container m-5">
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<input
							name="email"
							value={credentials.email}
							onChange={onChange}
							type="email"
							className="form-control"
							id="email"
							aria-describedby="emailHelp"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label ">
							Password
						</label>
						<input
							name="password"
							value={credentials.password}
							onChange={onChange}
							type="password"
							className="form-control "
							id="password"
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Login
					</button>
				</form>
			</div>
		</>
	);
}
