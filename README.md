# Mô tả:
Giao diện app GiupViecTV cho đối tượng khách hàng.

# Usage:
### Cài các package cần thiết
```bash
yarn install 
```
### Test trên emulator:
```bash
yarn android
```
### Test thông qua ứng dụng Expo Go:
```bash
yarn ExpoGo
```

# Một số lưu ý:

- Đây là project "expo bare workflow" do đó nên tìm hiểu trước về nó tại đây: [Expo workflow](https://docs.expo.dev/introduction/managed-vs-bare/), [Expo bare workflow](https://docs.expo.dev/bare/exploring-bare-workflow/)
- Khi thêm các thành phần trong [expo SDK](https://docs.expo.dev/versions/v45.0.0/sdk/accelerometer/) cần chú ý tới lưu ý cài đặt trong bare workflow.
- Đã cấu hình sẵn '~' alias cho thư mục src do đó import các thành phần từ các thư mục khác trong src tiện hơn. Vd: import * from "~components/..."
- Sử dụng theme bằng các hook useTheme() và useThemeStyles(). Tham khảo về theme tại [đây](https://expans.io/2021/08/04/custom-theme-provider-in-react-native/)
- Nên nhóm các component tựa tựa nhau vào chung 1 folder và chia ra file styles.js, index.js riêng ví dụ:
```bash
├──components
|  └──Input
|     ├──PasswordInput.js
|     ├──TextInput.js
|     ├──styles.js
|     └──index.js
```
    
