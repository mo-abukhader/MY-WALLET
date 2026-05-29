/* ----------------------------------------------------
   محفظتي — My Wallet - Application Script
   Core State Management, Responsive SPA Controllers,
   RTL Calculations, Arabic Date Formatting, and Persistence.
------------------------------------------------------- */

// Define Default Categories
const DEFAULT_CATEGORIES = ['طعام', 'مواصلات', 'فواتير', 'راتب', 'تسوق', 'صحة', 'أخرى'];

// Currency Configurations & Localizations
const CURRENCY_CONFIG = {
    JOD: { ar: 'د.أ', en: 'JOD', localeAr: 'ar-JO', localeEn: 'en-JO' },
    EGP: { ar: 'ج.م', en: 'EGP', localeAr: 'ar-EG', localeEn: 'en-EG' },
    USD: { ar: '$', en: 'USD', localeAr: 'ar-US', localeEn: 'en-US' },
    SAR: { ar: 'ر.س', en: 'SAR', localeAr: 'ar-SA', localeEn: 'en-SA' },
    AED: { ar: 'د.إ', en: 'AED', localeAr: 'ar-AE', localeEn: 'en-AE' }
};

// -------------------------------------------------------
// i18n Translations Dictionary
// -------------------------------------------------------
const TRANSLATIONS = {
    ar: {
        settings_lang_title: 'اللغة / Language',
        settings_preferences_title: 'تفضيلات التطبيق (اللغة والعملة)',
        settings_currency_title: 'العملة / Currency',
        settings_wallets_title: 'تعديل أرصدة المحافظ',
        settings_sources_title: 'مصادر الدخل الإضافية',
        settings_sources_desc: 'أضف محافظ أو مصادر دخل إضافية غير الثلاثة الأساسية. اختيارية ويمكن حذفها في أي وقت.',
        settings_cats_title: 'إدارة التصنيفات المخصصة',
        settings_import_title: 'استيراد كشف حساب قديم',
        settings_import_desc: 'ارفع ملف نصي (.txt) يحتوي على معاملاتك القديمة.',
        settings_data_title: 'العمليات على البيانات',
        settings_data_desc: 'يمكنك نسخ كامل معاملاتك ومحافظك للاحتفاظ بنسخة احتياطية.',
        label_display_name: 'الاسم المعروض',
        label_init_balance: 'الرصيد الافتتاحي',
        label_current_balance: 'الرصيد الحالي',
        label_wallet: 'المحفظة',
        label_amount: 'المبلغ الفعلي',
        label_description: 'الوصف / البيان',
        label_category: 'التصنيف',
        label_date: 'التاريخ والوقت',
        label_start_date: 'تاريخ البدء',
        label_end_date: 'تاريخ الانتهاء',
        btn_save_wallets: 'حفظ تعديلات أرصدة المحافظ',
        btn_add_source: 'إضافة مصدر جديد',
        btn_add: 'إضافة',
        btn_import_file: 'اختر ملف .txt للاستيراد',
        btn_confirm_import: 'تأكيد الاستيراد',
        btn_cancel: 'إلغاء',
        btn_export_json: 'تصدير كملف JSON',
        btn_reset: 'تهيئة وتصفير الحسابات',
        import_preview_title: 'معاينة المعاملات المكتشفة',
        cat_placeholder: 'اسم التصنيف الجديد (مثال: قهوة)',
        desc_placeholder: 'مثال: شراء طعام، راتب مايو',
        amount_placeholder: '0.00',
        home_title: 'محفظتي',
        home_subtitle: 'إدارتك المالية الذكية',
        source_name_placeholder: 'اسم المصدر (مثال: بطاقة فيزا)',
        home_total_balance: 'إجمالي رصيد المحافظ',
        home_income: 'دخل الشهر',
        home_expense: 'مصروف الشهر',
        home_wallets_title: 'المحافظ الإلكترونية والبطاقات',
        home_budget_progress: 'استهلاك الميزانية هذا الشهر',
        home_recent_transactions: 'آخر المعاملات',
        home_view_all: 'عرض الكل',
        tab_home: 'الرئيسية',
        tab_transactions: 'المعاملات',
        tab_summary: 'الملخص',
        tab_comparison: 'المقارنة',
        tab_settings: 'الإعدادات',
        filter_title: 'تصفية المعاملات',
        filter_month: 'الشهر',
        opt_all_wallets: 'كل المحافظ',
        opt_all_types: 'كل العمليات',
        opt_income: 'دخل (وارد)',
        opt_expense: 'مصروف (صادر)',
        opt_all_categories: 'كل التصنيفات',
        btn_reset_filters: 'إعادة ضبط الفلاتر',
        ledger_title: 'سجل المعاملات المالي',
        modal_add_title: 'إضافة معاملة جديدة',
        btn_save_transaction: 'تأكيد وحفظ المعاملة',
        compare_title: 'المقارنة بين الفترات',
        compare_period_1: 'الفترة الأولى (الأحدث)',
        compare_period_2: 'الفترة الثانية (الأقدم)',
        compare_income: 'إجمالي الدخل',
        compare_expense: 'إجمالي المصروفات',
        compare_savings: 'صافي الفائض / العجز',
        compare_cats_breakdown: 'مقارنة المصروفات حسب التصنيف',
        btn_compare: 'مقارنة الفترتين',
        no_monthly_expenses: 'لا توجد أي مصروفات مسجلة لهذا الشهر.',
        label_type: 'النوع',
        empty_no_txs_title: 'لا توجد معاملات بعد',
        empty_no_txs_desc: 'اضغط على زر (+) بالأسفل لإضافة معاملتك المالية الأولى.',
        empty_no_results_title: 'لم يتم العثور على أي نتائج',
        empty_no_results_desc: 'جرّب تغيير فلاتر التصفية للبحث مجدداً في السجلات.'
    },
    en: {
        settings_lang_title: 'Language / اللغة',
        settings_preferences_title: 'App Preferences (Language & Currency)',
        settings_currency_title: 'Currency / العملة',
        settings_wallets_title: 'Edit Wallet Balances',
        settings_sources_title: 'Additional Income Sources',
        settings_sources_desc: 'Add custom wallets or income sources beyond the 3 main ones. Optional and deletable at any time.',
        settings_cats_title: 'Manage Custom Categories',
        settings_import_title: 'Import Old Statement',
        settings_import_desc: 'Upload a plain text (.txt) file with your old transactions.',
        settings_data_title: 'Data Operations',
        settings_data_desc: 'Export a full backup of your wallets and transactions, or reset everything.',
        label_display_name: 'Display Name',
        label_init_balance: 'Opening Balance',
        label_current_balance: 'Current Balance',
        label_wallet: 'Wallet',
        label_amount: 'Amount',
        label_description: 'Description',
        label_category: 'Category',
        label_date: 'Date & Time',
        label_start_date: 'Start Date',
        label_end_date: 'End Date',
        btn_save_wallets: 'Save Wallet Balances',
        btn_add_source: 'Add New Source',
        btn_add: 'Add',
        btn_import_file: 'Choose .txt File to Import',
        btn_confirm_import: 'Confirm Import',
        btn_cancel: 'Cancel',
        btn_export_json: 'Export as JSON',
        btn_reset: 'Reset & Clear All',
        import_preview_title: 'Preview Detected Transactions',
        cat_placeholder: 'New category name (e.g. Coffee)',
        desc_placeholder: 'e.g. Lunch, Monthly Salary',
        amount_placeholder: '0.00',
        home_title: 'My Wallet',
        home_subtitle: 'Smart Financial Manager',
        source_name_placeholder: 'Source name (e.g. Visa Card)',
        home_total_balance: 'Total Wallet Balance',
        home_income: 'Monthly Income',
        home_expense: 'Monthly Expense',
        home_wallets_title: 'Wallets & Cards',
        home_budget_progress: 'Budget Consumption This Month',
        home_recent_transactions: 'Recent Transactions',
        home_view_all: 'View All',
        tab_home: 'Home',
        tab_transactions: 'Transactions',
        tab_summary: 'Summary',
        tab_comparison: 'Comparison',
        tab_settings: 'Settings',
        filter_title: 'Filter Transactions',
        filter_month: 'Month',
        opt_all_wallets: 'All Wallets',
        opt_all_types: 'All Operations',
        opt_income: 'Income',
        opt_expense: 'Expense',
        opt_all_categories: 'All Categories',
        btn_reset_filters: 'Reset Filters',
        ledger_title: 'Transactions Ledger',
        modal_add_title: 'Add New Transaction',
        btn_save_transaction: 'Save Transaction',
        compare_title: 'Compare Periods',
        compare_period_1: 'Period 1 (Recent)',
        compare_period_2: 'Period 2 (Older)',
        compare_income: 'Total Income',
        compare_expense: 'Total Expenses',
        compare_savings: 'Net Savings',
        compare_cats_breakdown: 'Expense Comparison by Category',
        btn_compare: 'Compare Periods',
        no_monthly_expenses: 'No expenses recorded for this month.',
        label_type: 'Type',
        empty_no_txs_title: 'No transactions yet',
        empty_no_txs_desc: 'Press the (+) button below to add your first transaction.',
        empty_no_results_title: 'No results found',
        empty_no_results_desc: 'Try changing the filters to search the ledger again.'
    }
};

