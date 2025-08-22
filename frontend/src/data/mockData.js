// Mock data for the asset relocation system
export const locations = [
  { id: 1, name: 'Main Office - Floor 1', code: 'MO-F1' },
  { id: 2, name: 'Main Office - Floor 2', code: 'MO-F2' },
  { id: 3, name: 'Main Office - Floor 3', code: 'MO-F3' },
  { id: 4, name: 'Warehouse A', code: 'WH-A' },
  { id: 5, name: 'Warehouse B', code: 'WH-B' },
  { id: 6, name: 'Branch Office - Downtown', code: 'BO-DT' },
  { id: 7, name: 'Branch Office - Uptown', code: 'BO-UP' },
  { id: 8, name: 'Storage Facility', code: 'SF-01' }
];

export const assetCategories = [
  { id: 1, name: 'Furniture', icon: 'FiHome' },
  { id: 2, name: 'IT Equipment', icon: 'FiMonitor' },
  { id: 3, name: 'Office Equipment', icon: 'FiPrinter' },
  { id: 4, name: 'Vehicles', icon: 'FiTruck' },
  { id: 5, name: 'Machinery', icon: 'FiSettings' },
  { id: 6, name: 'Medical Equipment', icon: 'FiActivity' }
];

export const fixedAssets = [
  // Main Office - Floor 1
  { id: 1, name: 'Executive Desk - Oak', code: 'FUR-001', categoryId: 1, locationId: 1, category: 'Furniture' },
  { id: 2, name: 'Conference Table - 12 Seater', code: 'FUR-002', categoryId: 1, locationId: 1, category: 'Furniture' },
  { id: 3, name: 'Dell Workstation - i7', code: 'IT-001', categoryId: 2, locationId: 1, category: 'IT Equipment' },
  { id: 4, name: 'Laser Printer - HP LaserJet', code: 'OFC-001', categoryId: 3, locationId: 1, category: 'Office Equipment' },
  { id: 5, name: 'Ergonomic Office Chair', code: 'FUR-003', categoryId: 1, locationId: 1, category: 'Furniture' },
  { id: 6, name: 'Samsung 4K Monitor', code: 'IT-002', categoryId: 2, locationId: 1, category: 'IT Equipment' },
  { id: 7, name: 'Industrial Shredder', code: 'OFC-002', categoryId: 3, locationId: 1, category: 'Office Equipment' },

  // Main Office - Floor 2
  { id: 8, name: 'Standing Desk - Adjustable', code: 'FUR-004', categoryId: 1, locationId: 2, category: 'Furniture' },
  { id: 9, name: 'MacBook Pro - 16 inch', code: 'IT-003', categoryId: 2, locationId: 2, category: 'IT Equipment' },
  { id: 10, name: 'Server Rack - 42U', code: 'IT-004', categoryId: 2, locationId: 2, category: 'IT Equipment' },
  { id: 11, name: 'Meeting Room Table', code: 'FUR-005', categoryId: 1, locationId: 2, category: 'Furniture' },
  { id: 12, name: 'Network Switch - Cisco', code: 'IT-005', categoryId: 2, locationId: 2, category: 'IT Equipment' },

  // Main Office - Floor 3
  { id: 13, name: 'Reception Desk - Marble', code: 'FUR-006', categoryId: 1, locationId: 3, category: 'Furniture' },
  { id: 14, name: 'Projector - 4K Ultra HD', code: 'OFC-003', categoryId: 3, locationId: 3, category: 'Office Equipment' },
  { id: 15, name: 'Boardroom Chairs - Set of 12', code: 'FUR-007', categoryId: 1, locationId: 3, category: 'Furniture' },

  // Warehouse A
  { id: 16, name: 'Forklift - Toyota 8FBE20', code: 'VEH-001', categoryId: 4, locationId: 4, category: 'Vehicles' },
  { id: 17, name: 'Conveyor Belt System', code: 'MCH-001', categoryId: 5, locationId: 4, category: 'Machinery' },
  { id: 18, name: 'Industrial Scanner', code: 'OFC-004', categoryId: 3, locationId: 4, category: 'Office Equipment' },

  // Warehouse B
  { id: 19, name: 'Pallet Jack - Electric', code: 'VEH-002', categoryId: 4, locationId: 5, category: 'Vehicles' },
  { id: 20, name: 'Hydraulic Press', code: 'MCH-002', categoryId: 5, locationId: 5, category: 'Machinery' },

  // Branch Office - Downtown
  { id: 21, name: 'Ergonomic Chair - Herman Miller', code: 'FUR-008', categoryId: 1, locationId: 6, category: 'Furniture' },
  { id: 22, name: 'Surface Studio - 28 inch', code: 'IT-006', categoryId: 2, locationId: 6, category: 'IT Equipment' },

  // Branch Office - Uptown
  { id: 23, name: 'Collaborative Workspace Table', code: 'FUR-009', categoryId: 1, locationId: 7, category: 'Furniture' },
  { id: 24, name: 'Video Conference System', code: 'OFC-005', categoryId: 3, locationId: 7, category: 'Office Equipment' },

  // Storage Facility
  { id: 25, name: 'Filing Cabinet - 4 Drawer', code: 'FUR-010', categoryId: 1, locationId: 8, category: 'Furniture' },
  { id: 26, name: 'Backup Server - Dell PowerEdge', code: 'IT-007', categoryId: 2, locationId: 8, category: 'IT Equipment' }
];

