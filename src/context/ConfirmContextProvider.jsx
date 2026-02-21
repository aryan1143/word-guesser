import React, { useState } from 'react'
import CustomAlertConfirm from '../components/CustomAlertConfirm';
import ConfirmContext from './ConfirmContext';

const ConfirmContextProvider = ({ children }) => {
    const [confirmState, setConfirmState] = useState({
        isOpen: false,
        message: '',
        resolve: null,
    });
    const [diaogType, setDiaogType] = useState(null);

    const confirmBox = (message) => {
        setDiaogType('confirm');
        return new Promise((resolve) => {
            setConfirmState({
                isOpen: true,
                message,
                resolve
            });
        });
    }

    const alertBox = (message) => {
        setDiaogType('alert');
        setConfirmState({
            isOpen: true,
            message,
            resolve: null
        });
    }

    const closeDialog = () => {
        setDiaogType('');
        setConfirmState({
            isOpen: false,
            message: '',
            resolve: null
        })
    }

    const handleOnConfirm = () => {
        if (diaogType === 'alert') {
            closeDialog();
        } else {
            if (confirmState.resolve) confirmState.resolve(true);
            closeDialog();
        }
    }

    const handleOnCancel = () => {
        if (confirmState.resolve) confirmBox.resolve(false);
        closeDialog();
    }

    return (
        <ConfirmContext.Provider value={{ confirmBox, alertBox }}>
            {children}
            {confirmState.isOpen &&
                <CustomAlertConfirm dialogType={diaogType} messege={confirmState.message} handleOnConfirm={handleOnConfirm} handleOnCancel={handleOnCancel} />
            }
        </ConfirmContext.Provider>
    )
}

export default ConfirmContextProvider