import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Clock, AlertTriangle, CheckCircle, XCircle, BarChart3, BookOpen, Award } from 'lucide-react';

export default function LFPMTradingSystem() {
  const [activeSection, setActiveSection] = useState('overview');
  const [dailyChecklist, setDailyChecklist] = useState({
    preMarket: { bias: false, liquidity: false, zones: false, decision: false },
    duringSession: { sweep: false, noChase: false },
    entry: { biasCheck: false, liquidityTaken: false, timingRight: false },
    postMarket: { screenshot: false, emotions: false, noRevenge: false }
  });
  const [setupChecklist, setSetupChecklist] = useState({
    biasCleared: false,
    liquidityVisible: false,
    liquidityTaken: false,
    structureConfirmed: false,
    entryZone: false,
    riskControlled: false
  });

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    saveState();
  }, [dailyChecklist, setupChecklist]);

  const loadState = async () => {
    try {
      const result = await window.storage.get('lfpm-system-state');
      if (result) {
        const data = JSON.parse(result.value);
        setDailyChecklist(data.dailyChecklist || dailyChecklist);
        setSetupChecklist(data.setupChecklist || setupChecklist);
      }
    } catch (error) {
      console.log('No saved state');
    }
  };

  const saveState = async () => {
    try {
      await window.storage.set('lfpm-system-state', JSON.stringify({
        dailyChecklist,
        setupChecklist,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const toggleDaily = (section, key) => {
    setDailyChecklist(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] }
    }));
  };

  const toggleSetup = (key) => {
    setSetupChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetDaily = () => {
    setDailyChecklist({
      preMarket: { bias: false, liquidity: false, zones: false, decision: false },
      duringSession: { sweep: false, noChase: false },
      entry: { biasCheck: false, liquidityTaken: false, timingRight: false },
      postMarket: { screenshot: false, emotions: false, noRevenge: false }
    });
  };

  const resetSetup = () => {
    setSetupChecklist({
      biasCleared: false,
      liquidityVisible: false,
      liquidityTaken: false,
      structureConfirmed: false,
      entryZone: false,
      riskControlled: false
    });
  };

  const setupProgress = Object.values(setupChecklist).filter(Boolean).length;
  const isSetupValid = setupProgress === 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Award className="w-10 h-10" />
            LFPM Trading System
          </h1>
          <p className="text-blue-100 mt-2">Direction → Liquidity → Timing → Entry</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'overview', label: 'System Overview', icon: BookOpen },
              { id: 'setup', label: 'A+ Setup Check', icon: Target },
              { id: 'daily', label: 'Daily Routine', icon: Clock },
              { id: 'rules', label: 'Anti-Overtrade', icon: AlertTriangle },
              { id: 'golden', label: 'Golden Rules', icon: Award }
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'setup' && (
          <SetupSection 
            checklist={setupChecklist} 
            toggle={toggleSetup} 
            reset={resetSetup}
            progress={setupProgress}
            isValid={isSetupValid}
          />
        )}
        {activeSection === 'daily' && (
          <DailyRoutineSection 
            checklist={dailyChecklist} 
            toggle={toggleDaily} 
            reset={resetDaily}
          />
        )}
        {activeSection === 'rules' && <AntiOvertradeSection />}
        {activeSection === 'golden' && <GoldenRulesSection />}
      </main>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-2xl p-8 border border-blue-700">
        <h2 className="text-3xl font-bold mb-4">The LFPM Formula</h2>
        <p className="text-xl text-blue-200 mb-6">More Rules ≠ More Profit | Clear Rules = Consistency</p>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 p-6 rounded-xl text-center border border-slate-700">
            <div className="text-4xl mb-3">1️⃣</div>
            <h3 className="font-bold text-lg mb-2">BIAS</h3>
            <p className="text-sm text-slate-400">Direction First</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl text-center border border-slate-700">
            <div className="text-4xl mb-3">2️⃣</div>
            <h3 className="font-bold text-lg mb-2">LIQUIDITY</h3>
            <p className="text-sm text-slate-400">Where They Hunt</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl text-center border border-slate-700">
            <div className="text-4xl mb-3">3️⃣</div>
            <h3 className="font-bold text-lg mb-2">TIMING</h3>
            <p className="text-sm text-slate-400">Killzone Sessions</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl text-center border border-slate-700">
            <div className="text-4xl mb-3">4️⃣</div>
            <h3 className="font-bold text-lg mb-2">ENTRY</h3>
            <p className="text-sm text-slate-400">Execute Last</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <InfoCard
          title="DIRECTION (Bias)"
          icon={TrendingUp}
          color="blue"
          items={[
            "Market structure (HH-HL or LL-LH)",
            "Strong vs weak trend",
            "No guessing, only confirmation"
          ]}
        />
        <InfoCard
          title="LIQUIDITY"
          icon={Target}
          color="purple"
          items={[
            "Equal highs/lows",
            "Session highs/lows",
            "Asian range",
            "Obvious SL zones"
          ]}
        />
        <InfoCard
          title="TIMING"
          icon={Clock}
          color="green"
          items={[
            "Prefer London/NY killzones",
            "Avoid dead hours",
            "Wait for sweep + confirmation"
          ]}
        />
      </div>

      <div className="bg-red-900/30 border-2 border-red-500 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
          <XCircle className="w-6 h-6" />
          No Trade Conditions
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="font-bold text-red-400">No Bias = No Trade</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="font-bold text-red-400">No Liquidity = No Trade</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="font-bold text-red-400">No Timing = No Trade</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetupSection({ checklist, toggle, reset, progress, isValid }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">A+ Setup Checklist</h2>
            <p className="text-purple-200 mt-2">A trade is valid ONLY if all conditions are met</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{progress}/6</div>
            <div className="text-purple-200 text-sm">Complete</div>
          </div>
        </div>

        <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-6">
          <div 
            className={`h-full transition-all duration-500 ${isValid ? 'bg-green-500' : 'bg-purple-500'}`}
            style={{ width: `${(progress / 6) * 100}%` }}
          />
        </div>

        <div className="space-y-3">
          <ChecklistItem
            checked={checklist.biasCleared}
            onClick={() => toggle('biasCleared')}
            number="1"
            label="Bias is Clear"
            description="Direction confirmed on higher timeframe"
          />
          <ChecklistItem
            checked={checklist.liquidityVisible}
            onClick={() => toggle('liquidityVisible')}
            number="2"
            label="Liquidity is Visible"
            description="Clear equal highs/lows or session extremes"
          />
          <ChecklistItem
            checked={checklist.liquidityTaken}
            onClick={() => toggle('liquidityTaken')}
            number="3"
            label="Liquidity is Taken/Engineered"
            description="Sweep occurred, stops triggered"
          />
          <ChecklistItem
            checked={checklist.structureConfirmed}
            onClick={() => toggle('structureConfirmed')}
            number="4"
            label="Structure Confirms After Sweep"
            description="MSB or displacement visible"
          />
          <ChecklistItem
            checked={checklist.entryZone}
            onClick={() => toggle('entryZone')}
            number="5"
            label="Entry at Discount/Premium"
            description="Positioned correctly vs equilibrium"
          />
          <ChecklistItem
            checked={checklist.riskControlled}
            onClick={() => toggle('riskControlled')}
            number="6"
            label="Risk is Controlled"
            description="1% max risk, proper position sizing"
          />
        </div>

        {isValid ? (
          <div className="mt-6 bg-green-900/30 border-2 border-green-500 rounded-xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-400 mb-2">VALID A+ SETUP</h3>
            <p className="text-green-300 mb-4">All conditions met. High probability trade confirmed.</p>
            <button
              onClick={reset}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Reset for Next Setup
            </button>
          </div>
        ) : (
          <div className="mt-6 bg-red-900/30 border-2 border-red-500 rounded-xl p-6 text-center">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-red-400 mb-2">INCOMPLETE SETUP</h3>
            <p className="text-red-300 mb-4">Missing {6 - progress} condition(s). Wait for complete setup.</p>
            <button
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Reset Checklist
            </button>
          </div>
        )}
      </div>

      <div className="bg-amber-900/30 border-2 border-amber-500 rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-3">📌 Critical Rule</h3>
        <p className="text-amber-200 text-lg">If ANY ONE condition is missing → SKIP THE TRADE</p>
      </div>
    </div>
  );
}

