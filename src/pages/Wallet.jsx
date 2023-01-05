import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import wallet from '../redux/reducers/wallet';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../styles/containers.css';
import Footer from '../components/Footer';

class Wallet extends React.Component {
  render() {
    // const { userState } = this.props;
    return (
      <div>
        <section className="container-header">
          <Header />
        </section>
        <section className="container-form">
          <WalletForm />
        </section>
        <section className="container-table">
          <Table />
        </section>
        <section className="container-footer">
          <footer>
            <Footer />
          </footer>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, null)(Wallet);

// Wallet.propTypes = {
//   userState: PropTypes.shape({
//     email: PropTypes.string.isRequired,
//   }).isRequired,
// };
