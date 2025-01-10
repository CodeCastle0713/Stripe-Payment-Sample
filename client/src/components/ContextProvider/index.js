import {createContext , useState} from 'react';

export const MyContext = createContext();

function ContextProvider({children}) {
    const [data,setData] = useState({});

    return(
        <MyContext.Provider
            value = {{
                data,
                setData
            }}    
        >
            {children}
        </MyContext.Provider>
    );
}
export default ContextProvider;