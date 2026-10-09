# มอมแมม

กุสุมนิภา รัชโน 6721651181 
nnmei:

components/buttomNav, cartIcon, categories

screens/HomeScreen

slices/cartSlice
      
จิรกร ชินการ 6721651190 
Ashley4762:

components/dishRow

screens/CartScreen, KitchenScreen

ณัฏฐชัย รักเล่ง 6721656078
BlackBerry8973:

components/cardTable

screens/TableSelectScreen, OrderScreen

Youtube: https://youtu.be/-qMbkp3iJsw?si=Iiqk5xCxZN7Zvqn1

Github: https://github.com/nnmei/restaurant-project.git

extract file: restaurant-project.zip

cd restaurant-project

npx create-expo-app@latest client --template blank

npm install nativewind@4.2.7 react-native-reanimated react-native-safe-area-context

npm install --save-dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo

npx tailwindcss init

npx expo install react-native-screens react-native-safe-area-context

npm install @react-navigation/native-stack

npm i react-native-feather

npm install @reduxjs/toolkit

npm install react-redux

npx expo install expo-sqlite

ติดตั้งเสร็จทำตามลิ้ง

https://www.nativewind.dev/docs/getting-started/installation#3-add-the-babel-preset

library ที่ติดตั้งเพิ่ม

1. tailwindcss ประมวลผล Utility classes และค่า Theme ตามที่คอนฟิกไว้
2. nativewind ทำหน้าที่เป็นตัวแปลงคลาสของ Tailwind CSS
3. prettier-plugin-tailwindcss สำหรับช่วยจัดเรียงลำดับ Utility classes ในโค้ดให้อัตโนมัติ
4. babel-preset-expo ใช้ในการคอนฟิก Babel ร่วมกับ NativeWind เพื่อแปลงคลาส CSS เป็น native styles
5. react-native-feather ใช้เป็นใส่ไอคอนในปุ่ม
6. @reduxjs/toolkit ช่วยจัดการ Global State ข้อมูลที่ต้องแชร์ข้ามหลายหน้าจอ
7. react-redux ตัวเชื่อมต่อระหว่าง Redux Store เข้ากับ React Components เพื่อให้อ่านค่า state และสั่ง dispatch actions ได้ผ่าน hooks

สิ่งที่ทำและไม่ได้ทำ

2.1 ระดับ ก - ต้องมีครบทุกข้อ

ฝั่งลูกค้า
✅ ก1. เลือกโต๊ะ แล้วเปิดบิลใหม่ หรือเข้าบิลที่เปิดค้างอยู่ของโต๊ะนั้น

✅ ก2. ดูเมนูที่แบ่งตามหมวดหมู่ อย่างน้อย 4 หมวด หมวดละอย่างน้อย 5 รายการ รวมไม่ต่ำกว่า 25 รายการ

✅ ก3. เลือกจำนวนของแต่ละรายการ และใส่หมายเหตุได้ เช่น ไม่ใส่ผักชี เผ็ดน้อย

✅ ก4. ตรวจรายการก่อนยืนยัน แล้วส่งเข้าครัวเป็น หนึ่งรอบการสั่ง

✅ ก5. สั่งเพิ่มได้อีกหลายรอบในบิลเดียวกัน โดยรอบก่อนหน้ายังอยู่ครบ

✅ ก6. ดูสรุปบิล เห็นทุกรอบที่สั่งไป แต่ละรายการ จำนวน ราคาต่อหน่วย ราคารวมของรายการ และ ยอดรวมทั้งบิลฝั่งครัว

✅ ก7. เห็นรายการที่ถูกส่งเข้ามา เรียงตามเวลาที่สั่ง รายการเก่าสุดขึ้นก่อน

✅ ก8. เปลี่ยนสถานะของแต่ละรายการได้ อย่างน้อยสามสถานะ คือ รอทำ กำลังทำ และเสิร์ฟแล้ว

✅ ก9. เห็นว่ารายการนั้นมาจากโต๊ะไหน รอบที่เท่าไร และมีหมายเหตุอะไรการปิดบิล

✅ ก10. ปิดบิลได้ หลังปิดแล้วโต๊ะนั้นเปิดบิลใหม่ได้ และบิลเก่ายังเรียกดูย้อนหลังได้

2.2 ระดับ ข - เลือกทำอย่างน้อย 2 ข้อ

❌ ข1. หน้าสรุปยอดขายรายวัน แยกตามหมวดหมู่อาหาร

✅ ข2. ค้นหาเมนูจากชื่อ และกรองเฉพาะรายการที่มีของ

✅ ข3. ยกเลิกรายการที่ยังไม่ได้ลงมือทำ พร้อมบันทึกว่าถูกยกเลิกเมื่อใด

❌ ข4. แยกบิล หรือย้ายโต๊ะ โดยรายการที่สั่งไปแล้วต้องไม่หาย

❌ ข5. ตั้งค่าเมนูได้ในแอป เพิ่ม แก้ราคา หรือปิดการขายชั่วคราว

❌ ข6. อันดับเมนูขายดี 10 อันดับในช่วงวันที่ที่เลือก
