import { useState, useEffect } from "react";

// ─── BRAND TOKENS ───────────────────────────────────────────────
const C = {
  bg: "#1A1A1A",
  bgCard: "#242424",
  bgLight: "#2E2E2E",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  yellow: "#F5C518",
  white: "#F5F0E8",
  muted: "#9A9A9A",
  red: "#E05555",
  green: "#4CAF50",
};

// ─── D" KICHIN SVG LOGO ──────────────────────────────────────────
function DKichinLogo({ size = 48, showText = true }) {
  const w = size * 2.6;
  const h = showText ? size * 1.5 : size;
  return (
    <svg width={w} height={h} viewBox="0 0 130 75" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="boardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C96A"/>
          <stop offset="35%" stopColor="#C9A84C"/>
          <stop offset="70%" stopColor="#A8832A"/>
          <stop offset="100%" stopColor="#8B6914"/>
        </linearGradient>
        <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8C96A"/>
          <stop offset="50%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#8B6914"/>
        </linearGradient>
        <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D878"/>
          <stop offset="40%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#9A7020"/>
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#00000055"/>
        </filter>
      </defs>

      <g transform="rotate(-12, 58, 32)" filter="url(#shadow)">
        <rect x="14" y="14" width="72" height="36" rx="7" ry="7" fill="#8B6914"/>
        <rect x="13" y="12" width="72" height="36" rx="7" ry="7" fill="url(#faceGrad)"/>
        <circle cx="91" cy="30" r="7" fill="#8B6914"/>
        <circle cx="90" cy="29" r="7" fill="url(#boardGrad)"/>
        <circle cx="90" cy="29" r="3.2" fill="#1A1A1A"/>

        {/* Spatula */}
        <rect x="24" y="15" width="13" height="16" rx="2" fill="#1A1A1A"/>
        <rect x="26" y="17" width="2" height="11" rx="1" fill="url(#faceGrad)"/>
        <rect x="29.5" y="17" width="2" height="11" rx="1" fill="url(#faceGrad)"/>
        <rect x="33" y="17" width="2" height="11" rx="1" fill="url(#faceGrad)"/>
        <rect x="28.5" y="30" width="4" height="17" rx="2" fill="#1A1A1A"/>

        {/* Knife */}
        <path d="M46 14 L52 14 L50 32 L46 32 Z" fill="#1A1A1A"/>
        <rect x="46.5" y="32" width="4" height="15" rx="2" fill="#1A1A1A"/>

        {/* Spoon */}
        <ellipse cx="62" cy="22" rx="6" ry="7" fill="#1A1A1A"/>
        <rect x="59.5" y="28" width="4" height="18" rx="2" fill="#1A1A1A"/>
      </g>

      {/* Plate */}
      <ellipse cx="58" cy="53" rx="46" ry="5" fill="url(#plateGrad)" opacity="0.95"/>
      <ellipse cx="58" cy="52" rx="46" ry="4" fill="none" stroke="#E8C96A" strokeWidth="0.8" opacity="0.6"/>

      {showText && (
        <text
          x="58" y="70"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="14"
          fontWeight="700"
          fill="#C9A84C"
          letterSpacing="0.5"
        >
          D" Kichin
        </text>
      )}
    </svg>
  );
}

// ─── MENU DATA ───────────────────────────────────────────────────
const MENU = [
  { id: 1, name: "Shawarma", category: "Snacks", price: 35, emoji: "🌯", desc: "Juicy chicken wrap with veggies & sauce", available: true },
  { id: 2, name: "Pizza", category: "Mains", price: 80, emoji: "🍕", desc: "Classic pizza with pepperoni & fresh toppings", available: true },
  { id: 3, name: "Samosa", category: "Snacks", price: 15, emoji: "🥟", desc: "Crispy golden triangles, perfectly spiced", available: true },
  { id: 4, name: "Spring Rolls", category: "Snacks", price: 20, emoji: "🥢", desc: "Crunchy rolls with savory veggie filling", available: true },
  { id: 5, name: "Jollof Rice", category: "Mains", price: 45, emoji: "🍚", desc: "Rich West African tomato rice — the real deal", available: true },
  { id: 6, name: "Fried Rice", category: "Mains", price: 45, emoji: "🍳", desc: "Stir-fried rice with chicken & mixed veg", available: true },
  { id: 7, name: "Salad", category: "Sides", price: 25, emoji: "🥗", desc: "Fresh garden salad with creamy dressing", available: true },
  { id: 8, name: "Sobolo", category: "Drinks", price: 10, emoji: "🍹", desc: "Hibiscus flower drink, chilled & refreshing", available: true },
  { id: 9, name: "Coca-Cola", category: "Drinks", price: 8, emoji: "🥤", desc: "Ice cold Coca-Cola", available: true },
  { id: 10, name: "Sprite", category: "Drinks", price: 8, emoji: "🍋", desc: "Crisp lemon-lime Sprite", available: true },
];

