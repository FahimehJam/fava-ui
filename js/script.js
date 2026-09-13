// ==========================================
// 1. توابع سایدبار (فقط با دکمه همبرگری)
// ==========================================
function toggleSidebar() {
    const layout = document.getElementById('appLayout');
    layout.classList.toggle('sidebar-open');
}

// ==========================================
// 2. جستجو + صفحه‌بندی اختصاصی پروژه‌ها
// ==========================================

// داده‌های اصلی پروژه‌ها از روی ردیف‌های جدول خوانده می‌شود
let projectRows = [];          // آرایه‌ای از HTML ردیف‌ها
let filteredProjectRows = [];  // ردیف‌های فیلترشده
let projectCurrentPage = 1;
const projectRowsPerPage = 2;  // تعداد ردیف در هر صفحه (قابل تغییر)

function initProjectPagination() {
    const tableBody = document.getElementById('projectTableBody');
    // ذخیره‌ی HTML تمام ردیف‌ها در ابتدای بارگذاری
    projectRows = Array.from(tableBody.querySelectorAll('tr')).map(tr => tr.outerHTML);
    filteredProjectRows = [...projectRows];
    renderProjectPage();
}

function renderProjectPage() {
    const tableBody = document.getElementById('projectTableBody');
    tableBody.innerHTML = '';

    const totalPages = Math.ceil(filteredProjectRows.length / projectRowsPerPage) || 1;
    if (projectCurrentPage > totalPages) projectCurrentPage = totalPages;

    const start = (projectCurrentPage - 1) * projectRowsPerPage;
    const end = Math.min(start + projectRowsPerPage, filteredProjectRows.length);

    for (let i = start; i < end; i++) {
        tableBody.insertAdjacentHTML('beforeend', filteredProjectRows[i]);
    }

    document.getElementById('projectCount').textContent = filteredProjectRows.length;

    // ساخت دکمه‌های صفحه‌بندی
    const paginationContainer = document.getElementById('projectPagination');
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let btnsHTML = `<button class="page-btn ${projectCurrentPage === 1 ? 'disabled' : ''}" onclick="changeProjectPage(-1)">قبلی</button>`;
    for (let i = 1; i <= totalPages; i++) {
        btnsHTML += `<button class="page-btn ${i === projectCurrentPage ? 'active' : ''}" onclick="goToProjectPage(${i})">${i}</button>`;
    }
    btnsHTML += `<button class="page-btn ${projectCurrentPage === totalPages ? 'disabled' : ''}" onclick="changeProjectPage(1)">بعدی</button>`;
    paginationContainer.innerHTML = btnsHTML;
}

function goToProjectPage(page) {
    const totalPages = Math.ceil(filteredProjectRows.length / projectRowsPerPage);
    if (page < 1 || page > totalPages) return;
    projectCurrentPage = page;
    renderProjectPage();
}

function changeProjectPage(delta) {
    goToProjectPage(projectCurrentPage + delta);
}

function filterProjects() {
    const input = document.getElementById('projectSearch');
    const filter = input.value.toLowerCase().trim();

    if (filter === '') {
        filteredProjectRows = [...projectRows];
    } else {
        filteredProjectRows = projectRows.filter(rowHTML => {
            // یک المان موقت برای جستجو در متن ردیف
            const temp = document.createElement('tbody');
            temp.innerHTML = rowHTML;
            const text = temp.textContent.toLowerCase();
            return text.includes(filter);
        });
    }

    projectCurrentPage = 1;
    renderProjectPage();
}

// ==========================================
// 3. سیستم دیتاتیبل داینامیک دفترچه تلفن
// ==========================================

const phonebookData = [
    { name: 'احمد رضایی', unit: 'ستاد دانشگاه', phone: '۱۲۳۴' },
    { name: 'سارا محمدی', unit: 'پشتیبانی شبکه', phone: '۵۶۷۸' },
    { name: 'مهرداد کریمی', unit: 'دانشکده فناوری اطلاعات', phone: '۹۰۱۲' },
    { name: 'فاطمه حسینی', unit: 'پشتیبانی سامانه‌ها', phone: '۳۴۵۶' },
    { name: 'کامران رستمی', unit: 'مدیریت شبکه', phone: '۷۸۹۰' },
    { name: 'ناهید ابراهیمی', unit: 'پورتال دانشجویی', phone: '۵۶۱۲' },
    { name: 'رضا مهدوی', unit: 'دانشکده پزشکی', phone: '۲۲۳۳' },
    { name: 'لیلا کریمی', unit: 'پشتیبانی نرم‌افزار', phone: '۴۴۵۵' },
    { name: 'حمید رضازاده', unit: 'آی‌تی مرکز', phone: '۶۶۷۷' },
    { name: 'زهرا احمدی', unit: 'اداری', phone: '۸۸۹۹' },
    { name: 'امیر حسینی', unit: 'دانشکده مهندسی', phone: '۱۱۲۲' },
    { name: 'مریم عباسی', unit: 'روابط عمومی', phone: '۳۳۴۴' }
];

