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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostList from './src/screens/PostList';
import PostDetail from './src/screens/PostDetail';
import Account from './src/screens/Account';
import Login from './src/screens/Login';
import MainMenu from './src/components/MainMenu';
import reducers from './src/reducers';

const Tab = createBottomTabNavigator();
const store = createStore(reducers, applyMiddleware(thunk));

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <MainMenu {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="PostList" component={PostList} />
          <Tab.Screen name="PostDetail" component={PostDetail} />
          <Tab.Screen name="Account" component={Account} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
