// Currency conversion component.
import React from 'react'

export default function Currency(props) {

    /*
    Properties of the object.
    */
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
