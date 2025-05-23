import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { TaskList } from '../components/TaskList';
import { TaskModal } from '../components/TaskModal';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/task';

export const TasksScreen = () => {
  const { tasks, addTask, updateTask, toggleTaskCompletion, deleteTask } = useTaskContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [sortByPriority, setSortByPriority] = useState(true);

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    if (selectedTask) {
      updateTask({
        ...selectedTask,
        ...taskData,
      });
    } else {
      addTask({
        ...taskData,
        completed: false,
      });
    }
    setIsModalVisible(false);
    setSelectedTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(taskId),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sortToggle}>
          <Ionicons name="calendar-outline" size={18} color="#666" />
          <Switch
            value={sortByPriority}
            onValueChange={setSortByPriority}
            trackColor={{ false: 'grey', true: 'grey' }}
            thumbColor="white"
            style={{ marginHorizontal: 8 }}
          />
          <Ionicons name="alert-circle-outline" size={18} color="#666" />
        </View>
      </View>

      <TaskList
        tasks={tasks}
        onTaskPress={handleTaskPress}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={handleDeleteTask}
        sortByPriority={sortByPriority}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedTask(undefined);
          setIsModalVisible(true);
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <TaskModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedTask(undefined);
        }}
        onSave={handleSaveTask}
        initialTask={selectedTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingRight: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 