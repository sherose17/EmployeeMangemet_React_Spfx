import * as React from 'react';

import { HashRouter } from 'react-router-dom';

import App from './App';
import { IFirstProps } from './IFirstProps';
import UserContextProvider from './contexts/userContext';


export default class First extends React.Component<IFirstProps, {}> {
  public render(): React.ReactElement<IFirstProps> {

    return (
      <UserContextProvider>
        <HashRouter>
        <App />
        </HashRouter>
      </UserContextProvider>

    );
  }
}
