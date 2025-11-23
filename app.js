/**
 * app.js
 * ФІНАЛЬНА ВЕРСІЯ. Всі дані вбудовані для роботи без сервера.
 */

const ADMIN_CREDENTIALS = { email: 'smartotak80@gmail.com', password: 'tew3tew2' };

// --- ДАНІ ТОВАРІВ ---
const PRODUCTS_DATA = [
    { id: 1, brand: "John Deere", type: "tractor", model: "8R 410", price: 9500000, desc: "Флагманський трактор для великих господарств. Потужність 410 к.с. та інтелектуальна система управління. Кабіна преміум-класу та повна інтеграція з системами точного землеробства.", specs:[{"key": "Потужність", "value": "410 к.с."}, {"key": "Трансмісія", "value": "e23™ PowerShift"}, {"key": "Об'єм двигуна", "value": "9.0 л"}, {"key": "Гідравліка", "value": "227 л/хв"}], img:"https://tridaagro.com.ua/image/cache/catalog/easyphoto/4630/traktor-john-deere-8r-410-2022-15-1280x960.jpg" },
    { id: 2, brand: "New Holland", type: "combine", model: "CR10.90 Revelation", price: 18000000, desc: "Світовий рекордсмен зі збору врожаю. Мінімальні втрати зерна та максимальна швидкість. Покращена система очищення та найширший жниварний стіл.", specs:[{"key": "Тип", "value": "Двороторний"}, {"key": "Потужність", "value": "653 к.с."}, {"key": "Бункер", "value": "14500 л"}, {"key": "Система", "value": "IntelliSteer™"}], img:"https://tz-blog.gumlet.io/wp-content/uploads/2018/08/new-holland-cr1090-combine-harvester.jpg?q=75" },
    { id: 3, brand: "CASE", type: "tractor", model: "Magnum 340", price: 7200000, desc: "Надійний та універсальний трактор для будь-яких польових робіт. Економічний двигун та комфортна кабіна MultiControl.", specs:[{"key": "Потужність", "value": "340 к.с."}, {"key": "Двигун", "value": "8.7L FPT"}, {"key": "Вантажопідйомність", "value": "10 т"}, {"key": "Трансмісія", "value": "PowerShift™"}], img:"https://agsolco.com/content/images/7/480x480l50nn0/traktor_case_ih_magnum_340-84766989904973.jpg" },
    { id: 4, brand: "John Deere", type: "combine", model: "S780 Combine", price: 14500000, desc: "Роторний комбайн нового покоління. Ідеальний для зернових та кукурудзи. Покращена система автоматизації Harvest Smart.", specs:[{"key": "Ротор", "value": "Двопоточний"}, {"key": "Бункер", "value": "10.600 л"}, {"key": "Моніторинг", "value": "ActiveYield™"}, {"key": "Жатка", "value": "9.1 м"}], img:"https://static.tildacdn.biz/tild3437-3038-4261-b766-343562313532/John-Deere-S780-Germ.jpg" },
    { id: 5, brand: "New Holland", type: "tractor", model: "T7.270", price: 5800000, desc: "Універсальний трактор преміум-класу. Обладнаний трансмісією Auto Command™, забезпечує високий рівень комфорту та ефективності.", specs:[{"key": "Потужність", "value": "270 к.с."}, {"key": "Трансмісія", "value": "Auto Command™"}, {"key": "Кабіна", "value": "Horizon™"}, {"key": "ВОМ", "value": "540/1000"}], img:"https://www.truck1.eu/img/xxl/9429/New-Holland-T7-270-Auto-Command-Netherlands_9429_7228820906757.jpg" },
    { id: 6, brand: "CASE", type: "combine", model: "Axial-Flow 8250", price: 16800000, desc: "Роторний комбайн із великою потужністю та високою пропускною здатністю. Ідеальний для великих площ та різних культур.", specs:[{"key": "Ротор", "value": "AFX-8.8L"}, {"key": "Потужність", "value": "555 к.с."}, {"key": "Бункер", "value": "14.400 л"}, {"key": "Швидкість", "value": "до 40 км/год"}], img:"https://img.linemedia.com/img/s/grain-harvester-Case-IH-Axial-Flow-8250-STS---1745451000819783477_common--25042402300079605500.jpg" }
];

