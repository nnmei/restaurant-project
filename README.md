#มอมแมม

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

youtube: https://youtu.be/-qMbkp3iJsw?si=Iiqk5xCxZN7Zvqn1

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

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
  "./App.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

library ที่ติดตั้งเพิ่ม
1. tailwindcss ประมวลผล Utility classes และค่า Theme ตามที่คอนฟิกไว้
2. nativewind ทำหน้าที่เป็นตัวแปลงคลาสของ Tailwind CSS
3. prettier-plugin-tailwindcss สำหรับช่วยจัดเรียงลำดับ Utility classes ในโค้ดให้อัตโนมัติ
4. babel-preset-expo ใช้ในการคอนฟิก Babel ร่วมกับ NativeWind เพื่อแปลงคลาส CSS เป็น native styles
5. react-native-feather ใช้เป็นใส่ไอคอนในปุ่ม
6. @reduxjs/toolkit ช่วยจัดการ Global State ข้อมูลที่ต้องแชร์ข้ามหลายหน้าจอ
7. react-redux ตัวเชื่อมต่อระหว่าง Redux Store เข้ากับ React Components เพื่อให้อ่านค่า state และสั่ง dispatch actions ได้ผ่าน hooks
