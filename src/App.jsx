import { useState, useEffect, useRef } from "react";

// ─── BRAND TOKENS ────────────────────────────────────────────────
const C = {
  bg:        "#1A1A1A",
  bgCard:    "#242424",
  bgLight:   "#2E2E2E",
  gold:      "#C9A84C",
  goldLight: "#E8C96A",
  goldDark:  "#8B6914",
  yellow:    "#F5C518",
  white:     "#F5F0E8",
  muted:     "#9A9A9A",
  red:       "#E05555",
  green:     "#4CAF50",
};

// ─── SVG LOGO ────────────────────────────────────────────────────
function DKichinLogo({ size = 48, showText = true }) {
  const w = size * 2.8;
  const h = showText ? size * 1.8 : size * 1.1;
  const hole = "#1A1A1A";

  return (
    <svg width={w} height={h} viewBox="0 0 140 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lgFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#F0D878"/>
          <stop offset="30%"  stopColor="#D4AA50"/>
          <stop offset="70%"  stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#9A7020"/>
        </linearGradient>
        <linearGradient id="lgEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#A8832A"/>
          <stop offset="100%" stopColor="#6B4F10"/>
        </linearGradient>
        <linearGradient id="lgKnob" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#E8C96A"/>
          <stop offset="100%" stopColor="#9A7020"/>
        </linearGradient>
        <filter id="ds">
          <feDropShadow dx="1.5" dy="2.5" stdDeviation="2" floodColor="#00000060"/>
        </filter>
      </defs>

      <g transform="rotate(-12, 65, 34)" filter="url(#ds)">
        {/* Board depth */}
        <rect x="17" y="17" width="76" height="38" rx="8" fill="url(#lgEdge)"/>
        {/* Board face */}
        <rect x="15" y="14" width="76" height="38" rx="8" fill="url(#lgFace)"/>
        {/* Handle knob depth */}
        <circle cx="98" cy="34" r="8.5" fill="url(#lgEdge)"/>
        {/* Handle knob face */}
        <circle cx="97" cy="32" r="8.5" fill="url(#lgKnob)"/>
        {/* Handle hole */}
        <circle cx="97" cy="32" r="3.8" fill={hole}/>

        {/* Spatula head cutout */}
        <rect x="23" y="15" width="14" height="18" rx="2.5" fill={hole}/>
        {/* Spatula slots */}
        <rect x="25.5" y="17.5" width="2.2" height="12" rx="1" fill="url(#lgFace)"/>
        <rect x="29.2" y="17.5" width="2.2" height="12" rx="1" fill="url(#lgFace)"/>
        <rect x="32.9" y="17.5" width="2.2" height="12" rx="1" fill="url(#lgFace)"/>
        {/* Spatula handle */}
        <rect x="27.5" y="32" width="5" height="18" rx="2.5" fill={hole}/>

        {/* Knife blade */}
        <path d="M48 13 L55 13 L53 33 L48 33 Z" fill={hole}/>
        <circle cx="50.5" cy="33.5" r="1" fill="url(#lgFace)"/>
        {/* Knife handle */}
        <rect x="48" y="34" width="5" height="16" rx="2.5" fill={hole}/>

        {/* Spoon bowl */}
        <ellipse cx="67" cy="23" rx="6.5" ry="7.5" fill={hole}/>
        {/* Spoon handle */}
        <path d="M64.5 29.5 Q67 32 69.5 29.5 L70 46 L64 46 Z" fill={hole}/>
      </g>

      {showText && (
        <text
          x="68" y="76"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="15" fontWeight="700"
          fill="#C9A84C" letterSpacing="0.8"
        >
          D&quot; Kichin
        </text>
      )}
    </svg>
  );
}

// ─── MENU DATA ───────────────────────────────────────────────────
const MENU_DEFAULT = [
  { id:1,  name:"Shawarma",     category:"Snacks", price:35, emoji:"🌯", desc:"Juicy chicken wrap with fresh veggies & sauce",   available:true, image:"" },
  { id:2,  name:"Pizza",        category:"Mains",  price:80, emoji:"🍕", desc:"Classic pizza with pepperoni & fresh toppings",   available:true, image:"" },
  { id:3,  name:"Samosa",       category:"Snacks", price:15, emoji:"🥟", desc:"Crispy golden triangles, perfectly spiced",       available:true, image:"" },
  { id:4,  name:"Spring Rolls", category:"Snacks", price:20, emoji:"🥢", desc:"Crunchy rolls with savoury veggie filling",       available:true, image:"" },
  { id:5,  name:"Jollof Rice",  category:"Mains",  price:45, emoji:"🍚", desc:"Rich West African tomato rice — the real deal",   available:true, image:"" },
  { id:6,  name:"Fried Rice",   category:"Mains",  price:45, emoji:"🍳", desc:"Stir-fried rice with chicken & mixed veg",       available:true, image:"" },
  { id:7,  name:"Salad",        category:"Sides",  price:25, emoji:"🥗", desc:"Fresh garden salad with creamy dressing",        available:true, image:"" },
  { id:8,  name:"Sobolo",       category:"Drinks", price:10, emoji:"🍹", desc:"Hibiscus flower drink, chilled & refreshing",    available:true, image:"" },
  { id:9,  name:"Coca-Cola",    category:"Drinks", price:8,  emoji:"🥤", desc:"Ice cold Coca-Cola",                             available:true, image:"" },
  { id:10, name:"Sprite",       category:"Drinks", price:8,  emoji:"🍋", desc:"Crisp lemon-lime Sprite",                        available:true, image:"" },
];