// --- ПОЧАТКОВІ ВІДГУКИ ---
const DEFAULT_REVIEWS = [
    { name: "Олександр П.", role: 'ФГ "Світанок", Київщина', text: "Купували John Deere 8R. Техніка приїхала вчасно, сервіс на висоті. Рекомендую!", rating: 5, date: "10.05.2024" },
    { name: "Ігор М.", role: 'Агрохолдинг "Поділля"', text: "Найкращі умови по лізингу, які ми знайшли. Працюємо вже 3 роки.", rating: 5, date: "22.08.2024" }
];

let allProducts = PRODUCTS_DATA; 


const elements = {
    grid: document.getElementById('productsGrid'),
    filterBrand: document.getElementById('filterBrand'),
    filterType: document.getElementById('filterType'),
    searchInput: document.getElementById('search'), 
    refreshBtn: document.getElementById('refreshBtn'),
    modal: document.getElementById('productModal'),
    modalDetail: document.getElementById('productDetail'),
    closeModal: document.getElementById('closeProductModal'),
    modalBackdrop: document.getElementById('modalBackdrop'),
};

// Функція форматування ціни
const formatPrice = (price) => {
    return price.toLocaleString('uk-UA', { 
        style: 'currency', 
        currency: 'UAH',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).replace('грн', '₴');
};

// 2. ФУНКЦІЯ СТВОРЕННЯ КАРТКИ ТОВАРУ
const createProductCard = (product) => {
    const card = document.createElement('div');
    
    let brandClass;
    if (product.brand === 'John Deere') {
        brandClass = 'brand-jd';
    } else if (product.brand === 'New Holland') {
        brandClass = 'brand-nh';
    } else if (product.brand === 'CASE') {
        brandClass = 'brand-case';
    }

    card.className = 'card product-card';
    card.setAttribute('data-scroll', 'fade-up');
    card.setAttribute('data-brand', product.brand);
    card.setAttribute('data-type', product.type);

    card.innerHTML = `
        <div class="card-img-wrap">
            <img src="${product.img}" alt="${product.brand} ${product.model}">
            <span class="badge ${brandClass}">${product.brand}</span>
        </div>
        <div class="card-body">
            <h4>${product.model}</h4>
            <div class="card-meta">${product.type === 'tractor' ? 'Трактор' : 'Комбайн'}</div>
            <p class="card-desc">${product.desc.substring(0, 80)}...</p>
            <div class="card-footer">
                <span class="price product-price">${formatPrice(product.price)}</span>
                <button class="btn btn-primary btn-sm view-details" data-id="${product.id}">Деталі</button>
            </div>
        </div>
    `;
    
    return card;
};

// 3. ФУНКЦІЯ ВІДМАЛЮВАННЯ КАТАЛОГУ
const renderProducts = (products) => {
    elements.grid.innerHTML = '';
    
    if (products.length === 0) {
        elements.grid.innerHTML = '<h3 style="grid-column:1/-1;text-align:center;margin-top:30px;color:#666;">Нічого не знайдено</h3>';
        return;
    }
    
    products.forEach(product => {
        elements.grid.appendChild(createProductCard(product));
    });
    attachEventListeners();
    initScrollReveal(); // Повторний виклик для нових елементів
};

// 4. ФУНКЦІЯ ФІЛЬТРАЦІЇ ТА ПОШУКУ
const filterAndRender = () => {
    const selectedBrand = elements.filterBrand.value;
    const selectedType = elements.filterType.value;
    const searchText = elements.searchInput.value.toLowerCase().trim(); 
    
    let filtered = PRODUCTS_DATA.filter(product => {
        const brandMatch = !selectedBrand || product.brand === selectedBrand;
        const typeMatch = !selectedType || product.type === selectedType;
        
        const searchMatch = !searchText || 
            product.model.toLowerCase().includes(searchText) || 
            product.desc.toLowerCase().includes(searchText) ||
            product.brand.toLowerCase().includes(searchText);
            
        return brandMatch && typeMatch && searchMatch;
    });

    renderProducts(filtered);
};

const refreshProducts = () => {
  document.getElementById('filterBrand').value = '';
  document.getElementById('filterType').value = '';
  elements.searchInput.value = ''; 
  filterAndRender();
};

// 5. ФУНКЦІЯ МОДАЛЬНОГО ВІКНА ТОВАРУ
const renderModalContent = (p) => {
  const specsHtml = p.specs.map(s => `<li><strong>${s.key}:</strong> ${s.value}</li>`).join('');
  let brandClass = '';
  if (p.brand === 'New Holland') brandClass = 'brand-nh';
  else if (p.brand === 'CASE') brandClass = 'brand-case';
  else if (p.brand === 'John Deere') brandClass = 'brand-jd';

  return `
    <div class="modal-content">
      <div class="modal-img-wrap"><img src="${p.img}" alt="${p.brand} ${p.model}"></div>
      <div class="product-details">
        <span class="type-badge ${brandClass}">${p.brand}</span>
        <h3>${p.model}</h3>
        <p class="desc">${p.desc}</p>
        
        <div class="specs-list"><h4>Характеристики</h4><ul>${specsHtml}</ul></div>
        
        <a href="#" class="btn btn-ghost full-width-btn" onclick="openContactPrefill(${p.id}); return false;">Замовити в лізинг</a>
      </div>
    </div>
    <div class="modal-footer"><span class="price">${formatPrice(p.price)}</span><button class="btn btn-primary" onclick="openContactPrefill(${p.id}); return false;">Купити</button></div>
  `;
}

const showProductModal = (id) => {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  
  document.getElementById('productDetail').innerHTML = renderModalContent(product);
  
  document.getElementById('productModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden'; 
};

// Універсальна функція для закриття модальних вікон
const closeModal = (id) => { 
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.add('hidden'); 
        document.body.style.overflow = ''; 
    }
};

const hideProductModal = () => {
    closeModal('productModal');
};

// Додана функція для перенаправлення до форми з автоматичним заповненням
function openContactPrefill(id) {
    const p = allProducts.find(product => product.id === id);
    hideProductModal();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    const msgArea = document.querySelector('textarea[name="message"]');
    if(msgArea) { msgArea.value = `Доброго дня! Цікавить модель ${p.brand} ${p.model}. Чи є в наявності та які умови лізингу?`; msgArea.focus(); }
}

function attachEventListeners() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.onclick = (e) => {
            e.preventDefault();
            const id = parseInt(button.dataset.id);
            showProductModal(id);
        };
    });
}

