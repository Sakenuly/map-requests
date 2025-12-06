import { STATUS_COLORS } from "../constants/statuses";

export const getStatusTagColor = (status) => {
	return STATUS_COLORS[status]?.tag || "default";
};

export const getStatusHexColor = (status) => {
	return STATUS_COLORS[status]?.hex || "#6c757d";
};
