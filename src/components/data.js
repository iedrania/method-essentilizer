export const areasOfConcern = [
  { id: 1, name: 'Customer' },
  { id: 2, name: 'Solution' },
  { id: 3, name: 'Work' },
];

export const customerActivitySpaces = [
  { id: 1, name: 'Explore Possibilities', entryCriteria: [], completionCriteria: ['Stakeholders::Recognized', 'Opportunity::Value Established'] },
  { id: 2, name: 'Understand Stakeholder Needs', entryCriteria: ['Stakeholders::Recognized', 'Opportunity::Value Established'], completionCriteria: ['Stakeholders::In Agreement', 'Opportunity::Viable'] },
  { id: 3, name: 'Ensure Stakeholder Satisfaction', entryCriteria: ['Stakeholders::In Agreement, Opportunity::Value Established'], completionCriteria: ['Stakeholders::Satisfied for Deployment, Opportunity::Addressed'] },
  { id: 4, name: 'Use the System', entryCriteria: ['Stakeholders::Satisfied for Deployment, Opportunity::Addressed'], completionCriteria: ['Stakeholders::Satisfied in Use, Opportunity::Benefit Accrued'] },
];

export const solutionActivitySpaces = [
  { id: 5, name: 'Understand the Requirements', entryCriteria: [], completionCriteria: ['Requirements::Coherent'] },
  { id: 6, name: 'Shape the System', entryCriteria: ['Requirements::Coherent'], completionCriteria: ['Requirements::Acceptable, Software System::Architecture Selected'] },
  { id: 7, name: 'Implement the System', entryCriteria: ['Software System::Architecture Selected'], completionCriteria: ['Software System::Ready'] },
  { id: 8, name: 'Test the System', entryCriteria: ['Requirements::Acceptable, Software System::Architecture Selected'], completionCriteria: ['Requirements::Fulfilled, Software System::Ready'] },
  { id: 9, name: 'Deploy the System', entryCriteria: [' Software System::Ready'], completionCriteria: ['Software System::Operational'] },
  { id: 10, name: 'Operate the System', entryCriteria: ['Software System::Ready'], completionCriteria: ['Software System::Retired'] },
];

export const workActivitySpaces = [
  { id: 11, name: 'Prepare to do the Work', entryCriteria: [], completionCriteria: ['Team::Seeded, Way of Working::Foundation Established, Work::Prepared'] },
  { id: 12, name: 'Coordinate Activity', entryCriteria: ['Team::Seeded, Work::Prepared'], completionCriteria: ['Team::Formed, Work::Under Control'] },
  { id: 13, name: 'Support the Team', entryCriteria: ['Team::Formed, Way of Working::Foundation Established'], completionCriteria: ['Team::Collaborating, Way of Working::In Place'] },
  { id: 14, name: 'Track Progress', entryCriteria: ['Team::Collaborating, Way of Working::In Place, Work::Started'], completionCriteria: ['Team::Performing, Way of Working::Working Well, Work::Concluded'] },
  { id: 15, name: 'Stop the Work', entryCriteria: ['Team::Performing, Way of Working::Working Well, Work::Concluded'], completionCriteria: ['Team::Adjourned, Way of Working::Retired, Work::Closed'] },
];

export const customerAlphas = [
  // TODO { id: 1, name: 'Recognized' },
  { id: 1, name: 'Stakeholders', states: ['Represented', 'Involved', 'In Agreement', 'Satisfied for Deployment', 'Satisfied in Use'] },
  { id: 2, name: 'Opportunity', states: ['Identified', 'Solution Needed', 'Value Established', 'Viable', 'Addressed', 'Benefit Accrued'] },
];

export const solutionAlphas = [
  { id: 3, name: 'Requirements', states: ['Conceived', 'Bounded', 'Coherent', 'Acceptable', 'Addressed', 'Fulfilled'] },
  { id: 4, name: 'Software System', states: ['Architecture Selected', 'Demonstrable', 'Usable', 'Ready', 'Operational', 'Retired'] },
];

export const workAlphas = [
  { id: 5, name: 'Team', states: ['Seeded', 'Formed', 'Collaborating', 'Performing', 'Adjourned'] },
  { id: 6, name: 'Work', states: ['Initiated', 'Prepared', 'Started', 'Under Control', 'Concluded', 'Closed'] },
  { id: 7, name: 'Way-of-Working', states: ['Principles Established', 'Foundation Established', 'In Use', 'In Place', 'Working well', 'Retired'] },
];

export const competencies = [
  { id: 1, name: 'Stakeholder Representation' },
  { id: 2, name: 'Analysis' },
  { id: 3, name: 'Development' },
  { id: 4, name: 'Testing' },
  { id: 5, name: 'Leadership' },
  { id: 6, name: 'Management' },
];