let currentLang = 'ar'; // default language

// Format amounts dynamically based on selected currency and language
function formatAmount(value) {
    const curr = (state && state.currency) ? state.currency : 'JOD';
    const config = CURRENCY_CONFIG[curr] || CURRENCY_CONFIG.JOD;
    const isAr = currentLang === 'ar';
    const locale = isAr ? config.localeAr : config.localeEn;
    const symbol = isAr ? config.ar : config.en;
    
    const formattedNum = parseFloat(value).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return isAr ? `${formattedNum} ${symbol}` : `${symbol} ${formattedNum}`;
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('mahfazati_lang', lang);
    const t = TRANSLATIONS[lang];
    const isEn = lang === 'en';

    // Apply direction
    document.documentElement.lang = lang;
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    // Translate all [data-i18n-placeholder] elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });

    // Update logo
    const logoText = document.querySelector('.logo-text');
    if (logoText) logoText.textContent = t.home_title;
    const subtitle = document.querySelector('.app-subtitle');
    if (subtitle) subtitle.textContent = t.home_subtitle;

    // Update language select value
    const langSelect = document.getElementById('set-lang-select');
    if (langSelect) langSelect.value = lang;
}

// Default initial state
const DEFAULT_STATE = {
    wallets: {
        cash: { name: 'كاش', initialBalance: 0 },
        bank: { name: 'البنك', initialBalance: 0 },
        ewallet: { name: 'محفظة إلكترونية', initialBalance: 0 }
    },
    transactions: [],
    customCategories: [],
    extraSources: [], // [{id, name, initialBalance}]
    currency: 'JOD' // Default currency is Jordanian Dinar
};

// Application State Object
let state = { ...DEFAULT_STATE };

// Active Navigation State
let activeScreen = 'screen-home';
let previousScreen = 'screen-home';
let currentSummaryYear = 2026;
let currentSummaryMonth = 5; // May (1-indexed: 1 = Jan, 12 = Dec)

// ----------------------------------------------------
// Mock Data Generator for First Load
// ----------------------------------------------------
function populateMockDataIfEmpty() {
    // Left empty by default so app starts clean with 0 transactions
}

// ----------------------------------------------------
// Local Storage Persistance Helpers
// ----------------------------------------------------
function saveStateToStorage() {
    localStorage.setItem('mahfazati_state', JSON.stringify(state));
}

function loadStateFromStorage() {
    const raw = localStorage.getItem('mahfazati_state');
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            // Deep merge to ensure structural integrity across updates
            state = {
                wallets: { ...DEFAULT_STATE.wallets, ...parsed.wallets },
                transactions: parsed.transactions || [],
                customCategories: parsed.customCategories || [],
                extraSources: parsed.extraSources || [],
                currency: parsed.currency || 'JOD'
            };
        } catch (e) {
            console.error('Error parsing LocalStorage state:', e);
            state = { ...DEFAULT_STATE };
        }
    } else {
        state = { ...DEFAULT_STATE };
    }
    // Load language preference
    const savedLang = localStorage.getItem('mahfazati_lang') || 'ar';
    currentLang = savedLang;
}

// ----------------------------------------------------
// UI Calculations and Helpers
// ----------------------------------------------------

// Calculate dynamic wallet balances (core + extra sources)
function computeWalletBalances() {
    const balances = {
        cash: state.wallets.cash.initialBalance,
        bank: state.wallets.bank.initialBalance,
        ewallet: state.wallets.ewallet.initialBalance
    };

    // Add extra sources starting balances
    (state.extraSources || []).forEach(src => {
        balances[src.id] = src.initialBalance || 0;
    });

    state.transactions.forEach(t => {
        const amt = parseFloat(t.amount);
        if (!(t.wallet in balances)) balances[t.wallet] = 0;
        if (t.type === 'income') {
            balances[t.wallet] += amt;
        } else {
            balances[t.wallet] -= amt;
        }
    });

    return balances;
}

// Language-Aware Month Formatter
function formatMonth(year, month) {
    const monthsAr = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const monthsEn = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    if (currentLang === 'ar') {
        return `${monthsAr[month - 1]} ${year}`;
    } else {
        return `${monthsEn[month - 1]} ${year}`;
    }
}

