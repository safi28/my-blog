import { createContext, useContext, useEffect, useReducer } from 'react';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const initialState = {
    isAuthenticated: localStorage.getItem(process.env.REACT_APP_AUTH_CONTEXT) !== null,
  };

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem(process.env.REACT_APP_AUTH_CONTEXT, state.isAuthenticated);
    console.log(state.isAuthenticated, 'my state');
  }, [state.isAuthenticated]);

  const login = () => dispatch({ type: LOGIN });
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
