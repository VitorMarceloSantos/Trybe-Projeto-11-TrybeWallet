export const walletCorrect = 'WALLET_CORRECT';
export const walletExchange = 'WALLET_EXCHANGE';
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case walletCorrect:
    return {
      ...state,
      ...action.payload,
    };
  case walletExchange:
    return {
      ...state,
      ...(state.expenses).push(action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