const CATEGORIES     = ["All","Mains","Snacks","Sides","Drinks"];
const ORDER_STATUSES = ["Received","Preparing","Out for Delivery","Delivered"];

// Hero slides — uses dish image if uploaded, else gradient bg
const SLIDES = [
  { id:1,  name:"Shawarma",    grad:"linear-gradient(135deg,#7B2D00,#C9500A,#1A1A1A)" },
  { id:2,  name:"Pizza",       grad:"linear-gradient(135deg,#6B0000,#B71C1C,#1A1A1A)" },
  { id:5,  name:"Jollof Rice", grad:"linear-gradient(135deg,#4A3000,#C9A84C,#1A1A1A)" },
  { id:3,  name:"Samosa",      grad:"linear-gradient(135deg,#004030,#00796B,#1A1A1A)" },
  { id:8,  name:"Sobolo",      grad:"linear-gradient(135deg,#4A0030,#880E4F,#1A1A1A)" },
];

const PARTICLES = ["🌶️","🧅","🍅","🧄","🌿","🫙","🍋","🥕","🫚","🌽"];

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
    background: "linear-gradient(135deg,#0e0e0e 0%,#1e1a10 100%)",
    padding: "12px 20px",
    borderBottom: `1px solid ${C.gold}33`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  page: { paddingBottom: 88 },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 430,
    background: "#0e0e0e",
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
    background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
    color: "#111",
    border: "none",
    borderRadius: 14,
    padding: "14px 28px",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: C.bgCard,
    borderRadius: 16,
    border: `1px solid ${C.gold}22`,
    overflow: "hidden",
  },
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
  badge: (color) => ({
    background: color,
    color: color === C.bgLight ? C.muted : "#111",
    borderRadius: 20,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 700,
  }),
};

const fmtGHS = (n) => `₵${Number(n).toFixed(2)}`;
const genRef = ()  => "DK" + Date.now().toString().slice(-6);

// ─── DISH IMAGE (real photo or emoji fallback) ────────────────────
function DishThumb({ item, size = 64, radius = 12 }) {
  const [err, setErr] = useState(false);
  if (item.image && !err) {
    return (
      <img
        src={item.image}
        alt={item.name}
        onError={() => setErr(true)}
        style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", flexShrink: 0, border: `1px solid ${C.gold}22` }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: `linear-gradient(135deg,${C.bgLight},#333)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.48, border: `1px solid ${C.gold}22`,
    }}>{item.emoji}</div>
  );
}

// ─── FLOATING PARTICLE ───────────────────────────────────────────
function Particle({ emoji, style }) {
  return (
    <span style={{
      position: "absolute",
      fontSize: 20,
      pointerEvents: "none",
      animation: `floatUp ${3 + Math.random() * 3}s ease-in infinite`,
      animationDelay: `${Math.random() * 4}s`,
      opacity: 0.55,
      ...style,
    }}>{emoji}</span>
  );
}

// ─── HERO SLIDESHOW ──────────────────────────────────────────────
function HeroSlideshow({ menu }) {
  const [idx, setIdx]       = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(p => (p + 1) % SLIDES.length); setVisible(true); }, 380);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const slide    = SLIDES[idx];
  const menuItem = menu.find(m => m.id === slide.id);
  const hasPhoto = menuItem?.image && menuItem.image.trim() !== "";

  const particles = useRef(
    PARTICLES.map((e, i) => ({
      emoji: e,
      left:   `${8  + (i * 9)  % 84}%`,
      bottom: `${5  + (i * 13) % 40}%`,
    }))
  ).current;

  return (
    <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
      {/* Background — real photo or gradient */}
      {hasPhoto ? (
        <img
          src={menuItem.image}
          alt={slide.name}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transition:"opacity 0.4s" }}
        />
      ) : (
        <div style={{ position:"absolute", inset:0, background:slide.grad, transition:"background 0.6s" }}/>
      )}

      {/* Dark overlay */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #1A1A1Aee 0%, #1A1A1A55 50%, #1A1A1A22 100%)", zIndex:1 }}/>

      {/* Floating particles — only show when no real photo */}
      {!hasPhoto && particles.map((p, i) => (
        <Particle key={i} emoji={p.emoji} style={{ left:p.left, bottom:p.bottom, zIndex:2 }}/>
      ))}

      {/* Slide content */}
      <div style={{
        position:"absolute", inset:0, zIndex:3,
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"16px 24px 60px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.38s ease, transform 0.38s ease",
      }}>
        <DKichinLogo size={38} showText={true}/>

        <div style={{ fontSize: hasPhoto ? 0 : 68, lineHeight:1, marginTop:10, filter:"drop-shadow(0 4px 16px #00000088)", transition:"font-size 0.3s" }}>
          {!hasPhoto && menuItem?.emoji}
        </div>

        <div style={{
          fontFamily:"'Playfair Display', serif",
          fontSize: 26, fontWeight:700,
          color: C.white, marginTop: hasPhoto ? 16 : 6,
          textAlign:"center",
          textShadow:"0 2px 16px #000000bb",
        }}>{slide.name}</div>

        <div style={{ fontSize:13, color:"#ffffffaa", marginTop:4, textAlign:"center" }}>
          {menuItem?.desc}
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position:"absolute", bottom:14, left:0, right:0, display:"flex", justifyContent:"center", gap:6, zIndex:4 }}>
        {SLIDES.map((_,i) => (
          <div key={i} onClick={() => { setVisible(false); setTimeout(()=>{ setIdx(i); setVisible(true); },200); }} style={{
            width: i===idx ? 22 : 6,
            height: 6,
            borderRadius: 3,
            background: i===idx ? C.gold : `${C.gold}44`,
            cursor:"pointer",
            transition:"all 0.3s ease",
          }}/>
        ))}
      </div>
    </div>
  );
}

