import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register($data: CreateUserInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      user {
        id
        firstName
        lastName
        email
        role
        departments {
          id
          name
          description
          members {
            id
            firstName
            lastName
            email
            role
          }
        }
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
      subDepartments
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($input: UpdateDepartmentInput!) {
    updateDepartment(input: $input) {
      id
      name
      subDepartments
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id: ID!) {
    deleteDepartment(id: $id)
  }
`;

export const JOIN_DEPARTMENT = gql`
  mutation JoinDepartment($userId: ID!, $departmentId: ID!) {
    joinDepartment(userId: $userId, departmentId: $departmentId) {
      id
      name
      members {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const JOIN_SUB_DEPARTMENT = gql`
  mutation JoinSubDepartment($userId: ID!, $subDepartmentId: ID!) {
    joinSubDepartment(userId: $userId, subDepartmentId: $subDepartmentId) {
      id
      name
      members {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      name
      description
      subDepartments {
        id
        name
      }
      members {
        id
        firstName
        lastName
        email
        role
      }
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartments {
      id
      name
      description
      subDepartments
      members {
        id
        firstName
        lastName
        email
        role
      }
    }
  }
`;
