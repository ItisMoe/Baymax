import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { Icon } from 'react-native-elements';
import Toast from './Toast';

const medicineCategories = [
  {
    title: 'Pain Relief',
    data: [
      {
        id: '1',
        name: 'Aspirin',
        use: 'Reduces pain, fever, and inflammation',
        contents: 'Acetylsalicylic acid',
        price: '$20',
        image:'https://media.gettyimages.com/id/134810071/photo/pill-in-water-xxl.jpg?s=612x612&w=0&k=20&c=KLi3Vue2IQK1VvnyXKcHuHBLlSTPFE1oXCzoLcq5OLc='
      },
      {
        id: '2',
        name: 'Ibuprofen',
        use: 'Treats pain, fever, and inflammation',
        contents: 'Ibuprofen',
        price: '$15',
        image:'https://media.gettyimages.com/id/1432982780/photo/ibuprofen-pill-bottle-conceptual-image.jpg?s=612x612&w=0&k=20&c=3s6cqFI4No1odWUUTrgz2v5-L020rrh3GB2pgkJh460='
      },
      {
        id: '3',
        name: 'Acetaminophen',
        use: 'Relieves pain and fever',
        contents: 'Acetaminophen',
        price: '$10',
        image: 'https://media.gettyimages.com/id/88763258/photo/chicago-tylenol-extra-strength-is-sold-over-the-counter-at-a-drugstore-june-30-2009-in-chicago.jpg?s=612x612&w=0&k=20&c=z_DcU_jLMYHa9xdoixYDE2FihiIs1Lfid2KHnzkSYv8='
      },
      {
        id: '4',
        name: 'Naproxen',
        use: 'Anti-inflammatory and pain relief',
        contents: 'Naproxen',
        price: '$18',
        image:'https://media.gettyimages.com/id/94959033/photo/united-states-glaxosmithkline-plcs-migraine-medicine-treximet-the-anti-inflammatory-drug.jpg?s=612x612&w=0&k=20&c=fpGiN6qc0CCFtJDS9CMEYo8DrH88pIxyUFqVDc9qA4A='
      },
      {
        id: '5',
        name: 'Diclofenac',
        use: 'Treats pain and inflammation',
        contents: 'Diclofenac',
        price: '$22',
image:'https://media.gettyimages.com/id/1432982705/photo/diclofenac-pill-bottle-conceptual-image.jpg?s=612x612&w=0&k=20&c=aQxhQPM-E-TEZk8vJdg_K7puEUrw37-brYrFgL0E_qI='      }
    ],
  },
  {
    title: 'Cold and Allergy',
    data: [
      {
        id: '6',
        name: 'Loratadine',
        use: 'Relieves allergies, hay fever symptoms',
        contents: 'Loratadine',
        price: '$18',
        image: 'https://media.gettyimages.com/id/492301091/photo/claritin-d-allergy-and-congestion-medicine.jpg?s=612x612&w=0&k=20&c=7QfgIkOzB6RjKL4MMcuEVSjpPEJiB38p5FbhKIVF_yw='
      },
      {
        id: '7',
        name: 'Cetirizine',
        use: 'Antihistamine for allergic symptoms',
        contents: 'Cetirizine',
        price: '$14',
        image: 'https://media.gettyimages.com/id/1432982620/photo/cetirizine-pill-bottle-conceptual-image.jpg?s=612x612&w=0&k=20&c=uVQQsN0pl2m-oG6DNECZCod1QGfN72WEBveLf_qeqvU='
      },
      {
        id: '8',
        name: 'Diphenhydramine',
        use: 'Relieves allergy symptoms, aids sleep',
        contents: 'Diphenhydramine',
        price: '$12',
        image: 'https://media.gettyimages.com/id/458936849/photo/benadryl-allergy-liqui-gels.jpg?s=612x612&w=0&k=20&c=YbWXyDtk_P26ujyQhd0aAy4IfqU9aPIB_CsdTlTqcEw='
      },
      {
        id: '9',
        name: 'Pseudoephedrine',
        use: 'Relieves nasal congestion',
        contents: 'Pseudoephedrine',
        price: '$16',
        image: 'https://media.gettyimages.com/id/458070917/photo/cold-medicines.jpg?s=612x612&w=0&k=20&c=BjS_HaF0WaMSwJaIWxmpbj2Qm9kl6lOiIXX0YQSKntA='
      
      },
      {
        id: '10',
        name: 'Fexofenadine',
        use: 'Treats seasonal allergy symptoms',
        contents: 'Fexofenadine',
        price: '$20',
        image: 'https://media.gettyimages.com/id/1432982693/photo/fexofenadine-pill-bottle-conceptual-image.jpg?s=612x612&w=gi&k=20&c=7O3x3fNk90QxrOmCQJ70LD_uURrVagcm1o6Z9d9gAao='
      }
    ],
  },
  {
    title: 'Digestive Health',
    data: [
      {
        id: '11',
        name: 'Omeprazole',
        use: 'Treats heartburn, GERD',
        contents: 'Omeprazole',
        price: '$22',
        image: 'https://media.gettyimages.com/id/1432981721/photo/omeprazole-pill-conceptual-image.jpg?s=612x612&w=gi&k=20&c=Ugdc9xHBeDW2PHKpF0ed_woY79H0IuJV7cKwYELJTTE='
      },
      {
        id: '12',
        name: 'Lansoprazole',
        use: 'Reduces stomach acid',
        contents: 'Lansoprazole',
        price: '$25',
image:'https://media.gettyimages.com/id/1432982867/photo/lansoprazole-pill-bottle-conceptual-image.jpg?s=612x612&w=gi&k=20&c=Mq9HKNSCmBWamcR4mGWRnP3rks_AsSC3tMComtsC9XE='      },
      {
        id: '13',
        name: 'Ranitidine',
        use: 'Manages GERD, ulcers',
        contents: 'Ranitidine',
        price: '$15',
        image: 'https://media.gettyimages.com/id/1432982326/photo/ranitidine-pill-conceptual-image.jpg?s=612x612&w=gi&k=20&c=cZof-PxxPn5FoXEgSa6uokAcwXlusF9us0yIRH3hO58='
      },
      {
        id: '14',
        name: 'Metoclopramide',
        use: 'Treats heartburn, gastroparesis',
        contents: 'Metoclopramide',
        price: '$18',
        image:'https://media.gettyimages.com/id/1391492114/photo/pill-bottle-overflowing-with-blue-pills-to-show-drug-addiction.jpg?s=612x612&w=0&k=20&c=jE5fsTPQ20yDDJ3_pk8fhoF6GUaAo8aZG4lav9qZEpM='
      },
      {
        id: '15',
        name: 'Simethicone',
        use: 'Relieves gas and bloating',
        contents: 'Simethicone',
        price: '$10',
        image: 'https://media.gettyimages.com/id/1349441051/photo/overhead-view-of-senior-asian-woman-feeling-sick-taking-medicines-in-hand-with-a-glass-of.jpg?s=612x612&w=0&k=20&c=hccrYl7c4yx1t-C-jJx4x-OM437ij1Z2-CPHo_z05Pk='
      }
    ],
  },
  {
    title: 'Skin Care',
    data: [
      {
        id: '16',
        name: 'Hydrocortisone Cream',
        use: 'Treats skin irritation and rashes',
        contents: 'Hydrocortisone',
        price: '$8',
        image: 'https://media.gettyimages.com/id/930857676/photo/a-tube-of-hydrocortisone-cream.jpg?s=612x612&w=0&k=20&c=wYbc_KAfQIoYwjnHfvzXspteBtTMJ91rd9dYuMl8PgU='
      },
      {
        id: '17',
        name: 'Mupirocin',
        use: 'Treats skin infections',
        contents: 'Mupirocin',
        price: '$25',
        image: 'https://media.gettyimages.com/id/1432981810/photo/mupirocin-pill-conceptual-image.jpg?s=612x612&w=0&k=20&c=VcA-d-aQwo2NVq-nCrgIeAN3JkzCTz6-6XZTkQq5tW4='
      },
      {
        id: '18',
        name: 'Clotrimazole Cream',
        use: 'Antifungal, treats skin infections',
        contents: 'Clotrimazole',
        price: '$14',
        image: 'https://media.gettyimages.com/id/1308164895/photo/white-cosmetics-smear-on-isolated-white-background-perfect-swatch-for-advertising-and.jpg?s=612x612&w=0&k=20&c=HIcPTow4Yu_l2tqbIWFZqGkziMDdT6WU_ebmzy5-H_c='
      },
      {
        id: '19',
        name: 'Salicylic Acid',
        use: 'Treats acne and skin disorders',
        contents: 'Salicylic Acid',
        price: '$12',
        image: 'https://media.gettyimages.com/id/484158994/photo/wartstick-maximum-strength-box.jpg?s=612x612&w=gi&k=20&c=bGamyCQX9TLb58zqKh0LelLNZVfDmA24skda47GgsUI='
      },
      {
        id: '20',
        name: 'Benzoyl Peroxide',
        use: 'Treats acne',
        contents: 'Benzoyl Peroxide',
        price: '$16',
        image: 'https://media.gettyimages.com/id/465101502/photo/oxy-acne-medication.jpg?s=612x612&w=0&k=20&c=mNTuSkCasw_zY_szJRPPzhsFMfCKODrKhpK8jt0pRK4='
      }
    ],
  },
  {
    title: 'Mental Health',
    data: [
      {
        id: '21',
        name: 'Sertraline',
        use: 'Treats depression, anxiety',
        contents: 'Sertraline',
        price: '$30',
        image: 'https://media.gettyimages.com/id/94600228/photo/zocor-generic-simvastatin-and-zoloft-generic-sertraline-are.jpg?s=2048x2048&w=gi&k=20&c=gZ2zZHRYEI1PGf7Sm9me_OQFbcxywgJSzXzpQ79R0m4='
      },
      {
        id: '22',
        name: 'Citalopram',
        use: 'Antidepressant',
        contents: 'Citalopram',
        price: '$28',
image:'https://media.gettyimages.com/id/1432982650/photo/citalopram-pill-bottle-conceptual-image.jpg?s=612x612&w=0&k=20&c=SUBB_v96IJ_jkiF0No9PVf--04f1nKYxC9MOaEW-gR0='      },
      {
        id: '23',
        name: 'Fluoxetine',
        use: 'Treats depressive disorders',
        contents: 'Fluoxetine',
        price: '$22',
        image: 'https://media.gettyimages.com/id/51913843/photo/new-york-two-bottles-of-prozac-are-seen-on-a-pharmacy-shelf-january-4-2005-in-new-york-city-the.jpg?s=612x612&w=0&k=20&c=AAlmwwvkMyD_HTWQmWOo8RwG_bzZRLtKxcIjtCil_tw='
      },
      {
        id: '24',
        name: 'Venlafaxine',
        use: 'Manages depression, anxiety',
        contents: 'Venlafaxine',
        price: '$35',
        image: 'https://media.gettyimages.com/id/525272728/photo/venlafaxine-medication-for-the-reduction-of-the-symptoms-of-anxiety-and-depression-proving.jpg?s=612x612&w=0&k=20&c=hfq0TIqAQgv08sPq3_BTwpwVD1A-5sDnlIzuURp5-Bk='
      },
      {
        id: '25',
        name: 'Aripiprazole',
        use: 'Treats bipolar disorder, schizophrenia',
        contents: 'Aripiprazole',
        price: '$40',
        image: 'https://www.gettyimages.ae/detail/photo/aripiprazole-pill-bottle-conceptual-image-royalty-free-image/1432982527'
      }
    ],
  }
];




function MedicineListScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    filterMedicines();
  }, [selectedCategory]);

  const addToCart = (item) => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
    // Create a new object for the cart to handle quantities and uniqueness
    const newItem = {...item, cartId: Date.now()}; // Use a timestamp to ensure uniqueness
    setCart([...cart, newItem]);
  };

  const removeFromCart = (item) => {
    const index = cart.findIndex(c => c.id === item.id);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const filterMedicines = () => {
    if (selectedCategory === '') {
      setFilteredMedicines(medicineCategories.flatMap(cat => cat.data));
    } else {
      setFilteredMedicines(medicineCategories.find(cat => cat.title === selectedCategory)?.data || []);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search by name"
          style={styles.searchInput}
          onChangeText={text => {
            setSelectedCategory('');
            setFilteredMedicines(
              medicineCategories
              .flatMap(cat => cat.data)
              .filter(med => med.name.toLowerCase().includes(text.toLowerCase()))
            );
          }}
        />
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            filterMedicines();
          }}
        >
          <Picker.Item label="All Medicines" value="" />
          {medicineCategories.map((category) => (
            <Picker.Item key={category.title} label={category.title} value={category.title} />
          ))}
        </Picker>
        <Icon
          name="shopping-cart"
          type="material"
          color="#000"
          size={30}
          onPress={() => navigation.navigate("Checkout", { cart })}
          containerStyle={styles.cartIcon}
        />
      </View>

      <FlatList
        data={filteredMedicines}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.actionRow}>
              <Icon
                name="add-shopping-cart"
                type="material"
                color="#4169e1"
                size={30}
                onPress={() => addToCart(item)}
                containerStyle={styles.actionIcon}
              />
              <Icon
                name="remove-shopping-cart"
                type="material"
                color="#ff6347"
                size={30}
                onPress={() => removeFromCart(item)}
                containerStyle={styles.actionIcon}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Toast visible={toastVisible} message="Item updated successfully!" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
  },
  cartIcon: {
    padding: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionIcon: {
    padding: 5,
  },
});

export default MedicineListScreen;