// ─── MENU CARD ───────────────────────────────────────────────────
function MenuCard({ item, onAdd }) {
  const [added, setAdded] = useState(false);
  const handle = () => { onAdd(item); setAdded(true); setTimeout(() => setAdded(false), 1200); };

  return (
    <div style={{ ...gs.card, display:"flex", alignItems:"center", padding:14, gap:14, marginBottom:12 }}>
      <DishThumb item={item} size={68} radius={12}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:700, fontSize:15, marginBottom:2 }}>{item.name}</div>
        <div style={{ fontSize:12, color:C.muted, marginBottom:6, lineHeight:1.35 }}>{item.desc}</div>
        <div style={{ color:C.gold, fontWeight:800, fontSize:16 }}>{fmtGHS(item.price)}</div>
      </div>
      <button onClick={handle} style={{
        background: added ? C.green : `linear-gradient(135deg,${C.gold},${C.goldLight})`,
        border:"none", borderRadius:10, width:36, height:36,
        color:"#111", fontSize:18, cursor:"pointer", flexShrink:0,
        fontWeight:700, transition:"background 0.3s",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>{added ? "✓" : "+"}</button>
    </div>
  );
}

// ─── MENU PAGE ───────────────────────────────────────────────────
function MenuPage({ cart, setCart }) {
  const [cat, setCat]       = useState("All");
  const [search, setSearch] = useState("");
  const [menu, setMenu]     = useState(MENU_DEFAULT);

  useEffect(() => {
    const s = localStorage.getItem("dk_menu");
    if (s) setMenu(JSON.parse(s));
  }, []);

  const items = menu.filter(i =>
    i.available &&
    (cat === "All" || i.category === cat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) =>
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      return ex
        ? prev.map(c => c.id === item.id ? { ...c, qty: c.qty+1 } : c)
        : [...prev, { ...item, qty:1 }];
    });

  const cartCount = cart.reduce((s,c) => s+c.qty, 0);

  return (
    <div style={gs.page}>
      <HeroSlideshow menu={menu}/>

      {/* Info strip */}
      <div style={{
        background: `linear-gradient(90deg,${C.goldDark},${C.gold},${C.goldDark})`,
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-around",
        fontSize: 12, fontWeight:700, color:"#111",
      }}>
        <span>📍 Bremang, Kumasi</span>
        <span>📞 0243763138</span>
        <span>🛵 Delivery</span>
      </div>

      <div style={{ padding:"20px 20px 0" }}>
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:C.gold, marginBottom:14 }}>Our Menu</div>

        <input
          style={{ ...gs.input, marginBottom:14 }}
          placeholder="🔍  Search dishes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:12, scrollbarWidth:"none" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat===c ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : C.bgLight,
              color: cat===c ? "#111" : C.muted,
              border:"none", borderRadius:20, padding:"7px 16px",
              fontSize:13, fontWeight:600, cursor:"pointer",
              whiteSpace:"nowrap", flexShrink:0,
            }}>{c}</button>
          ))}
        </div>

        {items.length === 0
          ? <div style={{ textAlign:"center", color:C.muted, padding:"40px 0" }}>No dishes found</div>
          : items.map(item => <MenuCard key={item.id} item={item} onAdd={addToCart}/>)
        }
      </div>

      {cartCount > 0 && (
        <div style={{
          position:"fixed", bottom:76, left:"50%", transform:"translateX(-50%)",
          background:C.gold, color:"#111", borderRadius:24, padding:"10px 24px",
          fontWeight:700, fontSize:14, zIndex:150, whiteSpace:"nowrap",
          boxShadow:`0 4px 20px ${C.gold}66`,
        }}>
          🛒 {cartCount} item{cartCount>1?"s":""} in cart
        </div>
      )}
    </div>
  );
}

