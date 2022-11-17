import React from "react";
import { useEffect } from "react";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import { useState } from "react";
import { checkDate } from "../utils/time";
import CommentsItem from "../components/CommentsItem";
import Loader from "../components/UI/Loader";
import "../styles/app.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	let history = useHistory();
	const [fetchPostById, isPostsLoading, errorPost] = useFetching(async () => {
		const response = await PostService.getById(params.id);
		setPost(response);
	});

	const [fetchComments, isCommentsLoading] = useFetching(async () => {
		const response = await PostService.getComments(params.id);
		setComments(response);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);

	if(!post) {
		return (<NotFound/>)
	}

	return (
		<div className="container">
			<div className="post">
				<button className="post__btn" onClick={() => history.push(`/news`)}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
				<div className="post__content">
					<a className="post__title" href={post.url} target="_blank">
						{post.title}
					</a>
					<div className="post__data">
						<div className="post__score">{post.score}</div>
						<a
							className="post__author"
							href={"https://news.ycombinator.com/user?id=" + post.by}
						>
							{post.by}
						</a>
						|<p>{checkDate(post.time)}</p>|<p>{post.descendants} comments</p>
					</div>
				</div>
			</div>
			<div className="comments">
				<h3 className="comments__title">Comments</h3>
				<button
					className="comments__btn"
					onClick={() => fetchComments(post.id)}
				>
					<FontAwesomeIcon icon={faRotate} />
				</button>
			</div>
			{isCommentsLoading ? (
				<Loader />
			) : (
				<div>
					{comments &&
						comments.map((comment) => (
							<CommentsItem comment={comment} key={comment.id} />
						))}
				</div>
			)}
		</div>
	);
};

export default PostIdPage;
