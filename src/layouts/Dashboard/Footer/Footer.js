import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import logoIcon from '../../../assets/svg/logo.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/svg/twitter.svg';
import { ReactComponent as GithubIcon } from '../../../assets/svg/github.svg';
import { ReactComponent as MediumIcon } from '../../../assets/svg/medium.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/svg/linkedin.svg';

const Footer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isSuperAccount = userInfo.permissions.includes('super_account');
  return (
    <footer className="footer">
      <Link
        to={isSuperAccount ? '/dashboard/node' : '/dashboard/assets'}
        className="footer__logo"
      >
        <ReactSVG src={logoIcon} wrapper="span" />
      </Link>
      <a className="footer__mail" href="mailto:support@ambrosus.io">
        support@ambrosus.io
      </a>
      <div className="footer__social">
        <a href="https://blog.ambrosus.io/" target="_blank">
          <MediumIcon />
        </a>
        <a href="https://github.com/ambrosus" target="_blank">
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/company/ambrosus-ecosystem"
          target="_blank"
        >
          <LinkedinIcon />
        </a>
        <a href="https://twitter.com/AMB_Ecosystem" target="_blank">
          <TwitterIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
