import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Empty } from "antd";
import { getStatusHexColor } from "../utils/statusUtils";
import styles from "./MapView.module.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const TOOLTIP_FIELDS = [
	{ key: "id", label: "ID", getValue: (appeal) => appeal.id },
	{ key: "category", label: "Категория", getValue: (appeal) => appeal.category },
	{ key: "address", label: "Адрес", getValue: (appeal) => appeal.address },
	{ key: "status", label: "Статус", getValue: (appeal) => appeal.status },
];

const MapView = ({ appeals, onMarkerClick }) => {
	const defaultCenter = [51.1605, 71.4704];
	const defaultZoom = 13;

	const createCustomIcon = (status) => {
		return L.divIcon({
			className: styles.customMarker,
			html: `<div style="background-color: ${getStatusHexColor(
				status
			)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
			iconSize: [20, 20],
			iconAnchor: [10, 10],
		});
	};

	const renderTooltipContent = (appeal) => {
		return (
			<div className={styles.tooltipContent}>
				{TOOLTIP_FIELDS.map((field) => (
					<div key={field.key}>
						<strong>{field.label}:</strong> {field.getValue(appeal)}
					</div>
				))}
			</div>
		);
	};

	const renderPopupContent = (appeal) => {
		return (
			<div className={styles.popupContent}>
				<strong>ID: {appeal.id}</strong>
				{TOOLTIP_FIELDS.slice(1).map((field) => (
					<p key={field.key}>
						<strong>{field.label}:</strong> {field.getValue(appeal)}
					</p>
				))}
			</div>
		);
	};

	if (!appeals || appeals.length === 0) {
		return (
			<div className={styles.mapContainer}>
				<Empty description="Нет данных для отображения на карте" />
			</div>
		);
	}

	return (
		<div className={styles.mapContainer}>
			<MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: "100%", width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{appeals.map((appeal) => (
					<Marker
						key={appeal.id}
						position={[appeal.latitude, appeal.longitude]}
						icon={createCustomIcon(appeal.status)}
						eventHandlers={{
							click: () => onMarkerClick(appeal),
						}}>
						<Tooltip>{renderTooltipContent(appeal)}</Tooltip>
						<Popup>{renderPopupContent(appeal)}</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};

export default MapView;
