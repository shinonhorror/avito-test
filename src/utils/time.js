export const checkDate = (time) => {
	return new Date(time * 1000).toLocaleDateString("ru-US", {
		hour: "numeric",
		minute: "numeric",
	});
};
