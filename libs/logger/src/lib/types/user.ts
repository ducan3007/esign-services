export type UserType = {
  id: string
  email: string
  first_name?: string
  last_name?: string
  password?: string
  user_role?: {
    name: string
    id: number
  }
  permission?:UserPermission[]
  is_active?: boolean
  is_verified?: boolean
  is_master_group?: boolean
  blockchain_address?: string
  createdAt?: Date
  updatedAt?: Date
}

export type UserPermission = {
  role_id: number
  feature: {
    name: string
  }
  permission_id: number
}

export enum Role {
  Admin = 'Admin',
  Manager = 'Manager',
  Accountant = 'Accountant',
  Viewer = 'Viewer',
  Guest = 'Guest'
}
