import React, { useState, useEffect, Fragment } from 'react'
import './App.css';

function TodoForm({ onSubmit, defaultValue }) {
  // console.log(defaultValue)
  const { title : defaultTitle, description : defaultdesc } = defaultValue;
  const [ title, setTitle ] = useState(defaultTitle)
  const [ desc, setdesc ] = useState(defaultdesc)
  return (
    <div style={{ margin: '0 32px' }}>
      <br/>
      <div>
        Title :
        <br/>
        <input value={title} onChange={({ target: { value } }) => setTitle(value)} />
      </div>
      <div>
        Desc :
        <br/>
        <textarea value={desc} onChange={({ target: { value } }) => setdesc(value)}></textarea>
      </div>
      <button onClick={() => onSubmit({ title, desc })} className="button">Submit</button>
    </div>
  )
}

function TodoItem(props) {
  const {
    item: { id, status, title, description } = {},
    onChange,
    onDelete,
    onEdit,
    onSubmitEdit,
    index,
    edit
  } = props;

  const completed = Boolean(status);

  const completedStyle = completed ? {
    fontStyle: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through"
  } : {}

  const todosUpdate = ({ title, desc }) => {
    const data = {
      ...props.item,
      title,
      description: desc
    }
    onSubmitEdit(data, index);

  }

  return (
    <div className="todo-item">
      {edit === index ? (
        <TodoForm defaultValue={{ title, description }} onSubmit={todosUpdate} />
      ) : (
        <Fragment>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onChange(id)}
          />
          <div>
            <span className="item-title" style={completedStyle} onClick={() => onChange(id)}>
              {title}
            </span>
            <p style={completedStyle} onClick={() => onChange(id)}>
              {description}
            </p>
            <button className="button" onClick={() => onEdit(index)}>Edit</button>
            <button className="button" onClick={() => onDelete(index)}>Delete</button>
          </div>
        </Fragment>
      )}
    </div>
  )
}


function App() {
  const [todo, setTodo] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetch("https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list")
      .then(response => response.json())
      .then(item => setTodo(item))
  }, [])

  const todosChange = id => {
    const updatedTodo = todo.map(data => {
      if (data.id === id) data.status = data.status === 0 ? 1 :0 ;
      return data
  })
    setTodo(updatedTodo)
  }

  const todosDelete = index => setTodo(todo.filter((item, i) => index !== i ))

  const todosCreate = ({ title, desc }) => {
    const id = todo[todo.length - 1].id + 2
    const data = {
      id : id,
      title : title,
      description : desc,
      status : 0,
      createdAt : new Date().toJSON()
    };
    setTodo([ ...todo, data ]);
  }

  const todosUpdate = (value, index) => {
    let data = todo;
    data[index] = value;
    setTodo(data)
    setEditTodo(null);
  }

  return (
    <div className="todo-list">
      <h2>To Do List</h2>
      {todo.map(( data, index ) =>
        <TodoItem
          key={data.id}
          item={data}
          index={index}
          edit={editTodo}
          onChange={todosChange}
          onDelete={todosDelete}
          onEdit={setEditTodo}
          onSubmitEdit={todosUpdate}
        />
      )}
      <TodoForm onSubmit={todosCreate} defaultValue={{}} />
    </div>
  )

}

export default App;