// --- ВІДГУКИ (ЛОГІКА) ---

function getReviews() {
    const saved = localStorage.getItem('site_reviews');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('site_reviews', JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
}

function renderReviews() {
    const reviews = getReviews();
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    grid.innerHTML = reviews.map(r => {
        const stars = "⭐".repeat(r.rating);
        return `
        <div class="review-card glass" data-scroll="fade-up">
            <div class="review-header">
                <span class="stars">${stars}</span>
                <span class="review-date">${r.date}</span>
            </div>
            <p class="quote">"${r.text}"</p>
            <div class="author">
                <strong>${r.name}</strong>
                <span>${r.role || 'Клієнт'}</span>
            </div>
        </div>
        `;
    }).join('');
    initScrollReveal(); // Повторний виклик для нових елементів
}

function handleReviewSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const author = form.querySelector('input[name="author"]').value.trim();
    const rating = parseInt(form.querySelector('select[name="rating"]').value);
    const text = form.querySelector('textarea[name="text"]').value.trim();
    const date = new Date().toLocaleDateString('uk-UA');

    const newReview = {
        name: author,
        role: "Новий клієнт",
        text: text,
        rating: rating,
        date: date
    };

    const reviews = getReviews();
    reviews.unshift(newReview); 
    localStorage.setItem('site_reviews', JSON.stringify(reviews));

    renderReviews();
    closeModal('reviewModal'); // Використовуємо універсальну функцію
    form.reset();
    alert("Дякуємо за ваш відгук! Він опублікований.");
}

// --- БАЗА ДАНИХ (АДМІН/ЗАМОВЛЕННЯ/ЧАТ) ---

function saveDataToLocalDB(formData) {
    const timestamp = new Date().toLocaleString('uk-UA');
    const email = formData.get('email') || localStorage.getItem('currentUserEmail') || 'unknown@mail.com';
    const name = formData.get('name') || 'Гість';
    const message = formData.get('message') || 'Повідомлення';

    // А) Замовлення
    const newOrder = { id: Date.now(), date: timestamp, name: name, contact: email, message: message, status: 'Нове' };
    const orders = JSON.parse(localStorage.getItem('site_orders')) || [];
    orders.unshift(newOrder);
    localStorage.setItem('site_orders', JSON.stringify(orders));

    // Б) Чат
    let chatDB = JSON.parse(localStorage.getItem('chat_db')) || {};
    if(!chatDB[email]) { chatDB[email] = { name: name, messages: [] }; }
    chatDB[email].messages.push({ sender: 'user', text: message, time: timestamp });
    localStorage.setItem('chat_db', JSON.stringify(chatDB));
}

