import React from 'react';
import styles from './Nav.module.css';
import * as data from './links.json';
import logo from "../../assets/lahhLogo.png"
const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
    label: string;
    href: string;
};

// get the links data from the links.json and iterativley adds them
const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    return (
        <div className={styles['links-container']}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })}
        </div>
    )
};

const Nav: React.FC<{}> = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
            <a href="/" style={{textDecoration: 'none'}}>
            <img src= {logo} alt="Logo" style={{height: "10%", width: "10%"}} />
            <span>LACountyHomelessHelper</span></a>
            </div>
            <Links links={links} />
        </nav>
    )
}


export default Nav;