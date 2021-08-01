const AppConfig = Object.freeze({
  STORAGE_KEYS: {
    token: "token",
    layout: "layout",
    user: "user",
    payment: "odt",
  },
  SOCIAL_LOGIN_TYPES: {
    FACEBOOK: "facebook",
    GOOGLE: "google",
  },
  LOGIN_TYPES: {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT',
    WORKER: 'WORKER'
  },
  APPROVAL_STATUS: {
    ACTIVE: 'ACTIVE',
    PENDING: 'PENDING',
    REJECT: 'REJECT',
    WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL'
  },
  PATTERNS: {
    GENERAL_DATE_FORMAT: "DD MMM YYYY",
    DATE_TIME_FORMAT: "DD MMM YYYY, hh.mm a",
    DATE_FORMAT: "MM/DD/YYYY",
    DECIMAL_NUMBER: /^(\d*\.)?\d+$/,
    INPUT_NUMBER: /^[+-]?(\d+([.]\d*)?(e[+-]?\d+)?|[.]\d+(e[+-]?\d+)?)$/,
    EMAIL_PATTERN: /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/,
    DOMAIN_PATTERN: /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
    IP_PATTERN: /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/,
    PASSWORD_PATTERN: /^.{8,}$/,
    PASSWORD_UPPER: /^(?=.*[A-Z]).{1,}$/,
    PASSWORD_LOWER: /^(?=.*[a-z]).{1,}$/,
    PASSWORD_NUMBER: /^(?=.*\d).{1,}$/,
    DATE_PATTERN: /^(([01])\d)\/(([012])\d)\/((19|20)\d{2})$/,
    SECTION_PATTERN: /[A-E][1-9]-[1-9]|[A-E][1-9]/g,
    NUMBER_MAX_LENGTH_64: /^[0-9]{,64}$/,
    NUMBER_MAX_LENGTH_128: /^[0-9]{,128}$/,
    NUMBER_MAX_LENGTH_255: /^[0-9]{,255}$/,
    USER_GROUP_NAME: /^[a-zA-Z0-9_ -]*$/,
    BLANK_SPACES: /[^\s*]/g
  },
  DELIVERY_TYPES: {
    SELF_COLLECTION: "1",
    DELIVERY: "2",
  },
  DELIVERY_DATE_TYPES: {
    RANGE_DATES: 1,
    OTHER: 2,
  },
  USER_ROLES: {
    ADMIN: 'ADMIN',
    NURSE: 'NURSE',
    WORKER: 'WORKER'
  },
  WITHDRAW_STATUS: {
    DONE: 1,
    PENDING: 0,
    CANCEL: 2,
    ALL: "",
  },
  OMISE_LIMIT: {
    MAX: 20000,
    MIN: 1,
  }
});

