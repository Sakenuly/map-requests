import { Table, Tag } from "antd";
import { getStatusTagColor } from "../utils/statusUtils";
import { formatDateShort } from "../utils/dateUtils";
import styles from "./AppealsTable.module.css";

const AppealsTable = ({ appeals, onRowClick }) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			width: 80,
		},
		{
			title: "Категория",
			dataIndex: "category",
			key: "category",
			ellipsis: true,
		},
		{
			title: "Адрес",
			dataIndex: "address",
			key: "address",
			ellipsis: true,
		},
		{
			title: "Статус",
			dataIndex: "status",
			key: "status",
			width: 150,
			render: (status) => <Tag color={getStatusTagColor(status)}>{status}</Tag>,
		},
		{
			title: "Дата регистрации",
			dataIndex: "created_at",
			key: "created_at",
			width: 150,
			render: (date) => formatDateShort(date),
		},
	];

	return (
		<div className={styles.tableContainer}>
			<Table
				columns={columns}
				dataSource={appeals}
				rowKey="id"
				onRow={(record) => ({
					onClick: () => onRowClick(record),
					className: styles.tableRow,
				})}
				pagination={false}
				size="middle"
				scroll={{ y: 400 }}
				locale={{
					emptyText: "Нет данных для отображения",
				}}
			/>
		</div>
	);
};

export default AppealsTable;
