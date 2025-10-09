import React from 'react';

export const PaymentDetails = () => {
  const paymentItems = [
    { label: 'Cleaning fee', amount: '$ 0' },
    { label: 'Service Fee', amount: '$ 10' },
    { label: 'Accommodation Tax', amount: '$ 10' },
    { label: 'L.V.A Tax', amount: '$ 10' },
  ];

  return (
    <div>
      <h4>Payment</h4>
      
      <div style={{ marginBottom: '16px' }}>
        {paymentItems.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            <span>{item.label}</span>
            <span>{item.amount}</span>
          </div>
        ))}
      </div>
      
      <hr style={{ margin: '16px 0', border: '1px solid #eee' }} />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '16px'
      }}>
        <span>Total</span>
        <span>$230</span>
      </div>
    </div>
  );
};