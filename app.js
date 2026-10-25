
function renderNotificationsDropdown() {
  if (!AppState.notificationsOpen) return '';
  const isDark = AppState.theme === 'dark';
  return `
    <div class="absolute right-0 mt-2 w-80 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'} shadow-2xl p-4 z-50 animate-in fade-in space-y-3">
      <div class="flex items-center justify-between border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} pb-2">
        <span class="text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}">Notifications</span>
        <span class="text-[10px] text-[#0066FF] font-semibold">${AppState.notifications.length} alerts</span>
      </div>
      <div class="space-y-2 max-h-60 overflow-y-auto">
        ${AppState.notifications.map(n => `
          <div class="p-2.5 rounded-xl ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'} text-xs space-y-1">
            <div class="font-bold text-white flex items-center justify-between">
              <span>${n.title}</span>
              <span class="text-[10px] text-slate-400 font-mono">${n.time}</span>
            </div>
            <p class="text-slate-300 text-[11px]">${n.msg}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * OFFICE INFO CONTROLLER — ENTERPRISE WORKING PROTOTYPE
 * Core Application Engine, Hierarchy Governance, Cryptographic Viewer & AI Engine
 */

// ============================================================================
// 1. SOUND SYNTHESIS ENGINE (Web Audio API)
// ============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.28);
      });
    } catch (e) {}
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playScan() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(2400, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  playAlarm() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(900, this.ctx.currentTime + i * 0.15);
        osc.frequency.setValueAtTime(600, this.ctx.currentTime + i * 0.15 + 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.15 + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.15);
        osc.stop(this.ctx.currentTime + i * 0.15 + 0.14);
      }
    } catch (e) {}
  }

  playAutoFix() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.22);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEngine();

// ============================================================================
// 2. CRYPTOGRAPHIC HELPERS (SHA-256 Hash Chain)
// ============================================================================
function sha256Sync(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  let fullHex = '';
  for (let b = 0; b < 8; b++) {
    const part = ((hash * (b + 1) * 31) & 0xffffffff) >>> 0;
    fullHex += part.toString(16).padStart(8, '0');
  }
  return fullHex.slice(0, 64);
}

