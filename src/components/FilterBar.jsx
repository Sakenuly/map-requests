import { useState } from "react";
import { Select, Input, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { STATUS_OPTIONS } from "../constants/statuses";
import styles from "./FilterBar.module.css";

const { Option } = Select;

const FilterBar = ({ onFilterChange, onSearchChange }) => {
	const [statusFilter, setStatusFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const handleStatusChange = (value) => {
		setStatusFilter(value);
		onFilterChange(value);
	};

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value);
		onSearchChange(value);
	};

	const handleClear = () => {
		setStatusFilter("all");
		setSearchQuery("");
		onFilterChange("all");
		onSearchChange("");
	};

	return (
		<div className={styles.filterBar}>
			<div className={styles.filterGroup}>
				<Select value={statusFilter} onChange={handleStatusChange} placeholder="Фильтр по статусу" className={styles.select} size="large">
					{STATUS_OPTIONS.map((option) => (
						<Option key={option.value} value={option.value}>
							{option.label}
						</Option>
					))}
				</Select>
				<Input
					placeholder="Поиск по категории или адресу..."
					value={searchQuery}
					onChange={handleSearchChange}
					className={styles.input}
					size="large"
					allowClear
				/>
				{(statusFilter !== "all" || searchQuery) && (
					<Button icon={<ClearOutlined />} onClick={handleClear} className={styles.button} size="large">
						Сбросить
					</Button>
				)}
			</div>
		</div>
	);
};

export default FilterBar;
