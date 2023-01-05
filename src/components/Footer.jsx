/* eslint-disable jsx-a11y/control-has-associated-label */
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import React, { Component } from 'react';
import '../styles/footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="container-footer-global">
        <small className="desenvolvedor">
          &copy;Desenvolvido por Vitor Marcelo - Turma 23 - Tribo B
        </small>
        <div className="icons">
          <a href="https://github.com/VitorMarceloSantos" target="_blank" rel="external noreferrer"><AiFillGithub className="icon-developer" /></a>
          <a href="https://www.linkedin.com/in/vitor-marcelo-santos/" target="_blank" rel="external noreferrer"><AiFillLinkedin className="icon-developer" /></a>
        </div>
      </div>

    );
  }
}

export default Footer;
