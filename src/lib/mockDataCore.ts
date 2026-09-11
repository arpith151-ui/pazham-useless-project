import { CaseReport } from '../types';

export function hashString(str: string): number {
  let hash = 0;
  const s = str || "incident";
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export const DEPARTMENTS = [
  "Department of Terminal Brainrot & Cringe 💀🔥",
  "Bureau of Down Bad & Dry Texting Forensics 📉",
  "Ministry of Delulu Final Boss Activities 💅✨",
  "Federal Task Force for Overthinking One Letter Texts 🚨",
  "National Rizz & Vibe Check Agency 🕶️",
  "Directorate of Unhinged Screen-Time & Rot 📱🪦"
];

export const RIVAL_DEPARTMENTS = [
  "Supreme Council of Pure Delusion & Copium 💅✨",
  "High Court of 'It's Giving Obsessed' 🤷‍♂️",
  "Tribunal of Relentless Gaslighting & Slay 💖",
  "Emergency Commission for Saving Face Fr Fr 🧊",
  "Department of Manufactured Nonchalance Core 🕶️"
];

export const OFFICERS = [
  "Agent Kai 'No Cap' Cenat, Badge #404",
  "Officer Livvy 'Bombastic Side Eye' 💅",
  "Special Detective Simp Patrol 9000 🚨",
  "Chief Analyst of Screaming Crying Throwing Up 😭",
  "Inspector Down Astronomical On God 💀"
];

export const RECENT_CASE_HEADLINES = [
  { id: "PZ-88219", text: "Bro typed a whole 4-paragraph novel at 2 AM and received 'k.' on god cooked forever 💀🔥" },
  { id: "PZ-77340", text: "Bestie stalked crush's Snap score 48 times while they were watching Skibidi reels no cap 🚩" },
  { id: "PZ-99124", text: "Coworker hit 'em with 'No worries!!' — the audacity is actually criminal fr fr 📉" },
  { id: "PZ-44109", text: "Waiter said 'enjoy the food' citizen barked 'YOU TOO!' — terminal ick achieved 😭" },
  { id: "PZ-31952", text: "Sent a banger meme into the group chat and got hit with crickets; ratio'd by silence 🪦" },
  { id: "PZ-66042", text: "Manager dropped 'quick sync tomorrow 9am' with no context; bro is fighting for their life 🚨" },
  { id: "PZ-55891", text: "Citizen waved back with maximum rizz; person was waving at someone behind them 🤡💀" }
];

export const EXAMPLE_PROMPTS = [
  "She hit me with 'k' after I typed an entire Shakespearean essay explaining why we should get tacos.",
  "Left on read for 47 minutes while their WhatsApp actively flipped between 'Online' and 'Last seen 2m ago'.",
  "My manager ended a Slack message with 'Thanks.' — period included. Is it giving fired or just hated fr fr?",
  "Crush viewed my Instagram story in 12 seconds flat but hasn't opened my DM sent 19 hours ago. Delulu final boss?",
  "Waiter said 'Enjoy your meal!' and I proudly yelled 'YOU TOO!' before speed-eating my fries in pure shame.",
  "Dropped an absolute fire meme in the group chat and literally everyone stopped typing immediately on god."
];

export function generateMockInvestigation(incidentText: string, imageAttached = false): CaseReport {
  const text = incidentText || (imageAttached ? "Attached screenshot forensics" : "Unspecified brainrot tragedy");
  const h = hashString(text);
  const caseNumber = 10000 + (h % 89999);
  const caseId = `PZ-${caseNumber}`;
  const dept = DEPARTMENTS[h % DEPARTMENTS.length];
  const officer = OFFICERS[h % OFFICERS.length];

  const socialThreat = 75 + (h % 24); // 75 - 99%
  const overthinking = 88 + ((h >> 2) % 12); // 88 - 100%
  const emotionalDamage = 80 + ((h >> 4) % 19); // 80 - 99%
  const confidence = 94 + ((h >> 3) % 6);

  const lower = text.toLowerCase();

  let verdict = "CERTIFIED GYATT-TIER COOKED ON GOD 💀🔥";
  let explanations = [
    { label: "Target saw the notification, said 'the audacity', and flipped phone face down fr fr", probability: 48 },
    { label: "Bro was busy scrolling brainrot TikToks while your message decayed in the trenches", probability: 28 },
    { label: "High-level psychological warfare to destroy your rizz once and for all", probability: 14 },
    { label: "They drafted a cute 3-sentence reply, got distracted by subway surfers, forgot forever", probability: 7 },
    { label: "Not me overthinking but they've lowkey harbored deep beef since 2023 no cap", probability: 3 }
  ];

  let evidence = [
    "EXHIBIT A: Bestie you sent a whole essay with MLA formatting while they replied with one singular lowercase letter. The disparity is crazy 😭",
    "EXHIBIT B: Digital receipts confirm target was actively posting on their main story while leaving you in the delivered graveyard on god 💀",
    "EXHIBIT C: Zero emojis detected. No lol, no haha, no skull emoji. Just pure unseasoned dry texting core 📉",
    "EXHIBIT D: Heart rate telemetry confirms you stared at the typing bubble until your soul evaporated fr fr 🪦"
  ];

  let recommendedAction = "Put the phone in the freezer right now. Go touch literal organic grass. If you double-text, you are officially banned from society on god.";

  if (imageAttached) {
    verdict = "SCREENSHOT FORENSICS: DOWN ASTRONOMICAL 📸💀";
    explanations = [
      { label: "Target opened the chat bubble, took a deep breath, and hit 'mark as unread' instantly", probability: 52 },
      { label: "The text bubble length ratio in this screenshot is an absolute L take on your behalf", probability: 26 },
      { label: "Left on delivered while they are actively watching reels at 1% battery", probability: 15 },
      { label: "They thought of a response in their head and genuinely think they sent it (pure cope)", probability: 7 }
    ];
    evidence = [
      "EXHIBIT A: Look at the visual contrast bestie — your blue bubble occupies 70% of the screen while their grey bubble is 3 pixels tall 💀",
      "EXHIBIT B: Timestamp gap reveals 4 solid hours of silence following your message. It's giving ghosted fr fr 👻",
      "EXHIBIT C: Battery indicator in top right was at 92%, so 'my phone died' is officially debunked as delulu behavior 🚨"
    ];
    recommendedAction = "Archive the chat, delete their contact, listen to Frank Ocean once, and never speak of this screenshot again.";
  } else if (lower.includes("waiter") || lower.includes("you too") || lower.includes("meal")) {
    verdict = "TERMINAL ICK: TIME TO RELOCATE TO ICELAND 😭🤡";
    explanations = [
      { label: "Brain ran on zero battery and your mouth executed an unauthorized verbal crime", probability: 54 },
      { label: "The waiter went back to the kitchen and literally told the entire staff about your blunder", probability: 27 },
      { label: "Sensory overload from burger anticipation caused catastrophic verbal malfunction", probability: 14 },
      { label: "Waiter secretly thought you were asking them on a dinner date (pure delulu cope)", probability: 5 }
    ];
    evidence = [
      "EXHIBIT A: Eyewitness reports confirm you hit them with the 'YOU TOO' with 100% confidence and zero hesitation 💀",
      "EXHIBIT B: You immediately stared at your napkin for 9 straight minutes praying for the ground to swallow you 🪦",
      "EXHIBIT C: Receipt confirms you tipped 35% out of sheer unbearable secondhand embarrassment no cap 💸"
    ];
    recommendedAction = "Do not ever walk within a 3-mile radius of that diner again. Order delivery under a fake name from now on.";
  } else if (lower.includes("manager") || lower.includes("boss") || lower.includes("slack") || lower.includes("connect")) {
    verdict = "CORPORATE DREAD FINAL BOSS: RESIGN TODAY 📉🚨";
    explanations = [
      { label: "Manager was typing on their Apple Watch while walking to get iced matcha", probability: 46 },
      { label: "The single terminal period was a calculated power move designed to rob your sleep", probability: 32 },
      { label: "Manager literally has no idea you've been having an existential panic attack for 4 hours", probability: 16 },
      { label: "You are secretly getting promoted to CEO (maximum gyatt-tier delusion fr fr)", probability: 6 }
    ];
    evidence = [
      "EXHIBIT A: The period at the end of 'Thanks.' was placed with lethal intent and zero remorse 💀",
      "EXHIBIT B: Meeting invite came with no agenda, no description, and a 15-minute slot. It's giving ambush vibes fr fr 🚩",
      "EXHIBIT C: You have already refreshed LinkedIn 28 times and drafted 3 apology emails in your notes app 😭"
    ];
    recommendedAction = "Log off Slack, do not open Outlook on your phone, and remember: it's just a job, don't let it live rent-free in your head bestie.";
  }

  return {
    caseId,
    department: dept,
    incident: text,
    severity: {
      socialThreatLevel: socialThreat,
      overthinkingIndex: Math.min(100, overthinking),
      emotionalDamage: emotionalDamage
    },
    explanations,
    evidence,
    verdict,
    confidence,
    recommendedAction,
    isAppeal: false,
    timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    caseOfficer: officer
  };
}

export function generateMockAppeal(incidentText: string, originalCase?: CaseReport): CaseReport {
  const text = incidentText || "incident";
  const h = hashString(text + "brainrot_appeal");
  const rivalDept = RIVAL_DEPARTMENTS[h % RIVAL_DEPARTMENTS.length];
  const officer = "Supreme Delulu Magistrate @SlayCouncil 💅✨";

  const socialThreat = Math.max(12, Math.floor((originalCase?.severity?.socialThreatLevel || 80) * 0.25));
  const overthinking = 100; // Overthinking is always maxed out!
  const emotionalDamage = Math.max(15, Math.floor((originalCase?.severity?.emotionalDamage || 75) * 0.28));

  const explanations = [
    { label: "Bestie they were literally intimidated by your unmatchable aura and rizz on god 💅", probability: 56 },
    { label: "Their phone slipped between the sofa cushions while they were raving about you", probability: 25 },
    { label: "They stared at your text and got butterflies so bad they couldn't type fr fr ✨", probability: 14 },
    { label: "They literally fell asleep holding their phone dreaming of you (high-grade copium)", probability: 5 }
  ];

  const evidence = [
    "EXHIBIT A: The lower department was full of certified haters projecting their own zero-rizz trauma on you 🤡",
    "EXHIBIT B: Vibe check reveals you ate and left zero crumbs; the target is simply fighting for their life trying to match your energy 💖",
    "EXHIBIT C: Overthinking index is certified 100% because you care deeply and that is iconic behavior bestie 💅",
    "EXHIBIT D: Previous verdict is officially nullified and ratio'd into oblivion by supreme decree ✨"
  ];

  const verdict = "IT'S GIVING ICONIC: LOWER VERDICT RATIO'D 💅✨";
  const recommendedAction = "Put on your best outfit, blast hyperpop in your headphones, and remember: delulu is the only solulu fr fr.";

  return {
    caseId: originalCase?.caseId || `PZ-${10000 + (h % 89999)}`,
    department: rivalDept,
    incident: text,
    severity: {
      socialThreatLevel: socialThreat,
      overthinkingIndex: overthinking,
      emotionalDamage: emotionalDamage
    },
    explanations,
    evidence,
    verdict,
    confidence: 99.4,
    recommendedAction,
    isAppeal: true,
    originalVerdict: originalCase?.verdict || "PREVIOUSLY COOKED",
    timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    caseOfficer: officer
  };
}
