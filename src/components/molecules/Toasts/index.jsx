export default function Toasts({
  onClose,
  variant,
  variantBody,
  title,
  titleColor,
  description,
}) {
  return (
    <>
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1050 }}
      >
        <div
          className={`toast show bg-${variant}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header bg-${variant}`}>
            <strong className={`me-auto text-${titleColor}`}>{title}</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className={`toast-body bg-${variantBody}`}>{description}</div>
        </div>
      </div>
    </>
  );
}
