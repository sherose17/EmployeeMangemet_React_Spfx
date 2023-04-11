import * as React from "react";
import { useState } from 'react';
//import { UserContext } from "../components/contexts/userContext";

import { useNavigate } from 'react-router-dom';
import styles from "./First.module.scss";
import Profile from "./Profile";
import { sp } from "./Sp/spauth"
interface AddUserProps { }

export const AddUser: React.FC<AddUserProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  
  
  const navigate = useNavigate();

  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newUser = {
      first_name: name,
      email: email,
      designation: designation,
    };


    const add = async () => {
      const res = await sp.web.lists.getByTitle("userlist").items.add(newUser)
      console.log(res.data.Id)
      const FolderId = res.data.Id
      const documentLibraryName = "Sample";
      const newFolderName = `${FolderId}`;
      const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
      documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
        .then((item) => {
          const res=item.data.ServerRelativeUrl
          
          const list = sp.web.lists.getByTitle("userlist");
        
           list.items.getById(FolderId).update({
            ImageUrl:res
          }); 
  
          //console.log(i)


         // console.log(res,"image path");
        })
        .catch((error) => {
          console.error(`Error creating folder: ${error}`);
        });
        navigate(`/image/${FolderId}`);
    };
    add()

    
  }
  return (
    <>
      <Profile/>
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
              
              <button className={styles.addbtn} onClick={handleClick} type='submit' value='Submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};


