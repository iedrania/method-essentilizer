import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const areasOfConcern = [
    { id: 1, nameId: 'customer', name: 'Customer' },
    { id: 2, nameId: 'solution', name: 'Solution' },
    { id: 3, nameId: 'work', name: 'Work' },
  ];
  
  const activitySpaces = [
    [
      { id: 1, nameId: 'explore', name: 'Explore Possibilities', description: '', entryCriteria: [], completionCriteria: ['Stakeholders::Recognized, Opportunity::Value Established'] },
      { id: 2, nameId: 'needs', name: 'Understand Stakeholder Needs', description: '', entryCriteria: ['Stakeholders::Recognized, Opportunity::Value Established'], completionCriteria: ['Stakeholders::In Agreement, Opportunity::Viable'] },
      { id: 3, nameId: 'ensure', name: 'Ensure Stakeholder Satisfaction', description: '', entryCriteria: ['Stakeholders::In Agreement, Opportunity::Value Established'], completionCriteria: ['Stakeholders::Satisfied for Deployment, Opportunity::Addressed'] },
      { id: 4, nameId: 'use', name: 'Use the System', description: '', entryCriteria: ['Stakeholders::Satisfied for Deployment, Opportunity::Addressed'], completionCriteria: ['Stakeholders::Satisfied in Use, Opportunity::Benefit Accrued'] },
    ], [
      { id: 5, nameId: 'requirements', name: 'Understand the Requirements', description: '', entryCriteria: [], completionCriteria: ['Requirements::Coherent'] },
      { id: 6, nameId: 'shape', name: 'Shape the System', description: '', entryCriteria: ['Requirements::Coherent'], completionCriteria: ['Requirements::Acceptable, Software System::Architecture Selected'] },
      { id: 7, nameId: 'implement', name: 'Implement the System', description: '', entryCriteria: ['Software System::Architecture Selected'], completionCriteria: ['Software System::Ready'] },
      { id: 8, nameId: 'test', name: 'Test the System', description: '', entryCriteria: ['Requirements::Acceptable, Software System::Architecture Selected'], completionCriteria: ['Requirements::Fulfilled, Software System::Ready'] },
      { id: 9, nameId: 'deploy', name: 'Deploy the System', description: '', entryCriteria: [' Software System::Ready'], completionCriteria: ['Software System::Operational'] },
      { id: 10, nameId: 'operate', name: 'Operate the System', description: '', entryCriteria: ['Software System::Ready'], completionCriteria: ['Software System::Retired'] },
    ], [
      { id: 11, nameId: 'prepare', name: 'Prepare to do the Work', description: '', entryCriteria: [], completionCriteria: ['Team::Seeded, Way of Working::Foundation Established, Work::Prepared'] },
      { id: 12, nameId: 'coordinate', name: 'Coordinate Activity', description: '', entryCriteria: ['Team::Seeded, Work::Prepared'], completionCriteria: ['Team::Formed, Work::Under Control'] },
      { id: 13, nameId: 'support', name: 'Support the Team', description: '', entryCriteria: ['Team::Formed, Way of Working::Foundation Established'], completionCriteria: ['Team::Collaborating, Way of Working::In Place'] },
      { id: 14, nameId: 'track', name: 'Track Progress', description: '', entryCriteria: ['Team::Collaborating, Way of Working::In Place, Work::Started'], completionCriteria: ['Team::Performing, Way of Working::Working Well, Work::Concluded'] },
      { id: 15, nameId: 'stop', name: 'Stop the Work', description: '', entryCriteria: ['Team::Performing, Way of Working::Working Well, Work::Concluded'], completionCriteria: ['Team::Adjourned, Way of Working::Retired, Work::Closed'] },
    ],
  ];

  const stakeholderChecklist = {
    Recognized: [
      "All the different groups of stakeholders that are, or will be, affected by the development and operation of the software system are identified.",
      "There is agreement on the stakeholder groups to be represented. At a minimum, the stakeholders groups that fund, use, support, and maintain the system have been considered.",
      "The responsibilities of the stakeholder representatives have been defined.",
    ],
    Represented: [
      "The stakeholder representatives have agreed to take on their responsibilities.",
      "The stakeholder representatives are authorized to carry out their responsibilities.",
      "The collaboration approach among the stakeholder representatives has been agreed.",
      "The stakeholder representatives support and respect the team's way of working.",
    ],
    Involved: [
      "The stakeholder representatives assist the team in accordance with their responsibilities.",
      "The stakeholder representatives provide feedback and take part in decision making in a timely manner.",
      "The stakeholder representatives promptly communicate changes that are relevant for their stakeholder groups.",
    ],
    "In Agreement": [
      "The stakeholder representatives have agreed upon their minimal expectations for the next deployment of the new system.",
      "The stakeholder representatives are happy with their involvement in the work.",
      "The stakeholder representatives agree that their input is valued by the team and treated with respect.",
      "The team members agree that their input is valued by the stakeholder representatives and treated with respect.",
      "The stakeholder representatives agree with how their different priorities and perspectives are being balanced to provide a clear direction for the team.",
    ],
    "Satisfied for Deployment": [
      "The stakeholder representatives provide feedback on the system from their stakeholder group perspective.",
      "The stakeholder representatives confirm that they agree that the system is ready for deployment.",
    ],
    "Satisfied in Use": [
      "Stakeholders are using the new system and providing feedback on their experiences.",
      "The stakeholders confirm that the new system meets their expectations.",
    ],
  };

  const stakeholdersStates = [
    {
      id: 1,
      name: 'Recognized',
      description: 'Stakeholders have been identified.',
      checklist: stakeholderChecklist.Recognized,
    },
    {
      id: 2,
      name: 'Represented',
      description: 'The mechanisms for involving the stakeholders are agreed and the stakeholder representatives have been appointed.',
      checklist: stakeholderChecklist.Represented,
    },
    {
      id: 3,
      name: 'Involved',
      description: 'The stakeholder representatives are actively involved in the work and fulfilling their responsibilities.',
      checklist: stakeholderChecklist.Involved,
    },
    {
      id: 4,
      name: 'In Agreement',
      description: 'The stakeholder representatives are in agreement.',
      checklist: stakeholderChecklist['In Agreement'],
    },
    {
      id: 5,
      name: 'Satisfied for Deployment',
      description: 'The minimal expectations of the stakeholder representatives have been achieved.',
      checklist: stakeholderChecklist['Satisfied for Deployment'],
    },
    {
      id: 6,
      name: 'Satisfied in Use',
      description: 'The system has met or exceeds the minimal stakeholder expectations.',
      checklist: stakeholderChecklist['Satisfied in Use'],
    },
  ];

  const opportunityChecklist = {
    Identified: [
      "An idea for a way of improving current ways of working, increasing market share, or applying a new or innovative software system has been identified.",
      "At least one of the stakeholders wishes to make an investment in better understanding the opportunity and the value associated with addressing it.",
      "The other stakeholders who share the opportunity have been identified.",
    ],
    "Solution Needed": [
      "The stakeholders in the opportunity and the proposed solution have been identified.",
      "The stakeholders' needs that generate the opportunity have been established.",
      "Any underlying problems and their root causes have been identified.",
      "It has been confirmed that a software-based solution is needed.",
      "At least one software-based solution has been proposed.",
    ],
    "Value Established": [
      "The value of addressing the opportunity has been quantified either in absolute terms or in returns or savings per time period (e.g., per annum).",
      "The impact of the solution on the stakeholders is understood.",
      "The value that the software system offers to the stakeholders that fund and use the software system is understood.",
      "The success criteria by which the deployment of the software system is to be judged are clear.",
      "The desired outcomes required of the solution are clear and quantified.",
    ],
    Viable: [
      "A solution has been outlined.",
      "The indications are that the solution can be developed and deployed within constraints.",
      "The risks associated with the solution are acceptable and manageable.",
      "The indicative (ball-park) costs of the solution are less than the anticipated value of the opportunity.",
      "The reasons for the development of a software-based solution are understood by all members of the team.",
      "It is clear that the pursuit of the opportunity is viable.",
    ],
    Addressed: [
      "A usable system that demonstrably addresses the opportunity is available.",
      "The stakeholders agree that the available solution is worth deploying.",
      "The stakeholders are satisfied that the solution produced addresses the opportunity.",
    ],
    "Benefit Accrued": [
      "The solution has started to accrue benefits for the stakeholders.",
      "The return-on-investment profile is at least as good as anticipated.",
    ],
  };

  const opportunityStates = [
    {
      id: 1,
      name: "Identified",
      description: "A commercial, social, or business opportunity has been identified that could be addressed by a software-based solution.",
      checklist: opportunityChecklist.Identified,
    },
    {
      id: 2,
      name: "Solution Needed",
      description: "The need for a software-based solution has been confirmed.",
      checklist: opportunityChecklist['Solution Needed'],
    },
    {
      id: 3,
      name: "Value Established",
      description: "The value of a successful solution has been established.",
      checklist: opportunityChecklist['Value Established'],
    },
    {
      id: 4,
      name: "Viable",
      description: "It is agreed that a solution can be produced quickly and cheaply enough to successfully address the opportunity.",
      checklist: opportunityChecklist.Viable,
    },
    {
      id: 5,
      nameId: "Addressed1",
      name: "Addressed",
      description: "A solution has been produced that demonstrably addresses the opportunity.",
      checklist: opportunityChecklist.Addressed,
    },
    {
      id: 6,
      name: "Benefit Accrued",
      description: "The operational use or sale of the solution is creating tangible benefits.",
      checklist: opportunityChecklist['Benefit Accrued'],
    },
  ];

  const requirementsChecklist = {
    Conceived: [
      "The initial set of stakeholders agrees that a system is to be produced.",
      "The stakeholders that will use the new system are identified.",
      "The stakeholders that will fund the initial work on the new system are identified.",
      "There is a clear opportunity for the new system to address.",
    ],
    Bounded: [
      "The stakeholders involved in developing the new system are identified.",
      "The stakeholders agree on the purpose of the new system.",
      "It is clear what success is for the new system.",
      "The stakeholders have a shared understanding of the extent of the proposed solution.",
      "The way the requirements will be described is agreed upon.",
      "The mechanisms for managing the requirements are in place.",
      "The prioritization scheme is clear.",
      "Constraints are identified and considered.",
      "Assumptions are clearly stated.",
    ],
    Coherent: [
      "The requirements are captured and shared with the team and the stakeholders.",
      "The origin of the requirements is clear.",
      "The rationale behind the requirements is clear.",
      "Conflicting requirements are identified and attended to.",
      "The requirements communicate the essential characteristics of the system to be delivered.",
      "The most important usage scenarios for the system can be explained.",
      "The priority of the requirements is clear.",
      "The impact of implementing the requirements is understood.",
      "The team understands what has to be delivered and agrees to deliver it.",
    ],
    Acceptable: [
      "The stakeholders accept that the requirements describe an acceptable solution.",
      "The rate of change to the agreed requirements is relatively low and under control.",
      "The value provided by implementing the requirements is clear.",
      "The parts of the opportunity satisfied by the requirements are clear.",
      "The requirements are testable.",
    ],
    Addressed: [
      "Enough of the requirements are addressed for the resulting system to be acceptable to the stakeholders.",
      "The stakeholders accept the requirements as accurately reflecting what the system does and does not do.",
      "The set of requirement items implemented provide clear value to the stakeholders.",
      "The system implementing the requirements is accepted by the stakeholders as worth making operational.",
    ],
    Fulfilled: [
      "The stakeholders accept the requirements as accurately capturing what they require to fully satisfy the need for a new system.",
      "There are no outstanding requirement items preventing the system from being accepted as fully satisfying the requirements.",
      "The system is accepted by the stakeholders as fully satisfying the requirements.",
    ],
  };
  
  const requirementsStates = [
    {
      id: 1,
      name: "Conceived",
      description: "The need for a new system has been agreed.",
      checklist: requirementsChecklist.Conceived,
    },
    {
      id: 2,
      name: "Bounded",
      description: "The purpose and extent of the new system are clear.",
      checklist: requirementsChecklist.Bounded,
    },
    {
      id: 3,
      name: "Coherent",
      description: "The requirements provide a consistent description of the essential characteristics of the new system.",
      checklist: requirementsChecklist.Coherent,
    },
    {
      id: 4,
      name: "Acceptable",
      description: "The requirements describe a system that is acceptable to the stakeholders.",
      checklist: requirementsChecklist.Acceptable,
    },
    {
      id: 5,
      nameId: "Addressed2",
      name: "Addressed",
      description: "Enough of the requirements have been addressed to satisfy the need for a new system in a way that is acceptable to the stakeholders.",
      checklist: requirementsChecklist.Addressed,
    },
    {
      id: 6,
      name: "Fulfilled",
      description: "The requirements that have been addressed fully satisfy the need for a new system.",
      checklist: requirementsChecklist.Fulfilled
    },
  ];  

  const systemChecklist = {
    "Architecture Selected": [
      "The criteria to be used when selecting the architecture have been agreed on.",
      "Hardware platforms have been identified.",
      "Programming languages and technologies to be used have been selected.",
      "System boundary is known.",
      "Significant decisions about the organization of the system have been made.",
      "Buy, build, and reuse decisions have been made.",
      "Key technical risks agreed to.",
    ],
    Demonstrable: [
      "Key architectural characteristics have been demonstrated.",
      "The system can be exercised and its performance can be measured.",
      "Critical hardware configurations have been demonstrated.",
      "Critical interfaces have been demonstrated.",
      "The integration with other existing systems has been demonstrated.",
      "The relevant stakeholders agree that the demonstrated architecture is appropriate.",
    ],
    Usable: [
      "The system can be operated by stakeholders who use it.",
      "The functionality provided by the system has been tested.",
      "The performance of the system is acceptable to the stakeholders.",
      "Defect levels are acceptable to the stakeholders.",
      "The system is fully documented.",
      "Release content is known.",
      "The added value provided by the system is clear.",
    ],
    Ready: [
      "Installation and other user documentation are available.",
      "The stakeholder representatives accept the system as fit-for-purpose.",
      "The stakeholder representatives want to make the system operational.",
      "Operational support is in place.",
    ],
    Operational: [
      "The system has been made available to the stakeholders intended to use it.",
      "At least one example of the system is fully operational.",
      "The system is fully supported to the agreed service levels.",
    ],
    Retired: [
      "The system has been replaced or discontinued.",
      "The system is no longer supported.",
      "There are no “official” stakeholders who still use the system.",
      "Updates to the system will no longer be produced.",
    ],
  };

  const systemStates = [
    {
      id: 1,
      name: "Architecture Selected",
      description: "An architecture has been selected that addresses the key technical risks and any applicable organizational constraints.",
      checklist: systemChecklist['Architecture Selected'],
    },
    {
      id: 2,
      name: "Demonstrable",
      description: "An executable version of the system is available that demonstrates the architecture is fit for purpose and supports testing.",
      checklist: systemChecklist.Demonstrable,
    },
    {
      id: 3,
      name: "Usable",
      description: "The system is usable and demonstrates all of the quality characteristics of an operational system.",
      checklist: systemChecklist.Usable,
    },
    {
      id: 4,
      name: "Ready",
      description: "The system (as a whole) has been accepted for deployment in a live environment.",
      checklist: systemChecklist.Ready,
    },
    {
      id: 5,
      name: "Operational",
      description: "The system is in use in an operational environment.",
      checklist: systemChecklist.Operational,
    },
    {
      id: 6,
      nameId: "Retired1",
      name: "Retired",
      description: "The system is no longer supported.",
      checklist: systemChecklist.Retired,
    },
  ];  
  
  const teamChecklist = {
    "Seeded": [
      "The team mission has been defined in terms of the opportunities and outcomes.",
      "Constraints on the team's operation are known.",
      "Mechanisms to grow the team are in place.",
      "The composition of the team is defined.",
      "Any constraints on where and how the work is carried out are defined.",
      "The team's responsibilities are outlined.",
      "The level of team commitment is clear.",
      "Required competencies are identified.",
      "The team size is determined.",
      "Governance rules are defined.",
      "Leadership model is determined.",
    ],
    "Formed": [
      "Individual responsibilities are understood.",
      "Enough team members have been recruited to enable the work to progress.",
      "Every team member understands how the team is organized and what their individual role is.",
      "All team members understand how to perform their work.",
      "The team members have met (perhaps virtually) and are beginning to get to know each other.",
      "The team members understand their responsibilities and how they align with their competencies.",
      "Team members are accepting work.",
      "Any external collaborators (organizations, teams and individuals) are identified.",
      "Team communication mechanisms have been defined.",
      "Each team member commits to working on the team as defined.",
    ],
    "Collaborating": [
      "The team is working as one cohesive unit.",
      "Communication within the team is open and honest.",
      "The team is focused on achieving the team mission.",
      "The team members know and trust each other.",
    ],
    "Performing": [
      "The team consistently meets its commitments.",
      "The team continuously adapts to the changing context.",
      "The team identifies and addresses problems without outside help.",
      "Effective progress is being achieved with minimal avoidable backtracking and reworking.",
      "Wasted work and the potential for wasted work are continuously identified and eliminated.",
    ],
    "Adjourned": [
      "The team responsibilities have been handed over or fulfilled.",
      "The team members are available for assignment to other teams.",
      "No further effort is being put in by the team to complete the mission.",
    ],
  };

  const teamStates = [
    {
      id: 1,
      name: "Seeded",
      description: "The team's mission is clear and the know-how needed to grow the team is in place.",
      checklist: teamChecklist.Seeded,
    },
    {
      id: 2,
      name: "Formed",
      description: "The team has been populated with enough committed people to start pursuing the team mission.",
      checklist: teamChecklist.Formed,
    },
    {
      id: 3,
      name: "Collaborating",
      description: "The team members are working together as one unit.",
      checklist: teamChecklist.Collaborating,
    },
    {
      id: 4,
      name: "Performing",
      description: "The team is working effectively and efficiently.",
      checklist: teamChecklist.Performing,
    },
    {
      id: 5,
      name: "Adjourned",
      description: "The team is no longer accountable for carrying out its mission.",
      checklist: teamChecklist.Adjourned,
    },
  ];  
  
  const workChecklist = {
    "Initiated": [
      "The result required of the work being initiated is clear.",
      "Any constraints on the work's performance are clearly identified.",
      "The stakeholders that will fund the work are known.",
      "The initiator of the work is clearly identified.",
      "The stakeholders that will accept the results are known.",
      "The source of funding is clear.",
      "The priority of the work is clear.",
    ],
    "Prepared": [
      "Commitment is made.",
      "Cost and effort of the work are estimated.",
      "Resource availability is understood.",
      "Governance policies and procedures are clear.",
      "Risk exposure is understood.",
      "Acceptance criteria are defined and agreed with client.",
      "The work is broken down sufficiently for productive work to start.",
      "Tasks have been identified and prioritized by the team and stakeholders.",
      "A credible plan is in place.",
      "Funding to start the work is in place.",
      "The team or at least some of the team members are ready to start the work.",
      "Integration and delivery points are defined.",
    ],
    "Started": [
      "Development work has been started.",
      "Work progress is monitored.",
      "The work is being broken down into actionable work items with clear definitions of done.",
      "Team members are accepting and progressing tasks.",
    ],
    "Under Control": [
      "Tasks are being completed.",
      "Unplanned work is under control.",
      "Risks are under control as the impact if they occur and the likelihood of them occurring have been reduced to acceptable levels.",
      "Estimates are revised to reflect the team's performance.",
      "Measures are available to show progress and velocity.",
      "Re-work is under control.",
      "Tasks are consistently completed on time and within their estimates.",
    ],
    "Concluded": [
      "All outstanding tasks are administrative housekeeping or related to preparing the next piece of work.",
      "Work results have been achieved.",
      "The stakeholder(s) has accepted the resulting software system.",
    ],
    "Closed": [
      "Lessons learned have been itemized, recorded and discussed.",
      "Metrics have been made available.",
      "Everything has been archived.",
      "The budget has been reconciled and closed.",
      "The team has been released.",
      "There are no outstanding, uncompleted tasks.",
    ],
  };

  const workStates = [
    {
      id: 1,
      name: "Initiated",
      description: "The work has been requested.",
      checklist: workChecklist.Initiated,
    },
    {
      id: 2,
      name: "Prepared",
      description: "All pre-conditions for starting the work have been met.",
      checklist: workChecklist.Prepared,
    },
    {
      id: 3,
      name: "Started",
      description: "The work is proceeding.",
      checklist: workChecklist.Started,
    },
    {
      id: 4,
      name: "Under Control",
      description: "The work is going well, risks are under control, and productivity levels are sufficient to achieve a satisfactory result.",
      checklist: workChecklist['Under Control'],
    },
    {
      id: 5,
      name: "Concluded",
      description: "The work to produce the results has been concluded.",
      checklist: workChecklist.Concluded,
    },
    {
      id: 6,
      name: "Closed",
      description: "All remaining housekeeping tasks have been completed and the work has been officially closed.",
      checklist: workChecklist.Closed,
    },
  ];  

  const wayChecklist = {
    "Principles Established": [
      "Principles and constraints are committed to by the team.",
      "Principles and constraints are agreed to by the stakeholders.",
      "The tool needs of the work and its stakeholders are agreed.",
      "A recommendation for the approach to be taken is available.",
      "The context within which the team will operate is understood.",
      "The constraints that apply to the selection, acquisition, and use of practices and tools are known.",
    ],
    "Foundation Established": [
      "The key practices and tools that form the foundation of the way-of-working are selected.",
      "Enough practices for work to start are agreed to by the team.",
      "All non-negotiable practices and tools have been identified.",
      "The gaps that exist between the practices and tools that are needed and the practices and tools that are available have been analyzed and understood.",
      "The capability gaps that exist between what is needed to execute the desired way of working and the capability levels of the team have been analyzed and understood.",
      "The selected practices and tools have been integrated to form a usable way-of-working.",
    ],
    "In Use": [
      "The practices and tools are being used to do real work.",
      "The use of the practices and tools selected is regularly inspected.",
      "The practices and tools are being adapted to the team's context.",
      "The use of the practices and tools is supported by the team.",
      "Procedures are in place to handle feedback on the team's way of working.",
      "The practices and tools support team communication and collaboration.",
    ],
    "In Place": [
      "The practices and tools are being used by the whole team to perform their work.",
      "All team members have access to the practices and tools required to do their work.",
      "The whole team is involved in the inspection and adaptation of the way-of-working.",
    ],
    "Working well": [
      "Team members are making progress as planned by using and adapting the way-of-working to suit their current context.",
      "The team naturally applies the practices without thinking about them.",
      "The tools naturally support the way that the team works.",
      "The team continually tunes their use of the practices and tools.",
    ],
    "Retired": ["The team's way of working is no longer being used.", "Lessons learned are shared for future use."],
  };
  
  const wayStates = [
    {
      id: 1,
      name: "Principles Established",
      description: "The principles, and constraints, that shape the way-of-working are established.",
      checklist: wayChecklist['Principles Established'],
    },
    {
      id: 2,
      name: "Foundation Established",
      description: "The key practices, and tools, that form the foundation of the way of working are selected and ready for use.",
      checklist: wayChecklist['Foundation Established'],
    },
    {
      id: 3,
      name: "In Use",
      description: "Some members of the team are using, and adapting, the way-of-working.",
      checklist: wayChecklist['In Use'],
    },
    {
      id: 4,
      name: "In Place",
      description: "All team members are using the way of working to accomplish their work.",
      checklist: wayChecklist['In Place'],
    },
    {
      id: 5,
      name: "Working well",
      description: "The team's way of working is working well for the team.",
      checklist: wayChecklist['Working well'],
    },
    {
      id: 6,
      nameId: "Retired2",
      name: "Retired",
      description: "The way of working is no longer in use by the team.",
      checklist: wayChecklist.Retired,
    },
  ];
  
  const alphas = [
    [
      { id: 1, nameId: 'stakeholders', name: 'Stakeholders', description: '', states: stakeholdersStates },
      { id: 2, nameId: 'opportunity', name: 'Opportunity', description: '', states: opportunityStates },
    ], [
      { id: 3, nameId: 'requirements', name: 'Requirements', description: '', states: requirementsStates },
      { id: 4, nameId: 'software', name: 'Software System', description: '', states: systemStates },
    ], [
      { id: 5, nameId: 'team', name: 'Team', description: '', states: teamStates },
      { id: 6, nameId: 'work', name: 'Work', description: '', states: workStates },
      { id: 7, nameId: 'way', name: 'Way-of-Working', description: '', states: wayStates },
    ],
  ];

  const levels = [
    {
      name: "Assists",
      description: "Demonstrates a basic understanding of the concepts and can follow instructions.",
    },
    {
      name: "Applies",
      description: "Able to apply the concepts in simple contexts by routinely applying the experience gained so far.",
    },
    {
      name: "Masters",
      description: "Able to apply the concepts in most contexts and has the experience to work without supervision.",
    },
    {
      name: "Adapts",
      description: "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts.",
    },
    {
      name: "Innovates",
      description: "A recognized expert, able to extend the concepts to new contexts and inspire others.",
    }
  ];
  
  const competencies = [
    [
      { id: 1, nameId: 'stakeholder', name: 'Stakeholder Representation', description: '' },
    ], [
      { id: 2, nameId: 'analysis', name: 'Analysis', description: '' },
      { id: 3, nameId: 'development', name: 'Development', description: '' },
      { id: 4, nameId: 'testing', name: 'Testing', description: '' },
    ], [
      { id: 5, nameId: 'leadership', name: 'Leadership', description: '' },
      { id: 6, nameId: 'management', name: 'Management', description: '' },
    ]
  ];

  try {
    const result = await Promise.all(
      areasOfConcern.map(async (areaOfConcern) => {
        const createdArea = await prisma.areaOfConcern.create({
          data: {
            id: areaOfConcern.name,
            name: areaOfConcern.name,
            activitySpaces: {
              create: activitySpaces[areaOfConcern.id-1].map((activitySpace) => ({
                id: activitySpace.name,
                name: activitySpace.name,
                description: activitySpace.description,
                activities: {
                  create: [],
                },
              }))
            },
            alphas: {
              create: alphas[areaOfConcern.id-1].map((alpha) => ({
                id: alpha.name,
                name: alpha.name,
                description: alpha.description,
                workProducts: {
                  create: [],
                },
                states: {
                  create: alpha.states.map((state) => ({
                    id: state.name === "Addressed" || state.name === "Retired" ? state.nameId : state.name,
                    name: state.name,
                    description: state.description,
                    checklist: state.checklist,
                  }))
                },
                subAlphaIds: [],
              }))
            },
            competencies: {
              create: competencies[areaOfConcern.id-1].map((competency) => ({
                id: competency.name,
                name: competency.name,
                description: competency.description,
                levels: levels,
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
    console.log('Database created successfully.');
  } catch (error) {
    console.log(error)
  }

  // TODO P2 insert presets into database
}
