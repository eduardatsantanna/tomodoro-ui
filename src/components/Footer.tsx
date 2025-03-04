import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#f4e7c3', // Soft warm beige for Stardew-inspired vibe
        color: '#3d2e1e', // Warm brown for text
      }}
    >

      <p>
      <img src="/assets/plant.gif" alt="Chicken" style={{ width: '32px', height: '32px' }} />


        © 2024 Tomodoro {' '}
        <img src="/assets/plant.gif" alt="Plant" style={{ width: '32px', height: '32px' }} />
      </p>
    </footer>
  );
};

export default Footer;
