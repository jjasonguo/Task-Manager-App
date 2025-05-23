import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { PRIORITY_COLORS, Task } from '../types/task';

interface CalendarViewProps {
  tasks: Task[];
  onDayPress: (date: DateData) => void;
  selectedDate?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  onDayPress,
  selectedDate,
}) => {
  const markedDates = useMemo(() => {
    const dates: { [key: string]: any } = {};
    
    tasks.forEach((task) => {
      const dateStr = task.date.split('T')[0];
      if (!dates[dateStr]) {
        dates[dateStr] = {
          marked: true,
          dots: [],
        };
      }
      
      dates[dateStr].dots.push({
        color: PRIORITY_COLORS[task.priority],
      });
    });

    if (selectedDate) {
      dates[selectedDate] = {
        ...(dates[selectedDate] || {}),
        selected: true,
        selectedColor: '#007AFF',
      };
    }

    return dates;
  }, [tasks, selectedDate]);

  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const selectedDateStr = selectedDate.split('T')[0];
    return tasks.filter(
      (task) => task.date === selectedDateStr
    ).sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [tasks, selectedDate]);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        markingType="multi-dot"
        theme={{
          todayTextColor: '#007AFF',
          selectedDayBackgroundColor: '#007AFF',
          dotStyle: {
            width: 6,
            height: 6,
            borderRadius: 3,
            marginTop: 2,
          },
        }}
      />

      {selectedDate && (
        <View style={styles.taskList}>
          <Text style={styles.dateHeader}>
            Tasks for {new Date(selectedDate + 'T12:00:00').toLocaleDateString()}
          </Text>
          {tasksForSelectedDate.length === 0 ? (
            <Text style={styles.noTasks}>No tasks for this date</Text>
          ) : (
            tasksForSelectedDate.map((task) => (
              <View
                key={task.id}
                style={[
                  styles.taskItem,
                  { borderLeftColor: PRIORITY_COLORS[task.priority] },
                ]}
              >
                <View style={styles.taskHeader}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.label && (
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>{task.label}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.taskDescription}>{task.description}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  taskList: {
    padding: 15,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noTasks: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
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
}); 