'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Mail } from 'lucide-react';

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  productName: string;
}

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  isOpen,
  onClose,
  sellerName,
  sellerPhone,
  sellerEmail,
  productName
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCall = () => {
    // Use a direct approach without window check to avoid hydration mismatch
    try {
      window.open(`tel:${sellerPhone}`, '_self');
    } catch (error) {
      console.error('Failed to open phone dialer:', error);
    }
  };

  const handleWhatsApp = () => {
    try {
      const message = encodeURIComponent(`Hi ${sellerName}, I'm interested in your item "${productName}" on UniTrade.`);
      window.open(`https://wa.me/${sellerPhone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    } catch (error) {
      console.error('Failed to open WhatsApp:', error);
    }
  };

  const handleEmail = () => {
    try {
      const subject = encodeURIComponent(`Inquiry about "${productName}" on UniTrade`);
      const body = encodeURIComponent(`Hi ${sellerName},\n\nI'm interested in your item "${productName}" listed on UniTrade. Please let me know if it's still available.\n\nThanks!`);
      window.open(`mailto:${sellerEmail}?subject=${subject}&body=${body}`, '_blank');
    } catch (error) {
      console.error('Failed to open email client:', error);
    }
  };

  // Always render the modal structure, but only enable interactions when mounted
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-end justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md rounded-t-2xl animate-slide-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-black">Contact Seller</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Seller Info */}
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm font-medium">
                {sellerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-black font-medium">{sellerName}</p>
              <p className="text-gray-500 text-sm">Seller on UniTrade</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-1">Inquiring about:</p>
            <p className="text-black font-medium">{productName}</p>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <button
              onClick={handleCall}
              disabled={!isMounted}
              className="w-full border border-gray-300 text-black py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Phone size={20} className="mr-2" />
              Call {sellerPhone}
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={!isMounted}
              className="w-full border border-gray-300 text-black py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <MessageSquare size={20} className="mr-2" />
              Message on WhatsApp
            </button>

            <button
              onClick={handleEmail}
              disabled={!isMounted}
              className="w-full border border-gray-300 text-black py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Mail size={20} className="mr-2" />
              Send Email
            </button>
          </div>

          {/* Safety Tips */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-800 font-medium mb-1">⚠️ Safety Tips:</p>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Meet in public places</li>
              <li>• Inspect items before payment</li>
              <li>• Don't share financial info</li>
              <li>• Use cash or secure payment</li>
            </ul>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-500 py-2 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSellerModal;