import { Modal, Descriptions, Tag, Image } from "antd";
import { getStatusTagColor } from "../utils/statusUtils";
import { formatDateLong } from "../utils/dateUtils";
import { formatCoordinates } from "../utils/coordinateUtils";
import styles from "./AppealModal.module.css";

const AppealModal = ({ appeal, isOpen, onClose }) => {
	if (!appeal) return null;

	const fields = [
		{ key: "id", label: "ID", value: appeal.id },
		{ key: "category", label: "Категория", value: appeal.category },
		{ key: "address", label: "Адрес", value: appeal.address },
		{
			key: "status",
			label: "Статус",
			value: <Tag color={getStatusTagColor(appeal.status)}>{appeal.status}</Tag>,
		},
		{ key: "created_at", label: "Дата регистрации", value: formatDateLong(appeal.created_at) },
		{ key: "description", label: "Описание", value: appeal.description },
		{
			key: "coordinates",
			label: "Координаты",
			value: formatCoordinates(appeal.latitude, appeal.longitude),
		},
	];

	return (
		<Modal title="Детальная информация об обращении" open={isOpen} onCancel={onClose} footer={null} width={600} className={styles.modal}>
			<Descriptions column={1} bordered>
				{fields.map((field) => (
					<Descriptions.Item key={field.key} label={field.label}>
						{field.value}
					</Descriptions.Item>
				))}
				{appeal.photo && (
					<Descriptions.Item label="Фото">
						<Image src={appeal.photo} alt="Appeal photo" style={{ maxWidth: "100%" }} />
					</Descriptions.Item>
				)}
			</Descriptions>
		</Modal>
	);
};

export default AppealModal;
