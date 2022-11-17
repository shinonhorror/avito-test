import React from "react";

const PostFilter = function ({ filter, setFilter }) {
	return (
		<div>
			<input className="filter"
				placeholder="Search..."
				value={filter.query}
				onChange={(e) => setFilter({ ...filter, query: e.target.value })}
			/>
		</div>
	);
};

export default PostFilter;
