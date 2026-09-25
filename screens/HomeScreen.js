import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from 'react-native-feather';
import { themeColors } from '../theme';
import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'
import { featured } from '../constants'
import { useSQLiteContext } from 'expo-sqlite'
import { getFoodByCategory } from '../db/menu'
import DishRow from '../components/dishRow';
import CartIcon from '../components/cartIcon';

export default function HomeScreen() {
    const db = useSQLiteContext();
    // [แก้จุดที่ 2]: สร้าง State เก็บหมวดที่เลือก และเก็บรายการอาหารที่ดึงจาก DB
    const [activeCategory, setActiveCategory] = useState(null);
    const [dishes, setDishes] = useState([]);

    // [แก้จุดที่ 3]: เมื่อผู้ใช้กดเปลี่ยนหมวดหมู่ ให้วิ่งไปคิวรีอาหารหมวดนั้นมาจาก DB
    useEffect(() => {
        async function loadDishes() {
            if (!activeCategory) return;
            try {
                const data = await getFoodByCategory(db, activeCategory);
                setDishes(data);
            } catch (error) {
                console.error("Error loading dishes:", error);
            }
        }
        loadDishes();
    }, [activeCategory, db]);
    return (
        <SafeAreaView className="bg-white flex-1">
            <StatusBar barStyle="dark-content" />
            {/* search bar */}
            <View className="flex-row items-center space-x-2 px-4 pb-2">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <Icon.Search height="25" width="25" stroke="gray" />
                    <TextInput placeholder='Restaurants' className="ml-2 flex-1" />
                    <View className="flex-row items-center space-x-1 border-0 border-1-2 border-l-gray-300">
                        <Icon.MapPin height="20" width="20" stroke="gray" />
                        <Text className="text-gray-600">New york, NYC</Text>
                    </View>
                </View>
                <View style={{backgroundColor: themeColors.bgColor(1)}} className="p-3 rounded-full">
                    <Icon.Sliders height="20" width="20" strokeWidth={2.5} stroke="white" />
                </View>
            </View>

            {/* main */}
            <ScrollView showVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
            >
                {/* categories */}
                <Categories 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory}
                />

                {/* featured */}
                <View className="mt-5">
                    <Text className="px-4 text-xl font-bold text-gray-800 mb-3">
                        รายการอาหาร
                    </Text>
                    {
                        dishes.map((dish) => {
                            return (
                                <DishRow 
                                    item={dish} 
                                    key={dish.food_id} 
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
            <CartIcon />
        </SafeAreaView>
    )
}