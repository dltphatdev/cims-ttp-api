# API Documentation

## Tổng quan

- API này cung cấp các endpoint để thao tác với dữ liệu User trong dự án CIMS. Tất cả các endpoint trả về dữ liệu theo định dạng JSON.

## Base URL môi trường development

https://localhost:8080/api

## Authentication

- Sử dụng Bearer Token trong header Authorization
- Ví dụ:

```makefile
Authorization: Bearer <your_access_token>
```

## Endpoints User

1. Đăng nhập người dùng:

- Method: POST
- URL: https://localhost:8080/api/user/login
- Request body:

```json
{
  "email": "admin@ttptelecom.vn",
  "password": "Admin@123@123456"
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Đăng nhập tài khoản thành công",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjowLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc0OTAzMTAwMiwiZXhwIjoxNzQ5MDMzNzAyfQ.NuoLbIWjMOodgBBS2jMNOXuUruyG-bao7Lr1NA8-KEU",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoxLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc0OTAzMTAwMiwiZXhwIjoxNzU3NjcxMDAyfQ.2o9WW2qW_HaW4Tj7Aq5NXHsfEEBWnYPLBNhcU7jJZOg",
    "expires_access_token": 2700,
    "expires_refresh_token": 8640000,
    "user": {
      "id": 1,
      "email": "admin@ttptelecomvn.com",
      "fullname": "Admin Supper",
      "verify": "Verified",
      "avatar": null,
      "address": null,
      "phone": "0339355715",
      "code": null,
      "role": "SuperAdmin",
      "date_of_birth": "2025-06-04T03:09:24.872Z",
      "created_at": "2025-06-04T03:09:24.872Z",
      "updated_at": "2025-06-04T09:00:14.689Z"
    }
  }
}
```

2. Đăng xuất người dùng:

- Method: POST
- URL: https://localhost:8080/api/user/logout
- Request body:

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoxLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc0OTAxOTY4OCwiZXhwIjoxNzU3NjU5Njg4fQ.f6ABXaw0paBsFJDrMj-aruF0XbNR-vJQmLgrnBffIbw"
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Đăng xuất tài khoản thành công"
}
```

3. Đổi mật khẩu:

- Method: PUT
- URL: https://localhost:8080/api/user/change-password

- Request header: Authorization: Bearer <access_token>

- Request body:

```json
{
  "old_password": "Abcd@123132@",
  "password": "Abcd12345651234565"
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Đổi mật khẩu tài khoản thành công"
}
```

4. Cập nhật profile tài khoản:

- Method: PATCH
- URL: https://localhost:8080/api/user/profile

- Request header: Authorization: Bearer <access_token>

- Request body: (optional)

```json
{
  "fullname": "",
  "avatar": "",
  "address": "",
  "phone": "",
  "code": "",
  "date_of_birth": ""
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Cập nhật tài khoản thành công",
  "user": {
    "id": 1,
    "email": "admin@ttptelecomvn.com",
    "fullname": "Admin Supper",
    "verify": "Verified",
    "avatar": null,
    "address": null,
    "phone": "0339355715",
    "code": null,
    "role": "SuperAdmin",
    "date_of_birth": "2025-06-04T03:09:24.872Z",
    "created_at": "2025-06-04T03:09:24.872Z",
    "updated_at": "2025-06-04T09:00:14.689Z"
  }
}
```

5. Tạo mới user với quyền Super admin:

- Method: POST
- URL: https://localhost:8080/api/user/create

- Request header: Authorization: Bearer <access_token>
- Role: SuperAdmin

- Request body:

```json
{
  "email": "test@ttptelecomvn.com",
  "password": "Abc123"
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Tại mới tài khoản thành công"
}
```

6. Upload avatar user:

- Method: POST
- URL: https://localhost:8080/api/user/upload-avatar

- Request header: Authorization: Bearer <access_token>

- Request body:

```json
{
  "image": ""
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Upload avatar thành công",
  "data": {
    "url": "https://localhost:8080",
    "filename": "abc.jpg",
    "type": "image"
  }
}
```

7. Cập nhật người dùng từ Super admin:

- Method: PATCH
- URL: https://localhost:8080/api/user/update

- Request header: Authorization: Bearer <access_token>
- Role: SuperAdmin

- Request body: (optional)
- Id là bắt buộc

```json
{
  "id": 2,
  "fullname": "Sale account",
  "avatar": "",
  "address": "",
  "phone": "",
  "code": "",
  "role": ""
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Cập nhật tài khoản thành công",
  "user": {
    "id": 1,
    "email": "admin@ttptelecomvn.com",
    "fullname": "Admin Supper",
    "verify": "Verified",
    "avatar": null,
    "address": null,
    "phone": "0339355715",
    "code": null,
    "role": "SuperAdmin",
    "date_of_birth": "2025-06-04T03:09:24.872Z",
    "created_at": "2025-06-04T03:09:24.872Z",
    "updated_at": "2025-06-04T09:00:14.689Z"
  }
}
```

8. Refresh token:

- Method: POST
- URL: https://localhost:8080/api/user/refresh-token

- Request body:

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoxLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc0OTAxOTY4OCwiZXhwIjoxNzU3NjU5Njg4fQ.f6ABXaw0paBsFJDrMj-aruF0XbNR-vJQmLgrnBffIbw"
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Refresh token thành công",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjowLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc0OTAzMTAwMiwiZXhwIjoxNzQ5MDMzNzAyfQ.NuoLbIWjMOodgBBS2jMNOXuUruyG-bao7Lr1NA8-KEU",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoxLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc0OTAzMTAwMiwiZXhwIjoxNzU3NjcxMDAyfQ.2o9WW2qW_HaW4Tj7Aq5NXHsfEEBWnYPLBNhcU7jJZOg",
    "user": {
      "id": 1,
      "email": "admin@ttptelecomvn.com",
      "fullname": "Admin Supper",
      "verify": "Verified",
      "avatar": null,
      "address": null,
      "phone": "0339355715",
      "code": null,
      "role": "SuperAdmin",
      "date_of_birth": "2025-06-04T03:09:24.872Z",
      "created_at": "2025-06-04T03:09:24.872Z",
      "updated_at": "2025-06-04T09:00:14.689Z"
    }
  }
}
```

