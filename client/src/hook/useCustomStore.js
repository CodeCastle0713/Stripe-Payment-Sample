import { useContext } from "react";

import { MyContext } from "../components/ContextProvider";

const useCustomStore = () => {
    const {data, setData} = useContext(MyContext);
    
    const getValue = (key)=> {
        return data[key] || "Value is Empty...";
    }

    const setValue = (key , value) => {
        setData((prev) => {
            return {
                ...prev ,
                [key] : value
            };
        })
    }

    return {getValue , setValue};
}
export default useCustomStore;