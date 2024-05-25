import { useState } from "react";
const CanculWrapper = () => {
    const [numbers, setNumbers] = useState('');
    const [result, setResult] = useState(0);
    const [hidden, setHidden] = useState(true);

    function calculate(s) {
        s = s.replace(/\s/g, '');
        let num = "";
        let calc = [];
        let prevSign = '+';
        for (let i = 0; i < s.length; i++) {
            if (!isNaN(s[i]) || s[i] === '.') {
                num += s[i];
            }
            if ((isNaN(s[i]) && s[i] !== '.') || i === s.length - 1) {
                const number = parseFloat(num);
                if (!isNaN(number)) {
                    if (prevSign === "+") {
                        calc.push(number);
                    } else if (prevSign === "-") {
                        calc.push(-number);
                    } else if (prevSign === "*") {
                        calc.push(Math.floor(calc.pop() * number));
                    } else {
                        calc.push(Math.trunc(calc.pop() / number));
                    }
                }
                prevSign = s[i];
                num = "";
            }
        }
        return calc.reduce((a, b) => a + b, 0);
    }

    const handleResultSubmit = () => {
        const calculatedResult = calculate(numbers);
        setResult(calculatedResult);
        setHidden(false);
    };
    const handleOperatorsChange = (value) => {
        const regex = /[+\-*/]$/;
        const inputValue = value.target.value;
        console.log(regex.test(numbers));
             if(numbers.length > 0 && regex.test(numbers)){
                setNumbers(numbers.slice(0, -1)+ inputValue);
            } else if(numbers.length > 0){
                 setNumbers(numbers+inputValue)
             }
        setHidden(true);
    };
    const handleChangeDel = () => {
        if (numbers !== null && numbers !== ''){
            setNumbers(numbers.substring(0, numbers.length - 1));
    } setHidden(true);
    }
    const handleNumbersChange = (event) => {
        if (event && event.target && event.target.value !== undefined) {
            const inputValue = event.target.value;
            const regex = /^[0-9]*\.?[0-9]*$/;
            const regex1 = /[+\-*/.]$/;
            var lastChar = inputValue.slice(-1);
            if (regex.test(lastChar) ) {
                if (inputValue.length >= 2){
                const secondLastChar = inputValue.slice(-2, -1);
                if (!(lastChar === '0' && secondLastChar === '/' ) && !(lastChar === '.' && (numbers.match(/[+\-*/.]/g) || []).length > 1)) {
                setNumbers(inputValue);}
                } else if (lastChar!=='.'){
                    setNumbers(inputValue);
                }
            }
            setHidden(true);
        }
    };
    function checkDecimalAfterOperator(value) {
        let regex = /[-+*/](?=\d+(\.\d+)?(?![0-9.]))/;
        return regex.test(value);
    }

    const numbersReset = () => {
       setNumbers("");
        setHidden(true);
    };
    return (
        <div className={"cancul-form"}>
<div className={"form"}>
            <input className="number-input" type="text" value={numbers} onChange={handleNumbersChange}/>
            <h1 hidden={hidden}>Result: {result}</h1>
    <div className="grid-container">
        <button onClick={() => handleNumbersChange({target: {value: numbers + '7'}})}>7</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '8'}})}>8</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '9'}})}>9</button>
        <button onClick={handleChangeDel}>DEL</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '4'}})}>4</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '5'}})}>5</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '6'}})}>6</button>
        <button onClick={() => handleOperatorsChange( {target: {value:'+'}})}>+</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '1'}})}>1</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '2'}})}>2</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '3'}})}>3</button>
        <button onClick={() => handleOperatorsChange( {target: {value:'-'}})}>-</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '.'}})}>.</button>
        <button onClick={() => handleNumbersChange({target: {value: numbers + '0'}})}>0</button>
        <button onClick={() => handleOperatorsChange( {target: {value:'/'}})}>/</button>
        <button onClick={() => handleOperatorsChange( {target: {value:'*'}})}>×</button>
        <button className="column-span" type="button" onClick={numbersReset}>RESET</button>
        <button className="column-span" type="button" onClick={handleResultSubmit}>=</button>
    </div>
</div>
        </div>
    );
};

export default CanculWrapper;
