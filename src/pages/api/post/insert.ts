import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const areasOfConcern = [
    { id: 1, name: 'Customer' },
    { id: 2, name: 'Solution' },
    { id: 3, name: 'Work' },
  ];
  
  const activitySpaces = [
    [
      { id: 1, name: 'Explore Possibilities', description: '', entryCriteria: [], completionCriteria: ['Stakeholders::Recognized, Opportunity::Value Established'] },
      { id: 2, name: 'Understand Stakeholder Needs', description: '', entryCriteria: ['Stakeholders::Recognized, Opportunity::Value Established'], completionCriteria: ['Stakeholders::In Agreement, Opportunity::Viable'] },
      { id: 3, name: 'Ensure Stakeholder Satisfaction', description: '', entryCriteria: ['Stakeholders::In Agreement, Opportunity::Value Established'], completionCriteria: ['Stakeholders::Satisfied for Deployment, Opportunity::Addressed'] },
      { id: 4, name: 'Use the System', description: '', entryCriteria: ['Stakeholders::Satisfied for Deployment, Opportunity::Addressed'], completionCriteria: ['Stakeholders::Satisfied in Use, Opportunity::Benefit Accrued'] },
    ], [
      { id: 5, name: 'Understand the Requirements', description: '', entryCriteria: [], completionCriteria: ['Requirements::Coherent'] },
      { id: 6, name: 'Shape the System', description: '', entryCriteria: ['Requirements::Coherent'], completionCriteria: ['Requirements::Acceptable, Software System::Architecture Selected'] },
      { id: 7, name: 'Implement the System', description: '', entryCriteria: ['Software System::Architecture Selected'], completionCriteria: ['Software System::Ready'] },
      { id: 8, name: 'Test the System', description: '', entryCriteria: ['Requirements::Acceptable, Software System::Architecture Selected'], completionCriteria: ['Requirements::Fulfilled, Software System::Ready'] },
      { id: 9, name: 'Deploy the System', description: '', entryCriteria: [' Software System::Ready'], completionCriteria: ['Software System::Operational'] },
      { id: 10, name: 'Operate the System', description: '', entryCriteria: ['Software System::Ready'], completionCriteria: ['Software System::Retired'] },
    ], [
      { id: 11, name: 'Prepare to do the Work', description: '', entryCriteria: [], completionCriteria: ['Team::Seeded, Way of Working::Foundation Established, Work::Prepared'] },
      { id: 12, name: 'Coordinate Activity', description: '', entryCriteria: ['Team::Seeded, Work::Prepared'], completionCriteria: ['Team::Formed, Work::Under Control'] },
      { id: 13, name: 'Support the Team', description: '', entryCriteria: ['Team::Formed, Way of Working::Foundation Established'], completionCriteria: ['Team::Collaborating, Way of Working::In Place'] },
      { id: 14, name: 'Track Progress', description: '', entryCriteria: ['Team::Collaborating, Way of Working::In Place, Work::Started'], completionCriteria: ['Team::Performing, Way of Working::Working Well, Work::Concluded'] },
      { id: 15, name: 'Stop the Work', description: '', entryCriteria: ['Team::Performing, Way of Working::Working Well, Work::Concluded'], completionCriteria: ['Team::Adjourned, Way of Working::Retired, Work::Closed'] },
    ],
  ];
  
  const alphas = [
    [
      { id: 1, name: 'Stakeholders', description: '', states: ['Represented', 'Involved', 'In Agreement', 'Satisfied for Deployment', 'Satisfied in Use'] },
      { id: 2, name: 'Opportunity', description: '', states: ['Identified', 'Solution Needed', 'Value Established', 'Viable', 'Addressed', 'Benefit Accrued'] },
    ], [
      { id: 3, name: 'Requirements', description: '', states: ['Conceived', 'Bounded', 'Coherent', 'Acceptable', 'Addressed', 'Fulfilled'] },
      { id: 4, name: 'Software System', description: '', states: ['Architecture Selected', 'Demonstrable', 'Usable', 'Ready', 'Operational', 'Retired'] },
    ], [
      { id: 5, name: 'Team', description: '', states: ['Seeded', 'Formed', 'Collaborating', 'Performing', 'Adjourned'] },
      { id: 6, name: 'Work', description: '', states: ['Initiated', 'Prepared', 'Started', 'Under Control', 'Concluded', 'Closed'] },
      { id: 7, name: 'Way-of-Working', description: '', states: ['Principles Established', 'Foundation Established', 'In Use', 'In Place', 'Working well', 'Retired'] },
    ],
  ];
  
  const competencies = [
    [
      { id: 1, name: 'Stakeholder Representation', description: '' },
    ], [
      { id: 2, name: 'Analysis', description: '' },
      { id: 3, name: 'Development', description: '' },
      { id: 4, name: 'Testing', description: '' },
    ], [
      { id: 5, name: 'Leadership', description: '' },
      { id: 6, name: 'Management', description: '' },
    ]
  ];

  try {
    const result = await Promise.all(
      areasOfConcern.map(async (areaOfConcern) => {
        const createdArea = await prisma.areaOfConcern.create({
          data: {
            id: areaOfConcern.id,
            name: areaOfConcern.name,
            activitySpaces: {
              create: activitySpaces[areaOfConcern.id-1].map((activitySpace) => ({
                id: activitySpace.id,
                name: activitySpace.name,
                description: activitySpace.description,
                tasks: {
                  create: [],
                },
              }))
            },
            alphas: {
              create: alphas[areaOfConcern.id-1].map((alpha) => ({
                id: alpha.id,
                name: alpha.name,
                description: alpha.description,
                workProducts: {
                  create: [],
                },
                states: {
                  create: [],
                },
              }))
            },
            competencies: {
              create: competencies[areaOfConcern.id-1].map((competency) => ({
                id: competency.id,
                name: competency.name,
                description: competency.description,
                roles: {
                  create: [],
                },
              }))
            },
          },
        });
        return createdArea;
      })
    );

    res.json(result);
  } catch (error) {
    console.error(error)
  }

  // TODO P1 insert presets into database
}