export const vehicleTypes = [
  { id: 1, name: '1-Ton Pickup', capacity: '1000kg', features: ['Standard Bed'] },
  { id: 2, name: '2-Ton Truck', capacity: '2000kg', features: ['Enclosed'] },
  { id: 3, name: '3-Ton Truck', capacity: '3000kg', features: ['Hydraulic Lift'] },
  { id: 4, name: '5-Ton Truck', capacity: '5000kg', features: ['Tail Lift', 'Side Gate'] },
  { id: 5, name: 'Crane Truck', capacity: '8000kg', features: ['Mounted Crane', 'Extended Bed'] },
  { id: 6, name: 'Flatbed Truck', capacity: '10000kg', features: ['Dropping Sides', 'Ramps'] },
  { id: 7, name: 'Drop Sides', capacity: '3500kg', features: ['Dropping Sides', 'Easy Loading'] },
  { id: 8, name: 'Closed Canopy', capacity: '2500kg', features: ['Weather Protection', 'Secure Transport'] },
  { id: 9, name: 'Back Lift', capacity: '4000kg', features: ['Hydraulic Back Lift', 'Easy Loading'] }
];

export const internalVehicles = [
  { id: 1, type: 1, registration: 'ABC123GP', capacity: '1000kg', driver: 'John Smith' },
  { id: 2, type: 2, registration: 'DEF456GP', capacity: '2000kg', driver: 'Mike Johnson' },
  { id: 3, type: 3, registration: 'GHI789GP', capacity: '3000kg', driver: 'David Brown' },
  { id: 4, type: 4, registration: 'JKL012GP', capacity: '5000kg', driver: 'Steve Wilson' },
  { id: 5, type: 7, registration: 'MNO345GP', capacity: '3500kg', driver: 'Robert Davis' },
  { id: 6, type: 8, registration: 'PQR678GP', capacity: '2500kg', driver: 'Thomas White' }
];

export const approvedTransporters = [
  {
    id: 1,
    name: 'FastMove Logistics',
    contactPerson: 'Sarah Johnson',
    phone: '011-555-0123',
    email: 'dispatch@fastmove.com',
    specializations: ['Heavy Machinery', 'IT Equipment', 'Office Furniture']
  },
  {
    id: 2,
    name: 'SecureHaul Transport',
    contactPerson: 'Michael Brown',
    phone: '011-555-0124',
    email: 'ops@securehaul.com',
    specializations: ['Sensitive Equipment', 'High-Value Items', 'Fragile Goods']
  },
  {
    id: 3,
    name: 'CranePro Movers',
    contactPerson: 'James Wilson',
    phone: '011-555-0125',
    email: 'dispatch@cranepro.com',
    specializations: ['Crane Operations', 'Heavy Lifting', 'Specialized Equipment']
  },
  {
    id: 4,
    name: 'Express Cargo Solutions',
    contactPerson: 'Elizabeth Taylor',
    phone: '011-555-0126',
    email: 'booking@expresscargosolns.com',
    specializations: ['Expedited Delivery', 'Nationwide Coverage', 'Refrigerated Transport']
  },
  {
    id: 5,
    name: 'Premier Asset Movers',
    contactPerson: 'Robert Davis',
    phone: '011-555-0127',
    email: 'info@premierassetmovers.com',
    specializations: ['IT Equipment', 'Medical Equipment', 'Office Relocations']
  },
  {
    id: 6,
    name: 'SafeTrans Logistics',
    contactPerson: 'Jennifer Williams',
    phone: '011-555-0128',
    email: 'operations@safetrans.com',
    specializations: ['High-Security Transport', 'GPS-Tracked Fleet', 'Armored Vehicles']
  }
];

export const vehicleFeatures = [
  { id: 1, name: 'Hydraulic Lift', description: 'For heavy equipment loading' },
  { id: 2, name: 'Crane', description: 'Built-in crane for lifting' },
  { id: 3, name: 'Dropping Sides', description: 'Easy side access' },
  { id: 4, name: 'Tail Lift', description: 'Rear lifting platform' },
  { id: 5, name: 'Temperature Control', description: 'Climate controlled storage' },
  { id: 6, name: 'Air Ride Suspension', description: 'For sensitive equipment' }
];

