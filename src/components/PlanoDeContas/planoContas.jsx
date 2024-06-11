import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../PlanoDeContas/planoContas.css";
import Sidebar from "../PlanoDeContas/Sidebar";
import Header from './Header';

const AccountPlan = () => {
    const [accounts, setAccounts] = useState([]); // Inicialmente vazio
    const [showForm, setShowForm] = useState(false);
    const [newAccount, setNewAccount] = useState({ conta: '', status: '', categoria: '', valor: '', vencimento: '' });

    useEffect(() => {
        axios.get("http://localhost:8080/api/planocontas")
            .then(response => setAccounts(response.data))
            .catch(error => console.error("There was an error fetching the accounts!", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/planocontas", newAccount)
            .then(response => {
                setAccounts([...accounts, response.data]);
                setNewAccount({ conta: '', status: '', categoria: '', valor: '', vencimento: '' });
                setShowForm(false);
            })
            .catch(error => console.error("There was an error adding the account!", error));
    };

    return (
        <> 
        <div className='ContainerGeral'>
            <Sidebar />
            <div className='ContainerPlanos'>
                <Header />
                <section className='plan-section'>
                    <div className="text-button">
                        <h2>Plano de Contas</h2>
                        <button onClick={() => setShowForm(true)}>+</button>
                    </div>

                    <div className='table-content'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Conta</th>
                                    <th>Status</th>
                                    <th>Categoria</th>
                                    <th>Valor</th>
                                    <th>Vencimento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account, index) => (
                                    <tr key={index}>
                                        <td>{account.conta}</td>
                                        <td className={`status ${account.status.toLowerCase()}`}>{account.status}</td>
                                        <td>{account.categoria}</td>
                                        <td>{account.valor}</td>
                                        <td>{account.vencimento}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                {showForm && (
                    <div className="modal">
                        <form onSubmit={handleSubmit}>
                            <label>
                                Conta:
                                <input type="text" name="conta" value={newAccount.conta} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Status:
                                <input type="text" name="status" value={newAccount.status} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Categoria:
                                <input type="text" name="categoria" value={newAccount.categoria} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Valor:
                                <input type="text" name="valor" value={newAccount.valor} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Vencimento:
                                <input type="date" name="vencimento" value={newAccount.vencimento} onChange={handleInputChange} required />
                            </label>
                            <button type="submit">Adicionar</button>
                            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default AccountPlan;
