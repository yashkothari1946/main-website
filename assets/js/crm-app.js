const API_BASE = (function () {
  const h = location.hostname;
  return (h === 'localhost' || h === '127.0.0.1')
    ? 'http://localhost:5000/api/vybtek/crm'
    : `${location.protocol}//${location.host}/api/vybtek/crm`;
})();

// --- UTILITIES ---
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(message, type = 'error') {
  const existing = document.getElementById('crm-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'crm-toast';
  toast.className = `fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-bold ${
    type === 'error' ? 'bg-red-500 text-white' :
    type === 'success' ? 'bg-emerald-500 text-white' :
    'bg-slate-800 text-white'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// State
let clientsData = [];

// Pipeline Config
const PIPELINE_STAGES = [
  { id: 'new', title: 'New Leads', color: 'border-slate-300', bg: 'bg-slate-300' },
  { id: 'contacted', title: 'Contacted', color: 'border-blue-400', bg: 'bg-blue-400' },
  { id: 'proposal', title: 'Proposal Sent', color: 'border-vt-cyan', bg: 'bg-vt-cyan' },
  { id: 'negotiation', title: 'Negotiation', color: 'border-purple-400', bg: 'bg-purple-400' },
  { id: 'won', title: 'Closed Won', color: 'border-emerald-400', bg: 'bg-emerald-400' },
  { id: 'lost', title: 'Closed Lost', color: 'border-red-400', bg: 'bg-red-400' }
];

async function fetchClients() {
  try {
    const res = await fetch(`${API_BASE}/clients`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success) {
      clientsData = json.data;
      if (document.getElementById('kanban-board')) renderKanban();
      if (document.getElementById('clients-tbody')) renderClientsTable();
      populateClientDropdowns();
    }
  } catch (err) {
    showToast('Failed to load clients. Please refresh.');
  }
}

let invoicesData = [];
async function fetchInvoices() {
  try {
    const res = await fetch(`${API_BASE}/invoices`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success) {
      invoicesData = json.data;
      if (document.getElementById('invoices-tbody')) renderInvoicesTable(json.data);
    }
  } catch (err) {
    showToast('Failed to load invoices. Please refresh.');
  }
}

async function fetchQuotations() {
  try {
    const res = await fetch(`${API_BASE}/quotations`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success) {
      if (document.getElementById('quotes-list')) renderQuotationsTable(json.data);
    }
  } catch (err) {
    showToast('Failed to load quotations. Please refresh.');
  }
}

// --- RENDER FUNCTIONS ---
function renderKanban() {
  const board = document.getElementById('kanban-board');
  if (!board) return;
  board.innerHTML = '';

  PIPELINE_STAGES.forEach(stage => {
    const stageLeads = clientsData.filter(l => l.pipeline_status === stage.id);

    const cardsHtml = stageLeads.map(lead => `
      <div class="kanban-card" draggable="true" ondragstart="drag(event)" id="lead-${lead.id}" onclick="showOnboarding(${lead.id})">
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs font-bold text-slate-500 uppercase">${esc(lead.company_name)}</span>
          <span class="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-900">$${Number(lead.project_value).toLocaleString()}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm mb-3 leading-snug">${esc(lead.project_title)}</h4>
        <div class="flex justify-between items-center mt-4 pt-3 border-t border-slate-200">
          <div class="flex -space-x-2">
            <img class="w-6 h-6 rounded-full border border-vt-navy" src="https://ui-avatars.com/api/?name=${encodeURIComponent(lead.company_name)}&background=random" alt="">
          </div>
          <button class="text-slate-500 hover:text-vt-blue text-xs"><i class="fas fa-ellipsis-h"></i></button>
        </div>
      </div>
    `).join('');

    const colHtml = `
      <div class="kanban-col flex flex-col shrink-0">
        <div class="flex justify-between items-center mb-4 pb-2 border-b-2 ${stage.color}">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${stage.bg}"></span>
            ${stage.title}
          </h3>
          <span class="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">${stageLeads.length}</span>
        </div>
        <div class="flex-1 glass-panel p-2 rounded-xl min-h-[200px]"
             ondrop="drop(event, '${stage.id}')"
             ondragover="allowDrop(event)"
             ondragenter="dragEnter(event)"
             ondragleave="dragLeave(event)">
          ${cardsHtml}
        </div>
      </div>
    `;
    board.innerHTML += colHtml;
  });
}

function renderClientsTable() {
  const tbody = document.getElementById('clients-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  clientsData.forEach(client => {
    const statusBadge = client.pipeline_status === 'won'
      ? `<span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold">Active</span>`
      : `<span class="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold">Onboarding</span>`;

    tbody.innerHTML += `
      <tr class="border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-vt-blue" onclick="showOnboarding(${client.id})">
        <td class="py-4 pl-6 pr-4">
          <div class="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(client.company_name)}&background=random" class="w-8 h-8 rounded-full border border-slate-200" alt="">
            <div>
              <p class="font-bold text-slate-900">${esc(client.company_name)}</p>
              <p class="text-xs text-slate-500">Added: ${new Date(client.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </td>
        <td class="py-4 px-4 text-slate-600">
          <p class="text-slate-900">${esc(client.contact_name)}</p>
        </td>
        <td class="py-4 px-4 text-slate-600">${esc(client.project_title)}</td>
        <td class="py-4 pl-4 pr-6">${statusBadge}</td>
      </tr>
    `;
  });
}

