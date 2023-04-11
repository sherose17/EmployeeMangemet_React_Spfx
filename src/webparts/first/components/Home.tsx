import * as React from "react"

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './Card';
import styles from "./First.module.scss";
import Layout from './Layout/Layout';
import { UserContext } from "../components/contexts/userContext"
import { IUser } from './types';

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const { users } = useContext(UserContext);
  //console.log(users)
  const [query, setQuery] = useState<string>("");

  const handleClick = () => {
    navigate("/add");
  }

  return (
    <Layout>
      <div>
        <div className={styles.home}>
          <div>
            <input
              className={styles.serchtab}
              type="text"
              placeholder='Search'
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <h1>{users.length}</h1>
          </div>
          <div>
            <button onClick={handleClick} className={styles.homebtn} >Add User</button>
          </div>
        </div>
        <div className={styles.carddisplay}>
          {users?.filter((user: IUser) =>
            user?.first_name && user.first_name.toLowerCase().includes(query)
          )?.map((user: IUser) => <Card user={user} key={user.Id || 0} />)}

        </div>
      </div>
    </Layout>
  )
}

export default Home;
