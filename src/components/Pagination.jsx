import { Pagination as AntPagination } from "antd";
import { ITEMS_PER_PAGE } from "../constants/pagination";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null;

	const totalItems = totalPages * ITEMS_PER_PAGE;
	const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
	const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

	return (
		<div className={styles.pagination}>
			<div className={styles.totalText}>
				{startItem}-{endItem} из {totalItems} записей
			</div>
			<AntPagination current={currentPage} total={totalItems} pageSize={ITEMS_PER_PAGE} onChange={onPageChange} showSizeChanger={false} />
		</div>
	);
};

export default Pagination;
