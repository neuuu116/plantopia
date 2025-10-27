import React, { useState } from 'react';
import { Reminder } from '../types';

const EmptyState: React.FC = () => (
    <div className="text-center bg-white/80 p-10 rounded-xl shadow-md backdrop-blur-sm">
        <div className="mx-auto h-20 w-20 text-brand-primary/50">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.566-1.122-2.134-1.122-2.7 0L3.05 9.42a1.5 1.5 0 001.35 2.25h15.2a1.5 1.5 0 001.35-2.25l-5.6-5.584zM12 21a9 9 0 100-18 9 9 0 000 18z" />
            </svg>
        </div>
        <h3 className="mt-2 text-2xl font-semibold text-brand-text-highlight">No Reminders Yet!</h3>
        <p className="mt-1 text-base text-gray-500">Add a task above to start growing your plant care routine.</p>
    </div>
);

const RemindersPage: React.FC = () => {
    const [reminders, setReminders] = useState<Reminder[]>([
        { id: 1, text: "Water Snake Plant", frequencyDays: 14, nextReminderDate: new Date(new Date().setDate(new Date().getDate() + 2)) },
        { id: 2, text: "Fertilize Pothos", frequencyDays: 30, nextReminderDate: new Date(new Date().setDate(new Date().getDate() + 12)) },
        { id: 3, text: "Check on Calathea humidity", frequencyDays: 7, nextReminderDate: new Date(new Date().setDate(new Date().getDate() + 6)) },
    ]);
    const [newReminderText, setNewReminderText] = useState('');
    const [frequency, setFrequency] = useState(7);

    const addReminder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReminderText.trim()) return;

        const newReminder: Reminder = {
            id: Date.now(),
            text: newReminderText,
            frequencyDays: frequency,
            nextReminderDate: new Date(new Date().setDate(new Date().getDate() + frequency)),
        };
        setReminders([...reminders, newReminder]);
        setNewReminderText('');
        setFrequency(7);
    };

    const deleteReminder = (id: number) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    const completeReminder = (id: number) => {
        setReminders(reminders.map(r => {
            if (r.id === id) {
                return {
                    ...r,
                    nextReminderDate: new Date(new Date().setDate(new Date().getDate() + r.frequencyDays))
                };
            }
            return r;
        }));
    };
    
    const sortedReminders = [...reminders].sort((a, b) => a.nextReminderDate.getTime() - b.nextReminderDate.getTime());

    const getUrgencyColor = (date: Date): string => {
        const today = new Date();
        const reminderDate = new Date(date);
        today.setHours(0,0,0,0);
        reminderDate.setHours(0,0,0,0);
        const diffTime = reminderDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) return 'border-l-4 border-red-500'; // Due today or tomorrow
        if (diffDays <= 7) return 'border-l-4 border-yellow-500'; // Due within a week
        return 'border-l-4 border-green-500'; // Due later
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text-highlight">Plant Care Schedule</h1>
                <p className="text-lg text-brand-text-main/80 mt-2">Never miss a beat with your plant care routine.</p>
            </div>

            <div className="bg-white/80 p-6 rounded-xl shadow-lg mb-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-brand-text-highlight mb-4">Add a New Task</h2>
                <form onSubmit={addReminder} className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                    <input
                        type="text"
                        value={newReminderText}
                        onChange={(e) => setNewReminderText(e.target.value)}
                        placeholder="e.g., Water the Monstera"
                        className="w-full flex-grow p-3 bg-brand-bg-light border border-brand-secondary rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary transition"
                    />
                     <div className="flex items-center gap-2">
                        <label htmlFor="frequency" className="text-brand-text-main font-semibold">Every</label>
                        <input
                            type="number"
                            id="frequency"
                            value={frequency}
                            onChange={(e) => setFrequency(parseInt(e.target.value, 10) || 1)}
                            min="1"
                            className="w-24 p-3 bg-brand-bg-light border border-brand-secondary rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary transition"
                        />
                        <span className="text-brand-text-main font-semibold">days</span>
                    </div>
                    <button type="submit" className="w-full md:w-auto bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-text-highlight transition-colors duration-300 shadow-md transform hover:scale-105">
                        Add Task
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-brand-text-highlight mb-4">Upcoming Tasks</h2>
                <div className="space-y-3">
                    {sortedReminders.length > 0 ? sortedReminders.map(reminder => (
                        <div key={reminder.id} className={`bg-white/90 p-4 rounded-lg shadow-md flex items-center justify-between transition-all hover:shadow-xl backdrop-blur-sm ${getUrgencyColor(reminder.nextReminderDate)}`}>
                            <div>
                                <p className="font-bold text-lg text-brand-text-main">{reminder.text}</p>
                                <p className="text-sm text-gray-600">
                                    Next due: <span className="font-semibold">{reminder.nextReminderDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => completeReminder(reminder.id)} className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200 transition-colors" title="Mark as Done">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </button>
                                <button onClick={() => deleteReminder(reminder.id)} className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-200 transition-colors" title="Delete">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                       <EmptyState />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RemindersPage;