import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title }) => {
	return (
		<div className="newsList">
			<h1 className="newsList__title">{title}</h1>
			{posts.map((post) => (
				<PostItem post={post} key={post.id} />
			))}
		</div>
	);
};

export default PostList;