function DailyRoutineSection({ checklist, toggle, reset }) {
  const allComplete = 
    Object.values(checklist.preMarket).every(v => v) &&
    Object.values(checklist.duringSession).every(v => v) &&
    Object.values(checklist.entry).every(v => v) &&
    Object.values(checklist.postMarket).every(v => v);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-900/50 to-teal-900/50 rounded-2xl p-8 border border-green-700">
        <h2 className="text-3xl font-bold mb-2">Simple Daily Trading Routine</h2>
        <p className="text-green-200">Follow these steps every trading day</p>
      </div>

      <div className="grid gap-6">
        <RoutineCard title="STEP 1: Pre-Market (10-15 min)" color="blue">
          <div className="space-y-3">
            <SmallCheckItem
              checked={checklist.preMarket.bias}
              onClick={() => toggle('preMarket', 'bias')}
              label="Check higher timeframe bias"
            />
            <SmallCheckItem
              checked={checklist.preMarket.liquidity}
              onClick={() => toggle('preMarket', 'liquidity')}
              label="Mark key liquidity zones"
            />
            <SmallCheckItem
              checked={checklist.preMarket.zones}
              onClick={() => toggle('preMarket', 'zones')}
              label="Identify obvious SL zones"
            />
            <SmallCheckItem
              checked={checklist.preMarket.decision}
              onClick={() => toggle('preMarket', 'decision')}
              label="Decide: Buy or Sell ONLY"
            />
          </div>
        </RoutineCard>

        <RoutineCard title="STEP 2: During Session (London/NY)" color="purple">
          <div className="space-y-3">
            <SmallCheckItem
              checked={checklist.duringSession.sweep}
              onClick={() => toggle('duringSession', 'sweep')}
              label="Wait for liquidity sweep"
            />
            <SmallCheckItem
              checked={checklist.duringSession.noChase}
              onClick={() => toggle('duringSession', 'noChase')}
              label="No entry before sweep + No chase"
            />
          </div>
        </RoutineCard>

        <RoutineCard title="STEP 3: Entry Decision" color="green">
          <div className="space-y-3">
            <SmallCheckItem
              checked={checklist.entry.biasCheck}
              onClick={() => toggle('entry', 'biasCheck')}
              label="Ask: Bias clear?"
            />
            <SmallCheckItem
              checked={checklist.entry.liquidityTaken}
              onClick={() => toggle('entry', 'liquidityTaken')}
              label="Ask: Liquidity taken?"
            />
            <SmallCheckItem
              checked={checklist.entry.timingRight}
              onClick={() => toggle('entry', 'timingRight')}
              label="Ask: Timing right?"
            />
          </div>
        </RoutineCard>

        <RoutineCard title="STEP 4: Post-Market Review (5 min)" color="orange">
          <div className="space-y-3">
            <SmallCheckItem
              checked={checklist.postMarket.screenshot}
              onClick={() => toggle('postMarket', 'screenshot')}
              label="Screenshot chart"
            />
            <SmallCheckItem
              checked={checklist.postMarket.emotions}
              onClick={() => toggle('postMarket', 'emotions')}
              label="Note emotions & thoughts"
            />
            <SmallCheckItem
              checked={checklist.postMarket.noRevenge}
              onClick={() => toggle('postMarket', 'noRevenge')}
              label="No revenge trading tomorrow"
            />
          </div>
        </RoutineCard>
      </div>

      {allComplete ? (
        <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-green-400 mb-2">Daily Routine Complete</h3>
          <button
            onClick={reset}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors mt-3"
          >
            Reset for Tomorrow
          </button>
        </div>
      ) : (
        <div className="bg-blue-900/30 border-2 border-blue-500 rounded-xl p-6 text-center">
          <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <p className="text-blue-200 mb-3">Continue with your daily routine</p>
          <button
            onClick={reset}
            className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Reset Routine
          </button>
        </div>
      )}

      <div className="bg-blue-900/30 border-2 border-blue-500 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-400 mb-3">📌 Remember</h3>
        <p className="text-blue-200 text-lg">Plan First → Wait Second → Execute Last</p>
      </div>
    </div>
  );
}

function AntiOvertradeSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-2xl p-8 border border-red-700">
        <h2 className="text-3xl font-bold mb-2">LFPM Anti-Overtrading Rules</h2>
        <p className="text-red-200">How to avoid confusion and protect your capital</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 rounded-xl p-6 border border-red-500">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <XCircle className="w-6 h-6" />
            Why Traders Overtrade
          </h3>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-red-400">❌</span>
              <span>Watching too many pairs</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">❌</span>
              <span>Watching too many timeframes</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">❌</span>
              <span>Trading every move</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">❌</span>
              <span>Wanting to recover losses</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">❌</span>
              <span>Boredom & FOMO</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 border border-green-500">
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            LFPM Solutions
          </h3>
          <div className="space-y-4">
            <div className="bg-green-900/30 p-4 rounded-lg">
              <div className="font-bold text-green-400 mb-1">1. Maximum 1-2 Pairs</div>
              <p className="text-sm text-slate-300">Focus breeds mastery</p>
            </div>
            <div className="bg-green-900/30 p-4 rounded-lg">
              <div className="font-bold text-green-400 mb-1">2. One Main Timeframe</div>
              <p className="text-sm text-slate-300">HTF for bias, LTF for entry</p>
            </div>
            <div className="bg-green-900/30 p-4 rounded-lg">
              <div className="font-bold text-green-400 mb-1">3. One Trade Per Session</div>
              <p className="text-sm text-slate-300">Quality over quantity</p>
            </div>
            <div className="bg-green-900/30 p-4 rounded-lg">
              <div className="font-bold text-green-400 mb-1">4. One System Only</div>
              <p className="text-sm text-slate-300">LFPM. No mixing strategies</p>
            </div>
            <div className="bg-green-900/30 p-4 rounded-lg">
              <div className="font-bold text-green-400 mb-1">5. One Good Trade is Enough</div>
              <p className="text-sm text-slate-300">Patience pays, greed costs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoldenRulesSection() {
  const rules = [
    { num: 1, text: "Entry is the Last Step", desc: "Never rush. Direction, liquidity, timing first." },
    { num: 2, text: "Direction Controls Confidence", desc: "With HTF bias, you trade with certainty." },
    { num: 3, text: "Liquidity Controls Movement", desc: "Price hunts stops before reversing." },
    { num: 4, text: "Timing Controls Accuracy", desc: "Right setup, wrong time = losing trade." },
    { num: 5, text: "Discipline Controls Survival", desc: "Your edge is useless without self-control." }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-900/50 to-yellow-900/50 rounded-2xl p-8 border border-amber-700">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Award className="w-8 h-8" />
          The 5 Golden Rules
        </h2>
        <p className="text-amber-200">Memorize these forever. They are your trading compass.</p>
      </div>

      <div className="space-y-4">
        {rules.map(rule => (
          <div key={rule.num} className="bg-slate-900/50 rounded-xl p-6 border-l-4 border-amber-500 hover:bg-slate-800/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-5xl font-bold text-amber-500">{rule.num}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">{rule.text}</h3>
                <p className="text-slate-300 text-lg">{rule.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-blue-500 text-center">
        <p className="text-2xl font-bold text-blue-200 mb-4">📌 Write These Down</p>
        <p className="text-blue-300 text-lg">Print them. Put them on your wall. Review them daily.</p>
        <p className="text-blue-400 mt-4 italic">These rules separate consistent traders from gamblers.</p>
      </div>
    </div>
  );
}

function InfoCard({ title, icon: Icon, color, items }) {
  const colorClasses = {
    blue: 'from-blue-900/50 to-blue-800/50 border-blue-700',
    purple: 'from-purple-900/50 to-purple-800/50 border-purple-700',
    green: 'from-green-900/50 to-green-800/50 border-green-700'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 border`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-300">
            <span className="text-blue-400 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChecklistItem({ checked, onClick, number, label, description }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all ${
        checked 
          ? 'bg-green-900/30 border-2 border-green-500' 
          : 'bg-slate-800 border-2 border-slate-600 hover:border-slate-500'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`text-3xl font-bold ${checked ? 'text-green-400' : 'text-slate-500'}`}>
          {number}
        </div>
        <div className="flex-1">
          <div className={`font-bold text-lg ${checked ? 'text-green-400' : 'text-white'}`}>
            {label}
          </div>
          <div className="text-sm text-slate-400 mt-1">{description}</div>
        </div>
        <div className="mt-1">
          {checked ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <div className="w-6 h-6 border-2 border-slate-500 rounded-full" />
          )}
        </div>
      </div>
    </button>
  );
}

function RoutineCard({ title, color, children }) {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-900/20',
    purple: 'border-purple-500 bg-purple-900/20',
    green: 'border-green-500 bg-green-900/20',
    orange: 'border-orange-500 bg-orange-900/20'
  };

  return (
    <div className={`rounded-xl border-2 ${colorClasses[color]} p-6`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function SmallCheckItem({ checked, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
        checked 
          ? 'bg-green-900/30 border border-green-500' 
          : 'bg-slate-800/50 border border-slate-600 hover:border-slate-500'
      }`}
    >
      {checked ? (
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
      ) : (
        <div className="w-5 h-5 border-2 border-slate-500 rounded-full flex-shrink-0" />
      )}
      <span className={checked ? 'text-green-400' : 'text-slate-300'}>{label}</span>
    </button>
  );
}