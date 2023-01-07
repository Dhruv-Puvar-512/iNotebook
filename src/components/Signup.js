import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
	});

	let history = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// const { name, email, password } = credentials;
		const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			//save the auth token and redirect
			localStorage.setItem("token", json.authtoken);
			history("/login");
			props.showAlert("Account Created Successfully", "success");
		} else {
			props.showAlert("Invalid Credentials", "danger");
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
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							name="name"
							type="text"
							className="form-control"
							id="name"
							aria-describedby="emailHelp"
							minLength={3}
							onChange={onChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<input
							name="email"
							type="email"
							className="form-control"
							id="email"
							aria-describedby="emailHelp"
							onChange={onChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							name="password"
							type="password"
							className="form-control"
							id="password"
							minLength={5}
							onChange={onChange}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="cpassword" className="form-label">
							Confirm Password
						</label>
						<input
							name="cpassword"
							type="password"
							className="form-control"
							id="cpassword"
							minLength={5}
							required
							onChange={onChange}
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Signup
					</button>
				</form>
			</div>
		</>
	);
}