function renderInvoicesTable(invoices) {
  const tbody = document.getElementById('invoices-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  invoices.forEach(inv => {
    let badge = `<span class="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold uppercase">Pending</span>`;
    let dateColor = 'text-slate-300';
    if (inv.status === 'paid') {
      badge = `<span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold uppercase">Paid</span>`;
    } else if (inv.status === 'overdue') {
      badge = `<span class="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold uppercase">Overdue</span>`;
      dateColor = 'text-red-400 font-bold';
    }

    const sym = inv.currency === 'INR' ? '₹' : inv.currency === 'EUR' ? '€' : inv.currency === 'GBP' ? '£' : '$';

    tbody.innerHTML += `
      <tr class="border-b border-slate-200 hover:bg-slate-100 transition-colors">
        <td class="py-4 pl-6 pr-4 font-mono text-slate-600">${esc(inv.invoice_number)}</td>
        <td class="py-4 px-4 font-bold text-slate-900">${esc(inv.company_name)}</td>
        <td class="py-4 px-4 text-slate-900 font-medium">${sym}${Number(inv.amount).toLocaleString()}</td>
        <td class="py-4 px-4 ${dateColor}">${new Date(inv.due_date).toLocaleDateString()}</td>
        <td class="py-4 pl-4 pr-6 flex items-center gap-3">
          ${badge}
          <button onclick="editInvoice(${inv.id})" class="text-vt-blue hover:text-blue-700 ml-auto" title="Edit"><i class="fas fa-edit"></i></button>
          <button onclick="toggleInvoiceStatus(${inv.id})" class="text-slate-400 hover:text-slate-700" title="Toggle Status"><i class="fas fa-check-circle"></i></button>
        </td>
      </tr>
    `;
  });
}

function renderQuotationsTable(quotes) {
  const list = document.getElementById('quotes-list');
  if (!list) return;
  list.innerHTML = '';

  if (!quotes || !quotes.length) {
    list.innerHTML = '<p class="text-sm text-slate-500 italic p-4">No quotations found.</p>';
    return;
  }

  quotes.forEach(quote => {
    const badgeColor = quote.status === 'accepted' ? 'emerald' : 'blue';
    list.innerHTML += `
      <div class="p-4 rounded-xl border border-slate-200 bg-white/[0.02] hover:bg-slate-100 transition-colors cursor-pointer border-l-4 border-l-${badgeColor}-500">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-slate-900 text-sm">${esc(quote.company_name)}</h3>
          <span class="text-xs font-bold text-slate-500">${esc(quote.quote_number)}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-black text-slate-900">$${Number(quote.total).toLocaleString()}</span>
          <span class="bg-${badgeColor}-500/20 text-${badgeColor}-400 px-2 py-1 rounded text-[10px] font-bold uppercase">${esc(quote.status)}</span>
        </div>
      </div>
    `;
  });
}

// --- DRAG AND DROP LOGIC ---
function allowDrop(ev) { ev.preventDefault(); }

function dragEnter(ev) {
  if (ev.target.classList.contains('glass-panel')) ev.target.classList.add('drag-over');
}

function dragLeave(ev) {
  if (ev.target.classList.contains('glass-panel')) ev.target.classList.remove('drag-over');
}

function drag(ev) { ev.dataTransfer.setData('text', ev.target.id); }

