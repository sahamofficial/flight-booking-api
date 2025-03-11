import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(248, 249, 250)",
  },
  tripTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "rgb(165, 165, 165)",
    alignItems: "center",
  },
  selectedTripType: {
    backgroundColor: "rgb(158, 194, 206)",
  },
  tripTypeText: {
    fontSize: 16,
    color: "rgb(34, 34, 34)",
  },
  selectedText: {
    color: "rgb(29, 39, 51)",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: "rgb(155, 155, 155)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgb(155, 155, 155)",
    color: "#fff",
    marginHorizontal: 5,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
    color: "#00aaff",
  },
  selectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    height: 45,
    backgroundColor: "rgb(145, 145, 145)",
    color: "#000",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  searchButton: {
    backgroundColor: "rgb(49, 46, 46)",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  flightItem: {
    padding: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  flightText: {
    fontSize: 14,
    color: "#ddd",
  },
  flightPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00aaff",
  },
  addButton: {
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
  },
  addButtonText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

});