// COMPREHENSIVE RELOCATION REQUESTS FOR ALL USER PROFILES
export const relocationRequests = [
  // =====================================
  // JOHN SMITH'S REQUESTS (Asset Custodian - Finance Dept)
  // =====================================
  
  // 1. New Request - Just submitted, awaiting HOD approval
  {
    id: 1,
    requestId: 'REQ-2024-001',
    assetId: 1,
    assetName: 'Executive Desk - Oak',
    assetCode: 'FUR-001',
    assetCategory: 'Furniture',
    fromLocation: 'Main Office - Floor 1',
    toLocation: 'Main Office - Floor 3',
    transportType: 'Internal',
    transport_vehicle_type: 2,
    requestedDate: '2024-03-15',
    status: 'Pending HOD Approval',
    requestedBy: 'John Smith',
    requestedByUserId: 2,
    requestDate: '2024-03-01',
    comments: 'CEO office relocation - handle with care',
    assignedHOD: 'Michael Brown',
    assignedHODId: 5,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: null,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: false,
      approvedBy: null,
      approvedDate: null,
      comments: null
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 2. Request pending Admin Transport Assignment
  {
    id: 2,
    requestId: 'REQ-2024-002',
    assetId: 6,
    assetName: 'Samsung 4K Monitor',
    assetCode: 'IT-002',
    assetCategory: 'IT Equipment',
    fromLocation: 'Main Office - Floor 1',
    toLocation: 'Main Office - Floor 2',
    transportType: 'Internal',
    transport_vehicle_type: 1,
    requestedDate: '2024-03-20',
    status: 'Pending Admin Transport',
    requestedBy: 'John Smith',
    requestedByUserId: 2,
    requestDate: '2024-02-15',
    comments: 'Monitor upgrade for development team',
    assignedHOD: 'Michael Brown',
    assignedHODId: 5,
    assignedManager: 'Lisa Chen',
    assignedManagerId: 8,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 1,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Michael Brown',
      hodApprovedDate: '2024-02-18',
      hodComments: 'Approved for IT equipment upgrade',
      managerApprovedBy: 'Lisa Chen',
      managerApprovedDate: '2024-02-22',
      managerComments: 'Final approval granted'
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 3. Request pending Manager Approval
  {
    id: 3,
    requestId: 'REQ-2024-003',
    assetId: 5,
    assetName: 'Ergonomic Office Chair',
    assetCode: 'FUR-003',
    assetCategory: 'Furniture',
    fromLocation: 'Main Office - Floor 1',
    toLocation: 'Branch Office - Downtown',
    transportType: 'Internal',
    transport_vehicle_type: 2,
    requestedDate: '2024-03-25',
    status: 'Pending Manager Approval',
    requestedBy: 'John Smith',
    requestedByUserId: 2,
    requestDate: '2024-02-28',
    comments: 'Branch office setup for new employee',
    assignedHOD: 'Michael Brown',
    assignedHODId: 5,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 2,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Michael Brown',
      hodApprovedDate: '2024-03-02',
      hodComments: 'Approved by HOD - forwarded to Asset Manager',
      managerApprovedBy: null,
      managerApprovedDate: null,
      managerComments: null
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 4. Request In Progress (Transport Arranged)
  {
    id: 4,
    requestId: 'REQ-2024-004',
    assetId: 4,
    assetName: 'Laser Printer - HP LaserJet',
    assetCode: 'OFC-001',
    assetCategory: 'Office Equipment',
    fromLocation: 'Main Office - Floor 1',
    toLocation: 'Branch Office - Uptown',
    transportType: 'Internal',
    transport_vehicle_type: 2,
    requestedDate: '2024-03-10',
    status: 'In Progress',
    requestedBy: 'John Smith',
    requestedByUserId: 2,
    requestDate: '2024-02-10',
    comments: 'Printer relocation for branch office',
    assignedHOD: 'Michael Brown',
    assignedHODId: 5,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: true,
      vehicleId: 2,
      vehicleType: 2,
      registration: 'DEF456GP',
      driver: 'Mike Johnson',
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: true,
      dispatchDate: '2024-03-08'
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Michael Brown',
      hodApprovedDate: '2024-02-12',
      hodComments: 'Approved for branch office setup',
      managerApprovedBy: 'Sarah Wilson',
      managerApprovedDate: '2024-02-15',
      managerComments: 'Final approval granted'
    },
    dispatchStatus: {
      isDispatched: true,
      dispatchedBy: 'Transport Administrator',
      dispatchDate: '2024-03-08',
      currentCustodianNotified: true,
      newCustodianNotified: true,
      estimatedArrival: '2024-03-10T14:00:00Z'
    }
  },

  // 5. Completed Request
  {
    id: 5,
    requestId: 'REQ-2024-005',
    assetId: 7,
    assetName: 'Industrial Shredder',
    assetCode: 'OFC-002',
    assetCategory: 'Office Equipment',
    fromLocation: 'Main Office - Floor 1',
    toLocation: 'Storage Facility',
    transportType: 'Internal',
    transport_vehicle_type: 3,
    requestedDate: '2024-02-20',
    status: 'Completed',
    requestedBy: 'John Smith',
    requestedByUserId: 2,
    requestDate: '2024-02-01',
    comments: 'Moving old equipment to storage',
    assignedHOD: 'Michael Brown',
    assignedHODId: 5,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: true,
      vehicleId: 3,
      vehicleType: 3,
      registration: 'GHI789GP',
      driver: 'David Brown',
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: true,
      dispatchDate: '2024-02-18'
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Michael Brown',
      hodApprovedDate: '2024-02-03',
      hodComments: 'Approved for storage',
      managerApprovedBy: 'Sarah Wilson',
      managerApprovedDate: '2024-02-05',
      managerComments: 'Approved for equipment storage'
    },
    dispatchStatus: {
      isDispatched: true,
      dispatchedBy: 'Transport Administrator',
      dispatchDate: '2024-02-18',
      currentCustodianNotified: true,
      newCustodianNotified: true,
      estimatedArrival: '2024-02-20T10:00:00Z',
      completedDate: '2024-02-20T11:30:00Z'
    }
  },

  // =====================================
  // JANE DOE'S REQUESTS (Asset Custodian - Operations Dept)
  // =====================================

  // 6. External Transport Required - Awaiting custodian action
  {
    id: 6,
    requestId: 'REQ-2024-006',
    assetId: 10,
    assetName: 'Server Rack - 42U',
    assetCode: 'IT-004',
    assetCategory: 'IT Equipment',
    fromLocation: 'Main Office - Floor 2',
    toLocation: 'Storage Facility',
    transportType: 'Internal',
    transport_vehicle_type: 5,
    requestedDate: '2024-03-18',
    status: 'External Transport Required',
    requestedBy: 'Jane Doe',
    requestedByUserId: 3,
    requestDate: '2024-02-25',
    comments: 'Server decommissioning - requires crane truck',
    assignedHOD: 'Robert Johnson',
    assignedHODId: 7,
    assignedManager: 'Lisa Chen',
    assignedManagerId: 8,
    transportDetails: {
      isInternal: false,
      vehicleId: null,
      vehicleType: 5,
      registration: null,
      driver: null,
      features: [2, 6], // Crane, Air Ride Suspension
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Robert Johnson',
      hodApprovedDate: '2024-02-27',
      hodComments: 'Approved for server decommissioning',
      managerApprovedBy: 'Lisa Chen',
      managerApprovedDate: '2024-03-01',
      managerComments: 'Final approval - requires specialized transport'
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    },
    adminProcessedBy: 'Transport Administrator',
    adminProcessedDate: '2024-03-05',
    unavailabilityReason: 'No internal crane truck available for this size server rack. Please arrange external transport with crane capability.'
  },

  // 7. Jane's Pending HOD Approval
  {
    id: 7,
    requestId: 'REQ-2024-007',
    assetId: 12,
    assetName: 'Network Switch - Cisco',
    assetCode: 'IT-005',
    assetCategory: 'IT Equipment',
    fromLocation: 'Main Office - Floor 2',
    toLocation: 'Main Office - Floor 3',
    transportType: 'Internal',
    transport_vehicle_type: 1,
    requestedDate: '2024-03-22',
    status: 'Pending HOD Approval',
    requestedBy: 'Jane Doe',
    requestedByUserId: 3,
    requestDate: '2024-03-05',
    comments: 'Network infrastructure upgrade',
    assignedHOD: 'Robert Johnson',
    assignedHODId: 7,
    assignedManager: 'Lisa Chen',
    assignedManagerId: 8,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 1,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: false,
      approvedBy: null,
      approvedDate: null,
      comments: null
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 8. Jane's Completed Request
  {
    id: 8,
    requestId: 'REQ-2024-008',
    assetId: 11,
    assetName: 'Meeting Room Table',
    assetCode: 'FUR-005',
    assetCategory: 'Furniture',
    fromLocation: 'Main Office - Floor 2',
    toLocation: 'Branch Office - Downtown',
    transportType: 'Internal',
    transport_vehicle_type: 2,
    requestedDate: '2024-02-15',
    status: 'Completed',
    requestedBy: 'Jane Doe',
    requestedByUserId: 3,
    requestDate: '2024-01-20',
    comments: 'Meeting room setup for branch office',
    assignedHOD: 'Robert Johnson',
    assignedHODId: 7,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: true,
      vehicleId: 2,
      vehicleType: 2,
      registration: 'DEF456GP',
      driver: 'Mike Johnson',
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: true,
      dispatchDate: '2024-02-12'
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Robert Johnson',
      hodApprovedDate: '2024-01-22',
      hodComments: 'Approved for branch office setup',
      managerApprovedBy: 'Sarah Wilson',
      managerApprovedDate: '2024-01-25',
      managerComments: 'Final approval granted'
    },
    dispatchStatus: {
      isDispatched: true,
      dispatchedBy: 'Transport Administrator',
      dispatchDate: '2024-02-12',
      currentCustodianNotified: true,
      newCustodianNotified: true,
      estimatedArrival: '2024-02-15T09:00:00Z',
      completedDate: '2024-02-15T11:00:00Z'
    }
  },

  // =====================================
  // MIKE DAVIS'S REQUESTS (Asset Custodian - Warehouse Operations)
  // =====================================

  // 9. Mike's Pending Admin Transport
  {
    id: 9,
    requestId: 'REQ-2024-009',
    assetId: 16,
    assetName: 'Forklift - Toyota 8FBE20',
    assetCode: 'VEH-001',
    assetCategory: 'Vehicles',
    fromLocation: 'Warehouse A',
    toLocation: 'Warehouse B',
    transportType: 'Internal',
    transport_vehicle_type: 4,
    requestedDate: '2024-03-28',
    status: 'Pending Admin Transport',
    requestedBy: 'Mike Davis',
    requestedByUserId: 9,
    requestDate: '2024-02-20',
    comments: 'Operational requirement for increased capacity at Warehouse B',
    assignedHOD: 'Tom Anderson',
    assignedHODId: 10,
    assignedManager: 'Patricia Moore',
    assignedManagerId: 11,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 4,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Tom Anderson',
      hodApprovedDate: '2024-02-22',
      hodComments: 'Approved by HOD - operational necessity',
      managerApprovedBy: 'Patricia Moore',
      managerApprovedDate: '2024-02-25',
      managerComments: 'Final approval granted for warehouse operations'
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 10. Mike's In Progress Request
  {
    id: 10,
    requestId: 'REQ-2024-010',
    assetId: 19,
    assetName: 'Pallet Jack - Electric',
    assetCode: 'VEH-002',
    assetCategory: 'Vehicles',
    fromLocation: 'Warehouse B',
    toLocation: 'Warehouse A',
    transportType: 'Internal',
    transport_vehicle_type: 3,
    requestedDate: '2024-03-12',
    status: 'In Progress',
    requestedBy: 'Mike Davis',
    requestedByUserId: 9,
    requestDate: '2024-02-08',
    comments: 'Equipment redistribution between warehouses',
    assignedHOD: 'Tom Anderson',
    assignedHODId: 10,
    assignedManager: 'Patricia Moore',
    assignedManagerId: 11,
    transportDetails: {
      isInternal: true,
      vehicleId: 4,
      vehicleType: 3,
      registration: 'JKL012GP',
      driver: 'Steve Wilson',
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: true,
      dispatchDate: '2024-03-10'
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Tom Anderson',
      hodApprovedDate: '2024-02-10',
      hodComments: 'Approved for warehouse redistribution',
      managerApprovedBy: 'Patricia Moore',
      managerApprovedDate: '2024-02-12',
      managerComments: 'Final approval for equipment redistribution'
    },
    dispatchStatus: {
      isDispatched: true,
      dispatchedBy: 'Transport Administrator',
      dispatchDate: '2024-03-10',
      currentCustodianNotified: true,
      newCustodianNotified: true,
      estimatedArrival: '2024-03-12T13:00:00Z'
    }
  },

  // =====================================
  // EMMA WHITE'S REQUESTS (Asset Custodian - Branch Operations)
  // =====================================

  // 11. Emma's Denied Request
  {
    id: 11,
    requestId: 'REQ-2024-011',
    assetId: 22,
    assetName: 'Surface Studio - 28 inch',
    assetCode: 'IT-006',
    assetCategory: 'IT Equipment',
    fromLocation: 'Branch Office - Downtown',
    toLocation: 'Branch Office - Uptown',
    transportType: 'Internal',
    transport_vehicle_type: 2,
    requestedDate: '2024-03-05',
    status: 'Denied',
    requestedBy: 'Emma White',
    requestedByUserId: 12,
    requestDate: '2024-02-18',
    comments: 'Designer workstation needed at uptown branch',
    assignedHOD: 'Robert Johnson',
    assignedHODId: 7,
    assignedManager: 'Lisa Chen',
    assignedManagerId: 8,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 2,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: false,
      deniedBy: 'Robert Johnson',
      deniedDate: '2024-02-20',
      denialReason: 'Equipment is currently assigned to a critical project at downtown branch. Request denied until project completion in Q3.'
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 12. Emma's Completed Request
  {
    id: 12,
    requestId: 'REQ-2024-012',
    assetId: 24,
    assetName: 'Video Conference System',
    assetCode: 'OFC-005',
    assetCategory: 'Office Equipment',
    fromLocation: 'Branch Office - Uptown',
    toLocation: 'Main Office - Floor 3',
    transportType: 'Internal',
    transport_vehicle_type: 2,
    requestedDate: '2024-01-30',
    status: 'Completed',
    requestedBy: 'Emma White',
    requestedByUserId: 12,
    requestDate: '2024-01-10',
    comments: 'Moving to main boardroom for executive meetings',
    assignedHOD: 'Robert Johnson',
    assignedHODId: 7,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: true,
      vehicleId: 1,
      vehicleType: 2,
      registration: 'ABC123GP',
      driver: 'John Smith',
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: true,
      dispatchDate: '2024-01-28'
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Robert Johnson',
      hodApprovedDate: '2024-01-12',
      hodComments: 'Approved for main office boardroom',
      managerApprovedBy: 'Sarah Wilson',
      managerApprovedDate: '2024-01-15',
      managerComments: 'Final approval for executive meeting setup'
    },
    dispatchStatus: {
      isDispatched: true,
      dispatchedBy: 'Transport Administrator',
      dispatchDate: '2024-01-28',
      currentCustodianNotified: true,
      newCustodianNotified: true,
      estimatedArrival: '2024-01-30T10:00:00Z',
      completedDate: '2024-01-30T12:00:00Z'
    }
  },

  // =====================================
  // ADDITIONAL REQUESTS FOR HOD & MANAGER DASHBOARDS
  // =====================================

  // 13. Request for Michael Brown (HOD Finance) to approve
  {
    id: 13,
    requestId: 'REQ-2024-013',
    assetId: 2,
    assetName: 'Conference Table - 12 Seater',
    assetCode: 'FUR-002',
    assetCategory: 'Furniture',
    fromLocation: 'Main Office - Floor 1',
    toLocation: 'Branch Office - Downtown',
    transportType: 'External',
    transport_vehicle_type: 3,
    requestedDate: '2024-03-30',
    status: 'Pending HOD Approval',
    requestedBy: 'John Smith',
    requestedByUserId: 2,
    requestDate: '2024-03-08',
    comments: 'Large conference table for branch office expansion',
    assignedHOD: 'Michael Brown',
    assignedHODId: 5,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: false,
      vehicleId: null,
      vehicleType: 3,
      registration: 'EXT789GP',
      driver: 'External Driver',
      driverIdNumber: '8901234567890',
      driverMobile: '072-555-9876',
      features: [3, 4], // Dropping Sides, Tail Lift
      transporterId: 1,
      transporterName: 'FastMove Logistics',
      transporterContact: 'dispatch@fastmove.com',
      estimatedCost: 2800.00,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: false,
      approvedBy: null,
      approvedDate: null,
      comments: null
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 14. Request for Tom Anderson (HOD Warehouse) to approve
  {
    id: 14,
    requestId: 'REQ-2024-014',
    assetId: 17,
    assetName: 'Conveyor Belt System',
    assetCode: 'MCH-001',
    assetCategory: 'Machinery',
    fromLocation: 'Warehouse A',
    toLocation: 'Storage Facility',
    transportType: 'Internal',
    transport_vehicle_type: 6,
    requestedDate: '2024-04-05',
    status: 'Pending HOD Approval',
    requestedBy: 'Mike Davis',
    requestedByUserId: 9,
    requestDate: '2024-03-10',
    comments: 'Conveyor system decommissioning - moving to storage',
    assignedHOD: 'Tom Anderson',
    assignedHODId: 10,
    assignedManager: 'Patricia Moore',
    assignedManagerId: 11,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 6,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: false,
      approvedBy: null,
      approvedDate: null,
      comments: null
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 15. Request for Sarah Wilson (Asset Manager - Furniture) to final approve
  {
    id: 15,
    requestId: 'REQ-2024-015',
    assetId: 13,
    assetName: 'Reception Desk - Marble',
    assetCode: 'FUR-006',
    assetCategory: 'Furniture',
    fromLocation: 'Main Office - Floor 3',
    toLocation: 'Branch Office - Uptown',
    transportType: 'External',
    transport_vehicle_type: 4,
    requestedDate: '2024-04-10',
    status: 'Pending Manager Approval',
    requestedBy: 'Emma White',
    requestedByUserId: 12,
    requestDate: '2024-03-12',
    comments: 'Marble reception desk for uptown branch upgrade',
    assignedHOD: 'Robert Johnson',
    assignedHODId: 7,
    assignedManager: 'Sarah Wilson',
    assignedManagerId: 6,
    transportDetails: {
      isInternal: false,
      vehicleId: null,
      vehicleType: 4,
      registration: 'SPL456GP',
      driver: 'Specialized Driver',
      driverIdNumber: '9012345678901',
      driverMobile: '073-555-1234',
      features: [2, 4, 6], // Crane, Tail Lift, Air Ride Suspension
      transporterId: 3,
      transporterName: 'CranePro Movers',
      transporterContact: 'dispatch@cranepro.com',
      estimatedCost: 4200.00,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Robert Johnson',
      hodApprovedDate: '2024-03-15',
      hodComments: 'Approved for branch office upgrade',
      managerApprovedBy: null,
      managerApprovedDate: null,
      managerComments: null
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 16. Request for Lisa Chen (Asset Manager - IT) to final approve
  {
    id: 16,
    requestId: 'REQ-2024-016',
    assetId: 26,
    assetName: 'Backup Server - Dell PowerEdge',
    assetCode: 'IT-007',
    assetCategory: 'IT Equipment',
    fromLocation: 'Storage Facility',
    toLocation: 'Main Office - Floor 2',
    transportType: 'Internal',
    transport_vehicle_type: 3,
    requestedDate: '2024-04-15',
    status: 'Pending Manager Approval',
    requestedBy: 'Jane Doe',
    requestedByUserId: 3,
    requestDate: '2024-03-18',
    comments: 'Backup server activation for disaster recovery',
    assignedHOD: 'Robert Johnson',
    assignedHODId: 7,
    assignedManager: 'Lisa Chen',
    assignedManagerId: 8,
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 3,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: true,
      hodApprovedBy: 'Robert Johnson',
      hodApprovedDate: '2024-03-20',
      hodComments: 'Approved for disaster recovery implementation',
      managerApprovedBy: null,
      managerApprovedDate: null,
      managerComments: null
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  },

  // 17. Request for Patricia Moore (Asset Manager - Vehicles/Machinery) - Denied
  {
    id: 17,
    requestId: 'REQ-2024-017',
    assetId: 20,
    assetName: 'Hydraulic Press',
    assetCode: 'MCH-002',
    assetCategory: 'Machinery',
    fromLocation: 'Warehouse B',
    toLocation: 'Branch Office - Downtown',
    transportType: 'External',
    transport_vehicle_type: 5,
    requestedDate: '2024-03-25',
    status: 'Denied',
    requestedBy: 'Mike Davis',
    requestedByUserId: 9,
    requestDate: '2024-03-01',
    comments: 'Hydraulic press for branch office manufacturing setup',
    assignedHOD: 'Tom Anderson',
    assignedHODId: 10,
    assignedManager: 'Patricia Moore',
    assignedManagerId: 11,
    transportDetails: {
      isInternal: false,
      vehicleId: null,
      vehicleType: 5,
      registration: 'HVY890GP',
      driver: 'Heavy Lift Specialist',
      driverIdNumber: '0123456789012',
      driverMobile: '074-555-5678',
      features: [2, 3, 4], // Crane, Dropping Sides, Tail Lift
      transporterId: 3,
      transporterName: 'CranePro Movers',
      transporterContact: 'dispatch@cranepro.com',
      estimatedCost: 6500.00,
      isDispatched: false
    },
    approvalStatus: {
      isApproved: false,
      hodApprovedBy: 'Tom Anderson',
      hodApprovedDate: '2024-03-03',
      hodComments: 'Approved by HOD for manufacturing expansion',
      managerApprovedBy: null,
      managerApprovedDate: null,
      managerComments: null,
      deniedBy: 'Patricia Moore',
      deniedDate: '2024-03-08',
      denialReason: 'Branch office location not suitable for heavy machinery operations. Safety and zoning regulations prohibit industrial equipment at this location.'
    },
    dispatchStatus: {
      isDispatched: false,
      dispatchedBy: null,
      dispatchDate: null,
      currentCustodianNotified: false,
      newCustodianNotified: false,
      estimatedArrival: null
    }
  }
];

// Enhanced user system with role-based permissions
export const users = [
  // MoveItRight Administrator
  {
    id: 1,
    email: 'admin@moveitright.com',
    password: 'admin123',
    name: 'System Administrator',
    role: 'system_admin',
    department: 'IT Administration',
    permissions: ['manage_users', 'manage_system', 'view_all_requests', 'manage_settings'],
    assignedLocations: [], // Has access to all locations
    assignedCategories: [] // Has access to all categories
  },

  // Normal Asset Custodian/User
  {
    id: 2,
    email: 'john.smith@company.com',
    password: 'user123',
    name: 'John Smith',
    role: 'custodian',
    department: 'Finance',
    permissions: ['create_request', 'view_own_requests'],
    assignedLocations: [1, 2], // Main Office Floor 1 & 2
    assignedCategories: [1, 2, 3] // Furniture, IT Equipment, Office Equipment
  },

  {
    id: 3,
    email: 'jane.doe@company.com',
    password: 'user123',
    name: 'Jane Doe',
    role: 'custodian',
    department: 'Operations',
    permissions: ['create_request', 'view_own_requests'],
    assignedLocations: [2, 3], // Main Office Floor 2 & 3
    assignedCategories: [2, 3] // IT Equipment, Office Equipment
  },

  // ADMIN Department Internal Transport Function
  {
    id: 4,
    email: 'transport.admin@company.com',
    password: 'transport123',
    name: 'Transport Administrator',
    role: 'transport_admin',
    department: 'ADMIN Department',
    permissions: ['assign_transport', 'manage_internal_vehicles', 'view_transport_requests'],
    assignedLocations: [], // Has access to all locations for transport
    assignedCategories: [] // Has access to all categories for transport
  },

  // Asset HODs (Head of Department)
  {
    id: 5,
    email: 'michael.brown@company.com',
    password: 'hod123',
    name: 'Michael Brown',
    role: 'hod',
    department: 'Finance HOD',
    permissions: ['approve_requests', 'view_department_requests'],
    assignedLocations: [1, 2, 3], // Main Office all floors
    assignedCategories: [1, 2, 3] // Furniture, IT Equipment, Office Equipment
  },

  {
    id: 7,
    email: 'robert.johnson@company.com',
    password: 'hod123',
    name: 'Robert Johnson',
    role: 'hod',
    department: 'Operations HOD',
    permissions: ['approve_requests', 'view_department_requests'],
    assignedLocations: [2, 3, 6, 7, 8], // Main Office Floor 2 & 3, Branch Offices, Storage
    assignedCategories: [2, 3] // IT Equipment, Office Equipment
  },

  {
    id: 10,
    email: 'tom.anderson@company.com',
    password: 'hod123',
    name: 'Tom Anderson',
    role: 'hod',
    department: 'Warehouse HOD',
    permissions: ['approve_requests', 'view_department_requests'],
    assignedLocations: [4, 5], // Warehouse A & B
    assignedCategories: [4, 5] // Vehicles, Machinery
  },

  // Asset Managers (Final Approvers)
  {
    id: 6,
    email: 'sarah.wilson@company.com',
    password: 'manager123',
    name: 'Sarah Wilson',
    role: 'asset_manager',
    department: 'Furniture & Office Equipment Manager',
    permissions: ['final_approve_requests', 'view_category_requests', 'manage_assets'],
    assignedLocations: [1, 2, 3, 6, 7], // Main Office + Branch Offices
    assignedCategories: [1, 3] // Furniture, Office Equipment
  },

  {
    id: 8,
    email: 'lisa.chen@company.com',
    password: 'manager123',
    name: 'Lisa Chen',
    role: 'asset_manager',
    department: 'IT Equipment Manager',
    permissions: ['final_approve_requests', 'view_category_requests', 'manage_assets'],
    assignedLocations: [1, 2, 3, 6, 7, 8], // All office locations
    assignedCategories: [2] // IT Equipment
  },

  {
    id: 11,
    email: 'patricia.moore@company.com',
    password: 'manager123',
    name: 'Patricia Moore',
    role: 'asset_manager',
    department: 'Vehicles & Machinery Manager',
    permissions: ['final_approve_requests', 'view_category_requests', 'manage_assets'],
    assignedLocations: [4, 5], // Warehouses
    assignedCategories: [4, 5] // Vehicles, Machinery
  },

  // Additional custodians for testing
  {
    id: 9,
    email: 'mike.davis@company.com',
    password: 'user123',
    name: 'Mike Davis',
    role: 'custodian',
    department: 'Warehouse Operations',
    permissions: ['create_request', 'view_own_requests'],
    assignedLocations: [4, 5], // Warehouse A & B
    assignedCategories: [4, 5] // Vehicles, Machinery
  },

  {
    id: 12,
    email: 'emma.white@company.com',
    password: 'user123',
    name: 'Emma White',
    role: 'custodian',
    department: 'Branch Operations',
    permissions: ['create_request', 'view_own_requests'],
    assignedLocations: [6, 7], // Branch Offices
    assignedCategories: [1, 2, 3] // Furniture, IT Equipment, Office Equipment
  }
];

// Role definitions for the system
export const roleDefinitions = {
  system_admin: {
    name: 'MoveItRight System Administrator',
    description: 'Manages the MoveItRight System settings and user interactions',
    canAccessAllLocations: true,
    canAccessAllCategories: true,
    dashboardType: 'admin'
  },
  custodian: {
    name: 'Asset Custodian/User',
    description: 'Can request asset relocations for assets within assigned location(s)',
    canAccessAllLocations: false,
    canAccessAllCategories: false,
    dashboardType: 'custodian'
  },
  transport_admin: {
    name: 'ADMIN Department Transport Function',
    description: 'Assigns internal transport or reverts to external transport',
    canAccessAllLocations: true,
    canAccessAllCategories: true,
    dashboardType: 'transport'
  },
  hod: {
    name: 'Asset HOD',
    description: 'First line approval for assets based on location assignment',
    canAccessAllLocations: false,
    canAccessAllCategories: false,
    dashboardType: 'hod'
  },
  asset_manager: {
    name: 'Asset Manager',
    description: 'Final approver assigned to specific category and location combinations',
    canAccessAllLocations: false,
    canAccessAllCategories: false,
    dashboardType: 'manager'
  }
};