// Language-Aware Date Formatter
function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    
    const monthsAr = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const monthsEn = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (currentLang === 'ar') {
        return `${day} ${monthsAr[month - 1]} ${year}`;
    } else {
        return `${monthsEn[month - 1]} ${day}, ${year}`;
    }
}

// ----------------------------------------------------
// UI Renderers & Refreshers
// ----------------------------------------------------

function refreshAllScreens() {
    const balances = computeWalletBalances();
    const totalBalance = Object.values(balances).reduce((a, b) => a + b, 0);

    // 1. Update Display Names globally
    document.getElementById('wallet-name-cash-disp').textContent = state.wallets.cash.name;
    document.getElementById('wallet-name-bank-disp').textContent = state.wallets.bank.name;
    document.getElementById('wallet-name-ewallet-disp').textContent = state.wallets.ewallet.name;

    document.getElementById('opt-filter-cash').textContent = state.wallets.cash.name;
    document.getElementById('opt-filter-bank').textContent = state.wallets.bank.name;
    document.getElementById('opt-filter-ewallet').textContent = state.wallets.ewallet.name;

    document.getElementById('opt-form-cash').textContent = state.wallets.cash.name;
    document.getElementById('opt-form-bank').textContent = state.wallets.bank.name;
    document.getElementById('opt-form-ewallet').textContent = state.wallets.ewallet.name;

    // Sync extra sources options in form and filter selects
    const transWalletSel = document.getElementById('trans-wallet');
    const filterWalletSel = document.getElementById('filter-wallet');

    // Remove old extra source options
    transWalletSel.querySelectorAll('.extra-source-opt').forEach(o => o.remove());
    filterWalletSel.querySelectorAll('.extra-source-opt').forEach(o => o.remove());

    (state.extraSources || []).forEach(src => {
        const o1 = document.createElement('option');
        o1.value = src.id;
        o1.textContent = src.name;
        o1.className = 'extra-source-opt';
        transWalletSel.appendChild(o1);

        const o2 = document.createElement('option');
        o2.value = src.id;
        o2.textContent = src.name;
        o2.className = 'extra-source-opt';
        filterWalletSel.appendChild(o2);
    });

    // 2. Update Dashboard Balances
    document.getElementById('total-balance-value').innerHTML = formatAmount(totalBalance);
    
    // Balance cards
    document.getElementById('wallet-bal-cash-disp').textContent = formatAmount(balances.cash);
    document.getElementById('wallet-bal-bank-disp').textContent = formatAmount(balances.bank);
    document.getElementById('wallet-bal-ewallet-disp').textContent = formatAmount(balances.ewallet);

    // Sync modal currency symbol
    const modalCurrencySymbol = document.getElementById('trans-currency-symbol');
    if (modalCurrencySymbol) {
        const curr = state.currency || 'JOD';
        const config = CURRENCY_CONFIG[curr] || CURRENCY_CONFIG.JOD;
        modalCurrencySymbol.textContent = currentLang === 'ar' ? config.ar : config.en;
    }

    // 3. Compute Quick Snapshot stats for CURRENT MONTH
    const now = new Date();
    const currYear = now.getFullYear();
    const currMonth = now.getMonth() + 1; // 1-indexed

    let thisMonthIncome = 0;
    let thisMonthExpense = 0;

    state.transactions.forEach(t => {
        const tDate = new Date(t.date);
        const tYear = tDate.getFullYear();
        const tMonth = tDate.getMonth() + 1;

        if (tYear === currYear && tMonth === currMonth) {
            if (t.type === 'income') {
                thisMonthIncome += parseFloat(t.amount);
            } else {
                thisMonthExpense += parseFloat(t.amount);
            }
        }
    });

    document.getElementById('quick-income-value').textContent = `+${formatAmount(thisMonthIncome)}`;
    document.getElementById('quick-expense-value').textContent = `-${formatAmount(thisMonthExpense)}`;

    // Calculate budget progress indicators
    const progressFill = document.getElementById('budget-progress-fill');
    const progressPercentage = document.getElementById('budget-progress-percentage');
    if (thisMonthIncome > 0) {
        const pct = Math.min(Math.round((thisMonthExpense / thisMonthIncome) * 100), 100);
        progressFill.style.width = `${pct}%`;
        progressPercentage.textContent = `${pct}%`;
        
        // Color transition depending on status
        if (pct >= 90) {
            progressFill.style.background = 'var(--color-expense)';
        } else if (pct >= 70) {
            progressFill.style.background = 'var(--color-accent)';
        } else {
            progressFill.style.background = 'var(--color-income)';
        }
    } else {
        progressFill.style.width = thisMonthExpense > 0 ? '100%' : '0%';
        progressPercentage.textContent = thisMonthExpense > 0 ? '100% (تجاوز)' : '0%';
        progressFill.style.background = thisMonthExpense > 0 ? 'var(--color-expense)' : 'var(--color-income)';
    }

    // 4. Populate Dropdowns (Forms & Filters)
    populateCategoryDropdowns();

    // 5. Populate Active Screen Specific Items
    renderActiveScreenContent();
}

// Populate standard categories + custom categories into all HTML selectors
function populateCategoryDropdowns() {
    const allCategories = [...DEFAULT_CATEGORIES, ...state.customCategories];
    
    // Trans form category select
    const transSelect = document.getElementById('trans-category');
    const selectedVal = transSelect.value;
    transSelect.innerHTML = '';
    allCategories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        transSelect.appendChild(opt);
    });
    if (selectedVal && allCategories.includes(selectedVal)) {
        transSelect.value = selectedVal;
    }

    // Ledger filter selector
    const filterSelect = document.getElementById('filter-category');
    const selectedFilterVal = filterSelect.value || 'all';
    const allText = currentLang === 'ar' ? 'كل التصنيفات' : 'All Categories';
    filterSelect.innerHTML = `<option value="all">${allText}</option>`;
    allCategories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        filterSelect.appendChild(opt);
    });
    if (allCategories.includes(selectedFilterVal)) {
        filterSelect.value = selectedFilterVal;
    }
}

// ----------------------------------------------------
// Specific Screen Render Handlers
// ----------------------------------------------------
function renderActiveScreenContent() {
    if (activeScreen === 'screen-home') {
        renderHomeScreen();
    } else if (activeScreen === 'screen-transactions') {
        renderTransactionsScreen();
    } else if (activeScreen === 'screen-summary') {
        renderSummaryScreen();
    } else if (activeScreen === 'screen-comparison') {
        renderComparisonScreen();
    } else if (activeScreen === 'screen-settings') {
        renderSettingsScreen();
    }
}

