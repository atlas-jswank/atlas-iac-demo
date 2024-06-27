export default function BoardCell({ children, onClick, state }) {
  return (
    <div className={`board-cell ${state}`} onClick={onClick}>
      {children ?? " "}
    </div>
  );
}
