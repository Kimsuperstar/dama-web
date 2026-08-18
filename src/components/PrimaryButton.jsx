function PrimaryButton({ children, onClick, disabled = false }) {
  return (
    <button
      type="button"
      className="primary-button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default PrimaryButton