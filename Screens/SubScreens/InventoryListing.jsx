import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../../config/FirbaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';

const InventoryScreen = () => {
    const [inventory, setInventory] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();

    // Fetch products from Firestore on component mount
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
            const productsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setInventory(productsArray); // Update inventory state
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    // Check if there's new product data from ProductForm
    useEffect(() => {
        if (route.params?.product) {
            const product = route.params.product;
            setInventory(prevInventory => {
                const existingProductIndex = prevInventory.findIndex(p => p.id === product.id);
                if (existingProductIndex >= 0) {
                    // Update existing product
                    const updatedInventory = [...prevInventory];
                    updatedInventory[existingProductIndex] = product;
                    return updatedInventory;
                } else {
                    // Add new product
                    return [...prevInventory, product];
                }
            });
        }
    }, [route.params?.product]);

    const deleteProduct = async (id) => {
        // Remove product from Firestore
        await deleteDoc(doc(db, 'products', id)); // Delete the product from Firestore
        setInventory(prevInventory => prevInventory.filter(product => product.id !== id)); // Update local state
    };

    const editProduct = (product) => {
        navigation.navigate('ProductForm', { product, id: product.id });
    };

    return (
        <SafeAreaView style={styles.container}>
            {inventory.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Image source={require('./../../assets/images/emptyInventory.png')} style={styles.emptyImage} />
                    <Text style={styles.emptyText}> Inventory is Empty </Text>
                </View>
            ) : (
                <FlatList
                    data={inventory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                            ) : (
                                <Image source={require('./../../assets/images/default.png')} style={styles.productImage} />
                            )}
                            <View style={styles.productDetails}>
                                <Text> Name: {item.name} </Text>
                                <Text> Price: ₹ {item.price} /kg </Text>
                                <Text> Quantity: {item.quantity} kg </Text>
                                <Text> Category: {item.category} </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.editButton} onPress={() => editProduct(item)}>
                                    <Text style={styles.buttonText}> Edit </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
                                    <Text style={styles.buttonText}> Delete </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('ProductForm')} // Navigate to ProductForm screen
            >
                <Text style={styles.addButtonText}> + Add </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: '#fff' 
    },
    emptyContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    emptyImage: { 
        width: 100, 
        height: 100, 
        marginBottom: 20 
    },
    emptyText: { 
        fontSize: 18 
    },
    addButton: {
        backgroundColor: '#5a9a1b',
        borderRadius: 50,
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 30,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: { 
        color: '#fff', 
        fontSize: 20 
    },
    productCard: { 
        flexDirection: 'row', 
        padding: 20, 
        backgroundColor: '#f1f8e9', 
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#66bb6a', 
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 15, 
    },
    productDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center' 
    },
});

export default InventoryScreen;