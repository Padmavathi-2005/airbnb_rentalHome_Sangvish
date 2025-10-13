import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function LanguageCurrencyModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('language');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('US Dollar');

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'عربي', code: 'ar' },
    { name: '中文 (繁體)', code: 'zh-TW' },
    { name: 'Français', code: 'fr' },
    { name: 'Português', code: 'pt' },
    { name: 'Русский', code: 'ru' },
    { name: 'Español', code: 'es' },
    { name: 'Türkçe', code: 'tr' },
  ];

  const currencies = [
    { name: 'US Dollar', code: 'USD - $' },
    { name: 'Pound Sterling', code: 'GBP - £' },
    { name: 'Euro', code: 'EUR - €' },
    { name: 'Australian Dollar', code: 'AUD - $' },
    { name: 'Singapore Dollar', code: 'SGD - $' },
    { name: 'Swedish Krona', code: 'SEK - kr' },
    { name: 'Danish Krone', code: 'DKK - kr' },
    { name: 'Mexican Peso', code: 'MXN - $' },
    { name: 'Brazilian Real', code: 'BRL - R$' },
    { name: 'Malaysian Ringgit', code: 'MYR - RM' },
    { name: 'Philippine Peso', code: 'PHP - ₱' },
    { name: 'Swiss Franc', code: 'CHF - €' },
    { name: 'Indian Rupee', code: 'INR - ₹' },
    { name: 'Argentine Peso', code: 'ARS - $' },
    { name: 'Canadian Dollar', code: 'CAD - $' },
    { name: 'Chinese Yuan', code: 'CNY - ¥' },
    { name: 'Czech Koruna', code: 'CZK - Kč' },
    { name: 'Hong Kong Dollar', code: 'HKD - $' },
    { name: 'Hungarian Forint', code: 'HUF - Ft' },
    { name: 'Indonesian Rupiah', code: 'IDR - Rp' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 Bg-gray-200/50 bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[70vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            {/* Top-left switch */}
            <div className="flex bg-[#FFE5F1] rounded-full p-1 space-x-1">
              <button
                onClick={() => setActiveTab('language')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === 'language'
                    ? 'bg-[#DB0B64] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Language
              </button>
              <button
                onClick={() => setActiveTab('currency')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === 'currency'
                    ? 'bg-[#DB0B64] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Currency
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition ml-4"
            >
              <X className="w-6 h-6" />
            </button>
          </div>




          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-4 gap-4">
            {activeTab === 'language'
              ? languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.name)}
                  className={`text-left px-5 py-4 rounded-lg border-2 transition ${selectedLanguage === lang.name
                      ? 'border-[#DB0B64] bg-gray-50'
                      : 'border-transparent hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <span
                    className={`text-gray-900 text-sm ${selectedLanguage === lang.name ? 'font-bold' : 'font-normal'
                      }`}
                  >
                    {lang.name}
                  </span>
                </button>
              ))
              : currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency.name)}
                  className={`text-left px-5 py-4 rounded-lg border-2 transition ${selectedCurrency === currency.name
                      ? 'border-[#DB0B64] bg-gray-50'
                      : 'border-transparent hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div
                    className={`text-gray-900 text-sm ${selectedCurrency === currency.name ? 'font-bold' : 'font-normal'
                      }`}
                  >
                    {currency.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{currency.code}</div>
                </button>
              ))}
          </div>


        </div>
      </div>
    </>
  );
}