// HTML Generator helper for transaction items
function generateTransactionItemHtml(t) {
    const isIncome = t.type === 'income';
    const classType = isIncome ? 'income' : 'expense';
    const prefixSign = isIncome ? '+' : '-';
    
    // Choose nice letter emoji or initial text indicator
    const initialText = t.category ? t.category.charAt(0) : 'م';
    
    const walletName = state.wallets[t.wallet]
        ? state.wallets[t.wallet].name
        : (state.extraSources || []).find(s => s.id === t.wallet)?.name || t.wallet;

    return `
        <div class="trans-item ${classType}" data-id="${t.id}">
            <div class="trans-right">
                <div class="trans-cat-icon">${initialText}</div>
                <div class="trans-details">
                    <span class="trans-desc">${t.description}</span>
                    <div class="trans-meta-row">
                        <span>${formatDate(t.date)}</span>
                        <span>•</span>
                        <span>${t.category}</span>
                        <span class="trans-badge-wallet ${t.wallet}">${walletName}</span>
                    </div>
                </div>
            </div>
            <div class="trans-left">
                <span class="trans-amount-text">${prefixSign}${formatAmount(t.amount)}</span>
                <button class="delete-inline-btn" onclick="handleDeleteTransaction('${t.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="delete-btn-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// Screen 1: Home Dashboard
function renderHomeScreen() {
    const listContainer = document.getElementById('home-transactions-list');
    
    // Sort transactions by date descending, limit to last 10
    const sorted = [...state.transactions].sort((a,b) => new Date(b.date) - new Date(a.date));
    const last10 = sorted.slice(0, 10);

    if (last10.length === 0) {
        const t = TRANSLATIONS[currentLang];
        listContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="empty-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <h3 class="empty-title">${t.empty_no_txs_title}</h3>
                <p class="empty-desc">${t.empty_no_txs_desc}</p>
            </div>
        `;
    } else {
        listContainer.innerHTML = last10.map(t => generateTransactionItemHtml(t)).join('');
    }
}

