import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      displayName
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    getUserById(id: $id) {
      id
      displayName
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query {
    getAllTasks {
      id
      title
      description
      completed
      createdAt
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: Int!) {
    getTaskById(id: $id) {
      id
      title
      description
      completed
      createdAt
    }
  }
`;

export const GET_TASKS_BY_USER = gql`
  query GetTasksByUser($userId: Int!) {
    getTasksByUser(userId: $userId) {
      id
      title
      description
      completed
      createdAt
    }
  }
`;
