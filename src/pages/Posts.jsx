import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { usePosts } from "../components/hooks/usePosts";
import PostService from "../API/PostService";
import { useFetching } from "../components/hooks/useFetching";
import "../styles/app.scss";
import Loader from "../components/UI/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [time, setTime] = useState(0);
	const [filter, setFilter] = useState({
		sort: "",
		query: "",
	});
	const sortedAndSearchingPost = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const test = await PostService.getNews();
		setPosts(test);
	});

	setTimeout(() => {
		let temp = time + 1;
		setTime(temp);
	}, 60000);

	useEffect(() => {
		fetchPosts();
	}, [time]);

	return (
		<div className="App">
			<div className="container">
				<PostFilter filter={filter} setFilter={setFilter} />
				<button className="newsList__btn" onClick={() => fetchPosts()}>
					<FontAwesomeIcon icon={faRotate} />
				</button>
				{postError && <h1>Error</h1>}
				{isPostsLoading ? (
					<Loader />
				) : (
					<PostList posts={sortedAndSearchingPost} title="News" />
				)}
			</div>
		</div>
	);
}

export default Posts;