// Screen 2: Transactions Ledger
function renderTransactionsScreen() {
    const listContainer = document.getElementById('ledger-transactions-list');
    
    // Capture filter variables
    const filterWallet = document.getElementById('filter-wallet').value;
    const filterType = document.getElementById('filter-type').value;
    const filterCategory = document.getElementById('filter-category').value;
    const filterStartDate = document.getElementById('filter-start-date').value; // Formatted "YYYY-MM-DD"
    const filterEndDate = document.getElementById('filter-end-date').value; // Formatted "YYYY-MM-DD"

    // Filtering logic
    const filtered = state.transactions.filter(t => {
        // Wallet check
        if (filterWallet !== 'all' && t.wallet !== filterWallet) return false;
        
        // Type check
        if (filterType !== 'all' && t.type !== filterType) return false;
        
        // Category check
        if (filterCategory !== 'all' && t.category !== filterCategory) return false;
        
        // Date range checks
        if (filterStartDate && t.date < filterStartDate) return false;
        if (filterEndDate && t.date > filterEndDate) return false;

        return true;
    });

    // Sort newest first
    const sorted = filtered.sort((a,b) => new Date(b.date) - new Date(a.date));

    // Update dynamic counter badge
    document.getElementById('transaction-count').textContent = `${sorted.length} معاملة`;

    if (sorted.length === 0) {
        const t = TRANSLATIONS[currentLang];
        listContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="empty-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <h3 class="empty-title">${t.empty_no_results_title}</h3>
                <p class="empty-desc">${t.empty_no_results_desc}</p>
            </div>
        `;
    } else {
        listContainer.innerHTML = sorted.map(t => generateTransactionItemHtml(t)).join('');
    }
}

// Screen 3: Monthly Breakdown & Summaries
function renderSummaryScreen() {
    // Render current navigation label
    document.getElementById('summary-month-label').textContent = formatMonth(currentSummaryYear, currentSummaryMonth);

    // Dynamic math metrics
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals = {};

    state.transactions.forEach(t => {
        const tDate = new Date(t.date);
        const tYear = tDate.getFullYear();
        const tMonth = tDate.getMonth() + 1; // 1-indexed

        if (tYear === currentSummaryYear && tMonth === currentSummaryMonth) {
            const amt = parseFloat(t.amount);
            if (t.type === 'income') {
                totalIncome += amt;
            } else {
                totalExpense += amt;
                
                // Track category breakdown
                if (!categoryTotals[t.category]) {
                    categoryTotals[t.category] = 0;
                }
                categoryTotals[t.category] += amt;
            }
        }
    });

    const netBalance = totalIncome - totalExpense;

    // Render metrics values
    document.getElementById('summary-income-value').textContent = `+${formatAmount(totalIncome)}`;
    document.getElementById('summary-expense-value').textContent = `-${formatAmount(totalExpense)}`;
    
    // Render Net balance status card
    const netValueContainer = document.getElementById('summary-net-value');
    const netCardContainer = document.getElementById('summary-net-container');
    const netIndicatorIcon = document.getElementById('summary-net-indicator');

    netValueContainer.textContent = `${netBalance >= 0 ? '+' : ''}${formatAmount(netBalance)}`;

    if (netBalance >= 0) {
        netCardContainer.className = 'net-balance-card surplus';
        netIndicatorIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="net-indicator-svg text-green">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
            </svg>
        `;
    } else {
        netCardContainer.className = 'net-balance-card deficit';
        netIndicatorIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="net-indicator-svg text-red">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l-5.94 2.28m5.94-2.28l-2.28-5.941" />
            </svg>
        `;
    }

    // Render Category item breakdown
    const breakdownList = document.getElementById('category-breakdown-list');
    
    const sortedCategories = Object.keys(categoryTotals).map(cat => {
        return {
            name: cat,
            amount: categoryTotals[cat],
            percentage: totalExpense > 0 ? Math.round((categoryTotals[cat] / totalExpense) * 100) : 0
        };
    }).sort((a,b) => b.amount - a.amount);

    if (sortedCategories.length === 0) {
        const t = TRANSLATIONS[currentLang];
        breakdownList.innerHTML = `
            <div class="empty-state" style="border:none; background:transparent; padding: 20px 0;">
                <p class="empty-desc" data-i18n="no_monthly_expenses">${t.no_monthly_expenses}</p>
            </div>
        `;
    } else {
        breakdownList.innerHTML = sortedCategories.map(cat => `
            <div class="breakdown-item">
                <div class="breakdown-item-header">
                    <span class="breakdown-item-name">${cat.name}</span>
                    <div class="breakdown-item-stats">
                        <span class="breakdown-item-percentage">${cat.percentage}%</span>
                        <span class="breakdown-item-amount">${formatAmount(cat.amount)}</span>
                    </div>
                </div>
                <div class="breakdown-bar-container">
                    <div class="breakdown-bar-fill" style="width: ${cat.percentage}%"></div>
                </div>
            </div>
        `).join('');
    }
}

// Screen 5: Comparison Screen
function renderComparisonScreen() {
    // 1. Initial date defaults for comparison if not set yet
    const p1StartInput = document.getElementById('compare-p1-start');
    const p1EndInput = document.getElementById('compare-p1-end');
    const p2StartInput = document.getElementById('compare-p2-start');
    const p2EndInput = document.getElementById('compare-p2-end');

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // Default Period 1: Last 30 days
    if (!p1StartInput.value || !p1EndInput.value) {
        const p1Start = new Date();
        p1Start.setDate(today.getDate() - 30);
        p1StartInput.value = p1Start.toISOString().slice(0, 10);
        p1EndInput.value = todayStr;
    }

    // Default Period 2: 30 days before that
    if (!p2StartInput.value || !p2EndInput.value) {
        const p2Start = new Date();
        p2Start.setDate(today.getDate() - 60);
        const p2End = new Date();
        p2End.setDate(today.getDate() - 31);
        p2StartInput.value = p2Start.toISOString().slice(0, 10);
        p2EndInput.value = p2End.toISOString().slice(0, 10);
    }

    const p1StartVal = p1StartInput.value;
    const p1EndVal = p1EndInput.value;
    const p2StartVal = p2StartInput.value;
    const p2EndVal = p2EndInput.value;

    // 2. Perform comparison math
    let p1Income = 0, p1Expense = 0;
    let p2Income = 0, p2Expense = 0;

    const p1CatTotals = {};
    const p2CatTotals = {};

    state.transactions.forEach(t => {
        const amt = parseFloat(t.amount);
        if (t.date >= p1StartVal && t.date <= p1EndVal) {
            if (t.type === 'income') {
                p1Income += amt;
            } else {
                p1Expense += amt;
                p1CatTotals[t.category] = (p1CatTotals[t.category] || 0) + amt;
            }
        }
        if (t.date >= p2StartVal && t.date <= p2EndVal) {
            if (t.type === 'income') {
                p2Income += amt;
            } else {
                p2Expense += amt;
                p2CatTotals[t.category] = (p2CatTotals[t.category] || 0) + amt;
            }
        }
    });

    const p1Net = p1Income - p1Expense;
    const p2Net = p2Income - p2Expense;

    // 3. Render Metric Values
    document.getElementById('compare-p1-income').textContent = formatAmount(p1Income);
    document.getElementById('compare-p2-income').textContent = formatAmount(p2Income);

    document.getElementById('compare-p1-expense').textContent = formatAmount(p1Expense);
    document.getElementById('compare-p2-expense').textContent = formatAmount(p2Expense);

    document.getElementById('compare-p1-net').textContent = formatAmount(p1Net);
    document.getElementById('compare-p2-net').textContent = formatAmount(p2Net);

    // 4. Helper to calculate percentage change and render badge
    const renderChangeBadge = (badgeId, p1Val, p2Val, isExpense = false) => {
        const badge = document.getElementById(badgeId);
        if (p2Val === 0) {
            if (p1Val === 0) {
                badge.textContent = '0%';
                badge.className = 'compare-change-badge neutral';
            } else {
                badge.textContent = '+100%';
                badge.className = isExpense ? 'compare-change-badge negative' : 'compare-change-badge positive';
            }
            return;
        }

        const pct = Math.round(((p1Val - p2Val) / p2Val) * 100);
        const sign = pct >= 0 ? '+' : '';
        badge.textContent = `${sign}${pct}%`;

        if (pct === 0) {
            badge.className = 'compare-change-badge neutral';
        } else if (pct > 0) {
            badge.className = isExpense ? 'compare-change-badge negative' : 'compare-change-badge positive';
        } else {
            badge.className = isExpense ? 'compare-change-badge positive' : 'compare-change-badge negative';
        }
    };

    renderChangeBadge('compare-income-badge', p1Income, p2Income, false);
    renderChangeBadge('compare-expense-badge', p1Expense, p2Expense, true);
    renderChangeBadge('compare-net-badge', p1Net, p2Net, false);

    // 5. Render Category Comparative Breakdown
    const catList = document.getElementById('compare-categories-list');
    const allCats = Array.from(new Set([...Object.keys(p1CatTotals), ...Object.keys(p2CatTotals)]));

    if (allCats.length === 0) {
        catList.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">${currentLang === 'ar' ? 'لا توجد مصاريف للمقارنة بين الفترتين.' : 'No expenses to compare.'}</span>`;
    } else {
        const maxExpense = Math.max(...allCats.map(c => Math.max(p1CatTotals[c] || 0, p2CatTotals[c] || 0)), 1);

        catList.innerHTML = allCats.map(cat => {
            const val1 = p1CatTotals[cat] || 0;
            const val2 = p2CatTotals[cat] || 0;
            const pct1 = Math.round((val1 / maxExpense) * 100);
            const pct2 = Math.round((val2 / maxExpense) * 100);

            let diffText = '0%';
            let diffClass = 'neutral';
            if (val2 > 0) {
                const diffPct = Math.round(((val1 - val2) / val2) * 100);
                diffText = `${diffPct >= 0 ? '+' : ''}${diffPct}%`;
                diffClass = diffPct > 0 ? 'text-red' : (diffPct < 0 ? 'text-green' : 'neutral');
            } else if (val1 > 0) {
                diffText = '+100%';
                diffClass = 'text-red';
            }

            return `
                <div class="breakdown-item">
                    <div class="breakdown-item-header">
                        <span class="breakdown-item-name">${cat} <span class="compare-vs ${diffClass}">(${diffText})</span></span>
                        <div class="breakdown-item-stats">
                            <span class="breakdown-item-amount" style="font-size: 11px;">
                                ${formatAmount(val1)} <span class="compare-vs">vs</span> ${formatAmount(val2)}
                            </span>
                        </div>
                    </div>
                    <div class="compare-bar-group">
                        <div class="compare-bar-container">
                            <div class="compare-bar-fill-p1" style="width: ${pct1}%"></div>
                        </div>
                        <div class="compare-bar-container">
                            <div class="compare-bar-fill-p2" style="width: ${pct2}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Screen 4: Settings
function renderSettingsScreen() {
    // Populate wallet sub-tags dynamically
    document.getElementById('set-wallet-tag-cash').textContent = `${state.wallets.cash.name} (Cash)`;
    document.getElementById('set-wallet-tag-bank').textContent = `${state.wallets.bank.name} (Bank)`;
    document.getElementById('set-wallet-tag-ewallet').textContent = `${state.wallets.ewallet.name} (E-Wallet)`;

    const cashInitInput = document.getElementById('set-wallet-init-cash');
    const bankInitInput = document.getElementById('set-wallet-init-bank');
    const ewalletInitInput = document.getElementById('set-wallet-init-ewallet');

    const balances = computeWalletBalances();

    if (document.activeElement !== cashInitInput) {
        cashInitInput.value = balances.cash;
    }
    if (document.activeElement !== bankInitInput) {
        bankInitInput.value = balances.bank;
    }
    if (document.activeElement !== ewalletInitInput) {
        ewalletInitInput.value = balances.ewallet;
    }

    // Set active values for Language & Currency dropdowns
    const langSelect = document.getElementById('set-lang-select');
    if (langSelect) langSelect.value = currentLang;

    const currencySelect = document.getElementById('set-currency-select');
    if (currencySelect) currencySelect.value = state.currency || 'JOD';

    // Render extra sources list
    const extraList = document.getElementById('extra-sources-list');
    if ((state.extraSources || []).length === 0) {
        extraList.innerHTML = `<span style="font-size:11px; color:var(--text-muted);" data-i18n-dynamic="no_extra">${currentLang === 'ar' ? 'لا توجد مصادر إضافية بعد.' : 'No additional sources yet.'}</span>`;
    } else {
        extraList.innerHTML = state.extraSources.map(src => `
            <div class="extra-source-row">
                <div class="extra-source-info">
                    <span class="extra-source-name">${src.name}</span>
                    <span class="extra-source-bal">${formatAmount(src.initialBalance || 0)}</span>
                </div>
                <button type="button" class="btn-remove-tag" onclick="handleRemoveExtraSource('${src.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="icon-tag-close">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
        `).join('');
    }

    // Render custom category list as tag elements
    const tagList = document.getElementById('custom-categories-tags-list');
    if (state.customCategories.length === 0) {
        tagList.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">${currentLang === 'ar' ? 'لا توجد تصنيفات مخصصة بعد.' : 'No custom categories yet.'}</span>`;
    } else {
        tagList.innerHTML = state.customCategories.map(cat => `
            <span class="category-tag">
                ${cat}
                <button type="button" class="btn-remove-tag" onclick="handleRemoveCategory('${cat}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="icon-tag-close">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </span>
        `).join('');
    }
}

// ----------------------------------------------------
// Interactive Actions Handlers
// ----------------------------------------------------

// Handle Delete transaction
window.handleDeleteTransaction = function(id) {
    const msg = currentLang === 'ar'
        ? 'هل أنت متأكد من رغبتك في حذف هذه المعاملة؟'
        : 'Are you sure you want to delete this transaction?';
    if (confirm(msg)) {
        state.transactions = state.transactions.filter(t => t.id !== id);
        saveStateToStorage();
        refreshAllScreens();
    }
};

// Handle Remove Custom Category
window.handleRemoveCategory = function(cat) {
    if (confirm(`${currentLang === 'ar' ? 'هل أنت متأكد من حذف تصنيف' : 'Delete category'} "${cat}"?`)) {
        state.customCategories = state.customCategories.filter(c => c !== cat);
        saveStateToStorage();
        refreshAllScreens();
    }
};

// Handle Remove Extra Source
window.handleRemoveExtraSource = function(id) {
    const src = (state.extraSources || []).find(s => s.id === id);
    if (!src) return;
    if (confirm(`${currentLang === 'ar' ? 'حذف مصدر' : 'Delete source'} "${src.name}"?`)) {
        state.extraSources = state.extraSources.filter(s => s.id !== id);
        saveStateToStorage();
        refreshAllScreens();
    }
};

// Toggle Screen / Navigation controller
function switchScreen(targetScreenId) {
    if (targetScreenId !== 'screen-settings') {
        previousScreen = activeScreen;
    }
    activeScreen = targetScreenId;

    // Toggle active classes on layouts
    document.querySelectorAll('.app-screen').forEach(scr => {
        scr.classList.remove('active');
    });
    document.getElementById(targetScreenId).classList.add('active');

    // Toggle bottom tab bar highlights
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-target') === targetScreenId) {
            tab.classList.add('active');
        }
    });

    // Toggle settings header button active highlight
    const btnSettings = document.getElementById('btn-settings-toggle');
    if (btnSettings) {
        if (targetScreenId === 'screen-settings') {
            btnSettings.classList.add('active');
        } else {
            btnSettings.classList.remove('active');
        }
    }

    // Refresh UI parameters
    refreshAllScreens();
}

