'use client';
import React, { useState } from 'react';
import { Clock, CheckCircle, AlertTriangle, LogOut, Plus, MoreVertical, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue, } from '@/components/ui/select';
import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { LuSparkles } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { router } from '@inertiajs/react';

type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
  status: 'To Do' | 'In Progress' | 'Done';
  completed?: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Design System Setup',
    description: 'Create comprehensive design tokens and component library',
    priority: 'High',
    category: 'Design',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'API Integration',
    description: 'Integrate REST API endpoints for tasks management',
    priority: 'High',
    category: 'Development',
    status: 'To Do',
  },
  {
    id: 3,
    title: 'Database Setup',
    description: 'Configure database schema and migrations',
    priority: 'Medium',
    category: 'Infrastructure',
    status: 'Done',
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | Task['status']>('All');
  const [filterPriority, setFilterPriority] = useState<'All' | Task['priority']>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'Medium' as Task['priority'],
    category: 'Personal',
    status: 'To Do' as Task['status'],
  });

  const openNewTaskModal = () => {
    setEditingTask(null);
    setTaskForm({
      title: '',
      description: '',
      priority: 'Medium',
      category: 'Personal',
      status: 'To Do',
    });
    setShowModal(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setTaskForm(task);
    setShowModal(true);
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) {
      alert('Title is required');
      return;
    }

    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id ? { ...editingTask, ...taskForm } : t
        )
      );
    } else {
      const newTask: Task = {
        id: Date.now(),
        ...taskForm,
      };
      setTasks([...tasks, newTask]);
    }

    setShowModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== id));
      deleteTaskAPI(id);
    }
  };

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const completedCount = tasks.filter((t) => t.status === 'Done').length;
  const urgentCount = tasks.filter((t) => t.priority === 'High').length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 17 17">
               <LuSparkles />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Hey, <span className="font-semibold text-gray-900">Fariha</span>
            </p>
              <button
      onClick={() => router.visit("/landing")}
      className="text-gray-500 px-3 py-1 hover:text-black rounded"
      aria-label="Logout"
    >
      <IoIosLogOut className="inline-block mr-1 text-lg" />
    </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Greeting Section */}
        <section className="mb-10 animate-slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {getGreeting()} 👋
          </h2>
          <p className="text-gray-600 mb-8">Here&apos;s what&apos;s on your plate today.</p>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
              <StatCard title="Total Tasks" count={totalTasks} type="total" />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <StatCard title="In Progress" count={inProgressCount} type="progress" />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <StatCard title="Completed" count={completedCount} type="done" />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <StatCard title="Urgent" count={urgentCount} type="urgent"/>
            </div>
          </div>
        </section>
        
        {/* Search & Filters */}
        <section className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 w-full"
              style={{
                boxShadow: '0 2px 8px -1px rgba(236, 72, 153, 0.08)'
              }}
            />
          </div>

          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">All Status</SelectItem>
              <SelectItem value="To Do" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">To Do</SelectItem>
              <SelectItem value="In Progress" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">In Progress</SelectItem>
              <SelectItem value="Done" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">Done</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as any)}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">All Priority</SelectItem>
              <SelectItem value="Low" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">Low</SelectItem>
              <SelectItem value="Medium" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">Medium</SelectItem>
              <SelectItem value="High" className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">High</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={openNewTaskModal}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white gap-2 w-full sm:w-auto font-medium shadow-lg hover:shadow-xl transition-all duration-200 animate-bounce-subtle"
          >
            <Plus className="w-5 h-5" />
            New Task
          </Button>
        </section>
                   {/* Tab Navigation */}
        {tasks.length > 0 && (
          <div className="flex gap-8 mt-10 border-t border-gray-200 pt-6 overflow-x-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button 
              onClick={() => setFilterStatus('All')}
              className={`font-semibold pb-3 border-b-2 transition-all duration-300 whitespace-nowrap rounded-t-lg px-2 ${
                filterStatus === 'All'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:shadow-md'
              }`}
              style={filterStatus !== 'All' ? { boxShadow: '0 4px 12px -2px rgba(236, 72, 153, 0.15)' } : {}}
            >
              All ({tasks.length})
            </button>
            <button 
              onClick={() => setFilterStatus('To Do')}
              className={`font-semibold pb-3 border-b-2 transition-all duration-300 whitespace-nowrap rounded-t-lg px-2 ${
                filterStatus === 'To Do'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:shadow-md'
              }`}
              style={filterStatus !== 'To Do' ? { boxShadow: '0 4px 12px -2px rgba(236, 72, 153, 0.15)' } : {}}
            >
              To Do ({tasks.filter((t) => t.status === 'To Do').length})
            </button>
            <button 
              onClick={() => setFilterStatus('In Progress')}
              className={`font-semibold pb-3 border-b-2 transition-all duration-300 whitespace-nowrap rounded-t-lg px-2 ${
                filterStatus === 'In Progress'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:shadow-md'
              }`}
              style={filterStatus !== 'In Progress' ? { boxShadow: '0 4px 12px -2px rgba(236, 72, 153, 0.15)' } : {}}
            >
              In Progress ({tasks.filter((t) => t.status === 'In Progress').length})
            </button>
            <button 
              onClick={() => setFilterStatus('Done')}
              className={`font-semibold pb-3 border-b-2 transition-all duration-300 whitespace-nowrap rounded-t-lg px-2 ${
                filterStatus === 'Done'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:shadow-md'
              }`}
              style={filterStatus !== 'Done' ? { boxShadow: '0 4px 12px -2px rgba(236, 72, 153, 0.15)' } : {}}
            >
              Done ({tasks.filter((t) => t.status === 'Done').length})
            </button>
          </div>
        )} <br/>
        {/* Tasks List or Empty State */}
        {filteredTasks.length === 0 ? (
          <EmptyState onCreateTask={openNewTaskModal} />
        ) : (
          <TaskList 
            tasks={filteredTasks} 
            onEdit={openEditModal} 
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}

 
      </main>

      {/* Modal */}
      {showModal && (
        <TaskModal
          isOpen={showModal}
          isEditing={!!editingTask}
          taskForm={taskForm}
          onTaskFormChange={setTaskForm}
          onSave={handleSaveTask}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

/* Stat Card Component */
function StatCard({
  title,
  count,
  type,
}: {
  title: string;
  count: number;
  type: 'total' | 'progress' | 'done' | 'urgent';
}) {
  const styles = {
    total: { bg: 'bg-blue-500', icon: 'text-blue-600', gradient: 'from-blue-500' },
    progress: { bg: 'bg-cyan-500', icon: 'text-cyan-600', gradient: 'from-cyan-500' },
    done: { bg: 'bg-purple-500', icon: 'text-purple-600', gradient: 'from-purple-500' },
    urgent: { bg: 'bg-orange-500', icon: 'text-orange-600', gradient: 'from-orange-500' },
  };

const icons = {
  total: <MdOutlinePlaylistAddCheck size={22} />,
  progress: <Clock size={22} />,
  done: <CheckCircle size={22} />,
  urgent: <AlertTriangle size={22} />,
};
  const config = styles[type];

  return (
    <div 
      className="relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-100 hover:border-pink-200 transition-all duration-300 hover:animate-glow-pink cursor-pointer group"
      style={{
        boxShadow: '0 6px 6px -1px rgba(236, 72, 153, 0.08), 0 4px 4px -1px rgba(236, 72, 153, 0.04)'
      }}
    >
      <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-gradient-to-br ${config.gradient} to-transparent`} />
      <div className={`${config.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl`}>
        {icons[type]}
      </div>
      <p className="text-4xl font-bold text-gray-900">{count}</p>
      <p className="text-gray-600 text-sm mt-1">{title}</p>
    </div>
  );
}

/* Empty State Component */
function EmptyState({ onCreateTask }: { onCreateTask: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-slide-up">
      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 animate-bounce-subtle">
        <Plus className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
      <p className="text-gray-600 mb-6 text-center max-w-sm">
        Create one to get started! Build your task list and stay organized.
      </p>
      <Button onClick={onCreateTask} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 animate-bounce-subtle">
        <Plus className="w-5 h-5" />
        Create First Task
      </Button>
    </div>
  );
}

/* Task List Component */
function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}) {
  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="relative group bg-white rounded-2xl p-6 border border-gray-100 hover:border-pink-200 transition-all duration-300 animate-fade-in"
          style={{
            animationDelay: `${index * 50}ms`,
            boxShadow: task.completed 
              ? '0 10px 25px -5px rgba(236, 72, 153, 0.15)' 
              : '0 4px 6px -1px rgba(236, 72, 153, 0.08)',
          }}
        >
          <div className="ml-4 flex justify-between items-start gap-4">
            {/* Checkbox */}
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 mt-1 ${
                task.completed
                  ? 'bg-gradient-to-br from-pink-500 to-pink-600 border-pink-600 shadow-lg shadow-pink-200'
                  : 'border-gray-300 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100'
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4 text-white animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <div className="flex-1">
              <h3 className={`font-semibold text-lg transition-all duration-300 ${
                task.completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              <p className={`text-sm mt-1 transition-all duration-300 ${
                task.completed ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {task.description}
              </p>

              <div className="flex gap-2 flex-wrap mt-4">
                {/* Priority Badge */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 ${
                    task.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : task.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}
                >
                  {task.priority}
                </span>

                {/* Category Badge */}
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
                  {task.category}
                </span>
              </div>
            </div>

           {/* Actions Menu */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button
      className="p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-gray-100 flex-shrink-0">
      <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600" />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="rounded-xl">
    <DropdownMenuItem
      onClick={() => onEdit(task)} className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white">
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={() => onDelete(task.id)} className="rounded-lg hover:bg-pink-100 hover:text-pink-600 focus:bg-pink-600 focus:text-white" >
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Task Modal Component */
function TaskModal({
  isOpen,
  isEditing,
  taskForm,
  onTaskFormChange,
  onSave,
  onCancel,
}: {
  isOpen: boolean;
  isEditing: boolean;
  taskForm: any;
  onTaskFormChange: (form: any) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={taskForm.title}
              onChange={(e) => onTaskFormChange({ ...taskForm, title: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Add details about this task..."
              value={taskForm.description}
              onChange={(e) => onTaskFormChange({ ...taskForm, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <Select
                value={taskForm.priority}
                onValueChange={(value) => onTaskFormChange({ ...taskForm, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select
                value={taskForm.status}
                onValueChange={(value) => onTaskFormChange({ ...taskForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Input
              type="text"
              placeholder="e.g., Personal, Work, Design..."
              value={taskForm.category}
              onChange={(e) => onTaskFormChange({ ...taskForm, category: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isEditing ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function updateTask(id: number, arg1: { completed: boolean; }) {
  throw new Error('Function not implemented.');
}
function deleteTaskAPI(id: number) {
  throw new Error('Function not implemented.');
}

