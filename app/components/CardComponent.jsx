function CardComponent({ title, children, footer }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {children}
        </div>
        <div className="card-footer">{footer}</div>
      </div>
    </div>
  );
}
export default CardComponent;
