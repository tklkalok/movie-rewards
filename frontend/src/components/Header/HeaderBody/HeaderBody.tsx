import React,  { FC, useState } from 'react';
import logo from '../../../assets/logo/movie-rewards-logo-white.svg';
import styles from './HeaderBody.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HeaderNav } from '../HeaderNav/HeaderNav';

export const HeaderBody:FC = () => {
  return (
    <div className={styles.headerBodyComponent}>
        <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo}/>
        </div>
        <HeaderNav/>
    </div>
  )
}