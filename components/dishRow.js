import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from '../slices/cartSlice';

export default function DishRow({item}) {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const itemCount = cartItems.filter(cartItem => (cartItem.food_id || cartItem.id) === item.food_id).length;

    const [note, setNote] = useState('');

    const handleIncrease = () => {
        dispatch(addToCart({...item,
            id: item.food_id,
            note: note.trim()
        }));
    }
    const handleDecrease = () => {
        dispatch(removeFromCart({id: item.food_id}))
    }
  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image className="rounded-3xl" style={{height: 100, width: 100}}
            source={item.image} />
        <View className="flex flex-1 space-y-3">
            <View className="pl-3">
                <Text className="text-xl">{item.name}</Text>
                <Text className="flex-row justify-between pl-3 items-center">{item.description}</Text>
            </View>
            <View className="flex-row justify-between pl-3 items-center">
                <Text className="text-gray-700 text-lg font-bold">
                    ${item.price}
                </Text>
                <View className="flex-row items-center">
                    <TouchableOpacity
                    onPress={handleDecrease}
                    disabled={!itemCount}
                        className="p-1 rounded-full"
                        style={{backgroundColor: themeColors.bgColor(1)}}
                    >
                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke={'white'} />
                    </TouchableOpacity>
                    <Text className="px-3">
                        {itemCount}
                    </Text>
                    <TouchableOpacity
                    onPress={handleIncrease}
                        className="p-1 rounded-full"
                        style={{backgroundColor: themeColors.bgColor(1)}}
                    >
                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="mt-3 pt-2 border-t border-gray-100">
                <TextInput
                    placeholder="หมายเหตุเพิ่มเติม เช่น ไม่ใส่ผักชี, เผ็ดน้อย..."
                    placeholderTextColor="gray"
                    value={note}
                    onChangeText={setNote}
                    className="bg-gray-100 rounded-xl px-3 py-1.5 text-sm text-gray-700"
                />
            </View>
        </View>
    </View>
  )
}