import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { clientAPI } from '../service/clientService';
import { authAPI } from './../service/authService';
import { employeeAPI } from './../service/employeeService';
import { departmentAPI } from './../service/department';
import { operationAPI } from './../service/operationServise';
import { legalAPI } from '../service/legalService';
import { accountAPI } from '../service/accountService';

const rootReducer = combineReducers({
    [authAPI.reducerPath]: authAPI.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [clientAPI.reducerPath]: clientAPI.reducer,
    [departmentAPI.reducerPath]: departmentAPI.reducer,
    [operationAPI.reducerPath]: operationAPI.reducer,
    [accountAPI.reducerPath]: accountAPI.reducer,
    [legalAPI.reducerPath]: legalAPI.reducer
})

export const setupStore = () => {
  return configureStore({
      reducer:rootReducer,
      middleware:(getDefaultMiddleware) => 
          getDefaultMiddleware()
            .concat(
              employeeAPI.middleware,
              authAPI.middleware,
              clientAPI.middleware,
              departmentAPI.middleware,
              operationAPI.middleware,
              accountAPI.middleware,
              legalAPI.middleware
            )
  })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