// Reset data back to clean initialization
function handleResetAllData() {
    const msg = currentLang === 'ar'
        ? '⚠️ تحذير مهم جداً: هل أنت متأكد من رغبتك في حذف كافة المعاملات وإعادة ضبط الحسابات إلى الصفر؟ لا يمكن التراجع عن هذا الإجراء.'
        : '⚠️ Warning: Delete ALL transactions and reset all balances to zero? This cannot be undone.';
    if (confirm(msg)) {
        state = {
            wallets: {
                cash: { name: 'كاش', initialBalance: 0 },
                bank: { name: 'البنك', initialBalance: 0 },
                ewallet: { name: 'محفظة إلكترونية', initialBalance: 0 }
            },
            transactions: [],
            customCategories: [],
            extraSources: []
        };
        saveStateToStorage();
        refreshAllScreens();
        alert(currentLang === 'ar' ? 'تم تصفير المحافظ وحذف المعاملات بنجاح.' : 'All data cleared successfully.');
    }
}

// Export backup payload as text file download
function handleExportJSONBackup() {
    const filename = `mahfazati_backup_${new Date().toISOString().slice(0,10)}.json`;
    const textStr = JSON.stringify(state, null, 4);

    const blob = new Blob([textStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ----------------------------------------------------
// Event Listeners Initialization
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    
    // Load local storage
    loadStateFromStorage();
    
    // If absolutely clean load, pre-populate mocks
    populateMockDataIfEmpty();

    // Default values for form selectors
    const dateInput = document.getElementById('trans-date');
    const todayStr = new Date().toISOString().slice(0, 10);
    dateInput.value = todayStr;

    // Filter start and end date default to current month range
    const filterStartDateInput = document.getElementById('filter-start-date');
    const filterEndDateInput = document.getElementById('filter-end-date');
    if (filterStartDateInput && filterEndDateInput) {
        filterStartDateInput.value = todayStr.slice(0, 8) + '01';
        filterEndDateInput.value = todayStr;
    }

    // Initial calculations and renders
    refreshAllScreens();

    // -- Tab Bar Navigation clicks --
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', () => {
            switchScreen(tab.getAttribute('data-target'));
        });
    });

    // Home "View All" redirects to ledger screen
    document.getElementById('home-view-all-btn').addEventListener('click', () => {
        switchScreen('screen-transactions');
    });

    // -- Modal Dialog Trigger animations --
    const modalBackdrop = document.getElementById('transaction-modal-backdrop');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtns = document.querySelectorAll('#close-modal-btn');

    openModalBtn.addEventListener('click', () => {
        // Form default state cleanup
        document.getElementById('trans-amount').value = '';
        document.getElementById('trans-desc').value = '';
        document.getElementById('trans-date').value = new Date().toISOString().slice(0, 10);
        document.getElementById('toggle-expense').checked = true;
        
        // Show modal
        modalBackdrop.style.display = 'block';
        setTimeout(() => {
            modalBackdrop.classList.add('active');
        }, 10);
    });

    const hideModalHandler = () => {
        modalBackdrop.classList.remove('active');
        setTimeout(() => {
            modalBackdrop.style.display = 'none';
        }, 300);
    };

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', hideModalHandler);
    });

    // Click on backdrop outer container closes it as well
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            hideModalHandler();
        }
    });

    // -- Form Submit handlers --

    // Form 1: Add transaction
    const transForm = document.getElementById('transaction-form');
    transForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = document.querySelector('input[name="trans-type"]:checked').value;
        const amount = parseFloat(document.getElementById('trans-amount').value);
        const description = document.getElementById('trans-desc').value.trim();
        const category = document.getElementById('trans-category').value;
        const wallet = document.getElementById('trans-wallet').value;
        const date = document.getElementById('trans-date').value;

        // Perform clean validation
        if (isNaN(amount) || amount <= 0) {
            alert(currentLang === 'ar' ? 'يرجى إدخال مبلغ صحيح أكبر من الصفر.' : 'Please enter a valid amount greater than zero.');
            return;
        }

        if (!description) {
            alert(currentLang === 'ar' ? 'يرجى ملء بيان الوصف.' : 'Please enter a description.');
            return;
        }

        const newTransaction = {
            id: 't-' + Date.now(),
            type,
            amount,
            description,
            category,
            wallet,
            date
        };

        // Update state and persist
        state.transactions.push(newTransaction);
        saveStateToStorage();

        // Close modal and refresh active layout screen
        hideModalHandler();
        refreshAllScreens();
    });

    // Form 2: Settings customization (Current Balance Adjustment)
    const settingsForm = document.getElementById('wallets-settings-form');
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newCurrentCash = parseFloat(document.getElementById('set-wallet-init-cash').value);
        const newCurrentBank = parseFloat(document.getElementById('set-wallet-init-bank').value);
        const newCurrentEwallet = parseFloat(document.getElementById('set-wallet-init-ewallet').value);

        if (isNaN(newCurrentCash) || isNaN(newCurrentBank) || isNaN(newCurrentEwallet)) {
            alert(currentLang === 'ar' ? 'الرجاء التأكد من كتابة ميزانية صحيحة.' : 'Please make sure to enter correct wallet balances.');
            return;
        }

        // Helper to calculate transaction sum for wallet
        const getNetTxChange = (walletId) => {
            return state.transactions
                .filter(t => t.wallet === walletId)
                .reduce((sum, t) => {
                    const amt = parseFloat(t.amount);
                    return sum + (t.type === 'income' ? amt : -amt);
                }, 0);
        };

        const netCash = getNetTxChange('cash');
        const netBank = getNetTxChange('bank');
        const netEwallet = getNetTxChange('ewallet');

        // Apply changes by backing into initialBalance
        state.wallets.cash.initialBalance = newCurrentCash - netCash;
        state.wallets.bank.initialBalance = newCurrentBank - netBank;
        state.wallets.ewallet.initialBalance = newCurrentEwallet - netEwallet;

        saveStateToStorage();
        refreshAllScreens();

        alert(currentLang === 'ar' ? 'تم تعديل ميزانيات المحافظ وحفظها بنجاح!' : 'Wallet balances updated and saved successfully!');
    });

    // -- Dynamic Filter Listeners in ledger --
    document.getElementById('filter-wallet').addEventListener('change', refreshAllScreens);
    document.getElementById('filter-type').addEventListener('change', refreshAllScreens);
    document.getElementById('filter-category').addEventListener('change', refreshAllScreens);
    document.getElementById('filter-start-date').addEventListener('input', refreshAllScreens);
    document.getElementById('filter-end-date').addEventListener('input', refreshAllScreens);
    
    document.getElementById('btn-reset-filters').addEventListener('click', () => {
        document.getElementById('filter-wallet').value = 'all';
        document.getElementById('filter-type').value = 'all';
        document.getElementById('filter-category').value = 'all';
        const todayStr = new Date().toISOString().slice(0, 10);
        document.getElementById('filter-start-date').value = todayStr.slice(0, 8) + '01';
        document.getElementById('filter-end-date').value = todayStr;
        refreshAllScreens();
    });

    // -- Monthly Summary Navigator buttons --
    document.getElementById('prev-month-btn').addEventListener('click', () => {
        currentSummaryMonth--;
        if (currentSummaryMonth < 1) {
            currentSummaryMonth = 12;
            currentSummaryYear--;
        }
        refreshAllScreens();
    });

    document.getElementById('next-month-btn').addEventListener('click', () => {
        currentSummaryMonth++;
        if (currentSummaryMonth > 12) {
            currentSummaryMonth = 1;
            currentSummaryYear++;
        }
        refreshAllScreens();
    });

    // -- Custom category adder in settings --
    document.getElementById('btn-add-custom-cat').addEventListener('click', () => {
        const input = document.getElementById('new-custom-category-input');
        const val = input.value.trim();
        
        if (!val) return;
        
        const allCategories = [...DEFAULT_CATEGORIES, ...state.customCategories];
        if (allCategories.includes(val)) {
            alert(currentLang === 'ar' ? 'هذا التصنيف موجود بالفعل!' : 'This category already exists!');
            return;
        }

        state.customCategories.push(val);
        input.value = '';
        saveStateToStorage();
        refreshAllScreens();
    });

    // -- Language select change --
    const langSelect = document.getElementById('set-lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
            refreshAllScreens();
        });
    }

    // -- Currency select change --
    const currencySelect = document.getElementById('set-currency-select');
    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            state.currency = e.target.value;
            saveStateToStorage();
            refreshAllScreens();
        });
    }

    // -- Add Extra Source button --
    document.getElementById('btn-add-extra-source').addEventListener('click', () => {
        const t = TRANSLATIONS[currentLang];
        const name = prompt(t.source_name_placeholder || 'اسم المصدر الجديد:');
        if (!name || !name.trim()) return;

        const initBalStr = prompt(currentLang === 'ar' ? 'الرصيد الافتتاحي:' : 'Opening balance:');
        const initBal = parseFloat(initBalStr) || 0;

        const newSource = {
            id: 'src-' + Date.now(),
            name: name.trim(),
            initialBalance: initBal
        };
        state.extraSources = state.extraSources || [];
        state.extraSources.push(newSource);
        saveStateToStorage();
        refreshAllScreens();
    });

    // -- Text file import for old statements --
    let pendingImportTransactions = [];

    document.getElementById('import-txt-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const text = ev.target.result;
            pendingImportTransactions = parseTxtStatement(text);
            showImportPreview(pendingImportTransactions);
        };
        reader.readAsText(file, 'UTF-8');
        // Reset input so same file can be re-uploaded
        e.target.value = '';
    });

    document.getElementById('btn-confirm-import').addEventListener('click', () => {
        if (!pendingImportTransactions.length) return;
        state.transactions.push(...pendingImportTransactions);
        saveStateToStorage();
        refreshAllScreens();
        document.getElementById('import-preview-container').style.display = 'none';
        pendingImportTransactions = [];
        alert(currentLang === 'ar' ? `تم استيراد ${state.transactions.length > 0 ? pendingImportTransactions.length : 0} معاملة بنجاح!` : 'Transactions imported successfully!');
    });

    document.getElementById('btn-cancel-import').addEventListener('click', () => {
        document.getElementById('import-preview-container').style.display = 'none';
        pendingImportTransactions = [];
    });

    // Master operational clicks
    document.getElementById('btn-export-data').addEventListener('click', handleExportJSONBackup);
    document.getElementById('btn-reset-data').addEventListener('click', handleResetAllData);

    // Settings header button click
    const btnSettings = document.getElementById('btn-settings-toggle');
    if (btnSettings) {
        btnSettings.addEventListener('click', () => {
            if (activeScreen === 'screen-settings') {
                switchScreen(previousScreen || 'screen-home');
            } else {
                switchScreen('screen-settings');
            }
        });
    }

    // Comparative periods click
    const btnRunComp = document.getElementById('btn-run-comparison');
    if (btnRunComp) {
        btnRunComp.addEventListener('click', () => {
            renderComparisonScreen();
        });
    }

    // Apply saved language on load
    applyLanguage(currentLang);
});

