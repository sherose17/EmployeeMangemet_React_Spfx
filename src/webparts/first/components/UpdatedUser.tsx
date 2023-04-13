import * as React from "react";

import { useState } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';

import Layout from './Layout/Layout';
import styles from "./First.module.scss";
import {sp}from "./Sp/spauth"
//import { UserContext } from "../components/contexts/userContext";

interface UpdatedUserProps { }

export const UpdatedUser: React.FC<UpdatedUserProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  
  const { id } = useParams<{ id: string }>();
  const emplyeeId = parseInt(id);
 React.useEffect(()=>{
   (async()=>{
    try {
      const item: any = await sp.web.lists.getByTitle('userlist').items.getById(emplyeeId)();
      setDesignation(item.designation);
      setEmail(item.email);
      setName(item.first_name);
      }
      catch(error){
        console.log(error)
      }
    })()
 })
 const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    setSelectedFile(event.target.files[0]);
  }
};
  const handleUploadClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e
    const item: any = await sp.web.lists.getByTitle('userlist').items.getById(emplyeeId)();
    console.log(item,"lin44")
    const res= await sp.web.getFolderByServerRelativePath(item?.ImageUrl).files.addUsingPath(`${selectedFile.name}`, selectedFile, { Overwrite: true })
    
    const list = sp.web.lists.getByTitle("userlist");
    await list.items.getById(emplyeeId).update({
      imagePath: res?.data.ServerRelativeUrl
    }); 
    navigate("/")
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
              <div>
      <input className={styles['button-back']} type="file" onChange={handleFileInputChange} />
      <div>
        <button className={styles['button-document']} onClick={handleUploadClick}>Upload</button>
      </div>

      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <img className={styles.AddImage} src={URL.createObjectURL(selectedFile)} alt="Selected file preview" />
        </div>
      )}
    </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
