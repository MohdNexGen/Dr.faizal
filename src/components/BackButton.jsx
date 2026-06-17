function BackButton({ setPage }) {
  return (
    <button
      className="back-btn"
      onClick={() => setPage("home")}
    >
      ← Back to Home
    </button>
  );
}

export default BackButton;