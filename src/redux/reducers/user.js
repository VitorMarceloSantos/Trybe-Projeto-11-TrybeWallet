export const userCorrect = 'USER_CORRECT';
const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case userCorrect:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
