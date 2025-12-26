import React, { useState, useEffect } from 'react';
import { AppData, LearningLog, CATEGORIES, Goal } from '../types';
import { Flame, Clock, Calendar, CheckCircle2, Plus, TrendingUp, BookOpen, Star, Trash2 } from 'lucide-react';
import { INITIAL_DATA, MOTIVATIONAL_QUOTES } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface TrackerProps {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

const Tracker: React.FC<TrackerProps> = ({ data, setData }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [quote] = useState(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  
  // Stats Calculation
  const totalHours = Math.round(data.logs.reduce((acc, log) => acc + log.duration, 0) / 60);
  const totalLogs = data.logs.length;
  
  const categoryData = CATEGORIES.map(cat => ({
    name: cat,
    value: data.logs.filter(l => l.category === cat).length
  })).filter(d => d.value > 0);

  const handleCheckIn = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (data.streak.lastCheckIn === today) return; // Already checked in

    const lastDate = data.streak.lastCheckIn ? new Date(data.streak.lastCheckIn) : new Date(0);
    const diffTime = Math.abs(new Date(today).getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    let newCurrentStreak = 1;
    if (diffDays === 1) {
      newCurrentStreak = data.streak.current + 1;
    }

    const newData = {
      ...data,
      streak: {
        ...data.streak,
        current: newCurrentStreak,
        longest: Math.max(newCurrentStreak, data.streak.longest),
        lastCheckIn: today,
        totalDays: data.streak.totalDays + 1
      }
    };
    setData(newData);
  };

  const handleAddLog = (log: LearningLog) => {
    const newData = {
      ...data,
      logs: [log, ...data.logs]
    };
    setData(newData);
    setShowAddModal(false);
    handleCheckIn(); // Auto check-in on log
  };

  const handleDeleteLog = (id: string) => {
    setData(prev => ({
      ...prev,
      logs: prev.logs.filter(l => l.id !== id)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      
      {/* Header & Streak */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-white">
            <Flame size={120} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">My Learning Journey</h2>
          <p className="text-slate-400 italic mb-6">"{quote}"</p>
          
          <div className="flex items-end gap-4">
             <div className="text-center">
                <div className="text-5xl font-bold text-orange-500 flex items-center gap-2">
                  <Flame size={48} className={data.streak.lastCheckIn === new Date().toISOString().split('T')[0] ? "animate-pulse" : ""} />
                  {data.streak.current}
                </div>
                <div className="text-sm text-slate-400 mt-1">Day Streak</div>
             </div>
             <div className="h-12 w-[1px] bg-slate-700 mx-4"></div>
             <div className="text-center pb-1">
                <div className="text-2xl font-bold text-white">{data.streak.longest}</div>
                <div className="text-xs text-slate-400">Best Streak</div>
             </div>
             <div className="text-center pb-1 ml-4">
                <div className="text-2xl font-bold text-white">{data.streak.totalDays}</div>
                <div className="text-xs text-slate-400">Total Days</div>
             </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-500"/> Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Hours</span>
                <span className="text-white font-mono">{totalHours}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Sessions</span>
                <span className="text-white font-mono">{totalLogs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Avg. Daily</span>
                <span className="text-white font-mono">{(totalHours / (data.streak.totalDays || 1)).toFixed(1)}h</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus size={20} /> Log Session
          </button>
        </div>
      </div>

      {/* Charts & Goals */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Subject Distribution */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-6">Subject Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="glass-card rounded-2xl p-6 overflow-y-auto max-h-[400px]">
          <h3 className="text-white font-semibold mb-6 flex items-center justify-between">
            <span>Current Goals</span>
            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Active: {data.goals.length}</span>
          </h3>
          <div className="space-y-6">
            {data.goals.map(goal => (
              <div key={goal.id} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-medium">{goal.title}</span>
                  <span className="text-slate-400">{goal.progress}%</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden relative">
                   <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                   />
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                   <span>{goal.category}</span>
                   <span>Due: {goal.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Heatmap (Simplified Visual) */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Last 30 Days Activity</h3>
        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {Array.from({ length: 28 }).map((_, i) => {
             // Simulate "random" activity for visual demo purposes
             // In a real app, map this to actual dates from logs
             const opacity = Math.random() > 0.3 ? Math.random() : 0.1;
             const hasActivity = opacity > 0.1;
             return (
              <div 
                key={i} 
                className={`aspect-square rounded-md transition-all hover:scale-110 ${hasActivity ? 'bg-green-500' : 'bg-slate-800'}`}
                style={{ opacity: hasActivity ? opacity : 1 }}
                title={`Day ${i+1}`}
              />
             )
          })}
        </div>
      </div>

      {/* Recent Logs */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-6">Recent Learning Logs</h3>
        <div className="space-y-4">
          {data.logs.map((log) => (
            <div key={log.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-1">
                   <span className="text-white font-semibold">{log.category}</span>
                   <div className="flex gap-1">
                     {Array.from({length: log.rating}).map((_, i) => <Star key={i} size={12} className="fill-yellow-500 text-yellow-500"/>)}
                   </div>
                 </div>
                 <p className="text-slate-400 text-sm mb-2">{log.notes}</p>
                 <div className="flex gap-2 text-xs text-slate-500">
                   <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-300">{log.topics.join(', ')}</span>
                 </div>
               </div>
               <div className="flex items-center gap-6 text-sm text-slate-400 min-w-max">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14}/> {log.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14}/> {Math.floor(log.duration / 60)}h {log.duration % 60}m
                  </div>
                  <button onClick={() => handleDeleteLog(log.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
               </div>
            </div>
          ))}
          {data.logs.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No learning logs yet. Start your streak today!
            </div>
          )}
        </div>
      </div>

      {/* Add Log Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg rounded-2xl p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-white mb-6">Log Learning Session</h3>
            <AddLogForm onSubmit={handleAddLog} onCancel={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
};

const AddLogForm: React.FC<{ onSubmit: (log: LearningLog) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    category: CATEGORIES[0],
    duration: '60',
    notes: '',
    topics: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: LearningLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      category: formData.category,
      duration: parseInt(formData.duration) || 0,
      notes: formData.notes,
      topics: formData.topics.split(',').map(t => t.trim()).filter(t => t),
      rating: formData.rating
    };
    onSubmit(newLog);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-1">Category</label>
        <select 
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.category}
          onChange={e => setFormData({...formData, category: e.target.value})}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Duration (min)</label>
          <input 
            type="number" 
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.duration}
            onChange={e => setFormData({...formData, duration: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Rating (1-5)</label>
          <div className="flex gap-2 mt-2">
             {[1,2,3,4,5].map(r => (
               <button 
                 key={r} 
                 type="button" 
                 onClick={() => setFormData({...formData, rating: r})}
                 className={`p-1 rounded ${formData.rating >= r ? 'text-yellow-500' : 'text-slate-600'}`}
               >
                 <Star size={20} className={formData.rating >= r ? 'fill-yellow-500' : ''} />
               </button>
             ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Topics (comma separated)</label>
        <input 
          type="text" 
          placeholder="e.g. Pandas, SQL Join, Flexbox"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.topics}
          onChange={e => setFormData({...formData, topics: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Notes</label>
        <textarea 
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          value={formData.notes}
          onChange={e => setFormData({...formData, notes: e.target.value})}
        ></textarea>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors">
          Cancel
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
          Save Log
        </button>
      </div>
    </form>
  );
};

export default Tracker;