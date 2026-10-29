/* ===== ĐƠN HÀNG DÙNG CHUNG — giohang.html, thietke.html và donhang.html cùng đọc/ghi qua file này =====
   Gắn vào mỗi trang:  <script src="orders.js"></script>
   Đơn được lưu trong localStorage (trên máy người dùng) với khóa "orders".

   Một đơn có dạng:
   - Từ giỏ hàng:  { type:"cart",   items:[{name,size,qty,price,img}], message:"lời chúc", total:123000 }
   - Từ thiết kế:  { type:"custom", design:{shape,tier,cot,nhan,kem,mau,mauHex,deco:[],date,time},
                     message:"chữ trên bánh", card:"lời chúc trên thiệp", preview:"<svg>...", total:123000 }
   Hệ thống tự thêm: id, placedAt, stage (0 = tiếp nhận, 1 = đang chế tác, 2 = đóng hộp, 3 = đã giao) */
const MuseOrders = {
  KEY: "orders",
  all() { try { return JSON.parse(localStorage.getItem(this.KEY) || "[]"); } catch (e) { return []; } },
  save(list) { localStorage.setItem(this.KEY, JSON.stringify(list)); },
  add(order) {
    const list = this.all();
    order.id = order.id || "MUSE-" + String(Date.now()).slice(-5);
    order.placedAt = order.placedAt || new Date().toISOString();
    if (order.stage === undefined) order.stage = 1;
    list.unshift(order);                 // đơn mới nhất nằm đầu danh sách
    this.save(list);
    return order;
  },
  get(id) { return this.all().find(o => o.id === id); },
  setStage(id, stage) {                  // dùng để thử: MuseOrders.setStage("MUSE-12345", 2) trong Console
    const list = this.all(), o = list.find(x => x.id === id);
    if (o) { o.stage = stage; this.save(list); }
  }
};