export type UserType = {
  id: string
  email: string
  first_name: string
  last_name: string
  password: string
  user_role: {
    name: string
    id: number
  }
  permission: {
    role_id: number
    resource: {
      name: string
    }
    permission_id: number
  }[]
  is_active: boolean
  is_verified: boolean
  is_master_group: boolean
}
