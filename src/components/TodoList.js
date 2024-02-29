import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Form = () => {
  // State variables
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Function to add or update a todo
  const handleAddTodo = () => {
    if (newTodoName.trim() !== "" && newTodoDescription.trim() !== "") {
      if (editTodoId !== null) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === editTodoId) {
            return {
              ...todo,
              name: newTodoName,
              description: newTodoDescription,
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setNewTodoName("");
        setNewTodoDescription("");
        setEditTodoId(null);
      } else {
        const newTodo = {
          id: todos.length + 1,
          name: newTodoName,
          description: newTodoDescription,
          status: "Not Completed",
        };
        setTodos([...todos, newTodo]);
        setNewTodoName("");
        setNewTodoDescription("");
      }
    }
  };

  // Function to set todo for editing
  const handleEditTodo = (id, name, description) => {
    setEditTodoId(id);
    setNewTodoName(name);
    setNewTodoDescription(description);
  };

  // Function to delete a todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // Function to filter a todo change
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Function to handle status change for a todo
  const handleStatusChange = (id, status) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: status } : todo
    );
    setTodos(updatedTodos);
  };

  //filter todos based on status filter
  useEffect(() => {
    const updatedFilteredTodos = todos.filter((todo) => {
      if (statusFilter === "All") {
        return true;
      } else if (statusFilter === "Completed") {
        return todo.status === "Completed";
      } else if (statusFilter === "Not Completed") {
        return todo.status === "Not Completed";
      }
      return false;
    });
    setFilteredTodos(updatedFilteredTodos);
  }, [todos, statusFilter]);

  return (
    <div className="bg-custom d-flex justify-content-center align-items-center vh-100">
      <div
        className="container shadow mb-5 bg-body rounded font-monospace"
        style={{
          border: "2px solid white ",
          paddingRight: "30px",
          margin: "60px",
          borderShadow: "15px",
        }}
      >
        <div className="header text-center">
          <h1 className="pt-5 mb-3">Todo List</h1>
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            <input
              type="text"
              className="my-4 mx-2 rounded-3 border-dark form-control w-25"
              required
              placeholder="Todo Name"
              aria-label="Todo Name"
              value={newTodoName}
              onChange={(e) => setNewTodoName(e.target.value)}
            />
            <input
              type="text"
              className="my-4 mx-2 rounded-3 border-dark form-control w-25"
              required
              placeholder="Todo Description"
              aria-label="Todo descrp"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
            />

            <button className="btn btn-primary" onClick={handleAddTodo}>
              {editTodoId !== null ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </div>
        {todos.length > 0 && (
          <div className="input-group font-monospace">
            <div>
              <h4>My Todos</h4>
            </div>
            <div className="ms-auto">
              <label for="filter">
                <h4>Status Filter : </h4>
              </label>
              <select
                className={`mx-2 text-white rounded-2 ${
                  statusFilter === "Completed"
                    ? "bg-success"
                    : statusFilter === "Not Completed"
                    ? "bg-danger"
                    : "bg-primary"
                }`}
                style={{ background: "orange" }}
                value={statusFilter}
                onChange={handleFilterChange}
              >
                <option value="All" className=" text-white bg-secondary">
                  All
                </option>
                <option
                  value="Completed"
                  className="complete bg-success text-white"
                >
                  Completed
                </option>
                <option value="Not Completed" className="bg-danger text-white">
                  Pending
                </option>
              </select>
            </div>
          </div>
        )}
        {filteredTodos.length > 0 ? (
          <div className="row justify-content-center">
            {filteredTodos.map((todo) => (
              <div className="col-md-3 mb-4" key={todo.id}>
                <div
                  className="card shadow bg-body rounded"
                  style={{
                    margin: "5px",
                  }}
                >
                  <div className="card-body">
                    <h6 className="card-title" style={{ fontWeight: "bold" }}>
                      Name:
                    </h6>
                    <p className="card-text">{todo.name}</p>
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ fontWeight: "bold" }}
                    >
                      Description:
                    </h6>
                    <p className="card-text">{todo.description}</p>
                    <div className="ms-auto">
                      <label for="status">
                        <h6 style={{ fontWeight: "bold" }}>Status:</h6>
                      </label>
                      <select
                        className={`mx-2 text-white rounded-2 ${
                          todo.status === "Completed"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                        name="status"
                        style={{ background: "orange" }}
                        value={todo.status}
                        onChange={(e) =>
                          handleStatusChange(todo.id, e.target.value)
                        }
                      >
                        <option value="Completed" className="text-white">
                          Completed
                        </option>
                        <option value="Not Completed" className="text-white">
                          Pending
                        </option>
                      </select>
                    </div>
                    <span>
                      <button
                        className="btn btn-primary m-2"
                        onClick={() =>
                          handleEditTodo(todo.id, todo.name, todo.description)
                        }
                      >
                        Edit
                      </button>
                    </span>
                    <span>
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-3 m-0">
            <p className="m-0">No Todo's to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;