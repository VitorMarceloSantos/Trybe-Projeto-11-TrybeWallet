import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserAction } from '../redux/actions';
import '../styles/login.css';
import logo from '../images/logo.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  randleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const quantCharacter = 6;
      if ((password.length >= quantCharacter) && (regexEmail.test(email))) {
        // console.log('Dados Corretos');
        this.setState({
          isDisable: false,
        }, () => {
          const buttonQuery = document.querySelector('.button-login');
          buttonQuery.style.backgroundColor = 'rgba(1, 184, 139, 255)';
        });
      } else {
        this.setState({
          isDisable: true,
        }, () => {
          const buttonQuery = document.querySelector('.button-login');
          buttonQuery.style.backgroundColor = 'rgb(205, 205, 205)';
        });
      }
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addUserAction(email)); // deve receber como parâmetro um objeto
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <section className="container-email">
        <div className="container-img-form">
          <img src={ logo } alt="Imagem Logo" />
          <form className="form-login">
            <label htmlFor="email">
              <p>Email:</p>
              <input
                type="email"
                name="email"
                data-testid="email-input"
                value={ email }
                onChange={ this.randleChange }
              />
            </label>
            <label htmlFor="password">
              <p>Senha:</p>
              <input
                type="password"
                name="password"
                data-testid="password-input"
                value={ password }
                onChange={ this.randleChange }
              />
            </label>
            <input
              className="button-login"
              type="submit"
              value="Entrar"
              disabled={ isDisable }
              onClick={ this.formSubmit }
            />
          </form>
        </div>
      </section>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
