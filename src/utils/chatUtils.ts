import { searchDocuments } from '../data';
import { Message, SearchResult, Platform } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Function to generate a response based on the user's question
export const generateResponse = async (question: string, platform: Platform = 'all'): Promise<{ message: Message, results: SearchResult[] }> => {
  // Check if the question is related to CDPs
  if (!isRelevantQuestion(question)) {
    return {
      message: {
        id: uuidv4(),
        content: "I'm a CDP support chatbot and can only answer questions related to Customer Data Platforms like Segment, mParticle, Lytics, and Zeotap. Please ask me how to perform specific tasks in these platforms.",
        role: 'assistant',
        timestamp: new Date()
      },
      results: []
    };
  }

  // Search for relevant documents
  const results = searchDocuments(question, platform);

  if (results.length === 0) {
    return {
      message: {
        id: uuidv4(),
        content: "I couldn't find specific information about that. Could you rephrase your question or be more specific about what you're trying to do with the CDP?",
        role: 'assistant',
        timestamp: new Date()
      },
      results: []
    };
  }

  // Generate response based on search results
  const topResult = results[0];
  let responseContent = topResult.content;

  // If it's a comparison question, handle differently
  if (isComparisonQuestion(question)) {
    responseContent = generateComparisonResponse(question, results);
  }

  // Add source attribution
  responseContent += `\n\nSource: [${topResult.title}](${topResult.url})`;

  return {
    message: {
      id: uuidv4(),
      content: responseContent,
      role: 'assistant',
      timestamp: new Date()
    },
    results
  };
};

// Check if the question is relevant to CDPs
const isRelevantQuestion = (question: string): boolean => {
  const cdpKeywords = [
    'segment', 'mparticle', 'lytics', 'zeotap', 'cdp', 'customer data platform',
    'source', 'destination', 'audience', 'integration', 'tracking', 'event',
    'user profile', 'data stream', 'campaign', 'identity'
  ];

  const lowercaseQuestion = question.toLowerCase();
  return cdpKeywords.some(keyword => lowercaseQuestion.includes(keyword)) || 
         lowercaseQuestion.includes('how') || 
         lowercaseQuestion.includes('what');
};

// Check if it's a comparison question
const isComparisonQuestion = (question: string): boolean => {
  const comparisonKeywords = [
    'compare', 'comparison', 'versus', 'vs', 'difference', 'different',
    'better', 'best', 'worse', 'worst'
  ];

  const lowercaseQuestion = question.toLowerCase();
  
  // Check if the question mentions multiple platforms
  const platforms = ['segment', 'mparticle', 'lytics', 'zeotap'];
  const mentionedPlatforms = platforms.filter(platform => 
    lowercaseQuestion.includes(platform)
  );

  return (comparisonKeywords.some(keyword => lowercaseQuestion.includes(keyword)) && 
          mentionedPlatforms.length > 1);
};

// Generate a comparison response
const generateComparisonResponse = (question: string, results: SearchResult[]): string => {
  // Group results by platform
  const platformResults: Record<string, SearchResult[]> = {};
  
  results.forEach(result => {
    if (!platformResults[result.platform]) {
      platformResults[result.platform] = [];
    }
    platformResults[result.platform].push(result);
  });

  // Generate comparison text
  let comparisonText = "Based on the documentation:\n\n";
  
  Object.entries(platformResults).forEach(([platform, platformDocs]) => {
    if (platformDocs.length > 0) {
      comparisonText += `**${platform.charAt(0).toUpperCase() + platform.slice(1)}**:\n`;
      comparisonText += platformDocs[0].content + "\n\n";
    }
  });
  
  comparisonText += "In comparison, the platforms differ in their user interface and specific steps, but the general process follows similar patterns across all CDPs.";
  
  return comparisonText;
};