// ─── CART PAGE ───────────────────────────────────────────────────
function CartPage({ cart, setCart, onCheckout }) {
  const updQty = (id, d) =>
    setCart(prev => prev.map(c => c.id===id ? {...c,qty:c.qty+d} : c).filter(c=>c.qty>0));
  const subtotal = cart.reduce((s,c) => s+c.price*c.qty, 0);
  const delivery = 15;

  if (!cart.length) return (
    <div style={{ ...gs.page, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"70vh", padding:20 }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🛒</div>
      <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, color:C.gold, marginBottom:8 }}>Cart is empty</div>
      <div style={{ color:C.muted, fontSize:14 }}>Browse the menu and add some food!</div>
    </div>
  );

  return (
    <div style={gs.page}>
      <div style={{ padding:"20px 20px 0" }}>
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:C.gold, marginBottom:16 }}>Your Order</div>

        {cart.map(item => (
          <div key={item.id} style={{ ...gs.card, display:"flex", alignItems:"center", padding:14, gap:12, marginBottom:10 }}>
            <DishThumb item={item} size={56} radius={10}/>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:14 }}>{item.name}</div>
              <div style={{ color:C.gold, fontSize:13, fontWeight:700 }}>{fmtGHS(item.price)}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button onClick={()=>updQty(item.id,-1)} style={{ background:C.bgLight, border:"none", color:C.white, width:28, height:28, borderRadius:8, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
              <span style={{ fontWeight:700, minWidth:20, textAlign:"center" }}>{item.qty}</span>
              <button onClick={()=>updQty(item.id,+1)} style={{ background:C.gold, border:"none", color:"#111", width:28, height:28, borderRadius:8, cursor:"pointer", fontSize:16, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
            </div>
          </div>
        ))}

        <div style={{ ...gs.card, padding:16, marginTop:16, marginBottom:20 }}>
          {[["Subtotal",fmtGHS(subtotal)],["Delivery fee",fmtGHS(delivery)]].map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:8, color:C.muted, fontSize:14 }}>
              <span>{l}</span><span style={{ color:C.white }}>{v}</span>
            </div>
          ))}
          <div style={{ height:1, background:`${C.gold}33`, marginBottom:12 }}/>
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:800, fontSize:17 }}>
            <span>Total</span><span style={{ color:C.gold }}>{fmtGHS(subtotal+delivery)}</span>
          </div>
        </div>

        <button style={gs.goldBtn} onClick={onCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

// ─── CHECKOUT ────────────────────────────────────────────────────
function CheckoutPage({ cart, setCart, onOrderPlaced }) {
  const [form, setForm]     = useState({ name:"", phone:"", address:"", note:"" });
  const [paying, setPaying] = useState(false);
  const [errors, setErrors] = useState({});
  const total = cart.reduce((s,c)=>s+c.price*c.qty,0) + 15;

  const validate = () => {
    const e = {};
    if (!form.name.trim())                        e.name    = "Enter your name";
    if (!form.phone.trim()||form.phone.length<10) e.phone   = "Enter a valid phone number";
    if (!form.address.trim())                     e.address = "Enter your delivery address";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const saveOrder = (ref) => {
    const order = { id:ref, customer:form, items:cart, total, status:"Received", time:new Date().toISOString() };
    const prev  = JSON.parse(localStorage.getItem("dk_orders")||"[]");
    localStorage.setItem("dk_orders", JSON.stringify([order,...prev]));
    setCart([]);
    onOrderPlaced(order);
  };

  const handlePay = () => {
    if (!validate()) return;
    setPaying(true);
    const ref     = genRef();
    const handler = window.PaystackPop?.setup({
      key:      "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // 🔁 replace with live key
      email:    `${form.phone}@dkichin.com`,
      amount:   total * 100,
      currency: "GHS",
      ref,
      metadata: { custom_fields:[{ display_name:"Customer", value:form.name },{ display_name:"Address", value:form.address }] },
      callback: () => { setPaying(false); saveOrder(ref); },
      onClose:  () => setPaying(false),
    });
    if (handler) handler.openIframe();
    else setTimeout(() => { saveOrder("DEMO_"+Date.now()); setPaying(false); }, 1500);
  };

  const Field = ({ label, k, placeholder, multiline }) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:12, color:C.muted, fontWeight:600, display:"block", marginBottom:5 }}>{label}</label>
      {multiline
        ? <textarea style={{ ...gs.input, resize:"vertical", minHeight:72 }} placeholder={placeholder} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/>
        : <input    style={{ ...gs.input, borderColor:errors[k]?`${C.red}88`:`${C.gold}44` }}          placeholder={placeholder} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/>
      }
      {errors[k] && <div style={{ color:C.red, fontSize:11, marginTop:3 }}>{errors[k]}</div>}
    </div>
  );

  return (
    <div style={gs.page}>
      <div style={{ padding:"20px 20px 0" }}>
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:C.gold, marginBottom:20 }}>Delivery Details</div>
        <Field label="Full Name"                       k="name"    placeholder="Your name"/>
        <Field label="Phone (MoMo number)"             k="phone"   placeholder="024 XXX XXXX"/>
        <Field label="Delivery Address"                k="address" placeholder="Area, street, landmark..."/>
        <Field label="Special Instructions (optional)" k="note"    placeholder="E.g. no onions, call when nearby..." multiline/>
        <div style={{ ...gs.card, padding:14, marginBottom:20 }}>
          <div style={{ fontSize:12, color:C.muted, fontWeight:600, marginBottom:10 }}>ORDER SUMMARY</div>
          {cart.map(c=>(
            <div key={c.id} style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:5 }}>
              <span>{c.emoji} {c.name} × {c.qty}</span>
              <span style={{ color:C.gold }}>{fmtGHS(c.price*c.qty)}</span>
            </div>
          ))}
          <div style={{ height:1, background:`${C.gold}33`, margin:"10px 0" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:800 }}>
            <span>Total (incl. delivery)</span>
            <span style={{ color:C.gold }}>{fmtGHS(total)}</span>
          </div>
        </div>
        <button style={{ ...gs.goldBtn, opacity:paying?0.7:1 }} onClick={handlePay} disabled={paying}>
          {paying ? "Processing..." : `Pay ${fmtGHS(total)} via MoMo`}
        </button>
        <div style={{ textAlign:"center", fontSize:11, color:C.muted, marginTop:8 }}>
          🔒 Secured by Paystack · MTN MoMo, Vodafone Cash, AirtelTigo
        </div>
      </div>
    </div>
  );
}

