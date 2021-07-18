import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect} from 'react'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const data =  await fetchTasks();
      setTasks(data);
    }

    getTasks();
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const [showForm, setShowForm] = useState(false)

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const task  = await fetchTask(id);
    const updatedTask = {...task, reminder: !task.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();

    setTasks(
      tasks.map(
        (task) => 
          task.id === id ? {...task, reminder: !task.reminder}: task
        )
    )
  }

  return (
    <Router>
    <div className="container">
      <Header onShowForm = {() => setShowForm(!showForm)} formStatus={showForm}/>
    
      <Route 
      path='/' 
      exact render={(props) => (
        <>
            {showForm && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ?
            <Tasks tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleReminder}/>
              : 'No Tasks to show :('
            }
        </>
      )}/>

      <Route path='/about' exact component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
