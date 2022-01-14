import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import logoIcon from '../../../assets/svg/logo.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/svg/twitter.svg';
import { ReactComponent as GithubIcon } from '../../../assets/svg/github.svg';
import { ReactComponent as MediumIcon } from '../../../assets/svg/medium.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/svg/linkedin.svg';

const Footer = () => (
  <footer className="footer">
    <Link to="/dashboard/assets" className="footer__logo">
      <ReactSVG src={logoIcon} wrapper="span" />
    </Link>
    <a className="footer__mail" href="mailto:support@ambrosus.io">
      support@ambrosus.io
    </a>
    <div className="footer__social">
      <MediumIcon />
      <GithubIcon />
      <LinkedinIcon />
      <TwitterIcon />
    </div>
  </footer>
);

export default Footer;
