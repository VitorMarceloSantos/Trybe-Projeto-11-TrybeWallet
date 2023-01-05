import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaMoneyBillWave, FaUserCircle } from 'react-icons/fa';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { userState, walletState } = this.props;
    return (
      <div className="container-header">
        <div className="container-logo">
          <FaMoneyBillWave className="icon-money" />
          <h1>DASHBOARD - TRYBEWALLET</h1>
        </div>
        <div className="container-login-position">
          <section className="container-login">
            <FaUserCircle className="icon-user-login" />
            <p data-testid="email-field">
              {`${userState.email}`}
            </p>
          </section>
          <section className="container-expenses">
            <p style={ { fontSize: '1.05em', fontWeight: 700 } }>Despesa Total:</p>
            <div className="container-expenses-total">
              <p style={ { width: '4.3vw' } } data-testid="total-field">
                { (walletState.expenses).length === 0 ? (0)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : (
                  ((walletState.expenses)
                    .reduce((acc, current) => acc + (current.value * (Number(
                      current.exchangeRates[current.currency].ask,
                    ))), 0))
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                )}
              </p>
              <p
                style={ { fontSize: '0.8em', fontWeight: 700 } }
                data-testid="header-currency-field"
              >
                BRL
              </p>
            </div>
            {/* <div className="container-coin-header">
              <p
                style={ { fontSize: '0.8em', fontWeight: 700 } }
                data-testid="header-currency-field"
              >
                BRL
              </p>
            </div> */}
          </section>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
  walletState: state.wallet,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  walletState: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }).isRequired,
};