9. Lấy danh sách người dùng với phân trang và tích hợp search theo tên hoặc theo số điện thoại của người dùng:

- URL: https://localhost:8080/api/user
- Method: GET
- Request query: (optional) có thể truyền hoặc không
- Lưu ý: Không nhìn thấy acc của mình trong danh sách này

```json
{
  "page": "1",
  "limit": "10",
  "fullname": "abc",
  "phone": "0987654321"
}
```

- Dữ liệu trả về client:

```json
{
  "message": "Lấy danh sách user thành công",
  "data": {
    "users": [
      {
        "id": 3,
        "email": "abc@gmail.com",
        "password": "dd1b89ac6d38e0d9b9646a1d9652978f602601f59f70aaa074f40280877c0d25",
        "fullname": "Phat ",
        "verify": "Verified",
        "avatar": null,
        "address": null,
        "phone": "0987654321",
        "code": null,
        "date_of_birth": null,
        "created_at": "2025-06-04T09:02:14.531Z",
        "updated_at": "2025-06-04T09:03:19.744Z",
        "role": "Sale"
      },
      {
        "id": 2,
        "email": "test@ttptelecomvn.com",
        "password": "dd1b89ac6d38e0d9b9646a1d9652978f602601f59f70aaa074f40280877c0d25",
        "fullname": "Sale account",
        "verify": "Unverified",
        "avatar": null,
        "address": null,
        "phone": "0704138356",
        "code": null,
        "date_of_birth": null,
        "created_at": "2025-06-04T05:52:18.566Z",
        "updated_at": "2025-06-04T09:00:14.689Z",
        "role": "Sale"
      }
    ],
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

## Enpoint Customer:

1. Thêm mới khách hàng từ 1 user account:

- URL: http://localhost:8080/api/customer/create
- Method: POST
- Request body:

```ts
interface CreateCustomerReqBody {
  name: string
  type: CustomerType
}
```

- Respone JSON:

```json
{
  "message": "Thêm mới khách hàng thành công"
}
```

- Chú thích: Khi thêm mới khách hàng thì mặc định nếu không select đối tượng khách hàng thì mặc định là khách hàng doanh nghiệp

2. Cập nhật khách hàng doanh nghiệp:

- URL: http://localhost:8080/api/customer/update-company
- Method: PATCH
- Request body:

```ts
interface UpdateCustomerCompanyReqBody {
  id: number
  tax_code: string
  consultantor_id?: number
  name?: string
  website?: string
  surrogate?: string
  address_company?: string
  phone?: string
  email?: string
  contact_name?: string
  attachment?: string
  note?: string
  verify?: CustomerVerify
  status?: CustomerStatus
}
```

- Respone JSON:

```json
{
  "message": "Cập nhật thông tin khách hàng thành công",
  "data": {
    "id": 4,
    "tax_code": "12345678911",
    "name": "Cty abcde",
    "website": null,
    "surrogate": null,
    "address_company": null,
    "phone": null,
    "email": null,
    "contact_name": null,
    "attachment": null,
    "note": null,
    "creator": {
      "fullname": "TTP Supper Admin"
    },
    "consultantor": {
      "fullname": "ABCDE"
    }
  }
}
```

3. Cập nhật khách hàng cá nhân:

- URL: http://localhost:8080/api/customer/update-personal
- Method: PATCH
- Request body:

```ts
interface UpdateCustomerPersonalReqBody {
  id: number
  consultantor_id?: number
  name?: string
  date_of_birth?: string
  email?: string
  phone?: string
  gender?: CustomerGender
  attachment?: string
  note?: string
  address_personal?: string
  verify?: CustomerVerify
  status?: CustomerStatus
}
```

- Respone JSON:

```json
{
  "message": "Cập nhật thông tin khách hàng thành công",
  "data": {
    "id": 5,
    "name": "Phat",
    "date_of_birth": null,
    "email": null,
    "phone": null,
    "gender": null,
    "attachment": null,
    "note": null,
    "address_personal": null,
    "creator": {
      "fullname": "ABCDE"
    },
    "consultantor": {
      "fullname": "ABCDE"
    }
  }
}
```

4. Upload file (bao gồm các định dạng: word, excel, pdf, pp):

- URL: http://localhost:8080/api/customer/upload-file
- Method: POST
- Request body:

FormData: {file: string}

- Respone JSON:

```json
{
  "message": "Upload file đính kèm thành công",
  "data": {
    "url": "http://localhost:8080",
    "filename": "hd0b3e0l12jaxyrug5es4sct6.pdf",
    "type": "file"
  }
}
```

5. Serve định dạng trả về client:

- URL: http://localhost:8080/file/hd0b3e0l12jaxyrug5es4sct6.pdf
- Method: GET
