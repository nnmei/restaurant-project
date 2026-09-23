import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { categories } from '../constants'

export default function Categories() {
  return (
    <View className="mt-4">
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="overflow-visible"
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
    >
      {
        categories.map((category, index) =>{
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                className="p-1 rounded-full shadow bg-gray-200">
                <Text>{category.name}</Text>
              </TouchableOpacity>
            </View>
          )
        })
      }
    </ScrollView>
    </View>
  )
}