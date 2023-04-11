import * as React from "react";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from './Layout/Layout';
import styles from "./First.module.scss";
//import {sp}from "./Sp/spauth"
//import { UserContext } from "../components/contexts/userContext";

interface UpdatedUserProps { }

export const UpdatedUser: React.FC<UpdatedUserProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate('/');
  }
  return (
    <Layout>
      <div className={styles.adduser}>
        <div className={styles.addimage}>
          <div className={styles.image}></div>
          <h1> {name} </h1>
        </div>
        <div className={styles.adddetails}>
          <form>
            <div className=''>
              <input
                type='text'
                name='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                name='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                name='designation'
                placeholder='Enter Designaton '
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              <br />
              <button className='add-btn' onClick={handleClick} type='submit' value='Submit'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
