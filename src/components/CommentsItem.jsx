import React, { useState } from "react";
import PostService from "../API/PostService";
import { checkDate } from "../utils/time";
import { useFetching } from "./hooks/useFetching";
import "../styles/app.scss";

const CommentsItem = (props) => {
	const [kidsComments, setKidsComments] = useState([]);
	const [visible, setVisible] = useState("");
	const { text, by, time, kids, id } = props.comment;

	const [fetchComments] = useFetching(async () => {
		const response = await PostService.getComments(id);
		setKidsComments(response);
	});

	const downloadKidsComments = () => {
		setVisible("true");
		fetchComments(id);
	};

	const hideComments = () => {
		setVisible("");
		setKidsComments([]);
	};

	return (
		<div className="comment">
			{by ? (
				<div className="comment__content">
					<a
						className="comment__author"
						href={"https://news.ycombinator.com/user?id=" + by}
						target="_blank"
					>
						{by}
					</a>
					<div className="comment__text">
						<div dangerouslySetInnerHTML={{ __html: text }}></div>
					</div>
					<div className="comment__date">
						<span>{checkDate(time)}</span>
					</div>
					{kids && (
						<div>
							{visible ? (
								<a className="comment__btn" onClick={() => hideComments()}>
									Hide comments
								</a>
							) : (
								<a
									className="comment__btn"
									onClick={() => downloadKidsComments()}
								>
									<div>Show {kids.length} comments</div>
								</a>
							)}
						</div>
					)}
					{kidsComments && (
						<div className="comment__group">
							{kidsComments.map((comment) => (
								<CommentsItem comment={comment} key={comment.id} />
							))}
						</div>
					)}
				</div>
			) : (
				<div className="comment__content">
					<div className="comment__text">
						<div>Removed comment</div>
					</div>
					<div className="comment__date">
						<span>{checkDate(time)}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentsItem;
