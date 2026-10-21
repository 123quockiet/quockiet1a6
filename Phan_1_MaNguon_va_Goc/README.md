# ⚔️ HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ
> **Educational 2D Action-RPG Platformer | Giải Đố Đại Số Vectơ Lớp 10**

![Game Engine](https://img.shields.io/badge/Engine-Phaser%203.60.0-00e5ff?style=for-the-badge&logo=phaser)
![Language](https://img.shields.io/badge/Language-JavaScript%20%2F%20HTML5-ffd700?style=for-the-badge&logo=javascript)
![Audio](https://img.shields.io/badge/Audio-Web%20Audio%20Synth-ff007f?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-00ff88?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PC%20%7C%20Mobile-blueviolet?style=for-the-badge)

---

## 📖 1. Giới Thiệu Cốt Truyện & Ý Tưởng
**Hạt Giống Tro Tàn** là tựa game nhập vai đi cảnh 2D phong cách Retro Pixel Art, tích hợp giáo dục môn Toán học (Chuyên đề **Đại Số Vectơ – Hình học Lớp 10** theo chương trình Giáo dục Phổ thông mới).

Người chơi vào vai hiệp sĩ trẻ **Kael**, dấn thân qua các vùng đất bị nguyền rủa:
* **Chương 1 – Rừng Hoang Dã:** Tiêu diệt 8 quái vật hoang dã và Boss Báo Bóng Đêm canh giữ phong ấn.
* **Chương 2 – Hầm Ngục Ma Giáp:** Đột nhập vào lòng đất dung nham, hạ gục đội quân Orc và đối đầu Trùm Tối Cao **Thần Ma Giáp Malakar** để thanh tẩy và đoạt lại **Hạt Giống Tro Tàn** cứu rỗi thế giới!

---

## ✨ 2. Tính Năng Nổi Bật

### 🧙‍♂️ Hệ Thống NPC Thương Nhân Sinh Động
* **Đại Pháp Sư Eldrin (Wizard Merchant):** Áo choàng tím huyền bí, bàn pha chế độc dược, cầu tiên tri và bệ cổ ngữ ánh sáng ma thuật phát sáng xoay tròn.
* **Bậc Thầy Rèn Arthur (Blacksmith Merchant):** Người thợ rèn vạm vỡ tóc râu đỏ, đe thép xám cùng nhịp quai búa rèn kiếm tóe tia lửa và khói lò rèn. Khi người chơi lại gần, Arthur sẽ chuyển sang hoạt ảnh chào mời vũ khí trang bị.

### 🌟 Đồ Họa & Hiệu Ứng Hình Ảnh (Visual Effects)
* **Volumetric Forest God Rays:** Dải nắng mặt trời vàng kim chiếu xuyên tán rừng cổ thụ lung linh.
* **Enchanted Fireflies:** Đàn đom đóm rừng thiêng lập lòe bay lượn ngẫu nhiên theo dao động sóng sin.
* **VFX Di Chuyển & Chiến Đấu:** Bụi khói tiếp đất (Landing Dust), vệt lướt tốc biến 6 lớp bóng ma màu neon (Phantom Dash Afterimages), vết chém kiếm năng lượng kép.

### 📐 15 Câu Hỏi Vectơ Lớp 10 Chuẩn Kiến Thức
Mỗi cuộc giao chiến với quái vật là một thử thách toán học:
1. Định nghĩa vectơ, độ dài và vectơ không.
2. Hai vectơ cùng phương, cùng hướng, đối nhau và bằng nhau.
3. Quy tắc 3 điểm nối đuôi: $\vec{AB} + \vec{BC} = \vec{AC}$.
4. Quy tắc hình bình hành: $\vec{AB} + \vec{AD} = \vec{AC}$.
5. Quy tắc hiệu hai vectơ chung gốc: $\vec{AB} - \vec{AC} = \vec{CB}$.
6. Tích của vectơ với một số thực ($k \cdot \vec{a}$).
7. Tọa độ của vectơ trên mặt phẳng $Oxy$, độ dài vectơ $|\vec{u}| = \sqrt{x^2 + y^2}$.
8. Tích vô hướng của hai vectơ: $\vec{a} \cdot \vec{b} = |\vec{a}| \cdot |\vec{b}| \cdot \cos(\vec{a}, \vec{b})$.

---

## 🕹️ 3. Bảng Phím Bấm Điều Khiển

| Thao Tác | Phím Trên PC (Bàn phím) | Phím Trên Mobile (Màn hình cảm ứng) |
| :--- | :--- | :--- |
| **Di chuyển Trái / Phải** | `[A]` / `[D]` hoặc `[←]` / `[→]` | Phím mũi tên `◀` / `▶` |
| **Nhảy cao** | `[W]`, `[Space]` hoặc `[↑]` | Nút `🦘 Nhảy` |
| **Lướt nhanh (Dash)** | `[Shift]` | Nút `⚡ Lướt` |
| **Chém kiếm (Tấn công)** | `[J]` | Nút `⚔️ Chém` |
| **Tương tác NPC / Tiếp tục thoại**| `[E]` hoặc `[Enter]` / `[Space]` | Nút `💬 Trò chuyện / [E]` |
| **Mở Túi đồ & Chỉ số** | `[I]` hoặc `[C]` | Nút `🎒 Túi đồ [I]` |
| **Uống Bình Máu** | Phím tắt nhanh trên HUD | Nút `🧪 Máu [2]` |
| **Bật / Tắt Âm thanh** | `[M]` | Nút `🔊 Âm thanh [M]` |
| **Toàn màn hình / Thu nhỏ** | `[F]` hoặc `[Escape]` | Nút `🖥️ Toàn màn hình [F]` |
| **Chế độ Tràn viền / Chuẩn 16:9** | `[Z]` | Nút `📐 Tràn viền [Z]` |

---

## 📁 4. Cấu Trúc Thư Mục Dự Án (Repository Structure)

```text
hat-giong-tro-tan/
├── index.html            # File chạy chính của game (Single-File Engine + Responsive UI)
├── style.css             # Định kiểu giao diện & CSS canvas pixelated
├── README.md             # Tài liệu dự án chi tiết (Hướng dẫn & cốt truyện)
├── LICENSE               # Giấy phép mã nguồn mở MIT
├── .gitignore            # Loại trừ tệp tạm, cache OS và file thừa
├── pack_assets.py        # Kịch bản Python đóng gói Sprite Sheets thành Phaser Atlas
├── extract_assets.py     # Kịch bản trích xuất frames từ sprite sheet
│
├── js/                   # Module mã nguồn JavaScript phân tách
│   ├── main.js           # Khởi tạo game & cấu hình Phaser
│   ├── audio.js          # Hệ thống âm thanh procedural Web Audio Synth
│   ├── data.js           # Dữ liệu 15 câu hỏi vectơ & chỉ số quái vật
│   ├── textures.js       # Quản lý textures & procedural canvases
│   └── scenes/           # Các màn chơi (Phaser Scenes)
│       ├── PreloadScene.js   # Tải atlases & đăng ký hoạt ảnh NPC/hero
│       ├── MenuScene.js      # Giao diện menu chính & nút Vào Game
│       ├── GameScene.js      # Màn phiêu lưu, di chuyển, nhặt rương, gặp NPC
│       ├── CombatScene.js    # Đấu trường câu hỏi trắc nghiệm vectơ
│       ├── VictoryScene.js   # Màn mừng chiến thắng hoàn thành game
│       └── GameOverScene.js  # Màn thất bại & nút hồi sinh
│
└── assets/               # Toàn bộ tài nguyên đồ họa (Đã đóng gói Atlas nhẹ tối ưu)
    ├── entities.png      # Atlas nhân vật Hero Kael & 15 quái vật
    ├── entities.json     # Tọa độ frames của entities
    ├── world.png         # Atlas cảnh nền rừng, hầm ngục, gạch nền, bục đá, rương
    ├── world.json        # Tọa độ frames của world
    ├── ui_vfx.png        # Atlas giao diện & hiệu ứng chém, sao sáng
    ├── ui_vfx.json       # Tọa độ frames của ui_vfx
    ├── npc.png           # Atlas NPC Pháp sư Eldrin & Thợ rèn Arthur (100% custom)
    ├── npc.json          # Tọa độ frames của npc
    └── npc/              # 31 khung hình PNG riêng lẻ độ phân giải chuẩn
        ├── wizard_idle_*.png
        ├── wizard_greet_*.png
        ├── wizard_craft_*.png
        ├── blacksmith_idle_*.png
        ├── blacksmith_forge_*.png
        └── blacksmith_shop_*.png
```

---

## 🚀 5. Hướng Dẫn Đăng Lên GitHub & Kích Hoạt GitHub Pages

### Bước 1: Khởi tạo Git và Commit mã nguồn
Mở cửa sổ dòng lệnh (Terminal / PowerShell) ngay tại thư mục `hat-giong-tro-tan`:

```bash
# 1. Khởi tạo kho lưu trữ git
git init

# 2. Thêm toàn bộ tệp vào git
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: complete Vector RPG game with custom NPCs, smooth movement and enhanced graphics"
```

### Bước 2: Liên kết với GitHub và Đẩy mã lên
1. Tạo một repository mới trên GitHub (ví dụ đặt tên là: `hat-giong-tro-tan`).
2. Chạy lệnh liên kết và đẩy code lên:

```bash
# Đổi tên nhánh chính thành main
git branch -M main

# Liên kết với kho GitHub của bạn (thay username của bạn vào URL)
git remote add origin https://github.com/<TÊN-TÀI-KHOẢN-CỦA-BẠN>/hat-giong-tro-tan.git

# Đẩy mã lên GitHub
git push -u origin main
```

### Bước 3: Bật tính năng Chơi Game Trực Tuyến (GitHub Pages)
1. Trên giao diện Repository của bạn tại GitHub, nhấn vào tab **Settings** (Cài đặt).
2. Ở cột menu bên trái, tìm và chọn mục **Pages**.
3. Tại phần **Branch**, chọn nhánh: `main`, thư mục: `/ (root)`, sau đó nhấn **Save**.
4. Chờ khoảng 1-2 phút, GitHub sẽ cung cấp cho bạn một đường link chơi game trực tuyến miễn phí dạng:
   👉 `https://<TÊN-TÀI-KHOẢN-CỦA-BẠN>.github.io/hat-giong-tro-tan/`
5. Giờ đây bạn có thể chia sẻ đường link này cho thầy cô, bạn bè chơi trực tiếp trên máy tính hoặc điện thoại!

---

## 💻 6. Cách Chạy Thử Trên Máy Tính (Localhost)

Nếu muốn trải nghiệm hoặc phát triển tiếp trên máy:
* **Cách 1 (Dùng Python có sẵn):**
  ```bash
  python -m http.server 8080
  ```
  Sau đó mở trình duyệt truy cập: `http://localhost:8080/index.html`

* **Cách 2 (Dùng VS Code Live Server):**
  Nhấp chuột phải vào file `index.html` chọn **Open with Live Server**.

---

## 📜 7. Bản Quyền & Tác Giả (License)
* Dự án được phát hành theo giấy phép mã nguồn mở **MIT License**.
* Tự do sử dụng, chỉnh sửa và phục vụ cho mục đích học tập, giảng dạy môn Toán học và Công nghệ thông tin.
