import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  

  function handleAddTask(newTaskTitle: string) {

    
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const updatedTasks = tasks.map(task => ({...task}));
    const foundItem = updatedTasks.find(item => item.title === newTaskTitle);

    console.log(foundItem?.title);

    if(foundItem?.title === data.title) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } else {
      setTasks(oldState => [...oldState, data]);
    }    

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));
    const foundItem = updatedTasks.find(item => item.id === id);

    if(!foundItem){
      return;
    }

    foundItem.done = !foundItem.done;
    console.log(tasks);
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "SIM", onPress: () => setTasks(oldState => oldState.filter(
          tasks => tasks.id !== id
        )) },
        { text: "NÃO", onPress: () => null }
      ],
      { cancelable: false }
    );
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task}));

    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);

    if(!taskToBeUpdated){
      return;
    }
    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})