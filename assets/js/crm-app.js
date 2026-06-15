const API_BASE = 'http://localhost:5000/api/vybtek/crm';

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
    const json = await res.json();
    if (json.success) {
      clientsData = json.data;
      if(document.getElementById('kanban-board')) renderKanban();
      if(document.getElementById('clients-tbody')) renderClientsTable();
      populateClientDropdowns();
    }
  } catch (err) {
    console.error('Error fetching clients:', err);
  }
}

async function fetchInvoices() {
  try {
    const res = await fetch(`${API_BASE}/invoices`);
    const json = await res.json();
    if (json.success) {
      if(document.getElementById('invoices-tbody')) renderInvoicesTable(json.data);
    }
  } catch (err) {
    console.error('Error fetching invoices:', err);
  }
}

async function fetchQuotations() {
  try {
    const res = await fetch(`${API_BASE}/quotations`);
    const json = await res.json();
    if (json.success) {
      if(document.getElementById('quotes-list')) renderQuotationsTable(json.data);
    }
  } catch (err) {
    console.error('Error fetching quotes:', err);
  }
}

// --- RENDER FUNCTIONS ---
function renderKanban() {
  const board = document.getElementById('kanban-board');
  if(!board) return;
  board.innerHTML = '';

  PIPELINE_STAGES.forEach(stage => {
    const stageLeads = clientsData.filter(l => l.pipeline_status === stage.id);
    
    let cardsHtml = stageLeads.map(lead => `
      <div class="kanban-card" draggable="true" ondragstart="drag(event)" id="lead-${lead.id}" onclick="showOnboarding('${lead.company_name}')">
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs font-bold text-slate-500 uppercase">${lead.company_name}</span>
          <span class="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-900">$${Number(lead.project_value).toLocaleString()}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm mb-3 leading-snug">${lead.project_title}</h4>
        <div class="flex justify-between items-center mt-4 pt-3 border-t border-slate-200">
          <div class="flex -space-x-2">
            <img class="w-6 h-6 rounded-full border border-vt-navy" src="https://ui-avatars.com/api/?name=${encodeURIComponent(lead.company_name)}&background=random">
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
  if(!tbody) return;
  tbody.innerHTML = '';
  
  clientsData.forEach(client => {
    let statusBadge = client.pipeline_status === 'won' 
        ? `<span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold">Active</span>`
        : `<span class="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold">Onboarding</span>`;
        
    tbody.innerHTML += `
      <tr class="border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-vt-blue" onclick="showOnboarding('${client.company_name}')">
        <td class="py-4 pl-6 pr-4">
          <div class="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(client.company_name)}&background=random" class="w-8 h-8 rounded-full border border-slate-200">
            <div>
              <p class="font-bold text-slate-900">${client.company_name}</p>
              <p class="text-xs text-slate-500">Added: ${new Date(client.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </td>
        <td class="py-4 px-4 text-slate-600">
          <p class="text-slate-900">${client.contact_name}</p>
        </td>
        <td class="py-4 px-4 text-slate-600">${client.project_title}</td>
        <td class="py-4 pl-4 pr-6">${statusBadge}</td>
      </tr>
    `;
  });
}

function renderInvoicesTable(invoices) {
  const tbody = document.getElementById('invoices-tbody');
  if(!tbody) return;
  tbody.innerHTML = '';
  
  invoices.forEach(inv => {
    let badge = `<span class="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold uppercase">Pending</span>`;
    let dateColor = "text-slate-300";
    if(inv.status === 'paid') {
        badge = `<span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold uppercase">Paid</span>`;
    } else if (inv.status === 'overdue') {
        badge = `<span class="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold uppercase">Overdue</span>`;
        dateColor = "text-red-400 font-bold";
    }
    
    tbody.innerHTML += `
      <tr class="border-b border-slate-200 hover:bg-slate-100 transition-colors">
        <td class="py-4 pl-6 pr-4 font-mono text-slate-600">${inv.invoice_number}</td>
        <td class="py-4 px-4 font-bold text-slate-900">${inv.company_name}</td>
        <td class="py-4 px-4 text-slate-900 font-medium">$${Number(inv.amount).toLocaleString()}</td>
        <td class="py-4 px-4 ${dateColor}">${new Date(inv.due_date).toLocaleDateString()}</td>
        <td class="py-4 pl-4 pr-6">${badge}</td>
      </tr>
    `;
  });
}

function renderQuotationsTable(quotes) {
  const list = document.getElementById('quotes-list');
  if(!list) return;
  list.innerHTML = '';
  
  quotes.forEach(quote => {
    let badgeColor = quote.status === 'accepted' ? 'emerald' : 'blue';
    
    list.innerHTML += `
      <div class="p-4 rounded-xl border border-slate-200 bg-white/[0.02] hover:bg-slate-100 transition-colors cursor-pointer border-l-4 border-l-${badgeColor}-500">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-slate-900 text-sm">${quote.company_name}</h3>
          <span class="text-xs font-bold text-slate-500">${quote.quote_number}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-black text-slate-900">$${Number(quote.total).toLocaleString()}</span>
          <span class="bg-${badgeColor}-500/20 text-${badgeColor}-400 px-2 py-1 rounded text-[10px] font-bold uppercase">${quote.status}</span>
        </div>
      </div>
    `;
  });
}

// --- DRAG AND DROP LOGIC ---
function allowDrop(ev) {
  ev.preventDefault();
}
function dragEnter(ev) {
  if(ev.target.classList.contains('glass-panel')) {
    ev.target.classList.add('drag-over');
  }
}
function dragLeave(ev) {
  if(ev.target.classList.contains('glass-panel')) {
    ev.target.classList.remove('drag-over');
  }
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
async function drop(ev, newStatus) {
  ev.preventDefault();
  document.querySelectorAll('.glass-panel').forEach(el => el.classList.remove('drag-over'));
  
  const leadElementId = ev.dataTransfer.getData("text");
  if(!leadElementId) return;
  const leadId = leadElementId.replace('lead-', '');
  
  // Optimistic UI Update
  const lead = clientsData.find(l => l.id == leadId);
  if(lead && lead.pipeline_status !== newStatus) {
    lead.pipeline_status = newStatus;
    renderKanban();
    
    // Push update to DB
    try {
      await fetch(`${API_BASE}/clients/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error("Failed to update status", err);
      fetchClients(); // Revert on fail
    }
  }
}

let currentOnboardingClientId = null;

async function showOnboarding(companyName) {
    const client = clientsData.find(c => c.company_name === companyName);
    if(!client) return;
    
    currentOnboardingClientId = client.id;
    document.getElementById('onboarding-company-name').textContent = companyName;
    document.getElementById('onboarding-sidebar').classList.remove('translate-x-full');
    
    // Fetch tasks
    try {
        const res = await fetch(`${API_BASE}/clients/${client.id}/onboarding`);
        const json = await res.json();
        if(json.success) {
            renderOnboardingTasks(json.data);
        }
    } catch(err) {
        console.error("Failed to fetch onboarding tasks", err);
    }
}

function closeOnboarding() {
    document.getElementById('onboarding-sidebar').classList.add('translate-x-full');
}

function renderOnboardingTasks(tasks) {
    const container = document.getElementById('onboarding-tasks-container');
    if(!container) return;
    container.innerHTML = '';
    
    if(tasks.length === 0) {
        container.innerHTML = '<p class="text-sm text-slate-500 italic">No onboarding tasks found. Move the client to Closed Won to generate default tasks.</p>';
        document.getElementById('onboarding-progress-bar').style.width = '0%';
        document.getElementById('onboarding-progress-text').textContent = '0%';
        return;
    }

    let completed = 0;
    tasks.forEach(task => {
        if(task.is_completed) completed++;
        
        const checkedAttr = task.is_completed ? 'checked' : '';
        const textStyle = task.is_completed ? 'text-slate-400 line-through' : 'text-slate-700';
        
        container.innerHTML += `
            <label class="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-vt-blue cursor-pointer transition-colors">
                <input type="checkbox" ${checkedAttr} onchange="toggleTask(${task.id}, this.checked)" class="mt-1 w-4 h-4 text-vt-blue rounded border-slate-300 focus:ring-vt-blue">
                <span class="text-sm font-medium ${textStyle}">${task.task_name}</span>
            </label>
        `;
    });
    
    const pct = Math.round((completed / tasks.length) * 100);
    document.getElementById('onboarding-progress-bar').style.width = `${pct}%`;
    document.getElementById('onboarding-progress-text').textContent = `${pct}%`;
}

async function toggleTask(taskId, isCompleted) {
    try {
        await fetch(`${API_BASE}/clients/onboarding/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_completed: isCompleted ? 1 : 0 })
        });
        // Refresh
        if(currentOnboardingClientId) {
            const res = await fetch(`${API_BASE}/clients/${currentOnboardingClientId}/onboarding`);
            const json = await res.json();
            if(json.success) renderOnboardingTasks(json.data);
        }
    } catch(err) {
        console.error("Failed to toggle task", err);
    }
}

