"use client";
import { latestPartners } from "@/app/types/types";
import { useEffect } from "react";
import { X } from "lucide-react";

interface PartnerPreviewModalProps {
  partner: latestPartners | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

function PartnerPreviewModal({
  partner,
  isOpen,
  onClose,
  onAction,
}: PartnerPreviewModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !partner) return null;

  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-orange-400 bg-orange-50 border-orange-200";
      case "suspended":
        return "text-red-500 bg-red-50 border-red-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 border border-black/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Partner Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Partner Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <p className="text-gray-900 font-medium">{partner.fullName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <p className="text-gray-900">{partner.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Registration Date
            </label>
            <p className="text-gray-900">
              {new Date(partner.regDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <span
              className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
              border capitalize ${statusClass(partner.status)}
            `}
            >
              {partner.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          {partner.status === "approved" ? (
            <button
              onClick={() => onAction("suspend")}
              className="flex-1 bg-transparent text-sm font-semibold border border-red-primary 
                text-red-alt px-4 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md flex items-center justify-center"
            >
              Suspend Partner
            </button>
          ) : partner.status === "pending" ? (
            <>
              <button
                onClick={() => onAction("approve")}
                className="flex-1 bg-green-600 text-white text-sm font-semibold 
                  px-4 py-2 cursor-pointer hover:bg-green-700 duration-300 ease-in-out 
                  rounded-md flex items-center justify-center"
              >
                Approve
              </button>
              <button
                onClick={() => onAction("suspend")}
                className="flex-1 bg-transparent text-sm font-semibold border border-red-primary 
                  text-red-alt px-4 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                  rounded-md flex items-center justify-center"
              >
                Suspend
              </button>
            </>
          ) : (
            partner.status === "suspended" && (
              <button
                onClick={() => onAction("approve")}
                className="flex-1 bg-green-600 text-white text-sm font-semibold 
                  px-4 py-2 cursor-pointer hover:bg-green-700 duration-300 ease-in-out 
                  rounded-md flex items-center justify-center"
              >
                Approve Partner
              </button>
            )
          )}

          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold 
              px-4 py-2 cursor-pointer hover:bg-gray-200 duration-300 ease-in-out 
              rounded-md flex items-center justify-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerPreviewModal;
