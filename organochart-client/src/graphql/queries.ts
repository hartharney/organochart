import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
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

export const GET_DEPARTMENT_MEMBERS = gql`
  query GetDepartmentMembers($id: Int!) {
    department(id: $id) {
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
      subDepartments {
        id
        name
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
`;
export const GET_DEPARTMENT_SUBDEPARTMENTS = gql`
  query GetDepartmentSubDepartments($id: Int!) {
    department(id: $id) {
      id
      name
      description
      subDepartments {
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
`;
export const GET_DEPARTMENT_SUBDEPARTMENT = gql`
  query GetDepartmentSubDepartment($id: Int!) {
    department(id: $id) {
      id
      name
      description
      subDepartments {
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
`;
