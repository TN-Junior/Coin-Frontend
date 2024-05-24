import React from 'react';
import './Table.css';

function tabledashDash() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button>+</button>
      </div>
      <div className="tabledash-container">
        <div className="box">
          <div className="box-title">Receitas</div>
        </div>
        <div className="box">
          <div className="box-title">Despesas</div>
        </div>
        <div className="box">
          <div className="box-title">Boletos</div>
        </div>
        <div className="box">
          <div className="box-title">Finalizadas(Pagas)</div>
        </div>
      </div>
    </div>
  );
}

export default tabledashDash;
