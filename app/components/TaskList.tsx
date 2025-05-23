import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { PRIORITY_COLORS, Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  sortByPriority: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskPress,
  onToggleComplete,
  onDeleteTask,
  sortByPriority,
}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // First, organize tasks by completed vs not completed
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (sortByPriority) {
      // Sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // If priority is equal, sort by date
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      // Sort by date first
      const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateDiff !== 0) return dateDiff;

      // If dates are equal, sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  const renderRightActions = (taskId: string) => {
    return (
      <RectButton
        style={styles.deleteButton}
        onPress={() => onDeleteTask(taskId)}
      >
        <Animated.View style={styles.deleteButtonContent}>
          <Ionicons name="trash-outline" size={24} color="white" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Animated.View>
      </RectButton>
    );
  };

  const renderTask = (task: Task) => {
    // Convert date string to local date object
    const [year, month, day] = task.date.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    
    return (
      <Swipeable
        renderRightActions={() => renderRightActions(task.id)}
        overshootRight={false}
      >
        <TouchableOpacity
          style={[
            styles.taskItem,
            { borderLeftColor: PRIORITY_COLORS[task.priority] },
            task.completed && styles.completedTask,
          ]}
          onPress={() => onTaskPress(task)}
        >
          <View style={styles.taskContent}>
            <View style={styles.taskHeader}>
              <Text style={[styles.title, task.completed && styles.completedText]}>
                {task.title}
              </Text>
              {task.label && (
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>{task.label}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.description, task.completed && styles.completedText]}>
              {task.description}
            </Text>
            <Text style={styles.date}>
              {localDate.toLocaleDateString()}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.checkbox, task.completed && styles.checked]}
            onPress={() => onToggleComplete(task.id)}
          >
            {task.completed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const incompleteTasks = sortedTasks.filter(task => !task.completed);
  const completedTasks = sortedTasks.filter(task => task.completed);

  return (
    <ScrollView style={styles.container}>
      {incompleteTasks.map((task) => (
        <View key={task.id} style={styles.taskWrapper}>
          {renderTask(task)}
        </View>
      ))}
      {completedTasks.length > 0 && (
        <View style={styles.completedSeparator}>
          <Text style={styles.completedSeparatorText}>Completed Tasks</Text>
        </View>
      )}
      
      {completedTasks.map((task) => (
        <View key={task.id} style={styles.taskWrapper}>
          {renderTask(task)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskWrapper: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  labelContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  completedTask: {
    opacity: 0.7,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  completedSeparator: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#999',
  },
  completedSeparatorText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
}); 