// --- АДМІНКА & КАБІНЕТ (ЛОГІКА) ---

function renderUserOrders() {
    const tbody = document.getElementById('userOrdersTable');
    const email = localStorage.getItem('currentUserEmail');
    const orders = JSON.parse(localStorage.getItem('site_orders')) || [];
    const myOrders = orders.filter(o => o.contact === email);
    
    if(myOrders.length === 0) { tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:20px; color:#666">У вас немає активних заявок</td></tr>'; return; }
    tbody.innerHTML = myOrders.map(o => `<tr><td>${o.date}</td><td>${o.message}</td><td><span class="status-badge">${o.status}</span></td></tr>`).join('');
}

function renderUserChat() {
    const email = localStorage.getItem('currentUserEmail');
    const chatDB = JSON.parse(localStorage.getItem('chat_db')) || {};
    const userChat = chatDB[email];
    const area = document.getElementById('userChatMessages');
    
    if(!userChat || !userChat.messages.length) { area.innerHTML = '<div style="text-align:center;margin-top:40px;color:#666">Напишіть нам своє перше повідомлення...</div>'; return; }
    
    area.innerHTML = userChat.messages.map(m => `
        <div class="msg ${m.sender}">
            ${m.text}
            <div style="font-size:9px; opacity:0.5; margin-top:3px; text-align:right;">${m.time || new Date().toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'})}</div>
        </div>
    `).join('');
    area.scrollTop = area.scrollHeight; // Скролл донизу
}

document.getElementById('userChatForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('userMsgInput').value.trim();
    if(!text) return;
    const email = localStorage.getItem('currentUserEmail');
    let name = "Користувач";
    const u = JSON.parse(localStorage.getItem('user_'+email));
    if(u) name = u.name;

    const fd = new FormData(); fd.append('email', email); fd.append('name', name); fd.append('message', text);
    saveDataToLocalDB(fd);
    document.getElementById('userMsgInput').value = '';
    renderUserChat();
});

function renderAdminOrders() {
    const orders = JSON.parse(localStorage.getItem('site_orders')) || [];
    const tbody = document.getElementById('adminTableBody');
    const newOrdersCount = orders.filter(o => o.status === 'Нове').length;
    
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('newOrders').textContent = newOrdersCount; 
    document.getElementById('navCount').textContent = newOrdersCount; // Лічильник у навігації
    
    if(!orders.length) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Поки що немає замовлень 🚚</td></tr>'; return; }
    tbody.innerHTML = orders.map(o => `<tr><td>${o.date}</td><td><strong>${o.name}</strong></td><td>${o.contact}</td><td>${o.message.substring(0, 50)}...</td><td><span class="status-badge">${o.status}</span></td></tr>`).join('');
}

let currentChatEmail = null;
function renderAdminChatList() {
    const list = document.getElementById('chatUsersList');
    const chatDB = JSON.parse(localStorage.getItem('chat_db')) || {};
    const emails = Object.keys(chatDB);
    if(!emails.length) { list.innerHTML = '<div style="padding:15px;color:#666">Немає активних діалогів</div>'; return; }
    
    list.innerHTML = emails.map(e => {
        const u = chatDB[e];
        const msgs = u.messages || [];
        const lastMsg = msgs.length > 0 ? msgs[msgs.length-1].text : "Новий діалог";
        const act = e === currentChatEmail ? 'active' : '';
        return `<div class="user-item ${act}" onclick="openChat('${e}')"><h4>${u.name}</h4><p>${lastMsg}</p></div>`;
    }).join('');
}

window.openChat = function(email) {
    currentChatEmail = email;
    renderAdminChatList();
    const chatDB = JSON.parse(localStorage.getItem('chat_db'));
    const msgs = chatDB[email].messages || [];
    const area = document.getElementById('chatMessagesArea');
    document.getElementById('chatHeaderInfo').innerHTML = `Листування з: <span style="color:var(--accent)">${chatDB[email].name}</span>`;
    document.getElementById('adminReplyInput').disabled = false;
    document.querySelector('#adminChatForm .btn-send').disabled = false;

    area.innerHTML = msgs.map(m => `
        <div class="msg ${m.sender}">
            ${m.text}
            <div style="font-size:9px; opacity:0.5; margin-top:3px; text-align:right;">${m.time || new Date().toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'})}</div>
        </div>
    `).join('');
    area.scrollTop = area.scrollHeight; // Скролл донизу
}

