const CREATE_MASK = 0b1000000000
const READ_MASK = 0b0100000000
const UPDATE_MASK = 0b0010000000
const DELETE_MASK = 0b0001000000
const IMPERSONATE_MASK = 0b0000100000
const VERIFY_DOCUMENT_MASK = 0b0000010000
const SIGN_DOCUMENT_MASK = 0b0000001000
const ASSIGN_MASK = 0b0000001000

function calculatePermission(perm: any) {
  const value = perm & 0b111111111111

  return {
    create: (value & CREATE_MASK) === CREATE_MASK,
    read: (value & READ_MASK) === READ_MASK,
    update: (value & UPDATE_MASK) === UPDATE_MASK,
    delete: (value & DELETE_MASK) === DELETE_MASK,
    impersonate: (value & IMPERSONATE_MASK) === IMPERSONATE_MASK,
    verifyDocument: (value & VERIFY_DOCUMENT_MASK) === VERIFY_DOCUMENT_MASK
  }
}

console.log(
  'Admin permission',
  CREATE_MASK |
    READ_MASK |
    UPDATE_MASK |
    DELETE_MASK |
    VERIFY_DOCUMENT_MASK |
    IMPERSONATE_MASK |
    ASSIGN_MASK |
    SIGN_DOCUMENT_MASK
)

console.log(
  'accountant permission',
  CREATE_MASK | READ_MASK | UPDATE_MASK | DELETE_MASK | VERIFY_DOCUMENT_MASK | SIGN_DOCUMENT_MASK
)

// console.log('User permission', CREATE_MASK | READ_MASK | UPDATE_MASK | VERIFY_DOCUMENT_MASK)

// console.log('Certificant permission', CREATE_MASK | VERIFIDOCUMENT_MASK | READ_MASK)

// console.log('Viewer permission', READ_MASK)

// console.log('Admin permission', CREATE_MASK | READ_MASK | UPDATE_MASK | DELETE_MASK)
// console.log('Admin permission', CREATE_MASK | READ_MASK | UPDATE_MASK | DELETE_MASK)

// console.log(CREATE_MASK | READ_MASK)
// console.log(CREATE_MASK | IMPERSONATE_MASK)

// console.log(calculatePermission(1008))
console.log(calculatePermission(784))

// console.log(calculatePermission(60))
// console.log(calculatePermission(48))
// console.log(calculatePermission(34))