async function drop(ev, newStatus) {
  ev.preventDefault();
  document.querySelectorAll('.glass-panel').forEach(el => el.classList.remove('drag-over'));

  const leadElementId = ev.dataTransfer.getData('text');
  if (!leadElementId) return;
  const leadId = leadElementId.replace('lead-', '');

  const lead = clientsData.find(l => l.id == leadId);
  if (lead && lead.pipeline_status !== newStatus) {
    lead.pipeline_status = newStatus;
    renderKanban();

    try {
      const res = await fetch(`${API_BASE}/clients/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      showToast('Failed to update lead status. Reverting.');
      fetchClients();
    }
  }
}

let currentOnboardingClientId = null;

async function showOnboarding(clientId) {
  const client = clientsData.find(c => c.id == clientId);
  if (!client) return;

  currentOnboardingClientId = client.id;
  document.getElementById('onboarding-company-name').textContent = client.company_name;
  document.getElementById('onboarding-sidebar').classList.remove('translate-x-full');

  try {
    const res = await fetch(`${API_BASE}/clients/${client.id}/onboarding`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success) renderOnboardingTasks(json.data);
  } catch (err) {
    showToast('Failed to load onboarding tasks.');
  }
}

function closeOnboarding() {
  document.getElementById('onboarding-sidebar').classList.add('translate-x-full');
}

function renderOnboardingTasks(tasks) {
  const container = document.getElementById('onboarding-tasks-container');
  if (!container) return;
  container.innerHTML = '';

  if (!tasks.length) {
    container.innerHTML = '<p class="text-sm text-slate-500 italic">No onboarding tasks found. Move the client to Closed Won to generate default tasks.</p>';
    document.getElementById('onboarding-progress-bar').style.width = '0%';
    document.getElementById('onboarding-progress-text').textContent = '0%';
    return;
  }

  let completed = 0;
  tasks.forEach(task => {
    if (task.is_completed) completed++;

    const label = document.createElement('label');
    label.className = 'flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-vt-blue cursor-pointer transition-colors';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.is_completed;
    checkbox.className = 'mt-1 w-4 h-4 text-vt-blue rounded border-slate-300 focus:ring-vt-blue';
    checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));

    const span = document.createElement('span');
    span.className = `text-sm font-medium ${task.is_completed ? 'text-slate-400 line-through' : 'text-slate-700'}`;
    span.textContent = task.task_name;

    label.appendChild(checkbox);
    label.appendChild(span);
    container.appendChild(label);
  });

  const pct = Math.round((completed / tasks.length) * 100);
  document.getElementById('onboarding-progress-bar').style.width = `${pct}%`;
  document.getElementById('onboarding-progress-text').textContent = `${pct}%`;
}

async function toggleTask(taskId, isCompleted) {
  try {
    const res = await fetch(`${API_BASE}/clients/onboarding/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: isCompleted ? 1 : 0 })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (currentOnboardingClientId) {
      const r2 = await fetch(`${API_BASE}/clients/${currentOnboardingClientId}/onboarding`);
      const json = await r2.json();
      if (json.success) renderOnboardingTasks(json.data);
    }
  } catch (err) {
    showToast('Failed to update task.');
  }
}

// --- MODALS AND FORMS LOGIC ---
function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  if (show) {
    modal.classList.remove('hidden');
    populateClientDropdowns();
  } else {
    modal.classList.add('hidden');
  }
}

function populateClientDropdowns() {
  ['quote-client', 'invoice-client', 'task-client'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    clientsData.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.company_name;
      el.appendChild(opt);
    });
  });
}

