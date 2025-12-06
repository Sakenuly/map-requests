import { useState, useMemo } from "react";
import { ConfigProvider, Card, Spin, Alert } from "antd";
import ruRU from "antd/locale/ru_RU";
import useAppeals from "./hooks/useAppeals";
import { filterAppeals, paginateAppeals } from "./utils/filterAppeals";
import { ITEMS_PER_PAGE } from "./constants/pagination";
import FilterBar from "./components/FilterBar";
import AppealsTable from "./components/AppealsTable";
import MapView from "./components/MapView";
import AppealModal from "./components/AppealModal";
import Pagination from "./components/Pagination";
import styles from "./App.module.css";

function App() {
	const { appeals, loading, error } = useAppeals();
	const [statusFilter, setStatusFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedAppeal, setSelectedAppeal] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredAppeals = useMemo(() => {
		return filterAppeals(appeals, statusFilter, searchQuery);
	}, [appeals, statusFilter, searchQuery]);

	const totalPages = Math.ceil(filteredAppeals.length / ITEMS_PER_PAGE);

	const paginatedAppeals = useMemo(() => {
		return paginateAppeals(filteredAppeals, currentPage, ITEMS_PER_PAGE);
	}, [filteredAppeals, currentPage]);

	const handleFilterChange = (status) => {
		setStatusFilter(status);
		setCurrentPage(1);
	};

	const handleSearchChange = (query) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleAppealClick = (appeal) => {
		setSelectedAppeal(appeal);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedAppeal(null);
	};

	return (
		<ConfigProvider locale={ruRU}>
			<div className={styles.layout}>
				<header className={styles.header}>
					<h1 className={styles.title}>Обращения</h1>
				</header>
				<main className={styles.content}>
					{loading ? (
						<div className={styles.loading}>
							<Spin size="large" tip="Загрузка данных..." />
						</div>
					) : error ? (
						<Alert title="Ошибка" description={`Ошибка загрузки данных: ${error}`} type="error" showIcon />
					) : (
						<>
							<FilterBar onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />

							<div className={styles.mainContent}>
								<Card title="Таблица обращений" className={styles.card}>
									<AppealsTable appeals={paginatedAppeals} onRowClick={handleAppealClick} />
									<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
								</Card>

								<Card title="Карта обращений" className={styles.card}>
									<MapView appeals={filteredAppeals} onMarkerClick={handleAppealClick} />
								</Card>
							</div>
						</>
					)}

					<AppealModal appeal={selectedAppeal} isOpen={isModalOpen} onClose={handleCloseModal} />
				</main>
			</div>
		</ConfigProvider>
	);
}

export default App;
