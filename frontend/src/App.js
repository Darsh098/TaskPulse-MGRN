import React, { useEffect, useState } from "react";
import CreateTaskForm from "./components/CreateTaskFrom";
import TaskList from "./components/TaskList";
import UpdateTaskForm from "./components/UpdateTaskForm";
import Navbar from "./components/Navbar";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@apollo/client";
import client from "./client";
import {
  CREATE_USER,
  CREATE_TASK,
  CREATE_SHARED_TASK,
  UPDATE_TASK,
} from "./graphql/mutation";
import { GET_TASKS_BY_USER, GET_SHARED_TASKS_BY_USER } from "./graphql/queries";

function App() {
  const { isSignedIn, user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("created");
  const [editTask, setEditTask] = useState(null);
  const [createUser] = useMutation(CREATE_USER, { client });
  const [createTask] = useMutation(CREATE_TASK, { client });
  const [createSharedTask] = useMutation(CREATE_SHARED_TASK, { client });
  const [updateTask] = useMutation(UPDATE_TASK, { client });

  useEffect(() => {
    const registerUser = async (user) => {
      try {
        const { id, firstName, lastName, primaryEmailAddress } = user;
        const { data } = await createUser({
          variables: {
            googleId: id,
            displayName: `${firstName} ${lastName}`,
            email: primaryEmailAddress.emailAddress,
          },
        });
        setCurrentUser(data.createUser);
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    if (isSignedIn && user) {
      registerUser(user);
    }
  }, [user, isSignedIn, createUser]);

  useEffect(() => {
    const fetchData = async () => {
      let query;
      if (currentUser) {
        if (activeTab == "created") {
          query = GET_TASKS_BY_USER;
        } else {
          query = GET_SHARED_TASKS_BY_USER;
        }

        const {
          loading: tasksLoading,
          error: tasksError,
          data: tasksData,
        } = await client.query({
          query: query,
          variables: { userId: currentUser.id },
        });

        if (!tasksLoading && tasksData) {
          if (activeTab === "created") {
            setTasks(tasksData.getTasksByUser);
          } else {
            setTasks(tasksData.sharedTasksByUserId);
          }
        }
      }
    };

    fetchData();
  }, [currentUser, activeTab]);

  if (!user) {
    return null;
  }

  const handleCreateTask = async (title, description, emails) => {
    try {
      const { data } = await createTask({
        variables: {
          title: title,
          description: description,
          authorId: currentUser?.id,
        },
      });

      if (data && data.createTask) {
        setTasks([...tasks, data.createTask]);
        for (const email of emails) {
          await createSharedTask({
            variables: {
              taskId: data.createTask.id,
              sharedWithUserEmail: email,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error Creating Task:", error);
    }
  };

  const handleUpdateTask = async (taskId, title, description, emails) => {
    try {
      await updateTask({
        variables: {
          id: taskId,
          title: title,
          description: description,
        },
      });
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, title, description } : task
      );
      setTasks(updatedTasks);
      for (const email of emails) {
        await createSharedTask({
          variables: {
            taskId: taskId,
            sharedWithUserEmail: email,
          },
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {editTask === null ? (
        <CreateTaskForm onCreate={handleCreateTask} />
      ) : (
        <UpdateTaskForm
          editTask={editTask}
          setEditTask={setEditTask}
          onUpdate={handleUpdateTask}
        />
      )}

      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setEditTask={setEditTask}
      />
    </div>
  );
}

export default App;
