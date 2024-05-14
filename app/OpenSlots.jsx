import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Text,
  Card,
  IconButton,
  TextInput,
  Provider as PaperProvider,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const DoctorSchedulePage = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09");
  const [endTime, setEndTime] = useState("10");
  const [timeSlots, setTimeSlots] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addTimeSlot = () => {
    const formattedDate = date.toISOString().split("T")[0]; // Formats the date to YYYY-MM-DD
    const newTimeSlot = { date: formattedDate, startTime, endTime };
    setTimeSlots([...timeSlots, newTimeSlot]);
    //implement database backed of adding time slot
  };

  const deleteTimeSlot = (index) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots.splice(index, 1);
    setTimeSlots(newTimeSlots);
    //implement database backed of deleting time slot
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Add Time Slot"
            titleStyle={styles.cardTitle}
            left={(props) => (
              <IconButton {...props} icon="calendar-clock" size={25} />
            )}
          />
          <Card.Content>
            <Button
              icon="calendar"
              mode="outlined"
              style={styles.button}
              onPress={() => setShowDatePicker(true)}
            >
              Select Date
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <TextInput
              label="Start Hour"
              value={startTime}
              onChangeText={setStartTime}
              mode="outlined"
              style={styles.input}
              dense
            />

            <TextInput
              label="End Hour"
              value={endTime}
              onChangeText={setEndTime}
              mode="outlined"
              style={styles.input}
              dense
            />

            <Button
              icon="plus"
              disabled={!startTime || !endTime}
              mode="contained"
              onPress={addTimeSlot}
              style={styles.addButton}
            >
              Add Time Slot
            </Button>
          </Card.Content>
        </Card>

        {timeSlots.map((item, index) => (
          <Card key={index} style={styles.timeSlotCard}>
            <Card.Title
              title={`Slot on ${item.date}`}
              subtitle={`From ${item.startTime}:00 till ${item.endTime}:00`}
              left={(props) => (
                <IconButton {...props} icon="clock-outline" color="#5C6BC0" />
              )}
              titleStyle={styles.slotTitle}
              subtitleStyle={styles.slotSubtitle}
            />
            <Card.Actions>
              <IconButton
                icon="delete"
                color="#E53935"
                onPress={() => deleteTimeSlot(index)}
                style={styles.deleteButton}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    padding: 8,
  },
  card: {
    marginBottom: 20,
    elevation: 3,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 20,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "black",
  },
  timeSlotCard: {
    marginBottom: 15,
    elevation: 2,
    borderRadius: 8,
  },
  slotTitle: {
    color: "#3949AB",
    fontWeight: "500",
  },
  slotSubtitle: {
    color: "#1A237E",
  },
  deleteButton: {
    marginLeft: "auto",
  },
});

export default DoctorSchedulePage;
