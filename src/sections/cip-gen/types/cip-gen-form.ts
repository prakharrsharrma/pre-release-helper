export type TCipPhases = 'PREPARATION' | 'EXECUTION' | 'GOLIVE' | 'NOGO' | 'POSTROLLBACK';

export type CipTeamMember = {
  name: string;
  role?: string;
  email: string;
  contactNumbers?: string;
  location: TCipPhases;
};

export type CipGenFormValues = {
  additionalNotes: string;
  teamMembers: CipTeamMember[];
  plannedEndDate: string;
  plannedStartDate: string;
  environment: string;
  confluencePageIds: string[];
  jiraTicketIds: string[];
  changeRequestNumber: string;
};
