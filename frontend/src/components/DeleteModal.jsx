import { useState } from "react";
import {Trash} from "lucide-react"

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    if (code.length !== 4) {
      setError("Please enter a 4-digit code.")
      return
    }
    setError("")
    onConfirm(code)
    setCode("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 py-8 px-7 w-full max-w-[420px] flex flex-col items-center">

        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center bg-red-50 rounded-full p-3">
          <Trash size={20} color="#991B1B" strokeWidth={1.8}/>
        </div>

        {/* Heading */}
        <h2 className="text-gray-900 font-semibold text-lg mt-4">Are you sure?</h2>

        {/* Code input */}
        <div className="w-full mt-5">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Enter the 4-digit code
          </label>
          <input
            type="password"
            maxLength={4}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, ""))
              setError("")
            }}
            placeholder="••••"
            className="w-full h-10 rounded-lg border border-gray-200 bg-gray-50 text-center text-xl tracking-[0.4em] text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
          />
          {error && (
            <p className="text-xs text-red-600 mt-1.5">{error}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5 w-full">
          <button
            type="button"
            className="flex-1 h-10 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 h-10 rounded-lg bg-red-700 text-white text-sm font-medium hover:bg-red-800 active:scale-[0.98] transition"
            onClick={handleSubmit}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default DeleteModal