import React,  { FC } from 'react';
import styles from './HeaderNav.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { NavLink, NavLinkProps } from "react-router-dom";

export const HeaderNav:FC = () => {

    return (
    <div className={styles.headerNavigator}>
        <nav>
            <ul>
                <li className={styles.navItem}>
                    <NavLink className={({ isActive }) => isActive ? styles.navLinkActive : ''} to="/">All Movies</NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink className={({ isActive }) => isActive ? styles.navLinkActive : ''} to="/favorite">Favourite</NavLink>
                </li>
                <li className={styles.navItem}>
                    <button className={styles.signInBtn}>
                        <NavLink to="/users">Sign In</NavLink>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
)
}