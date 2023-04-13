import * as React from "react"

import { useNavigate } from 'react-router-dom';

//import { sp } from "./Sp/spauth"
import styles from "./First.module.scss";
import { IUser } from './types';
//import { UserContext } from "../components/contexts/userContext";
interface Props {
  user: IUser;
}

const Card: React.FC<Props> = ({ user }) => {
  const { imagePath } = user
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    console.log(`Card with id ${id} clicked`);
    navigate(`/single/${id}`);
  };
  return (
    <div className={styles.card} onClick={() => handleCardClick(user.Id)}>
      <div className={styles.imageFront}>
        <img src={`${imagePath}`} alt="Employee" />
      </div>
      <div className={styles.format}>
        <h1 className={styles.cardUserName}>{user.first_name}</h1>
        <h2 className={styles.cardDetailsEmail}>{user.email}</h2>
        <h2 className={styles.cardDetailsPostion}>{user.designation}</h2>
        
        <div>

        </div>
       

      </div>

    </div>
  );
}

export default Card;