async function submitQuote() {
  const amount = document.getElementById('quote-amount').value;
  const payload = {
    client_id: document.getElementById('quote-client').value,
    quote_number: document.getElementById('quote-number').value,
    valid_until: document.getElementById('quote-date').value,
    subtotal: amount,
    tax: 0,
    total: amount,
    line_items: [{ description: 'Custom Development Services', qty: 1, price: amount, total: amount }]
  };
  try {
    const res = await fetch(`${API_BASE}/quotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    toggleModal('modal-quote', false);
    showToast('Quotation created.', 'success');
    fetchQuotations();
  } catch (err) {
    showToast('Failed to create quotation.');
  }
}

// --- INVOICE LINE ITEMS LOGIC ---
function addInvoiceLineItem(desc = '', qty = 1, price = 0, gst = 0) {
  const tbody = document.getElementById('invoice-line-items');
  if (!tbody) return;

  const tr = document.createElement('tr');
  tr.className = 'invoice-item-row';

  function makeInput(type, cls, val, min, max) {
    const inp = document.createElement('input');
    inp.type = type;
    inp.className = cls;
    inp.value = val;
    if (min !== undefined) inp.min = min;
    if (max !== undefined) inp.max = max;
    if (type === 'number') inp.addEventListener('change', calculateInvoiceTotals);
    const td = document.createElement('td');
    td.className = 'p-2';
    td.appendChild(inp);
    return { inp, td };
  }

  const { inp: descInp, td: descTd } = makeInput('text', 'item-desc w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm', desc);
  descInp.placeholder = 'Service description...';
  const { td: qtyTd } = makeInput('number', 'item-qty w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm', qty, 1);
  const { td: priceTd } = makeInput('number', 'item-price w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm', price, 0);
  const { td: gstTd } = makeInput('number', 'item-gst w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm', gst, 0, 100);

  const totalTd = document.createElement('td');
  totalTd.className = 'p-2 text-right font-medium text-slate-900 item-total';
  totalTd.textContent = '0.00';

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'text-red-400 hover:text-red-600';
  removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
  removeBtn.addEventListener('click', () => { tr.remove(); calculateInvoiceTotals(); });
  const removeTd = document.createElement('td');
  removeTd.className = 'p-2 text-center';
  removeTd.appendChild(removeBtn);

  [descTd, qtyTd, priceTd, gstTd, totalTd, removeTd].forEach(td => tr.appendChild(td));
  tbody.appendChild(tr);
  calculateInvoiceTotals();
}

function removeInvoiceLineItem(btn) {
  btn.closest('tr').remove();
  calculateInvoiceTotals();
}

function calculateInvoiceTotals() {
  let subtotal = 0;
  let totalTax = 0;

  document.querySelectorAll('.invoice-item-row').forEach(row => {
    const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const gst = parseFloat(row.querySelector('.item-gst').value) || 0;
    const rowSub = qty * price;
    const rowTax = rowSub * (gst / 100);
    row.querySelector('.item-total').textContent = (rowSub + rowTax).toFixed(2);
    subtotal += rowSub;
    totalTax += rowTax;
  });

  const currency = document.getElementById('invoice-currency')?.value;
  const sym = currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

  const dispSub = document.getElementById('invoice-display-subtotal');
  const dispTax = document.getElementById('invoice-display-tax');
  const dispTotal = document.getElementById('invoice-display-total');
  if (dispSub) dispSub.textContent = sym + subtotal.toFixed(2);
  if (dispTax) dispTax.textContent = sym + totalTax.toFixed(2);
  if (dispTotal) dispTotal.textContent = sym + (subtotal + totalTax).toFixed(2);
}

// --- INVOICE MODAL ---
function editInvoice(id) {
  openInvoiceModal(id);
}

function openInvoiceModal(id = null) {
  const modal = document.getElementById('modal-invoice');
  if (!modal) return;

  document.getElementById('invoice-line-items').innerHTML = '';
  populateClientDropdowns();

  const statusContainer = document.getElementById('invoice-status-container');
  const title = document.getElementById('invoice-modal-title');
  const idInput = document.getElementById('invoice-id');

  if (id) {
    const inv = invoicesData.find(i => i.id === id);
    if (!inv) return;

    title.textContent = 'Edit Invoice';
    idInput.value = inv.id;
    document.getElementById('invoice-client').value = inv.client_id;
    document.getElementById('invoice-number').value = inv.invoice_number;
    document.getElementById('invoice-date').value = inv.due_date.split('T')[0];
    document.getElementById('invoice-currency').value = inv.currency || 'USD';
    document.getElementById('invoice-status').value = inv.status;
    if (statusContainer) statusContainer.classList.remove('hidden');

    if (inv.line_items && typeof inv.line_items === 'string') {
      try {
        const items = JSON.parse(inv.line_items);
        items.forEach(i => addInvoiceLineItem(i.description, i.qty, i.price, i.gst));
      } catch (e) { addInvoiceLineItem('Services rendered', 1, inv.amount, 0); }
    } else if (Array.isArray(inv.line_items)) {
      inv.line_items.forEach(i => addInvoiceLineItem(i.description, i.qty, i.price, i.gst));
    } else {
      addInvoiceLineItem('Services rendered', 1, inv.amount, 0);
    }
  } else {
    title.textContent = 'Create Invoice';
    idInput.value = '';
    document.getElementById('invoice-number').value = '';
    document.getElementById('invoice-date').value = '';
    document.getElementById('invoice-currency').value = 'USD';
    if (statusContainer) statusContainer.classList.add('hidden');
    addInvoiceLineItem();
  }

  calculateInvoiceTotals();
  modal.classList.remove('hidden');
}

// Route invoice modal through openInvoiceModal
const _originalToggleModal = toggleModal;
toggleModal = function (modalId, show) {
  if (modalId === 'modal-invoice' && show) {
    openInvoiceModal();
  } else {
    _originalToggleModal(modalId, show);
  }
};

async function submitInvoice() {
  const rows = document.querySelectorAll('.invoice-item-row');
  const line_items = [];
  let subtotal = 0;
  let tax_total = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const gst = parseFloat(row.querySelector('.item-gst').value) || 0;
    line_items.push({ description: row.querySelector('.item-desc').value, qty, price, gst });
    subtotal += qty * price;
    tax_total += qty * price * (gst / 100);
  });

  const id = document.getElementById('invoice-id').value;
  const payload = {
    client_id: document.getElementById('invoice-client').value,
    invoice_number: document.getElementById('invoice-number').value,
    due_date: document.getElementById('invoice-date').value,
    currency: document.getElementById('invoice-currency').value,
    subtotal,
    tax_total,
    amount: subtotal + tax_total,
    line_items
  };

  try {
    let res;
    if (id) {
      payload.status = document.getElementById('invoice-status').value;
      res = await fetch(`${API_BASE}/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`${API_BASE}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    document.getElementById('modal-invoice').classList.add('hidden');
    showToast('Invoice saved.', 'success');
    fetchInvoices();
  } catch (err) {
    showToast('Failed to save invoice.');
  }
}

async function toggleInvoiceStatus(id) {
  const inv = invoicesData.find(i => i.id === id);
  if (!inv) return;
  const newStatus = inv.status === 'paid' ? 'pending' : 'paid';
  try {
    const res = await fetch(`${API_BASE}/invoices/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    fetchInvoices();
  } catch (err) {
    showToast('Failed to update invoice status.');
  }
}

async function submitTask() {
  const payload = {
    client_id: document.getElementById('task-client').value,
    type: document.getElementById('task-type').value,
    due_date: document.getElementById('task-date').value,
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-desc').value
  };
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    toggleModal('modal-task', false);
    showToast('Follow-up scheduled.', 'success');
    fetchTasks();
  } catch (err) {
    showToast('Failed to schedule follow-up.');
  }
}