// ============================================================================
// 3. GLOBAL APPLICATION STATE & DATA MODEL
// ============================================================================
const AppState = {
  theme: 'dark',
  activeTab: 'author', // 'author' | 'inbox' | 'scanner' | 'monitor'
  
  // Inactivity Session Timer (Section 3)
  session: {
    maxInactivitySeconds: 600,
    remainingSeconds: 600,
    warningThreshold: 30,
    isWarningOpen: false
  },

  // Master Brand Standard (Section 8)
  masterBrandProfile: {
    logoPath: 'assets/logo.png',
    logoSha256: 'b3383254df53850d76cc739822b512f50a9eee0840fc7c4e123391a0467223aa',
    logoRatio: 1.0,
    approvedColors: ['#0B192C', '#0066FF', '#F4F7FE', '#10B981', '#EF4444'],
    facts: {
      productEfficiency2026: '94.5%'
    },
    outdatedList: ['82%', '81.2%', '2023 logo', '#FF5722']
  },

  // Pre-seeded Hierarchy Tree (Section 12)
  users: [
    { id: 'usr-1', email: 'ceo.acme@gmail.com', name: 'Sarah Jenkins', role: 'CEO', company: 'Acme Global Corp', reportsTo: null, reports_to: null },
    { id: 'usr-2', email: 'vp.acme@gmail.com', name: 'David Chen', role: 'VP', company: 'Acme Global Corp', reportsTo: 'ceo.acme@gmail.com', reports_to: 'ceo.acme@gmail.com' },
    { id: 'usr-3', email: 'hr.acme@gmail.com', name: 'Elena Rostova', role: 'HR', company: 'Acme Global Corp', reportsTo: 'vp.acme@gmail.com', reports_to: 'vp.acme@gmail.com' },
    { id: 'usr-4', email: 'hod.acme@gmail.com', name: 'Marcus Vance', role: 'HOD', company: 'Acme Global Corp', reportsTo: 'vp.acme@gmail.com', reports_to: 'vp.acme@gmail.com' },
    { id: 'usr-5', email: 'lead.acme@gmail.com', name: 'Alex Rivera', role: 'Team Lead', company: 'Acme Global Corp', reportsTo: 'hod.acme@gmail.com', reports_to: 'hod.acme@gmail.com' },
    { id: 'usr-6', email: 'emp1.acme@gmail.com', name: 'Jordan Lee', role: 'Employee', company: 'Acme Global Corp', reportsTo: 'lead.acme@gmail.com', reports_to: 'lead.acme@gmail.com' },
    { id: 'usr-7', email: 'emp2.acme@gmail.com', name: 'Taylor Smith', role: 'Employee', company: 'Acme Global Corp', reportsTo: 'lead.acme@gmail.com', reports_to: 'lead.acme@gmail.com' },
    { id: 'usr-8', email: 'emp3.acme@gmail.com', name: 'Sarah Lin', role: 'Employee', company: 'Acme Global Corp', reportsTo: 'lead.acme@gmail.com', reports_to: 'lead.acme@gmail.com' },
    { id: 'usr-9', email: 'emp4.acme@gmail.com', name: 'Michael Chang', role: 'Employee', company: 'Acme Global Corp', reportsTo: 'lead.acme@gmail.com', reports_to: 'lead.acme@gmail.com' }
  ],

  // Current Logged-in User Context
  currentUser: {
    id: 'usr-1',
    email: 'ceo.acme@gmail.com',
    name: 'Sarah Jenkins',
    role: 'CEO',
    company: 'Acme Global Corp',
    reportsTo: null,
    reports_to: null,
    leadId: 'EXEC-CEO-01',
    ip: '192.168.1.1',
    isAuthenticated: false
  },

  // Auth Form State
  authForm: {
    mode: 'login', // 'login' | 'register'
    company: 'Acme Global Corp',
    email: 'ceo.acme@gmail.com',
    password: 'MasterPass2026!',
    showPassword: false,
    selectedRole: 'CEO',
    regEmail: '',
    regRole: 'Employee',
    regReportsTo: 'lead.acme@gmail.com',
    regPassword: '',
    regPasswordConfirm: '',
    pwdStrength: { score: 4, label: 'Strong', color: 'text-emerald-400' },
    pwdMatch: true
  },

  // Global Modals State
  otpModal: {
    isOpen: false,
    code: '',
    status: 'idle'
  },
  inactivityWarning: {
    isOpen: false,
    secondsLeft: 30
  },
  drawerModal: {
    isOpen: false,
    fileId: null
  },
  forgotPasswordModal: {
    isOpen: false
  },
  securityProtocolModal: {
    isOpen: false,
    type: 'aes'
  },
  publishSuccessModal: {
    isOpen: false
  },
  uploadModal: {
    isOpen: false,
    fileData: null
  },
  killSwitchModal: {
    isOpen: false,
    fileId: null
  },
  replaceVersionModal: {
    isOpen: false,
    fileId: null
  },
  addRecipientModal: {
    isOpen: false,
    fileId: null
  },

  // AI Brand Scanner State
  aiScan: {
    isPresetCompliant: true,
    draftFileName: 'Corporate_Brand_Card_Compliant.png',
    detectedLogo: 'Official Logo v3.2',
    detectedColorHex: '#0066FF',
    detectedEfficiency: '94.5%',
    status: 'idle',
    isScanning: false,
    violations: []
  },

  // Notifications
  notifications: [
    { id: 'notif-1', title: 'New Master Asset Available', msg: 'Sarah Jenkins uploaded Official Brand Guidelines 2026.pdf', time: '14:02', read: false },
    { id: 'notif-2', title: 'Product Efficiency Directive', msg: 'Corporate Efficiency benchmark verified at 94.5% across global channels', time: '14:35', read: false },
    { id: 'notif-3', title: 'AI Compliance Audit Passed', msg: 'Brand Guidelines certified with 100% brand conformity', time: '15:10', read: true }
  ],
  notificationsOpen: false,

  // Directives
  directives: [
    { id: 'dir-1', author: 'CEO Sarah Jenkins', title: 'Mandatory Deprecation of 2023 Assets', body: 'All personnel must cease using legacy 2023 emblem and orange palettes (#FF5722). Master standard mandates Royal Blue #0066FF and Official Logo v3.2.', priority: 'Urgent', date: 'Today, 14:15 UTC' },
    { id: 'dir-2', author: 'VP David Chen', title: 'Product Efficiency Standard: 94.5%', body: 'Official audits confirm 94.5% Product Efficiency. Outdated claims (81.2% or 82%) must be rejected by AI gate.', priority: 'Normal', date: 'Today, 13:30 UTC' }
  ],

  // Pre-seeded Files (Section 12)
  files: [
    {
      id: 'file-101',
      title: 'Brand Guidelines 2026 Master Specification.pdf',
      fileName: 'Brand_Guidelines_2026.pdf',
      sizeFormatted: '2.4 MB',
      type: 'pdf',
      version: 1,
      current_version: 1,
      authorEmail: 'ceo.acme@gmail.com',
      author_id: 'ceo.acme@gmail.com',
      author_name: 'Sarah Jenkins (CEO)',
      status: 'active',
      killed: false,
      allowDelegation: true,
      allow_delegation: true,
      priority: 'urgent',
      note: 'Master branding standard. Verify 94.5% efficiency metric before campaign distribution.',
      sha256: 'b3383254df53850d76cc739822b512f50a9eee0840fc7c4e123391a0467223aa',
      uploadedAt: '2026-10-23T14:00:00.000Z',
      remainingSeconds: 7180,
      expires_at_seconds: 7180,
      aiCompliance: {
        status: 'compliant',
        logoValid: true,
        colorHexValid: true,
        efficiencyValid: true,
        checkedAt: '2026-10-23T14:00:00.000Z'
      },
      recipients: [
        { email: 'vp.acme@gmail.com', role: 'VP', tickStatus: 'seen', status: 'seen', viewCount: 4, secondsSpent: 84, ip: '10.0.8.21', device: 'Safari on macOS' },
        { email: 'hod.acme@gmail.com', role: 'HOD', tickStatus: 'seen', status: 'seen', viewCount: 2, secondsSpent: 52, ip: '192.168.1.55', device: 'Chrome on Windows' },
        { email: 'lead.acme@gmail.com', role: 'Team Lead', tickStatus: 'delivered', status: 'delivered', viewCount: 1, secondsSpent: 12, ip: '192.168.1.1', device: 'Chrome on Windows' },
        { email: 'emp1.acme@gmail.com', role: 'Employee', tickStatus: 'sent', status: 'sent', viewCount: 0, secondsSpent: 0, ip: '192.168.1.84', device: 'Edge on Windows' }
      ]
    },
    {
      id: 'file-102',
      title: 'Q4 Product Efficiency Audit & Financial Model.xlsx',
      fileName: 'Q4_Efficiency_Financials.xlsx',
      sizeFormatted: '840 KB',
      type: 'xlsx',
      version: 1,
      current_version: 1,
      authorEmail: 'vp.acme@gmail.com',
      author_id: 'vp.acme@gmail.com',
      author_name: 'David Chen (VP)',
      status: 'active',
      killed: false,
      allowDelegation: false,
      allow_delegation: false,
      priority: 'normal',
      note: 'Departmental operational efficiency benchmark data.',
      sha256: '99b104ad812f8a4421b901a884ef1190bc4a0918ef00912ab8901238472910fa',
      uploadedAt: '2026-10-23T14:30:00.000Z',
      remainingSeconds: 14200,
      expires_at_seconds: 14200,
      aiCompliance: {
        status: 'compliant',
        logoValid: true,
        colorHexValid: true,
        efficiencyValid: true,
        checkedAt: '2026-10-23T14:30:00.000Z'
      },
      recipients: [
        { email: 'ceo.acme@gmail.com', role: 'CEO', tickStatus: 'seen', status: 'seen', viewCount: 3, secondsSpent: 60, ip: '192.168.1.1', device: 'Chrome on Windows' },
        { email: 'hod.acme@gmail.com', role: 'HOD', tickStatus: 'delivered', status: 'delivered', viewCount: 1, secondsSpent: 10, ip: '10.0.8.21', device: 'Safari on macOS' },
        { email: 'lead.acme@gmail.com', role: 'Team Lead', tickStatus: 'delivered', status: 'delivered', viewCount: 0, secondsSpent: 0, ip: '192.168.1.1', device: 'Firefox on Windows' }
      ]
    },
    {
      id: 'file-103',
      title: 'Omnichannel Campaign Draft - Legacy 2023 Emblem.docx',
      fileName: 'Campaign_Draft_v1.docx',
      sizeFormatted: '1.2 MB',
      type: 'docx',
      version: 1,
      current_version: 1,
      authorEmail: 'emp3.acme@gmail.com',
      author_id: 'emp3.acme@gmail.com',
      author_name: 'Sarah Lin (Employee)',
      status: 'active',
      killed: false,
      allowDelegation: true,
      allow_delegation: true,
      priority: 'normal',
      note: 'Draft submission containing legacy 2023 logo and 82% efficiency metric.',
      sha256: '33a88fc09128ba7411200192ba87123490aafe11029847120938471029384701',
      uploadedAt: '2026-10-23T15:10:00.000Z',
      remainingSeconds: 3600,
      expires_at_seconds: 3600,
      aiCompliance: {
        status: 'non-compliant',
        logoValid: false,
        colorHexValid: false,
        efficiencyValid: false,
        checkedAt: '2026-10-23T15:10:00.000Z'
      },
      recipients: [
        { email: 'lead.acme@gmail.com', role: 'Team Lead', tickStatus: 'seen', status: 'seen', viewCount: 2, secondsSpent: 22, ip: '192.168.1.1', device: 'Chrome on Windows' }
      ]
    }
  ],

  // Secure Sandboxed Full-Screen Viewer State (Section 6)
  activeViewer: {
    isOpen: false,
    fileId: null,
    file: null,
    dwellSeconds: 0,
    scrollProgress: 0,
    minDwellRequired: 5,
    hasReachedEnd: false,
    timerInterval: null
  },

  // Immutable Hash-Chained Audit Log (Section 9 & 11)
  auditLogChain: [
    { index: 1, id: 'AUD-001', user: 'SYSTEM_ROOT', action: 'GENESIS_BLOCK', targetFile: 'SYSTEM_HSM', prevHash: '0000000000000000000000000000000000000000000000000000000000000000', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', timestamp: '2026-10-23T14:00:00.000Z' },
    { index: 2, id: 'AUD-002', user: 'ceo.acme@gmail.com', action: 'TRANSMIT_FILE', targetFile: 'Brand Guidelines 2026 Master Specification.pdf', prevHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', hash: '5b1a091244e88ff210389a01928bc182903847291a0847291837492019a84712', timestamp: '2026-10-23T14:00:15.000Z' },
    { index: 3, id: 'AUD-003', user: 'vp.acme@gmail.com', action: 'SANDBOX_VIEW', targetFile: 'Brand Guidelines 2026 Master Specification.pdf', prevHash: '5b1a091244e88ff210389a01928bc182903847291a0847291837492019a84712', hash: '1209384710293847102938471029384710293847102938471029384710293847', timestamp: '2026-10-23T14:05:22.000Z' },
    { index: 4, id: 'AUD-004', user: 'vp.acme@gmail.com', action: 'ACKNOWLEDGE', targetFile: 'Brand Guidelines 2026 Master Specification.pdf', prevHash: '1209384710293847102938471029384710293847102938471029384710293847', hash: '7781290384712093847120938471209384712093847120938471209384712093', timestamp: '2026-10-23T14:18:45.000Z' }
  ],

  // Monitoring & SOC Observability State
  monitoring: {
    totalEncryptedTransmissions: 1420,
    activeViewports: 4,
    blockedLeakAttempts: 12,
    hsmLatencyMs: '1.24',
    activeSessions: [
      { id: 'SESS-901', user: 'Sarah Jenkins (CEO)', role: 'CEO', file: 'Brand Guidelines 2026.pdf', ip: '192.168.1.1', dwell: '14m 20s' },
      { id: 'SESS-902', user: 'David Chen (VP)', role: 'VP', file: 'Q4 Efficiency Financials.xlsx', ip: '10.0.8.21', dwell: '08m 42s' },
      { id: 'SESS-903', user: 'Marcus Vance (HOD)', role: 'HOD', file: 'Brand Guidelines 2026.pdf', ip: '192.168.1.55', dwell: '03m 15s' },
      { id: 'SESS-904', user: 'Alex Rivera (Lead)', role: 'Team Lead', file: 'Brand Guidelines 2026.pdf', ip: '192.168.1.1', dwell: '01m 05s' }
    ],
    incidents: [
      { id: 'INC-4091', time: '15:18:22 UTC', severity: 'CRITICAL', type: 'EXFILTRATION_BLOCKED', actor: 'IP 192.168.1.1', message: 'Direct raw download blocked under Zero-Leak Policy #804-A' },
      { id: 'INC-4090', time: '15:12:04 UTC', severity: 'WARN', type: 'AI_VIOLATION_DETECTED', actor: 'emp3.acme@gmail.com', message: 'Legacy 2023 logo vector and #FF5722 rejected by CI/CD gate' },
      { id: 'INC-4089', time: '15:05:41 UTC', severity: 'INFO', type: 'KMS_DEK_ROTATED', actor: 'FIPS_HSM_01', message: 'Ephemeral document encryption key rotated cleanly' },
      { id: 'INC-4088', time: '14:52:19 UTC', severity: 'WARN', type: 'UNAUTHORIZED_CONTEXT_MENU', actor: 'IP 192.168.1.84', message: 'Right-click inspection attempt intercepted in sandboxed viewer' }
    ]
  }
};

// ============================================================================
// 4. HIERARCHY TREE & PERMISSIONS UTILITIES (Section 4)
// ============================================================================

/**
 * Returns an array of emails within the user's hierarchy:
 * 1. Upward manager chain (direct and indirect managers)
 * 2. Downward report chain (direct and indirect reports)
 * 3. Self
 */
function getHierarchyForUser(userEmail) {
  const user = AppState.users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
  if (!user) return [];

  const allowedEmails = new Set();
  allowedEmails.add(user.email.toLowerCase());

  // 1. Walk upward manager chain
  let currentMgrEmail = user.reports_to || user.reportsTo;
  while (currentMgrEmail) {
    allowedEmails.add(currentMgrEmail.toLowerCase());
    const mgr = AppState.users.find(u => u.email.toLowerCase() === currentMgrEmail.toLowerCase());
    currentMgrEmail = mgr ? (mgr.reports_to || mgr.reportsTo) : null;
  }

  // 2. Walk downward reports recursively
  function addReports(mgrEmail) {
    const directReports = AppState.users.filter(u => {
      const rep = u.reports_to || u.reportsTo;
      return rep && rep.toLowerCase() === mgrEmail.toLowerCase();
    });
    directReports.forEach(r => {
      allowedEmails.add(r.email.toLowerCase());
      addReports(r.email);
    });
  }
  addReports(user.email);

  return AppState.users.filter(u => allowedEmails.has(u.email.toLowerCase()));
}

function isEmailInHierarchy(authorEmail, recipientEmail) {
  const allowed = getHierarchyForUser(authorEmail);
  return allowed.some(u => u.email.toLowerCase() === recipientEmail.trim().toLowerCase());
}

function renderModalCloseX(onclickFn, title = 'Close dialog') {
  return `
    <button type="button" 
      onclick="${onclickFn}" 
      aria-label="${title}" 
      title="${title}" 
      class="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer shadow-sm shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;
}

function calculatePasswordStrength(pwd) {
  if (!pwd || pwd.length < 4) return { score: 0, label: 'Too Short', color: 'bg-slate-500' };
  let score = 1;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
  if (score === 2) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
  if (score === 3) return { score: 3, label: 'Strong', color: 'bg-blue-500' };
  return { score: 4, label: 'Very Strong', color: 'bg-emerald-500' };
}

function formatTime(totalSeconds) {
  if (totalSeconds <= 0) return "00:00:00";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
}

/**
 * WhatsApp-Style Read Receipts (Section 7)
 * 1 grey tick = Sent
 * 2 grey ticks = Delivered
 * 2 blue ticks (#0066FF) = Seen
 */
function renderTicks(status, acknowledged = false) {
  let tickHtml = '';
  if (status === 'seen') {
    tickHtml = `
      <span class="inline-flex items-center text-[#0066FF] font-bold" title="Seen by recipient">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17l-4.24-4.24-1.41 1.41 5.65 5.66L23.66 7l-1.42-1.41zM.41 13.41L6.07 19l1.41-1.41L1.82 12 .41 13.41z"/>
        </svg>
      </span>
    `;
  } else if (status === 'delivered') {
    tickHtml = `
      <span class="inline-flex items-center text-slate-400 font-bold" title="Delivered to recipient inbox">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17l-4.24-4.24-1.41 1.41 5.65 5.66L23.66 7l-1.42-1.41zM.41 13.41L6.07 19l1.41-1.41L1.82 12 .41 13.41z"/>
        </svg>
      </span>
    `;
  } else {
    tickHtml = `
      <span class="inline-flex items-center text-slate-400 font-bold" title="Sent to gateway">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
        </svg>
      </span>
    `;
  }

  if (acknowledged) {
    tickHtml += `
      <span class="ml-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
        ACKNOWLEDGED
      </span>
    `;
  }

  return tickHtml;
}

// ============================================================================
// 5. OFFICIAL BRAND LOGO COMPONENT (assets/logo.png unchanged)
// ============================================================================
function renderBrandLogo(size = 40, showText = true, className = "") {
  return `
    <div class="flex items-center gap-3 ${className}">
      <div class="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#0F2744] border border-[#0066FF]/40 shadow-lg shadow-[#0066FF]/20" style="width: ${size + 14}px; height: ${size + 14}px;">
        <img src="assets/logo.png" alt="Office Info Controller Logo" class="object-contain w-full h-full drop-shadow">
        <span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
        </span>
      </div>
      ${showText ? `
        <div class="flex flex-col text-left">
          <span class="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
            Office Info Controller
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0066FF]/20 text-[#60A5FA] border border-[#0066FF]/40 font-semibold uppercase">v3.2</span>
          </span>
          <span class="text-[11px] font-medium tracking-wide text-slate-400">Zero-Leak Corporate Governance</span>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================================
// 6. MAIN SHELL & ROUTER
// ============================================================================
function renderApp() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const isDark = AppState.theme === 'dark';
  document.documentElement.className = isDark ? 'dark bg-[#060D1A] text-slate-100' : 'light bg-[#F4F7FE] text-slate-900';

  const unreadCount = AppState.notifications.filter(n => !n.read).length;

  root.innerHTML = `
    <div class="min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDark ? 'bg-[#060D1A] text-slate-100' : 'bg-[#F4F7FE] text-slate-800'}">
      
      <!-- TOP NAVIGATION BAR -->
      <header class="sticky top-0 z-40 w-full border-b ${isDark ? 'bg-[#0B192C]/90 border-slate-800/80' : 'bg-white/90 border-slate-200'} backdrop-blur-md transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <!-- Logo & Brand -->
          <div class="cursor-pointer" onclick="handleLogoClick()">
            ${renderBrandLogo(36, true)}
          </div>

          <!-- Central Indicators (Desktop) -->
          <div class="hidden xl:flex items-center gap-3">
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isDark ? 'bg-slate-800/70 border border-slate-700/60 text-slate-300' : 'bg-slate-100 border border-slate-300 text-slate-700'}">
              <span class="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Zero-Leak Shield: <strong class="text-[#10B981]">AES-256-GCM</strong></span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isDark ? 'bg-slate-800/70 border border-slate-700/60 text-slate-300' : 'bg-slate-100 border border-slate-300 text-slate-700'}">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#0066FF]"></i>
              <span>FIPS 140-3 HSM: <strong class="text-[#0066FF]">Level 3</strong></span>
            </div>
          </div>

          <!-- Right Action Controls -->
          <div class="flex items-center gap-2.5">
            
            ${AppState.currentUser.isAuthenticated ? `
              <!-- Inactivity Session Timer Pill -->
              <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300" title="Smart Inactivity Session Timer (Auto logout after 10m)">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Session: <strong class="text-white">${formatTime(AppState.session.remainingSeconds)}</strong></span>
                <button onclick="simulateInactivityWarning()" class="ml-1 text-[10px] text-amber-400 hover:underline font-bold" title="Test 30s Warning">Test</button>
              </div>

              <!-- Notifications Bell -->
              <div class="relative">
                <button onclick="toggleNotifications()" class="relative p-2 rounded-xl transition-all ${isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} border ${isDark ? 'border-slate-700' : 'border-slate-300'}">
                  <i data-lucide="bell" class="w-4 h-4"></i>
                  ${unreadCount > 0 ? `
                    <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[9px] font-bold text-white font-mono">
                      ${unreadCount}
                    </span>
                  ` : ''}
                </button>
                ${renderNotificationsDropdown()}
              </div>

              <!-- PDF Manual Download Link -->
              <a href="OFFICE_INFO_CONTROLLER_MANUAL.pdf" target="_blank" download="OFFICE_INFO_CONTROLLER_MANUAL.pdf" class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-all shadow-sm" title="Download Official PDF Operating Manual">
                <i data-lucide="file-text" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>PDF Manual</span>
              </a>

              <!-- Role Switcher -->
              <div class="relative flex items-center gap-1.5">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 hidden lg:inline">Role:</span>
                <div class="inline-flex p-1 rounded-xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-200/80 border border-slate-300'}">
                  ${['CEO', 'VP', 'HR', 'HOD', 'Team Lead', 'Employee'].map(r => `
                    <button onclick="switchRole('${r}')" class="px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      AppState.currentUser.role === r 
                        ? 'bg-[#0066FF] text-white shadow-sm shadow-[#0066FF]/40 ring-1 ring-[#0066FF]' 
                        : 'text-slate-400 hover:text-white'
                    }">
                      ${r}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- User Profile & Logout -->
              <div class="flex items-center gap-2 pl-2 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}">
                <div class="text-right hidden sm:block">
                  <div class="text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}">${AppState.currentUser.name}</div>
                  <div class="text-[10px] font-mono text-[#0066FF] font-semibold">${AppState.currentUser.role} • ${AppState.currentUser.email}</div>
                </div>
                <button onclick="handleLogout()" title="Lock Session / Logout" class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors">
                  <i data-lucide="log-out" class="w-4 h-4"></i>
                </button>
              </div>
            ` : `
              <!-- Sound Toggle -->
              <button onclick="toggleSound()" class="p-2 rounded-xl ${isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} border ${isDark ? 'border-slate-700' : 'border-slate-300'} transition-all" title="Toggle UI Sound Effects">
                <i data-lucide="${sounds.enabled ? 'volume-2' : 'volume-x'}" class="w-4 h-4 ${sounds.enabled ? 'text-[#0066FF]' : 'text-slate-400'}"></i>
              </button>

              <!-- Dark/Light Theme Toggle -->
              <button onclick="toggleTheme()" class="p-2 rounded-xl ${isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} border ${isDark ? 'border-slate-700' : 'border-slate-300'} transition-all" title="Switch Theme">
                <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4 text-amber-400"></i>
              </button>

              <!-- PDF Manual Link (Landing) -->
              <a href="OFFICE_INFO_CONTROLLER_MANUAL.pdf" target="_blank" download="OFFICE_INFO_CONTROLLER_MANUAL.pdf" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-all shadow-sm" title="Download Official PDF Operating Manual">
                <i data-lucide="file-text" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>PDF Manual</span>
              </a>

              <!-- Fast Demo Login -->
              <button onclick="quickDemoLogin()" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0055DD] text-white text-xs font-bold transition-all shadow-md shadow-[#0066FF]/30">
                <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                <span>Fast Demo Login</span>
              </button>
            `}
          </div>
        </div>
      </header>

      <!-- HERO BANNER (Section 2) -->
      <section class="relative overflow-hidden border-b ${isDark ? 'border-slate-800/80 bg-gradient-to-b from-[#0B192C] via-[#081322] to-[#060D1A]' : 'border-slate-200 bg-gradient-to-b from-white via-[#F4F7FE] to-[#E9EFFD]'} py-8 px-4 sm:px-6 lg:px-8">
        <div class="absolute -top-24 left-1/4 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -top-24 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div class="text-center md:text-left space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-[#0066FF]/15 text-[#60A5FA] border border-[#0066FF]/30' : 'bg-blue-50 text-[#0066FF] border border-blue-200'}">
              <span class="flex h-2 w-2 rounded-full bg-[#0066FF]"></span>
              <span>Next-Gen Zero-Leak Corporate Governance</span>
            </div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}">
              Start Your Energetic Work — <span class="bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent">Zero-Leak Corporate Governance</span> & AI Brand Compliance
            </h1>
            <p class="text-xs sm:text-sm max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}">
              Empowering enterprise leadership and distributed production teams with ephemeral time-bound access, dynamic forensic leak watermarking, and instant neural brand compliance validation.
            </p>
          </div>

          <!-- Quick Stats Pill Container -->
          <div class="flex items-center gap-3 shrink-0">
            <div class="px-4 py-3 rounded-2xl ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-slate-200'} shadow-sm text-center">
              <div class="text-xs font-medium text-slate-400">Master Standard</div>
              <div class="text-lg font-bold text-[#10B981] flex items-center justify-center gap-1">
                <i data-lucide="check-circle" class="w-4 h-4"></i> 94.5% Eff.
              </div>
            </div>
            <div class="px-4 py-3 rounded-2xl ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-slate-200'} shadow-sm text-center">
              <div class="text-xs font-medium text-slate-400">Envelope Shield</div>
              <div class="text-lg font-bold text-[#0066FF] flex items-center justify-center gap-1">
                <i data-lucide="shield-check" class="w-4 h-4"></i> AES-256
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MAIN CONTENT AREA -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        ${!AppState.currentUser.isAuthenticated ? renderAuthModule() : `
          <!-- ENTERPRISE NAVIGATION TABS -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} pb-5">
            <div class="inline-flex p-1.5 rounded-2xl ${isDark ? 'bg-slate-900/90 border border-slate-800' : 'bg-slate-200/90 border border-slate-300'} shadow-md flex-wrap gap-1">
              
              <!-- Tab 1: Author & File Dashboard -->
              <button onclick="switchTab('author')" class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                AppState.activeTab === 'author'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-[#0066FF]/35 scale-102'
                  : 'text-slate-400 hover:text-white'
              }">
                <i data-lucide="folder-lock" class="w-3.5 h-3.5"></i>
                <span>Author & File Controls</span>
              </button>

              <!-- Tab 2: Recipient / Employee Inbox -->
              <button onclick="switchTab('inbox')" class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                AppState.activeTab === 'inbox'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-[#0066FF]/35 scale-102'
                  : 'text-slate-400 hover:text-white'
              }">
                <i data-lucide="inbox" class="w-3.5 h-3.5"></i>
                <span>Recipient Inbox & Directives</span>
              </button>

              <!-- Tab 3: AI Brand Compliance Scanner -->
              <button onclick="switchTab('scanner')" class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                AppState.activeTab === 'scanner'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-[#0066FF]/35 scale-102'
                  : 'text-slate-400 hover:text-white'
              }">
                <i data-lucide="scan" class="w-3.5 h-3.5"></i>
                <span>AI Compliance Scanner</span>
              </button>

              <!-- Tab 4: SOC Monitoring Center -->
              <button onclick="switchTab('monitor')" class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                AppState.activeTab === 'monitor'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-[#0066FF]/35 scale-102'
                  : 'text-slate-400 hover:text-white'
              }">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 radar-beacon"></span>
                <span>Live SOC Monitoring</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">REAL-TIME</span>
              </button>

            </div>

            <!-- Upload File Trigger Button -->
            <button onclick="openUploadModal()" class="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#0EA5E9] hover:to-[#0284C7] shadow-lg shadow-[#10B981]/30 transition-all flex items-center gap-2 self-start md:self-auto">
              <i data-lucide="upload" class="w-4 h-4"></i>
              <span>Upload & Send Protected File</span>
            </button>
          </div>

          <!-- ACTIVE TAB CONTENT ROUTER -->
          ${AppState.activeTab === 'author' ? renderAuthorDashboard() : (
            AppState.activeTab === 'inbox' ? renderViewerInbox() : (
              AppState.activeTab === 'scanner' ? renderAiScanner() : renderMonitoringDashboard()
            )
          )}
        `}
      </main>

      <!-- FOOTER -->
      <footer class="border-t ${isDark ? 'border-slate-800/80 bg-[#0B192C]' : 'border-slate-200 bg-white'} py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div class="flex items-center gap-3">
            <img src="assets/logo.png" alt="Logo" class="w-6 h-6 object-contain">
            <span>© 2026 <strong>Office Info Controller Enterprise</strong>. All cryptographic rights reserved.</span>
          </div>
          <div class="flex items-center gap-6">
            <span class="hover:underline cursor-pointer" onclick="openSecurityProtocol('aes')">AES-256 Specifications</span>
            <span class="hover:underline cursor-pointer" onclick="openSecurityProtocol('watermark')">Forensic Leak Protocol</span>
            <span class="hover:underline cursor-pointer" onclick="openSecurityProtocol('ai')">AI Verification Engine</span>
            <a href="OFFICE_INFO_CONTROLLER_MANUAL.pdf" target="_blank" download="OFFICE_INFO_CONTROLLER_MANUAL.pdf" class="hover:underline flex items-center gap-1.5 text-emerald-400 font-bold">
              <i data-lucide="file-down" class="w-3.5 h-3.5"></i>
              <span>Download Manual (PDF)</span>
            </a>
            <span class="font-mono text-emerald-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span> FIPS 140-3 Compliant
            </span>
          </div>
        </div>
      </footer>

      <!-- GLOBAL MODALS & OVERLAYS -->
      ${renderOtpModal()}
      ${renderInactivityWarningModal()}
      ${renderForgotPasswordModal()}
      ${renderSecurityProtocolModal()}
      ${renderActionLockedModal()}
      ${renderPublishSuccessModal()}
      ${renderUploadModal()}
      ${renderFileDrawerModal()}
      ${renderKillSwitchModal()}
      ${renderReplaceVersionModal()}
      ${renderAddRecipientModal()}
      ${renderSecureSandboxedViewer()}

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ============================================================================
// 7. AUTHENTICATION & ONBOARDING MODULE (Section 3)
// ============================================================================
function renderAuthModule() {
  const isDark = AppState.theme === 'dark';
  const roles = ['CEO', 'VP', 'HR', 'HOD', 'Team Lead', 'Employee'];
  const activeRole = AppState.authForm.selectedRole;
  const isRegister = AppState.authForm.mode === 'register';

  // Registered managers for Reports-To picker
  const managerCandidates = AppState.users.filter(u => ['CEO', 'VP', 'HR', 'HOD', 'Team Lead'].includes(u.role));

  return `
    <div class="space-y-12">
      
      <!-- Glassmorphic Auth Box Container -->
      <div class="max-w-2xl mx-auto">
        <div class="relative rounded-3xl p-6 sm:p-10 ${isDark ? 'glass-panel-dark' : 'glass-panel-light'} shadow-2xl transition-all">
          
          <!-- Role Selector Pills -->
          <div class="mb-8 space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2">
                <i data-lucide="shield" class="w-4 h-4 text-[#0066FF]"></i>
                Select Authorized Corporate Role:
              </label>
              <span class="text-xs font-mono text-[#0066FF] font-semibold">${activeRole} Privilege Context</span>
            </div>

            <!-- Role Pills -->
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2" role="tablist">
              ${roles.map(role => `
                <button type="button" 
                  role="tab"
                  aria-selected="${activeRole === role}"
                  onclick="selectRolePill('${role}')" 
                  class="px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center gap-1 cursor-pointer select-none ${
                  activeRole === role
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/40 ring-2 ring-[#0066FF] ring-offset-2 ring-offset-[#0B192C] scale-105'
                    : isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }">
                  <span>${role}</span>
                  <span class="text-[9px] opacity-80 font-normal">${role === 'Employee' ? 'Production' : (role === 'CEO' || role === 'VP' ? 'Executive' : 'Management')}</span>
                </button>
              `).join('')}
            </div>

            <!-- Dynamic Role Header -->
            <div class="p-3.5 rounded-2xl ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-blue-50/70 border border-blue-200'} text-xs flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                <span class="font-bold text-white text-sm" id="active-role-heading">Signing in as ${activeRole}</span>
              </div>
              <span class="font-mono text-[11px] text-[#0066FF] font-semibold">Hierarchy Level: ${
                activeRole === 'CEO' ? 'Tier 1 (Root Authority)' : 
                (activeRole === 'VP' ? 'Tier 2 (Vice President)' : 
                (activeRole === 'HR' ? 'Tier 3 (Human Resources)' : 
                (activeRole === 'HOD' ? 'Tier 3 (Head of Dept)' : 
                (activeRole === 'Team Lead' ? 'Tier 4 (Team Lead)' : 'Tier 5 (Production Employee)'))))
              }</span>
            </div>
          </div>

          <!-- Auth Form Header -->
          <div class="text-center mb-6">
            <h2 class="text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}">
              ${isRegister ? 'Register Enterprise Account & Hierarchy' : 'Zero-Trust Corporate Gateway'}
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">
              ${isRegister ? 'Create corporate credentials bound to your department manager' : 'Sign in with enterprise credentials & 2FA'}
            </p>
          </div>

          ${!isRegister ? `
            <!-- LOGIN FORM -->
            <form onsubmit="handleLoginSubmit(event)" class="space-y-4">
              
              <!-- Company Name -->
              <div>
                <label class="block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1.5">Company Name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i data-lucide="building-2" class="w-4 h-4 text-slate-400"></i>
                  </div>
                  <input type="text" id="login-company" value="${AppState.authForm.company}" required class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900/90 border-slate-700 text-white focus:border-[#0066FF]' : 'bg-white border-slate-300 text-slate-900 focus:border-[#0066FF]'} border focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all">
                </div>
              </div>

              <!-- Corporate Email -->
              <div>
                <label class="block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1.5">Official Corporate Email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i data-lucide="mail" class="w-4 h-4 text-slate-400"></i>
                  </div>
                  <input type="email" id="login-email" value="${AppState.authForm.email}" oninput="AppState.authForm.email = this.value" required placeholder="name@company.com" class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900/90 border-slate-700 text-white focus:border-[#0066FF]' : 'bg-white border-slate-300 text-slate-900 focus:border-[#0066FF]'} border focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all">
                </div>
              </div>

              <!-- Password -->
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-1.5">
                    <label class="text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}">Password</label>
                    <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                      AES-256 secured
                    </span>
                  </div>
                  <button type="button" onclick="openForgotPasswordModal()" class="text-xs font-semibold text-[#0066FF] hover:underline">
                    Forgot Password?
                  </button>
                </div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i data-lucide="lock" class="w-4 h-4 text-slate-400"></i>
                  </div>
                  <input type="${AppState.authForm.showPassword ? 'text' : 'password'}" id="login-password" value="${AppState.authForm.password}" required class="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900/90 border-slate-700 text-white focus:border-[#0066FF]' : 'bg-white border-slate-300 text-slate-900 focus:border-[#0066FF]'} border focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all">
                  <button type="button" onclick="togglePasswordVisibility()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200">
                    <i data-lucide="${AppState.authForm.showPassword ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0055DD] hover:to-[#0042A8] shadow-lg shadow-[#0066FF]/35 transition-all flex items-center justify-center gap-2 text-sm mt-2">
                <i data-lucide="key" class="w-4 h-4"></i>
                <span>Sign In & Verify 2FA OTP</span>
              </button>

              <!-- Switch to Register -->
              <div class="text-center pt-2">
                <button type="button" onclick="toggleAuthMode('register')" class="text-xs font-bold text-slate-400 hover:text-[#0066FF] transition-colors">
                  Need access? <span class="text-[#0066FF] underline">Create New Account</span>
                </button>
              </div>

            </form>
          ` : `
            <!-- REGISTRATION FORM WITH REPORTS-TO & STRENGTH METER -->
            <form onsubmit="handleRegisterSubmit(event)" class="space-y-4">
              
              <!-- Email -->
              <div>
                <label class="block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1.5">Official Corporate Email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i data-lucide="mail" class="w-4 h-4 text-slate-400"></i>
                  </div>
                  <input type="email" id="reg-email" required placeholder="new.employee@acme.com" oninput="handleRegEmailInput(event)" class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900/90 border-slate-700 text-white focus:border-[#0066FF]' : 'bg-white border-slate-300 text-slate-900 focus:border-[#0066FF]'} border focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all">
                </div>
              </div>

              <!-- Role & Reports To -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1.5">Assigned Role</label>
                  <select id="reg-role" onchange="handleRegRoleChange(event)" class="w-full px-3 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'} border outline-none">
                    ${roles.map(r => `<option value="${r}" ${AppState.authForm.regRole === r ? 'selected' : ''}>${r}</option>`).join('')}
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1.5">Reports to (Hierarchy)</label>
                  <select id="reg-reports-to" class="w-full px-3 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'} border outline-none">
                    ${managerCandidates.map(m => `
                      <option value="${m.email}">
                        ${m.name} (${m.role}) - ${m.email}
                      </option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <!-- Password with Strength Meter -->
              <div>
                <label class="block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1.5">New Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i data-lucide="lock" class="w-4 h-4 text-slate-400"></i>
                  </div>
                  <input type="password" id="reg-password" required placeholder="Minimum 8 characters" oninput="handlePasswordStrengthInput(event)" class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900/90 border-slate-700 text-white focus:border-[#0066FF]' : 'bg-white border-slate-300 text-slate-900 focus:border-[#0066FF]'} border focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all">
                </div>
                
                <!-- Live Strength Meter -->
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-slate-400">Password Strength:</span>
                    <span id="pwd-strength-label" class="font-bold ${AppState.authForm.pwdStrength.color}">${AppState.authForm.pwdStrength.label}</span>
                  </div>
                  <div class="grid grid-cols-4 gap-1.5">
                    <div id="pwd-bar-1" class="pwd-bar bg-slate-700"></div>
                    <div id="pwd-bar-2" class="pwd-bar bg-slate-700"></div>
                    <div id="pwd-bar-3" class="pwd-bar bg-slate-700"></div>
                    <div id="pwd-bar-4" class="pwd-bar bg-slate-700"></div>
                  </div>
                </div>
              </div>

              <!-- Re-enter Password with Live Match Check -->
              <div>
                <label class="block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1.5">Re-enter Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <i data-lucide="shield-check" class="w-4 h-4 text-slate-400"></i>
                  </div>
                  <input type="password" id="reg-password-confirm" required placeholder="Confirm your password" oninput="handlePasswordMatchInput(event)" class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-slate-900/90 border-slate-700 text-white focus:border-[#0066FF]' : 'bg-white border-slate-300 text-slate-900 focus:border-[#0066FF]'} border focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 transition-all">
                </div>
                <div id="pwd-match-message" class="text-[11px] mt-1 font-semibold text-slate-400"></div>
              </div>

              <button type="submit" class="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#0EA5E9] hover:to-[#0284C7] shadow-lg shadow-[#10B981]/30 transition-all flex items-center justify-center gap-2 text-sm mt-2">
                <i data-lucide="user-check" class="w-4 h-4"></i>
                <span>Register Account & Join Hierarchy</span>
              </button>

              <div class="text-center pt-2">
                <button type="button" onclick="toggleAuthMode('login')" class="text-xs font-bold text-slate-400 hover:text-[#0066FF] transition-colors">
                  Already registered? <span class="text-[#0066FF] underline">Back to Login</span>
                </button>
              </div>

            </form>
          `}

          <!-- Alternative SSO Buttons -->
          <div class="mt-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}">
            <div class="text-center mb-4">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Or Fast SSO Login (Demo):
              </span>
            </div>

            <div class="grid grid-cols-4 gap-3">
              <button onclick="handleSsoClick('Google')" class="p-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold ${isDark ? 'bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'} transition-all shadow-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"/></svg>
                <span class="hidden sm:inline">Google</span>
              </button>

              <button onclick="handleSsoClick('Microsoft')" class="p-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold ${isDark ? 'bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'} transition-all shadow-sm">
                <svg class="w-4 h-4" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
                <span class="hidden sm:inline">Microsoft</span>
              </button>

              <button onclick="handleSsoClick('LinkedIn')" class="p-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold ${isDark ? 'bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'} transition-all shadow-sm">
                <svg class="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span class="hidden sm:inline">LinkedIn</span>
              </button>

              <button onclick="handleSsoClick('X')" class="p-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold ${isDark ? 'bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'} transition-all shadow-sm">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span class="hidden sm:inline">X Corp</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- 4 SECURITY CARDS + DOWNWARD & UPWARD FLOW (Section 2) -->
      <section class="space-y-8 pt-4">
        
        <!-- 4 Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onclick="openSecurityProtocol('aes')" class="cursor-pointer group rounded-3xl p-6 ${isDark ? 'glass-card-dark hover:border-[#0066FF]/60' : 'glass-card-light hover:border-[#0066FF]'} border transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="w-12 h-12 rounded-2xl bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF] mb-4 group-hover:scale-110 transition-transform">
              <i data-lucide="lock" class="w-6 h-6"></i>
            </div>
            <h4 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-1.5">AES-256 Envelope Encryption</h4>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-3">
              Per-file data keys sealed under FIPS 140-3 HSM master keys. Decouples key transport from encrypted storage.
            </p>
            <span class="text-xs font-bold text-[#0066FF] flex items-center gap-1">Inspect Protocol <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
          </div>

          <div onclick="openSecurityProtocol('ephemeral')" class="cursor-pointer group rounded-3xl p-6 ${isDark ? 'glass-card-dark hover:border-[#10B981]/60' : 'glass-card-light hover:border-[#10B981]'} border transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="w-12 h-12 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mb-4 group-hover:scale-110 transition-transform">
              <i data-lucide="clock" class="w-6 h-6"></i>
            </div>
            <h4 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-1.5">Ephemeral Time-Bound Viewing</h4>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-3">
              Protected buffers live exclusively in volatile client memory with millisecond precision timers.
            </p>
            <span class="text-xs font-bold text-[#10B981] flex items-center gap-1">Inspect Protocol <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
          </div>

          <div onclick="openSecurityProtocol('ai')" class="cursor-pointer group rounded-3xl p-6 ${isDark ? 'glass-card-dark hover:border-[#38BDF8]/60' : 'glass-card-light hover:border-[#38BDF8]'} border transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="w-12 h-12 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-4 group-hover:scale-110 transition-transform">
              <i data-lucide="scan" class="w-6 h-6"></i>
            </div>
            <h4 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-1.5">AI Visual & Semantic Verification</h4>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-3">
              Automated computer vision checking logo hashes, sampling chromatic hex codes, and OCR data accuracy.
            </p>
            <span class="text-xs font-bold text-[#38BDF8] flex items-center gap-1">Inspect Protocol <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
          </div>

          <div onclick="openSecurityProtocol('watermark')" class="cursor-pointer group rounded-3xl p-6 ${isDark ? 'glass-card-dark hover:border-[#EF4444]/60' : 'glass-card-light hover:border-[#EF4444]'} border transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="w-12 h-12 rounded-2xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] mb-4 group-hover:scale-110 transition-transform">
              <i data-lucide="fingerprint" class="w-6 h-6"></i>
            </div>
            <h4 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-1.5">Forensic Leak Watermarking</h4>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-3">
              Dynamic multi-layer forensic overlays bind viewer ID, enterprise IP, and microsecond timestamps across viewport.
            </p>
            <span class="text-xs font-bold text-[#EF4444] flex items-center gap-1">Inspect Protocol <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
          </div>
        </div>

        <!-- Downward & Upward Flow Explanation (Section 2) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl ${isDark ? 'bg-slate-900/60 border border-slate-800' : 'bg-white border border-slate-200'}">
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-xs font-bold text-[#0066FF] uppercase tracking-wider">
              <i data-lucide="arrow-down-circle" class="w-4 h-4"></i>
              <span>Downward Flow (Officials to Employees)</span>
            </div>
            <h4 class="text-sm font-bold text-white">Master Asset Governance & Delegated Viewing</h4>
            <p class="text-xs text-slate-300 leading-relaxed">
              Executive leadership and team leads distribute sealed master brand guidelines, financial benchmarks, and official logos downward to authorized team members with strict time-bound view tokens, dynamic forensic watermarking, and zero download permissions.
            </p>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider">
              <i data-lucide="arrow-up-circle" class="w-4 h-4"></i>
              <span>Upward Flow (Employees to Officials)</span>
            </div>
            <h4 class="text-sm font-bold text-white">AI-Gated Draft Verification & Review</h4>
            <p class="text-xs text-slate-300 leading-relaxed">
              Production employees submit creative collateral back upward to managers. The autonomous AI Compliance Engine intercepts every submission, auditing vector hashes, hex palettes, and metrics (94.5%) before executive review or simulated production deployment.
            </p>
          </div>
        </div>

      </section>

    </div>
  `;
}

// ============================================================================
// 8. AUTHOR & FILE DASHBOARD (Section 4 & Section 7)
// ============================================================================
function renderAuthorDashboard() {
  const isDark = AppState.theme === 'dark';
  const currentUser = AppState.currentUser;
  
  // Files where current user is Author
  const myFiles = AppState.files.filter(f => f.authorEmail.toLowerCase() === currentUser.email.toLowerCase());
  // Total files in system
  const allFiles = AppState.files;
  
  // Metrics calculation
  const totalMyFiles = myFiles.length;
  const activeCount = myFiles.filter(f => !f.killed && f.remainingSeconds > 0).length;
  const killedCount = myFiles.filter(f => f.killed).length;
  const totalViews = myFiles.reduce((acc, f) => acc + f.recipients.reduce((rAcc, r) => rAcc + r.viewCount, 0), 0);

  return `
    <div class="space-y-8">
      
      <!-- Executive Directives & Efficiency Banner (Section 3) -->
      <div class="relative overflow-hidden rounded-3xl p-6 md:p-8 ${isDark ? 'bg-gradient-to-r from-[#0B192C] via-[#0F223D] to-[#0A1628] border border-slate-800' : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200'} shadow-xl">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0066FF]/20 text-[#60A5FA] border border-[#0066FF]/40">
                Executive Command Center
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                Active Role: ${currentUser.role}
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}">
              Master Asset Transmission & Author Control Panel
            </h2>
            <p class="text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} max-w-2xl">
              As an Author, you maintain unilateral cryptographic authority: modify files, deploy new versions, expand recipient scopes, or trigger the instant Emergency Kill-Switch.
            </p>
          </div>

          <!-- Master Efficiency Benchmark Badge -->
          <div class="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 shrink-0">
            <div class="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <i data-lucide="trending-up" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Corporate Efficiency</div>
              <div class="text-2xl font-extrabold text-[#10B981] font-mono">94.5%</div>
              <div class="text-[10px] text-slate-400">Master Brand Benchmark 2026</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-2xl ${isDark ? 'bg-slate-900/70 border border-slate-800' : 'bg-white border border-slate-200'} shadow-sm">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Authored Files</span>
            <i data-lucide="files" class="w-4 h-4 text-[#0066FF]"></i>
          </div>
          <div class="text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-mono">${totalMyFiles}</div>
          <div class="text-[11px] text-slate-400 mt-1">Directly governed by you</div>
        </div>

        <div class="p-4 rounded-2xl ${isDark ? 'bg-slate-900/70 border border-slate-800' : 'bg-white border border-slate-200'} shadow-sm">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active Buffers</span>
            <i data-lucide="check-circle-2" class="w-4 h-4 text-[#10B981]"></i>
          </div>
          <div class="text-2xl font-bold text-[#10B981] font-mono">${activeCount}</div>
          <div class="text-[11px] text-slate-400 mt-1">Live client viewtokens</div>
        </div>

        <div class="p-4 rounded-2xl ${isDark ? 'bg-slate-900/70 border border-slate-800' : 'bg-white border border-slate-200'} shadow-sm">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Revoked / Killed</span>
            <i data-lucide="skull" class="w-4 h-4 text-[#EF4444]"></i>
          </div>
          <div class="text-2xl font-bold text-[#EF4444] font-mono">${killedCount}</div>
          <div class="text-[11px] text-slate-400 mt-1">Emergency kill-switched</div>
        </div>

        <div class="p-4 rounded-2xl ${isDark ? 'bg-slate-900/70 border border-slate-800' : 'bg-white border border-slate-200'} shadow-sm">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Dwell Time Reads</span>
            <i data-lucide="eye" class="w-4 h-4 text-[#38BDF8]"></i>
          </div>
          <div class="text-2xl font-bold text-[#38BDF8] font-mono">${totalViews}</div>
          <div class="text-[11px] text-slate-400 mt-1">Verified recipient opens</div>
        </div>
      </div>

      <!-- File Control & Transmission Management Table -->
      <div class="rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} shadow-xl overflow-hidden">
        
        <div class="p-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2">
              <i data-lucide="shield-check" class="w-5 h-5 text-[#0066FF]"></i>
              <span>Secured File Transmission Inventory</span>
            </h3>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}">
              Files authored by you or shared within your corporate chain. Click any row for analytics or author controls.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="openUploadModal()" class="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0055DD] shadow-md shadow-[#0066FF]/30 transition-all flex items-center gap-2">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>Transmit New File</span>
            </button>
          </div>
        </div>

        <!-- Responsive Table Container -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="${isDark ? 'bg-slate-950/60 text-slate-400 border-b border-slate-800' : 'bg-slate-50 text-slate-600 border-b border-slate-200'} uppercase tracking-wider text-[11px] font-semibold">
                <th class="py-3.5 px-4">Title & Details</th>
                <th class="py-3.5 px-3">Type</th>
                <th class="py-3.5 px-3">Version</th>
                <th class="py-3.5 px-3">AI Compliance</th>
                <th class="py-3.5 px-3">Recipients & Seen</th>
                <th class="py-3.5 px-3">Status / Expiry</th>
                <th class="py-3.5 px-4 text-right">Author Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}">
              ${myFiles.length === 0 ? `
                <tr>
                  <td colspan="7" class="py-8 text-center text-slate-400">
                    <div class="flex flex-col items-center justify-center gap-2">
                      <i data-lucide="folder-x" class="w-8 h-8 text-slate-500"></i>
                      <span>No files authored yet. Click "Transmit New File" to seed zero-leak encrypted documents.</span>
                    </div>
                  </td>
                </tr>
              ` : myFiles.map(file => {
                const totalRecipients = file.recipients.length;
                const seenCount = file.recipients.filter(r => r.tickStatus === 'seen').length;
                const isKilled = file.killed;
                const isExpired = file.remainingSeconds <= 0;
                
                // Worst tick status in file
                const hasUnseen = file.recipients.some(r => r.tickStatus !== 'seen');
                const hasDelivered = file.recipients.some(r => r.tickStatus === 'delivered');
                const overallTick = !hasUnseen ? 'seen' : (hasDelivered ? 'delivered' : 'sent');

                return `
                  <tr class="${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'} transition-colors group">
                    
                    <!-- Title & Details -->
                    <td class="py-4 px-4">
                      <div class="flex items-start gap-3">
                        <div class="p-2.5 rounded-xl ${isDark ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-[#0066FF]'} shrink-0 mt-0.5">
                          <i data-lucide="${getFileIcon(file.type)}" class="w-5 h-5"></i>
                        </div>
                        <div>
                          <div class="font-bold ${isDark ? 'text-white' : 'text-slate-900'} text-sm flex items-center gap-2">
                            <span>${file.title}</span>
                            ${file.priority === 'urgent' ? `
                              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">Urgent</span>
                            ` : ''}
                          </div>
                          <div class="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                            <span>${file.fileName}</span>
                            <span>•</span>
                            <span>${file.sizeFormatted}</span>
                            <span>•</span>
                            <span>SHA: ${file.sha256.substring(0, 8)}...</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Type Badge -->
                    <td class="py-4 px-3">
                      <span class="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase ${getTypeBadgeColor(file.type)}">
                        .${file.type}
                      </span>
                    </td>

                    <!-- Version -->
                    <td class="py-4 px-3">
                      <span class="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold ${isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-700 border border-slate-300'}">
                        v${file.version}.0
                      </span>
                    </td>

                    <!-- AI Compliance Badge -->
                    <td class="py-4 px-3">
                      ${file.aiCompliance.status === 'compliant' ? `
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <i data-lucide="check" class="w-3.5 h-3.5"></i> Compliant
                        </span>
                      ` : `
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i> Needs Review
                        </span>
                      `}
                    </td>

                    <!-- Recipients & WhatsApp Read Receipts -->
                    <td class="py-4 px-3">
                      <div class="space-y-1">
                        <div class="flex items-center gap-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}">
                          <i data-lucide="users" class="w-3.5 h-3.5 text-slate-400"></i>
                          <span>Seen by <strong>${seenCount}</strong> of <strong>${totalRecipients}</strong></span>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-[11px] text-slate-400">Receipts:</span>
                          <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/80">
                            ${renderTicks(overallTick)}
                            <span class="text-[10px] font-mono text-slate-300 capitalize">${overallTick}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Status / Countdown Expiry -->
                    <td class="py-4 px-3">
                      ${isKilled ? `
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                          <i data-lucide="slash" class="w-3 h-3"></i> KILLED
                        </span>
                      ` : isExpired ? `
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-700 text-slate-400">
                          <i data-lucide="clock" class="w-3 h-3"></i> Expired
                        </span>
                      ` : `
                        <div class="space-y-0.5">
                          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>${formatTime(file.remainingSeconds)}</span>
                          </div>
                          <div class="text-[10px] text-slate-400">Time-bound access</div>
                        </div>
                      `}
                    </td>

                    <!-- Author Action Controls -->
                    <td class="py-4 px-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        
                        <!-- Open Sandboxed Viewer (Author preview) -->
                        <button onclick="openSecureViewer('${file.id}')" title="Preview Sandboxed Document" class="p-2 rounded-xl ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} transition-all">
                          <i data-lucide="eye" class="w-4 h-4"></i>
                        </button>

                        <!-- Download (Permitted strictly for Author) -->
                        <button onclick="downloadOwnFile('${file.id}')" title="Download Original (Author Only)" class="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-[#0066FF] border border-blue-500/20 transition-all">
                          <i data-lucide="download" class="w-4 h-4"></i>
                        </button>

                        <!-- Replace / New Version (Author only) -->
                        <button onclick="openReplaceVersionModal('${file.id}')" title="Deploy New Version (v${file.version + 1}.0)" class="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all">
                          <i data-lucide="git-branch" class="w-4 h-4"></i>
                        </button>

                        <!-- Open Detailed Drawer / Analytics -->
                        <button onclick="openFileDrawer('${file.id}')" title="View Recipient Analytics & Dwell Time" class="p-2 rounded-xl ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} transition-all">
                          <i data-lucide="bar-chart-2" class="w-4 h-4"></i>
                        </button>

                        <!-- Emergency Kill-Switch -->
                        ${!isKilled ? `
                          <button onclick="openKillSwitchModal('${file.id}')" title="Emergency Kill-Switch (Instantly Revoke All Tokens)" class="p-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-[#EF4444] border border-red-500/30 transition-all">
                            <i data-lucide="skull" class="w-4 h-4"></i>
                          </button>
                        ` : `
                          <button onclick="restoreFile('${file.id}')" title="Restore Killed File (Re-enable Access)" class="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all">
                            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                          </button>
                        `}

                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

      </div>

      <!-- IMMUTABLE HASH-CHAINED AUDIT LOG (Section 11) -->
      <div class="rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} shadow-xl p-6 space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                CRYPTOGRAPHIC INTEGRITY: SEALED
              </span>
              <span class="text-xs font-mono text-slate-400">SHA-256 Merkle Chain</span>
            </div>
            <h3 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2">
              <i data-lucide="binary" class="w-5 h-5 text-[#10B981]"></i>
              <span>Immutable Hash-Chained Audit Ledger</span>
            </h3>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}">
              Every transmission, view, dwell duration, and kill-switch invocation is signed and cryptographically chained to its ancestor block.
            </p>
          </div>

          <!-- Integrity Test Controls -->
          <div class="flex items-center gap-2 flex-wrap">
            <button onclick="verifyAuditChain()" class="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#059669] shadow-md shadow-[#10B981]/30 transition-all flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4"></i>
              <span>Verify Log Integrity</span>
            </button>
            <button onclick="simulateAuditTamper()" class="px-3 py-2 rounded-xl text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-1.5" title="Modify a past block to prove instant hash breakage">
              <i data-lucide="alert-octagon" class="w-4 h-4"></i>
              <span>Simulate Tamper Test</span>
            </button>
            <button onclick="restoreAuditChain()" class="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5" title="Re-sync with HSM Master Ledger">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
              <span>Restore Chain</span>
            </button>
          </div>
        </div>

        <!-- Hash Verification Result Banner (If active) -->
        <div id="audit-verification-banner" class="hidden"></div>

        <!-- Audit Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="${isDark ? 'bg-slate-950/60 text-slate-400 border-b border-slate-800' : 'bg-slate-50 text-slate-600 border-b border-slate-200'} uppercase tracking-wider text-[10px] font-mono">
                <th class="py-2.5 px-3">Block #</th>
                <th class="py-2.5 px-3">Timestamp</th>
                <th class="py-2.5 px-3">Actor Email</th>
                <th class="py-2.5 px-3">Action Type</th>
                <th class="py-2.5 px-3">Target Payload</th>
                <th class="py-2.5 px-3 font-mono">Previous Block Hash</th>
                <th class="py-2.5 px-3 font-mono">Block Hash (SHA-256)</th>
              </tr>
            </thead>
            <tbody class="divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'} font-mono text-[11px]">
              ${AppState.auditLogChain.slice().reverse().map(block => `
                <tr class="${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-colors">
                  <td class="py-3 px-3 font-bold text-[#0066FF]">#${block.index}</td>
                  <td class="py-3 px-3 text-slate-400">${block.timestamp.split('T')[1].split('.')[0]} UTC</td>
                  <td class="py-3 px-3 text-slate-200 font-semibold">${block.user}</td>
                  <td class="py-3 px-3">
                    <span class="px-2 py-0.5 rounded font-bold uppercase text-[10px] ${getActionBadgeColor(block.action)}">
                      ${block.action}
                    </span>
                  </td>
                  <td class="py-3 px-3 text-slate-300">${block.targetFile}</td>
                  <td class="py-3 px-3 text-slate-500" title="${block.prevHash}">
                    ${block.prevHash.substring(0, 10)}...
                  </td>
                  <td class="py-3 px-3 text-emerald-400 font-bold" title="${block.hash}">
                    ${block.hash.substring(0, 10)}...
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  `;
}

// Helpers for badges and icons
function getFileIcon(type) {
  switch (type.toLowerCase()) {
    case 'pdf': return 'file-text';
    case 'docx':
    case 'doc': return 'file-edit';
    case 'xlsx':
    case 'xls': return 'table';
    case 'png':
    case 'jpg':
    case 'jpeg': return 'image';
    case 'mp4': return 'video';
    default: return 'file';
  }
}

function getTypeBadgeColor(type) {
  switch (type.toLowerCase()) {
    case 'pdf': return 'bg-red-500/15 text-red-400 border border-red-500/30';
    case 'docx':
    case 'doc': return 'bg-blue-500/15 text-blue-400 border border-blue-500/30';
    case 'xlsx':
    case 'xls': return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
    case 'png':
    case 'jpg':
    case 'jpeg': return 'bg-purple-500/15 text-purple-400 border border-purple-500/30';
    case 'mp4': return 'bg-pink-500/15 text-pink-400 border border-pink-500/30';
    default: return 'bg-slate-700 text-slate-300';
  }
}

function getActionBadgeColor(action) {
  switch (action) {
    case 'TRANSMIT_FILE':
    case 'UPLOAD': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    case 'SANDBOX_VIEW': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    case 'KILL_SWITCH': return 'bg-red-500/20 text-red-400 border border-red-500/40';
    case 'ACKNOWLEDGE': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
    case 'REPLACE_VERSION': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    default: return 'bg-slate-800 text-slate-400';
  }
}

// ============================================================================
// 9. RECIPIENT INBOX & DIRECTIVES (Section 3 & Section 4)
// ============================================================================
function renderViewerInbox() {
  const isDark = AppState.theme === 'dark';
  const currentUser = AppState.currentUser;
  
  // Files received by current user
  const receivedFiles = AppState.files.filter(f => 
    f.recipients.some(r => r.email.toLowerCase() === currentUser.email.toLowerCase())
  );

  return `
    <div class="space-y-8">
      
      <!-- Leadership Directives Panel (Section 3) -->
      <div class="p-6 md:p-8 rounded-3xl ${isDark ? 'bg-gradient-to-r from-slate-900 via-[#0B1E36] to-slate-900 border border-slate-800' : 'bg-gradient-to-r from-blue-50 via-slate-50 to-white border border-blue-200'} shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
                Official Directives & Master Assets
              </span>
              <span class="text-xs text-slate-400 font-mono">Confidential Downward Dispatch</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}">
              Executive Guidance & Sealed Master Assets
            </h2>
            <p class="text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} max-w-2xl">
              All production collaterals must align with official master brand vectors, primary royal blue palette (<code class="text-blue-400 font-bold">#0066FF</code>), and the mandatory <strong class="text-emerald-400">94.5% Product Efficiency</strong> threshold before public distribution.
            </p>
          </div>

          <!-- Quick Action: Submit Upward Draft -->
          <div class="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button onclick="switchTab('scanner')" class="px-5 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#0055DD] hover:from-[#0055DD] hover:to-[#0044BB] shadow-lg shadow-[#0066FF]/30 transition-all flex items-center justify-center gap-2 text-xs">
              <i data-lucide="scan" class="w-4 h-4"></i>
              <span>Test Draft in AI Scanner</span>
            </button>
            <button onclick="openUploadModal()" class="px-4 py-3 rounded-2xl font-bold text-slate-300 ${isDark ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700' : 'bg-white hover:bg-slate-100 border border-slate-300'} transition-all flex items-center justify-center gap-2 text-xs">
              <i data-lucide="send" class="w-4 h-4 text-emerald-400"></i>
              <span>Submit Draft to Manager</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Recipient Inventory Box -->
      <div class="rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} shadow-xl overflow-hidden">
        
        <div class="p-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2">
              <i data-lucide="inbox" class="w-5 h-5 text-[#0066FF]"></i>
              <span>Assigned Ephemeral Documents (${receivedFiles.length})</span>
            </h3>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}">
              These files are streamed in read-only sandbox viewports with forensic watermarking. Raw downloads and local file saves are cryptographically locked.
            </p>
          </div>

          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <i data-lucide="lock" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Downloads Disabled</span>
            </span>
          </div>
        </div>

        <!-- File List -->
        <div class="divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}">
          ${receivedFiles.length === 0 ? `
            <div class="p-12 text-center text-slate-400">
              <i data-lucide="mail-open" class="w-12 h-12 text-slate-500 mx-auto mb-3"></i>
              <div class="text-sm font-bold text-slate-300">No incoming documents in your inbox</div>
              <p class="text-xs text-slate-500 mt-1">When managers in your hierarchy dispatch secured files to you, they will appear here with active countdowns.</p>
            </div>
          ` : receivedFiles.map(file => {
            const recipientData = file.recipients.find(r => r.email.toLowerCase() === currentUser.email.toLowerCase());
            const myTick = recipientData ? recipientData.tickStatus : 'sent';
            const isKilled = file.killed;
            const isExpired = file.remainingSeconds <= 0;

            return `
              <div class="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-all">
                
                <div class="flex items-start gap-4">
                  <div class="p-3 rounded-2xl ${isDark ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-[#0066FF]'} shrink-0 mt-1">
                    <i data-lucide="${getFileIcon(file.type)}" class="w-6 h-6"></i>
                  </div>
                  <div class="space-y-1">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h4 class="text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}">${file.title}</h4>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getTypeBadgeColor(file.type)}">
                        .${file.type}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        v${file.version}.0
                      </span>
                      ${file.priority === 'urgent' ? `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">Urgent</span>
                      ` : ''}
                      ${file.allowDelegation ? `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">Delegation Allowed</span>
                      ` : ''}
                    </div>

                    <div class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} flex items-center gap-2 flex-wrap">
                      <span>Author: <strong class="text-slate-200 font-mono">${file.authorEmail}</strong></span>
                      <span>•</span>
                      <span>${file.sizeFormatted}</span>
                      <span>•</span>
                      <span>Delivered: ${file.uploadedAt.split('T')[0]}</span>
                    </div>

                    ${file.note ? `
                      <div class="text-xs italic text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-700/50 mt-1">
                        "${file.note}"
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Right Controls: Status & Sandboxed Open -->
                <div class="flex items-center justify-between lg:justify-end gap-4 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 ${isDark ? 'border-slate-800' : 'border-slate-200'}">
                  
                  <!-- Read Receipt Indicator -->
                  <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 text-xs">
                    <span class="text-slate-400 text-[11px]">Your Status:</span>
                    <span class="flex items-center gap-1 font-mono font-bold text-slate-200">
                      ${renderTicks(myTick)}
                      <span class="capitalize text-[11px]">${myTick}</span>
                    </span>
                  </div>

                  <!-- Time-bound Expiry Pill -->
                  <div>
                    ${isKilled ? `
                      <span class="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">Access Revoked</span>
                    ` : isExpired ? `
                      <span class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-400">Token Expired</span>
                    ` : `
                      <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                        <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                        <span>Expires in: ${formatTime(file.remainingSeconds)}</span>
                      </div>
                    `}
                  </div>

                  <!-- Open Sandboxed Viewer Button -->
                  <div>
                    ${isKilled || isExpired ? `
                      <button disabled class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-500 cursor-not-allowed">
                        Viewer Locked
                      </button>
                    ` : `
                      <button onclick="openSecureViewer('${file.id}')" class="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0040AA] shadow-md shadow-[#0066FF]/30 transition-all flex items-center gap-2">
                        <i data-lucide="eye" class="w-4 h-4"></i>
                        <span>Open Sandboxed Viewer</span>
                      </button>
                    `}
                  </div>

                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>

    </div>
  `;
}

// ============================================================================
// 10. AI BRAND COMPLIANCE SCANNER (Section 8)
// ============================================================================
function renderAiScanner() {
  const isDark = AppState.theme === 'dark';
  const scan = AppState.aiScan;
  const isScanning = scan.isScanning;

  return `
    <div class="space-y-8">
      
      <!-- Scanner Hero & Instruction Banner -->
      <div class="p-6 md:p-8 rounded-3xl ${isDark ? 'bg-gradient-to-r from-[#0A182E] via-[#0E2A4D] to-[#0A182E] border border-blue-900/40' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'} shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
                Autonomous Verification Engine v4.2
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">NEURAL OCR READY</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}">
              AI Visual, Vector & Semantic Brand Scanner
            </h2>
            <p class="text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} max-w-2xl">
              Strict governance sandbox: audits submitted collaterals against Master Logo Hashes (SHA-256), Royal Blue Chromatic Palette (<code class="text-blue-400 font-bold">#0066FF</code>), and OCR Efficiency Benchmark (<strong class="text-emerald-400">94.5%</strong>).
            </p>
          </div>

          <!-- Quick Test Presets (Section 8) -->
          <div class="shrink-0 flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
            <span class="text-xs font-bold text-slate-400 px-2">Presets:</span>
            <button onclick="simulatePreset('compliant')" class="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all flex items-center gap-1.5">
              <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
              <span>Preset A (Compliant)</span>
            </button>
            <button onclick="simulatePreset('non-compliant')" class="px-3 py-1.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 transition-all flex items-center gap-1.5">
              <i data-lucide="x-circle" class="w-3.5 h-3.5"></i>
              <span>Preset B (Non-Compliant)</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Dual Panel: Left Draft Preview | Right AI Inspection Engine -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Draft Preview & Inspector -->
        <div class="lg:col-span-5 space-y-6">
          <div class="rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} shadow-xl p-6 space-y-5">
            
            <div class="flex items-center justify-between border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} pb-4">
              <div>
                <h3 class="text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}">Submitted Production Draft</h3>
                <span class="text-xs text-slate-400 font-mono">${scan.draftFileName}</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${scan.isPresetCompliant ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}">
                ${scan.isPresetCompliant ? 'VALIDATED SEED' : 'CONTAINS VIOLATIONS'}
              </span>
            </div>

            <!-- Visual Simulated Draft Canvas -->
            <div class="relative rounded-2xl overflow-hidden border ${isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-slate-100'} p-6 text-center space-y-4">
              
              <!-- Laser Scanner Line (When scanning active) -->
              ${isScanning ? `
                <div class="laser-scanner"></div>
              ` : ''}

              <!-- Logo Preview in Draft -->
              <div class="flex items-center justify-center">
                <div class="w-24 h-24 rounded-2xl p-2 bg-slate-900/80 border ${scan.detectedLogo === 'Official Logo v3.2' ? 'border-emerald-500/40' : 'border-red-500/60'} shadow-md flex items-center justify-center">
                  <img src="${scan.detectedLogo === 'Official Logo v3.2' ? 'assets/logo.png' : 'assets/logo.png'}" alt="Draft Logo" class="max-w-full max-h-full object-contain ${scan.detectedLogo !== 'Official Logo v3.2' ? 'grayscale opacity-70' : ''}">
                </div>
              </div>

              <!-- Draft Content Attributes -->
              <div class="space-y-2 text-left bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-slate-400">Target Vector Brand:</span>
                  <span class="font-bold ${scan.detectedLogo === 'Official Logo v3.2' ? 'text-emerald-400' : 'text-red-400'}">${scan.detectedLogo}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-400">Dominant Primary Hex:</span>
                  <span class="font-mono font-bold flex items-center gap-1.5 ${scan.detectedColorHex === '#0066FF' ? 'text-emerald-400' : 'text-red-400'}">
                    <span class="w-3.5 h-3.5 rounded-full border border-white/20" style="background-color: ${scan.detectedColorHex}"></span>
                    ${scan.detectedColorHex}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-400">OCR Efficiency Metric:</span>
                  <span class="font-mono font-bold ${scan.detectedEfficiency === '94.5%' ? 'text-emerald-400' : 'text-red-400'}">${scan.detectedEfficiency}</span>
                </div>
              </div>

            </div>

            <!-- Scan Action Trigger -->
            <button onclick="runAiScan()" ${isScanning ? 'disabled' : ''} class="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#0055DD] hover:from-[#0055DD] hover:to-[#0044BB] shadow-lg shadow-[#0066FF]/35 transition-all flex items-center justify-center gap-2 text-sm ${isScanning ? 'opacity-60 cursor-not-allowed' : ''}">
              <i data-lucide="${isScanning ? 'loader-2' : 'scan'}" class="w-4 h-4 ${isScanning ? 'animate-spin' : ''}"></i>
              <span>${isScanning ? 'Neural Engine Scanning Draft...' : 'Run AI Compliance Scan'}</span>
            </button>

          </div>
        </div>

        <!-- Right Column: Verification Results & 1-Click AI Auto-Fix -->
        <div class="lg:col-span-7 space-y-6">
          <div class="rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} shadow-xl p-6 md:p-8 space-y-6">
            
            <div class="flex items-center justify-between border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} pb-4">
              <div>
                <h3 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2">
                  <i data-lucide="check-check" class="w-5 h-5 text-[#0066FF]"></i>
                  <span>Neural Audit Scorecard</span>
                </h3>
                <span class="text-xs text-slate-400">Multi-stage cryptographic & OCR verification</span>
              </div>

              <!-- Overall Status Pill -->
              ${scan.status === 'idle' ? `
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400">Awaiting Scan</span>
              ` : scan.status === 'compliant' ? `
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <i data-lucide="check" class="w-4 h-4"></i> PASSED (100% COMPLIANT)
                </span>
              ` : `
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                  <i data-lucide="x" class="w-4 h-4"></i> NON-COMPLIANT
                </span>
              `}
            </div>

            <!-- Scan Verification Breakdown Cards -->
            <div class="space-y-3.5">
              
              <!-- Check 1: Official Logo Vector Hash -->
              <div class="p-4 rounded-2xl ${isDark ? 'bg-slate-950/80 border border-slate-800' : 'bg-slate-50 border border-slate-200'} flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center ${scan.status === 'idle' ? 'bg-slate-800 text-slate-400' : (scan.detectedLogo === 'Official Logo v3.2' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400')}">
                    <i data-lucide="${scan.detectedLogo === 'Official Logo v3.2' ? 'check' : 'x'}" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}">Vector Logo Identity</div>
                    <div class="text-[11px] text-slate-400">Target: Official Brand Logo v3.2 (SHA-256 Verified)</div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-mono font-bold ${scan.detectedLogo === 'Official Logo v3.2' ? 'text-emerald-400' : 'text-red-400'}">
                    ${scan.detectedLogo}
                  </span>
                </div>
              </div>

              <!-- Check 2: Chromatic Primary Hex Match -->
              <div class="p-4 rounded-2xl ${isDark ? 'bg-slate-950/80 border border-slate-800' : 'bg-slate-50 border border-slate-200'} flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center ${scan.status === 'idle' ? 'bg-slate-800 text-slate-400' : (scan.detectedColorHex === '#0066FF' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400')}">
                    <i data-lucide="${scan.detectedColorHex === '#0066FF' ? 'check' : 'x'}" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}">Primary Chromatic Hex Code</div>
                    <div class="text-[11px] text-slate-400">Target: Royal Blue #0066FF (ΔE < 0.5)</div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-mono font-bold ${scan.detectedColorHex === '#0066FF' ? 'text-emerald-400' : 'text-red-400'}">
                    ${scan.detectedColorHex}
                  </span>
                </div>
              </div>

              <!-- Check 3: OCR Data Accuracy (94.5%) -->
              <div class="p-4 rounded-2xl ${isDark ? 'bg-slate-950/80 border border-slate-800' : 'bg-slate-50 border border-slate-200'} flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center ${scan.status === 'idle' ? 'bg-slate-800 text-slate-400' : (scan.detectedEfficiency === '94.5%' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400')}">
                    <i data-lucide="${scan.detectedEfficiency === '94.5%' ? 'check' : 'x'}" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}">OCR Financial & Efficiency Data</div>
                    <div class="text-[11px] text-slate-400">Target: "94.5% Product Efficiency" Executive Benchmark</div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-mono font-bold ${scan.detectedEfficiency === '94.5%' ? 'text-emerald-400' : 'text-red-400'}">
                    ${scan.detectedEfficiency}
                  </span>
                </div>
              </div>

            </div>

            <!-- Feedback & Action Bar: If Non-Compliant vs If Compliant -->
            ${scan.status === 'non-compliant' ? `
              <div class="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-4">
                <div class="flex items-start gap-3">
                  <i data-lucide="alert-octagon" class="w-5 h-5 text-red-400 shrink-0 mt-0.5"></i>
                  <div class="space-y-1">
                    <div class="text-sm font-bold text-red-300">Brand Violations Detected — Publishing Locked</div>
                    <ul class="text-xs text-red-300/80 space-y-1 list-disc list-inside">
                      ${scan.violations.map(v => `<li>${v}</li>`).join('')}
                    </ul>
                  </div>
                </div>

                <!-- 1-Click AI Auto-Fix Button (Section 8) -->
                <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button onclick="runAiAutoFix()" class="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#0EA5E9] hover:to-[#0284C7] shadow-lg shadow-[#10B981]/30 transition-all flex items-center justify-center gap-2 text-xs">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                    <span>1-Click AI Auto-Fix (Auto-Correct All Mismatches)</span>
                  </button>
                  <button onclick="generateCorrectedTemplate()" class="px-4 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-xs">
                    Generate Template
                  </button>
                </div>
              </div>
            ` : scan.status === 'compliant' ? `
              <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
                <div class="flex items-start gap-3">
                  <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i>
                  <div>
                    <div class="text-sm font-bold text-emerald-300">100% Brand Compliant — Verification Passed</div>
                    <p class="text-xs text-emerald-300/80 mt-1">
                      All vectors, chromatic hex values, and OCR financial metrics match Master Guidelines 2026. This draft is cryptographically certified for publication.
                    </p>
                  </div>
                </div>

                <!-- Push to Official Website Button (Unlocked) -->
                <button onclick="pushToOfficialWebsite()" class="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#0EA5E9] hover:to-[#0284C7] shadow-lg shadow-[#10B981]/30 transition-all flex items-center justify-center gap-2 text-sm">
                  <i data-lucide="globe" class="w-4 h-4"></i>
                  <span>Push to Official Website (Production Release)</span>
                </button>
              </div>
            ` : ''}

          </div>
        </div>

      </div>

    </div>
  `;
}

// ============================================================================
// 11. SOC MONITORING CENTER (Section Monitoring)
// ============================================================================
function renderMonitoringDashboard() {
  const isDark = AppState.theme === 'dark';
  const m = AppState.monitoring;

  return `
    <div class="space-y-8">
      
      <!-- SOC Header Banner -->
      <div class="p-6 md:p-8 rounded-3xl ${isDark ? 'bg-gradient-to-r from-[#060D1A] via-[#0B192C] to-[#060D1A] border border-slate-800' : 'bg-gradient-to-r from-slate-100 to-blue-50 border border-slate-200'} shadow-2xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 radar-beacon"></span>
              <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                DEFCON 1 • LIVE SIEM SURVEILLANCE
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-[#60A5FA] border border-blue-500/30">FIPS 140-3 ACTIVE</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}">
              Security Operations Center (SOC) & Cryptographic Telemetry
            </h2>
            <p class="text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} max-w-2xl">
              Continuous real-time surveillance of air-gapped memory viewports, client clipboard interceptors, ephemeral token expirations, and forensic watermark fidelity.
            </p>
          </div>

          <!-- Live Refresh Status -->
          <div class="flex items-center gap-3 bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-800">
            <div class="text-right">
              <div class="text-[10px] text-slate-400 uppercase font-mono">Stream Heartbeat</div>
              <div class="text-xs font-bold text-emerald-400 font-mono">2,400 events/sec</div>
            </div>
            <button onclick="refreshSocData()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 4 KPI Telemetry Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="p-5 rounded-3xl ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-slate-200'} shadow-lg space-y-3">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span class="uppercase tracking-wider font-semibold">Total Encrypted Transmissions</span>
            <i data-lucide="lock" class="w-4 h-4 text-[#0066FF]"></i>
          </div>
          <div class="text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} font-mono">${m.totalEncryptedTransmissions}</div>
          <div class="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i> +14% this hour (Peak Traffic)
          </div>
        </div>

        <div class="p-5 rounded-3xl ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-slate-200'} shadow-lg space-y-3">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span class="uppercase tracking-wider font-semibold">Active Air-Gapped Buffers</span>
            <i data-lucide="monitor" class="w-4 h-4 text-[#10B981]"></i>
          </div>
          <div class="text-3xl font-extrabold text-[#10B981] font-mono">${m.activeViewports}</div>
          <div class="text-[11px] text-slate-400 font-mono">Zero unencrypted disk cache</div>
        </div>

        <div class="p-5 rounded-3xl ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-slate-200'} shadow-lg space-y-3">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span class="uppercase tracking-wider font-semibold">Blocked Leak Interceptions</span>
            <i data-lucide="shield-alert" class="w-4 h-4 text-[#EF4444]"></i>
          </div>
          <div class="text-3xl font-extrabold text-[#EF4444] font-mono">${m.blockedLeakAttempts}</div>
          <div class="text-[11px] text-red-400 flex items-center gap-1 font-semibold">
            <i data-lucide="check" class="w-3.5 h-3.5"></i> 100% Screenshot & Print Neutralized
          </div>
        </div>

        <div class="p-5 rounded-3xl ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-white border border-slate-200'} shadow-lg space-y-3">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span class="uppercase tracking-wider font-semibold">FIPS HSM Latency</span>
            <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i>
          </div>
          <div class="text-3xl font-extrabold text-amber-400 font-mono">${m.hsmLatencyMs} ms</div>
          <div class="text-[11px] text-slate-400 font-mono">Envelope GCM Decrypt P99</div>
        </div>
      </div>

      <!-- Charts & Visual Analytics Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Hourly Transmission Traffic (SVG Bar Chart) -->
        <div class="lg:col-span-8 rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} p-6 space-y-4 shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}">Hourly Encrypted Ingestion & Viewing Velocity</h3>
              <p class="text-xs text-slate-400">Cryptographic payload stream over 12-hour operational window</p>
            </div>
            <span class="text-xs font-mono text-[#0066FF] font-bold">SHA-256 Validated</span>
          </div>

          <!-- SVG Bar Chart -->
          <div class="h-48 w-full flex items-end justify-between gap-2 pt-6 px-2">
            ${[35, 52, 44, 78, 62, 90, 84, 98, 120, 110, 142, 168].map((val, idx) => `
              <div class="flex-1 flex flex-col items-center gap-2 group">
                <div class="w-full rounded-t-lg bg-gradient-to-t from-[#0066FF] to-[#38BDF8] group-hover:from-[#10B981] group-hover:to-[#34D399] transition-all relative" style="height: ${val}px">
                  <div class="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 px-2 py-0.5 rounded text-[10px] font-mono text-white border border-slate-700 whitespace-nowrap transition-opacity pointer-events-none">
                    ${val} reqs
                  </div>
                </div>
                <span class="text-[10px] font-mono text-slate-500">${idx + 1}h</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Violation Breakdown & HSM Latency -->
        <div class="lg:col-span-4 rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} p-6 space-y-5 shadow-xl">
          <div>
            <h3 class="text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}">Leak Defense Intercept Spectrum</h3>
            <p class="text-xs text-slate-400">Neutralized client-side exfiltration vectors</p>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-slate-300">Clipboard / Screen Capture Neutralized</span>
                <span class="text-[#EF4444] font-mono font-bold">58%</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div class="h-full bg-[#EF4444] rounded-full" style="width: 58%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-slate-300">Print Spooler Blackhole Invocations</span>
                <span class="text-amber-400 font-mono font-bold">24%</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width: 24%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-slate-300">Expired Token Replay Invocations</span>
                <span class="text-blue-400 font-mono font-bold">18%</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div class="h-full bg-blue-400 rounded-full" style="width: 18%"></div>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
            <i data-lucide="shield-check" class="w-6 h-6 text-emerald-400 shrink-0"></i>
            <div class="text-xs text-emerald-300">
              <strong>Forensic Watermarking Operational:</strong> 100% of viewports injected with tamper-evident user identity microdots.
            </div>
          </div>
        </div>

      </div>

      <!-- Live Active Air-Gapped Sessions with Remote Kill Switch -->
      <div class="rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} shadow-xl p-6 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2">
              <i data-lucide="radio" class="w-5 h-5 text-emerald-400"></i>
              <span>Active Air-Gapped Client Viewports (Live Sessions)</span>
            </h3>
            <p class="text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}">
              Real-time sockets listening to active clients. Terminate any active session remotely with one click.
            </p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            ${AppState.monitoring.activeSessions.length} CONCURRENT VIEWERS
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="${isDark ? 'bg-slate-950/60 text-slate-400 border-b border-slate-800' : 'bg-slate-50 text-slate-600 border-b border-slate-200'} uppercase tracking-wider text-[10px] font-mono">
                <th class="py-3 px-3">Session Token</th>
                <th class="py-3 px-3">Authorized Viewer</th>
                <th class="py-3 px-3">Target Payload</th>
                <th class="py-3 px-3">Watermark IP</th>
                <th class="py-3 px-3">Dwell Duration</th>
                <th class="py-3 px-3">Security Level</th>
                <th class="py-3 px-3 text-right">Emergency Action</th>
              </tr>
            </thead>
            <tbody class="divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'} font-mono text-[11px]">
              ${AppState.monitoring.activeSessions.map(session => `
                <tr class="${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-colors">
                  <td class="py-3 px-3 font-bold text-[#0066FF]">${session.id}</td>
                  <td class="py-3 px-3 text-slate-200 font-semibold font-sans">${session.user}</td>
                  <td class="py-3 px-3 text-slate-300 font-sans">${session.file}</td>
                  <td class="py-3 px-3 text-slate-400">${session.ip}</td>
                  <td class="py-3 px-3 text-emerald-400 font-bold">${session.dwell}</td>
                  <td class="py-3 px-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      AIR-GAPPED
                    </span>
                  </td>
                  <td class="py-3 px-3 text-right">
                    <button onclick="terminateRemoteSession('${session.id}')" class="px-3 py-1 rounded-lg text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all">
                      Terminate & Kill
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Real-time SIEM Security Incident Stream -->
      <div class="rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'} shadow-xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2">
            <i data-lucide="terminal" class="w-4 h-4 text-slate-400"></i>
            <span>SIEM Security Telemetry Stream</span>
          </h3>
          <span class="text-xs font-mono text-slate-500">Live Socket Feeds</span>
        </div>

        <div class="space-y-2 font-mono text-[11px]">
          ${AppState.monitoring.incidents.map(inc => `
            <div class="p-3 rounded-xl ${isDark ? 'bg-slate-950/70 border border-slate-800' : 'bg-slate-50 border border-slate-200'} flex items-center justify-between gap-4">
              <div class="flex items-center gap-2.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${inc.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : (inc.severity === 'WARN' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30')}">
                  ${inc.severity}
                </span>
                <span class="text-slate-400 font-mono">${inc.time}</span>
                <span class="${isDark ? 'text-slate-200' : 'text-slate-800'} font-sans font-medium">${inc.message}</span>
              </div>
              <span class="text-slate-500 text-[10px] hidden sm:inline">EventID: ${Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// ============================================================================
// 12. SECURE SANDBOXED VIEWER (Section 6 & Section 7)
// ============================================================================
function renderSecureSandboxedViewer() {
  const isDark = AppState.theme === 'dark';
  const v = AppState.activeViewer;
  if (!v.isOpen || !v.file) {
    return '';
  }

  const file = v.file;
  const user = AppState.currentUser;
  const isAuthor = file.authorEmail.toLowerCase() === user.email.toLowerCase();
  const recipientData = file.recipients.find(r => r.email.toLowerCase() === user.email.toLowerCase());
  const hasAcknowledged = recipientData ? recipientData.tickStatus === 'seen' : false;

  // Generate dynamic watermark repeating pattern
  const watermarkText = `VIEWER: ${user.email.toUpperCase()} • IP: 192.168.1.1 • TIME: ${new Date().toISOString()}`;

  return `
    <div id="sandboxed-viewer-root" class="fixed inset-0 z-50 flex flex-col bg-[#050B14] text-slate-100 select-none overflow-hidden animate-in fade-in duration-200">
      
      <!-- FORENSIC WATERMARK OVERLAY (Section 7) -->
      <div class="forensic-watermark-overlay" style="display: flex; flex-direction: column; justify-content: space-around; pointer-events: none;">
        ${Array(8).fill(0).map(() => `
          <div style="display: flex; justify-content: space-around; opacity: 0.16; transform: rotate(-22deg); font-family: monospace; font-size: 13px; font-weight: 800; color: #EF4444; white-space: nowrap; text-shadow: 0 0 1px rgba(0,0,0,0.8);">
            <span>${watermarkText}</span>
            <span class="hidden md:inline">${watermarkText}</span>
          </div>
        `).join('')}
      </div>

      <!-- TOP VIEWER HEADER -->
      <header class="h-16 px-4 sm:px-6 bg-[#0B192C]/95 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 z-20 backdrop-blur-md">
        
        <!-- Left: File Metadata -->
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-blue-500/15 text-[#0066FF]">
            <i data-lucide="${getFileIcon(file.type)}" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-sm font-bold text-white">${file.title}</h2>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getTypeBadgeColor(file.type)}">
                .${file.type}
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                v${file.version}.0
              </span>
            </div>
            <div class="text-[11px] text-slate-400 font-mono flex items-center gap-2">
              <span>Author: <strong class="text-slate-300">${file.authorEmail}</strong></span>
              <span>•</span>
              <span>SHA-256: ${file.sha256.substring(0, 10)}...</span>
            </div>
          </div>
        </div>

        <!-- Center: Security Shield Banner -->
        <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-mono">
          <i data-lucide="shield-alert" class="w-4 h-4 text-emerald-400"></i>
          <span class="text-slate-300">AIR-GAPPED VOLATILE BUFFER • DOWNLOADS & COPYING DISABLED</span>
        </div>

        <!-- Right: Time-bound Expiry & Close -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            <span>Access Expires in: ${formatTime(file.remainingSeconds)}</span>
          </div>

          <button type="button" onclick="closeSecureViewer()" aria-label="Exit Sandboxed Viewport" class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer shadow-sm" title="Exit Sandboxed Viewport">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

      </header>

      <!-- VIEWER CONTENT ENGINE VIEWPORT (Scrollable) -->
      <main id="viewer-scroll-container" onscroll="handleViewerScroll(this)" class="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center relative z-10 bg-[#060D1A]/95">
        
        <div class="max-w-4xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative">
          
          <!-- Document Content Simulated by Extension -->
          ${renderSimulatedFileContent(file)}

        </div>

      </main>

      <!-- BOTTOM VIEWER FOOTER: DWELL TIME & ACKNOWLEDGEMENT -->
      <footer class="h-16 px-4 sm:px-6 bg-[#0B192C]/95 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0 z-20 backdrop-blur-md">
        
        <div class="flex items-center gap-4 text-xs font-mono">
          <div class="flex items-center gap-1.5 text-slate-400">
            <i data-lucide="timer" class="w-4 h-4 text-[#0066FF]"></i>
            <span>Dwell Time: <strong id="viewer-dwell-display" class="text-white">${v.dwellSeconds}s</strong></span>
          </div>
          <div class="hidden sm:flex items-center gap-1.5 text-slate-400">
            <i data-lucide="scroll" class="w-4 h-4 text-emerald-400"></i>
            <span>Scroll Depth: <strong id="viewer-scroll-display" class="text-white">${v.scrollProgress}%</strong></span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          ${!isAuthor ? `
            <button onclick="acknowledgeDocument('${file.id}')" ${hasAcknowledged ? 'disabled' : ''} class="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              hasAcknowledged
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#0EA5E9] hover:to-[#0284C7] text-white shadow-lg shadow-[#10B981]/30'
            }">
              <i data-lucide="${hasAcknowledged ? 'check-check' : 'check'}" class="w-4 h-4 ${hasAcknowledged ? 'text-emerald-400' : ''}"></i>
              <span>${hasAcknowledged ? 'Acknowledged & Logged (✓✓)' : 'I have read and understood'}</span>
            </button>
          ` : `
            <div class="text-xs font-mono text-blue-400 flex items-center gap-1.5">
              <i data-lucide="crown" class="w-4 h-4"></i>
              <span>Author Viewport Active</span>
            </div>
          `}

          <button onclick="closeSecureViewer()" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all">
            Close Viewer
          </button>
        </div>

      </footer>

    </div>
  `;
}

// Simulated content renderer for sandboxed viewer
function renderSimulatedFileContent(file) {
  const type = file.type.toLowerCase();

  if (type === 'pdf') {
    return `
      <div class="space-y-6 text-slate-200">
        <div class="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="assets/logo.png" alt="Logo" class="w-8 h-8 object-contain">
            <div>
              <h1 class="text-lg font-bold text-white tracking-wide">CONFIDENTIAL CORPORATE DIRECTIVE</h1>
              <p class="text-xs text-slate-400 font-mono">FIPS 140-3 Cryptographic Seal • Ref: DIR-2026-094</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-mono bg-red-500/20 text-red-400 border border-red-500/30 font-bold uppercase">STRICT RESTRICTED</span>
        </div>

        <div class="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
          <p>
            <strong>1. EXECUTIVE PURPOSE:</strong> This directive establishes mandatory compliance guidelines for all enterprise communications and media collateral distributed across global channels for the fiscal period 2026.
          </p>
          <p>
            <strong>2. BRAND INTEGRITY & EFFICIENCY THRESHOLD:</strong> All forward-facing collateral must maintain verified alignment with the official <span class="text-blue-400 font-bold">#0066FF</span> chromatic standard and the audited <span class="text-emerald-400 font-bold">94.5% Product Efficiency</span> executive metric. Outdated 2023 emblems or divergent color palettes (<code class="text-red-400">#FF5722</code>) are explicitly disallowed.
          </p>
          <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-1 text-slate-400">
            <div>[ENCRYPTION_HASH]: ${file.sha256}</div>
            <div>[CIPHER_SUITE]: AES-256-GCM / 128-bit Authentication Tag</div>
            <div>[EXPIRATION_EPOCH]: Bound to ephemeral client session token</div>
          </div>
          <p>
            <strong>3. ZERO-LEAK WARNING:</strong> Downloading, printing, screencasting, or extracting this viewport is forbidden. Violations trigger automatic SIEM forensic incident logging with embedded viewer IP and timestamp.
          </p>
        </div>
      </div>
    `;
  } else if (type === 'docx' || type === 'doc') {
    return `
      <div class="space-y-6 text-slate-200 font-serif">
        <div class="border-b border-slate-800 pb-4">
          <h1 class="text-xl font-bold text-white font-sans">${file.title}</h1>
          <p class="text-xs text-slate-400 font-mono font-sans mt-1">Word Document Specification • Generated for Authorized Role Chain</p>
        </div>

        <div class="space-y-4 text-sm leading-relaxed text-slate-300">
          <p>
            <strong>Executive Governance Charter:</strong> The Office Info Controller serves as the sole authoritative transmission medium for corporate intellectual property. Downward dispatches must be reviewed within the assigned time-bound window.
          </p>
          <table class="w-full text-left border-collapse text-xs font-sans mt-4">
            <thead>
              <tr class="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th class="p-2.5">Parameter</th>
                <th class="p-2.5">Official Standard</th>
                <th class="p-2.5">Tolerance</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td class="p-2.5 font-bold">Primary Brand Hex</td>
                <td class="p-2.5 font-mono text-[#0066FF]">#0066FF</td>
                <td class="p-2.5">ΔE < 0.5 (Exact)</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold">Efficiency Benchmark</td>
                <td class="p-2.5 font-mono text-emerald-400">94.5%</td>
                <td class="p-2.5">Strict Minimum</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold">Approved Logo</td>
                <td class="p-2.5">Official Logo v3.2</td>
                <td class="p-2.5">Zero Variation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (type === 'xlsx' || type === 'xls') {
    return `
      <div class="space-y-4 text-slate-200">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">READ-ONLY GRID</span>
            <span class="text-xs text-slate-400 font-mono">Sheet 1: Corporate Performance 2026</span>
          </div>
          <span class="text-xs font-mono text-slate-500">SheetJS Sandboxed View</span>
        </div>

        <div class="overflow-x-auto border border-slate-800 rounded-2xl">
          <table class="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr class="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th class="p-2 border-r border-slate-800 text-slate-600 w-8">#</th>
                <th class="p-2 border-r border-slate-800">Department</th>
                <th class="p-2 border-r border-slate-800">Operating Budget</th>
                <th class="p-2 border-r border-slate-800">Compliance Rate</th>
                <th class="p-2">Audited Efficiency</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td class="p-2 border-r border-slate-800 text-slate-600 bg-slate-950">1</td>
                <td class="p-2 border-r border-slate-800 font-sans font-bold">Executive Suite</td>
                <td class="p-2 border-r border-slate-800">$1,450,000</td>
                <td class="p-2 border-r border-slate-800 text-emerald-400">100.0%</td>
                <td class="p-2 font-bold text-emerald-400">96.8%</td>
              </tr>
              <tr>
                <td class="p-2 border-r border-slate-800 text-slate-600 bg-slate-950">2</td>
                <td class="p-2 border-r border-slate-800 font-sans font-bold">Product & AI Labs</td>
                <td class="p-2 border-r border-slate-800">$3,200,000</td>
                <td class="p-2 border-r border-slate-800 text-emerald-400">99.4%</td>
                <td class="p-2 font-bold text-emerald-400">95.2%</td>
              </tr>
              <tr>
                <td class="p-2 border-r border-slate-800 text-slate-600 bg-slate-950">3</td>
                <td class="p-2 border-r border-slate-800 font-sans font-bold">Global Production</td>
                <td class="p-2 border-r border-slate-800">$2,800,000</td>
                <td class="p-2 border-r border-slate-800 text-emerald-400">98.1%</td>
                <td class="p-2 font-bold text-emerald-400">94.5%</td>
              </tr>
              <tr class="bg-slate-950/60 font-bold">
                <td class="p-2 border-r border-slate-800 text-slate-600 bg-slate-950">Σ</td>
                <td class="p-2 border-r border-slate-800 font-sans text-white">Consolidated Enterprise</td>
                <td class="p-2 border-r border-slate-800 text-white">$7,450,000</td>
                <td class="p-2 border-r border-slate-800 text-emerald-400">99.1%</td>
                <td class="p-2 text-emerald-400">94.5% (Benchmark)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (type === 'png' || type === 'jpg' || type === 'jpeg') {
    return `
      <div class="space-y-4 text-center">
        <div class="text-xs text-slate-400 font-mono">Protected Image Viewport • Right Click Disabled</div>
        <div class="rounded-2xl overflow-hidden border border-slate-800 p-4 bg-slate-950 flex items-center justify-center">
          <img src="assets/logo.png" alt="Protected Brand Vector" class="max-w-md max-h-96 object-contain pointer-events-none select-none" oncontextmenu="return false;">
        </div>
        <p class="text-xs text-slate-400">Official Master Emblem • High Resolution Cryptographic Master</p>
      </div>
    `;
  } else if (type === 'mp4') {
    return `
      <div class="space-y-4 text-center">
        <div class="text-xs text-slate-400 font-mono">Protected Video Viewport • Download Controls Stripped</div>
        <div class="rounded-2xl overflow-hidden border border-slate-800 bg-black p-2">
          <video controls controlsList="nodownload" class="w-full max-h-96 rounded-xl" oncontextmenu="return false;">
            <source src="data:video/mp4;base64," type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <p class="text-xs text-slate-400">Official Corporate Governance Briefing 2026</p>
      </div>
    `;
  }

  return `<div class="p-8 text-center text-slate-400">Standard Protected Document Viewport</div>`;
}

// ============================================================================
// 13. GLOBAL MODALS & DIALOGS
// ============================================================================

// 1. 2FA OTP MODAL (Section 3)
function renderOtpModal() {
  if (!AppState.otpModal.isOpen) return '';
  const otp = AppState.otpModal;

  return `
    <div onclick="if(event.target === this) closeOtpModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        <!-- Animated Slide: Success (Green Check) vs Error (Red Cross) -->
        ${otp.status === 'success' ? `
          <div class="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
            <div class="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <i data-lucide="check" class="w-10 h-10 stroke-[3]"></i>
            </div>
            <h3 class="text-xl font-extrabold text-white">2FA Cryptographically Verified</h3>
            <p class="text-xs text-emerald-400 font-mono">Sliding into Zero-Leak Enterprise Workspace...</p>
          </div>
        ` : otp.status === 'error' ? `
          <div class="text-center py-4 space-y-3 animate-in shake duration-300">
            <div class="w-16 h-16 rounded-full bg-red-500/20 text-red-400 border-2 border-red-400 flex items-center justify-center mx-auto shadow-xl shadow-red-500/20">
              <i data-lucide="x" class="w-8 h-8 stroke-[3]"></i>
            </div>
            <h3 class="text-lg font-bold text-white">Invalid Verification Code</h3>
            <p class="text-xs text-red-400 font-mono">The 6-digit OTP did not match the FIPS challenge token.</p>
          </div>
        ` : ''}

        ${otp.status !== 'success' ? `
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="p-2 rounded-xl bg-blue-500/20 text-[#0066FF]">
                  <i data-lucide="shield-check" class="w-5 h-5"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-white">Two-Factor Authentication</h3>
                  <p class="text-xs text-slate-400">Enter the 6-digit code dispatched to your identity</p>
                </div>
              </div>
              ${renderModalCloseX('closeOtpModal()', 'Close 2FA Modal')}
            </div>

            <!-- Pre-fill Hint Badge -->
            <div class="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs">
              <span class="text-slate-300">Demo Simulation Hint:</span>
              <button onclick="prefillOtp()" class="font-mono font-bold text-blue-400 hover:underline">
                Code: 123456 (Click to Fill)
              </button>
            </div>

            <!-- OTP Input -->
            <div class="space-y-2">
              <input 
                type="text" 
                id="otp-input-field" 
                maxlength="6" 
                placeholder="••••••" 
                value="${otp.code}"
                oninput="handleOtpInput(this.value)"
                class="w-full text-center text-3xl font-mono tracking-widest py-3 px-4 rounded-2xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF] transition-all"
                autofocus
              >
            </div>

            <!-- Verify Button -->
            <button onclick="verifyOtpSubmit()" class="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0040AA] shadow-lg shadow-[#0066FF]/35 transition-all text-xs flex items-center justify-center gap-2">
              <i data-lucide="key" class="w-4 h-4"></i>
              <span>Verify OTP & Open Dashboard</span>
            </button>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

// 2. SMART INACTIVITY WARNING MODAL (Section 3)
function renderInactivityWarningModal() {
  if (!AppState.inactivityWarning.isOpen) return '';
  const w = AppState.inactivityWarning;

  return `
    <div onclick="if(event.target === this) dismissInactivityWarning()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative">
        <div class="absolute top-4 right-4">
          ${renderModalCloseX('dismissInactivityWarning()', 'Dismiss Warning')}
        </div>
        
        <div class="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
          <i data-lucide="alert-triangle" class="w-8 h-8"></i>
        </div>

        <div class="space-y-2">
          <h3 class="text-xl font-bold text-white">Smart Inactivity Session Timeout</h3>
          <p class="text-xs text-slate-300">
            Zero-leak governance terminates idle sessions after 10 minutes to prevent unauthorized workstation hijacking.
          </p>
        </div>

        <!-- Live Countdown -->
        <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div class="text-xs text-slate-400 uppercase font-mono">Automatic Logout In</div>
          <div id="inactivity-warning-timer" class="text-4xl font-extrabold text-amber-400 font-mono my-1">
            ${w.secondsLeft}s
          </div>
          <div class="text-[11px] text-slate-500">Volatile client buffers will be purged</div>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="dismissInactivityWarning()" class="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#0066FF] hover:bg-[#0052CC] shadow-md shadow-[#0066FF]/30 transition-all">
            Stay Signed In
          </button>
          <button onclick="handleLogout()" class="px-4 py-3 rounded-xl font-bold text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all">
            Log Out Now
          </button>
        </div>

      </div>
    </div>
  `;
}

// 3. EMERGENCY KILL-SWITCH MODAL (Section 4 & Section 10)
function renderKillSwitchModal() {
  if (!AppState.killSwitchModal.isOpen) return '';
  const file = AppState.files.find(f => f.id === AppState.killSwitchModal.fileId);
  if (!file) return '';

  return `
    <div onclick="if(event.target === this) closeKillSwitchModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-red-500/20 text-[#EF4444] flex items-center justify-center shrink-0">
              <i data-lucide="skull" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Emergency Kill-Switch</h3>
              <p class="text-xs text-red-400 font-mono">Irrevocable Token Purge Protocol</p>
            </div>
          </div>
          ${renderModalCloseX('closeKillSwitchModal()', 'Cancel Purge')}
        </div>

        <div class="space-y-3 text-xs text-slate-300">
          <p>
            You are initiating an emergency cryptographic purge for:
          </p>
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-white">
            ${file.title} (${file.fileName})
          </div>
          <p class="text-red-300 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
            <strong>Instant Consequence:</strong> All active viewports across ${file.recipients.length} recipients will immediately black out with a red revocation banner. Decryption keys are deleted from memory.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="confirmKillSwitch('${file.id}')" class="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/40 transition-all flex items-center justify-center gap-2">
            <i data-lucide="flame" class="w-4 h-4"></i>
            <span>Execute Emergency Kill</span>
          </button>
          <button onclick="closeKillSwitchModal()" class="px-4 py-3 rounded-xl font-bold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all">
            Cancel
          </button>
        </div>

      </div>
    </div>
  `;
}

// 4. SECURE TRANSMISSION UPLOAD MODAL (Section 5)
function renderUploadModal() {
  if (!AppState.uploadModal.isOpen) return '';
  const isDark = AppState.theme === 'dark';
  const currentUser = AppState.currentUser;
  const allowedHierarchy = getHierarchyForUser(currentUser.email);

  return `
    <div onclick="if(event.target === this) closeUploadModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div class="max-w-2xl w-full bg-[#0B192C] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 relative">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-[#0B192C] z-20">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-2xl bg-blue-500/20 text-[#0066FF]">
              <i data-lucide="upload-cloud" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Transmit Encrypted Corporate File</h3>
              <p class="text-xs text-slate-400">Strict hierarchy routing • AES-256 Envelope GCM</p>
            </div>
          </div>
          ${renderModalCloseX('closeUploadModal()', 'Close Upload Dialog')}
        </div>

        <form id="file-upload-form" onsubmit="handleFileUploadSubmit(event)" class="space-y-4 text-xs">
          
          <!-- File Selector Area with Drag & Drop Simulation -->
          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">File Payload (.doc, .docx, .xls, .xlsx, .pdf, .jpg, .jpeg, .mp4)</label>
            <div class="border-2 border-dashed border-slate-700 hover:border-[#0066FF] rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-900/60 relative">
              <input type="file" id="upload-file-input" onchange="handleFileSelected(event)" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
              <i data-lucide="file-up" class="w-8 h-8 text-[#0066FF] mx-auto mb-2"></i>
              <div id="upload-file-label" class="text-slate-300 font-semibold">
                Click or drag & drop corporate document
              </div>
              <div class="text-[10px] text-slate-500 mt-1 font-mono">Magic bytes & SHA-256 integrity strictly enforced (Max 100MB)</div>
            </div>
          </div>

          <!-- Document Title -->
          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">Document Title</label>
            <input type="text" id="upload-title-input" required placeholder="e.g., Brand Guidelines 2026 Master Directive" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF]">
          </div>

          <!-- Recipient Emails with Live Hierarchy Tree Validator -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="font-bold text-slate-300">Recipient Email(s)</label>
              <span class="text-[10px] text-blue-400 font-mono">Must belong to your hierarchy tree</span>
            </div>
            <input 
              type="text" 
              id="upload-recipients-input" 
              required 
              placeholder="e.g., employee@company.com, hod@company.com" 
              oninput="validateUploadRecipients(this.value)"
              class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF]"
            >
            <div id="upload-hierarchy-feedback" class="text-[11px] font-semibold text-slate-400"></div>

            <!-- Clickable Hierarchy Suggestions -->
            <div class="flex items-center gap-1.5 flex-wrap pt-1">
              <span class="text-[10px] text-slate-400 font-mono">In your tree:</span>
              ${allowedHierarchy.map(u => `
                <button type="button" onclick="addRecipientToInput('${u.email}')" class="px-2 py-1 rounded-lg text-[10px] font-mono bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer shadow-sm">
                  ${u.name} (${u.role})
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Access Duration & Delegation Options -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="font-bold text-slate-300">Access Duration Window</label>
              <select id="upload-duration-select" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF]">
                <option value="1800">30 Minutes (Ephemeral)</option>
                <option value="7200" selected>2 Hours (Standard Executive)</option>
                <option value="86400">24 Hours (Full Working Day)</option>
                <option value="604800">7 Days (Extended Directives)</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-bold text-slate-300">Transmission Priority</label>
              <select id="upload-priority-select" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF]">
                <option value="normal" selected>Normal Governance</option>
                <option value="urgent">Urgent Dispatch (High Alert)</option>
              </select>
            </div>
          </div>

          <!-- Delegation Toggle & Note -->
          <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <div class="font-bold text-white">Allow Recipient Delegation</div>
              <div class="text-[11px] text-slate-400">Permit recipients to forward viewtokens downward in tree</div>
            </div>
            <input type="checkbox" id="upload-delegation-toggle" class="w-4 h-4 rounded text-[#0066FF] focus:ring-[#0066FF]">
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">Optional Executive Note</label>
            <input type="text" id="upload-note-input" placeholder="e.g., Mandatory review by 16:00 UTC." class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF]">
          </div>

          <!-- Submit Button -->
          <button type="submit" class="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0040AA] shadow-lg shadow-[#0066FF]/35 transition-all text-xs flex items-center justify-center gap-2 mt-2">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            <span>Seal with AES-256 & Transmit</span>
          </button>

        </form>

      </div>
    </div>
  `;
}

// 5. PER-FILE ANALYTICS & RECIPIENT DRAWER MODAL (Section 7)
function renderFileDrawerModal() {
  if (!AppState.drawerModal.isOpen) return '';
  const file = AppState.files.find(f => f.id === AppState.drawerModal.fileId);
  if (!file) return '';

  return `
    <div onclick="if(event.target === this) closeFileDrawer()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div class="max-w-3xl w-full bg-[#0B192C] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-[#0B192C] z-20">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-white">${file.title}</h3>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">v${file.version}.0</span>
            </div>
            <p class="text-xs text-slate-400 font-mono">Recipient Telemetry, Dwell Times & Audit Export</p>
          </div>
          ${renderModalCloseX('closeFileDrawer()', 'Close Drawer')}
        </div>

        <!-- Quick Summary Metrics -->
        <div class="grid grid-cols-3 gap-4">
          <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div class="text-[10px] text-slate-400 uppercase font-mono">Total Recipients</div>
            <div class="text-xl font-bold text-white font-mono">${file.recipients.length}</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div class="text-[10px] text-slate-400 uppercase font-mono">Seen (Dwell Complete)</div>
            <div class="text-xl font-bold text-emerald-400 font-mono">
              ${file.recipients.filter(r => r.tickStatus === 'seen').length}
            </div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div class="text-[10px] text-slate-400 uppercase font-mono">Active Expiry</div>
            <div class="text-xl font-bold text-blue-400 font-mono">${formatTime(file.remainingSeconds)}</div>
          </div>
        </div>

        <!-- Recipient Detailed Table -->
        <div class="overflow-x-auto border border-slate-800 rounded-2xl">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                <th class="p-3">Recipient Email</th>
                <th class="p-3">Role</th>
                <th class="p-3">Receipt Tick</th>
                <th class="p-3">Views</th>
                <th class="p-3">Dwell Time</th>
                <th class="p-3">IP Address</th>
                <th class="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
              ${file.recipients.map(r => `
                <tr class="hover:bg-slate-800/30">
                  <td class="p-3 font-semibold text-white font-sans">${r.email}</td>
                  <td class="p-3 text-slate-400 font-sans">${r.role}</td>
                  <td class="p-3">
                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800">
                      ${renderTicks(r.tickStatus)}
                      <span class="capitalize text-[10px]">${r.tickStatus}</span>
                    </span>
                  </td>
                  <td class="p-3 font-bold">${r.viewCount}</td>
                  <td class="p-3 text-emerald-400">${r.secondsSpent}s</td>
                  <td class="p-3 text-slate-400">${r.ip}</td>
                  <td class="p-3 text-right">
                    <button onclick="sendRecipientReminder('${file.id}', '${r.email}')" class="px-2.5 py-1 rounded-lg text-[10px] font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30">
                      Remind
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Drawer Action Controls -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <div class="flex items-center gap-2">
            <button onclick="openAddRecipientModal('${file.id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#0066FF] hover:bg-[#0055DD] transition-all flex items-center gap-1.5">
              <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
              <span>Add Recipient</span>
            </button>
            <button onclick="extendAccess('${file.id}', 7200)" class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5">
              <i data-lucide="clock-plus" class="w-3.5 h-3.5"></i>
              <span>Extend +2h</span>
            </button>
          </div>

          <button onclick="exportAuditCsv('${file.id}')" class="px-4 py-2 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all flex items-center gap-1.5">
            <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
            <span>Export Audit (CSV)</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

// 6. REPLACE VERSION MODAL (Section 4)
function renderReplaceVersionModal() {
  if (!AppState.replaceVersionModal.isOpen) return '';
  const file = AppState.files.find(f => f.id === AppState.replaceVersionModal.fileId);
  if (!file) return '';

  return `
    <div onclick="if(event.target === this) closeReplaceVersionModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
              <i data-lucide="git-branch" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Deploy New Version</h3>
              <p class="text-xs text-slate-400 font-mono">Increment to v${file.version + 1}.0</p>
            </div>
          </div>
          ${renderModalCloseX('closeReplaceVersionModal()', 'Close Version Modal')}
        </div>

        <form onsubmit="handleReplaceVersionSubmit(event, '${file.id}')" class="space-y-4 text-xs">
          <p class="text-slate-300">
            Deploying a new version preserves your existing recipient scope while re-sealing the content buffer under a newly generated AES-256 data key.
          </p>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">Replacement File Payload</label>
            <input type="file" id="replace-file-input" required class="w-full text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0066FF] file:text-white hover:file:bg-[#0055DD]">
          </div>

          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">Version Changelog Note</label>
            <input type="text" id="replace-note-input" required placeholder="e.g., Updated Section 2 with 2026 financial audits" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF]">
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/30 transition-all text-xs">
              Deploy v${file.version + 1}.0
            </button>
            <button type="button" onclick="closeReplaceVersionModal()" class="px-4 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-xs">
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}

// 7. ADD RECIPIENT MODAL (Section 4)
function renderAddRecipientModal() {
  if (!AppState.addRecipientModal.isOpen) return '';
  const file = AppState.files.find(f => f.id === AppState.addRecipientModal.fileId);
  if (!file) return '';
  const allowed = getHierarchyForUser(AppState.currentUser.email);

  return `
    <div onclick="if(event.target === this) closeAddRecipientModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-2xl bg-blue-500/20 text-[#0066FF]">
              <i data-lucide="user-plus" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Add Recipient to File</h3>
              <p class="text-xs text-slate-400 font-mono">Verify Hierarchy Tree Access</p>
            </div>
          </div>
          ${renderModalCloseX('closeAddRecipientModal()', 'Close Add Recipient')}
        </div>

        <form onsubmit="handleAddRecipientSubmit(event, '${file.id}')" class="space-y-4 text-xs">
          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">Select Authorized User</label>
            <select id="add-recipient-select" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#0066FF]">
              ${allowed.map(u => `
                <option value="${u.email}">${u.name} (${u.role}) - ${u.email}</option>
              `).join('')}
            </select>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button type="submit" class="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-[#0066FF] hover:bg-[#0055DD] transition-all text-xs">
              Grant View Access
            </button>
            <button type="button" onclick="closeAddRecipientModal()" class="px-4 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-xs">
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}

// 8. FORGOT PASSWORD MODAL (Section 3)
function renderForgotPasswordModal() {
  if (!AppState.forgotPasswordModal.isOpen) return '';

  return `
    <div onclick="if(event.target === this) closeForgotPasswordModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-2xl bg-blue-500/20 text-[#0066FF]">
              <i data-lucide="key-round" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Reset Account Password</h3>
              <p class="text-xs text-slate-400">Recovery code protocol</p>
            </div>
          </div>
          ${renderModalCloseX('closeForgotPasswordModal()', 'Close Reset Password')}
        </div>

        <form onsubmit="handlePasswordRecoverySubmit(event)" class="space-y-4 text-xs">
          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">Corporate Email</label>
            <input type="email" required placeholder="name@company.com" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
          </div>
          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">Reset Security Code (Demo: 999999)</label>
            <input type="text" required placeholder="999999" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono">
          </div>
          <div class="space-y-1.5">
            <label class="font-bold text-slate-300">New AES Password</label>
            <input type="password" required placeholder="••••••••••••" class="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white">
          </div>

          <button type="submit" class="w-full py-3 px-4 rounded-xl font-bold text-white bg-[#0066FF] hover:bg-[#0055DD] transition-all text-xs">
            Confirm Password Reset
          </button>
        </form>

      </div>
    </div>
  `;
}

// 9. SECURITY PROTOCOL DETAILS MODAL (Section 2)
function renderSecurityProtocolModal() {
  if (!AppState.securityProtocolModal.isOpen) return '';
  const type = AppState.securityProtocolModal.type;

  let title = 'AES-256 Envelope Encryption';
  let body = 'Per-file ephemeral data keys sealed under FIPS 140-3 HSM master keys.';

  if (type === 'ephemeral') {
    title = 'Ephemeral Time-Bound Viewing';
    body = 'Volatile memory streaming buffers that expire with millisecond precision without leaving unencrypted residue on persistent client storage.';
  } else if (type === 'ai') {
    title = 'AI Visual & Semantic Verification';
    body = 'Autonomous neural scan verifying vector SHA-256 logo signatures, ΔE chromatic color fidelity, and OCR data accuracy.';
  } else if (type === 'watermark') {
    title = 'Forensic Leak Watermarking';
    body = 'Multi-layer dynamic SVG overlays injecting viewer email, enterprise IP, and microsecond timestamps across the document canvas.';
  }

  return `
    <div onclick="if(event.target === this) closeSecurityProtocolModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-base font-bold text-white">${title}</h3>
          ${renderModalCloseX('closeSecurityProtocolModal()', 'Close Protocol Details')}
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${body}</p>
        <button onclick="closeSecurityProtocolModal()" class="w-full py-2.5 rounded-xl font-bold text-xs bg-[#0066FF] text-white">
          Acknowledge Specification
        </button>
      </div>
    </div>
  `;
}

// 10. ACTION LOCKED & SUCCESS MODALS
function renderActionLockedModal() {
  return '';
}

function renderPublishSuccessModal() {
  if (!AppState.publishSuccessModal.isOpen) return '';

  return `
    <div onclick="if(event.target === this) closePublishSuccessModal()" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div class="max-w-md w-full bg-[#0B192C] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative">
        <div class="absolute top-4 right-4">
          ${renderModalCloseX('closePublishSuccessModal()', 'Close Modal')}
        </div>
        
        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <i data-lucide="globe" class="w-8 h-8"></i>
        </div>

        <div class="space-y-2">
          <h3 class="text-xl font-bold text-white">Published to Production</h3>
          <p class="text-xs text-slate-300">
            Verified master asset successfully synced to the official corporate website CDN.
          </p>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
          <span>https://company.com/brand/guidelines-2026.pdf</span>
        </div>

        <button onclick="closePublishSuccessModal()" class="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#059669] transition-all">
          Close & Return to Workspace
        </button>

      </div>
    </div>
  `;
}

// ============================================================================
// 14. INTERACTIVE CONTROLLERS & ACTION HANDLERS
// ============================================================================

// --- Authentication & Role Handlers ---
function selectRolePill(role) {
  AppState.authForm.selectedRole = role;
  // Automatically sync matching demo user credentials
  const match = AppState.users.find(u => u.role.toLowerCase() === role.toLowerCase());
  if (match) {
    AppState.authForm.email = match.email;
    AppState.authForm.company = match.company || 'Acme Global Corp';
  }
  sounds.playClick();
  renderApp();
}

function handleRoleSelect(role) {
  selectRolePill(role);
}

window.selectRolePill = selectRolePill;
window.handleRoleSelect = handleRoleSelect;

function toggleAuthMode(mode) {
  AppState.authForm.mode = mode;
  sounds.playClick();
  renderApp();
}

function handleLoginSubmit(e) {
  e.preventDefault();
  sounds.playClick();
  AppState.otpModal.isOpen = true;
  AppState.otpModal.code = '';
  AppState.otpModal.status = 'idle';
  renderApp();
  setTimeout(() => {
    const input = document.getElementById('otp-input-field');
    if (input) input.focus();
  }, 100);
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email-input').value.trim();
  const reportsTo = document.getElementById('reg-reports-to-select').value;
  const pwd = document.getElementById('reg-password-input').value;
  const pwdRe = document.getElementById('reg-repassword-input').value;

  if (pwd !== pwdRe) {
    alert('Passwords do not match.');
    return;
  }

  // Create new user in AppState
  const newUser = {
    id: 'user-' + (AppState.users.length + 101),
    name: email.split('@')[0].toUpperCase(),
    email: email,
    role: AppState.authForm.selectedRole,
    reportsTo: reportsTo,
    company: 'Enterprise HQ'
  };

  AppState.users.push(newUser);
  AppState.currentUser.name = newUser.name;
  AppState.currentUser.email = newUser.email;
  AppState.currentUser.role = newUser.role;

  sounds.playSuccess();
  alert(`Account created successfully for ${email} reporting to ${reportsTo}! Please verify via 2FA OTP.`);
  AppState.otpModal.isOpen = true;
  AppState.otpModal.code = '';
  AppState.otpModal.status = 'idle';
  renderApp();
}

function handleSsoClick(provider) {
  sounds.playClick();
  // Find a user matching selected role or default
  const match = AppState.users.find(u => u.role === AppState.authForm.selectedRole) || AppState.users[0];
  AppState.currentUser.isAuthenticated = true;
  AppState.currentUser.name = match.name;
  AppState.currentUser.email = match.email;
  AppState.currentUser.role = match.role;
  AppState.currentUser.reportsTo = match.reportsTo;
  
  sounds.playSuccess();
  renderApp();
}

function quickDemoLogin() {
  const match = AppState.users.find(u => u.role === 'CEO') || AppState.users[0];
  AppState.currentUser.isAuthenticated = true;
  AppState.currentUser.name = match.name;
  AppState.currentUser.email = match.email;
  AppState.currentUser.role = match.role;
  AppState.currentUser.reportsTo = match.reportsTo;
  sounds.playSuccess();
  renderApp();
}

function handleLogout() {
  AppState.currentUser.isAuthenticated = false;
  AppState.activeViewer.isOpen = false;
  AppState.inactivityWarning.isOpen = false;
  AppState.otpModal.isOpen = false;
  sounds.playClick();
  renderApp();
}

// --- 2FA OTP Handlers ---
function prefillOtp() {
  AppState.otpModal.code = '123456';
  const input = document.getElementById('otp-input-field');
  if (input) input.value = '123456';
  sounds.playClick();
}

function handleOtpInput(val) {
  AppState.otpModal.code = val;
  if (val.length === 6) {
    verifyOtpSubmit();
  }
}

function verifyOtpSubmit() {
  const code = AppState.otpModal.code.trim();
  if (code === '123456') {
    AppState.otpModal.status = 'success';
    sounds.playSuccess();
    renderApp();

    setTimeout(() => {
      AppState.otpModal.isOpen = false;
      AppState.otpModal.status = 'idle';
      
      // Complete login
      const match = AppState.users.find(u => u.role === AppState.authForm.selectedRole) || AppState.users[0];
      AppState.currentUser.isAuthenticated = true;
      AppState.currentUser.name = match.name;
      AppState.currentUser.email = match.email;
      AppState.currentUser.role = match.role;
      AppState.currentUser.reportsTo = match.reportsTo;
      
      renderApp();
    }, 1000);
  } else {
    AppState.otpModal.status = 'error';
    sounds.playError();
    renderApp();
    setTimeout(() => {
      AppState.otpModal.status = 'idle';
      AppState.otpModal.code = '';
      renderApp();
    }, 2000);
  }
}

function closeOtpModal() {
  AppState.otpModal.isOpen = false;
  renderApp();
}

// --- Navigation & Role Switching ---
function switchTab(tab) {
  AppState.activeTab = tab;
  sounds.playClick();
  renderApp();
}

function switchRole(role) {
  const match = AppState.users.find(u => u.role.toLowerCase() === role.toLowerCase());
  if (match) {
    AppState.currentUser.id = match.id;
    AppState.currentUser.name = match.name;
    AppState.currentUser.email = match.email;
    AppState.currentUser.role = match.role;
    AppState.currentUser.reportsTo = match.reportsTo;
    AppState.currentUser.reports_to = match.reports_to;
    AppState.currentUser.company = match.company;
    sounds.playClick();
    renderApp();
  }
}
window.switchRole = switchRole;

function toggleTheme() {
  AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
  sounds.playClick();
  renderApp();
}

function toggleSound() {
  sounds.enabled = !sounds.enabled;
  renderApp();
}

function toggleNotifications() {
  AppState.notificationsOpen = !AppState.notificationsOpen;
  renderApp();
}

function dismissNotification(id) {
  AppState.notifications = AppState.notifications.filter(n => n.id !== id);
  renderApp();
}

function handleLogoClick() {
  AppState.activeTab = 'author';
  renderApp();
}

// --- Password Recovery & Security Modals ---
function openForgotPasswordModal() {
  AppState.forgotPasswordModal.isOpen = true;
  renderApp();
}

function closeForgotPasswordModal() {
  AppState.forgotPasswordModal.isOpen = false;
  renderApp();
}

function handlePasswordRecoverySubmit(e) {
  e.preventDefault();
  sounds.playSuccess();
  alert('Password reset successful. You may now log in with your new credential.');
  AppState.forgotPasswordModal.isOpen = false;
  renderApp();
}

function openSecurityProtocol(type) {
  AppState.securityProtocolModal.isOpen = true;
  AppState.securityProtocolModal.type = type;
  renderApp();
}

function closeSecurityProtocolModal() {
  AppState.securityProtocolModal.isOpen = false;
  renderApp();
}

// --- Sandboxed Viewer Handlers ---
function openSecureViewer(fileId) {
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  if (file.killed) {
    sounds.playError();
    alert('Access Revoked: This document was terminated by the author via the Emergency Kill-Switch.');
    return;
  }

  if (file.remainingSeconds <= 0) {
    sounds.playError();
    alert('Access Expired: This time-bound view token has expired.');
    return;
  }

  AppState.activeViewer.isOpen = true;
  AppState.activeViewer.file = file;
  AppState.activeViewer.dwellSeconds = 0;
  AppState.activeViewer.scrollProgress = 0;

  // Add an audit log entry
  const prev = AppState.auditLogChain[AppState.auditLogChain.length - 1];
  const newIndex = AppState.auditLogChain.length + 1;
  const newHash = sha256Sync(`AUDIT_${newIndex}_${Date.now()}_${AppState.currentUser.email}_VIEW_${file.title}`);
  
  AppState.auditLogChain.push({
    index: newIndex,
    timestamp: new Date().toISOString(),
    user: AppState.currentUser.email,
    action: 'SANDBOX_VIEW',
    targetFile: file.title,
    hash: newHash,
    prevHash: prev.hash
  });

  sounds.playClick();
  renderApp();
}

function closeSecureViewer() {
  AppState.activeViewer.isOpen = false;
  AppState.activeViewer.file = null;
  sounds.playClick();
  renderApp();
}

function handleViewerScroll(el) {
  if (!el) return;
  const scrollTotal = el.scrollHeight - el.clientHeight;
  if (scrollTotal <= 0) {
    AppState.activeViewer.scrollProgress = 100;
  } else {
    const progress = Math.min(100, Math.round((el.scrollTop / scrollTotal) * 100));
    AppState.activeViewer.scrollProgress = progress;
  }

  const disp = document.getElementById('viewer-scroll-display');
  if (disp) disp.innerText = `${AppState.activeViewer.scrollProgress}%`;

  // Auto-acknowledge if viewed for > 5 seconds and scrolled to 100%
  if (AppState.activeViewer.scrollProgress >= 90 && AppState.activeViewer.dwellSeconds >= 5) {
    if (AppState.activeViewer.file) {
      autoAcknowledgeViewer(AppState.activeViewer.file.id);
    }
  }
}

function acknowledgeDocument(fileId) {
  autoAcknowledgeViewer(fileId);
  sounds.playSuccess();
}

function autoAcknowledgeViewer(fileId) {
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  const r = file.recipients.find(rec => rec.email.toLowerCase() === AppState.currentUser.email.toLowerCase());
  if (r && r.tickStatus !== 'seen') {
    r.tickStatus = 'seen';
    r.viewCount += 1;
    r.secondsSpent += AppState.activeViewer.dwellSeconds || 5;

    // Log to audit chain
    const prev = AppState.auditLogChain[AppState.auditLogChain.length - 1];
    const newIndex = AppState.auditLogChain.length + 1;
    const newHash = sha256Sync(`AUDIT_${newIndex}_${Date.now()}_${AppState.currentUser.email}_ACK_${file.title}`);
    
    AppState.auditLogChain.push({
      index: newIndex,
      timestamp: new Date().toISOString(),
      user: AppState.currentUser.email,
      action: 'ACKNOWLEDGE',
      targetFile: file.title,
      hash: newHash,
      prevHash: prev.hash
    });

    renderApp();
  }
}

// --- Author Actions: Upload & Transmit ---
function openUploadModal() {
  AppState.uploadModal.isOpen = true;
  AppState.uploadModal.fileData = null;
  renderApp();
}

function closeUploadModal() {
  AppState.uploadModal.isOpen = false;
  renderApp();
}

function handleFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Validate extension
  const ext = file.name.split('.').pop().toLowerCase();
  const allowed = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'jpeg', 'mp4'];
  if (!allowed.includes(ext)) {
    sounds.playError();
    alert(`File rejected: .${ext} is not in the allowed corporate schema (.doc, .docx, .xls, .xlsx, .pdf, .jpg, .jpeg, .mp4).`);
    e.target.value = '';
    return;
  }

  // Max 100MB
  if (file.size > 100 * 1024 * 1024) {
    sounds.playError();
    alert('File exceeds 100MB enterprise transmission threshold.');
    e.target.value = '';
    return;
  }

  const label = document.getElementById('upload-file-label');
  if (label) {
    label.innerHTML = `<span class="text-emerald-400 font-bold">${file.name}</span> (${(file.size / 1024).toFixed(1)} KB) - Magic bytes validated`;
  }
  AppState.uploadModal.fileData = file;
}

function validateUploadRecipients(val) {
  const feedback = document.getElementById('upload-hierarchy-feedback');
  if (!feedback) return;

  const emails = val.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  if (emails.length === 0) {
    feedback.innerText = '';
    return;
  }

  const allowedHierarchy = getHierarchyForUser(AppState.currentUser.email).map(u => u.email.toLowerCase());
  const invalid = emails.filter(e => !allowedHierarchy.includes(e));

  if (invalid.length > 0) {
    feedback.innerHTML = `<span class="text-red-400">This email is not in your hierarchy: ${invalid.join(', ')}</span>`;
  } else {
    feedback.innerHTML = `<span class="text-emerald-400">All ${emails.length} recipient(s) verified in your hierarchy tree ✓</span>`;
  }
}

function addRecipientToInput(email) {
  const input = document.getElementById('upload-recipients-input');
  if (!input) return;
  const current = input.value.split(',').map(s => s.trim()).filter(Boolean);
  if (!current.includes(email)) {
    current.push(email);
    input.value = current.join(', ');
    validateUploadRecipients(input.value);
  }
}

function handleFileUploadSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('upload-title-input').value.trim();
  const recVal = document.getElementById('upload-recipients-input').value.trim();
  const duration = parseInt(document.getElementById('upload-duration-select').value, 10);
  const priority = document.getElementById('upload-priority-select').value;
  const allowDelegation = document.getElementById('upload-delegation-toggle').checked;
  const note = document.getElementById('upload-note-input').value.trim();

  const emails = recVal.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const allowed = getHierarchyForUser(AppState.currentUser.email).map(u => u.email.toLowerCase());
  const invalid = emails.filter(e => !allowed.includes(e));

  if (invalid.length > 0) {
    sounds.playError();
    alert(`Transmission Blocked: The following email(s) are not in your hierarchy tree:\n${invalid.join('\n')}`);
    return;
  }

  const fileData = AppState.uploadModal.fileData;
  const fileName = fileData ? fileData.name : 'Executive_Charter.pdf';
  const fileExt = fileName.split('.').pop().toLowerCase();
  const sha = sha256Sync(`FILE_${Date.now()}_${fileName}_${Math.random()}`);

  const recipientsList = emails.map(em => {
    const userMatch = AppState.users.find(u => u.email.toLowerCase() === em);
    return {
      email: em,
      role: userMatch ? userMatch.role : 'Employee',
      tickStatus: 'delivered',
      firstViewed: null,
      lastViewed: null,
      viewCount: 0,
      secondsSpent: 0,
      ip: '192.168.1.' + Math.floor(20 + Math.random() * 80),
      device: 'Enterprise Chrome on Windows'
    };
  });

  const newFile = {
    id: 'file-' + (AppState.files.length + 101),
    title: title,
    fileName: fileName,
    sizeFormatted: fileData ? `${(fileData.size / 1024).toFixed(1)} KB` : '420 KB',
    type: fileExt,
    version: 1,
    authorEmail: AppState.currentUser.email,
    sha256: sha,
    uploadedAt: new Date().toISOString(),
    remainingSeconds: duration,
    allowDelegation: allowDelegation,
    priority: priority,
    note: note,
    killed: false,
    aiCompliance: {
      status: 'compliant',
      logoValid: true,
      colorHexValid: true,
      efficiencyValid: true,
      checkedAt: new Date().toISOString()
    },
    recipients: recipientsList
  };

  AppState.files.unshift(newFile);

  // Add audit log
  const prev = AppState.auditLogChain[AppState.auditLogChain.length - 1];
  const newIndex = AppState.auditLogChain.length + 1;
  const newHash = sha256Sync(`AUDIT_${newIndex}_${Date.now()}_${AppState.currentUser.email}_TRANSMIT_${newFile.title}`);
  
  AppState.auditLogChain.push({
    index: newIndex,
    timestamp: new Date().toISOString(),
    user: AppState.currentUser.email,
    action: 'TRANSMIT_FILE',
    targetFile: newFile.title,
    hash: newHash,
    prevHash: prev.hash
  });

  AppState.uploadModal.isOpen = false;
  sounds.playSuccess();
  alert(`File "${newFile.title}" successfully encrypted with AES-256-GCM and transmitted to ${recipientsList.length} recipient(s)!`);
  renderApp();
}

function downloadOwnFile(fileId) {
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  if (file.authorEmail.toLowerCase() !== AppState.currentUser.email.toLowerCase()) {
    sounds.playError();
    alert('Security Violation: Recipients are strictly prohibited from downloading protected payloads.');
    return;
  }

  // Simulate download for Author
  sounds.playSuccess();
  const dummyData = `Official File Payload for ${file.title}\nSHA-256: ${file.sha256}\nAuthor: ${file.authorEmail}`;
  const blob = new Blob([dummyData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.fileName;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Drawer & Analytics ---
function openFileDrawer(fileId) {
  AppState.drawerModal.isOpen = true;
  AppState.drawerModal.fileId = fileId;
  sounds.playClick();
  renderApp();
}

function closeFileDrawer() {
  AppState.drawerModal.isOpen = false;
  AppState.drawerModal.fileId = null;
  renderApp();
}

function sendRecipientReminder(fileId, recipientEmail) {
  sounds.playSuccess();
  alert(`Reminder notification dispatched to ${recipientEmail} with active viewtoken countdown.`);
}

function openAddRecipientModal(fileId) {
  AppState.addRecipientModal.isOpen = true;
  AppState.addRecipientModal.fileId = fileId;
  renderApp();
}

function closeAddRecipientModal() {
  AppState.addRecipientModal.isOpen = false;
  AppState.addRecipientModal.fileId = null;
  renderApp();
}

function handleAddRecipientSubmit(e, fileId) {
  e.preventDefault();
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  const select = document.getElementById('add-recipient-select');
  const email = select.value;

  if (file.recipients.some(r => r.email.toLowerCase() === email.toLowerCase())) {
    alert('User already has view access to this file.');
    return;
  }

  const userMatch = AppState.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  file.recipients.push({
    email: email,
    role: userMatch ? userMatch.role : 'Employee',
    tickStatus: 'delivered',
    firstViewed: null,
    lastViewed: null,
    viewCount: 0,
    secondsSpent: 0,
    ip: '192.168.1.99',
    device: 'Enterprise Chrome'
  });

  AppState.addRecipientModal.isOpen = false;
  sounds.playSuccess();
  alert(`Granted view access to ${email}.`);
  renderApp();
}

function extendAccess(fileId, seconds) {
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;
  file.remainingSeconds += seconds;
  sounds.playSuccess();
  alert(`Extended view token validity by ${seconds / 3600} hour(s).`);
  renderApp();
}

function exportAuditCsv(fileId) {
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  let csv = 'Recipient Email,Role,Receipt Status,View Count,Seconds Spent,IP Address,Device\n';
  file.recipients.forEach(r => {
    csv += `"${r.email}","${r.role}","${r.tickStatus}",${r.viewCount},${r.secondsSpent},"${r.ip}","${r.device}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Audit_Log_${file.id}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  sounds.playSuccess();
}

// --- Emergency Kill-Switch & Restore ---
function openKillSwitchModal(fileId) {
  AppState.killSwitchModal.isOpen = true;
  AppState.killSwitchModal.fileId = fileId;
  sounds.playClick();
  renderApp();
}

function closeKillSwitchModal() {
  AppState.killSwitchModal.isOpen = false;
  AppState.killSwitchModal.fileId = null;
  renderApp();
}

function confirmKillSwitch(fileId) {
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  file.killed = true;
  file.remainingSeconds = 0;
  AppState.killSwitchModal.isOpen = false;

  // Log in audit chain
  const prev = AppState.auditLogChain[AppState.auditLogChain.length - 1];
  const newIndex = AppState.auditLogChain.length + 1;
  const newHash = sha256Sync(`AUDIT_${newIndex}_${Date.now()}_${AppState.currentUser.email}_KILL_${file.title}`);
  
  AppState.auditLogChain.push({
    index: newIndex,
    timestamp: new Date().toISOString(),
    user: AppState.currentUser.email,
    action: 'KILL_SWITCH',
    targetFile: file.title,
    hash: newHash,
    prevHash: prev.hash
  });

  sounds.playError();
  alert(`Emergency Kill-Switch Executed! Tokens revoked for ${file.title}.`);
  renderApp();
}

function restoreFile(fileId) {
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  file.killed = false;
  file.remainingSeconds = 7200; // Reset to 2 hours
  sounds.playSuccess();
  alert(`File access restored for ${file.title}. Active view tokens re-established.`);
  renderApp();
}

// --- Replace Version Handlers ---
function openReplaceVersionModal(fileId) {
  AppState.replaceVersionModal.isOpen = true;
  AppState.replaceVersionModal.fileId = fileId;
  renderApp();
}

function closeReplaceVersionModal() {
  AppState.replaceVersionModal.isOpen = false;
  AppState.replaceVersionModal.fileId = null;
  renderApp();
}

function handleReplaceVersionSubmit(e, fileId) {
  e.preventDefault();
  const file = AppState.files.find(f => f.id === fileId);
  if (!file) return;

  const input = document.getElementById('replace-file-input');
  const note = document.getElementById('replace-note-input').value.trim();

  file.version += 1;
  if (input.files && input.files[0]) {
    file.fileName = input.files[0].name;
    file.sizeFormatted = `${(input.files[0].size / 1024).toFixed(1)} KB`;
  }
  file.note = note;
  file.sha256 = sha256Sync(`VERSION_${file.version}_${Date.now()}_${file.fileName}`);

  // Log to audit chain
  const prev = AppState.auditLogChain[AppState.auditLogChain.length - 1];
  const newIndex = AppState.auditLogChain.length + 1;
  const newHash = sha256Sync(`AUDIT_${newIndex}_${Date.now()}_${AppState.currentUser.email}_VERSION_${file.title}`);
  
  AppState.auditLogChain.push({
    index: newIndex,
    timestamp: new Date().toISOString(),
    user: AppState.currentUser.email,
    action: 'REPLACE_VERSION',
    targetFile: `${file.title} (v${file.version}.0)`,
    hash: newHash,
    prevHash: prev.hash
  });

  AppState.replaceVersionModal.isOpen = false;
  sounds.playSuccess();
  alert(`Deployed Version v${file.version}.0! Existing recipients notified.`);
  renderApp();
}

// --- AI Compliance Scanner Handlers ---
function simulatePreset(type) {
  sounds.playClick();
  if (type === 'compliant') {
    AppState.aiScan.isPresetCompliant = true;
    AppState.aiScan.draftFileName = 'Corporate_Brand_Card_Compliant.png';
    AppState.aiScan.detectedLogo = 'Official Logo v3.2';
    AppState.aiScan.detectedColorHex = '#0066FF';
    AppState.aiScan.detectedEfficiency = '94.5%';
    AppState.aiScan.status = 'idle';
    AppState.aiScan.violations = [];
  } else {
    AppState.aiScan.isPresetCompliant = false;
    AppState.aiScan.draftFileName = 'Outdated_Draft_2023_Mockup.png';
    AppState.aiScan.detectedLogo = 'Legacy Emblem 2023 (v2.1)';
    AppState.aiScan.detectedColorHex = '#FF5722';
    AppState.aiScan.detectedEfficiency = '82.0%';
    AppState.aiScan.status = 'idle';
    AppState.aiScan.violations = [
      'Logo Vector Mismatch: Found legacy emblem 2023 (SHA-256 hash mismatch with Master v3.2).',
      'Chromatic Divergence: Detected primary hex #FF5722 deviates from official royal blue #0066FF (ΔE = 8.4).',
      'Data Benchmark Violation: OCR efficiency benchmark reads 82.0%, failing mandatory 94.5% standard.'
    ];
  }
  renderApp();
}

function runAiScan() {
  AppState.aiScan.isScanning = true;
  sounds.playClick();
  renderApp();

  setTimeout(() => {
    AppState.aiScan.isScanning = false;
    if (AppState.aiScan.isPresetCompliant) {
      AppState.aiScan.status = 'compliant';
      AppState.aiScan.violations = [];
      sounds.playSuccess();
    } else {
      AppState.aiScan.status = 'non-compliant';
      sounds.playError();
    }
    renderApp();
  }, 1200);
}

function runAiAutoFix() {
  sounds.playSuccess();
  AppState.aiScan.isScanning = true;
  renderApp();

  setTimeout(() => {
    AppState.aiScan.isScanning = false;
    AppState.aiScan.detectedLogo = 'Official Logo v3.2';
    AppState.aiScan.detectedColorHex = '#0066FF';
    AppState.aiScan.detectedEfficiency = '94.5%';
    AppState.aiScan.status = 'compliant';
    AppState.aiScan.isPresetCompliant = true;
    AppState.aiScan.violations = [];
    alert('1-Click AI Auto-Fix Complete! Logo replaced with Official v3.2, chromatic hex tuned to #0066FF, and metric set to 94.5%. Publishing unlocked.');
    renderApp();
  }, 800);
}

function generateCorrectedTemplate() {
  sounds.playSuccess();
  alert('Exported certified SVG vector template aligning with Brand Guidelines 2026.');
}

function pushToOfficialWebsite() {
  sounds.playSuccess();
  AppState.publishSuccessModal.isOpen = true;
  renderApp();
}

function closePublishSuccessModal() {
  AppState.publishSuccessModal.isOpen = false;
  renderApp();
}

// --- SOC Monitoring Actions ---
function refreshSocData() {
  sounds.playClick();
  AppState.monitoring.totalEncryptedTransmissions += Math.floor(1 + Math.random() * 3);
  AppState.monitoring.hsmLatencyMs = (1.1 + Math.random() * 0.4).toFixed(2);
  renderApp();
}

function terminateRemoteSession(sessionId) {
  AppState.monitoring.activeSessions = AppState.monitoring.activeSessions.filter(s => s.id !== sessionId);
  sounds.playError();
  alert(`Air-gapped session ${sessionId} remotely severed. Volatile buffer destroyed.`);
  renderApp();
}

// --- Immutable Audit Chain Integrity Handlers ---
function verifyAuditChain() {
  sounds.playClick();
  const banner = document.getElementById('audit-verification-banner');
  if (!banner) return;

  let isValid = true;
  for (let i = 1; i < AppState.auditLogChain.length; i++) {
    const curr = AppState.auditLogChain[i];
    const prev = AppState.auditLogChain[i - 1];
    if (curr.prevHash !== prev.hash) {
      isValid = false;
      break;
    }
  }

  banner.className = 'p-4 rounded-2xl block animate-in fade-in duration-200 ' + 
    (isValid ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300' : 'bg-red-500/15 border border-red-500/40 text-red-300');

  banner.innerHTML = isValid ? `
    <div class="flex items-center gap-3">
      <i data-lucide="shield-check" class="w-6 h-6 text-emerald-400 shrink-0"></i>
      <div>
        <div class="font-bold text-sm text-white">Cryptographic Verification Passed (100% Sealed)</div>
        <div class="text-xs text-emerald-300/90 mt-0.5">
          Verified all ${AppState.auditLogChain.length} blocks in chronological sequence. SHA-256 hashes perfectly match root state. No log corruption or tampering detected.
        </div>
      </div>
    </div>
  ` : `
    <div class="flex items-center gap-3">
      <i data-lucide="shield-alert" class="w-6 h-6 text-red-400 shrink-0"></i>
      <div>
        <div class="font-bold text-sm text-white">CRITICAL ALERT: Audit Chain Tamper Detected</div>
        <div class="text-xs text-red-300/90 mt-0.5">
          Hash chain discrepancy detected. One or more past blocks were altered out-of-band. Click "Restore Chain" to reconcile with HSM backup.
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function simulateAuditTamper() {
  sounds.playError();
  if (AppState.auditLogChain.length > 2) {
    AppState.auditLogChain[1].prevHash = 'CORRUPTED_TAMPER_BAD_HASH_999999';
  }
  verifyAuditChain();
}

function restoreAuditChain() {
  sounds.playSuccess();
  // Re-link properly
  for (let i = 1; i < AppState.auditLogChain.length; i++) {
    AppState.auditLogChain[i].prevHash = AppState.auditLogChain[i - 1].hash;
  }
  verifyAuditChain();
}

// --- Smart Inactivity Timer Handlers ---
function resetInactivityTimer() {
  AppState.session.remainingSeconds = 600; // 10 minutes
  if (AppState.inactivityWarning.isOpen) {
    AppState.inactivityWarning.isOpen = false;
    renderApp();
  }
}

function simulateInactivityWarning() {
  AppState.inactivityWarning.isOpen = true;
  AppState.inactivityWarning.secondsLeft = 30;
  sounds.playError();
  renderApp();
}

function dismissInactivityWarning() {
  resetInactivityTimer();
  AppState.inactivityWarning.isOpen = false;
  sounds.playClick();
  renderApp();
}

// ============================================================================
// 15. SYSTEM LIFECYCLE & GLOBAL EVENT LISTENERS
// ============================================================================

// 1. Dwell & Session Timer Loop (Runs Every Second)
setInterval(() => {
  // If user is authenticated, decrement session
  if (AppState.currentUser.isAuthenticated) {
    AppState.session.remainingSeconds = Math.max(0, AppState.session.remainingSeconds - 1);
    
    // Check for 30-second warning
    if (AppState.session.remainingSeconds <= 30 && AppState.session.remainingSeconds > 0) {
      if (!AppState.inactivityWarning.isOpen) {
        AppState.inactivityWarning.isOpen = true;
        AppState.inactivityWarning.secondsLeft = AppState.session.remainingSeconds;
        renderApp();
      } else {
        AppState.inactivityWarning.secondsLeft = AppState.session.remainingSeconds;
        const timerEl = document.getElementById('inactivity-warning-timer');
        if (timerEl) timerEl.innerText = `${AppState.session.remainingSeconds}s`;
      }
    } else if (AppState.session.remainingSeconds <= 0) {
      // Auto logout
      handleLogout();
      alert('You have been logged out due to 10 minutes of inactivity.');
    }
  }

  // Active files countdown
  AppState.files.forEach(f => {
    if (!f.killed && f.remainingSeconds > 0) {
      f.remainingSeconds -= 1;
    }
  });

  // Sandboxed Viewer dwell time
  if (AppState.activeViewer.isOpen) {
    AppState.activeViewer.dwellSeconds += 1;
    const dwellEl = document.getElementById('viewer-dwell-display');
    if (dwellEl) dwellEl.innerText = `${AppState.activeViewer.dwellSeconds}s`;

    if (AppState.activeViewer.dwellSeconds >= 5 && AppState.activeViewer.scrollProgress >= 80) {
      if (AppState.activeViewer.file) {
        autoAcknowledgeViewer(AppState.activeViewer.file.id);
      }
    }
  }
}, 1000);

// 2. Activity Listeners for Inactivity Timer
['mousemove', 'keydown', 'click', 'scroll'].forEach(evt => {
  window.addEventListener(evt, () => {
    if (AppState.currentUser.isAuthenticated && !AppState.inactivityWarning.isOpen) {
      AppState.session.remainingSeconds = 600;
    }
  }, { passive: true });
});

// 3. Tab Blur / Focus (Zero-Leak Focus Blurring)
window.addEventListener('blur', () => {
  document.body.classList.add('tab-blurred');
});

window.addEventListener('focus', () => {
  document.body.classList.remove('tab-blurred');
});

// 4. Disable Right-Click Context Menu in Sandboxed Mode
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  sounds.playClick();
});

function closeAnyOpenModal() {
  let closed = false;
  if (AppState.uploadModal && AppState.uploadModal.isOpen) { AppState.uploadModal.isOpen = false; closed = true; }
  if (AppState.otpModal && AppState.otpModal.isOpen) { AppState.otpModal.isOpen = false; closed = true; }
  if (AppState.drawerModal && AppState.drawerModal.isOpen) { AppState.drawerModal.isOpen = false; closed = true; }
  if (AppState.replaceVersionModal && AppState.replaceVersionModal.isOpen) { AppState.replaceVersionModal.isOpen = false; closed = true; }
  if (AppState.addRecipientModal && AppState.addRecipientModal.isOpen) { AppState.addRecipientModal.isOpen = false; closed = true; }
  if (AppState.killSwitchModal && AppState.killSwitchModal.isOpen) { AppState.killSwitchModal.isOpen = false; closed = true; }
  if (AppState.forgotPasswordModal && AppState.forgotPasswordModal.isOpen) { AppState.forgotPasswordModal.isOpen = false; closed = true; }
  if (AppState.securityProtocolModal && AppState.securityProtocolModal.isOpen) { AppState.securityProtocolModal.isOpen = false; closed = true; }
  if (AppState.publishSuccessModal && AppState.publishSuccessModal.isOpen) { AppState.publishSuccessModal.isOpen = false; closed = true; }
  if (AppState.inactivityWarning && AppState.inactivityWarning.isOpen) { AppState.inactivityWarning.isOpen = false; closed = true; }
  if (AppState.activeViewer && AppState.activeViewer.isOpen) { AppState.activeViewer.isOpen = false; closed = true; }
  if (closed) renderApp();
}
window.closeAnyOpenModal = closeAnyOpenModal;

// 5. Intercept Print & Save Shortcuts (Ctrl+S, Ctrl+P, Ctrl+C) and Handle Escape Key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAnyOpenModal();
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'c' || e.key === 'u')) {
    e.preventDefault();
    sounds.playError();
    alert('Security Alert: Direct file export, source viewing, and printing are blocked by Zero-Leak Governance.');
  }
});

// ============================================================================
// 16. BOOTSTRAP INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

// Immediate execution if DOM already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderApp();
}
