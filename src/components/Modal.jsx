import { useEffect, useRef } from "react";

export default function ({ isOpen, setIsOpen, title, children }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef}>
      <div className="dialog-btn">
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          X
        </button>
      </div>
      <h3>{title}</h3>
      <div>{children}</div>
    </dialog>
  );
}
