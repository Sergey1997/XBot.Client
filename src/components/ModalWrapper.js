import React from 'react'

// ModalWrapper.js
function ModalWrapper({ children, isVisible, onClose }) {
  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-6xl w-full mx-4">
        <button onClick={onClose} className="absolute top-3 right-3 text-black">
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
