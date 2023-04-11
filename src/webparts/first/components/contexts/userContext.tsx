import * as React from "react"

import {createContext, useEffect, useState} from 'react';

import {IUser,UserE}from '../types';
import { sp } from "../Sp/spauth"

type UserContextType = {

  users: IUser[];

  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;

  update: IUser[];

  setUpdate: React.Dispatch<React.SetStateAction<IUser[]>>;

};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({

  users: [],

  setUsers: () => { },

  update: [],

  setUpdate: () => { },

});




const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [update, setUpdate] = useState<UserE[]>([]);

  useEffect(() => {

    (async () => {

      const items: any = await sp.web.lists.getByTitle("userlist").items()
      //  console.log(items)
      const newUser = items?.map((item: any) => ({
        first_name: item.first_name,
        designation: item.designation,
        email: item.email,
        Id: item.Id,
        imagePath:item.imagePath
      }))
      //  console.log(newUser)
      setUsers(newUser)
      const webFolders = await sp.web.folders();
      console.log(webFolders)
      //console.log(users, "users")
      {
        users.map((user) => {
          return console.log(user)
        })
      }



    })()
  }, [])

  




  return (

    <UserContext.Provider value={{ users, setUsers, update, setUpdate }}>

      {children}

    </UserContext.Provider>

  );

};




export default UserContextProvider;