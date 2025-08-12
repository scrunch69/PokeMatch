import "./StatCard.css";

export default function StatCard({ statName, statValue, onStatCardClick }) {
	return (
		<div className='stat-card' onClick={() => onStatCardClick(statName)}>
			<p className='stat-name'>{statName}</p>
			<h3 className='stat-value'>{statValue}</h3>
		</div>
	);
}
