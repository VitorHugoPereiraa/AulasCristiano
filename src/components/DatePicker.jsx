import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const MyDatePicker = ({ selectedDate, setSelectedDate }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };
  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <Text>Selecione uma data</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={handleDateChange}
        />
      )}
      <Text>Data selecionada: {selectedDate.toDateString()}</Text>
    </View>
  );
};

export default MyDatePicker;
