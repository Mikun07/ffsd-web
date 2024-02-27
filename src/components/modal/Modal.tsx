import { FaTimes } from "react-icons/fa";

const Modal = ({ visible, onClose, body, className }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-70 backdrop-blur-sm h-full overflow-hidden flex justify-center items-center">
      <div className={className}>
        <div className="flex w-full mt-3 justify-start font-semibold text-black">
          <FaTimes size={25} onClick={onClose} />
        </div>
        <div className="w-full h-full pt-5 pb-10">{body}</div>
      </div>
    </div>
  );
};

export default Modal;
