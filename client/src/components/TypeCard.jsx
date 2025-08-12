import "./TypeCard.css";

export default function TypeCard({ typeName }) {
	const typeClass = typeName.toLowerCase();

	const cardClasses = `type-card ${typeClass}`;
	return <span className={cardClasses}>{typeName}</span>;
}