document.getElementById('adminChatForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!currentChatEmail) return;
    const txt = document.getElementById('adminReplyInput').value.trim();
    if(!txt) return;
    
    let db = JSON.parse(localStorage.getItem('chat_db'));
    db[currentChatEmail].messages.push({sender:'admin', text:txt, time: new Date().toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'})});
    localStorage.setItem('chat_db', JSON.stringify(db));
    document.getElementById('adminReplyInput').value = '';
    openChat(currentChatEmail);
});

window.switchAdminTab = function(t) {
    document.querySelectorAll('#adminModal .nav-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('.admin-tab').forEach(x => x.classList.remove('active'));
    document.getElementById('tab-'+t).classList.add('active');
    if(t==='orders') renderAdminOrders();
    if(t==='chat') renderAdminChatList();
}
window.switchUserTab = function(t) {
    document.querySelectorAll('#userModal .nav-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('.user-tab').forEach(x => x.classList.remove('active'));
    document.getElementById('tab-'+t).classList.add('active');
    if(t==='my-orders') renderUserOrders();
    if(t==='support') renderUserChat();
}

window.clearAllOrders = function() {
    if(confirm('Увага! Видалити ВСІ дані (заявки та чати)? Відгуки та користувачі залишаться.')) {
        localStorage.removeItem('site_orders');
        localStorage.removeItem('chat_db');
        renderAdminOrders(); renderAdminChatList();
        document.getElementById('chatMessagesArea').innerHTML = '';
        currentChatEmail = null;
    }
}
window.adminLogout = function() { 
    localStorage.removeItem('isAdmin'); 
    location.reload(); 
}
window.userLogout = function() { 
    localStorage.removeItem('currentUserEmail'); 
    location.reload(); 
}

// 6. ФУНКЦІЯ SCROLL REVEAL (JS)
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add('animate'); 
                observer.unobserve(entry.target); 
            } 
        });
    }, { 
        threshold: 0.1 
    });

    document.querySelectorAll('[data-scroll], .product-card').forEach(el => {
        el.classList.remove('animate'); 
        observer.observe(el);
    });
}


