import axiosInstance from 'src/utils/axiosConfig';

type JiraTicketsResponse = {
  tickets: string[];
};

type ConfluencePagesResponse = {
  pages: string[];
};

class CipGenServices {
  async getJiraTickets() {
    try {
      const response = await axiosInstance.get<JiraTicketsResponse>('/data/jira/available');
      return response.data.tickets;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unknown error occurred while fetching Jira tickets.';

      console.error('Error fetching Jira tickets:', error);
      throw new Error(message);
    }
  }
  async getConfluencePages() {
    try {
      const response = await axiosInstance.get<ConfluencePagesResponse>(
        '/data/confluence/available'
      );
      return response.data.pages;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unknown error occurred while fetching Confluence pages.';

      console.error('Error fetching Confluence pages:', error);
      throw new Error(message);
    }
  }
}

export default new CipGenServices();
