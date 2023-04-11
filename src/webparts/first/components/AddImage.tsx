import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { sp } from './Sp/spauth';
import Layout from './Layout/Layout';
import styles from "./First.module.scss";

interface IFileUploadProps { }
const AddImage: React.FC<IFileUploadProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  
  const { id } = useParams<{ id: string }>();
  //console.log(name, email, designation)
  const emplyeeId = parseInt(id);
  //console.log(emplyeeId, "emp");

  useEffect(() => {
    // get a specific item by id.
    (async () => {
      try {
        const item: any = await sp.web.lists.getByTitle('userlist').items.getById(emplyeeId)();
        setDesignation(item.designation);
        setEmail(item.email);
        setName(item.first_name);
        setImageUrl(item.ImageUrl)
        // console.log(imageUrl,"sucees img")
        //console.log(item, "lasttime")
      } catch (error) {
        console.log(error);
      }
    })();
  }, [emplyeeId]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();
  //console.log(id);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    
    console.log(imageUrl);
    console.log(`${selectedFile.name}`, selectedFile);
    const item: any = await sp.web.lists.getByTitle('userlist').items.getById(emplyeeId)();
    console.log(item);
    
    const res= await sp.web.getFolderByServerRelativePath(item.ImageUrl).files.addUsingPath(`${selectedFile.name}`, selectedFile, { Overwrite: true })
    
    console.log(res, "newImgurl");
    //adding image path
    const list = sp.web.lists.getByTitle("userlist");
    
    await list.items.getById(emplyeeId).update({
      imagePath: res?.data.ServerRelativeUrl
    }); 
    navigate(`/`);
  };



  return (
    <Layout>

    <div className={styles.formInput}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className={styles.formInput}>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>

    <div className={styles.formInput}>
      <label htmlFor="designation">Designation:</label>
      <input type="text" name="designation" id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
    </div>

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
  </Layout>
  );
};

export default AddImage;
