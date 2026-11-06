export default function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="page-header container">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {children && <p className="lead">{children}</p>}
    </div>
  )
}
