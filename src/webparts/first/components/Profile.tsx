import * as React from 'react'

import { useNavigate } from 'react-router-dom';

import styles from "./First.module.scss";


const Profile = () => {
    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate("/")
    }

    const handleClickAddUser = () => {
        navigate("/add")
    }

    const handleClickDoc = () => {
        navigate("/")
    }

    return (
        <>

            <button className={styles['button-back']} onClick={handleClickHome}>back</button>
            <button className={styles['button-profile']} onClick={handleClickAddUser}>Profile</button>
            <button className={styles['button-document']} onClick={handleClickDoc}>Document</button>

        </>
    )
}

export default Profile