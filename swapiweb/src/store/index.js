import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// importando o 'container' de reducers como rootReducer
import rootReducer from "./reducers";

/*
    CRIANDO O ESTADO GLOBAL DA APLICAÇÃO   

    Essa função createStore() recebe como parâmetro o stado da aplicação,
    podendo ser qualquer coisa.
    Nesse caso foi passado o 'container' de reducers, onde contém as
    funções e lógicas que retornam um estado.

*/
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
