import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// <<<<<<< Moe-Branch
// const SymptomCheckerOutput = ({ route,navigation }) => {
//   const [isLoading, setLoading] = useState(true);
//   const [disease, setDisease] = useState();
//   const [doctors, setDoctors] = useState([]);
//   const { selectedSymptoms } = route.params.selectedSymptoms;
//   const json = {
//     disease: {
//       name: "Type 2 Diabetes",
//       explanation:
//         "Type 2 diabetes is a chronic condition that affects the way the body processes blood sugar (glucose). With type 2 diabetes, the body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels.",
//     },
//     doctors: [
//       {
//         id: 1,
//         name: "Dr. Sarah Lee",
//         specialty: "Endocrinologist",
//         image:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnu4s-gW1OowMKMJPWCfqJsxSYEpLOaVi1A&s",
//         contactInfo: "555-0100",
//       },
//       {
//         id: 2,
//         name: "Dr. John Doe",
//         specialty: "General Practitioner",
//         image:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnu4s-gW1OowMKMJPWCfqJsxSYEpLOaVi1A&s",
//         contactInfo: "555-0102",
//       },
//       {
//         id: 3,
//         name: "Dr. Jane Smith",
//         specialty: "Dietician",
//         image:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnu4s-gW1OowMKMJPWCfqJsxSYEpLOaVi1A&s",
//         contactInfo: "555-0103",
//       },
//     ],
//   };
// =======
const SymptomCheckerOutput = ({ route }) => {
  const { diseaseInfo } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{diseaseInfo["Disease Name"]}</Text>
      <Text style={styles.description}>{diseaseInfo["Disease Description"]}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symptoms</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["Symptoms"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Causes</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["Causes"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Home Treatment Tips</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["Home Treatment tips"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Don'ts</Text>
        <Text style={styles.sectionContent}>{diseaseInfo["DONT'S"]}</Text>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
  },
  doctorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 8,
  },
  doctorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  doctorIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  doctorName: {
    fontSize: 16,
  },
});

export default SymptomCheckerOutput;
