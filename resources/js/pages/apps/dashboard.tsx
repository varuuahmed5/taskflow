import React, { useState } from "react";
import { LayoutDashboard, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { router } from "@inertiajs/react";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "@headlessui/react";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { LuSparkles } from "react-icons/lu";



type Task = {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  category: string;
  status: "To Do" | "In Progress" | "Done";
};

const tasksData: Task[] = [
  {
    id: 1,
    title: "Sample Task",
    description: "This is a sample task",
    priority: "Medium",
    category: "Personal",
    status: "To Do",
  },
];

export default function Dashboard() {


  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"All" | Task["status"]>("All");
  const [filterPriority, setFilterPriority] =
    useState<"All" | Task["priority"]>("All");

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "Medium" as Task["priority"],
    category: "Personal",
    status: "To Do" as Task["status"],
  });

  function openEditModal(task: Task) {
    setEditingTask(task);
    setTaskForm(task);
    setShowModal(true);
  }

  function deleteTask(id: number) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  }

  function handleSaveTask() {
  if (!taskForm.title.trim()) {
    alert("Title is required");
    return;
  }

  if (editingTask) {
    // EDIT
    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id ? { ...editingTask, ...taskForm } : t
      )
    );
  } else {
    // ADD NEW
    const newTask: Task = {
      id: Date.now(),
      ...taskForm,
    };

    setTasks([...tasks, newTask]);
  }

  setShowModal(false);
  setEditingTask(null);
}

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const completedCount = tasks.filter((t) => t.status === "Done").length;
  const urgentCount = tasks.filter((t) => t.priority === "High").length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
          {/* Header */}


      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
<header className="bg-gray-50 px-6 py-4 flex justify-between items-center shadow-sm">
  <h1 className="text-2xl font-bold flex gap-2 items-center text-black">
    <span className="bg-indigo-500 text-white p-2 rounded-md">
      <LuSparkles />
    </span>
    TaskFlow
  </h1>

  <div className="flex items-center gap-4 text-black">
    <p className="text-gray-600">
      Hey, <span className="font-semibold">Feriha Ahmed</span>
    </p>

    <button
      onClick={() => router.visit("/landing")}
      className="text-gray-500 px-3 py-1 hover:text-black rounded"
      aria-label="Logout"
    >
      <IoIosLogOut className="inline-block mr-1 text-lg" />
    </button>
  </div>
</header>
        {/* Greeting */}
        <section className="mb-10 text-black">
          <h2 className="text-3xl font-bold mb-2">
            Good Afternoon 👋
          </h2>
          <p className="text-gray-600 mb-6 text-black">
            Here's what's on your plate today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <StatCard title="Total Tasks" count={totalTasks} type="total" />
            <StatCard title="In Progress" count={inProgressCount} type="progress" />
            <StatCard title="Completed" count={completedCount} type="done" />
            <StatCard title="Urgent" count={urgentCount} type="urgent" />
          </div>
        </section>

        {/* Search & Filters */}
        <section className="flex flex-col sm:flex-row text-black gap-4 mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300"
          />
         {/* ---------- FIXED MODAL POSITION ---------- */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">

      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute right-5 top-5 text-gray-400 hover:text-black text-xl"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-6 text-black">
        {editingTask ? "Edit Task" : "New Task"}
      </h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={taskForm.title}
            onChange={(e) =>
              setTaskForm({ ...taskForm, title: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Description</label>
          <textarea
            placeholder="Add details..."
            value={taskForm.description}
            onChange={(e) =>
              setTaskForm({ ...taskForm, description: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Priority</label>
            <select
              value={taskForm.priority}
              onChange={(e) =>
                setTaskForm({
                  ...taskForm,
                  priority: e.target.value as Task["priority"],
                })
              }
              className="w-full mt-1 border rounded-xl px-4 py-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={taskForm.status}
              onChange={(e) =>
                setTaskForm({
                  ...taskForm,
                  status: e.target.value as Task["status"],
                })
              }
              className="w-full mt-1 border rounded-xl px-4 py-3"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveTask}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md hover:opacity-90"
          >
            {editingTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


          <select
  value={filterStatus}
  onChange={(e) =>
    setFilterStatus(e.target.value as any)
  }
  className="px-4 py-3 rounded-xl border border-gray-300"
>
  <option value="All">All Categories</option>
  <option value="To Do">To Do</option>
  <option value="In Progress">In Progress</option>
  <option value="Done">Done</option>
</select>


          <select
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value as any)
            }
            className="px-4 py-3 rounded-xl border border-gray-300"
          >
            <option value="All">All Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            onClick={() => {
              setEditingTask(null);
              setTaskForm({
                title: "",
                description: "",
                priority: "Medium",
                category: "Personal",
                status: "To Do",
              });
              setShowModal(true);
            }}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            + New Task
          </button>
        </section>

        {/* Task List */}
       <TaskList
  tasks={filteredTasks}
  onEdit={openEditModal}
  onDelete={deleteTask}
  
/>

      </div>
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({
  title,
  count,
  type,
}: {
  title: string;
  count: number;
  type: "total" | "progress" | "done" | "urgent";
}) {

  const styles = {
    total: "bg-indigo-600 text-white",
    progress: "bg-cyan-600 text-white",
    done: "bg-purple-600 text-white",
    urgent: "bg-orange-600 text-white",
  };

 const icons = {
  total: <MdOutlinePlaylistAddCheck size={22} />,
  progress: <Clock size={22} />,
  done: <CheckCircle size={22} />,
  urgent: <AlertTriangle size={22} />,
};

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
  
  {/* Gradient right top */}
  <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 ${
    type === "total"
      ? "bg-indigo-400"
      : type === "progress"
      ? "bg-cyan-400"
      : type === "done"
      ? "bg-purple-400"
      : "bg-orange-400"
  }`} />
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${styles[type]}`}
      >
        {icons[type]}
      </div>

      <p className="text-3xl font-bold text-gray-800">{count}</p>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
}


/* ---------------- TASK LIST ---------------- */

function TaskList({
  tasks,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks found.</p>;
  }

  return (
    <div className="space-y-5">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="relative bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-all duration-200"
        >
          {/* Status Color Bar */}
          <div
            className={`absolute left-0 top-0 h-full w-1.5 rounded-l-3xl ${
              task.status === "Done"
                ? "bg-purple-500"
                : task.status === "In Progress"
                ? "bg-cyan-500"
                : "bg-indigo-500"
            }`}
          />

          {/* Content */}
          <div className="ml-4 flex-1">
            <h3 className="font-semibold text-lg text-gray-800">
              {task.title}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              {task.description}
            </p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {/* Priority Badge */}
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium
                  ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-600"
                  }`}
              >
                {task.priority}
              </span>

              {/* Category Badge */}
              <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600 font-medium">
                {task.category}
              </span>
            </div>
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenuId(openMenuId === task.id ? null : task.id)
              }
              className="px-2 py-1 rounded-lg bg-white hover:bg-gray-100 transition"
            >
              ⋮
            </button>

            {openMenuId === task.id && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg p-2 flex flex-col gap-2 z-10">
                <Button
                  onClick={() => onEdit(task)}
                  className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
                >
                  Edit
                </Button>

                <Button
                  onClick={() => onDelete(task.id)}
                  className="text-sm px-3 py-2 rounded-lg hover:bg-red-100 text-red-600 text-left"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
