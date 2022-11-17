import React from "react";
import { Redirect} from "react-router-dom";
import { useHistory } from "react-router-dom";

function NotFound() {
	let history = useHistory();
	return (
		<div className="notFound">
			<div className="notFound__content">
				<h1 className="notFound__title">404</h1>
				<div className="notFound__desc">Oops, page is not found!</div>
				<button
					className="notFound__btn"
					onClick={() => history.push(`/news`)}
				>
					Back to home page
				</button>
			</div>
		</div>
	);
}

export default NotFound;
