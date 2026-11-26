# Finance Planner

**Finance Planner** là ứng dụng web quản lý tài chính cá nhân giúp người dùng ghi chép thu chi hằng ngày, trực quan hoá dòng tiền theo tháng qua biểu đồ và theo dõi tiến độ tiết kiệm cho các mục tiêu mua sắm, quản lý dữ liệu độc lập theo từng tài khoản và tối ưu trải nghiệm trên cả máy tính lẫn điện thoại.

- **Code được triển khai tại:** https://financeplannerweb.vercel.app/
- **Tài khoản demo:**
  - **Email:** `demo@phy10615.vn`
  - **Mật khẩu:** `<123456789>`
  - *(Có thể đăng ký mới bằng Email hoặc đăng nhập nhanh qua GitHub OAuth)*

---

## Ảnh chụp màn hình



---

## Checklist tính năng

- ✅ **Xác thực & hồ sơ:** Đăng ký, đăng nhập bằng Email + Mật khẩu và GitHub (Better Auth); hiển thị tên người dùng và nút đăng xuất.
- ✅ **Dashboard tổng quan:** Thống kê tổng thu, tổng chi, số dư hiện tại và biểu đồ trực quan hoá dòng tiền bằng Recharts; tiến độ của thanh wishlist.
- ✅ **Quản lý giao dịch:** Thêm, sửa, xoá giao dịch thu/chi; phân loại danh mục; lọc theo tháng và loại giao dịch; số tiền được thể hiện rõ ràng.
- ✅ **Quản lý wishlist:** Tạo, chỉnh sửa, xoá món đồ mơ ước kèm giá mục tiêu và mức ưu tiên; tự động tính tiến độ tiết kiệm dựa trên số dư hiện tại.
- ✅ **Hồ sơ cá nhân:** Cập nhật tên hiển thị, xem thông tin tài khoản và chuyển đổi nhanh chế độ giao diện.
- ✅ **Lọc và tìm kiếm**: Lọc theo thời gian, lọc theo danh mục và trạng thái lọc nằm trên URL, lọc phía server.
- ✅ **Thông báo mốc tiết kiệm**: Thông báo chúc mừng khi đạt mốc tiết kiệm; không lặp lại thông báo cho các mốc đã báo
- ✅ **PWA**: cài đặt được trên điện thoại, có giao diện tối ưu cho mobile.
- ✅ **Báo cáo**: báo cáo so sánh các tháng (biểu đồ cột) và xu hướng chi tiêu.
- ❌ **Khôi phục mật khẩu & xác thực qua email:** Chưa tích hợp dịch vụ gửi email (SMTP/Resend) cho luồng quên mật khẩu.
- ❌ **Đa tiền tệ & chế độ Offline-first:** Chưa hỗ trợ chuyển đổi ngoại tệ và chưa đồng bộ dữ liệu khi ngoại tuyến.

---

## Công nghệ sử dụng

- **Framework & Ngôn ngữ:** Next.js `16.x` (App Router), React `19.x`, TypeScript `6.x`
- **Giao diện:** Tailwind CSS `4.x`, shadcn/ui (Radix UI), Lucide React, `next-themes`
- **Cơ sở dữ liệu & ORM:** PostgreSQL (Neon), Prisma ORM `7.x`, generator `prisma-client`, driver `@prisma/adapter-pg`
- **Xác thực & phân quyền:** Better Auth (Email/Password & GitHub OAuth), Data Access Layer với `requireUser()`
- **Biểu đồ:** Recharts
- **Kiểm thử:** Vitest, React Testing Library
- **CI/CD & Triển khai:** GitHub Actions, Vercel

---

## Biến môi trường

| Tên biến | Bắt buộc | Mô tả | Ví dụ |
| --- | :---: | --- | --- |
| `DATABASE_URL` | Có | Chuỗi kết nối PostgreSQL dùng bởi ứng dụng (Neon hoặc local) | `postgresql://user:pass@host/db?sslmode=require` |
| `DATABASE_URL_UNPOOLED` | Có | Kết nối trực tiếp dùng cho Prisma CLI và migrations | `postgresql://user:pass@host/db?sslmode=require` |
| `BETTER_AUTH_SECRET` | Có | Chuỗi bí mật ký session của Better Auth (≥ 32 ký tự) | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Có | URL gốc của ứng dụng (local hoặc domain Vercel) | `http://localhost:3000` |
| `GITHUB_CLIENT_ID` | Tuỳ chọn* | Client ID của GitHub OAuth App | `Ov23li...` |
| `GITHUB_CLIENT_SECRET` | Tuỳ chọn* | Client Secret của GitHub OAuth App | `a1b2c3...` |
---

## Hướng dẫn chạy ở máy cá nhân (Local)

### Bước 1. Yêu cầu hệ thống
- **Node.js** `>= 20.x` và **npm**
- Cơ sở dữ liệu **PostgreSQL** 

### Bước 2. Cài đặt

```bash
git clone https://github.com/mailinh21042005-rgb/Finance_planner.git
cd Finance_planner
npm ci
```

Tạo `.env`:

```powershell
Copy-Item .env.example .env
```

### Bước 3. Khởi tạo cơ sở dữ liệu & chạy server dev

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`.

### Bước 4. Chạy kiểm thử & kiểm tra chất lượng

```bash
npm run lint       
npm run typecheck  
npm test          
npm run build     
```

---

## CI/CD & triển khai

- GitHub Actions chạy workflow [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) trên mỗi lần push và pull request. Workflow cài dependencies rồi chạy lint, typecheck, test và production build bằng Node.js 22.
- Bản production hiện có tại [financeplannerweb.vercel.app](https://financeplannerweb.vercel.app/). Cấu hình biến môi trường production trong Vercel Project Settings; không lưu secret trong GitHub workflow hoặc source code.

---

## Quyết định kỹ thuật

- **Next.js 16 App Router:** 
- **Server Actions, Route Handlers và Zod:** 
- **PostgreSQL (Neon) + Prisma ORM 7:** 
- **Better Auth:** 
- **Hệ thống giao diện Glassmorphism & nền động thuần CSS (`GalaxyBackground`, `DawnSkyBackground`)
- **Điều hướng full-page (`window.location.assign`) khi đăng nhập/đăng xuất:** 
---

## Giới hạn đã biết

- **Chỉ hỗ trợ đơn vị tiền tệ VNĐ:** 
- **Chưa tích hợp máy chủ gửi email:**
- **PWA chưa hỗ trợ Offline-first:** 
- **Cảnh báo trình duyệt với mật khẩu test phổ biến:** 

---

## Tài liệu liên quan

- [AGENTS.md](./AGENTS.md) — Luật dự án dành cho công cụ AI
- [AI_LOG.md](./AI_LOG.md) — Nhật ký quá trình sử dụng AI
