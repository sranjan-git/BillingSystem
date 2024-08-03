// Invoice.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Invoice.scss';
import { auth, onAuthStateChanged } from '../../firebase';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = () => {
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [firebaseId, setFirebaseId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseId(user.uid);
      } else {
        setFirebaseId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const generateTransactionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const handleGenerateInvoice = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://billingsystembackend.onrender.com/user/get/${firebaseId}`);
      const transactionId = generateTransactionId(); // Generate the transaction ID here
      const currentDate = new Date();
      const invoiceDataWithTransactionId = {
        ...response.data,
        transactionId,
        price: response.data.planType === 'Premium' ? 50 : response.data.planType === 'Advanced' ? 30 : 10,
        invoiceDate: currentDate.toLocaleDateString(),
        invoiceTime: currentDate.toLocaleTimeString(),
      };
      setInvoiceData(invoiceDataWithTransactionId);
      setTransactionId(transactionId); // Store the transaction ID in state
      setLoading(false);
    } catch (error) {
      console.error('Error fetching invoice data:', error);
      setLoading(false);
    }
  };

  const handleDownloadInvoice = () => {
    const input = document.getElementById('invoice-content');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('invoice.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app__invoice">
      <h1>Click below to generate the invoice</h1>
      <button className="generate-invoice-button" onClick={handleGenerateInvoice}>
        Generate Invoice
      </button>
      {invoiceData && (
        <div className="invoice-content" id="invoice-content">
          <table>
            <tbody>
              <tr>
                <td><strong>Transaction ID:</strong></td>
                <td>{transactionId}</td>
              </tr>
              <tr>
                <td><strong>User ID:</strong></td>
                <td>{invoiceData.firebaseId}</td>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{invoiceData.name}</td>
              </tr>
              <tr>
                <td><strong>Plan Type:</strong></td>
                <td>{invoiceData.planType}</td>
              </tr>
              <tr>
                <td><strong>Price:</strong></td>
                <td>${invoiceData.price}</td>
              </tr>
              <tr>
                <td><strong>Storage:</strong></td>
                <td>{invoiceData.totalAssets} GB</td>
              </tr>
              <tr>
                <td><strong>Purchase Date:</strong></td>
                <td>{new Date(invoiceData.purchaseDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Invoice Date:</strong></td>
                <td>{invoiceData.invoiceDate}</td>
              </tr>
              <tr>
                <td><strong>Invoice Time:</strong></td>
                <td>{invoiceData.invoiceTime}</td>
              </tr>
              <tr>
                <td><strong>Used Assets:</strong></td>
                <td>{invoiceData.usedAssets} GB</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {invoiceData && (
        <button className="download-invoice-button" onClick={handleDownloadInvoice}>
          Download Invoice
        </button>
      )}
    </div>
  );
};

export default Invoice;
