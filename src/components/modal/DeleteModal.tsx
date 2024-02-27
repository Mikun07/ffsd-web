import React from "react";

const DeleteModal = ({ visible, body, className }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-70 backdrop-blur-sm h-full overflow-hidden flex justify-center items-center">
      <div className={className}>
        <div className="w-full h-full">{body}</div>
      </div>
    </div>
  );
};

export default DeleteModal;