// ----------------------------------------------------
// Text File Parser for Old Statement Import
// ----------------------------------------------------
function parseTxtStatement(text) {
    const lines = text.split('\n');
    const transactions = [];
    const today = new Date().toISOString().slice(0, 10);

    // Known wallet keywords (Arabic & English) for auto-detection
    const walletKeywords = {
        cash: ['كاش', 'cash', 'نقدي', 'نقد'],
        bank: ['بنك', 'bank', 'حساب', 'تحويل'],
        ewallet: ['محفظة', 'ewallet', 'e-wallet', 'إلكترونية', 'فودافون', 'فينتعش', 'انستاباي']
    };

    // Also check extra sources by name
    const allWallets = [
        { id: 'cash', keywords: walletKeywords.cash },
        { id: 'bank', keywords: walletKeywords.bank },
        { id: 'ewallet', keywords: walletKeywords.ewallet },
        ...(state.extraSources || []).map(s => ({ id: s.id, keywords: [s.name.toLowerCase()] }))
    ];

    lines.forEach((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) return;

        // Detect sign: must start with + or - or −
        let type = null;
        let rest = line;

        if (line.startsWith('+')) {
            type = 'income';
            rest = line.slice(1).trim();
        } else if (line.startsWith('-') || line.startsWith('−')) {
            type = 'expense';
            rest = line.slice(1).trim();
        } else {
            return; // skip lines without + or -
        }

        // Extract amount: first numeric token (supports decimals and commas)
        const amountMatch = rest.match(/^[\d,\.]+/);
        if (!amountMatch) return;

        const amount = parseFloat(amountMatch[0].replace(/,/g, ''));
        if (isNaN(amount) || amount <= 0) return;

        const afterAmount = rest.slice(amountMatch[0].length).trim();

        // Try to detect wallet from remaining text
        let detectedWallet = 'cash'; // default
        for (const w of allWallets) {
            for (const kw of w.keywords) {
                if (afterAmount.toLowerCase().includes(kw.toLowerCase())) {
                    detectedWallet = w.id;
                    break;
                }
            }
        }

        // Everything after the amount becomes the description
        const description = afterAmount || (type === 'income' ? 'دخل مستورد' : 'مصروف مستورد');

        // Try to detect date in line (YYYY-MM-DD or DD/MM/YYYY)
        let dateStr = today;
        const datePatternISO = afterAmount.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
        const datePatternDMY = afterAmount.match(/(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/);
        if (datePatternISO) {
            dateStr = `${datePatternISO[1]}-${String(datePatternISO[2]).padStart(2,'0')}-${String(datePatternISO[3]).padStart(2,'0')}`;
        } else if (datePatternDMY) {
            dateStr = `${datePatternDMY[3]}-${String(datePatternDMY[2]).padStart(2,'0')}-${String(datePatternDMY[1]).padStart(2,'0')}`;
        }

        transactions.push({
            id: 't-import-' + Date.now() + '-' + idx,
            type,
            amount,
            description,
            category: type === 'income' ? 'راتب' : 'أخرى',
            wallet: detectedWallet,
            date: dateStr,
            imported: true
        });
    });

    return transactions;
}

