/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostList from './src/screens/PostList';
import PostDetail from './src/screens/PostDetail';
import Login from './src/screens/Login';
import reducers from './src/reducers';

const Root = createStackNavigator();
const store = createStore(reducers, applyMiddleware(thunk));

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen
            name="Login"
            component={Login}
            options={{ headerLeft: null }}
          />
          <Root.Screen
            name="PostList"
            component={PostList}
            options={{ headerLeft: null }}
          />
          <Root.Screen
            name="PostDetail"
            component={PostDetail}
            options={{ headerLeft: null }}
          />
        </Root.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
