export const FeatureRoleMapping = {
  Admin: {
    create: false,
    read: true,
    update: false,
    delete: false,
    verifyDocument: true,
    signDocument: true,
    assign: false,
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
