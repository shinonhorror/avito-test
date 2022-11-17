import React from "react";
import { checkDate } from "../utils/time";
import { useHistory } from "react-router-dom";

import "../styles/app.scss";

const PostItem = (props) => {
	let history = useHistory();
	const { title, id, score, by, time, descendants } = props.post;
	return (
		<div className="newsItem">
			<a
				className="newsItem__title"
				onClick={() => history.push(`/news/${id}`)}
			>
				{title}
			</a>
			<div className="newsItem__content">
				<div className="newsItem__score">{score}</div>|
				<a
					className="newsItem__author"
					href={"https://news.ycombinator.com/user?id=" + by}
					target="_blank"
				>
					{by}
				</a>
				|<div>{checkDate(time)}</div>|<div>{descendants} comments</div>
			</div>
		</div>
	);
};

export default PostItem;
