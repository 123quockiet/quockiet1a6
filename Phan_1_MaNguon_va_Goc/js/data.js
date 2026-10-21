// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | DATA & CONFIGURATION
// ============================================================================

window.GAME_DATA = {
  player: {
    name: "Kael",
    title: "Hiệp Sĩ Ánh Sáng",
    maxHp: 100,
    hp: 100,
    maxMp: 50,
    mp: 50,
    exp: 0,
    maxExp: 100,
    level: 1,
    hearts: 3,
    gold: 50,
    gems: 5,
    keys: 1,
    attack: 25,
    defense: 10,
    speed: 160,
    skills: ["Chém Mạnh", "Lướt Nhanh", "Bão Kiếm"]
  },

  shopItems: [
    { id: "potion_hp", name: "Bình Máu Nhỏ", cost: 20, desc: "Hồi 40 HP ngay lập tức", effect: { hp: 40 } },
    { id: "potion_mp", name: "Bình Mana", cost: 15, desc: "Hồi 30 MP", effect: { mp: 30 } },
    { id: "sword_iron", name: "Thanh Kiếm Rèn Sắt", cost: 60, desc: "+15 Sát thương tấn công", effect: { attack: 15 } },
    { id: "shield_wood", name: "Khiên Gỗ Cổ Thụ", cost: 45, desc: "+8 Giáp phòng thủ", effect: { defense: 8 } }
  ],

  dialogues: {
    introWizard: [
      { speaker: "Pháp Sư Eldrin", text: "Chào Kael! Rừng Hoang Dã đã bị Ma Giáp Malakar nguyền rủa bằng bóng tối hỗn loạn." },
      { speaker: "Pháp Sư Eldrin", text: "Thứ duy nhất phá tan kết giới ma thuật là 'Đại Số Vectơ' – cội nguồn cân bằng phương và hướng của vũ trụ!" },
      { speaker: "Pháp Sư Eldrin", text: "Hãy tiến lên phía đông, giải mã các phong ấn vectơ từ lũ quái vật để cứu lấy Hạt Giống Tro Tàn!" }
    ],
    npcArthur: [
      { speaker: "Thợ Rèn Arthur", text: "Này chàng hiệp sĩ trẻ! Ta có trang bị tốt nhất vùng biên giới này. Hãy ghé xem cửa hàng trước khi đối đầu lũ Orc!" }
    ],
    bossTaunt: [
      { speaker: "Thần Ma Giáp Malakar", text: "Ha ha ha! Một kẻ phàm trần dám dùng tri thức vectơ thách thức sức mạnh bóng tối của ta ư?" },
      { speaker: "Thần Ma Giáp Malakar", text: "Hãy nếm trải đòn hủy diệt của Địa Ngục Hắc Ám!" }
    ],
    victorySpeech: [
      { speaker: "Pháp Sư Eldrin", text: "Ngươi đã làm được Kael! Trật tự vectơ đã được lập lại. Hạt Giống Tro Tàn đã thức tỉnh và nảy mầm vĩnh cửu!" }
    ]
  },

  monsters: [
    // Cấp độ 1: Quái nhỏ
    {
      id: "slime",
      name: "Slime Xanh Lục",
      type: "small",
      maxHp: 80,
      attack: 12,
      expReward: 25,
      goldReward: 15,
      attackName: "Phun Độc (Poison Spit)",
      vfxType: "poison",
      x: 650,
      questionIndex: 0
    },
    {
      id: "mushroom",
      name: "Nấm Độc Quỷ",
      type: "small",
      maxHp: 100,
      attack: 14,
      expReward: 30,
      goldReward: 20,
      attackName: "Bào Tử Độc Tố",
      vfxType: "poison",
      x: 1250,
      questionIndex: 1
    },
    {
      id: "spider",
      name: "Nhện Hang Độc",
      type: "small",
      maxHp: 120,
      attack: 16,
      expReward: 35,
      goldReward: 25,
      attackName: "Cào Rách & Phun Độc",
      vfxType: "slash",
      x: 1850,
      questionIndex: 2
    },
    {
      id: "bat",
      name: "Dơi Bóng Tối",
      type: "small",
      maxHp: 140,
      attack: 18,
      expReward: 40,
      goldReward: 30,
      attackName: "Đạn Bóng Tối (Dark Projectiles)",
      vfxType: "dark_bolt",
      x: 2450,
      questionIndex: 3
    },
    // Cấp độ 2: Quái vừa
    {
      id: "panther",
      name: "Báo Bóng Đêm",
      type: "medium",
      maxHp: 200,
      attack: 22,
      expReward: 55,
      goldReward: 40,
      attackName: "Vuốt Cào Cuồng Sát",
      vfxType: "claws",
      x: 3100,
      questionIndex: 4
    },
    {
      id: "orc_axe",
      name: "Orc Chiến Binh Cầm Rìu",
      type: "medium",
      maxHp: 250,
      attack: 26,
      expReward: 65,
      goldReward: 50,
      attackName: "Chém Búa Địa Chấn",
      vfxType: "shockwave",
      x: 3750,
      questionIndex: 5
    },
    {
      id: "orc_enrage",
      name: "Orc Cuồng Nộ (Enrage)",
      type: "medium",
      maxHp: 320,
      attack: 32,
      expReward: 80,
      goldReward: 65,
      attackName: "Nộ Hỏa Trảm",
      vfxType: "fire",
      x: 4400,
      questionIndex: 6
    },
    {
      id: "orc_leader",
      name: "Orc Thủ Lĩnh Chiến Chùy",
      type: "medium",
      maxHp: 400,
      attack: 38,
      expReward: 100,
      goldReward: 80,
      attackName: "Cắm Đất Sóng Địa Chấn",
      vfxType: "shockwave",
      x: 5050,
      questionIndex: 7
    },
    // Cấp độ 3: Trùm cuối
    {
      id: "malakar_p1",
      name: "Malakar - Thần Ma Giáp (Giai Đoạn 1)",
      type: "boss",
      maxHp: 1000,
      attack: 45,
      expReward: 200,
      goldReward: 150,
      attackName: "Trọng Kích Hắc Ám (Dark Slash)",
      vfxType: "dark_slash",
      x: 5800,
      questionIndex: 8
    },
    {
      id: "malakar_p2",
      name: "Malakar - Thần Ma Giáp (Đòn Kết Liễu)",
      type: "boss",
      maxHp: 2000,
      attack: 55,
      expReward: 500,
      goldReward: 300,
      attackName: "Địa Ngục Hắc Ám (Abyssal Spike)",
      vfxType: "abyssal_spike",
      x: 6050,
      questionIndex: 9
    }
  ],

  // 10 CÂU HỎI LÝ THUYẾT VECTƠ CHUẨN XÁC THEO ĐỀ BÀI
  questions: [
    {
      id: 1,
      monsterTitle: "QUÁI VẬT: SLIME XANH (Cơ Bản)",
      question: "Trong toán học, vectơ là một đoạn thẳng như thế nào?",
      options: [
        "A. Không có hướng",
        "B. Có hướng",
        "C. Có độ dài luôn bằng 1",
        "D. Bị giới hạn bởi một đường tròn"
      ],
      correct: 1,
      hint: "Vectơ là một đoạn thẳng có hướng (xác định điểm gốc và điểm ngọn).",
      formula: "vec(v) : co huong"
    },
    {
      id: 2,
      monsterTitle: "QUÁI VẬT: NẤM ĐỘC QUỶ (Cơ Bản)",
      question: "Với vectơ AB (ký hiệu AB), điểm A được gọi là gì?",
      options: [
        "A. Điểm cuối",
        "B. Trung điểm",
        "C. Điểm đầu (gốc)",
        "D. Trọng tâm"
      ],
      correct: 2,
      hint: "Điểm thứ nhất là điểm đầu (gốc), điểm thứ hai B là điểm cuối (ngọn).",
      formula: "vec(AB) : A -> goc, B -> ngon"
    },
    {
      id: 3,
      monsterTitle: "QUÁI VẬT: NHỆN HANG (Cơ Bản)",
      question: "Hai vectơ được gọi là cùng phương khi giá của chúng như thế nào?",
      options: [
        "A. Vuông góc với nhau",
        "B. Cắt nhau tại một điểm",
        "C. Song song hoặc trùng nhau",
        "D. Tạo với nhau góc 45 độ"
      ],
      correct: 2,
      hint: "Giá của vectơ là đường thẳng đi qua điểm đầu và điểm cuối của vectơ đó.",
      formula: "vec(u) // vec(v) <=> gia song song hoac trung nhau"
    },
    {
      id: 4,
      monsterTitle: "QUÁI VẬT: DƠI BÓNG TỐI (Cơ Bản)",
      question: "Hai vectơ bằng nhau khi và chỉ khi chúng có đặc điểm gì?",
      options: [
        "A. Cùng phương và cùng độ dài",
        "B. Cùng hướng và cùng độ dài",
        "C. Có chung điểm đầu",
        "D. Ngược hướng và cùng độ dài"
      ],
      correct: 1,
      hint: "Hai vectơ bằng nhau cần thỏa mãn 2 điều kiện: Cùng hướng và cùng độ lớn.",
      formula: "vec(a) = vec(b) <=> cung huong va cung do dai"
    },
    {
      id: 5,
      monsterTitle: "QUÁI VẬT: BÁO BÓNG ĐÊM (Thông Hiểu)",
      question: "Vectơ-không (ký hiệu 0) là vectơ có tính chất nào sau đây?",
      options: [
        "A. Điểm đầu và điểm cuối trùng nhau",
        "B. Độ dài bằng 10",
        "C. Không có phương và hướng",
        "D. Luôn vuông góc với mọi vectơ khác"
      ],
      correct: 0,
      hint: "Vectơ-không có điểm đầu và điểm cuối trùng nhau, có độ dài bằng 0, cùng phương cùng hướng với mọi vectơ.",
      formula: "vec(AA) = vec(0), |vec(0)| = 0"
    },
    {
      id: 6,
      monsterTitle: "QUÁI VẬT: ORC CẦM RÌU (Quy Tắc 3 Điểm)",
      question: "Theo quy tắc 3 điểm (cộng liên tiếp), với 3 điểm A, B, C bất kỳ, tổng AB + BC bằng vectơ nào?",
      options: [
        "A. CA",
        "B. AC",
        "C. BA",
        "D. 0"
      ],
      correct: 1,
      hint: "Quy tắc xen điểm / cộng nối đuôi: Điểm cuối của vectơ trước là điểm đầu của vectơ sau.",
      formula: "vec(AB) + vec(BC) = vec(AC)"
    },
    {
      id: 7,
      monsterTitle: "QUÁI VẬT: ORC CUỒNG NỘ (Quy Tắc Hình Bình Hành)",
      question: "Nếu ABCD là hình bình hành thì theo quy tắc hình bình hành, tổng AB + AD bằng vectơ nào?",
      options: [
        "A. BD",
        "B. DB",
        "C. AC",
        "D. CA"
      ],
      correct: 2,
      hint: "Quy tắc hình bình hành: Tổng 2 vectơ cạnh xuất phát từ đỉnh A bằng vectơ đường chéo xuất phát từ đỉnh A.",
      formula: "vec(AB) + vec(AD) = vec(AC)"
    },
    {
      id: 8,
      monsterTitle: "QUÁI VẬT: ORC THỦ LĨNH CẦM BÚA (Tính Chất Trung Điểm)",
      question: "Cho điểm I là trung điểm của đoạn thẳng AB. Khẳng định nào sau đây là ĐÚNG?",
      options: [
        "A. IA + IB = 0",
        "B. IA = IB",
        "C. AI + BI = AB",
        "D. IA - IB = 0"
      ],
      correct: 0,
      hint: "Hai vectơ IA và IB là hai vectơ đối nhau (cùng độ dài, ngược hướng).",
      formula: "vec(IA) + vec(IB) = vec(0)"
    },
    {
      id: 9,
      monsterTitle: "TRÙM CUỐI: MALAKAR (Giai Đoạn 1 - Trọng Tâm Tam Giác)",
      question: "Cho G là trọng tâm của tam giác ABC. Đẳng thức vectơ nào sau đây là ĐÚNG?",
      options: [
        "A. GA + GB + GC = 0",
        "B. GA + GB = GC",
        "C. GA = GB = GC",
        "D. AB + BC + CA = GA"
      ],
      correct: 0,
      hint: "Trọng tâm tam giác là điểm cân bằng vectơ: Tổng 3 vectơ từ G đến 3 đỉnh bằng vectơ-không.",
      formula: "vec(GA) + vec(GB) + vec(GC) = vec(0)"
    },
    {
      id: 10,
      monsterTitle: "TRÙM CUỐI: MALAKAR (Đòn Kết Liễu - Tọa Độ Vectơ Oxy)",
      question: "Trong mặt phẳng Oxy, cho a = (2; 3) và b = (1; -2). Tọa độ của vectơ tổng a + b là bao nhiêu?",
      options: [
        "A. (1; 5)",
        "B. (3; 1)",
        "C. (2; -6)",
        "D. (3; 5)"
      ],
      correct: 1,
      hint: "Cộng từng tọa độ tương ứng: x = 2 + 1 = 3; y = 3 + (-2) = 1 => (3; 1).",
      formula: "vec(a) + vec(b) = (2+1; 3+(-2)) = (3; 1)"
    }
  ]
};