function showImportPreview(transactions) {
    const container = document.getElementById('import-preview-container');
    const list = document.getElementById('import-preview-list');
    const countBadge = document.getElementById('import-preview-count');

    if (transactions.length === 0) {
        container.style.display = 'none';
        alert(currentLang === 'ar'
            ? 'لم يتم اكتشاف أي معاملات. تأكد أن كل سطر يبدأ بـ + أو - متبوعاً بالمبلغ.'
            : 'No transactions detected. Ensure each line starts with + or - followed by an amount.');
        return;
    }

    countBadge.textContent = `${transactions.length} ${currentLang === 'ar' ? 'معاملة' : 'transactions'}`;

    list.innerHTML = transactions.map(t => {
        const isIncome = t.type === 'income';
        const walletName = state.wallets[t.wallet]
            ? state.wallets[t.wallet].name
            : (state.extraSources || []).find(s => s.id === t.wallet)?.name || t.wallet;
        return `
            <div class="import-preview-item ${t.type}">
                <span class="import-item-sign ${isIncome ? 'text-green' : 'text-red'}">${isIncome ? '+' : '−'}</span>
                <span class="import-item-amount">${formatAmount(t.amount)}</span>
                <span class="import-item-desc">${t.description}</span>
                <span class="import-item-wallet">${walletName}</span>
                <span class="import-item-date">${t.date}</span>
            </div>
        `;
    }).join('');

    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
