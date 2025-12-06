export const STATUSES = {
	IN_PROGRESS: "В работе",
	RESOLVED: "Решено",
	REJECTED: "Отклонено",
};

export const STATUS_COLORS = {
	[STATUSES.IN_PROGRESS]: {
		tag: "processing",
		hex: "#faad14",
	},
	[STATUSES.RESOLVED]: {
		tag: "success",
		hex: "#52c41a",
	},
	[STATUSES.REJECTED]: {
		tag: "error",
		hex: "#ff4d4f",
	},
};

export const STATUS_OPTIONS = [
	{ value: "all", label: "Все" },
	{ value: STATUSES.IN_PROGRESS, label: STATUSES.IN_PROGRESS },
	{ value: STATUSES.RESOLVED, label: STATUSES.RESOLVED },
	{ value: STATUSES.REJECTED, label: STATUSES.REJECTED },
];
