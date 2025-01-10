import {useState} from 'react';

function Test1() {
    const [func , setFunc] = useState(()=>()=>{});

    const plus = (a , b) => {
        alert( a + b );
    }

    const minus = (a , b) => {
        alert( a - b );
    }

    return(
        <div>
            <h1 onClick = {func}>Please Click me</h1>
            <button onClick = {()=>{setFunc(() => () => plus(4,2))}}>Set Plus</button><br />
            <button onClick = {()=>{setFunc(() => () => minus(4,2))}}>Set Minus</button>
        </div>
    );
}
export default Test1;