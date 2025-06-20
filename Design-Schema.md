# Design Schmema Project CIMS - Prisma MySQL

## Enum Schema

```prisma
enum UserVerifyStatus {
  Unverified
  Verified
  Banned
}

enum UserRole {
  SuperAdmin
  Admin
  Sale
  Technician
  None
}

enum CustomerType {
  Personal
  Company
}

enum CustomerGender {
  Male
  Female
}

enum CustomerStatus {
  Active
  Deactivated
}

enum CustomerVerify {
  Unverified
  Verified
}

enum PerformanceStatus {
  New
  Approved
  Cancelled
}

enum TypeRevenue {
  OneTime
  EveryMonth
}

enum RevenueDirection {
  In // Doanh thu đầu vào
  Out // Chi phí, doanh thu đầu ra
}

enum ActivityStatus {
  New // Mới
  InProgress // Đang thực hiện
  Completed // Hoàn thành
  Cancelled // Hủy
}
```

## Schema User

```prisma
model User {
  id                    Int              @id @default(autoincrement())
  email                 String           @unique
  password              String
  fullname              String?
  verify                UserVerifyStatus @default(Unverified)
  avatar                String?          @db.VarChar(255)
  address               String?
  phone                 String?
  code                  String?
  refreshTokens         RefreshToken[]
  date_of_birth         DateTime?
  created_at            DateTime         @default(now())
  updated_at            DateTime         @updatedAt
  role                  UserRole         @default(None)
  creatorCustomers      Customer[]       @relation("CreatedCustomers") // Một user có thể có nhiều customer
  consultantorCustomers Customer[]       @relation("ConsultantorCustomers") // Một user có thể tư vấn nhiều customer
  creatorActivity  Activity[]  @relation("CreatedActivity")
  @@index([email, password])
}
```

## Schema Refresh Token

```prisma
model RefreshToken {
  id      Int      @id @default(autoincrement())
  token   String   @unique @db.VarChar(512)
  user_id Int
  iat     DateTime
  exp     DateTime
  user    User     @relation(fields: [user_id], references: [id])

  @@index([exp])
}
```

## Schema Customer

```prisma
model Customer {
  id               Int             @id @default(autoincrement())
  name             String          @unique @db.VarChar(255)
  type             CustomerType    @default(Company)
  gender           CustomerGender?
  email            String?         @unique @db.VarChar(255)
  phone            String?         @db.VarChar(255)
  address_company  String?         @db.VarChar(255)
  address_personal String?         @db.VarChar(255)
  note             String?         @db.Text
  attachment       String?         @db.VarChar(255)
  tax_code         String?         @db.VarChar(255)
  cccd             String?         @db.VarChar(255)
  website          String?         @db.VarChar(255)
  surrogate        String?         @db.VarChar(255)
  contact_name     String?         @db.VarChar(255)
  date_of_birth    DateTime?
  status           CustomerStatus  @default(Deactivated)
  verify           CustomerVerify  @default(Unverified)
  assign_at        DateTime?
  creator_id       Int // Người tạo ra khách hàng
  consultantor_id  Int? // Chỉ 1 user được gán làm người tư vấn
  created_at       DateTime        @default(now())
  updated_at       DateTime?
  creator          User            @relation("CreatedCustomers", fields: [creator_id], references: [id], onDelete: Cascade)
  consultantor     User?           @relation("ConsultantorCustomers", fields: [consultantor_id], references: [id])
  attachments Gallery[] @relation("CustomersAttachment")
  activityCustomers Activity[]       @relation("ActivityCustomers")
}

```

```prisma
model Gallery {
  id          Int      @id @default(autoincrement())
  customer_id Int
  filename    String   @unique @db.VarChar(255)
  created_at  DateTime @default(now())
  customer    Customer @relation("CustomersAttachment", fields: [customer_id], references: [id], onDelete: Cascade)
}
```

```prisma
model Performance {
  id                 Int               @id @default(autoincrement())
  name               String            @unique @db.VarChar(255)
  status             PerformanceStatus @default(New)
  creator_id         Int // Người tạo ra hiệu quả công việc
  customer_id        Int // Khách hàng đang tư vấn
  note               String?           @db.Text
  assign_at          DateTime? // Xem thời điểm mà khách hàng được add tag
  operating_cost     Float             @default(0) // Chi phí vận hành (%)
  customer_care_cost Float             @default(0) // Chi phí CSKH (%)
  commission_cost    Float             @default(0) // Chi phí hoa hồng (%)
  diplomatic_cost    Float             @default(0) // Chi phí ngoại giao (%)
  reserve_cost       Float             @default(0) // Chi phí dự phòng (%)
  customer_cost      Float             @default(0) // Chi phí khách hàng (%)
  created_at         DateTime          @default(now())
  updated_at         DateTime?

  creator  User      @relation("CreatedPerformance", fields: [creator_id], references: [id], onDelete: Cascade)
  customer Customer? @relation("CustomersPerformance", fields: [customer_id], references: [id])
  revenues Revenue[] @relation("RevenuesPerformance") // 1 Hiệu quả làm có thể có nhiều doanh thu khác nhau
}
```

```prisma
model Revenue {
  id             Int              @id @default(autoincrement())
  name           String           @unique @db.VarChar(255) // Hạng mục
  description    String?          @db.Text // Diễn giải
  unit_caculate  String? // Đơn vị tính dạng string
  type           TypeRevenue      @default(OneTime) // Loại
  performance_id Int // Foreign key
  price          Decimal          @db.Decimal(15, 2) // Đơn giá
  quantity       Int              @default(1)
  direction      RevenueDirection @default(In) // Xác định đây là danh thu gì
  performance    Performance      @relation("RevenuesPerformance", fields: [performance_id], references: [id])
  created_at     DateTime         @default(now())
  updated_at     DateTime?
}
```

```prisma
model Activity {
  id             Int              @id @default(autoincrement())
  name           String           @db.VarChar(255) // tieu de
  phone            String?         @db.VarChar(255)
  address  String?         @db.VarChar(255)
  contact_name  String?         @db.VarChar(255)
  creator_id         Int
  customer_id  Int?
  status             ActivityStatus @default(New)
  time_start DateTime
  time_end DateTime
  created_at     DateTime         @default(now())
  updated_at     DateTime?
  customer     Customer?           @relation("ActivityCustomers", fields: [customer_id], references: [id])
  creator  User      @relation("CreatedActivity", fields: [creator_id], references: [id], onDelete: Cascade)
}
```

# Chạy lại migration cho MySQL

```bash
npx prisma migrate dev --name init
```

# Hoặc nếu bạn có schema sẵn mà không cần migration:

```bash
npx prisma db push
```

# Tạo lại Prisma Client

```bash
npx prisma generate
```
