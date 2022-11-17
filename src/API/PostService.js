import axios from "axios";
import { MAIN_URL } from "./Constants";

export default class PostService {
	static async getById(id) {
		try {
			const response = await axios.get(`${MAIN_URL}/item/${id}.json`);
			return response.data;
		} catch (e) {
			console.log("Error, can't load a news");
		}
	}
	static async getCommentsById(id) {
		try {
			const response = await axios.get(`${MAIN_URL}/item/${id}.json`);
			return response.data;
		} catch (e) {
			console.log("Error, can't load a comments");
		}
	}
	static async getNews() {
		try {
			const response = await axios.get(`${MAIN_URL}/newstories.json`);
			const news = await Promise.all(
				response.data.slice(0, 100).map(this.getById)
			);
			return news;
		} catch (e) {
			console.log("Error, can't load list of news");
		}
	}
	static async getComments(id) {
		try {
			const response = await axios.get(`${MAIN_URL}/item/${id}.json`);
			const comments = await Promise.all(
				response.data.kids.map(this.getCommentsById)
			);
			return comments;
		} catch (e) {
			console.log("Error, can't load list of a comments");
		}
	}
}
