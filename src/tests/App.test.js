import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

const emailInput = 'email-input';
const passwordInput = 'password-input';

describe('Verifica os elementos do componente Login', () => {
  it('Email:', () => {
    renderWithRouterAndRedux(<App />);
    const loginEmail = screen.getByTestId(emailInput);
    expect(loginEmail).toHaveAttribute('type', 'email');
    expect(loginEmail).toBeInTheDocument();
  });
  it('Senha:', () => {
    renderWithRouterAndRedux(<App />);
    const loginPassword = screen.getByTestId(passwordInput);
    expect(loginPassword).toHaveAttribute('type', 'password');
    expect(loginPassword).toBeInTheDocument();
  });
  it('Entrar:', () => {
    renderWithRouterAndRedux(<App />);
    const loginEntrar = screen.getByRole('button', { name: 'Entrar' });
    expect(loginEntrar).toBeInTheDocument();
    expect(loginEntrar).toHaveAttribute('type', 'submit');
    expect(loginEntrar.disabled).toEqual(true);
  });
});

describe('', () => {
  it('Verifica se os valores são iguais, botão Entrar habilitado e mudança de rota:', () => {
    const testEmail = 'vitor@vitor.com';
    const testPassword = '1234567';
    renderWithRouterAndRedux(<App />);

    const loginEmail = screen.getByTestId(emailInput);
    const loginPassword = screen.getByTestId(passwordInput);
    const loginEntrar = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(loginEmail, testEmail);
    expect(loginEmail.value).toEqual(testEmail);

    userEvent.type(loginPassword, testPassword);
    expect(loginPassword.value).toEqual(testPassword);

    expect(loginEntrar.disabled).toEqual(false);

    userEvent.click(loginEntrar);
  });
});

describe('', () => {
  it('Verifica o botão Entrar está desabilitado com o valores incorretos:', () => {
    renderWithRouterAndRedux(<App />);

    const loginEmail = screen.getByTestId(emailInput);
    const loginPassword = screen.getByTestId(passwordInput);
    const loginEntrar = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(loginEmail, 'email@incorreto.com');
    userEvent.type(loginPassword, '987');

    expect(loginEntrar).toHaveAttribute('disabled');
  });
});

describe('Testa os valores do componente Wallet:', () => {
  it('', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(history.location.pathname).toBe('/carteira');
    const table = screen.getByRole('table');
    const value = screen.getByTestId('total-field');
    const loginEmailWallet = screen.getByTestId('email-field');
    expect(loginEmailWallet.textContent).toEqual('Email:');
    expect(value.textContent).toEqual('0.00');
    expect(table).toBeInTheDocument();
  });
  it('Adicionando valores:', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(history.location.pathname).toBe('/carteira');

    userEvent.type(screen.getByTestId('value-input'), '5');
    expect(screen.getByTestId('value-input')).toHaveValue(5);

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);
    expect(screen.getByTestId('total-field').textContent).toEqual('0.00');
  });
  it('Verifica a adição de despesa, edição da despesa e exclusão de despesa:', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inpValue = screen.getByTestId(/value-input/i);
    const inpDescription = screen.getByTestId(/description-input/i);
    const inpCurrency = screen.getByTestId(/currency-input/i);
    const inpMethod = screen.getByTestId(/method-input/i);
    const inpButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inpValue, '20.00');
    userEvent.type(inpDescription, 'Cinema');
    await waitFor(() => {
      userEvent.selectOptions(inpCurrency, ['BTC']);
    });
    userEvent.selectOptions(inpMethod, ['Dinheiro']);
    userEvent.click(inpButton);

    let descriptionAsync = await screen.findByRole('cell', { name: /Cinema/i });
    let valueAsync = await screen.findByRole('cell', { name: '20.00' });
    let currencyAsync = await screen.findByRole('cell', { name: /bitcoin/i });
    let methodAsync = await screen.findByRole('cell', { name: /dinheiro/i });

    expect(history.location.pathname).toBe('/carteira');
    expect(descriptionAsync).toBeInTheDocument();
    expect(valueAsync).toBeInTheDocument();
    expect(currencyAsync).toBeInTheDocument();
    expect(methodAsync).toBeInTheDocument();

    // Editando
    const editButton = await screen.findByTestId(/edit-btn/i);
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    const inpEditButton = screen.getByRole('button', { name: /Editar despesa/i });

    userEvent.clear(inpValue);
    userEvent.type(inpValue, '10.50');

    userEvent.clear(inpDescription);
    userEvent.type(inpDescription, 'Hamburguer');

    userEvent.selectOptions(inpCurrency, ['USD']);
    userEvent.selectOptions(inpMethod, ['Cartão de débito']);
    userEvent.click(inpEditButton);

    descriptionAsync = await screen.findByRole('cell', { name: /Hamburguer/i });
    valueAsync = await screen.findByRole('cell', { name: '10.50' });
    currencyAsync = await screen.findByRole('cell', { name: /dólar americano/i });
    methodAsync = await screen.findByRole('cell', { name: /cartão de débito/i });

    expect(descriptionAsync).toBeInTheDocument();
    expect(valueAsync).toBeInTheDocument();
    expect(currencyAsync).toBeInTheDocument();
    expect(methodAsync).toBeInTheDocument();

    // Excluindo
    const deleteButton = await screen.findByTestId(/delete-btn/i);
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);

    expect(descriptionAsync).not.toBeInTheDocument();
    expect(valueAsync).not.toBeInTheDocument();
    expect(currencyAsync).not.toBeInTheDocument();
    expect(methodAsync).not.toBeInTheDocument();
  });
});
