import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Header from './Components/Header';
import InputPrepend from './Components/InputPrepend';
import './App.css';

function App() {
  const [state, setState] = useState({
    name: '',
    address: '',
    article1: '',
    price1: 0,
    article2: '',
    price2: 0,
    isLoading: false
  });

  const { name, address, article1, article2, price1, price2, isLoading } = state;

  const handleChange = ({ target: { name, value } }) => setState({
    ...state,
    [name]: value
  });

  const clearState = () => setState({
    name: '',
    address: '',
    article1: '',
    price1: 0,
    article2: '',
    price2: 0,
    isLoading: false
  });

  const handleLoading = (value) => setState({
    ...state,
    isLoading: !!value
  });

  const createAndDownloadPDF = () => {
    handleLoading(true);
    // axios.post('/api/v1/create-pdf', state)
    //   .then(() => axios.get('/api/fetch-pdf', { responseType: 'blob'}))
    //   .then(response => {
    //     console.log(response.data);
    //     const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    //     saveAs(pdfBlob, `Receipt_number_${state.receiptId}.pdf`);
    //   });
    axios.post('/api/v2/create-pdf', state, { responseType: 'blob' })
      .then(response => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'Invoice.pdf');
        clearState();
      })
      .catch(error => {
        console.log(error.message);
        handleLoading();
      })

  };
  return (
    <>
      <Header title="PDF generator" />
      <fieldset className="container" disabled={isLoading}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            value={address}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-10">
            <label>Article 1</label>
            <input
              type="text"
              className="form-control"
              name="article1"
              placeholder="Description..."
              value={article1}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Price</label>
            <InputPrepend text="$">
              <input
                type="number"
                className="form-control"
                name="price1"
                value={price1}
                onChange={handleChange}
              />
            </InputPrepend>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-10">
            <label>Article 2</label>
            <input
              type="text"
              className="form-control"
              name="article2"
              placeholder="Description..."
              value={article2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Price</label>
            <InputPrepend text="$">
              <input
                type="number"
                className="form-control"
                name="price2"
                value={price2}
                onChange={handleChange}
              />
            </InputPrepend>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={createAndDownloadPDF}
          disabled={isLoading}
        >
          {isLoading && <span className="spinner-border spinner-border-sm"></span>}
          <span> Download invoice</span>
        </button>
      </fieldset>
    </>
  );
}

export default App;
