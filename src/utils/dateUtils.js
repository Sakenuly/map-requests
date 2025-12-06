export const formatDateShort = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("ru-RU");
};

export const formatDateLong = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
