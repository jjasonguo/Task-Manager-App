import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { CalendarView } from '../components/CalendarView';
import { TaskModal } from '../components/TaskModal';
import { useTaskContext } from '../context/TaskContext';

export const CalendarScreen = () => {
  const { tasks, addTask } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleSaveTask = (taskData: any) => {
    const taskDate = selectedDate || new Date().toISOString().split('T')[0];
    addTask({
      ...taskData,
      completed: false,
      date: taskDate, // 'YYYY-MM-DD'
    });
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CalendarView
        tasks={tasks}
        onDayPress={handleDayPress}
        selectedDate={selectedDate}
      />
  
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
  
      <TaskModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveTask}
        initialTask={selectedDate ? { date: selectedDate } : undefined} // ✅ Just the date string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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