// --- TASKS ---
let tasksData = [];
async function fetchTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success) {
      tasksData = json.data;
      renderTasks();
    }
  } catch (err) {
    showToast('Failed to load follow-ups.');
  }
}

const TASK_ICONS = { email: 'envelope', meeting: 'calendar-alt', call: 'phone' };

function renderTasks() {
  const dashContainer = document.getElementById('dashboard-tasks-list');
  const moduleContainer = document.getElementById('module-tasks-list');

  if (!tasksData.length) {
    const emptyHtml = '<p class="text-sm text-slate-500 italic p-4">No pending follow-ups.</p>';
    if (dashContainer) dashContainer.innerHTML = emptyHtml;
    if (moduleContainer) moduleContainer.innerHTML = emptyHtml;
    return;
  }

  const tasksHtml = tasksData.map(task => {
    const date = new Date(task.due_date).toLocaleDateString();
    const icon = TASK_ICONS[task.type] || 'phone';
    return `
      <div class="p-4 border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-vt-blue">
        <div class="flex justify-between items-start mb-1">
          <h3 class="font-bold text-slate-900 text-sm"><i class="fas fa-${icon} text-slate-400 mr-2"></i>${esc(task.company_name)}</h3>
          <span class="text-xs font-bold text-slate-500">${date}</span>
        </div>
        <p class="text-xs font-bold text-slate-600 mb-1">${esc(task.title)}</p>
        <p class="text-[10px] text-slate-500 truncate">${esc(task.description || 'No description provided.')}</p>
      </div>
    `;
  }).join('');

  if (dashContainer) dashContainer.innerHTML = tasksHtml;
  if (moduleContainer) moduleContainer.innerHTML = tasksHtml;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('kanban-board') || document.getElementById('clients-tbody') || document.getElementById('quote-client')) {
    fetchClients();
  }
  if (document.getElementById('invoices-tbody')) {
    fetchInvoices();
  }
  if (document.getElementById('quotes-list')) {
    fetchQuotations();
  }
  if (document.getElementById('dashboard-tasks-list') || document.getElementById('module-tasks-list')) {
    fetchTasks();
  }
});
