import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Activity, MessageSquare, Mic, Image as ImageIcon, 
  Wind, BarChart2, Pill, FlameKindling, CloudRain, 
  AlertTriangle, User, LogOut, Send, Upload, ChevronRight
} from "lucide-react";
import "./styles.css";

const API_BASE = "https://lungwhisperer-backend-production.up.railway.app";

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
  { id: 'xray', label: 'X-Ray AI', icon: ImageIcon },
  { id: 'cough', label: 'Cough Analyzer', icon: Mic },
  { id: 'breathing', label: 'Breathing', icon: Wind },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'medications', label: 'Meds', icon: Pill },
  { id: 'smoking', label: 'Quit Smoking', icon: FlameKindling },
  { id: 'weather', label: 'Weather', icon: CloudRain },
  { id: 'warnings', label: 'Early Warning', icon: AlertTriangle },
  { id: 'profile', label: 'Profile', icon: User },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user] = useState({ name: "Sai Kumar", email: "sai@vignan.edu" });

  return (
    <div className="dashboard-shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">Lung Whisperer</div>
        
        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="nav-item" style={{ marginTop: 'auto', color: '#ef4444' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content-area">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <span className="university-tag">Vignan's Institute of Information Technology</span>
            <h1 className="title" style={{ fontSize: '1.8rem', marginBottom: 0 }}>
              {NAV_ITEMS.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600 }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live Monitoring Active</div>
            </div>
            <div style={{ 
              width: 40, height: 40, borderRadius: '50%', 
              background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 
            }}>SK</div>
          </div>
        </header>

        {activeTab === 'dashboard' && <DashboardHome />}
        {activeTab === 'assistant' && <AssistantModule />}
        {activeTab === 'xray' && <XRayModule />}
        {activeTab === 'cough' && <CoughModule />}
        {['breathing', 'analytics', 'medications', 'smoking', 'weather', 'warnings', 'profile'].includes(activeTab) && (
          <div className="glass-panel">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h2>
            <p style={{ color: '#94a3b8' }}>This feature is currently being integrated from the advanced source assets. Stay tuned for the full multi-modal release.</p>
          </div>
        )}
      </main>
    </div>
  );
}

// SUB-MODULE: DASHBOARD HOME
function DashboardHome() {
  return (
    <>
      <div className="metric-grid">
        <StatCard label="Risk Score" value="38" unit="/100" color="#fbbf24" icon={Activity} />
        <StatCard label="SpO₂ Level" value="96" unit="%" color="#10b981" icon={Activity} />
        <StatCard label="Air Quality" value="85" unit="AQI" color="#fbbf24" icon={CloudRain} />
        <StatCard label="Exhale Cap." value="12" unit="sec" color="#3b82f6" icon={Wind} />
      </div>

      <div className="glass-panel">
        <h3 style={{ marginBottom: '1.5rem' }}>AI Insights & Warnings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AlertBox type="warning" title="Rising Cough Frequency" desc="Your cough severity increased 15% over the last 3 days." />
          <AlertBox type="info" title="Stable Breathing" desc="Your exhale duration has been consistent this week." />
        </div>
      </div>
    </>
  );
}

// SUB-MODULE: X-RAY AI
function XRayModule() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${API_BASE}/predict-xray/`, formData);
      setResult(res.data);
    } catch (err) {
      alert("Error connecting to AI Backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ 
          width: 80, height: 80, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
        }}>
          <ImageIcon size={40} color="#3b82f6" />
        </div>
        <h3>Upload Chest X-Ray</h3>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>AI vision analysis for Pneumonia, TB, and other conditions.</p>
        
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        
        <button 
          className="primary-btn" 
          style={{ width: '100%', marginTop: '1rem' }}
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "AI Processing..." : "Start Analysis"}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{result.prediction}</h2>
            <div style={{ padding: '0.4rem 1rem', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
              {result.confidence}% Confidence
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.8rem' }}>Findings</h4>
            {result.findings?.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>{f.label}</span>
                <span style={{ color: f.status === 'Normal' ? '#10b981' : '#fbbf24' }}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// SUB-MODULE: COUGH ANALYZER
function CoughModule() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${API_BASE}/predict/`, formData);
      setResult(res.data);
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{ 
          width: 80, height: 80, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
        }}>
          <Mic size={40} color="#3b82f6" />
        </div>
        <input type="file" accept=".wav" onChange={e => setFile(e.target.files[0])} />
        <button className="primary-btn" style={{ width: '100%', marginTop: '1rem' }} onClick={handlePredict} disabled={loading}>
          {loading ? "Analyzing Audio..." : "Predict Disease"}
        </button>
      </div>
      {result && (
        <div className="glass-panel" style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.05)' }}>
          <h2 style={{ color: '#10b981' }}>{result.prediction}</h2>
          <p>{result.confidence}% Probability</p>
        </div>
      )}
    </div>
  );
}

// SUB-MODULE: AI ASSISTANT
function AssistantModule() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your AI Pulmonary Assistant. How are your lungs feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    
    try {
      const res = await axios.post(`${API_BASE}/chat/`, { messages: newMessages });
      setMessages([...newMessages, { role: 'bot', content: res.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'bot', content: "Sorry, I am having trouble connecting to the brain." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="message bot">Thinking...</div>}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          style={{ marginBottom: 0 }} 
          placeholder="Ask about symptoms..." 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="primary-btn" style={{ padding: '0 1.5rem' }} onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

// UI HELPERS
function StatCard({ label, value, unit, color, icon: Icon }) {
  return (
    <div className="stat-card">
      <div style={{ color, marginBottom: '0.5rem' }}><Icon size={24} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-val">{value}<span style={{ fontSize: '1rem', marginLeft: '0.2rem' }}>{unit}</span></div>
    </div>
  );
}

function AlertBox({ type, title, desc }) {
  return (
    <div style={{ 
      display: 'flex', gap: '1rem', padding: '1rem', 
      background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
      borderLeft: `4px solid ${type === 'warning' ? '#fbbf24' : '#3b82f6'}`
    }}>
      <AlertTriangle size={20} color={type === 'warning' ? '#fbbf24' : '#3b82f6'} />
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{title}</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>{desc}</div>
      </div>
      <ChevronRight size={18} style={{ marginLeft: 'auto', color: '#475569' }} />
    </div>
  );
}

export default Dashboard;