const CATEGORIES = ["All", "Mains", "Snacks", "Sides", "Drinks"];
const ORDER_STATUSES = ["Received", "Preparing", "Out for Delivery", "Delivered"];

// ─── STYLES ──────────────────────────────────────────────────────
const gs = {
  app: {
    background: C.bg,
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    color: C.white,
    maxWidth: 430,
    margin: "0 auto",
    position: "relative",
  },
  header: {
    background: "linear-gradient(135deg, #111 0%, #1e1a10 100%)",
    padding: "16px 20px 12px",
    borderBottom: `1px solid ${C.gold}33`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  page: { paddingBottom: 80 },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 430,
    background: "#111",
    borderTop: `1px solid ${C.gold}44`,
    display: "flex",
    zIndex: 200,
  },
  navBtn: (active) => ({
    flex: 1,
    padding: "10px 0 8px",
    background: "none",
    border: "none",
    color: active ? C.gold : C.muted,
    fontSize: 10,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    transition: "color 0.2s",
  }),
  goldBtn: {
    background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
    color: "#111",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: C.bgCard,
    borderRadius: 16,
    overflow: "hidden",
    border: `1px solid ${C.gold}22`,
  },
  badge: (color) => ({
    background: color,
    color: "#111",
    borderRadius: 20,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 700,
  }),
  input: {
    background: C.bgLight,
    border: `1px solid ${C.gold}44`,
    borderRadius: 10,
    padding: "12px 14px",
    color: C.white,
    fontSize: 14,
    width: "100%",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────
const formatGHS = (n) => `₵${n.toFixed(2)}`;
const genOrderId = () => "DK" + Date.now().toString().slice(-6);

// ─── MENU CARD ───────────────────────────────────────────────────
function MenuCard({ item, onAdd }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div style={{ ...gs.card, display: "flex", alignItems: "center", padding: 14, gap: 14, marginBottom: 12 }}>
      <div style={{
        width: 64, height: 64, borderRadius: 12,
        background: `linear-gradient(135deg, ${C.bgLight}, #333)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32, flexShrink: 0, border: `1px solid ${C.gold}22`
      }}>{item.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 2 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 6, lineHeight: 1.3 }}>{item.desc}</div>
        <div style={{ color: C.gold, fontWeight: 800, fontSize: 16 }}>{formatGHS(item.price)}</div>
      </div>
      <button onClick={handleAdd} style={{
        background: added ? C.green : `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
        border: "none", borderRadius: 10, width: 36, height: 36,
        color: "#111", fontSize: 20, cursor: "pointer", flexShrink: 0,
        fontWeight: 700, transition: "background 0.3s",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>{added ? "✓" : "+"}</button>
    </div>
  );
}

// ─── MENU PAGE ───────────────────────────────────────────────────
function MenuPage({ cart, setCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(MENU);

  useEffect(() => {
    const saved = localStorage.getItem("dk_menu");
    if (saved) setMenu(JSON.parse(saved));
  }, []);

  const filtered = menu.filter(i =>
    i.available &&
    (activeCategory === "All" || i.category === activeCategory) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div style={gs.page}>
      <div style={{
        background: "linear-gradient(135deg, #111 0%, #1e1a10 60%, #2a1f00 100%)",
        padding: "24px 20px 20px",
        textAlign: "center",
        borderBottom: `1px solid ${C.gold}33`
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 8 }}>
          <DKichinLogo size={52} showText={true} />
        </div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
          Bremang, New York Junction, Kumasi
        </div>
        <div style={{ fontSize: 12, color: C.gold + "99", marginTop: 2 }}>
          📞 0243763138 · 🛵 Delivery available
        </div>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        <input
          style={{ ...gs.input, marginBottom: 14 }}
          placeholder="🔍  Search dishes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{
              background: activeCategory === c ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` : C.bgLight,
              color: activeCategory === c ? "#111" : C.muted,
              border: "none", borderRadius: 20, padding: "7px 16px",
              fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "4px 20px 0" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: C.muted, padding: "40px 0" }}>No dishes found</div>
        ) : filtered.map(item => (
          <MenuCard key={item.id} item={item} onAdd={addToCart} />
        ))}
      </div>

      {cartCount > 0 && (
        <div style={{
          position: "fixed", bottom: 68, left: "50%", transform: "translateX(-50%)",
          background: C.gold, color: "#111", borderRadius: 24, padding: "10px 24px",
          fontWeight: 700, fontSize: 14, zIndex: 150, whiteSpace: "nowrap",
          boxShadow: `0 4px 20px ${C.gold}66`
        }}>
          🛒 {cartCount} item{cartCount > 1 ? "s" : ""} in cart
        </div>
      )}
    </div>
  );
}

// ─── CART PAGE ───────────────────────────────────────────────────
function CartPage({ cart, setCart, onCheckout }) {
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0));
  };
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const deliveryFee = 15;

  if (cart.length === 0) return (
    <div style={{ ...gs.page, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", padding: 20 }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🛒</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.gold, marginBottom: 8 }}>Your cart is empty</div>
      <div style={{ color: C.muted, fontSize: 14 }}>Add some delicious food from the menu</div>
    </div>
  );

  return (
    <div style={gs.page}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 16 }}>Your Order</div>
        {cart.map(item => (
          <div key={item.id} style={{ ...gs.card, display: "flex", alignItems: "center", padding: 14, gap: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 28 }}>{item.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
              <div style={{ color: C.gold, fontSize: 13, fontWeight: 700 }}>{formatGHS(item.price)}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => updateQty(item.id, -1)} style={{ background: C.bgLight, border: "none", color: C.white, width: 28, height: 28, borderRadius: 8, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)} style={{ background: C.gold, border: "none", color: "#111", width: 28, height: 28, borderRadius: 8, cursor: "pointer", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          </div>
        ))}
        <div style={{ ...gs.card, padding: 16, marginTop: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: C.muted, fontSize: 14 }}>
            <span>Subtotal</span><span style={{ color: C.white }}>{formatGHS(total)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: C.muted, fontSize: 14 }}>
            <span>Delivery fee</span><span style={{ color: C.white }}>{formatGHS(deliveryFee)}</span>
          </div>
          <div style={{ height: 1, background: C.gold + "33", marginBottom: 12 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 17 }}>
            <span>Total</span><span style={{ color: C.gold }}>{formatGHS(total + deliveryFee)}</span>
          </div>
        </div>
        <button style={gs.goldBtn} onClick={onCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ───────────────────────────────────────────────
function CheckoutPage({ cart, setCart, onOrderPlaced }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [paying, setPaying] = useState(false);
  const [errors, setErrors] = useState({});
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0) + 15;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Enter a valid phone number";
    if (!form.address.trim()) e.address = "Enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePayment = () => {
    if (!validate()) return;
    setPaying(true);
    const handler = window.PaystackPop?.setup({
      key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // 🔁 swap to live key
      email: `${form.phone}@dkichin.com`,
      amount: total * 100,
      currency: "GHS",
      ref: genOrderId(),
      metadata: { custom_fields: [{ display_name: "Customer", value: form.name }, { display_name: "Address", value: form.address }] },
      callback: (response) => {
        const order = { id: response.reference, customer: form, items: cart, total, status: "Received", time: new Date().toISOString(), payRef: response.reference };
        const existing = JSON.parse(localStorage.getItem("dk_orders") || "[]");
        localStorage.setItem("dk_orders", JSON.stringify([order, ...existing]));
        setCart([]);
        setPaying(false);
        onOrderPlaced(order);
      },
      onClose: () => setPaying(false),
    });

    if (handler) {
      handler.openIframe();
    } else {
      setTimeout(() => {
        const order = { id: genOrderId(), customer: form, items: cart, total, status: "Received", time: new Date().toISOString(), payRef: "DEMO_" + Date.now() };
        const existing = JSON.parse(localStorage.getItem("dk_orders") || "[]");
        localStorage.setItem("dk_orders", JSON.stringify([order, ...existing]));
        setCart([]);
        setPaying(false);
        onOrderPlaced(order);
      }, 1500);
    }
  };

  const Field = ({ label, k, placeholder, multiline }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 5 }}>{label}</label>
      {multiline ? (
        <textarea style={{ ...gs.input, resize: "vertical", minHeight: 72 }} placeholder={placeholder} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} />
      ) : (
        <input style={{ ...gs.input, borderColor: errors[k] ? C.red + "88" : `${C.gold}44` }} placeholder={placeholder} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} />
      )}
      {errors[k] && <div style={{ color: C.red, fontSize: 11, marginTop: 3 }}>{errors[k]}</div>}
    </div>
  );

  return (
    <div style={gs.page}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 20 }}>Delivery Details</div>
        <Field label="Full Name" k="name" placeholder="Your name" />
        <Field label="Phone (MoMo number)" k="phone" placeholder="024 XXX XXXX" />
        <Field label="Delivery Address" k="address" placeholder="Area, street, landmark..." />
        <Field label="Special Instructions (optional)" k="note" placeholder="E.g. no onions, call when nearby..." multiline />
        <div style={{ ...gs.card, padding: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 10 }}>ORDER SUMMARY</div>
          {cart.map(c => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
              <span>{c.emoji} {c.name} × {c.qty}</span>
              <span style={{ color: C.gold }}>{formatGHS(c.price * c.qty)}</span>
            </div>
          ))}
          <div style={{ height: 1, background: C.gold + "33", margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
            <span>Total (incl. delivery)</span>
            <span style={{ color: C.gold }}>{formatGHS(total)}</span>
          </div>
        </div>
        <button style={{ ...gs.goldBtn, opacity: paying ? 0.7 : 1 }} onClick={handlePayment} disabled={paying}>
          {paying ? "Processing..." : `Pay ${formatGHS(total)} via MoMo`}
        </button>
        <div style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 8 }}>
          🔒 Secured by Paystack · MTN MoMo, Vodafone Cash, AirtelTigo
        </div>
      </div>
    </div>
  );
}

// ─── TRACKING PAGE ───────────────────────────────────────────────
function TrackingPage({ lastOrder }) {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dk_orders") || "[]");
    setOrders(saved);
    if (lastOrder) setSelected(lastOrder);
  }, [lastOrder]);

  const statusIndex = (status) => ORDER_STATUSES.indexOf(status);

  const OrderDetail = ({ order }) => (
    <div>
      <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: C.gold, cursor: "pointer", fontSize: 13, marginBottom: 16, padding: 0 }}>← Back to orders</button>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: C.gold, marginBottom: 4 }}>Order #{order.id}</div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>{new Date(order.time).toLocaleString()}</div>
      <div style={{ ...gs.card, padding: 20, marginBottom: 16 }}>
        {ORDER_STATUSES.map((s, i) => {
          const current = statusIndex(order.status);
          const done = i <= current;
          const active = i === current;
          return (
            <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? C.gold : C.bgLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: done ? "#111" : C.muted, border: active ? `2px solid ${C.goldLight}` : "none", flexShrink: 0, transition: "background 0.3s" }}>{done ? "✓" : i + 1}</div>
                {i < ORDER_STATUSES.length - 1 && <div style={{ width: 2, height: 28, background: done && i < current ? C.gold : C.bgLight, transition: "background 0.3s" }} />}
              </div>
              <div style={{ paddingTop: 4, paddingBottom: i < ORDER_STATUSES.length - 1 ? 18 : 0 }}>
                <div style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? C.gold : done ? C.white : C.muted }}>{s}</div>
                {active && (
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                    {s === "Received" && "We got your order!"}
                    {s === "Preparing" && "Chef is cooking your food 🍳"}
                    {s === "Out for Delivery" && "On the way to you 🛵"}
                    {s === "Delivered" && "Enjoy your meal! 😋"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ ...gs.card, padding: 14 }}>
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 10 }}>ITEMS ORDERED</div>
        {order.items.map(c => (
          <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span>{c.emoji} {c.name} × {c.qty}</span>
            <span style={{ color: C.gold }}>{formatGHS(c.price * c.qty)}</span>
          </div>
        ))}
        <div style={{ height: 1, background: C.gold + "33", margin: "10px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
          <span>Total paid</span><span style={{ color: C.gold }}>{formatGHS(order.total)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={gs.page}>
      <div style={{ padding: "20px 20px 0" }}>
        {selected ? <OrderDetail order={selected} /> : (
          <>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 16 }}>Your Orders</div>
            {orders.length === 0 ? (
              <div style={{ textAlign: "center", color: C.muted, padding: "60px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                <div>No orders yet — place your first one!</div>
              </div>
            ) : orders.map(o => (
              <div key={o.id} style={{ ...gs.card, padding: 14, marginBottom: 12, cursor: "pointer" }} onClick={() => setSelected(o)}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Order #{o.id}</span>
                  <span style={gs.badge(o.status === "Delivered" ? C.green : o.status === "Out for Delivery" ? C.gold : o.status === "Preparing" ? C.yellow : C.bgLight)}>{o.status}</span>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{o.items.map(i => i.name).join(", ")}</div>
                <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, marginTop: 4 }}>{formatGHS(o.total)}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ──────────────────────────────────────────────────
function AdminPage() {
  const [adminView, setAdminView] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [menu, setMenu] = useState(() => { const s = localStorage.getItem("dk_menu"); return s ? JSON.parse(s) : MENU; });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const load = () => { const s = JSON.parse(localStorage.getItem("dk_orders") || "[]"); setOrders(s); };
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem("dk_orders", JSON.stringify(updated));
    if (selectedOrder?.id === orderId) setSelectedOrder(prev => ({ ...prev, status: newStatus }));
  };

  const toggleAvailability = (id) => {
    const updated = menu.map(i => i.id === id ? { ...i, available: !i.available } : i);
    setMenu(updated);
    localStorage.setItem("dk_menu", JSON.stringify(updated));
  };

  const saveMenuItem = (item) => {
    const updated = item.id ? menu.map(i => i.id === item.id ? item : i) : [...menu, { ...item, id: Date.now(), available: true }];
    setMenu(updated);
    localStorage.setItem("dk_menu", JSON.stringify(updated));
    setEditItem(null);
  };

  const totalRevenue = orders.filter(o => o.status === "Delivered").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => o.status !== "Delivered").length;

  const AdminNav = () => (
    <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
      {[["orders", "📋 Orders"], ["menu", "🍽️ Menu"], ["sales", "📊 Sales"]].map(([v, l]) => (
        <button key={v} onClick={() => setAdminView(v)} style={{ background: adminView === v ? C.gold : C.bgLight, color: adminView === v ? "#111" : C.muted, border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{l}</button>
      ))}
    </div>
  );

  const OrdersView = () => {
    if (selectedOrder) {
      const next = ORDER_STATUSES[ORDER_STATUSES.indexOf(selectedOrder.status) + 1];
      return (
        <div>
          <button onClick={() => setSelectedOrder(null)} style={{ background: "none", border: "none", color: C.gold, cursor: "pointer", fontSize: 13, marginBottom: 16, padding: 0 }}>← Back</button>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.gold, marginBottom: 4 }}>Order #{selectedOrder.id}</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{new Date(selectedOrder.time).toLocaleString()}</div>
          <div style={{ ...gs.card, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 8 }}>CUSTOMER</div>
            <div style={{ fontWeight: 600 }}>{selectedOrder.customer.name}</div>
            <div style={{ color: C.muted, fontSize: 13 }}>{selectedOrder.customer.phone}</div>
            <div style={{ color: C.muted, fontSize: 13 }}>{selectedOrder.customer.address}</div>
            {selectedOrder.customer.note && <div style={{ color: C.yellow, fontSize: 12, marginTop: 4 }}>Note: {selectedOrder.customer.note}</div>}
          </div>
          <div style={{ ...gs.card, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 8 }}>ITEMS</div>
            {selectedOrder.items.map(c => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span>{c.emoji} {c.name} × {c.qty}</span>
                <span style={{ color: C.gold }}>{formatGHS(c.price * c.qty)}</span>
              </div>
            ))}
            <div style={{ height: 1, background: C.gold + "33", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <span>Total</span><span style={{ color: C.gold }}>{formatGHS(selectedOrder.total)}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Status:</span>
            <span style={gs.badge(C.gold)}>{selectedOrder.status}</span>
          </div>
          {next && <button style={gs.goldBtn} onClick={() => updateOrderStatus(selectedOrder.id, next)}>Mark as: {next} →</button>}
          {selectedOrder.status === "Delivered" && <div style={{ textAlign: "center", color: C.green, fontWeight: 700, padding: 12 }}>✓ Order Complete</div>}
        </div>
      );
    }

    const grouped = { Received: [], Preparing: [], "Out for Delivery": [], Delivered: [] };
    orders.forEach(o => { if (grouped[o.status]) grouped[o.status].push(o); });

    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[["Total Orders", orders.length, "📋"], ["Pending", pending, "⏳"], ["Revenue", formatGHS(totalRevenue), "💰"], ["Delivered", orders.filter(o => o.status === "Delivered").length, "✅"]].map(([l, v, e]) => (
            <div key={l} style={{ ...gs.card, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{e}</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: C.gold }}>{v}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
        {Object.entries(grouped).filter(([, arr]) => arr.length > 0).map(([status, arr]) => (
          <div key={status}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{status.toUpperCase()} ({arr.length})</div>
            {arr.map(o => (
              <div key={o.id} style={{ ...gs.card, padding: 12, marginBottom: 8, cursor: "pointer", borderLeft: `3px solid ${C.gold}` }} onClick={() => setSelectedOrder(o)}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>#{o.id}</span>
                  <span style={{ color: C.gold, fontWeight: 700 }}>{formatGHS(o.total)}</span>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{o.customer.name} · {o.customer.phone}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{o.items.map(i => i.name).join(", ")}</div>
              </div>
            ))}
          </div>
        ))}
        {orders.length === 0 && <div style={{ textAlign: "center", color: C.muted, padding: "40px 0" }}><div style={{ fontSize: 40 }}>📭</div><div style={{ marginTop: 8 }}>No orders yet</div></div>}
      </div>
    );
  };

  const MenuView = () => {
    const [form, setForm] = useState(editItem || { name: "", category: "Mains", price: "", emoji: "🍽️", desc: "" });
    if (editItem !== null) {
      return (
        <div>
          <button onClick={() => setEditItem(null)} style={{ background: "none", border: "none", color: C.gold, cursor: "pointer", fontSize: 13, marginBottom: 16, padding: 0 }}>← Cancel</button>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.gold, marginBottom: 16 }}>{editItem.id ? "Edit Dish" : "Add New Dish"}</div>
          {[["Dish Name", "name", "e.g. Banku & Tilapia"], ["Emoji", "emoji", "🍽️"], ["Description", "desc", "Short description..."], ["Price (GHS)", "price", "0.00"]].map(([l, k, p]) => (
            <div key={k} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 4 }}>{l}</label>
              <input style={gs.input} placeholder={p} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 4 }}>Category</label>
            <select style={gs.input} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {["Mains", "Snacks", "Sides", "Drinks"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button style={gs.goldBtn} onClick={() => saveMenuItem({ ...form, price: parseFloat(form.price) || 0 })}>{editItem.id ? "Save Changes" : "Add Dish"}</button>
        </div>
      );
    }
    return (
      <div>
        <button style={{ ...gs.goldBtn, marginBottom: 16 }} onClick={() => setEditItem({ name: "", category: "Mains", price: "", emoji: "🍽️", desc: "" })}>+ Add New Dish</button>
        {menu.map(item => (
          <div key={item.id} style={{ ...gs.card, display: "flex", alignItems: "center", padding: 12, marginBottom: 10, gap: 12 }}>
            <div style={{ fontSize: 28 }}>{item.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: item.available ? C.white : C.muted }}>{item.name}</div>
              <div style={{ color: C.gold, fontSize: 13 }}>{formatGHS(item.price)}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setEditItem(item)} style={{ background: C.bgLight, border: "none", color: C.white, padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Edit</button>
              <button onClick={() => toggleAvailability(item.id)} style={{ background: item.available ? C.green + "33" : C.red + "33", border: "none", color: item.available ? C.green : C.red, padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>{item.available ? "On" : "Off"}</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const SalesView = () => {
    const delivered = orders.filter(o => o.status === "Delivered");
    const itemCounts = {};
    delivered.forEach(o => o.items.forEach(i => { itemCounts[i.name] = (itemCounts[i.name] || 0) + i.qty; }));
    const topItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[["Total Revenue", formatGHS(totalRevenue), "💰"], ["Completed", delivered.length, "✅"], ["Avg Order", delivered.length ? formatGHS(totalRevenue / delivered.length) : "₵0.00", "📈"], ["Active", pending, "🔥"]].map(([l, v, e]) => (
            <div key={l} style={{ ...gs.card, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{e}</div>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.gold }}>{v}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
        {topItems.length > 0 && (
          <div style={{ ...gs.card, padding: 14 }}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>TOP SELLERS</div>
            {topItems.map(([name, qty], i) => {
              const item = menu.find(m => m.name === name);
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.gold, color: "#111", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                  <div style={{ fontSize: 18 }}>{item?.emoji || "🍽️"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{qty} sold</div>
                  </div>
                  <div style={{ color: C.gold, fontWeight: 700 }}>{formatGHS((item?.price || 0) * qty)}</div>
                </div>
              );
            })}
          </div>
        )}
        {topItems.length === 0 && <div style={{ textAlign: "center", color: C.muted, padding: "30px 0" }}>Complete some orders to see sales data</div>}
      </div>
    );
  };

  return (
    <div style={gs.page}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <DKichinLogo size={28} showText={false} /> Admin Portal
        </div>
        <AdminNav />
        {adminView === "orders" && <OrdersView />}
        {adminView === "menu" && <MenuView />}
        {adminView === "sales" && <SalesView />}
      </div>
    </div>
  );
}

// ─── SUCCESS PAGE ────────────────────────────────────────────────
function SuccessPage({ order, onTrack }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: 32, textAlign: "center" }}>
      <DKichinLogo size={56} showText={true} />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: C.gold, marginBottom: 8 }}>Order Placed!</div>
      <div style={{ color: C.muted, fontSize: 14, marginBottom: 4 }}>Order #{order.id}</div>
      <div style={{ color: C.white, fontSize: 14, marginBottom: 24 }}>Thank you, {order.customer.name}! We're on it 🍳</div>
      <button style={gs.goldBtn} onClick={onTrack}>Track My Order</button>
      <div style={{ marginTop: 16, fontSize: 12, color: C.muted }}>Questions? Call us: <span style={{ color: C.gold }}>0243763138</span></div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("menu");
  const [cart, setCart] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const handleOrderPlaced = (order) => { setLastOrder(order); setShowSuccess(true); setCheckingOut(false); };

  const handleAdminLogin = () => {
    if (adminCode === "1234") { // 🔁 change this to a strong code
      setIsAdmin(true); setShowAdminLogin(false); setTab("admin");
    } else { alert("Wrong code"); }
  };

  if (showSuccess && lastOrder) return (
    <div style={gs.app}>
      <SuccessPage order={lastOrder} onTrack={() => { setShowSuccess(false); setTab("track"); }} />
    </div>
  );

  return (
    <div style={gs.app}>
      <div style={gs.header}>
        <DKichinLogo size={32} showText={false} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isAdmin && (
            <button onClick={() => { setIsAdmin(false); setTab("menu"); }} style={{ background: "none", border: `1px solid ${C.gold}44`, color: C.muted, borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>Exit Admin</button>
          )}
          <button onClick={() => setShowAdminLogin(v => !v)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>⚙️</button>
        </div>
      </div>

      {showAdminLogin && (
        <div style={{ background: C.bgCard, padding: 16, borderBottom: `1px solid ${C.gold}33` }}>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Admin Access</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="password" style={{ ...gs.input, flex: 1 }} placeholder="Enter admin code" value={adminCode} onChange={e => setAdminCode(e.target.value)} />
            <button style={{ background: C.gold, border: "none", color: "#111", borderRadius: 10, padding: "0 16px", fontWeight: 700, cursor: "pointer" }} onClick={handleAdminLogin}>→</button>
          </div>
        </div>
      )}

      {checkingOut ? <CheckoutPage cart={cart} setCart={setCart} onOrderPlaced={handleOrderPlaced} />
        : tab === "menu" ? <MenuPage cart={cart} setCart={setCart} />
        : tab === "cart" ? <CartPage cart={cart} setCart={setCart} onCheckout={() => setCheckingOut(true)} />
        : tab === "track" ? <TrackingPage lastOrder={lastOrder} />
        : tab === "admin" && isAdmin ? <AdminPage />
        : null}

      <div style={gs.bottomNav}>
        {[["menu", "🍽️", "Menu"], ["cart", cartCount > 0 ? `🛒${cartCount}` : "🛒", "Cart"], ["track", "📍", "Track"]].map(([id, icon, label]) => (
          <button key={id} style={gs.navBtn(tab === id && !checkingOut)} onClick={() => { setCheckingOut(false); setTab(id); }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
        {isAdmin && (
          <button style={gs.navBtn(tab === "admin")} onClick={() => { setCheckingOut(false); setTab("admin"); }}>
            <span style={{ fontSize: 18 }}>🔧</span>
            <span>Admin</span>
          </button>
        )}
      </div>
    </div>
  );
}
