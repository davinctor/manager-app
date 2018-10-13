import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyB1-MENvRk0MG3DAnxtqMO7OYvR5gHWOwU',
            authDomain: 'manager-react-native-ea5ba.firebaseapp.com',
            databaseURL: 'https://manager-react-native-ea5ba.firebaseio.com',
            projectId: 'manager-react-native-ea5ba',
            storageBucket: '',
            messagingSenderId: '928036357106'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
