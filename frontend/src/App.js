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
} from "./graphql/mutation";
import { GET_TASKS_BY_USER } from "./graphql/queries";

function App() {
  const { isSignedIn, user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [createUser] = useMutation(CREATE_USER, { client });
  const [createTask] = useMutation(CREATE_TASK, { client });
  const [createSharedTask] = useMutation(CREATE_SHARED_TASK, { client });

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
      if (currentUser) {
        const {
          loading: tasksLoading,
          error: tasksError,
          data: tasksData,
        } = await client.query({
          query: GET_TASKS_BY_USER,
          variables: { userId: currentUser.id },
        });

        if (!tasksLoading && tasksData) {
          setTasks(tasksData.getTasksByUser);
        }
      }
    };

    fetchData();
  }, [currentUser]);

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

  const handleUpdateTask = (taskId, title, description) => {
    console.log("Updating task:", taskId, title, description);
  };

  return (
    <div>
      <Navbar />
      <CreateTaskForm onCreate={handleCreateTask} />
      {/* <UpdateTaskForm task={tasks[0]} onUpdate={handleUpdateTask} /> */}
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
