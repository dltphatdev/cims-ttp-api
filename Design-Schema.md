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
}

```
