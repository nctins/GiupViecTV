## Installation
- Cài package cần thiết:
    ```bash
    npm install
    ```

- Chuẩn bị database:
    - tạo database
    - config database: tạo file .env từ file .env.example
    - migrate database:
        ```bash
        npx sequelize-cli db:migrate
        ```
    - run seeder database:
        ```bash
        npx sequelize-cli db:seed:all
        npx sequelize-cli db:seed --seed file_name.js
        ```
- start server:
    ```bash
    npm start
    ```
## cấu trúc thư mục src:
- config: 
- constants: 
- controllers:
- middleware:
- migrations:
- models:
- routes:
- seeders:
- services:
- utils: chứa các hàm cơ bản (tương tự như helper function)

## một số lưu ý khi code:
- Đối với các file trong các thư mục: config, controllers, middleware, models, services vui lòng đặt tên theo chuẩn <tên file>.<chức năng>.js (vd: auth.router.js).
- Nhớ chú ý sử dụng các constants trong db_constants.js ( để tiện cho việc thay đổi hàng loạt nếu như cấu trúc db có thay đổi lúc làm )
- Các status response trả về nhớ sử dụng constant http_code
- các biến sử dụng snake_case
- url sử dụng spinal-case
- tên class sử dụng CamelCase
- tên method sử dụng camelCase (chữ đầu tiên viết thường)