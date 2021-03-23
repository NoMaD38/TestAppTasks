import React from 'react';
import { Portal } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChangeTask from '../app/components/change-task/ChangeTask';
import CreateTask from '../app/components/create-task/CreateTask';
import ListTasks from '../app/components/list-tasks/ListTasks';
import { SortDirectionEnum, SortFieldEnum } from '../utils/Api';

export type RootParamList = {
  ListTasks: undefined;
  CreateTask: {
    data: {
      page: number;
      sortField: SortFieldEnum | undefined;
      sortDirection: SortDirectionEnum | undefined;
    };
    hideSuccessModal: () => void;
  };
  ChangeTask: {
    id: number;
    status: number;
    text: string;
    data: {
      page: number;
      sortDirection: SortDirectionEnum | undefined;
      sortField: SortFieldEnum | undefined;
    };
  };
};

const Stack = createStackNavigator();

export default function MainStack(): JSX.Element {
  return (
    <Portal.Host>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="ListTasks" component={ListTasks} />
          <Stack.Screen name="CreateTask" component={CreateTask} />
          <Stack.Screen name="ChangeTask" component={ChangeTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </Portal.Host>
  );
}
