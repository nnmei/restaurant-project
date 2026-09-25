import { View, Text, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TABLES } from '../constants/data';
import { TBstyle } from '../constants/TBstyle';
import { CardTable } from '../components/cardTable';
import { OrderStyle } from '../constants/OrderStyle';

export default function OrderScreen() {

    return (
        <SafeAreaView style={TBstyle.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <View style={TBstyle.header}>
                <Text style={TBstyle.screenTitle}>รายการสั่งอาหาร</Text>
            </View>
            <View style={OrderStyle.orderContainer}>
                <FlatList
                    data={TABLES}
                    renderItem={({ item }) => (
                        <CardTable item={item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    )
}