import React, { createContext, useState } from 'react';


export const ModalContex = createContext()
const ModalProvider = ({children}) => {

    const [showModal, setShowModal] = useState(false)



    const modalData = {
       showModal,
        setShowModal
    }

    return <ModalContex.Provider value={modalData}>
        {children}
    </ModalContex.Provider>
};

export default ModalProvider;