// --- MODALS AND FORMS LOGIC ---
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if(!modal) return;
    if(show) {
        modal.classList.remove('hidden');
        populateClientDropdowns();
    } else {
        modal.classList.add('hidden');
    }
}

function populateClientDropdowns() {
    const options = clientsData.map(c => `<option value="${c.id}">${c.company_name}</option>`).join('');
    const quoteSelect = document.getElementById('quote-client');
    const invoiceSelect = document.getElementById('invoice-client');
    const taskSelect = document.getElementById('task-client');
    if(quoteSelect) quoteSelect.innerHTML = options;
    if(invoiceSelect) invoiceSelect.innerHTML = options;
    if(taskSelect) taskSelect.innerHTML = options;
}

async function submitQuote() {
    const payload = {
        client_id: document.getElementById('quote-client').value,
        quote_number: document.getElementById('quote-number').value,
        valid_until: document.getElementById('quote-date').value,
        subtotal: document.getElementById('quote-amount').value,
        tax: 0,
        total: document.getElementById('quote-amount').value,
        line_items: [{description: "Custom Development Services", qty: 1, price: document.getElementById('quote-amount').value, total: document.getElementById('quote-amount').value}]
    };
    try {
        await fetch(`${API_BASE}/quotations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        toggleModal('modal-quote', false);
        fetchQuotations(); // Refresh
    } catch(err) {
        console.error("Failed to create quote", err);
    }
}

async function submitInvoice() {
    const payload = {
        client_id: document.getElementById('invoice-client').value,
        invoice_number: document.getElementById('invoice-number').value,
        due_date: document.getElementById('invoice-date').value,
        amount: document.getElementById('invoice-amount').value
    };
    try {
        await fetch(`${API_BASE}/invoices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        toggleModal('modal-invoice', false);
        fetchInvoices(); // Refresh
    } catch(err) {
        console.error("Failed to create invoice", err);
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
        await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        toggleModal('modal-task', false);
        fetchTasks(); // Refresh
    } catch(err) {
        console.error("Failed to create task", err);
    }
}

// --- FETCH TASKS LOGIC ---
let tasksData = [];
async function fetchTasks() {
    try {
        const res = await fetch(`${API_BASE}/tasks`);
        const json = await res.json();
        if (json.success) {
            tasksData = json.data;
            renderTasks();
        }
    } catch (err) {
        console.error("Failed to fetch tasks", err);
    }
}

function renderTasks() {
    // Render in the Dashboard
    const dashContainer = document.getElementById('dashboard-tasks-list');
    // Render in Emails module
    const moduleContainer = document.getElementById('module-tasks-list');
    
    if (!tasksData.length) {
        const emptyHtml = '<p class="text-sm text-slate-500 italic p-4">No pending follow-ups.</p>';
        if(dashContainer) dashContainer.innerHTML = emptyHtml;
        if(moduleContainer) moduleContainer.innerHTML = emptyHtml;
        return;
    }

    const tasksHtml = tasksData.map(task => {
        const date = new Date(task.due_date).toLocaleDateString();
        const icon = task.type === 'email' ? 'envelope' : task.type === 'meeting' ? 'calendar-alt' : 'phone';
        return `
          <div class="p-4 border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-vt-blue">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-bold text-slate-900 text-sm"><i class="fas fa-${icon} text-slate-400 mr-2"></i>${task.company_name}</h3>
              <span class="text-xs font-bold text-slate-500">${date}</span>
            </div>
            <p class="text-xs font-bold text-slate-600 mb-1">${task.title}</p>
            <p class="text-[10px] text-slate-500 truncate">${task.description || 'No description provided.'}</p>
          </div>
        `;
    }).join('');

    if(dashContainer) dashContainer.innerHTML = tasksHtml;
    if(moduleContainer) moduleContainer.innerHTML = tasksHtml;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('kanban-board') || document.getElementById('clients-tbody') || document.getElementById('quote-client')) {
    fetchClients();
  }
  if(document.getElementById('invoices-tbody')) {
    fetchInvoices();
  }
  if(document.getElementById('quotes-list')) {
    fetchQuotations();
  }
  if(document.getElementById('dashboard-tasks-list') || document.getElementById('module-tasks-list')) {
    fetchTasks();
  }
});
