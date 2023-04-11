import * as React from 'react';

import { Link } from 'react-router-dom';

import styles from '../First.module.scss';
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.linkk} to="/" >
          <h1 className={styles.nh1}> User Management</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
