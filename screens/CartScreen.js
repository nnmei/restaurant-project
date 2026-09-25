import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme';
import * as Icon from "react-native-feather"
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';

// [แก้จุดที่ 1]: นำ emptyCart เข้ามาใช้ และตัด selectRestaurant ที่ไม่ได้ใช้ออก
import { removeFromCart, emptyCart, selectCartItems, selectCartTotal } from '../slices/cartSlice';

// [แก้จุดที่ 2]: นำตัวเชื่อมต่อ SQLite และฟังก์ชันบันทึกรอบการสั่งมาใช้งาน
import { useSQLiteContext } from 'expo-sqlite';
import { submitOrderRound } from '../db/orders';

export default function CartScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const db = useSQLiteContext(); // เรียกใช้งานฐานข้อมูล SQLite

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({});

    // จัดกลุ่มอาหารเหมือนเดิมของคุณทุกประการ
    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            const key = `${item.food_id || item.id}_${item.note || ''}`;
            if(group[key]){
                group[key].push(item);
            }else{
                group[key] = [item];
            }
            return group;
        }, {});
        setGroupedItems(items);
    }, [cartItems]);

    // -------------------------------------------------------------
    // [ฟังก์ชันใหม่ที่เพิ่ม]: จัดการเมื่อกดปุ่ม Place Order (ก4)
    // -------------------------------------------------------------
    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            Alert.alert("แจ้งเตือน", "ไม่มีรายการอาหารในตะกร้า");
            return;
        }

        try {
            // แปลงรูปแบบรายการในตะกร้าให้ตรงกับโครงสร้าง order_items ในฐานข้อมูล
            const orderItemsPayload = Object.entries(groupedItems).map(([key, items]) => {
                const dish = items[0];
                return {
                    food_id: dish.food_id || dish.id,
                    price: dish.price,
                    quantity: items.length,
                    note: dish.note || ''
                };
            });

            // ในช่วงที่ยังไม่ได้ทำหน้าเลือกโต๊ะ กำหนด billId เป็น 1 จำลองไว้ก่อน
            const mockBillId = 1;

            // บันทึกคำสั่งซื้อลง SQLite (orders + order_items ผ่าน Transaction)
            await submitOrderRound(db, mockBillId, orderItemsPayload);

            // เคลียร์ตะกร้าใน Redux
            dispatch(emptyCart());

            Alert.alert("สำเร็จ", "ส่งรายการอาหารเข้าครัวเรียบร้อยแล้ว!", [
                { text: "ตกลง", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error("Error submitting order:", error);
            Alert.alert("ผิดพลาด", "ไม่สามารถส่งออเดอร์ได้ กรุณาลองใหม่");
        }
    };

    return (
        <View className="bg-white flex-1 pt-10">
            {/* back button และ ส่วนหัว */}
            <View className="relative py-4 shadow-sm">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{backgroundColor: themeColors.bgColor(1)}}
                    className="absolute z-50 rounded-full p-2 shadow top-3 left-2"
                >
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">ตะกร้าของคุณ</Text>
                    {/* [แก้]: เปลี่ยนจาก restaurant.name เป็นข้อความของร้าน */}
                    <Text className="text-center text-gray-500">ตรวจสอบรายการก่อนส่งเข้าครัว</Text>
                </View>
            </View>
            
            {/* แถบหัวบิล */}
            <View style={{backgroundColor: themeColors.bgColor(0.2)}} className="flex-row px-4 py-2 items-center">
                <Image source={require('../assets/images/fullStar.png')} className="w-12 h-12 rounded-full" />
                <Text className="flex-1 pl-4 font-bold text-gray-700">รายการสั่งอาหารรอบปัจจุบัน</Text>
            </View>

            {/* รายการอาหาร dishes (โครงสร้างเดิมของคุณทั้งหมด) */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="bg-white pt-5"
            >
                {
                    Object.entries(groupedItems).map(([key, items]) => {
                        let dish = items[0];
                        return (
                            <View 
                                key={key}
                                className="flex-row items-center gap-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                            >
                                <Text className="font-bold" style={{color: themeColors.text}}>
                                    {items.length} x 
                                </Text>
                                {/* เพิ่มรูปสำรองกรณีไม่มีรูปภาพแนบมา */}
                                <Image 
                                    className="h-14 w-14 rounded-full" 
                                    source={dish.image ? dish.image : require('../assets/images/pizzaDish.png')} 
                                />
                                <View className="flex-1">
                                    <Text className="font-bold text-gray-700">{dish.name}</Text>
                                    {dish.note ? (
                                        <Text className="text-xs text-orange-600 mt-0.5">
                                            {dish.note}
                                        </Text>
                                    ) : null}
                                </View>
                                
                                {/* [แก้]: เปลี่ยน $ เป็น ฿ */}
                                <Text className="font-semibold text-base">฿{dish.price}</Text>
                                
                                <TouchableOpacity
                                    className="p-1 rounded-full"
                                    onPress={() => dispatch(removeFromCart({id: dish.id}))}
                                    style={{backgroundColor: themeColors.bgColor(1)}}
                                >
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>            

            {/* ส่วนสรุปราคารวมและปุ่ม Place Order */}
            <View style={{backgroundColor: themeColors.bgColor(0.2)}} className="p-6 px-8 rounded-t-3xl space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-700 font-extrabold text-lg">ยอดรวมรอบนี้</Text>
                    {/* [แก้]: ตัด Delivery Fee ออก และเปลี่ยนเป็น ฿ */}
                    <Text className="text-gray-700 font-extrabold text-lg">฿{cartTotal}</Text>
                </View>

                <View>
                    <TouchableOpacity 
                        onPress={handlePlaceOrder}
                        style={{backgroundColor: themeColors.bgColor(1)}} 
                        className="p-3 rounded-full mt-2"
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            Place Order (ส่งเข้าครัว)
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}