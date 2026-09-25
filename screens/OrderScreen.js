import { useState } from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TABLES } from '../constants/data';
import { TBstyle } from '../constants/TBstyle';
import { CardTable } from '../components/cardTable';

export default function OrderScreen() {

    return (
        <SafeAreaView style={TBstyle.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <View style={TBstyle.header}>
                <Text style={TBstyle.screenTitle}>สถานะโต๊ะอาหาร</Text>
                <Text style={TBstyle.screenSubtitle}>
                    ติดตามสถานะและยอดชำระของแต่ละโต๊ะ
                </Text>
            </View>
        </SafeAreaView>
    )
}