import Posts from './../pages/Posts';
import PostIdPage from './../pages/PostIdPage';
import NotFound from './../pages/NotFound'

export const privateRoutes = [
	{ path: "/news", component: Posts, exact: true },
	{ path: "/news/:id", component: PostIdPage, exact: true },
	{ path: "/*", component: NotFound, exact: true },
];
