import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency.js';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {

  /*
  React hooks can only be used in function components. NOT classes.
  Hooks must execute in the exact same order, hooks cannot be called conditionally.
  useState: Sets an array of values, first entry is the current state of values, the second entry is the function to update the current state.

  Pass the states, runs every time if it is a hard value or a function call.
  If it passes an anonymous function, runs only once.
  */
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountFromCurrency, setAmountFromCurrency] = useState(true)

  let toAmount, fromAmount

  if (amountFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate || 0
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate || 0
  }

  /* 
  useEffect: React hook that tells component needs to do something after render. 
  */
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        // Array destructuring: set the base as the first operator, then spread the rest into the array.
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])
  
  /*
  Second parameter: useEffect hook only runs when the currency type changes.
  */
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      // Modification: EUR isn't included in the data rate dataset.
      if (fromCurrency === 'EUR' && toCurrency === 'EUR') {
        setExchangeRate(1)
      }
      else {
          fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.rates[toCurrency]))
      }
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }

  return (
    <div className="center poppins">
      <h1>Currency Converter</h1>
      <p className="text">A simple React project taught by <b>Web Dev Simplified</b>, implemented by <b>Henry Tran</b>, for use in educational purposes.</p>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equal">=</div>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
