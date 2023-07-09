const CREATE_MASK = 2
const READ_MASK = 4
const UPDATE_MASK = 8
const DELETE_MASK = 16
const VERIFY_DOCUMENT_MASK = 32
const SIGN_DOCUMENT_MASK = 64
const ASSIGN_MASK = 128
const ENABLE_MASK = 256

function calculatePermission(perm: any) {
  const value = perm & 0b111111111111

  return {
    create: (value & CREATE_MASK) === CREATE_MASK,
    read: (value & READ_MASK) === READ_MASK,
    update: (value & UPDATE_MASK) === UPDATE_MASK,
    delete: (value & DELETE_MASK) === DELETE_MASK,
    verifyDocument: (value & VERIFY_DOCUMENT_MASK) === VERIFY_DOCUMENT_MASK,
    signDocument: (value & SIGN_DOCUMENT_MASK) === SIGN_DOCUMENT_MASK,
    assign: (value & ASSIGN_MASK) === ASSIGN_MASK,
    enable: (value & ENABLE_MASK) === ENABLE_MASK
  }
}

const admin_permission =
  CREATE_MASK |
  READ_MASK |
  UPDATE_MASK |
  DELETE_MASK |
  VERIFY_DOCUMENT_MASK |
  ASSIGN_MASK |
  SIGN_DOCUMENT_MASK |
  ENABLE_MASK

console.log('Admin permission', admin_permission)
console.log(calculatePermission(260))

export const FeatureRoleMapping: {
  [key: string]: {
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
    verifyDocument: boolean
    signDocument: boolean
    assign: boolean
    enable: boolean
  }
} = {
  Admin: {
    create: true,
    read: true,
    update: true,
    delete: true,
    verifyDocument: true,
    signDocument: true,
    assign: true,
    enable: true
  },
  User: {
    create: false,
    read: true,
    update: false,
    delete: false,
    verifyDocument: true,
    signDocument: true,
    assign: false,
    enable: true
  },
  Accountant: {
    create: false,
    read: true,
    update: false,
    delete: false,
    verifyDocument: true,
    signDocument: true,
    assign: false,
    enable: true
  },
  Viewer: {
    create: false,
    read: true,
    update: false,
    delete: false,
    verifyDocument: true,
    signDocument: true,
    assign: false,
    enable: true
  },
  Certificant: {
    create: false,
    read: true,
    update: false,
    delete: false,
    verifyDocument: true,
    signDocument: true,
    assign: false,
    enable: true
  },
  Signer: {
    create: false,
    read: true,
    update: false,
    delete: false,
    verifyDocument: true,
    signDocument: true,
    assign: false,
    enable: true
  }
}

export enum Role {
  Admin = 'Admin',
  Manager = 'Manager',
  Accountant = 'Accountant',
  Viewer = 'Viewer',
  Certificant = 'Certificant',
  Signer = 'Signer'
}

export const PermissionCode = {
  create: 2,
  read: 4,
  update: 8,
  delete: 16,
  verifyDocument: 32,
  signDocument: 64,
  assign: 128,
  enable: 256
}
export const DEFAULT_MASK = 0b111111111111

const email_remind_sign: {
  [key: string]: {
    [key: string]: boolean
  }
} = {
  Admin: { read: true, enable: true }, // 260
  User: { read: true, enable: true },
  Accountant: { read: true, enable: true },
  Viewer: { read: true, enable: true },
  Certificant: { read: true, enable: true },
  Signer: { read: true, enable: true }
}

function calculatePermission1(role: string) {
  const permRole = email_remind_sign[role]
  console.log('>>', permRole)
  let permission = 0
  type PermKey = keyof typeof permRole

  Object.keys(permRole).forEach((perm) => {
    if (permRole[perm as keyof typeof permRole] === true) {
      permission = permission | PermissionCode[perm as keyof typeof PermissionCode]
    }
  })

  return permission
}

console.log(calculatePermission1('User'))
