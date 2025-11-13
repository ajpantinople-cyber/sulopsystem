import { Record, RecordCategory, RecordStatus, User, UserRole } from './types';

// Placeholder document URL for demonstration
const SAMPLE_DOC_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const MOCK_RECORDS: Record[] = [
  { id: '1', title: 'Commercial Building Plan A', category: RecordCategory.BUILDING, dateReceived: '2023-01-15T00:00:00.000Z', status: RecordStatus.APPROVED, description: 'Construction of a two-story commercial establishment.', submittedBy: 'MPDO Staff', documentUrl: SAMPLE_DOC_URL },
  { id: '2', title: 'Residential Zoning Clearance B', category: RecordCategory.ZONING, dateReceived: '2023-02-20T00:00:00.000Z', status: RecordStatus.PENDING, description: 'Application for a new residential zone.', submittedBy: 'John Doe' },
  { id: '3', title: 'Sulop Town Center Dev Plan', category: RecordCategory.DEVELOPMENT, dateReceived: '2023-03-05T00:00:00.000Z', status: RecordStatus.APPROVED, description: '5-year development plan for the town center.', submittedBy: 'MPDO Staff', documentUrl: SAMPLE_DOC_URL },
  { id: '4', title: 'Eco-Park Environmental Report', category: RecordCategory.ENVIRONMENTAL, dateReceived: '2023-04-10T00:00:00.000Z', status: RecordStatus.REJECTED, description: 'Compliance report for the new eco-park project.', submittedBy: 'Jane Smith' },
  { id: '5', title: 'JJ\'s Eatery Business Permit', category: RecordCategory.BUSINESS, dateReceived: '2023-05-12T00:00:00.000Z', status: RecordStatus.APPROVED, description: 'Renewal of business license for a local restaurant.', submittedBy: 'MPDO Staff' },
  { id: '6', title: 'Agricultural Land Use Conversion', category: RecordCategory.LAND_USE, dateReceived: '2023-06-18T00:00:00.000Z', status: RecordStatus.PENDING, description: 'Request to convert agricultural land to residential.', submittedBy: 'Richard Roe' },
  { id: '7', title: 'Warehouse Construction Permit', category: RecordCategory.BUILDING, dateReceived: '2023-07-22T00:00:00.000Z', status: RecordStatus.ARCHIVED, description: 'Archived permit for a warehouse built in 2020.', submittedBy: 'MPDO Staff' },
  { id: '8', title: 'Subdivision Zoning Application', category: RecordCategory.ZONING, dateReceived: '2023-08-01T00:00:00.000Z', status: RecordStatus.PENDING, description: 'New housing subdivision zoning request.', submittedBy: 'Emily White' },
  { id: '9', title: 'Barangay Health Center Plan', category: RecordCategory.DEVELOPMENT, dateReceived: '2023-09-14T00:00:00.000Z', status: RecordStatus.APPROVED, description: 'Development plan for a new health center.', submittedBy: 'MPDO Staff', documentUrl: SAMPLE_DOC_URL },
  { id: '10', title: 'River Cleanup Initiative', category: RecordCategory.ENVIRONMENTAL, dateReceived: '2023-10-25T00:00:00.000Z', status: RecordStatus.APPROVED, description: 'Environmental clearance for community river cleanup.', submittedBy: 'Community Group' },
  { id: '11', title: 'New Supermarket Business License', category: RecordCategory.BUSINESS, dateReceived: '2024-01-05T00:00:00.000Z', status: RecordStatus.PENDING, description: 'License application for a new supermarket branch.', submittedBy: 'Local Corp.' },
  { id: '12', title: 'Urban Land Use Policy 2024', category: RecordCategory.LAND_USE, dateReceived: '2024-02-10T00:00:00.000Z', status: RecordStatus.APPROVED, description: 'Updated land use policy for urban areas.', submittedBy: 'MPDO Staff', documentUrl: SAMPLE_DOC_URL },
  { id: '13', title: 'Residential House Extension', category: RecordCategory.BUILDING, dateReceived: '2024-03-15T00:00:00.000Z', status: RecordStatus.APPROVED, description: 'Permit for a 2nd-floor extension.', submittedBy: 'Michael Brown' },
  { id: '14', title: 'Industrial Zone Reclassification', category: RecordCategory.ZONING, dateReceived: '2024-04-02T00:00:00.000Z', status: RecordStatus.PENDING, description: 'Proposal to reclassify an area as an industrial zone.', submittedBy: 'MPDO Staff' },
  { id: '15', title: 'Public Market Renovation Plan', category: RecordCategory.DEVELOPMENT, dateReceived: '2024-05-20T00:00:00.000Z', status: RecordStatus.PENDING, description: 'Detailed plan for renovating the public market.', submittedBy: 'LGU Engineering' },
  { id: '16', 'title': 'Resort Environmental Compliance', category: RecordCategory.ENVIRONMENTAL, 'dateReceived': '2024-05-28T00:00:00.000Z', 'status': RecordStatus.APPROVED, 'description': 'Annual environmental compliance certificate for a beach resort.', submittedBy: 'Paradise Resort Inc.', documentUrl: SAMPLE_DOC_URL },
  { id: '17', 'title': 'Internet Cafe Business Permit', category: RecordCategory.BUSINESS, 'dateReceived': '2024-06-05T00:00:00.000Z', 'status': RecordStatus.APPROVED, 'description': 'New business permit for an internet cafe.', submittedBy: 'Net Hub Cafe' },
  { id: '18', 'title': 'High-rise Condo Building Permit', category: RecordCategory.BUILDING, 'dateReceived': '2024-06-10T00:00:00.000Z', 'status': RecordStatus.PENDING, 'description': 'Application for a 20-story condominium building.', submittedBy: 'Urban Developers' },
  { id: '19', 'title': 'Memorial Park Land Use Plan', category: RecordCategory.LAND_USE, 'dateReceived': '2024-06-15T00:00:00.000Z', 'status': RecordStatus.PENDING, 'description': 'Plan for a new memorial park on the outskirts of town.', submittedBy: 'Evergreen Parks' },
  { id: '20', 'title': 'Cell Tower Zoning Permit', category: RecordCategory.ZONING, 'dateReceived': '2024-06-20T00:00:00.000Z', 'status': RecordStatus.APPROVED, 'description': 'Zoning clearance for a new telecommunications tower.', submittedBy: 'ConnectTel Co.', documentUrl: SAMPLE_DOC_URL }
];

export const MOCK_USERS: User[] = [
    { id: 'u1', username: 'admin', role: UserRole.ADMIN },
    { id: 'u2', username: 'staff', role: UserRole.STAFF },
];