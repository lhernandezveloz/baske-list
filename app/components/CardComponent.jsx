function CardComponent({ title, children, footer }) {
  return (
    <div className="card">
      <div className="card-body d-flex flex-column gap-3">
        <h5 className="card-title fw-bold">{title}</h5>
        {children}
      </div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}
export default CardComponent;
