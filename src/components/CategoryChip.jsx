export default function CategoryChip({ label, icon, active, onClick }) {
  return (
    <button className={`chip${active ? ' active' : ''}`} onClick={onClick}>
      {icon ? `${icon} ` : ''}{label}
    </button>
  )
}
