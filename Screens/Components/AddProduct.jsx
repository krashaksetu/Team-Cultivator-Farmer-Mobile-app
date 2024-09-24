import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'; // Updated import
import { useNavigation, useRoute } from '@react-navigation/native'; // For navigation and route
import {collection, addDoc, doc, updateDoc} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from '../../config/FirbaseConfig';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productCategory, setProductCategory] = useState('Fruits'); // Default category
    const route = useRoute(); // Access route params
    const navigation = useNavigation(); // Navigation instance
    const storage = getStorage();

    useEffect(() => {
        if (route.params?.product) {
            const { name, price, quantity, category, image } = route.params.product;
            setProductName(name);
            setProductPrice(price);
            setProductQuantity(quantity);
            setProductCategory(category);
            setProductImage(image);
        }
    }, [route.params?.product]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setProductImage(result.assets[0].uri); // Set the image URI
        }
    };

    const handleSave = async () => {
        if (productName && productPrice && productQuantity && productCategory) {
            try {
                const resp = await fetch(productImage);
                const blob = await resp.blob();
                const storageRef = ref(storage, 'productImages/' + Date.now() + '.jpg');
    
                // Upload the image to Firebase Storage
                const snapshot = await uploadBytes(storageRef, blob);
                const downloadUrl = await getDownloadURL(storageRef); // Wait for the image URL
    
                // Create the product object with the image URL
                const product = {
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: parseInt(productQuantity, 10),
                    category: productCategory,
                    image: downloadUrl, // Use the image URL from Firebase Storage
                };
    
                // Save product to Firestore
                if (route.params?.id) {
                    // Updating an existing product
                    const productRef = doc(db, 'products', route.params.id);
                    await updateDoc(productRef, product);
                } else {
                    // Adding a new product
                    await addDoc(collection(db, 'products'), product);
                }
    
                navigation.navigate('Inventory'); // Navigate back after saving
            } catch (error) {
                console.error("Error saving product: ", error);
                Alert.alert('Error', 'There was an error saving the product.');
            }
        } else {
            Alert.alert('Incomplete data', 'Please fill in all fields');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Product Name"
                style={styles.input}
                value={productName}
                onChangeText={setProductName}
            />
            <TextInput
                placeholder="Product Price"
                style={styles.input}
                keyboardType="numeric"
                value={productPrice}
                onChangeText={setProductPrice}
            />
            <TextInput
                placeholder="Quantity in Stock"
                style={styles.input}
                keyboardType="numeric"
                value={productQuantity}
                onChangeText={setProductQuantity}
            />
            
            {/* Dropdown for Category */}
            <Picker
                selectedValue={productCategory}
                style={styles.picker}
                onValueChange={(itemValue) => setProductCategory(itemValue)}
            >
                <Picker.Item label="Fruits" value="Fruits" />
                <Picker.Item label="Vegetables" value="Vegetables" />
                <Picker.Item label="Grains" value="Grains" />
                <Picker.Item label="Dairy" value="Dairy" />
                <Picker.Item label="Others" value="Others" />
            </Picker>

            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>

            {/* Show selected image preview */}
            {productImage && <Image source={{ uri: productImage }} style={styles.imagePreview} />}
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
    picker: { height: 50, width: '100%', marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
    imagePreview: { width: 100, height: 100, marginTop: 10, marginBottom: 10, borderRadius: 5 },
    imagePickerButton: { backgroundColor: '#5a9a1b', padding: 10, borderRadius: 5, marginBottom: 10 },
    saveButton: { backgroundColor: '#5a9a1b', padding: 10, borderRadius: 5, marginBottom: 10 },
    buttonText: { color: '#fff', textAlign: 'center' },
});

export default ProductForm;