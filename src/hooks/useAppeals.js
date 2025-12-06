import { useState, useEffect } from "react";

const useAppeals = () => {
	const [appeals, setAppeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAppeals = async () => {
			try {
				setLoading(true);
				const response = await fetch("/data.json");
				if (!response.ok) {
					throw new Error("Failed to fetch appeals data");
				}
				const data = await response.json();
				setAppeals(data);
				setError(null);
			} catch (err) {
				setError(err.message);
				console.error("Error fetching appeals:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchAppeals();
	}, []);

	return { appeals, loading, error };
};

export default useAppeals;
