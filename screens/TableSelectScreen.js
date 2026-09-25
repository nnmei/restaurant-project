import { useState } from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TABLES } from '../constants/data';
import { TBstyle } from '../constants/TBstyle';
import { CardTable } from '../components/cardTable';

export default function TableSelectScreen() {
  const navigation = useNavigation();

  const [selectedTableId, setSelectedTableId] = useState(null);

  const handleSelectTable = (id) => {
    setSelectedTableId((prevId) => (prevId === id ? null : id));
  };

  const handleConfirmSelection = () => {
    if (!selectedTableId) {
      Alert.alert('แจ้งเตือน', 'กรุณาแตะเลือกโต๊ะอาหารก่อนดำเนินการต่อ');
      return;
    }

    navigation.navigate('Home', { selectedTableId });
  };

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
        data={TABLES}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        extraData={selectedTableId}
        contentContainerStyle={TBstyle.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardTable
            item={item}
            isSelected={item.id === selectedTableId}
            onSelect={handleSelectTable}
          />
        )}
      />

      <TouchableOpacity 
        style={[
          TBstyle.button, 
          !selectedTableId && { opacity: 0.6 }
        ]}
        onPress={handleConfirmSelection}
      >
        <Text style={TBstyle.buttonText}>
          {selectedTableId ? `ยืนยันเลือกโต๊ะ ${selectedTableId}` : 'เลือกโต๊ะ'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}