// 7. ІНІЦІАЛІЗАЦІЯ
document.addEventListener('DOMContentLoaded', async () => {
  allProducts = PRODUCTS_DATA; 
  
  // Фільтри
  document.getElementById('filterBrand').addEventListener('change', filterAndRender);
  document.getElementById('filterType').addEventListener('change', filterAndRender);
  document.getElementById('refreshBtn').addEventListener('click', refreshProducts);
  document.getElementById('search').addEventListener('input', filterAndRender);

  // Логіка закриття модалок
  document.getElementById('closeProductModal').onclick = hideProductModal;
  document.getElementById('modalBackdrop').onclick = hideProductModal;
  document.getElementById('closeAuthModal').onclick = () => closeModal('authModal');
  document.getElementById('closeAuthModalBackdrop').onclick = () => closeModal('authModal');
  document.getElementById('closeAdminModal').onclick = () => closeModal('adminModal');
  document.getElementById('closeAdminBackdrop').onclick = () => closeModal('adminModal');
  document.getElementById('closeUserModal').onclick = () => closeModal('userModal');
  document.getElementById('closeUserBackdrop').onclick = () => closeModal('userModal');

  // Логіка відгуків
  const reviewModal = document.getElementById('reviewModal');
  const openReviewBtn = document.getElementById('openReviewBtn');
  
  if (openReviewBtn) {
    openReviewBtn.onclick = () => { reviewModal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; };
  }
  if (reviewModal) {
    document.getElementById('closeReviewModal').onclick = () => closeModal('reviewModal');
    document.getElementById('closeReviewBackdrop').onclick = () => closeModal('reviewModal');
    document.getElementById('reviewForm').addEventListener('submit', handleReviewSubmit);
  }
  
  // Логіка автентифікації
  const accBtn = document.getElementById('accBtn');
    accBtn.onclick = () => {
        if(localStorage.getItem('isAdmin') === 'true') { 
            document.getElementById('adminModal').classList.remove('hidden'); 
            renderAdminOrders(); 
            renderAdminChatList();
            return; 
        }
        const curEmail = localStorage.getItem('currentUserEmail');
        if(curEmail) { 
            document.getElementById('userModal').classList.remove('hidden'); 
            document.body.style.overflow = 'hidden';
            renderUserOrders(); 
            renderUserChat(); 
            return; 
        }
        document.getElementById('authModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };
    
    document.querySelectorAll('#authModal .auth-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#authModal .auth-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            document.querySelectorAll('#authModal .auth-form').forEach(f => f.classList.remove('active'));
            document.getElementById(e.target.dataset.tab + 'Form').classList.add('active');
        });
    });

    document.getElementById('loginForm').addEventListener('submit', (e)=>{
        e.preventDefault();
        const em = e.target.querySelector('input[name="email"]').value;
        const pass = e.target.querySelector('input[name="password"]').value;
        
        // Admin Login
        if(em===ADMIN_CREDENTIALS.email && pass===ADMIN_CREDENTIALS.password) {
            closeModal('authModal'); 
            localStorage.setItem('isAdmin', 'true'); 
            accBtn.textContent='👑 Адмін'; accBtn.classList.add('admin-logged'); accBtn.classList.remove('logged-in');
            accBtn.style.cssText="border-color:#FFD700;color:#000;background:#FFD700";
            alert("Успішний вхід! Ви увійшли як Super Admin."); 
            return;
        }
        
        // User Login
        const u = JSON.parse(localStorage.getItem('user_'+em));
        if(u && u.password===pass) {
            closeModal('authModal'); 
            localStorage.setItem('currentUserEmail', em);
            accBtn.textContent=`👤 ${u.name.substring(0, 10)}..`; accBtn.classList.add('logged-in'); accBtn.classList.remove('admin-logged');
            accBtn.style.cssText=""; 
            document.getElementById('userNameDisplay').textContent = u.name;
            alert("Успішний вхід!");
        } else { alert("Помилка входу: Невірний email або пароль."); }
    });

    document.getElementById('registerForm').addEventListener('submit', (e)=>{
        e.preventDefault();
        const n = e.target.querySelector('input[type="text"]').value.trim();
        const em = e.target.querySelector('input[type="email"]').value.trim();
        const p = e.target.querySelector('input[type="password"]').value;
        
        if(n.length < 3) { alert("Введіть коректне ім'я."); return; }
        if(localStorage.getItem('user_'+em) || em === ADMIN_CREDENTIALS.email) { alert("Користувач з таким email вже існує."); return; }
        
        localStorage.setItem('user_'+em, JSON.stringify({name:n, password:p}));
        alert("Реєстрація успішна! Тепер увійдіть.");
        document.querySelector('[data-tab="login"]').click();
        e.target.reset();
    });

    // Перевірка сесії при завантаженні
    const curEmail = localStorage.getItem('currentUserEmail');
    const isAdmin = localStorage.getItem('isAdmin');
    if(isAdmin === 'true') {
         accBtn.textContent='👑 Адмін'; accBtn.classList.add('admin-logged'); accBtn.style.cssText="border-color:#FFD700;color:#000;background:#FFD700";
    } else if(curEmail) {
        const u = JSON.parse(localStorage.getItem('user_'+curEmail));
        if(u) { accBtn.textContent=`👤 ${u.name.substring(0, 10)}..`; accBtn.classList.add('logged-in'); document.getElementById('userNameDisplay').textContent = u.name; }
    }


  // Contact Form handlers
  if(document.getElementById('contactForm')) document.getElementById('contactForm').addEventListener('submit', e => {
      e.preventDefault(); 
      const btn = e.target.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Відправка...';
      
      setTimeout(() => {
        saveDataToLocalDB(new FormData(e.target));
        btn.textContent = 'Успішно!';
        btn.style.background = '#00E676';
        document.getElementById('formResult').textContent = 'Менеджер зв\'яжеться з вами протягом 10 хвилин.';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = ''; // Reset
            document.getElementById('formResult').textContent = '';
            e.target.reset();
        }, 3000);
      }, 1000);
  });
  
  if(document.getElementById('subscribeForm')) document.getElementById('subscribeForm').addEventListener('submit', e => {
      e.preventDefault(); alert('Ви підписались!'); e.target.reset();
  });
  
  // Первинне відмальовування
  await filterAndRender(); 
  renderReviews();
  initScrollReveal();
});