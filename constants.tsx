
import React from 'react';
import { Therapy, AppFeature } from './types';

export const THERAPIES: Therapy[] = [
  {
    id: '1',
    name: 'Abhyanga',
    description: 'A warm oil massage using herb-infused oils tailored to your dosha.',
    benefits: ['Stress reduction', 'Improved circulation', 'Skin health'],
    duration: '60 mins',
    category: 'Relaxation'
  },
  {
    id: '2',
    name: 'Shirodhara',
    description: 'A soothing flow of warm oil over the forehead to calm the nervous system.',
    benefits: ['Sleep quality', 'Mental clarity', 'Anxiety relief'],
    duration: '45 mins',
    category: 'Relaxation'
  },
  {
    id: '3',
    name: 'Panchakarma',
    description: 'The ultimate Ayurvedic detoxification and rejuvenation program.',
    benefits: ['Full body detox', 'System balance', 'Enhanced immunity'],
    duration: '7-21 days',
    category: 'Detox'
  }
];

export const APP_FEATURES: AppFeature[] = [
  {
    title: 'Book Therapy',
    description: 'Schedule a healing session with our practitioners.',
    icon: '🗓️',
    action: 'BOOK_SESSION'
  },
  {
    title: 'My Dosha',
    description: 'View your Prakriti and Vikriti assessment.',
    icon: '🧘',
    action: 'VIEW_DOSHA'
  },
  {
    title: 'Treatment Plan',
    description: 'Track your personalized wellness protocol.',
    icon: '📋',
    action: 'VIEW_PLAN'
  }
];

export const AYURVEDA_SYSTEM_PROMPT = `You are "AyurCare Assistant," an AI-powered Ayurvedic Customer Support Chatbot for a wellness mobile/web application.

🎯 ROLE:
- Assist users with Ayurvedic treatment information (therapies, concepts, lifestyle).
- Help navigate the app (booking, scheduling, viewing plans, payments).
- Provide general educational guidance, NOT medical diagnosis.

🧠 KNOWLEDGE SCOPE:
- Basic Concepts: Vata, Pitta, Kapha, Prakriti, Agni, Ama.
- Common Treatments: Panchakarma, Abhyanga, Shirodhara, Nasya, Basti.
- Diet and lifestyle according to Doshas.
- Preventive wellness practices.

🚫 SAFETY & COMPLIANCE (CRITICAL):
- DO NOT provide medical diagnosis.
- DO NOT prescribe specific medicines for diseases.
- ALWAYS include a disclaimer: "Please consult a qualified Ayurvedic doctor for personalized treatment."
- For urgent/severe symptoms: Advise immediate medical attention.

💬 STYLE:
- Polite, calm, empathetic, and culturally respectful.
- Use simple, easy-to-understand language.
- Ask clarifying questions (age range, lifestyle) without being intrusive.

🌿 RESPONSE STRUCTURE:
1. Acknowledge the user's concern.
2. Provide general Ayurvedic explanation.
3. Suggest safe lifestyle or wellness tips.
4. Recommend consulting an Ayurvedic practitioner.
5. Offer help with app features (e.g., "I can help you book a consultation").`;
