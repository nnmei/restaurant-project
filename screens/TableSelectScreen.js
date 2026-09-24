import React from 'react';
import { View, Text, FlatList, StatusBar} from 'react-native';
import { MOCK_TABLES } from '../constants/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderTableCard } from '../components/cardTable';
import { TBstyle } from '../constants/TBstyle';

export default function TableSelectScreen() {
  
  return (
    <SafeAreaView style={TBstyle.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View style={TBstyle.header}>
        <Text style={TBstyle.screenTitle}>สถานะโต๊ะอาหาร</Text>
        <Text style={TBstyle.screenSubtitle}>
          ติดตามสถานะและยอดชำระของแต่ละโต๊ะ
        </Text>
      </View>

      <FlatList
        data={MOCK_TABLES}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTableCard}
        numColumns={2}
        contentContainerStyle={TBstyle.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}