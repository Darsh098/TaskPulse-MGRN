import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $googleId: String!
    $displayName: String!
    $email: String!
  ) {
    createUser(googleId: $googleId, displayName: $displayName, email: $email) {
      id
      googleId
      displayName
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $googleId: String!
    $displayName: String!
    $email: String!
  ) {
    updateUser(
      id: $id
      googleId: $googleId
      displayName: $displayName
      email: $email
    ) {
      id
      googleId
      displayName
      email
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($title: String!, $description: String!, $authorId: Int!) {
    createTask(title: $title, description: $description, authorId: $authorId) {
      id
      title
      description
      completed
      createdAt
      author {
        id
        displayName
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($id: Int!, $title: String!, $description: String!) {
    updateTask(id: $id, title: $title, description: $description) {
      id
      title
      description
      completed
      createdAt
      author {
        id
        displayName
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: Int!) {
    deleteTask(taskId: $taskId)
  }
`;

export const CREATE_SHARED_TASK = gql`
  mutation createSharedTask($sharedWithUserEmail: String!, $taskId: Int!) {
    createSharedTask(
      sharedWithUserEmail: $sharedWithUserEmail
      taskId: $taskId
    ) {
      sharedUser {
        id
        displayName
      }
      task {
        id
        title
      }
    }
  }
`;

export const DELETE_SHARED_TASK = gql`
  mutation deleteSharedTaskByUserIdAndTaskId($userId: Int!, $taskId: Int!) {
    deleteSharedTaskByUserIdAndTaskId(userId: $userId, taskId: $taskId)
  }
`;

export const MARK_TASK_AS_COMPLETE = gql`
  mutation markTaskAsComplete($taskId: Int!) {
    markTaskAsComplete(taskId: $taskId) {
      id
      title
      description
      completed
      createdAt
      author {
        id
        displayName
      }
    }
  }
`;