let phonebookCurrentPage = 1;
const rowsPerPage = 4;
let filteredPhonebookData = [...phonebookData];

function renderPhonebook() {
    const tableBody = document.getElementById('phonebookBody');
    tableBody.innerHTML = '';

    const start = (phonebookCurrentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, filteredPhonebookData.length);
    const pageData = filteredPhonebookData.slice(start, end);

    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        const globalIndex = start + index + 1;
        row.innerHTML = `
        <td><span class="row-number">${globalIndex}</span></td>
        <td>${item.name}</td>
        <td>${item.unit}</td>
        <td>${item.phone}</td>
      `;
        tableBody.appendChild(row);
    });

    document.getElementById('phonebookCount').textContent = filteredPhonebookData.length;

    const totalPages = Math.ceil(filteredPhonebookData.length / rowsPerPage);
    const paginationContainer = document.getElementById('phonebookPagination');

    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    } else {
        paginationContainer.style.display = 'flex';
    }

    let btnsHTML = `<button class="page-btn ${phonebookCurrentPage === 1 ? 'disabled' : ''}" onclick="changePhonebookPage(-1)">قبلی</button>`;
    for (let i = 1; i <= totalPages; i++) {
        btnsHTML += `<button class="page-btn ${i === phonebookCurrentPage ? 'active' : ''}" onclick="goToPhonebookPage(${i})">${i}</button>`;
    }
    btnsHTML += `<button class="page-btn ${phonebookCurrentPage === totalPages ? 'disabled' : ''}" onclick="changePhonebookPage(1)">بعدی</button>`;
    paginationContainer.innerHTML = btnsHTML;
}

function goToPhonebookPage(page) {
    const totalPages = Math.ceil(filteredPhonebookData.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;
    phonebookCurrentPage = page;
    renderPhonebook();
}

function changePhonebookPage(delta) {
    goToPhonebookPage(phonebookCurrentPage + delta);
}

function filterPhonebook() {
    const input = document.getElementById('phonebookSearch');
    const filter = input.value.toLowerCase();

    filteredPhonebookData = phonebookData.filter(item => {
        return item.name.toLowerCase().includes(filter) ||
            item.unit.toLowerCase().includes(filter) ||
            item.phone.toLowerCase().includes(filter);
    });

    phonebookCurrentPage = 1;
    renderPhonebook();
}

// ==========================================
// 4. چارت دایره‌ای
// ==========================================
const ctx = document.getElementById('projectChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['تکمیل شده', 'در حال اجرا', 'در انتظار', 'متوقف'],
        datasets: [{
            data: [53, 25, 18, 11],
            backgroundColor: ['#03045e', '#0077b6', '#00b4d8', '#ef4444'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

// ==========================================
// 5. تولتیپ شناور برای نمودار بودجه
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // بارگذاری اولیه
    initProjectPagination();
    renderPhonebook();

    // ===== تولتیپ شناور =====
    const barRows = document.querySelectorAll('.budget-bar-row');

    barRows.forEach(row => {
        const tooltip = row.querySelector('.bar-tooltip');
        if (!tooltip) return;

        row.addEventListener('mouseenter', function(e) {
            tooltip.classList.add('visible');
            positionTooltip(tooltip, e);
        });

        row.addEventListener('mousemove', function(e) {
            positionTooltip(tooltip, e);
        });

        row.addEventListener('mouseleave', function() {
            tooltip.classList.remove('visible');
        });
    });

    function positionTooltip(tooltip, e) {
        const x = e.clientX + 15;
        const y = e.clientY - 15;

        const tooltipWidth = tooltip.offsetWidth || 200;
        const tooltipHeight = tooltip.offsetHeight || 45;

        let left = x;
        let top = y - tooltipHeight;

        if (left + tooltipWidth > window.innerWidth - 10) {
            left = e.clientX - tooltipWidth - 15;
        }
        if (left < 10) {
            left = 10;
        }
        if (top < 10) {
            top = e.clientY + 15;
        }
        if (top + tooltipHeight > window.innerHeight - 10) {
            top = window.innerHeight - tooltipHeight - 10;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
});

// ==========================================
// 6. آپلود و پیش‌نمایش عکس در فرم پرسنل
// ==========================================
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // پیدا کردن باکس آپلود عکس در صفحه current
            const uploadBox = document.getElementById('avatarUploadBox');
            if(uploadBox) {
                uploadBox.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; border-radius: var(--border-radius); object-fit: cover; border: 2px solid #0077b6;">`;
                uploadBox.style.border = "none";
            }
        }
        reader.readAsDataURL(file);
    }
}