export const TIME_RANGE = {
  TODAY: 1,
  YESTERDAY: 2,
  THIS_WEEK: 3,
  THIS_MONTH: 4,
};
export const STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
};
export const PAGINATION = {
  page: 1,
  size: 10,
};
export const PRODUCT_PAYMENT_TYPE = {
  PAYNOW: 1,
  CREDIT_AND_DEBIT_CARDS: 2,
};
export const CONFIRM_ACTION = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
};
export const ACCOUNT_TYPE = {
  CLIENT: 1,
  WORKER: 2
};
export const USER_CONFIG = {
  SYSTEM_ADMIN: {
    roleLevel: 1,
    landingPage: '/admin/dashboard'
  },
  USER: {
    roleLevel: 2,
    landingPage: '/'
  }
};
export const CLIENT_TYPE = {
  SINGLE_USER_HOSPITAL: 'SINGLE_USER_HOSPITAL',
  SINGLE_USER_COORDINATOR: 'SINGLE_USER_COORDINATOR',
  MULTIPLE_USER_HOSPITAL: 'MULTIPLE_USER_HOSPITAL',
  MULTIPLE_USER_COORDINATOR: 'MULTIPLE_USER_COORDINATOR',
  PARTICIPANT: 'PARTICIPANT',
  SUPPORT_COORDINATOR_PARTICIPANT: 'SUPPORT_COORDINATOR_PARTICIPANT'
};
export const SYSTEM_ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MANAGER: 'MANAGER',
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN',
  HOSPITAL_OTHER: 'HOSPITAL_OTHER',
  COORDINATOR_ADMIN: 'COORDINATOR_ADMIN',
  COORDINATOR_OTHER: 'COORDINATOR_OTHER',
  PARTICIPANT: 'PARTICIPANT',
  NURSE: 'NURSE',
  SUPPORT_WORKER: 'SUPPORT_WORKER'
};
export const WORKER_TYPE = {
  NURSE: 'NURSE',
  SUPPORT_WORKER: 'SUPPORT_WORKER'
};
export const BILLING_TYPE = {
  PLAN_MANAGER: {
    id: 'PLAN_MANAGER',
    label: 'label.planManager'
  },
  NDIA: {
    id: 'NDIA',
    label: 'label.ndia'
  },
  SELF: {
    id: 'SELF',
    label: 'label.self'
  }
};
export const APPROVAL_STATUS = {
  PENDING: {
    id: 'PENDING',
    label: 'label.pending'
  },
  ACTIVE: {
    id: 'ACTIVE',
    label: 'label.active'
  },
  WAITING_FOR_APPROVAL: {
    id: 'WAITING_FOR_APPROVAL',
    label: 'label.waitingForApproval'
  },
  REJECT: {
    id: 'REJECT',
    label: 'label.reject'
  }
};
export const GENDER = {
  MALE: {
    id: 'MALE',
    label: 'label.male'
  },
  FEMALE: {
    id: 'FEMALE',
    label: 'label.female'
  },
  OTHER: {
    id: 'OTHER',
    label: 'label.other'
  }
};
export const WORKER_ACCREDITATION = {
  PRACTITIONER: {
    id: 1,
    label: 'label.civdDisabilitySupport'
  },
  REGISTERED: {
    id: 2,
    label: 'label.civdInAgedCare'
  }
};
export const NURSE_ACCREDITATION = {
  PRACTITIONER: {
    id: 3,
    label: 'label.nursePractitioner'
  },
  REGISTERED: {
    id: 4,
    label: 'label.registeredNurse'
  },
  ENROLLED: {
    id: 5,
    label: 'label.enrolledNurse'
  },
  ASSISTANT: {
    id: 6,
    label: 'label.assistantInNursing'
  }
};
export const JOB_STATUS = {
  AVAILABLE: 'AVAILABLE',
  ON_GOING: 'ON_GOING',
  DONE: 'DONE'
};
export const JOB_TYPE = {
  SINGLE_WORKER: 'SINGLE_WORKER',
  MULTIPLE_WORKER: 'MULTIPLE_WORKER'
};
export const PART_TYPE_CLIENT = {
  GENERAL_INFO: 'GENERAL_INFO',
  VERIFICATION: 'VERIFICATION',
  BILLING_INFO: 'BILLING_INFO'
};
export const PART_TYPE_WORKER = {
  PERSONAL_INFO: 'PERSONAL_INFO',
  PROFESSIONAL_INFO: 'PROFESSIONAL_INFO',
  VERIFICATION: 'VERIFICATION',
  BANK_ACCOUNT: 'BANK_ACCOUNT',
  AGREEMENT: 'AGREEMENT'
};
export const BOOKING_STATUS = {
  BOOKED: 'BOOKED',
  WAITING: 'WAITING',
  ON_GOING: 'ON_GOING',
  CANCEL: 'CANCEL',
  DONE: 'DONE',
  AVAILABLE: 'AVAILABLE'
};
export const POST_JOB = {
  POST_JOB: 'POST_JOB',
  UNPOST_JOB: 'UNPOST_JOB'
};
export const RATE_TYPE = ['STANDARD','CUSTOM' ];
export const DAY_TYPE = ['WEEK_DAY', 'WEEK_END', 'HOLIDAY'];
export const YEARS_OF_EXPERIENCE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const HOURS_PICKER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
export const HOURS_PICKER_SLEEPOVER = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const MINUTES_PICKER = [0 ,5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
export const MASK = {
  PHONE: '999999999999999'
}
export const DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
export const SHIFT = ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'];
export const IMAGE_ACCEPT = 'image/jpeg, image/png, image/svg+xml, image/x-icon';
export const EXCEPT_ERRORS = [618];
export const ADMIN_PERMISSIONS = {
  users: {
    id: 'FULL_ACCESS_USERS',
    label: 'admin_permission.FULL_ACCESS_USERS'
  },
  workers: {
    id: 'FULL_ACCESS_WORKERS',
    label: 'admin_permission.FULL_ACCESS_WORKERS'
  },
  clients: {
    id: 'FULL_ACCESS_CLIENTS',
    label: 'admin_permission.FULL_ACCESS_CLIENTS'
  },
  booking: {
    id: 'FULL_ACCESS_BOOKING',
    label: 'admin_permission.FULL_ACCESS_BOOKING'
  },
  rates: {
    id: 'FULL_ACCESS_RATES',
    label: 'admin_permission.FULL_ACCESS_RATES'
  },
  billing: {
    id: 'FULL_ACCESS_BILLING',
    label: 'admin_permission.FULL_ACCESS_BILLING'
  },
  payroll: {
    id: 'FULL_ACCESS_PAYROLL',
    label: 'admin_permission.FULL_ACCESS_PAYROLL'
  },
  options: {
    id: 'FULL_ACCESS_OPTIONS',
    label: 'admin_permission.FULL_ACCESS_OPTIONS'
  }
}

export const DAYS = [
  {
    label: 'days.monday',
    key: 'monday'
  },
  {
    label: 'days.tuesday',
    key: 'tuesday'
  },
  {
    label: 'days.wednesday',
    key: 'wednesday'
  },
  {
    label: 'days.thursday',
    key: 'thursday'
  },
  {
    label: 'days.friday',
    key: 'friday'
  },
  {
    label: 'days.saturday',
    key: 'saturday'
  },
  {
    label: 'days.sunday',
    key: 'sunday'
  }
];

export default AppConfig;
