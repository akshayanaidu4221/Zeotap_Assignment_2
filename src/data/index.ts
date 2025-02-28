import segmentData from './segment.json';
import mparticleData from './mparticle.json';
import lyticsData from './lytics.json';
import zeotapData from './zeotap.json';
import lunr from 'lunr';

export interface DocumentEntry {
  title: string;
  content: string;
  url: string;
  platform: string;
}

// Combine all data
export const allDocuments: DocumentEntry[] = [
  ...segmentData,
  ...mparticleData,
  ...lyticsData,
  ...zeotapData
];

// Create search index
export const searchIndex = lunr(function() {
  this.field('title', { boost: 10 });
  this.field('content');
  this.field('platform', { boost: 5 });
  this.ref('id');

  allDocuments.forEach((doc, idx) => {
    this.add({
      id: idx.toString(),
      title: doc.title,
      content: doc.content,
      platform: doc.platform
    });
  });
});

// Function to search documents
export const searchDocuments = (query: string, platform?: string) => {
  try {
    let searchQuery = query;
    
    // Add platform to query if specified
    if (platform && platform !== 'all') {
      searchQuery = `${searchQuery} platform:${platform}`;
    }
    
    const results = searchIndex.search(searchQuery);
    
    return results.map(result => {
      const doc = allDocuments[parseInt(result.ref)];
      return {
        title: doc.title,
        content: doc.content,
        url: doc.url,
        platform: doc.platform,
        score: result.score
      };
    }).slice(0, 5); // Return top 5 results
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

// Mock data for development until we scrape the actual documentation
export const mockSegmentData: DocumentEntry[] = [
  {
    title: "Setting up a new source in Segment",
    content: "To set up a new source in Segment: 1. Log in to your Segment workspace. 2. Navigate to Sources > Add Source. 3. Select the type of source you want to add. 4. Follow the configuration steps for your specific source type. 5. Once configured, Segment will provide you with the necessary code snippets or API keys to start sending data.",
    url: "https://segment.com/docs/connections/sources/",
    platform: "segment"
  },
  {
    title: "Creating a destination in Segment",
    content: "To create a destination in Segment: 1. Log in to your Segment workspace. 2. Navigate to Destinations > Add Destination. 3. Search for and select the destination you want to add. 4. Connect the destination to a source. 5. Configure the destination-specific settings. 6. Enable the destination when you're ready to start sending data.",
    url: "https://segment.com/docs/connections/destinations/",
    platform: "segment"
  }
];

export const mockMParticleData: DocumentEntry[] = [
  {
    title: "Creating a user profile in mParticle",
    content: "To create a user profile in mParticle: 1. Implement the mParticle SDK in your application. 2. Use the identify method to associate a user with a unique ID. 3. Add user attributes using the setUserAttribute method. 4. Set user identities using the setUserIdentity method. 5. User profiles are automatically created and updated as users interact with your application.",
    url: "https://docs.mparticle.com/developers/sdk/web/users/",
    platform: "mparticle"
  },
  {
    title: "Setting up an input in mParticle",
    content: "To set up an input in mParticle: 1. Log in to your mParticle dashboard. 2. Navigate to Setup > Inputs. 3. Click 'Add Input' and select the input type. 4. Configure the input settings according to your data source. 5. Save the configuration and obtain the API key and secret. 6. Implement the input in your application using the provided credentials.",
    url: "https://docs.mparticle.com/guides/getting-started/",
    platform: "mparticle"
  }
];

export const mockLyticsData: DocumentEntry[] = [
  {
    title: "Building an audience segment in Lytics",
    content: "To build an audience segment in Lytics: 1. Navigate to the Audiences section in your Lytics account. 2. Click 'Create Audience'. 3. Define your audience criteria using the segment builder. 4. You can use behavioral data, user attributes, and content affinities. 5. Preview your audience to see estimated size. 6. Save and activate your audience for use in campaigns or exports.",
    url: "https://docs.lytics.com/product/audiences/",
    platform: "lytics"
  },
  {
    title: "Setting up a data stream in Lytics",
    content: "To set up a data stream in Lytics: 1. Go to the Data section in your Lytics account. 2. Select 'Add Stream' and choose your data source type. 3. Configure the connection settings for your data source. 4. Map the incoming data fields to Lytics' user profile fields. 5. Set up any necessary transformations. 6. Save and activate the stream to start collecting data.",
    url: "https://docs.lytics.com/product/data/streams/",
    platform: "lytics"
  }
];

export const mockZeotapData: DocumentEntry[] = [
  {
    title: "Integrating data with Zeotap",
    content: "To integrate your data with Zeotap: 1. Log in to your Zeotap CDP account. 2. Navigate to the Connections section. 3. Select 'Add New Connection' and choose your data source. 4. Configure the connection parameters according to your data source. 5. Set up the data mapping to match your schema. 6. Schedule the data import frequency. 7. Activate the connection to start importing data.",
    url: "https://docs.zeotap.com/home/en-us/connections/",
    platform: "zeotap"
  },
  {
    title: "Creating a segment in Zeotap",
    content: "To create a segment in Zeotap: 1. Go to the Audience section in your Zeotap CDP. 2. Click on 'Create Segment'. 3. Define your segment criteria using the segment builder interface. 4. You can use user attributes, behaviors, and events. 5. Preview your segment size and composition. 6. Save and publish your segment for activation across channels.",
    url: "https://docs.zeotap.com/home/en-us/audiences/",
    platform: "zeotap"
  }
];

// Use mock data for development
export default {
  segment: mockSegmentData,
  mparticle: mockMParticleData,
  lytics: mockLyticsData,
  zeotap: mockZeotapData,
  all: [...mockSegmentData, ...mockMParticleData, ...mockLyticsData, ...mockZeotapData]
};