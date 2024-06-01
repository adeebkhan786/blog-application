import { createContext, useState } from "react";


export const DataContext = createContext(null);



const DataProvider = ({ children }) => {


  const [account, setAccount] = useState({ username: '', name: '' });

  return (
    // <div style={{ backgroundColor: '#d2d6d6' }}>
    <DataContext.Provider value={{ account, setAccount }}>{children}</DataContext.Provider>
    // </div>
  )
}

export default DataProvider;