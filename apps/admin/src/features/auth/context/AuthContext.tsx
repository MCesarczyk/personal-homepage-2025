import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

import { User } from "../validation/authSchemas";
import { authService } from "../api/authService";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "../../../shared/constants/localStorage";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "AUTH_START" }
  | {
      type: "AUTH_SUCCESS";
      payload: { accessToken: string; refreshToken: string; user: User };
    }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN),
  refreshToken: localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    occupation: string,
    introduction: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
      if (accessToken && refreshToken) {
        try {
          const user = await authService.getCurrentUser();
          if (user) {
            dispatch({
              type: "AUTH_SUCCESS",
              payload: { accessToken, refreshToken, user },
            });
          }
        } catch (error) {
          console.log({ error });
          localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
          dispatch({ type: "AUTH_LOGOUT" });
        }
      } else {
        dispatch({ type: "AUTH_LOGOUT" });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, response.refreshToken);
      const user = await authService.getCurrentUser();

      dispatch({ type: "AUTH_SUCCESS", payload: { ...response, user } });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: (error as Error).message });
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    occupation: string,
    introduction: string,
  ) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await authService.register({
        name,
        email,
        password,
        confirmPassword,
        occupation,
        introduction,
      });
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, response.refreshToken);
      const user = await authService.getCurrentUser();
      dispatch({ type: "AUTH_SUCCESS", payload: { ...response, user } });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: (error as Error).message });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
      dispatch({ type: "AUTH_LOGOUT" });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
