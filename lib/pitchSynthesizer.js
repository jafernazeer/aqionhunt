import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Synthesizes business intelligence, pain points, ROI workflow automations, and Voice AI configuration.
 */
export async function generateClientPitchData(scrapedData, websiteUrl) {
  const companyName = scrapedData.companyName || 'Target Business';
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
You are an expert Enterprise AI Solutions Architect at AqionLabs (an agency building bespoke Voice AI Agents and Agentic Workflow Automations).
Analyze this scraped company website data:
URL: ${websiteUrl}
Company Name: ${companyName}
Title: ${scrapedData.title}
Description: ${scrapedData.description}
Headings: ${scrapedData.headings?.join(' | ')}
Key Text: ${scrapedData.paragraphs?.slice(0, 8).join(' ')}

Generate a comprehensive JSON pitch dataset tailored specifically to ${companyName}.
Return ONLY valid JSON matching this exact structure with no markdown or formatting codeblocks:
{
  "companyName": "${companyName}",
  "tagline": "A punchy, tailored headline addressing their core market",
  "industry": "Identified industry",
  "summary": "2-3 concise sentences detailing what ${companyName} does based on their site",
  "voiceAgent": {
    "agentName": "AqionVox for ${companyName}",
    "agentRole": "Tailored Voice Assistant & Lead Qualification Agent",
    "greeting": "Hi there! Thanks for reaching out to ${companyName}. I'm your AI assistant powered by AqionVox. How can I help you today?",
    "knowledgeHighlights": [
      "Detail 1 about their services/offerings",
      "Detail 2 about their client support/onboarding",
      "Detail 3 about their expertise & availability"
    ],
    "sampleQuestions": [
      "What services do you offer?",
      "How do I book a consultation or get a quote?",
      "Can you take my contact information for a specialist follow-up?"
    ],
    "systemPrompt": "You are AqionVox, the official real-time Voice AI agent representing ${companyName}. Assist callers politely, explain company capabilities concisely, and capture their name, company, email, phone, and requirements."
  },
  "identifiedPainPoints": [
    {
      "title": "Pain point 1 in their operations/sales",
      "problem": "Clear explanation of how manual processes slow them down",
      "solution": "How AqionLabs Voice AI & Automations fix it instantly",
      "metric": "e.g. 70% Faster Inbound Response"
    },
    {
      "title": "Pain point 2 (e.g. Inbound Lead Leakage or Support Overload)",
      "problem": "Explanation of missed opportunities after-hours or slow triage",
      "solution": "24/7 Agentic automated qualification & CRM sync",
      "metric": "e.g. 24/7 Live Coverage"
    },
    {
      "title": "Pain point 3 (e.g. Manual Data Entry & Scheduling Overhead)",
      "problem": "Reps wasting time re-keying notes and coordinating calendars",
      "solution": "Autonomous workflow trigger: calendar booking & webhook dispatch",
      "metric": "e.g. 15+ Hours Saved Weekly / Rep"
    }
  ],
  "servicesIdentified": [
    "Service 1 extracted or inferred",
    "Service 2 extracted or inferred",
    "Service 3 extracted or inferred",
    "Service 4 extracted or inferred"
  ],
  "automationRoadmap": [
    {
      "phase": "01",
      "title": "AqionVox Voice AI Deployment",
      "desc": "Custom-trained voice agent deployed on ${companyName}'s main phone line & web widget."
    },
    {
      "phase": "02",
      "title": "Agentic Lead Qualification & CRM Sync",
      "desc": "Autonomous transcription analysis that pushes structured leads directly into your database."
    },
    {
      "phase": "03",
      "title": "End-to-End Workflow Automations",
      "desc": "Trigger automated email confirmations, dispatch notifications, and calendar links."
    }
  ]
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err) {
      console.warn('Gemini generation failed, falling back to smart heuristic synthesis:', err.message);
    }
  }

  // Fallback heuristic intelligence engine
  return generateHeuristicPitchData(scrapedData, websiteUrl);
}

export function generateHeuristicPitchData(scrapedData, websiteUrl) {
  const companyName = scrapedData.companyName || 'Target Business';
  const services = scrapedData.services?.length >= 3 
    ? scrapedData.services.slice(0, 4) 
    : ['Client Advisory & Strategy', 'Enterprise Solutions', 'Operations Management', 'Custom Implementation'];

  return {
    companyName,
    tagline: scrapedData.tagline || `Intelligent Customer Engagement & Operations for ${companyName}`,
    industry: 'Modern Business Services',
    summary: scrapedData.description || `${companyName} delivers high-caliber solutions, specialized industry services, and streamlined client outcomes.`,
    voiceAgent: {
      agentName: `AqionVox for ${companyName}`,
      agentRole: 'Voice AI Client Concierge & Lead Qualifier',
      greeting: `Hello! Thank you for connecting with ${companyName}. I am your dedicated AI Voice Agent powered by AqionVox. How can I assist your business today?`,
      knowledgeHighlights: [
        `Trained on ${companyName}'s real-time site architecture and service portfolio`,
        `Autonomous qualification of inbound buyer intent and project requirements`,
        `Instant capture of client contact records with immediate CRM/Email dispatch`
      ],
      sampleQuestions: [
        `Can you tell me more about ${services[0]}?`,
        `How does ${companyName} handle new client engagements?`,
        `I would like to schedule a consultation with your team.`
      ],
      systemPrompt: `You are AqionVox, the official intelligent voice agent representing ${companyName}. You possess complete knowledge of ${companyName}'s offerings (${services.join(', ')}). Your goal is to guide visitors, answer their queries with precision, and capture their name, company, email, and requirements.`
    },
    identifiedPainPoints: [
      {
        title: "Inbound Lead Leakage & After-Hours Dropoff",
        problem: `Prospective clients visiting ${companyName} outside business hours abandon inquiries due to static contact forms.`,
        solution: "AqionVox Voice AI answers in under 500ms 24/7, conducting natural conversational qualification on the spot.",
        metric: "100% Inbound Lead Coverage"
      },
      {
        title: "High Support & Triage Latency",
        problem: `Staff spend hours answering repetitive service questions instead of focusing on high-value client delivery.`,
        solution: "Autonomous voice handling of FAQs, service explanations, and prerequisite routing directly to specialists.",
        metric: "75% Reduction in Triage Time"
      },
      {
        title: "Disconnected CRM & Follow-Up Workflows",
        problem: `Valuable call context gets lost between phone calls and manual CRM note-taking.`,
        solution: "Instant structured data extraction (JSON payloads) pushed immediately to your team's CRM, Slack, and email.",
        metric: "< 3 Sec Instant Lead Sync"
      }
    ],
    servicesIdentified: services,
    automationRoadmap: [
      {
        phase: "01",
        title: "Bespoke Voice AI Training",
        desc: `Ingest ${companyName}'s knowledge base, FAQs, and voice tone guidelines into AqionVox.`
      },
      {
        phase: "02",
        title: "Real-Time Conversational Testing",
        desc: "Deploy interactive web and telephony endpoints with sub-500ms conversational latency."
      },
      {
        phase: "03",
        title: "Autonomous Workflow Orchestration",
        desc: "Automate calendar scheduling, CRM record creation, and team notification pipelines."
      }
    ]
  };
}
