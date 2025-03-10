import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

import home from '../../app/home'

const MenuRoutes = {
    Feed : {
        name: 'Feed',
        screen: home,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({tintColor}) => 
                <Icon name= 'home' size={30} color={tintColor} />
        }
    },

    Add: {
        name: 'AddPhoto',
        screen: home,
        navigationOptions: {
            title: 'Adicionar foto',
            tabBarIcon: ({tintColor}) =>
                <Icon name='camera' size={30} color={tintColor} />
        }
    },
    Profile: {
        name: 'Profile', 
        screen: home,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({tintColor}) =>
                <Icon name='user' size={30} color={tintColor} />
        }
        
    }

}

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        ShowLabel: false,
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)
export default MenuNavigator