// ─── TRACKING ────────────────────────────────────────────────────
function TrackingPage({ lastOrder }) {
  const [orders,   setOrders]   = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem("dk_orders")||"[]");
    setOrders(s);
    if (lastOrder) setSelected(lastOrder);
  },[lastOrder]);

  const si = s => ORDER_STATUSES.indexOf(s);

  const Detail = ({ order }) => (
    <div>
      <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", color:C.gold, cursor:"pointer", fontSize:13, marginBottom:16, padding:0 }}>← Back</button>
      <div style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:C.gold, marginBottom:4 }}>Order #{order.id}</div>
      <div style={{ fontSize:12, color:C.muted, marginBottom:20 }}>{new Date(order.time).toLocaleString()}</div>
      <div style={{ ...gs.card, padding:20, marginBottom:16 }}>
        {ORDER_STATUSES.map((s,i)=>{
          const cur=si(order.status), done=i<=cur, act=i===cur;
          return (
            <div key={s} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:28,height:28,borderRadius:"50%",background:done?C.gold:C.bgLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:done?"#111":C.muted,border:act?`2px solid ${C.goldLight}`:"none",flexShrink:0,transition:"background 0.3s" }}>
                  {done?"✓":i+1}
                </div>
                {i<ORDER_STATUSES.length-1 && <div style={{ width:2,height:28,background:done&&i<cur?C.gold:C.bgLight }}/>}
              </div>
              <div style={{ paddingTop:4, paddingBottom:i<ORDER_STATUSES.length-1?18:0 }}>
                <div style={{ fontSize:14,fontWeight:act?700:500,color:act?C.gold:done?C.white:C.muted }}>{s}</div>
                {act && <div style={{ fontSize:11,color:C.muted,marginTop:2 }}>
                  {s==="Received"&&"We got your order! 🎉"}
                  {s==="Preparing"&&"Chef is cooking 🍳"}
                  {s==="Out for Delivery"&&"On the way to you 🛵"}
                  {s==="Delivered"&&"Enjoy your meal! 😋"}
                </div>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ ...gs.card, padding:14 }}>
        <div style={{ fontSize:12,color:C.muted,fontWeight:600,marginBottom:10 }}>ITEMS ORDERED</div>
        {order.items.map(c=>(
          <div key={c.id} style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6 }}>
            <span>{c.emoji} {c.name} × {c.qty}</span>
            <span style={{ color:C.gold }}>{fmtGHS(c.price*c.qty)}</span>
          </div>
        ))}
        <div style={{ height:1,background:`${C.gold}33`,margin:"10px 0" }}/>
        <div style={{ display:"flex",justifyContent:"space-between",fontWeight:700 }}>
          <span>Total paid</span><span style={{ color:C.gold }}>{fmtGHS(order.total)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={gs.page}>
      <div style={{ padding:"20px 20px 0" }}>
        {selected ? <Detail order={selected}/> : (
          <>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:C.gold, marginBottom:16 }}>Your Orders</div>
            {!orders.length
              ? <div style={{ textAlign:"center",color:C.muted,padding:"60px 0" }}>
                  <div style={{ fontSize:48,marginBottom:12 }}>📋</div>
                  <div>No orders yet — place your first one!</div>
                </div>
              : orders.map(o=>(
                  <div key={o.id} style={{ ...gs.card,padding:14,marginBottom:12,cursor:"pointer" }} onClick={()=>setSelected(o)}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                      <span style={{ fontWeight:700,fontSize:14 }}>Order #{o.id}</span>
                      <span style={gs.badge(o.status==="Delivered"?C.green:o.status==="Out for Delivery"?C.gold:o.status==="Preparing"?C.yellow:C.bgLight)}>{o.status}</span>
                    </div>
                    <div style={{ fontSize:12,color:C.muted }}>{o.items.map(i=>i.name).join(", ")}</div>
                    <div style={{ fontSize:13,color:C.gold,fontWeight:700,marginTop:4 }}>{fmtGHS(o.total)}</div>
                  </div>
                ))
            }
          </>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ──────────────────────────────────────────────────
function AdminPage() {
  const [view,     setView]     = useState("orders");
  const [orders,   setOrders]   = useState([]);
  const [selOrder, setSelOrder] = useState(null);
  const [menu,     setMenu]     = useState(()=>{ const s=localStorage.getItem("dk_menu"); return s?JSON.parse(s):MENU_DEFAULT; });
  const [editItem, setEditItem] = useState(null);

  useEffect(()=>{
    const load=()=>setOrders(JSON.parse(localStorage.getItem("dk_orders")||"[]"));
    load(); const t=setInterval(load,3000); return ()=>clearInterval(t);
  },[]);

  const updStatus=(id,status)=>{
    const u=orders.map(o=>o.id===id?{...o,status}:o);
    setOrders(u); localStorage.setItem("dk_orders",JSON.stringify(u));
    if(selOrder?.id===id) setSelOrder(p=>({...p,status}));
  };
  const toggleItem=(id)=>{
    const u=menu.map(i=>i.id===id?{...i,available:!i.available}:i);
    setMenu(u); localStorage.setItem("dk_menu",JSON.stringify(u));
  };
  const saveItem=(item)=>{
    const u=item.id?menu.map(i=>i.id===item.id?item:i):[...menu,{...item,id:Date.now(),available:true,image:""}];
    setMenu(u); localStorage.setItem("dk_menu",JSON.stringify(u)); setEditItem(null);
  };

  const revenue = orders.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0);
  const pending  = orders.filter(o=>o.status!=="Delivered").length;

  // ── Orders sub-view ──
  const OrdersView = () => {
    if (selOrder) {
      const next=ORDER_STATUSES[ORDER_STATUSES.indexOf(selOrder.status)+1];
      return (
        <div>
          <button onClick={()=>setSelOrder(null)} style={{ background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:13,marginBottom:16,padding:0 }}>← Back</button>
          <div style={{ fontFamily:"'Playfair Display', serif",fontSize:18,color:C.gold,marginBottom:4 }}>Order #{selOrder.id}</div>
          <div style={{ fontSize:12,color:C.muted,marginBottom:16 }}>{new Date(selOrder.time).toLocaleString()}</div>
          <div style={{ ...gs.card,padding:14,marginBottom:12 }}>
            <div style={{ fontSize:12,color:C.muted,fontWeight:600,marginBottom:8 }}>CUSTOMER</div>
            <div style={{ fontWeight:600 }}>{selOrder.customer.name}</div>
            <div style={{ color:C.muted,fontSize:13 }}>{selOrder.customer.phone}</div>
            <div style={{ color:C.muted,fontSize:13 }}>{selOrder.customer.address}</div>
            {selOrder.customer.note&&<div style={{ color:C.yellow,fontSize:12,marginTop:4 }}>Note: {selOrder.customer.note}</div>}
          </div>
          <div style={{ ...gs.card,padding:14,marginBottom:12 }}>
            <div style={{ fontSize:12,color:C.muted,fontWeight:600,marginBottom:8 }}>ITEMS</div>
            {selOrder.items.map(c=>(
              <div key={c.id} style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5 }}>
                <span>{c.emoji} {c.name} × {c.qty}</span>
                <span style={{ color:C.gold }}>{fmtGHS(c.price*c.qty)}</span>
              </div>
            ))}
            <div style={{ height:1,background:`${C.gold}33`,margin:"8px 0" }}/>
            <div style={{ display:"flex",justifyContent:"space-between",fontWeight:700 }}>
              <span>Total</span><span style={{ color:C.gold }}>{fmtGHS(selOrder.total)}</span>
            </div>
          </div>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
            <span style={{ fontSize:13,color:C.muted }}>Status:</span>
            <span style={gs.badge(C.gold)}>{selOrder.status}</span>
          </div>
          {next
            ? <button style={gs.goldBtn} onClick={()=>updStatus(selOrder.id,next)}>Mark as: {next} →</button>
            : <div style={{ textAlign:"center",color:C.green,fontWeight:700,padding:12 }}>✓ Order Complete</div>
          }
        </div>
      );
    }
    const grouped={ Received:[],Preparing:[],"Out for Delivery":[],Delivered:[] };
    orders.forEach(o=>{ if(grouped[o.status]) grouped[o.status].push(o); });
    return (
      <div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20 }}>
          {[["Orders",orders.length,"📋"],["Pending",pending,"⏳"],["Revenue",fmtGHS(revenue),"💰"],["Done",orders.filter(o=>o.status==="Delivered").length,"✅"]].map(([l,v,e])=>(
            <div key={l} style={{ ...gs.card,padding:14,textAlign:"center" }}>
              <div style={{ fontSize:22 }}>{e}</div>
              <div style={{ fontWeight:800,fontSize:16,color:C.gold }}>{v}</div>
              <div style={{ fontSize:11,color:C.muted }}>{l}</div>
            </div>
          ))}
        </div>
        {Object.entries(grouped).filter(([,a])=>a.length).map(([status,arr])=>(
          <div key={status}>
            <div style={{ fontSize:12,color:C.muted,fontWeight:700,marginBottom:8,letterSpacing:1 }}>{status.toUpperCase()} ({arr.length})</div>
            {arr.map(o=>(
              <div key={o.id} style={{ ...gs.card,padding:12,marginBottom:8,cursor:"pointer",borderLeft:`3px solid ${C.gold}` }} onClick={()=>setSelOrder(o)}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
                  <span style={{ fontWeight:700,fontSize:14 }}>#{o.id}</span>
                  <span style={{ color:C.gold,fontWeight:700 }}>{fmtGHS(o.total)}</span>
                </div>
                <div style={{ fontSize:12,color:C.muted }}>{o.customer.name} · {o.customer.phone}</div>
                <div style={{ fontSize:11,color:C.muted }}>{o.items.map(i=>i.name).join(", ")}</div>
              </div>
            ))}
          </div>
        ))}
        {!orders.length&&<div style={{ textAlign:"center",color:C.muted,padding:"40px 0" }}><div style={{ fontSize:40 }}>📭</div><div style={{ marginTop:8 }}>No orders yet</div></div>}
      </div>
    );
  };

  // ── Menu sub-view with image upload ──
  const MenuView = () => {
    const blankForm = { name:"", category:"Mains", price:"", emoji:"🍽️", desc:"", image:"" };
    const [form, setForm] = useState(editItem || blankForm);
    const [imgErr, setImgErr] = useState(false);

    useEffect(() => { setImgErr(false); }, [form.image]);

    if (editItem !== null) {
      return (
        <div>
          <button onClick={()=>setEditItem(null)} style={{ background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:13,marginBottom:16,padding:0 }}>← Cancel</button>
          <div style={{ fontFamily:"'Playfair Display', serif",fontSize:18,color:C.gold,marginBottom:16 }}>{editItem.id?"Edit Dish":"Add New Dish"}</div>

          {/* Image preview / placeholder */}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12,color:C.muted,fontWeight:600,display:"block",marginBottom:6 }}>FOOD PHOTO</label>
            <div style={{
              width:"100%", height:180, borderRadius:14, overflow:"hidden",
              background:C.bgLight, border:`2px dashed ${C.gold}55`,
              display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", marginBottom:8,
            }}>
              {form.image && !imgErr ? (
                <img
                  src={form.image}
                  alt="preview"
                  onError={()=>setImgErr(true)}
                  style={{ width:"100%", height:"100%", objectFit:"cover" }}
                />
              ) : (
                <div style={{ textAlign:"center", color:C.muted }}>
                  <div style={{ fontSize:40, marginBottom:6 }}>📷</div>
                  <div style={{ fontSize:12 }}>Paste an image link below</div>
                  <div style={{ fontSize:11, marginTop:4, color:C.gold+"88" }}>
                    WhatsApp Web · Google Photos · Imgur
                  </div>
                </div>
              )}
            </div>
            <input
              style={gs.input}
              placeholder="https://... (paste image URL here)"
              value={form.image}
              onChange={e=>{ setForm(f=>({...f,image:e.target.value})); setImgErr(false); }}
            />
            {imgErr && <div style={{ color:C.red,fontSize:11,marginTop:3 }}>Image URL didn't load — try a different link</div>}
            <div style={{ fontSize:11,color:C.muted,marginTop:6,lineHeight:1.5 }}>
              💡 <strong style={{ color:C.white }}>How to get a link:</strong> Open WhatsApp Web → right-click the food photo → "Copy image address". Or upload to <span style={{ color:C.gold }}>imgur.com</span> free and copy the link.
            </div>
          </div>

          {/* Other fields */}
          {[["Dish Name","name","e.g. Banku & Tilapia"],["Emoji (fallback)","emoji","🍽️"],["Description","desc","Short description..."],["Price (GHS)","price","0.00"]].map(([l,k,p])=>(
            <div key={k} style={{ marginBottom:12 }}>
              <label style={{ fontSize:12,color:C.muted,display:"block",marginBottom:4 }}>{l}</label>
              <input style={gs.input} placeholder={p} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
            </div>
          ))}
          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:12,color:C.muted,display:"block",marginBottom:4 }}>Category</label>
            <select style={gs.input} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              {["Mains","Snacks","Sides","Drinks"].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button style={gs.goldBtn} onClick={()=>saveItem({...form,price:parseFloat(form.price)||0})}>
            {editItem.id?"Save Changes":"Add Dish"}
          </button>
        </div>
      );
    }

    return (
      <div>
        <button style={{ ...gs.goldBtn, marginBottom:16 }} onClick={()=>setEditItem(blankForm)}>
          + Add New Dish
        </button>
        {menu.map(item=>(
          <div key={item.id} style={{ ...gs.card,display:"flex",alignItems:"center",padding:12,marginBottom:10,gap:12 }}>
            {/* Thumbnail with photo or emoji */}
            <DishThumb item={item} size={56} radius={10}/>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600,fontSize:14,color:item.available?C.white:C.muted }}>{item.name}</div>
              <div style={{ color:C.gold,fontSize:13 }}>{fmtGHS(item.price)}</div>
              {item.image
                ? <div style={{ fontSize:10,color:C.green,marginTop:2 }}>✓ Photo added</div>
                : <div style={{ fontSize:10,color:C.muted,marginTop:2 }}>📷 No photo yet</div>
              }
            </div>
            <div style={{ display:"flex",gap:8 }}>
              <button onClick={()=>setEditItem(item)} style={{ background:C.bgLight,border:"none",color:C.white,padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:12 }}>Edit</button>
              <button onClick={()=>toggleItem(item.id)} style={{ background:item.available?`${C.green}33`:`${C.red}33`,border:"none",color:item.available?C.green:C.red,padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:12 }}>{item.available?"On":"Off"}</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── Sales sub-view ──
  const SalesView = () => {
    const done   = orders.filter(o=>o.status==="Delivered");
    const counts = {};
    done.forEach(o=>o.items.forEach(i=>{ counts[i.name]=(counts[i.name]||0)+i.qty; }));
    const top    = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
    return (
      <div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20 }}>
          {[["Revenue",fmtGHS(revenue),"💰"],["Completed",done.length,"✅"],["Avg Order",done.length?fmtGHS(revenue/done.length):"₵0.00","📈"],["Active",pending,"🔥"]].map(([l,v,e])=>(
            <div key={l} style={{ ...gs.card,padding:14,textAlign:"center" }}>
              <div style={{ fontSize:22 }}>{e}</div>
              <div style={{ fontWeight:800,fontSize:15,color:C.gold }}>{v}</div>
              <div style={{ fontSize:11,color:C.muted }}>{l}</div>
            </div>
          ))}
        </div>
        {top.length ? (
          <div style={{ ...gs.card,padding:14 }}>
            <div style={{ fontSize:12,color:C.muted,fontWeight:700,marginBottom:12,letterSpacing:1 }}>TOP SELLERS</div>
            {top.map(([name,qty],i)=>{
              const item=menu.find(m=>m.name===name);
              return (
                <div key={name} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                  <div style={{ width:22,height:22,borderRadius:"50%",background:C.gold,color:"#111",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center" }}>{i+1}</div>
                  {item && <DishThumb item={item} size={36} radius={8}/>}
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600,fontSize:14 }}>{name}</div>
                    <div style={{ fontSize:11,color:C.muted }}>{qty} sold</div>
                  </div>
                  <div style={{ color:C.gold,fontWeight:700 }}>{fmtGHS((item?.price||0)*qty)}</div>
                </div>
              );
            })}
          </div>
        ) : <div style={{ textAlign:"center",color:C.muted,padding:"30px 0" }}>Complete orders to see sales data</div>}
      </div>
    );
  };

  return (
    <div style={gs.page}>
      <div style={{ padding:"20px 20px 0" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
          <DKichinLogo size={28} showText={false}/>
          <span style={{ fontFamily:"'Playfair Display', serif",fontSize:22,fontWeight:700,color:C.gold }}>Admin Portal</span>
        </div>
        <div style={{ display:"flex",gap:8,marginBottom:20,overflowX:"auto" }}>
          {[["orders","📋 Orders"],["menu","🍽️ Menu"],["sales","📊 Sales"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{ background:view===v?C.gold:C.bgLight,color:view===v?"#111":C.muted,border:"none",borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap" }}>{l}</button>
          ))}
        </div>
        {view==="orders" && <OrdersView/>}
        {view==="menu"   && <MenuView/>}
        {view==="sales"  && <SalesView/>}
      </div>
    </div>
  );
}

// ─── SUCCESS PAGE ────────────────────────────────────────────────
function SuccessPage({ order, onTrack }) {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"90vh",padding:32,textAlign:"center",background:`radial-gradient(circle at 50% 30%,#2a1f0088,${C.bg})` }}>
      <DKichinLogo size={56} showText={true}/>
      <div style={{ fontSize:56,margin:"16px 0 8px" }}>🎉</div>
      <div style={{ fontFamily:"'Playfair Display', serif",fontSize:26,fontWeight:700,color:C.gold,marginBottom:8 }}>Order Placed!</div>
      <div style={{ color:C.muted,fontSize:13,marginBottom:4 }}>Order #{order.id}</div>
      <div style={{ color:C.white,fontSize:14,marginBottom:28 }}>Thank you, {order.customer.name}!<br/>We're cooking it up 🍳</div>
      <button style={gs.goldBtn} onClick={onTrack}>Track My Order</button>
      <div style={{ marginTop:16,fontSize:12,color:C.muted }}>Questions? <span style={{ color:C.gold }}>0243763138</span></div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────
export default function App() {
  const [tab,            setTab]            = useState("menu");
  const [cart,           setCart]           = useState([]);
  const [checkingOut,    setCheckingOut]    = useState(false);
  const [lastOrder,      setLastOrder]      = useState(null);
  const [showSuccess,    setShowSuccess]    = useState(false);
  const [isAdmin,        setIsAdmin]        = useState(false);
  const [adminCode,      setAdminCode]      = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const cartCount   = cart.reduce((s,c)=>s+c.qty,0);
  const onOrderDone = (order)=>{ setLastOrder(order); setShowSuccess(true); setCheckingOut(false); };

  const doLogin = () => {
    if (adminCode==="1234"){ setIsAdmin(true); setShowAdminLogin(false); setTab("admin"); } // 🔁 change code
    else alert("Wrong code");
  };

  if (showSuccess && lastOrder) return (
    <div style={gs.app}>
      <SuccessPage order={lastOrder} onTrack={()=>{ setShowSuccess(false); setTab("track"); }}/>
    </div>
  );

  return (
    <div style={gs.app}>
      <div style={gs.header}>
        <DKichinLogo size={30} showText={false}/>
        <div style={{ fontFamily:"'Playfair Display', serif",fontSize:16,fontWeight:700,color:C.gold }}>D" Kichin</div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          {isAdmin && <button onClick={()=>{ setIsAdmin(false); setTab("menu"); }} style={{ background:"none",border:`1px solid ${C.gold}44`,color:C.muted,borderRadius:8,padding:"4px 10px",fontSize:11,cursor:"pointer" }}>Exit</button>}
          <button onClick={()=>setShowAdminLogin(v=>!v)} style={{ background:"none",border:"none",fontSize:20,cursor:"pointer",lineHeight:1 }}>⚙️</button>
        </div>
      </div>

      {showAdminLogin && (
        <div style={{ background:C.bgCard,padding:16,borderBottom:`1px solid ${C.gold}33` }}>
          <div style={{ fontSize:12,color:C.muted,marginBottom:8,fontWeight:600 }}>ADMIN ACCESS</div>
          <div style={{ display:"flex",gap:8 }}>
            <input type="password" style={{ ...gs.input,flex:1 }} placeholder="Enter admin code" value={adminCode} onChange={e=>setAdminCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            <button onClick={doLogin} style={{ background:C.gold,border:"none",color:"#111",borderRadius:10,padding:"0 18px",fontWeight:800,cursor:"pointer",fontSize:16 }}>→</button>
          </div>
        </div>
      )}

      {checkingOut         ? <CheckoutPage cart={cart} setCart={setCart} onOrderPlaced={onOrderDone}/>
       : tab==="menu"      ? <MenuPage cart={cart} setCart={setCart}/>
       : tab==="cart"      ? <CartPage cart={cart} setCart={setCart} onCheckout={()=>setCheckingOut(true)}/>
       : tab==="track"     ? <TrackingPage lastOrder={lastOrder}/>
       : tab==="admin"&&isAdmin ? <AdminPage/>
       : <MenuPage cart={cart} setCart={setCart}/>}

      <div style={gs.bottomNav}>
        {[["menu","🍽️","Menu"],["cart",cartCount>0?`🛒${cartCount}`:"🛒","Cart"],["track","📍","Track"]].map(([id,icon,label])=>(
          <button key={id} style={gs.navBtn(tab===id&&!checkingOut)} onClick={()=>{ setCheckingOut(false); setTab(id); }}>
            <span style={{ fontSize:18 }}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
        {isAdmin && (
          <button style={gs.navBtn(tab==="admin")} onClick={()=>{ setCheckingOut(false); setTab("admin"); }}>
            <span style={{ fontSize:18 }}>🔧</span>
            <span>Admin</span>
          </button>
        )}
      </div>
    </div>
  );
}
