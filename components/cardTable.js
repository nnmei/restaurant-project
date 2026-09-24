import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TBstyle } from '../constants/TBstyle';

export const renderTableCard = ({ item }) => {
    const isPending = hasPendingBill(item.status);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          TBstyle.card,
          isPending ? TBstyle.cardPending : TBstyle.cardAvailable,
        ]}
        onPress={() => {
          console.log(`เลือกโต๊ะ ${item.id}`);
        }}
      >
        <View style={TBstyle.cardHeader}>
          <Text style={TBstyle.tableNumberText}>โต๊ะ {item.id}</Text>
          
          <View
            style={[
              TBstyle.badge,
              isPending ? TBstyle.badgePending : TBstyle.badgeAvailable,
            ]}
          >
            <Text
              style={[
                TBstyle.badgeText,
                isPending ? TBstyle.badgeTextPending : TBstyle.badgeTextAvailable,
              ]}
            >
              {isPending ? 'มีบิลค้าง' : 'ว่าง'}
            </Text>
          </View>
        </View>

        <View style={TBstyle.cardBody}>
          {isPending ? (
            <View>
              <Text style={TBstyle.detailLabel}>ยอดค้างชำระ</Text>
              <Text style={TBstyle.amountText}>
                {item.total ? `฿${item.total.toLocaleString()}` : 'รอคิดเงิน'}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={TBstyle.detailLabel}>สถานะ</Text>
              <Text style={TBstyle.availableSubText}>พร้อมให้บริการ</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
};

const hasPendingBill = (status) => {
    return status === 'pending' || status === 'occupied' || status === 'unpaid';
};