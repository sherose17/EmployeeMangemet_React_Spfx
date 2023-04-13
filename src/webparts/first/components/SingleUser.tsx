import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { sp } from './Sp/spauth';
import Profile from "./Profile";
import styles from './First.module.scss';
import Layout from './Layout/Layout';
interface UserProps { }

const SingleUser: React.FC<UserProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const profileId = parseInt(id);
  const navigate = useNavigate();
  useEffect(() => {
    // get a specific item by id.
    (async () => {
      try {
        const item: any = await sp.web.lists.getByTitle('userlist').items.getById(profileId)();

        setDesignation(item.designation);
        setEmail(item.email);
        setName(item.first_name);
        setImage(item.imagePath)
        // console.log(item)

      } catch (error) {
        console.log(error);

      }
    })();
  }, [id]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
    console.log(handleFileInputChange)
  };
  const handleUploadClick = () => {
    if (!selectedFile) {
     // console.error('No file selected');
      return;
    }
  }
  console.log(handleUploadClick)
  const deleteClick = async (id: string) => {

    const itemId = Number(id)
    console.log(itemId)

    try {
      await sp.web.lists.getByTitle('userlist').items.getById(itemId).delete();
    } catch (error) {
      console.log(error)
    }

    navigate("/")
    window.location.reload()
  }
  
  const updateClick = async (id: string) => {
    const itemId = Number(id)
    let updatedId
    try {
      const res: any = await sp.web.lists.getByTitle("userlist").items.getById(itemId)()
      console.log(res.Id,"updated")
       updatedId =res.Id
    } catch (error) {
      console.log(error)
    }

    navigate(`/update/${updatedId}`)
  }
  return (
    <Layout>
      <Profile />
      <div className={styles.userContainer}>
        <img className={styles.profileImage} src={image} alt="Employee Image" />
        <h2 className={styles.userName}>Name:  {name}</h2>
        <p className={styles.userEmail}>Email: {email}</p>
        <p className={styles.userDesignation}>Designation:  {designation}</p>
        <button className={styles.btn1} onClick={() => updateClick(`${profileId}`)}>Update</button>
        <button className={styles.btn} onClick={() => deleteClick(`${profileId}`)}>Delete</button>
      </div>
    </Layout>
  );
};

export default SingleUser;
