export const filterAppeals = (appeals, statusFilter, searchQuery) => {
	let filtered = [...appeals];

	if (statusFilter && statusFilter !== "all") {
		filtered = filtered.filter((appeal) => appeal.status === statusFilter);
	}

	if (searchQuery && searchQuery.trim() !== "") {
		const query = searchQuery.toLowerCase().trim();
		filtered = filtered.filter((appeal) => appeal.category.toLowerCase().includes(query) || appeal.address.toLowerCase().includes(query));
	}

	return filtered;
};

export const paginateAppeals = (appeals, currentPage, itemsPerPage) => {
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	return appeals.slice(startIndex, endIndex);
};
