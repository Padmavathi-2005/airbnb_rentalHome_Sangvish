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
          <div className="relative p-6 border-b border-gray-200 flex justify-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex space-x-12">
              <button
                onClick={() => setActiveTab('language')}
                className={`text-sm font-medium pb-3 border-b-2 transition ${
                  activeTab === 'language'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Language
              </button>
              <button
                onClick={() => setActiveTab('currency')}
                className={`text-sm font-medium pb-3 border-b-2 transition ${
                  activeTab === 'currency'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Currency
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-4 gap-4">
            {activeTab === 'language'
              ? languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className={`text-left px-5 py-4 rounded-lg border-2 transition ${
                      selectedLanguage === lang.name
                        ? 'border-black bg-gray-50'
                        : 'border-transparent hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-gray-900 font-normal text-sm">
                      {lang.name}
                    </span>
                  </button>
                ))
              : currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency.name)}
                    className={`group text-left px-5 py-4 rounded-lg border-2 transition ${
                      selectedCurrency === currency.name
                        ? 'border-black bg-gray-50'
                        : 'border-transparent hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-gray-900 font-normal text-sm group-hover:text-red-500 transition">
                      {currency.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {currency.code}
                    </div>
                  </button>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
