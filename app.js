const STORAGE_KEY = "guidedSetup_progress";

const defaultProgress = {
  currentStep: 0,
  completed: false,
  guidedSetupStatus: "not_started",
  selectedTool: "acrobat",
  selectedTools: ["acrobat"],
  requestedIntegrations: [],
  connectedIntegrations: [],
  completedSteps: [],
  skippedSteps: [],
  currentToolEducationIndex: 0,
  selectedFirstWins: [],
  selectedFirstSendPath: "acrobat_sign",
  selectedIntegration: "",
  selectedSendPath: "acrobat_sign",
  selectedAcrobatSignStart: "upload",
  selectedAgreementStart: "",
  outlookEducationSeen: false,
  toolEducationActive: false,
  firstSendInstructionActive: false,
  firstWinsInitialized: false,
  profile: {
    displayName: "",
    companyTeam: "",
    jobTitle: "",
    timeZone: "Pacific Time",
    notifications: true,
    completed: false,
  },
};

const journeySteps = [
  {
    title: "Choose your workflow",
    description: "Connect Acrobat Sign to the tools you use.",
    icon: "M20 5l2.7 6.7L30 14l-6.7 2.7L20 24l-2.7-7.3L10 14l7.3-2.3z|M10 23l1.6 4.2L16 29l-4.4 1.8L10 35l-1.6-4.2L4 29l4.4-1.8z|M31 24l1.2 3.2L36 29l-3.8 1.6L31 34l-1.2-3.4L26 29l3.8-1.8z",
  },
  {
    title: "Send your first agreement",
    description: "Try it out in just a few steps.",
    icon: "M7 21l25-12-7 25-5.5-10.5z|M19.5 23.5L25 34",
  },
  {
    title: "Complete your profile",
    description: "Add a few details to personalize your account.",
    icon: "M20 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z|M9 34c1.3-8 5-12 11-12s9.7 4 11 12",
  },
  {
    title: "Save time with templates",
    description: "Create reusable templates for everyday agreements.",
    icon: "M11 6h14l6 6v22H11z|M25 6v7h7|M16 20h10M16 25h9M16 30h7",
  },
];
const steps = journeySteps.map((step) => step.title);
const integrationEducationConfig = {
  outlook: {
    title: "Use Acrobat Sign in Outlook",
    subtitle: "See how Acrobat Sign fits into the email workflow you already use.",
    headline: "Send for signature right from Outlook",
    benefits: [
      "Create agreements from emails and attachments",
      "Track signature status in one place",
      "Keep work moving without switching tools",
    ],
    infoCallout: "Depending on your organization's setup, you may be asked to sign in the first time you use this integration.",
  },
};
const firstSendIntegrationConfigs = {
  outlook: {
    id: "outlook",
    icon: "mail",
    displayName: "Gmail / Outlook",
    startPointLabel: "Gmail / Outlook",
    startContext: "a Gmail or Outlook email or attachment",
    videoThumbnail: {
      label: "Outlook",
      actionLabel: "Send for signature",
      buttonLabel: "Send",
    },
    workflowSteps: [
      {
        icon: "mail",
        title: "Open an email or attachment",
        body: "Start from the message or file you already have.",
      },
      {
        icon: "acrobat",
        title: "Choose Acrobat Sign",
        body: "Launch Acrobat Sign from the Outlook workflow.",
      },
      {
        icon: "team",
        title: "Add recipients and send",
        body: "Review, prepare, and send for e-signature.",
      },
    ],
    flowLabels: ["Gmail / Outlook", "Acrobat Sign", "Signed document"],
    authSteps: [
      {
        title: "Open Gmail or Outlook",
        body: "Go to Gmail or Outlook in a new tab.",
        icon: "mail",
      },
      {
        title: "Open the Acrobat Sign add-in",
        body: "Click the Acrobat Sign add-in in the right panel or toolbar.",
        icon: "acrobat",
      },
      {
        title: "Sign in to Adobe",
        body: "Sign in with your Adobe account and allow access if prompted.",
        icon: "acrobat-sign",
      },
      {
        title: "Return here",
        body: "Once connected, return here to continue.",
        icon: "check",
      },
    ],
  },
  salesforce: {
    id: "salesforce",
    icon: "salesforce",
    displayName: "Salesforce",
    startPointLabel: "Salesforce",
    startContext: "a Salesforce record",
    videoThumbnail: {
      label: "Salesforce",
      actionLabel: "Sample agreement",
      buttonLabel: "Preview",
    },
    workflowSteps: [
      {
        icon: "salesforce",
        title: "Open a Salesforce record",
        body: "Start from the record connected to the agreement.",
      },
      {
        icon: "acrobat",
        title: "Choose Acrobat Sign",
        body: "Launch Acrobat Sign from the Salesforce workflow.",
      },
      {
        icon: "team",
        title: "Add recipients and send",
        body: "Review, prepare, and send for e-signature.",
      },
    ],
    flowLabels: ["Salesforce", "Acrobat Sign", "Signed document"],
    authSteps: [
      { title: "Open Salesforce", body: "Go to Salesforce in a new tab.", icon: "salesforce" },
      { title: "Open Acrobat Sign", body: "Choose Acrobat Sign from the record actions.", icon: "acrobat" },
      { title: "Sign in to Adobe", body: "Sign in and allow access if prompted.", icon: "acrobat-sign" },
      { title: "Return here", body: "Once connected, return here to continue.", icon: "check" },
    ],
  },
  workday: {
    id: "workday",
    icon: "workday",
    displayName: "Workday",
    startPointLabel: "Workday",
    startContext: "a Workday workflow or request",
    videoThumbnail: {
      label: "Workday",
      actionLabel: "HR document",
      buttonLabel: "Send",
    },
    workflowSteps: [
      {
        icon: "workday",
        title: "Open a Workday request",
        body: "Start from the HR document process already in motion.",
      },
      {
        icon: "acrobat",
        title: "Choose Acrobat Sign",
        body: "Launch Acrobat Sign from the Workday workflow.",
      },
      {
        icon: "team",
        title: "Send for signature",
        body: "Review, prepare, and send for e-signature.",
      },
    ],
    flowLabels: ["Workday", "Acrobat Sign", "Signed document"],
    authSteps: [
      { title: "Open Workday", body: "Go to your Workday workspace.", icon: "workday" },
      { title: "Open Acrobat Sign", body: "Choose Acrobat Sign from the workflow or request.", icon: "acrobat" },
      { title: "Sign in to Adobe", body: "Sign in and allow access if prompted.", icon: "acrobat-sign" },
      { title: "Return here", body: "Once connected, return here to continue.", icon: "check" },
    ],
  },
  microsoft_teams: {
    id: "microsoft_teams",
    icon: "teams",
    displayName: "Microsoft Teams",
    startPointLabel: "Microsoft Teams",
    startContext: "a Teams conversation or shared file",
    videoThumbnail: {
      label: "Teams",
      actionLabel: "Shared file",
      buttonLabel: "Send",
    },
    workflowSteps: [
      {
        icon: "teams",
        title: "Open a conversation or file",
        body: "Start from work your team is already discussing.",
      },
      {
        icon: "acrobat",
        title: "Choose Acrobat Sign",
        body: "Launch Acrobat Sign from the Teams workflow.",
      },
      {
        icon: "team",
        title: "Add recipients and send",
        body: "Review, prepare, and send for e-signature.",
      },
    ],
    flowLabels: ["Microsoft Teams", "Acrobat Sign", "Signed document"],
    authSteps: [
      { title: "Open Microsoft Teams", body: "Go to Teams in a new tab or app.", icon: "teams" },
      { title: "Open Acrobat Sign", body: "Choose Acrobat Sign from the app or shared file actions.", icon: "acrobat" },
      { title: "Sign in to Adobe", body: "Sign in and allow access if prompted.", icon: "acrobat-sign" },
      { title: "Return here", body: "Once connected, return here to continue.", icon: "check" },
    ],
  },
  gmail: {
    id: "gmail",
    icon: "mail",
    displayName: "Gmail",
    startPointLabel: "Gmail",
    startContext: "a Gmail message or attachment",
    videoThumbnail: {
      label: "Gmail",
      actionLabel: "Send for signature",
      buttonLabel: "Send",
    },
    workflowSteps: [
      {
        icon: "mail",
        title: "Open a Gmail message or attachment",
        body: "Start from the message or file you already have in Gmail.",
      },
      {
        icon: "acrobat",
        title: "Choose Acrobat Sign",
        body: "Launch Acrobat Sign from the Gmail workflow.",
      },
      {
        icon: "team",
        title: "Add recipients and send",
        body: "Review, prepare, and send for e-signature.",
      },
    ],
    flowLabels: ["Gmail", "Acrobat Sign", "Signed document"],
    authSteps: [
      { title: "Open Gmail", body: "Go to Gmail in a new tab.", icon: "mail" },
      { title: "Open the Acrobat Sign add-in", body: "Choose Acrobat Sign from the side panel.", icon: "acrobat" },
      { title: "Sign in to Adobe", body: "Sign in and allow access if prompted.", icon: "acrobat-sign" },
      { title: "Return here", body: "Once connected, return here to continue.", icon: "check" },
    ],
  },
  sharepoint: {
    id: "sharepoint",
    icon: "sharepoint",
    displayName: "SharePoint",
    startPointLabel: "SharePoint",
    startContext: "a SharePoint file or folder",
    videoThumbnail: {
      label: "SharePoint",
      actionLabel: "Shared file",
      buttonLabel: "Send",
    },
    workflowSteps: [
      {
        icon: "sharepoint",
        title: "Open a SharePoint file",
        body: "Start from a shared team file without moving it first.",
      },
      {
        icon: "acrobat",
        title: "Choose Acrobat Sign",
        body: "Launch Acrobat Sign from the SharePoint workflow.",
      },
      {
        icon: "team",
        title: "Add recipients and send",
        body: "Review, prepare, and send for e-signature.",
      },
    ],
    flowLabels: ["SharePoint", "Acrobat Sign", "Signed document"],
    authSteps: [
      { title: "Open SharePoint or OneDrive", body: "Go to your team files.", icon: "sharepoint" },
      { title: "Open Acrobat Sign", body: "Choose Acrobat Sign from the file actions.", icon: "acrobat" },
      { title: "Sign in to Adobe", body: "Sign in and allow access if prompted.", icon: "acrobat-sign" },
      { title: "Return here", body: "Once connected, return here to continue.", icon: "check" },
    ],
  },
};
const toolOptions = [
  {
    value: "acrobat",
    label: "Acrobat",
    icon: "acrobat",
    signal: "25K+ users",
    signalType: "global",
    explanation: "You can send a PDF for signature directly from Acrobat.",
  },
  {
    value: "acrobat-sign-web",
    label: "Acrobat Sign web",
    icon: "acrobat-sign",
    signal: "40K+ users",
    signalType: "global",
    explanation: "Start here when you want the most guided signing experience.",
  },
  {
    value: "outlook",
    label: "Gmail / Outlook",
    icon: "mail",
    signal: "Used by 18 teammates",
    signalType: "team",
    explanation: "You can turn email attachments into signature requests.",
  },
  {
    value: "microsoft-teams",
    label: "Microsoft Teams",
    icon: "teams",
    signal: "12K+ users",
    signalType: "global",
    explanation: "You can bring signing workflows into team conversations.",
  },
  {
    value: "salesforce",
    label: "Salesforce",
    icon: "salesforce",
    signal: "Preferred by Sales org",
    signalType: "org",
    explanation: "You can send agreements from the sales workflow where deals already live.",
  },
  {
    value: "workday",
    label: "Workday",
    icon: "workday",
    signal: "Used by 12 teammates",
    signalType: "team",
    explanation: "You can connect signing to HR document workflows.",
  },
  {
    value: "google-drive",
    label: "Google Drive",
    icon: "drive",
    signal: "10K+ users",
    signalType: "global",
    explanation: "You can start from documents stored in Drive.",
  },
  {
    value: "sharepoint-onedrive",
    label: "SharePoint / OneDrive",
    icon: "sharepoint",
    signal: "14K+ users",
    signalType: "global",
    explanation: "You can start from team files without downloading them first.",
  },
  {
    value: "other",
    label: "Other",
    icon: "other",
    signal: "18K+ users",
    signalType: "global",
    explanation: "We'll show the most flexible starting options.",
  },
];
const integrationStatus = {
  acrobat: { adminEnabled: true, userConnected: true, requestable: false },
  "acrobat-sign-web": { adminEnabled: true, userConnected: true, requestable: false },
  outlook: { adminEnabled: true, userConnected: false, requestable: false },
  "microsoft-teams": { adminEnabled: true, userConnected: true, requestable: false },
  salesforce: { adminEnabled: false, userConnected: false, requestable: true },
  workday: { adminEnabled: false, userConnected: false, requestable: true },
  "google-drive": { adminEnabled: true, userConnected: true, requestable: false },
  "sharepoint-onedrive": { adminEnabled: false, userConnected: false, requestable: true },
  other: { adminEnabled: true, userConnected: true, requestable: false },
};
const sendPathOptions = [
  {
    value: "acrobat_sign",
    title: "Send on Acrobat Sign",
    description: "Upload a document directly in Acrobat Sign, or use a sample agreement to practice the core send flow.",
    icon: "acrobat-sign",
    badge: "Users find this the best starting point",
  },
  {
    value: "outlook",
    title: "Outlook",
    description: "Try a sample send from an Outlook email or attachment.",
    icon: "mail",
  },
  {
    value: "salesforce",
    title: "Salesforce",
    description: "Try a sample send from a Salesforce record.",
    icon: "salesforce",
  },
];
const documentSourceOptions = [
  {
    label: "PDF",
    logo: "PDF",
    tags: ["Ready to send"],
    explanation: "PDFs can be uploaded directly or sent from Acrobat.",
  },
  {
    label: "Word document",
    logo: "W",
    tags: ["Upload DOCX"],
    explanation: "Upload a DOCX and Acrobat Sign can help prepare it for signing.",
  },
  {
    label: "Google Docs",
    logo: "G",
    tags: ["Export or connect"],
    explanation: "Use a connected file or export as PDF before sending.",
  },
  {
    label: "Email attachment",
    logo: "@",
    tags: ["Start from inbox"],
    explanation: "Start from a file someone already sent you.",
  },
  {
    label: "Google Drive",
    logo: "G",
    tags: ["Select from Drive"],
    explanation: "Select a document from Drive and prepare it for signature.",
  },
  {
    label: "SharePoint / OneDrive",
    logo: "SP",
    tags: ["Select from files"],
    explanation: "Start from shared team files without changing where they live.",
  },
  {
    label: "Existing template",
    logo: "T",
    tags: ["Reuse setup"],
    explanation: "Use a saved template when the document is repeated.",
  },
  {
    label: "I don't have one yet",
    logo: "?",
    tags: ["Try sample"],
    explanation: "Use a sample document to practice before sending anything real.",
  },
  {
    label: "Other",
    logo: "...",
    tags: ["Show options"],
    explanation: "We'll keep the setup flexible.",
  },
];
const firstWinOptions = [
  {
    label: "Send your first agreement",
    why: "Learn the core flow: add a document, place fields, preview, and send.",
    tag: "Core action",
    icon: "M11 7h15l5 5v21H11z|M26 7v6h6|M16 19h10M16 24h8|M20 31l10-10M30 21v8h-8",
  },
  {
    label: "Try a sample send",
    why: "Practice the sender and signer experience without using a real document.",
    tag: "Safe practice",
    icon: "M9 22l24-12-7 24-5-10-12-2z|M21 24l5 10",
  },
  {
    label: "Create a reusable template",
    why: "Useful when you send the same document more than once.",
    tag: "Repeat work",
    icon: "M10 7h18l4 5v21H10z|M28 7v6h6|M15 18h12M15 23h12M15 28h8|M7 11h3M7 16h3",
  },
  {
    label: "Track an agreement",
    why: "See who has viewed, signed, or still needs to act after sending.",
    tag: "After send",
    icon: "M7 30h26|M11 26V14M20 26V8M29 26v-7|M10 10l5 5 10-8 6 6",
  },
  {
    label: "Invite a teammate",
    why: "Useful when others help send, manage, or reuse agreements.",
    tag: "Team setup",
    icon: "M14 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM5 34c1-8 5-12 12-12M28 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM25 24h10M30 19v10",
  },
  {
    label: "Complete your signing profile",
    why: "Make sure your name, signature, and contact details appear correctly.",
    tag: "Trust + identity",
    icon: "M20 5a15 15 0 1 0 0 30 15 15 0 0 0 0-30z|M14 21l4 4 9-10|M13 31h14",
  },
];
const defaultFirstWins = ["Send your first agreement", "Try a sample send", "Complete your signing profile"];

let progress = loadProgress();
let preparationTimer;
let sendDocumentState = {
  fileName: "",
  isSampleAgreement: false,
};

const pageShell = document.querySelector(".page-shell");
const progressBand = document.querySelector(".progress-band");
const mainNavLinks = document.querySelectorAll(".main-nav a");
const homePageMarkup = pageShell.innerHTML;
const adaptiveModal = document.querySelector('[data-modal="adaptive"]');
const checklistModal = document.querySelector('[data-modal="checklist"]');
const adaptiveContent = document.querySelector("[data-adaptive-content]");
const adaptiveSteps = document.querySelector(".adaptive-modal .adaptive-steps");
const counter = document.querySelector("[data-counter]");
const progressRing = document.querySelector(".progress-band .ring");
const progressMessage = document.querySelector(".progress-wrap h1");
const progressCta = document.querySelector(".progress-wrap button");
const pageBackButton = document.querySelector('[data-action="page-back"]');
let pageBackTargetStep = null;
let modalHistory = [];

document.querySelectorAll('[data-action="modal-back"]').forEach((button) => {
  button.addEventListener("click", handleModalBack);
});

bindAdaptiveTriggers();
bindTopNav();
updateHomeProgressBanner();

document.querySelector('[data-action="close-adaptive"]').addEventListener("click", closeAdaptiveModal);
document.querySelector('[data-action="close-checklist"]').addEventListener("click", closeChecklistModal);
pageBackButton.addEventListener("click", handlePageBack);

adaptiveModal.addEventListener("click", (event) => {
  if (event.target === adaptiveModal) {
    closeAdaptiveModal();
  }
});

checklistModal.addEventListener("click", (event) => {
  if (event.target === checklistModal) {
    closeChecklistModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!adaptiveModal.hidden) closeAdaptiveModal();
  if (!checklistModal.hidden) closeChecklistModal();
});

function loadProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    return normalizeProgress({ ...defaultProgress, ...saved });
  } catch {
    return { ...defaultProgress };
  }
}

function normalizeProgress(saved) {
  const migratedStep = migrateStep(saved.currentStep);
  const selectedTools = normalizeToolValues(saved.selectedTools, saved.selectedTool);
  const selectedTool = selectedTools[0] || "";
  const selectedFirstSendPath = normalizeSendPathValue(saved.selectedFirstSendPath || saved.selectedSendPath);
  const completedSteps = normalizeStepList(saved.completedSteps, saved);
  const skippedSteps = normalizeStepList(saved.skippedSteps);
  const hasStarted = completedSteps.length > 0 || skippedSteps.length > 0 || migratedStep > 0;
  const guidedSetupStatus = saved.completed || saved.guidedSetupStatus === "completed" ? "completed" : hasStarted ? "in_progress" : "not_started";
  return {
    ...saved,
    currentStep: migratedStep,
    guidedSetupStatus,
    selectedTool,
    selectedTools,
    requestedIntegrations: Array.isArray(saved.requestedIntegrations) ? saved.requestedIntegrations.map(normalizeToolValue).filter(Boolean) : [],
    connectedIntegrations: Array.isArray(saved.connectedIntegrations) ? saved.connectedIntegrations.map(normalizeIntegrationValue).filter(Boolean) : [],
    completedSteps,
    skippedSteps,
    currentToolEducationIndex: Number.isFinite(saved.currentToolEducationIndex) ? saved.currentToolEducationIndex : 0,
    selectedFirstWins: Array.isArray(saved.selectedFirstWins) ? saved.selectedFirstWins : [],
    selectedFirstSendPath,
    selectedIntegration: normalizeIntegrationValue(saved.selectedIntegration || (selectedFirstSendPath !== "acrobat_sign" ? selectedFirstSendPath : "")),
    selectedSendPath: selectedFirstSendPath,
    selectedAcrobatSignStart: saved.selectedAcrobatSignStart || "upload",
    selectedAgreementStart: saved.selectedAgreementStart || "",
    outlookEducationSeen: Boolean(saved.outlookEducationSeen),
    toolEducationActive: Boolean(saved.toolEducationActive),
    firstSendInstructionActive: Boolean(saved.firstSendInstructionActive || saved.currentStep === 14),
    firstWinsInitialized: Boolean(saved.firstWinsInitialized),
    profile: {
      ...defaultProgress.profile,
      ...(saved.profile || {}),
    },
  };
}

function migrateStep(step) {
  const numericStep = Number.isFinite(step) ? step : 0;
  if ([8, 9, 10, 11, 12, 13, 14].includes(numericStep)) return 2;
  if (numericStep === 15) return 3;
  return numericStep;
}

function saveProgress() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function modalStateSnapshot() {
  return JSON.parse(JSON.stringify({
    currentStep: progress.currentStep,
    completed: progress.completed,
    guidedSetupStatus: progress.guidedSetupStatus,
    selectedTool: progress.selectedTool,
    selectedTools: progress.selectedTools,
    completedSteps: progress.completedSteps,
    skippedSteps: progress.skippedSteps,
    currentToolEducationIndex: progress.currentToolEducationIndex,
    toolEducationActive: progress.toolEducationActive,
    firstSendInstructionActive: progress.firstSendInstructionActive,
    selectedFirstWins: progress.selectedFirstWins,
    selectedFirstSendPath: progress.selectedFirstSendPath,
    selectedIntegration: progress.selectedIntegration,
    selectedSendPath: progress.selectedSendPath,
    selectedAgreementStart: progress.selectedAgreementStart,
    profile: progress.profile,
  }));
}

function pushModalHistory() {
  modalHistory.push(modalStateSnapshot());
  if (modalHistory.length > 20) modalHistory.shift();
}

function restoreModalHistory() {
  const previousState = modalHistory.pop();
  if (!previousState) return false;
  progress = normalizeProgress({ ...progress, ...previousState });
  saveProgress();
  renderAdaptiveFlow();
  return true;
}

function normalizeStepList(list, saved = {}) {
  if (Array.isArray(list)) {
    return [...new Set(list.map(Number).filter((step) => step >= 1 && step <= steps.length))];
  }

  if (saved.completed) return [1, 2, 3, 4];

  const currentStep = Number.isFinite(saved.currentStep) ? saved.currentStep : 0;
  if (currentStep > 1 && currentStep <= 4) {
    return Array.from({ length: currentStep - 1 }, (_, index) => index + 1);
  }
  return [];
}

function markStepComplete(stepNumber) {
  const completed = new Set(progress.completedSteps || []);
  const skipped = new Set(progress.skippedSteps || []);
  completed.add(stepNumber);
  skipped.delete(stepNumber);
  progress.completedSteps = [...completed].sort((a, b) => a - b);
  progress.skippedSteps = [...skipped].sort((a, b) => a - b);
  syncGuidedSetupStatus();
}

function markStepSkipped(stepNumber) {
  const completed = new Set(progress.completedSteps || []);
  const skipped = new Set(progress.skippedSteps || []);
  skipped.add(stepNumber);
  completed.delete(stepNumber);
  progress.completedSteps = [...completed].sort((a, b) => a - b);
  progress.skippedSteps = [...skipped].sort((a, b) => a - b);
  syncGuidedSetupStatus();
}

function guidedProgressPercent() {
  return Math.min(((progress.completedSteps || []).length + (progress.skippedSteps || []).length) * 25, 100);
}

function nextGuidedStep() {
  const finished = new Set([...(progress.completedSteps || []), ...(progress.skippedSteps || [])]);
  for (let stepNumber = 1; stepNumber <= steps.length; stepNumber += 1) {
    if (!finished.has(stepNumber)) return stepNumber;
  }
  return 5;
}

function syncGuidedSetupStatus() {
  const isFinished = guidedProgressPercent() === 100;
  progress.guidedSetupStatus = isFinished ? "completed" : "in_progress";
  progress.completed = isFinished;
}

function openAdaptiveModal() {
  adaptiveModal.hidden = false;
  renderAdaptiveFlow();
}

function closeAdaptiveModal() {
  adaptiveModal.hidden = true;
}

function openChecklistModal() {
  checklistModal.hidden = false;
}

function closeChecklistModal() {
  checklistModal.hidden = true;
}

function setPageBackButton(visible, targetStep = null) {
  pageBackTargetStep = targetStep;
  pageBackButton.hidden = !visible;
}

function handlePageBack() {
  if (pageBackTargetStep) {
    pageBackButton.hidden = true;
    if (modalHistory.length) {
      const previousState = modalHistory.pop();
      progress = normalizeProgress({ ...progress, ...previousState });
      saveProgress();
      openAdaptiveModal();
      return;
    }
    progress.currentStep = pageBackTargetStep;
    progress.guidedSetupStatus = "in_progress";
    saveProgress();
    openAdaptiveModal();
    return;
  }
  openHomePage();
}

function bindAdaptiveTriggers() {
  document.querySelectorAll("[data-adaptive-trigger]").forEach((trigger) => {
    if (trigger.dataset.adaptiveBound === "true") return;
    trigger.dataset.adaptiveBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (trigger.dataset.adaptiveTrigger === "request") {
        openSendPage();
        return;
      }
      progress = loadProgress();
      const percent = guidedProgressPercent();
      if (percent === 100) {
        openHomePage();
        return;
      }
      modalHistory = [];
      progress.currentStep = progress.guidedSetupStatus === "not_started" ? 0 : nextGuidedStep();
      progress.completed = false;
      saveProgress();
      openAdaptiveModal();
    });
  });
}

function updateHomeProgressBanner() {
  progress = loadProgress();
  const percent = guidedProgressPercent();
  const bannerState = {
    0: ["Let’s get you set up with confidence", "Start setup"],
    25: ["Great start — let’s send your first agreement", "Continue"],
    50: ["Nice progress — let’s complete your profile", "Continue"],
    75: ["Almost done — create a reusable template", "Continue"],
    100: ["You’re all set — Acrobat Sign is ready to use", "View dashboard"],
  }[percent] || ["Let’s get you set up with confidence", "Start setup"];

  if (progressRing) {
    progressRing.textContent = `${percent}%`;
    progressRing.setAttribute("aria-label", `${percent} percent complete`);
    progressRing.style.background = `radial-gradient(closest-side, var(--lavender) 72%, transparent 74% 100%), conic-gradient(#2680eb 0 ${percent}%, #969696 ${percent}% 100%)`;
  }
  if (progressMessage) progressMessage.textContent = bannerState[0];
  if (progressCta) progressCta.textContent = bannerState[1];
}

function bindTopNav() {
  mainNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const label = link.textContent.trim();
      if (label === "Send") {
        event.preventDefault();
        openSendPage();
      }
      if (label === "Home") {
        event.preventDefault();
        openHomePage();
      }
      if (label === "Create Library Template") {
        event.preventDefault();
        openTemplatePage();
      }
    });
  });
}

function setActiveNav(label) {
  mainNavLinks.forEach((link) => {
    link.classList.toggle("active", link.textContent.trim().startsWith(label));
  });
}

function openHomePage() {
  setPageBackButton(false);
  pageShell.classList.remove("send-page-shell");
  pageShell.innerHTML = homePageMarkup;
  progressBand.hidden = false;
  setActiveNav("Home");
  bindAdaptiveTriggers();
  updateHomeProgressBanner();
  history.replaceState(null, "", window.location.pathname);
}

function openSendPage(options = {}) {
  closeAdaptiveModal();
  closeChecklistModal();
  setPageBackButton(true, options.guidedStep || null);
  progressBand.hidden = true;
  setActiveNav("Send");
  pageShell.classList.add("send-page-shell");
  resetSendDocumentState();
  renderSendEmptyPage();
  history.replaceState(null, "", "#send");
}

function openTemplatePage() {
  closeAdaptiveModal();
  closeChecklistModal();
  setPageBackButton(true, progress.guidedSetupStatus === "in_progress" ? 4 : null);
  progressBand.hidden = true;
  setActiveNav("Create Library Template");
  pageShell.classList.remove("send-page-shell");
  pageShell.innerHTML = `
    <section class="template-page" aria-labelledby="template-page-title">
      <div class="template-page-header">
        <h1 id="template-page-title">Create a Library Template</h1>
      </div>
      <div class="guided-template-banner" role="status">
        <span class="guided-template-icon">${pathIcon("M20 8a12 12 0 1 0 0 24 12 12 0 0 0 0-24z|M20 18v9M20 13h.1")}</span>
        <p><strong>Guided setup:</strong> Create a reusable template — Upload a document you send often, add fields, and save it for reuse.</p>
        <button type="button" data-action="dismiss-template-banner" aria-label="Dismiss guided setup banner">×</button>
      </div>
      <p class="template-page-intro">
        Upload any document you send often, add form fields and create your template. It will be saved to your <a href="#">templates library</a>, where you can find and reuse this template to send agreements.
        <a href="#">Learn more</a> about creating library templates.
      </p>
      <section class="template-details-section" aria-labelledby="template-details-title">
        <h2 id="template-details-title">Template details</h2>
        <div class="template-form-grid">
          <div class="template-upload-column">
            <label>Add file</label>
            <div class="template-dropzone">
              <span class="template-dropzone-icon">${pathIcon("M8 23h10v9H8z|M11 26l3-3 5 6|M18 29l3-3 4 4|M24 10h10l6 6v22H24z|M34 10v7h7|M31 35V20M25 26l6-6 6 6|M44 23h14v11H44z")}</span>
              <strong>Drag and drop your files here</strong>
              <button class="primary send-page-button" type="button">Choose files</button>
            </div>
          </div>
          <div class="template-fields-column">
            <label>
              <span>Template name *</span>
              <input type="text" />
            </label>
            <fieldset class="template-radio-group">
              <legend>Template type <span aria-hidden="true">?</span></legend>
              <label><input type="radio" name="template-type" checked /> Reusable document</label>
              <label><input type="radio" name="template-type" /> Reusable form field layer</label>
              <label><input type="radio" name="template-type" /> Both</label>
            </fieldset>
            <label>
              <span>Who can use the template <span aria-hidden="true">?</span></span>
              <select>
                <option>Only me</option>
                <option>Any user in my group</option>
                <option>Any user in my organization</option>
              </select>
            </label>
          </div>
        </div>
        <button class="primary preview-fields-button template-preview-button" type="button">Preview & add fields</button>
      </section>
    </section>
  `;
  pageShell.querySelector('[data-action="dismiss-template-banner"]').addEventListener("click", (event) => {
    event.currentTarget.closest(".guided-template-banner").remove();
  });
  history.replaceState(null, "", "#create-library-template");
}

function resetSendDocumentState() {
  sendDocumentState = {
    fileName: "",
    isSampleAgreement: false,
  };
}

function renderSendEmptyPage() {
  resetSendDocumentState();
  pageShell.innerHTML = `
    <section class="send-page" aria-labelledby="send-page-title">
      <div class="send-page-header">
        <h1 id="send-page-title">Get documents signed</h1>
        <p>Send an agreement to others for e-signing, approval, or other processing.</p>
      </div>
      <section class="send-start" aria-labelledby="send-start-title">
        <h2 id="send-start-title">Choose how to start</h2>
        <div class="send-start-box">
          <article class="send-start-option">
              <span class="send-start-icon">${pathIcon("M11 7h15l5 5v21H11z|M26 7v6h6|M20 31V18M15 23l5-5 5 5")}</span>
            <div>
              <h3>Upload your document</h3>
              <p>Choose a file from your computer and send it for e-signature.</p>
              <button class="primary send-page-button" type="button" data-send-action="choose-files">Choose files</button>
              <input class="visually-hidden" type="file" data-send-file-input aria-label="Choose files" />
            </div>
          </article>
          <div class="send-start-divider"><span>OR</span></div>
          <article class="send-start-option">
            <span class="send-start-icon">${pathIcon("M11 7h18l4 5v21H11z|M29 7v6h6|M20 19l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z")}</span>
            <div>
              <h3>Use a sample agreement</h3>
              <p>Practice the send flow with a sample document before sending anything real.</p>
              <button class="secondary send-page-button" type="button" data-send-action="use-sample">Use sample agreement</button>
            </div>
          </article>
          <div class="send-security-note">
            <span>${pathIcon("M20 6l11 5v8c0 7-4.8 11.5-11 14-6.2-2.5-11-7-11-14v-8z|M16 21l3 3 6-7")}</span>
            Your document is secure and only accessible to you and your recipients.
          </div>
        </div>
      </section>
    </section>
  `;

  const fileInput = pageShell.querySelector("[data-send-file-input]");
  pageShell.querySelector('[data-send-action="choose-files"]').addEventListener("click", () => {
    fileInput.click();
  });
  fileInput.addEventListener("change", () => {
    const fileName = fileInput.files && fileInput.files[0] ? fileInput.files[0].name : "Uploaded document.pdf";
    attachSendDocument(fileName, false);
  });
  pageShell.querySelector('[data-send-action="use-sample"]').addEventListener("click", () => {
    attachSendDocument("Sample Agreement.pdf", true);
  });
}

function attachSendDocument(fileName, isSampleAgreement) {
  sendDocumentState = {
    fileName: isSampleAgreement ? "Sample Agreement.pdf" : fileName,
    isSampleAgreement,
  };
  renderSendDocumentPage();
}

function renderSendDocumentPage() {
  const { fileName, isSampleAgreement } = sendDocumentState;
  const attachedFileName = isSampleAgreement ? "Sample Agreement.pdf" : fileName;
  const agreementName = isSampleAgreement ? "Sample Agreement" : agreementNameFromFile(attachedFileName);
  const message = isSampleAgreement
    ? "Please review and complete this sample agreement."
    : "Please review and complete this agreement.";

  pageShell.innerHTML = `
    <section class="send-page send-document-page" aria-labelledby="send-page-title">
      <div class="send-page-header">
        <h1 id="send-page-title">Get documents signed</h1>
        <p>Send an agreement to others for e-signing, approval, or other processing.</p>
      </div>
      <section class="agreement-details" aria-labelledby="agreement-details-title">
        <h2 id="agreement-details-title">Agreement details</h2>
        <div class="agreement-form-grid">
          <div class="agreement-file-column">
            <label>Add file</label>
            <div class="attached-file-row">
              <span>${pathIcon("M11 7h17l5 5v21H11z|M28 7v6h6|M16 21h12M16 26h9")}</span>
              <strong>${escapeHtml(attachedFileName)}</strong>
              <button type="button" aria-label="Remove file">${pathIcon("M14 15h12M17 15v14M23 15v14M16 15l1 18h12l1-18M18 15l1-5h8l1 5")}</button>
            </div>
            <button class="send-inline-link" type="button" data-send-action="back-to-empty">Add more files</button>
            ${isSampleAgreement ? `
              <div class="sample-added-callout">
                <span>${pathIcon("M14 21l4 4 9-11")}</span>
                <div>
                  <strong>Sample agreement added</strong>
                  <p>This is a practice document. You can send it to yourself to try the full flow.</p>
                </div>
              </div>
            ` : ""}
          </div>
          <div class="agreement-meta-column">
            <label>Agreement name *</label>
            <input type="text" value="${escapeAttribute(agreementName)}" />
            <label>Message</label>
            <textarea>${escapeHtml(message)}</textarea>
          </div>
        </div>
        <div class="agreement-settings-row">
          <strong>Agreement settings <button type="button" aria-label="Edit agreement settings">${pathIcon("M12 28l1.8-6.2L27.5 8.1a3 3 0 0 1 4.2 4.2L18 26z|M25.5 10.1l4.4 4.4|M12 28l6-2")}</button></strong>
          <span>Completion deadline&nbsp;&nbsp; None</span>
          <span>Reminder frequency&nbsp;&nbsp; None</span>
          <span>Password&nbsp;&nbsp; None</span>
          <span>Signature type&nbsp;&nbsp; Electronic</span>
          <span>Language&nbsp;&nbsp; English/US</span>
        </div>
      </section>
      <section class="recipient-section" aria-labelledby="recipients-title">
        <h2 id="recipients-title">Add recipients</h2>
        <label class="recipient-order"><input type="checkbox" checked /> Recipients must sign in order</label>
        <div class="recipient-row">
          <span>1</span>
          <select aria-label="Recipient role"><option>Signer</option></select>
          <input type="email" aria-label="Recipient email" placeholder="e.g. john.doe@example.com" />
          <button type="button" aria-label="Remove recipient">${pathIcon("M14 15h12M17 15v14M23 15v14M16 15l1 18h12l1-18M18 15l1-5h8l1 5")}</button>
        </div>
        <div class="recipient-actions">
          <button type="button"><span>+</span> Individual</button>
          <button type="button"><span>+</span> Myself</button>
          <button type="button"><span>+</span> Group</button>
          <button type="button"><span>+</span> CC</button>
        </div>
        <button class="primary preview-fields-button" type="button">Preview & add fields</button>
      </section>
    </section>
  `;
  pageShell.querySelector('[data-send-action="back-to-empty"]').addEventListener("click", renderSendEmptyPage);
}

function agreementNameFromFile(fileName) {
  return fileName.replace(/\.[^/.]+$/, "") || "New Agreement";
}

function openFullSendFromGuidedSetup() {
  progress.selectedSendPath = "acrobat_sign";
  progress.selectedFirstSendPath = "acrobat_sign";
  progress.selectedIntegration = "";
  progress.selectedFirstWins = ["Send your first agreement"];
  progress.selectedAgreementStart = "";
  saveProgress();
  openSendPage({ guidedStep: 2 });
}

function handleModalBack() {
  if (!adaptiveModal.hidden) {
    if (restoreModalHistory()) return;

    if (progress.currentStep === 1 && progress.toolEducationActive) {
      progress.toolEducationActive = false;
      saveProgress();
      renderAdaptiveFlow();
      return;
    }

    if (progress.currentStep === 2 && progress.firstSendInstructionActive) {
      progress.firstSendInstructionActive = false;
      saveProgress();
      renderAdaptiveFlow();
      return;
    }

    if (progress.currentStep > 1 && progress.currentStep <= 4) {
      progress.completed = false;
      progress.guidedSetupStatus = "in_progress";
      progress.currentStep -= 1;
      saveProgress();
      renderAdaptiveFlow();
      return;
    }

    if (progress.currentStep === 1) {
      progress.currentStep = 0;
      saveProgress();
      renderAdaptiveFlow();
      return;
    }

    closeAdaptiveModal();
    return;
  }

  if (!checklistModal.hidden) {
    closeChecklistModal();
  }
}

function renderAdaptiveFlow() {
  clearTimeout(preparationTimer);
  adaptiveModal.classList.toggle("intro-mode", progress.currentStep === 0);
  adaptiveModal.classList.toggle("tools-step-mode", progress.currentStep === 1 && !progress.toolEducationActive);
  adaptiveContent.className = "adaptive-content";
  if (progress.currentStep === 0) {
    adaptiveSteps.innerHTML = "";
  } else {
    renderRail();
  }
  counter.textContent = progress.currentStep >= 1 && progress.currentStep <= 4 ? `STEP ${progress.currentStep} OF 4` : "";

  if (progress.currentStep === 0) {
    renderIntro();
    return;
  }

  if (progress.currentStep === 1) {
    if (progress.toolEducationActive) {
      renderToolEducationStep();
      return;
    }
    renderToolsStep();
    return;
  }

  if (progress.currentStep === 2) {
    if (progress.firstSendInstructionActive) {
      renderIntegrationWalkthroughStep();
      return;
    }
    renderFirstWinsStep();
    return;
  }

  if (progress.currentStep === 3) {
    renderProfileStep();
    return;
  }

  if (progress.currentStep === 4) {
    renderTemplateStep();
    return;
  }

  renderResults();
}

function renderRail() {
  const activeStep = progress.currentStep;
  const completedSteps = new Set(progress.completedSteps || []);
  const skippedSteps = new Set(progress.skippedSteps || []);
  adaptiveSteps.innerHTML = journeySteps
    .map((step, index) => {
      const stepNumber = index + 1;
      const isActive = activeStep === stepNumber && progress.guidedSetupStatus !== "completed";
      const isSkipped = skippedSteps.has(stepNumber) && !isActive;
      const isComplete = completedSteps.has(stepNumber) && !isActive;
      const classes = ["journey-step"];
      if (isActive) classes.push("active");
      if (isComplete) classes.push("complete");
      if (isSkipped) classes.push("skipped");
      if (!isActive && !isComplete && !isSkipped) classes.push("muted");
      if (!isComplete && !isSkipped) classes.push("skippable");
      return `
        <li class="${classes.join(" ")}" tabindex="0" data-step-row="${stepNumber}">
          <span class="journey-icon" aria-hidden="true">${isComplete ? pathIcon("M14 21l4 4 9-11") : pathIcon(step.icon)}</span>
          <span class="journey-copy">
            <strong>${step.title}</strong>
            ${isSkipped ? `<small>Skipped</small>` : ""}
          </span>
          ${isComplete || isSkipped ? "" : `<button class="journey-skip-button" type="button" data-skip-step="${stepNumber}" aria-label="Skip ${step.title}">Skip</button>`}
        </li>
      `;
    })
    .join("");
  adaptiveSteps.querySelectorAll("[data-skip-step]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const stepNumber = Number(button.dataset.skipStep);
      markStepSkipped(stepNumber);
      progress.toolEducationActive = false;
      progress.firstSendInstructionActive = false;
      progress.currentStep = nextGuidedStep();
      if (progress.guidedSetupStatus === "completed") {
        progress.currentStep = 5;
        saveProgress();
        closeAdaptiveModal();
        openHomePage();
        return;
      }
      saveProgress();
      renderAdaptiveFlow();
    });
  });
}

function renderIntro() {
  adaptiveContent.innerHTML = `
    <div class="intro-layout">
      ${introShowcase()}
      <div class="intro-details">
        <div class="modal-copy intro-copy">
          <h2 id="adaptive-title">Let’s get you ready to send with confidence</h2>
          <p>We’ll tailor setup around the tools you use, help you practice safely, and guide you to your first send.</p>
        </div>
        <div class="intro-benefits">
          ${introBenefit(
            "M10 7h16l5 5v21H10z|M26 7v6h6|M15 18h12M15 23h10M15 28h8",
            "Start where you already work",
            "Choose the tools where agreements already show up."
          )}
          ${introBenefit(
            "M20 5a15 15 0 1 0 0 30 15 15 0 0 0 0-30z|M14 21l4 4 9-10",
            "Know your next step",
            "We’ll route you to the right setup path based on what’s available."
          )}
          ${introBenefit(
            "M9 22l24-12-7 24-5-10-12-2z|M21 24l5 10|M11 31h8",
            "Practice before sending",
            "Use a sample agreement before sending anything real."
          )}
        </div>
      </div>
    </div>
    <div class="intro-cta-area">
      <div class="intro-actions">
        <div class="intro-primary-stack">
          <button class="modal-primary intro-action-button" type="button" data-action="start">Start guided setup</button>
          <div class="intro-chip">
            <span class="intro-chip-icon">${pathIcon("M20 5l3.8 10.3L35 16l-8.8 6.8L29 34l-9-6.2L11 34l2.8-11.2L5 16l11.2-.7z")}</span>
            Helpful for first-time senders · Usually under 5 minutes
          </div>
        </div>
      </div>
    </div>
  `;
  adaptiveContent.querySelector('[data-action="start"]').addEventListener("click", () => {
    pushModalHistory();
    progress.currentStep = 1;
    progress.completed = false;
    progress.guidedSetupStatus = "in_progress";
    saveProgress();
    renderAdaptiveFlow();
  });
}

function introShowcase() {
  return `
    <div class="intro-showcase" aria-hidden="true">
      <div class="intro-orbit intro-orbit-mail">${brandIcon("mail")}</div>
      <div class="intro-orbit intro-orbit-teams">${brandIcon("teams")}</div>
      <div class="intro-orbit intro-orbit-salesforce">${brandIcon("salesforce")}</div>
      <div class="intro-orbit intro-orbit-drive">${brandIcon("drive")}</div>
      <div class="intro-orbit intro-orbit-sharepoint">${brandIcon("sharepoint")}</div>
      <div class="intro-acrobat-core">${brandIcon("acrobat-sign")}</div>
      <div class="intro-laptop">
        <div class="intro-laptop-top">
          <span>${brandIcon("acrobat-sign")}</span>
          <strong>Adobe Acrobat Sign</strong>
        </div>
        <div class="intro-laptop-body">
          <div class="intro-laptop-nav"><span></span><span></span><span></span></div>
          <div class="intro-laptop-form">
            <strong>Send an agreement</strong>
            <span></span>
            <span></span>
            <button type="button" tabindex="-1">Send</button>
          </div>
          <div class="intro-complete-card">
            <span class="intro-signature">John</span>
            <span>Agreement completed</span>
            <b>${pathIcon("M14 21l4 4 9-11")}</b>
          </div>
        </div>
      </div>
      <div class="intro-plant"><span></span><span></span><span></span></div>
      <div class="intro-mug"></div>
    </div>
  `;
}

function renderToolsStep() {
  const selectedTools = progress.selectedTools || [];
  renderStepShell({
    title: "Where do agreements already show up in your work?",
    body: "Choose the tools you already use. We’ll guide you to the right setup path.",
    bodyHtml: `
      <div class="tool-selection-meta">
        <strong>${selectedTools.length} selected</strong>
      </div>
      <div class="option-grid tool-option-grid">
        ${toolOptions.map((tool) => {
          const selected = selectedTools.includes(tool.value);
          return toolTile(tool, selected, false);
        }).join("")}
      </div>
    `,
    canGoNext: selectedTools.length > 0,
    contentClass: "tools-step",
  });

  adaptiveContent.querySelectorAll("[data-tool]").forEach((tile) => {
    tile.addEventListener("click", () => {
      const nextTool = tile.dataset.tool;
      if (!nextTool || !isToolSelectable(nextTool)) return;
      const previousTools = [...(progress.selectedTools || [])];
      const currentTools = [...previousTools];
      const existingIndex = currentTools.indexOf(nextTool);

      if (existingIndex >= 0) {
        currentTools.splice(existingIndex, 1);
      } else {
        currentTools.push(nextTool);
      }

      if (!arraysEqual(previousTools, currentTools)) {
        progress.outlookEducationSeen = false;
      }
      progress.selectedTools = currentTools;
      progress.selectedTool = currentTools[0] || "";
      progress.currentToolEducationIndex = 0;
      saveProgress();
      renderAdaptiveFlow();
    });
  });

  adaptiveContent.querySelectorAll("[data-request-integration]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      requestIntegration(button.dataset.requestIntegration);
    });
  });

  adaptiveContent.querySelectorAll("[data-requestable-tool]").forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      requestIntegration(card.dataset.requestableTool);
    });
  });
}

function requestIntegration(toolValue) {
  if (!toolValue || !toolStatus(toolValue).requestable) return;
  const requested = new Set(progress.requestedIntegrations || []);
  requested.add(toolValue);
  progress.requestedIntegrations = [...requested];
  progress.selectedTools = (progress.selectedTools || []).filter(isToolSelectable);
  progress.selectedTool = progress.selectedTools[0] || "";
  saveProgress();
  console.info(`Integration request sent: ${toolLabel(toolValue)}`);
  renderAdaptiveFlow();
}

function renderToolEducationStep() {
  const selectedTools = progress.selectedTools || [];
  const toolIndex = clamp(progress.currentToolEducationIndex || 0, 0, Math.max(selectedTools.length - 1, 0));
  const toolValue = selectedTools[toolIndex] || selectedTools[0] || "acrobat-sign-web";
  const integrationId = normalizeIntegrationValue(toolValue);
  const integration = firstSendIntegrationConfigs[integrationId];
  const status = effectiveToolStatus(toolValue);
  if (integration && status.adminEnabled && !status.userConnected) {
    renderIntegrationAuthRequiredStep(toolValue, integration);
    return;
  }
  const education = integrationConfigForValue(toolValue);
  progress.currentToolEducationIndex = toolIndex;
  renderRail();
  counter.textContent = "STEP 1 OF 4";
  adaptiveContent.className = "adaptive-content tool-education-step";
  adaptiveContent.innerHTML = `
    <div class="enabled-integration">
      <div class="outlook-kicker">
        <span class="outlook-kicker-icon">${brandIcon(education.icon)}</span>
        <span>${education.displayName}</span>
        <span class="tool-education-progress">${toolIndex + 1} of ${selectedTools.length} selected tools</span>
      </div>
      <div class="modal-copy enabled-copy">
        <h2 id="adaptive-title">Send from ${education.displayName}</h2>
        <p>${education.displayName} is already available for your organization. You can start sending agreements from this workflow.</p>
      </div>
      <div class="enabled-callout">
        <span class="enabled-check">${pathIcon("M14 21l4 4 9-11")}</span>
        <div>
          <strong>Already enabled — no extra setup needed</strong>
          <p>You can start sending agreements from ${education.displayName} right away.</p>
        </div>
      </div>
      <section class="enabled-how-section">
        <h3>How it works</h3>
        <div class="enabled-step-list">
          ${education.workflowSteps.map((step, index) => enabledStepCard(step, index + 1)).join("")}
        </div>
      </section>
      <div class="outlook-workflow-strip enabled-flow-strip">
        ${workflowItem(education.icon, education.displayName)}
        <span class="workflow-arrow">→</span>
        ${workflowItem("acrobat-sign", "Acrobat Sign")}
        <span class="workflow-arrow">→</span>
        ${workflowItem("signed", "Signed document")}
      </div>
    </div>
    <div class="adaptive-footer outlook-footer">
      <button class="modal-secondary" type="button" data-action="outlook-back">Back</button>
      <button class="modal-primary" type="button" data-action="outlook-continue">Continue</button>
    </div>
  `;

  adaptiveContent.querySelector('[data-action="outlook-back"]').addEventListener("click", () => {
    if (progress.currentToolEducationIndex > 0) {
      progress.currentToolEducationIndex -= 1;
    } else {
      progress.toolEducationActive = false;
      progress.currentStep = 1;
    }
    saveProgress();
    renderAdaptiveFlow();
  });

  const advanceEducation = () => {
    pushModalHistory();
    progress.outlookEducationSeen = true;
    if (progress.currentToolEducationIndex < selectedTools.length - 1) {
      progress.currentToolEducationIndex += 1;
    } else {
      markStepComplete(1);
      progress.toolEducationActive = false;
      progress.currentStep = 2;
    }
    saveProgress();
    renderAdaptiveFlow();
  };

  adaptiveContent.querySelector('[data-action="outlook-continue"]').addEventListener("click", advanceEducation);
}

function renderIntegrationAuthRequiredStep(toolValue, integration) {
  progress.currentToolEducationIndex = clamp(progress.currentToolEducationIndex || 0, 0, Math.max((progress.selectedTools || []).length - 1, 0));
  renderRail();
  counter.textContent = "STEP 1 OF 4";
  const steps = integration.authSteps && integration.authSteps.length
    ? integration.authSteps
    : [
      { title: `Open ${integration.displayName}`, body: `Go to ${integration.displayName} in a new tab.`, icon: integration.icon },
      { title: "Open Acrobat Sign", body: "Choose Acrobat Sign from the integration actions.", icon: "acrobat" },
      { title: "Sign in to Adobe", body: "Sign in and allow access if prompted.", icon: "acrobat-sign" },
      { title: "Return here", body: "Once connected, return here to continue.", icon: "check" },
    ];

  adaptiveContent.innerHTML = `
    <div class="integration-auth">
      <div class="outlook-kicker">
        <span class="outlook-kicker-icon">${brandIcon(integration.icon)}</span>
        <span>${integration.displayName}</span>
      </div>
      <div class="modal-copy outlook-copy">
        <h2 id="adaptive-title">Set up ${integration.displayName}</h2>
        <p>${integration.displayName} is enabled for your organization. Connect your account to continue.</p>
      </div>
      <section class="auth-step-section" aria-label="Connect your account">
        <h3>Connect your account</h3>
        <div class="auth-step-list">
          ${steps.map((step, index) => authStepCard(step, index + 1)).join("")}
        </div>
      </section>
      <div class="auth-info-callout">
        <span>${pathIcon("M20 8a12 12 0 1 0 0 24 12 12 0 0 0 0-24z|M20 18v8M20 13h.1")}</span>
        <p>You may be asked to sign in the first time you use this integration.</p>
      </div>
    </div>
    <div class="adaptive-footer auth-footer">
      <button class="modal-secondary" type="button" data-action="auth-back">Back</button>
      <button class="modal-primary" type="button" data-action="auth-connected">I've connected ${integration.displayName}</button>
    </div>
  `;

  adaptiveContent.querySelector('[data-action="auth-back"]').addEventListener("click", () => {
    progress.toolEducationActive = false;
    progress.currentStep = 1;
    saveProgress();
    renderAdaptiveFlow();
  });

  adaptiveContent.querySelector('[data-action="auth-connected"]').addEventListener("click", () => {
    const connected = new Set(progress.connectedIntegrations || []);
    connected.add(normalizeIntegrationValue(toolValue));
    progress.connectedIntegrations = [...connected];
    saveProgress();
    renderAdaptiveFlow();
  });
}

function renderFirstWinsStep() {
  progress.selectedFirstWins = ["Send your first agreement"];
  if (!progress.selectedSendPath) progress.selectedSendPath = "acrobat_sign";
  if (!progress.selectedFirstSendPath) progress.selectedFirstSendPath = progress.selectedSendPath || "acrobat_sign";
  const recommendedOption = sendPathOptions.find((option) => option.value === "acrobat_sign");
  const preferredToolOptions = selectedPreferredToolOptions();
  const visibleSendPathValues = ["acrobat_sign", ...preferredToolOptions.map((option) => option.value)];
  if (!visibleSendPathValues.includes(progress.selectedFirstSendPath)) {
    progress.selectedFirstSendPath = "acrobat_sign";
  }
  progress.selectedSendPath = progress.selectedFirstSendPath;
  progress.selectedIntegration = normalizeIntegrationValue(progress.selectedFirstSendPath);
  const nextLabel = progress.selectedFirstSendPath === "acrobat_sign" ? "Next (opens send page)" : "Next";

  renderStepShell({
    title: "Send your first agreement",
    body: "No document ready? Use a sample agreement to practice the send flow.",
    bodyHtml: `
      <div class="first-send-start-section">
        ${recommendedStartCard(recommendedOption, progress.selectedFirstSendPath === "acrobat_sign")}
        ${preferredToolOptions.length ? `
          <div class="preferred-tool-grid">
            ${preferredToolOptions.map((option) => preferredToolCard(option, progress.selectedFirstSendPath === option.value)).join("")}
          </div>
        ` : ""}
      </div>
    `,
    canGoNext: Boolean(progress.selectedFirstSendPath),
    nextLabel,
    footerClass: progress.selectedFirstSendPath === "acrobat_sign" ? "send-exit-footer" : "",
  });

  adaptiveContent.querySelectorAll("[data-send-path]").forEach((card) => {
    card.addEventListener("click", () => {
      progress.selectedFirstSendPath = card.dataset.sendPath;
      progress.selectedSendPath = progress.selectedFirstSendPath;
      progress.selectedIntegration = normalizeIntegrationValue(progress.selectedFirstSendPath);
      progress.selectedFirstWins = ["Send your first agreement"];
      progress.firstSendInstructionActive = false;
      saveProgress();
      renderAdaptiveFlow();
    });
  });
}

function selectedPreferredToolOptions() {
  const selectedTools = progress.selectedTools || [];
  return selectedTools
    .map((tool) => sendPathOptions.find((option) => option.value === tool) || sendPathOptionFromTool(tool))
    .filter(Boolean);
}

function sendPathOptionFromTool(toolValue) {
  const tool = toolOptions.find((option) => option.value === toolValue);
  if (!tool) return null;
  const title = toolValue === "outlook" ? "Outlook" : tool.label;
  return {
    value: tool.value,
    title,
    description: `Try a sample send from ${title}.`,
    icon: tool.icon,
  };
}

function renderIntegrationWalkthroughStep() {
  progress.selectedFirstWins = ["Send your first agreement"];
  const integration = selectedIntegrationConfig();
  renderRail();
  counter.textContent = "STEP 2 OF 4";
  adaptiveContent.className = "adaptive-content integration-walkthrough-step";
  adaptiveContent.innerHTML = `
    <div class="branch-kicker walkthrough-kicker">
      <span>${brandIcon(integration.icon)}</span>
      <strong>${integration.displayName}</strong>
    </div>
    <div class="modal-copy branch-copy walkthrough-copy">
      <h2 id="adaptive-title">Send from ${integration.displayName}</h2>
      <p>Start from ${integration.startContext}, then use Acrobat Sign to send it for signature.</p>
    </div>
    <div class="outlook-walkthrough">
      <section class="walkthrough-steps">
        <h3>How it works</h3>
        ${integration.workflowSteps.map((step) => walkthroughStep(step.icon, step.title, step.body)).join("")}
      </section>
      <section class="walkthrough-media">
        <h3>Watch a 90-second overview</h3>
        ${integrationVideoThumbnail(integration)}
        <div class="outlook-workflow-strip walkthrough-strip">
          ${workflowItem(integration.icon, integration.flowLabels[0])}
          <span class="workflow-arrow">→</span>
          ${workflowItem("acrobat-sign", integration.flowLabels[1])}
          <span class="workflow-arrow">→</span>
          ${workflowItem("signed", integration.flowLabels[2])}
        </div>
      </section>
    </div>
    <div class="walkthrough-info-callout">
      <span>${pathIcon("M20 6a14 14 0 1 0 0 28 14 14 0 0 0 0-28z|M20 18v9M20 13h.1")}</span>
      <p>Depending on your organization's setup, you may be asked to sign in the first time you use this integration.</p>
    </div>
    <div class="adaptive-footer walkthrough-footer">
      <button class="modal-secondary" type="button" data-action="walkthrough-back">Back</button>
      <button class="modal-primary" type="button" data-action="walkthrough-continue">Continue</button>
    </div>
  `;

  adaptiveContent.querySelector('[data-action="walkthrough-back"]').addEventListener("click", () => {
    progress.firstSendInstructionActive = false;
    progress.currentStep = 2;
    saveProgress();
    renderAdaptiveFlow();
  });

  adaptiveContent.querySelector('[data-action="walkthrough-continue"]').addEventListener("click", () => {
    pushModalHistory();
    progress.selectedAgreementStart = integration.displayName;
    progress.firstSendInstructionActive = false;
    markStepComplete(2);
    progress.currentStep = 3;
    saveProgress();
    renderAdaptiveFlow();
  });
}

function integrationVideoThumbnail(integration) {
  const thumbnail = integration.videoThumbnail || {};
  return `
    <div class="walkthrough-video" aria-label="${integration.displayName} send overview video preview">
      <div class="mock-outlook-window">
        <div class="mock-outlook-bar ${integration.id === "salesforce" ? "salesforce-bar" : ""}">
          <span>${thumbnail.label || integration.displayName}</span>
          <span></span><span></span><span></span>
        </div>
        <div class="mock-outlook-body">
          <div class="mock-mail-list">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="mock-message-list">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="mock-sign-pane">
            <strong>Acrobat Sign</strong>
            <label>${thumbnail.actionLabel || "Send for signature"}</label>
            <span></span>
            <label>Recipients</label>
            <span></span>
            <button type="button" tabindex="-1">${thumbnail.buttonLabel || "Send"}</button>
          </div>
        </div>
      </div>
      <span class="walkthrough-play-button">${pathIcon("M16 11v18l14-9z")}</span>
    </div>
  `;
}

function selectedIntegrationConfig() {
  const selectedPath = progress.selectedIntegration || progress.selectedFirstSendPath || progress.selectedSendPath || "outlook";
  return integrationConfigForValue(selectedPath);
}

function integrationConfigForValue(value) {
  const selectedPath = value || "outlook";
  const configId = integrationConfigId(selectedPath);
  const configured = firstSendIntegrationConfigs[configId];
  if (configured) return configured;

  const tool = toolOptions.find((option) => option.value === selectedPath);
  const displayName = tool ? tool.label : toolLabel(selectedPath) || "your tool";
  const icon = tool ? tool.icon : "other";
  return {
    id: selectedPath,
    icon,
    displayName,
    startPointLabel: displayName,
    startContext: `${displayName} work`,
    videoThumbnail: {
      label: displayName,
      actionLabel: "Agreement",
      buttonLabel: "Send",
    },
    workflowSteps: [
      {
        icon,
        title: `Start from ${displayName}`,
        body: "Begin from the work or file you already have.",
      },
      {
        icon: "acrobat",
        title: "Choose Acrobat Sign",
        body: `Launch Acrobat Sign from the ${displayName} workflow.`,
      },
      {
        icon: "team",
        title: "Add recipients and send",
        body: "Review, prepare, and send for e-signature.",
      },
    ],
    flowLabels: [displayName, "Acrobat Sign", "Signed document"],
  };
}

function integrationConfigId(value) {
  const aliases = {
    "microsoft-teams": "microsoft_teams",
    "sharepoint-onedrive": "sharepoint",
    "google-drive": "sharepoint",
  };
  return aliases[value] || value;
}

function renderIntegrationReadyStep() {
  progress.selectedFirstWins = ["Send your first agreement"];
  const integration = selectedIntegrationConfig();
  const startPointLabel = integration.startPointLabel || integration.displayName;
  progress.selectedAgreementStart = integration.displayName;
  renderRail();
  counter.textContent = "STEP 2 OF 4";
  adaptiveContent.innerHTML = `
    <div class="modal-copy outlook-ready-copy">
      <h2 id="adaptive-title">You're ready to send from ${integration.displayName}</h2>
      <p>Here's what to do next when you're in ${integration.displayName}.</p>
    </div>
    <section class="outlook-ready-card">
      <div class="ready-icon-wrap">
        <span class="ready-outlook-icon">${brandIcon(integration.icon)}</span>
        <span class="ready-success-check">${pathIcon("M14 21l4 4 9-11")}</span>
      </div>
      <h3>We'll guide you through your first send from ${integration.displayName}.</h3>
      <div class="ready-checklist">
        ${integration.workflowSteps.map((step) => readyChecklistItem(step.title)).join("")}
      </div>
      <span class="ready-start-tag">
        <span>${pathIcon(signalIcon("global"))}</span>
        Starts in ${startPointLabel}
      </span>
      <p>You can still choose Send on Acrobat Sign instead if your workflow changes.</p>
    </section>
    <p class="selected-start-point">
      <span>${pathIcon("M20 6a14 14 0 1 0 0 28 14 14 0 0 0 0-28z|M20 18v9M20 13h.1")}</span>
      Your selected start point: ${startPointLabel}
    </p>
    <div class="adaptive-footer ready-footer">
      <button class="modal-secondary" type="button" data-action="ready-back">Back</button>
      <button class="modal-primary" type="button" data-action="ready-continue">Continue</button>
    </div>
  `;

  adaptiveContent.querySelector('[data-action="ready-back"]').addEventListener("click", () => {
    progress.firstSendInstructionActive = true;
    progress.currentStep = 2;
    saveProgress();
    renderAdaptiveFlow();
  });

  adaptiveContent.querySelector('[data-action="ready-continue"]').addEventListener("click", () => {
    markStepComplete(2);
    progress.currentStep = 3;
    saveProgress();
    renderAdaptiveFlow();
  });
}

function renderProfileStep() {
  const displayName = progress.profile.displayName.trim() || "Tanmay Kakati";
  renderStepShell({
    title: "Set up how you appear in agreements",
    body: "Your profile helps recipients recognize you and keeps agreement records accurate.",
    bodyHtml: `
      <div class="profile-form">
        <section class="profile-section">
          <h3>Signing identity</h3>
          <div class="profile-field-grid">
            <label>
              <span>Full name</span>
              <input type="text" data-profile-field="displayName" value="${escapeAttribute(progress.profile.displayName)}" placeholder="Tanmay Kakati" />
            </label>
            <label>
              <span>Company / team</span>
              <input type="text" data-profile-field="companyTeam" value="${escapeAttribute(progress.profile.companyTeam)}" placeholder="Nonya" />
            </label>
            <label>
              <span>Job title</span>
              <input type="text" data-profile-field="jobTitle" value="${escapeAttribute(progress.profile.jobTitle)}" placeholder="Team member" />
            </label>
          </div>
        </section>
        <section class="profile-section">
          <h3>Signature</h3>
          <div class="signature-preview-card">
            <div>
              <span class="signature-script">${escapeHtml(displayName)}</span>
              <p>Signature preview</p>
            </div>
            <button class="modal-link" type="button">Edit signature</button>
          </div>
        </section>
        <section class="profile-section">
          <h3>Agreement details</h3>
          <div class="profile-field-grid two-column">
            <label>
              <span>Time zone</span>
              <select data-profile-field="timeZone">
                ${["Pacific Time", "Mountain Time", "Central Time", "Eastern Time"].map((zone) => `<option value="${zone}" ${progress.profile.timeZone === zone ? "selected" : ""}>${zone}</option>`).join("")}
              </select>
            </label>
            <label class="profile-toggle">
              <input type="checkbox" data-profile-field="notifications" ${progress.profile.notifications ? "checked" : ""} />
              <span>Email notifications</span>
            </label>
          </div>
        </section>
      </div>
      <div class="modal-callout profile-why-panel">Your name, signature, and contact details can appear in sent agreements, emails, and audit records.</div>
    `,
    canGoNext: true,
    nextLabel: "Next",
    contentClass: "profile-step",
  });

  adaptiveContent.querySelectorAll("[data-profile-field]").forEach((field) => {
    const nextButton = adaptiveContent.querySelector('[data-action="next"]');
    const syncProfileState = () => {
      updateProfileField(field);
      saveProgress();
      nextButton.disabled = false;
    };
    field.addEventListener("input", () => {
      syncProfileState();
    });
    field.addEventListener("change", () => {
      syncProfileState();
    });
  });
}

function renderTemplateStep() {
  progress.profile.completed = true;
  renderRail();
  counter.textContent = "STEP 4 OF 4";
  adaptiveContent.innerHTML = `
    <div class="modal-copy template-step-copy">
      <h2 id="adaptive-title">Save time with templates</h2>
      <p>Turn a document you send often into a reusable template.</p>
    </div>
    <article class="template-step-card">
      <div class="template-step-card-copy">
        <h3>Create a reusable template</h3>
        <p>Upload a document once, add fields, and reuse it whenever you need to send the same agreement again.</p>
      </div>
      <div class="template-step-visual" aria-label="Template creation steps">
        ${templateVisualStep(
          1,
          "Upload a document",
          pathIcon("M11 7h17l5 5v21H11z|M28 7v6h6|M20 31V18M15 23l5-5 5 5")
        )}
        <span class="template-step-arrow">→</span>
        ${templateVisualStep(
          2,
          "Add reusable fields",
          pathIcon("M8 11h24v18H8z|M12 16h16|M12 24h7|M19 20h8|M22 17v9|M17 20h10")
        )}
        <span class="template-step-arrow">→</span>
        ${templateVisualStep(
          3,
          "Save to template library",
          pathIcon("M8 14h11l3 4h10v14H8z|M20 22l1.8 3.7 4.1.6-3 2.9.7 4.1-3.6-1.9-3.6 1.9.7-4.1-3-2.9 4.1-.6z")
        )}
      </div>
    </article>
    <div class="template-step-actions">
      <button class="modal-primary" type="button" data-action="create-template">Create template</button>
    </div>
  `;

  adaptiveContent.querySelector('[data-action="create-template"]').addEventListener("click", () => {
    progress.currentStep = 4;
    progress.profile.completed = true;
    saveProgress();
    openTemplatePage();
  });

}

function renderStepShell({ title, body, bodyHtml, canGoNext, nextLabel = "Next", footerNote = "", footerClass = "", contentClass = "" }) {
  adaptiveContent.className = `adaptive-content ${contentClass}`.trim();
  adaptiveContent.innerHTML = `
    <div class="modal-copy">
      <h2 id="adaptive-title">${title}</h2>
      <p>${body}</p>
    </div>
    ${bodyHtml}
    <div class="adaptive-footer ${footerClass}">
      <button class="modal-secondary" type="button" data-action="back">Back</button>
      <button class="modal-primary" type="button" data-action="next" ${canGoNext ? "" : "disabled"}>${nextLabel}</button>
    </div>
    ${footerNote ? `<div class="footer-helper-note">${footerNote}</div>` : ""}
  `;

  adaptiveContent.querySelector('[data-action="back"]').addEventListener("click", () => {
    handleModalBack();
  });

  adaptiveContent.querySelector('[data-action="next"]').addEventListener("click", () => {
    if (!canGoNext) return;
    pushModalHistory();
    if (progress.currentStep === 1 && (progress.selectedTools || []).length > 0) {
      progress.currentToolEducationIndex = 0;
      progress.toolEducationActive = true;
    } else if (progress.currentStep === 2) {
      progress.selectedSendPath = progress.selectedFirstSendPath;
      progress.selectedIntegration = normalizeIntegrationValue(progress.selectedFirstSendPath);
      progress.selectedFirstWins = ["Send your first agreement"];
      if (progress.selectedFirstSendPath === "acrobat_sign") {
        progress.firstSendInstructionActive = false;
        markStepComplete(2);
        progress.currentStep = 3;
        saveProgress();
        openSendPage({ guidedStep: 2 });
        return;
      }
      progress.firstSendInstructionActive = true;
    } else if (progress.currentStep === 3) {
      progress.profile.completed = true;
      markStepComplete(3);
      progress.currentStep = 4;
    } else {
      progress.currentStep += 1;
    }
    saveProgress();
    renderAdaptiveFlow();
  });
}

function renderPreparingState() {
  renderRail();
  counter.textContent = "";
  adaptiveContent.innerHTML = `
    <div class="modal-copy">
      <h2 id="adaptive-title">Preparing your guided setup...</h2>
      <p>Based on your tools and first wins, we're shaping Acrobat Sign around how you already work.</p>
    </div>
    <div class="preparing-panel" aria-live="polite">
      <div class="prep-line"><span>✓</span>${primaryWorkSurface()} path selected</div>
      <div class="prep-line"><span>✓</span>${progress.selectedFirstWins[0] || "First win"} guidance queued</div>
      <div class="prep-line"><span>✓</span>Profile setup ready</div>
    </div>
  `;
  preparationTimer = setTimeout(() => {
    progress.completedSteps = [1, 2, 3, 4];
    progress.skippedSteps = [];
    progress.completed = true;
    progress.guidedSetupStatus = "completed";
    progress.currentStep = 5;
    saveProgress();
    renderAdaptiveFlow();
  }, 950);
}

function renderResults() {
  progress.completedSteps = [1, 2, 3, 4];
  progress.skippedSteps = [];
  progress.completed = true;
  progress.guidedSetupStatus = "completed";
  progress.currentStep = 5;
  saveProgress();
  renderRail();
  counter.textContent = "";
  const surface = primaryWorkSurface();
  const selectedWins = progress.selectedFirstWins.length ? progress.selectedFirstWins : [...defaultFirstWins];
  const recommendation = getRecommendation(selectedWins);
  const profileReady = isProfileReady();
  adaptiveContent.innerHTML = `
    <div class="modal-copy">
      <h2 id="adaptive-title">You're ready to get started</h2>
      <p>We've matched your setup to the tools you already use and the first wins you chose.</p>
    </div>
    <section class="summary-panel">
      <div class="summary-item">
        <span>Your tool</span>
        <strong>${surface}</strong>
        <small>We'll show where Acrobat Sign fits into this workflow.</small>
      </div>
      <div class="summary-item">
        <span>Your first wins</span>
        <div class="summary-chip-row">
          ${selectedWins.map((win) => `<span class="mini-tag">${shortWinLabel(win)}</span>`).join("")}
        </div>
      </div>
      <div class="summary-item">
        <span>Your profile</span>
        <strong>${profileReady ? "Signing identity ready" : "Profile can be completed later"}</strong>
        <small>${profileReady ? "Your name and agreement details are ready for review." : "You can finish your name, signature, and agreement details anytime."}</small>
      </div>
    </section>
    <section class="recommendation-panel">
      <div>
        <h3>${recommendation.title}</h3>
        <p>${recommendation.body}</p>
        <div class="summary-validation">New users find guided setup helpful <span>•</span> Takes about 2 minutes</div>
      </div>
      <button class="modal-primary" type="button" data-action="result-primary-panel">${recommendation.cta}</button>
    </section>
    <div class="secondary-link-row">
      <button class="modal-link" type="button" data-action="start-agreement">Send an agreement</button>
      <button class="modal-link" type="button">Create reusable template</button>
      <button class="modal-link" type="button">Track agreement after send</button>
      <button class="modal-link" type="button">Invite teammate</button>
    </div>
    <div class="results-actions">
      <button class="modal-primary results-cta" type="button" data-action="result-primary">${recommendation.cta}</button>
      <button class="modal-link" type="button" data-action="skip-home">Skip and go to Acrobat Sign home</button>
    </div>
  `;
  adaptiveContent.querySelectorAll('[data-action="result-primary"], [data-action="result-primary-panel"]').forEach((button) => {
    button.addEventListener("click", () => {
      if (recommendation.type === "sample" || recommendation.type === "guided") {
        openFullSendFromGuidedSetup();
        return;
      }
      progress.currentStep = 7;
      progress.selectedAgreementStart = "";
      saveProgress();
      renderAdaptiveFlow();
    });
  });
  adaptiveContent.querySelector('[data-action="start-agreement"]').addEventListener("click", () => {
    openFullSendFromGuidedSetup();
  });
  adaptiveContent.querySelectorAll(".summary-chip-row .mini-tag").forEach((chip) => {
    const label = chip.textContent.trim();
    if (label !== "Send first agreement" && label !== "Try sample send") return;
    chip.setAttribute("role", "button");
    chip.tabIndex = 0;
    chip.addEventListener("click", () => {
      openFullSendFromGuidedSetup();
    });
  });
  adaptiveContent.querySelector('[data-action="skip-home"]').addEventListener("click", closeAdaptiveModal);
}

function renderPlaceholderScreen() {
  renderRail();
  counter.textContent = "";
  const selectedWins = progress.selectedFirstWins.length ? progress.selectedFirstWins : [...defaultFirstWins];
  const recommendation = getRecommendation(selectedWins);
  const placeholder = {
    sample: {
      title: "Sample send",
      body: "Next, we'll load a sample document and show the sender and signer experience.",
    },
    guided: {
      title: "Guided send",
      body: "Next, we'll help upload, prepare, preview, and send your document.",
    },
    template: {
      title: "Reusable template",
      body: "Next, we'll help set up a reusable template for documents you send more than once.",
    },
    home: {
      title: "Acrobat Sign home",
      body: "Next, you'll return to the home page and explore the actions you selected.",
    },
  }[recommendation.type];
  adaptiveContent.innerHTML = `
    <div class="modal-copy placeholder-copy">
      <h2 id="adaptive-title">${placeholder.title}</h2>
      <p>${placeholder.body}</p>
    </div>
    <div class="modal-illustration">
      <svg viewBox="0 0 160 100" aria-hidden="true">
        <path d="M43 17h49l17 17v50H43z" />
        <path d="M92 17v18h17" />
        <path d="M54 46h36M54 58h30M54 70h22" />
        <path class="modal-blue-fill" d="M104 64l8 8 18-23" />
      </svg>
    </div>
    <button class="modal-secondary" type="button" data-action="back-to-results">Back to workspace</button>
  `;
  adaptiveContent.querySelector('[data-action="back-to-results"]').addEventListener("click", () => {
    progress.currentStep = 5;
    saveProgress();
    renderAdaptiveFlow();
  });
}

function sourceTile(source, selected) {
  return `
    <button class="choice-tile tool-choice ${selected ? "selected" : ""}" type="button" data-document-source="${source.label}">
      <span class="logo-mark">${source.logo}</span>
      <span>${source.label}</span>
      <span class="mini-tag-row">${source.tags.map((tag) => `<span class="mini-tag">${tag}</span>`).join("")}</span>
    </button>
  `;
}

function introBenefit(paths, title, body) {
  return `
    <div class="intro-benefit">
      <span class="intro-benefit-icon">${pathIcon(paths)}</span>
      <div>
        <h3>${title}</h3>
        <p>${body}</p>
      </div>
    </div>
  `;
}

function outlookBenefit(paths, title, body) {
  return `
    <div class="outlook-benefit">
      <span class="outlook-benefit-icon">${pathIcon(paths)}</span>
      <div>
        <h3>${title}</h3>
        <p>${body}</p>
      </div>
    </div>
  `;
}

function firstWinCard(option, selected) {
  return `
    <button class="milestone-card ${selected ? "selected" : ""}" type="button" data-first-win="${option.label}">
      <span class="milestone-icon">${pathIcon(option.icon)}</span>
      <span class="milestone-copy">
        <span class="enriched-title">${option.label}</span>
        <span class="milestone-why">${option.why}</span>
        <span class="mini-tag-row"><span class="mini-tag">${option.tag}</span></span>
      </span>
    </button>
  `;
}

function recommendedStartCard(option, selected) {
  return `
    <button class="recommended-start-card ${selected ? "selected" : ""}" type="button" data-send-path="${option.value}" aria-pressed="${selected}">
      <span class="send-path-radio" aria-hidden="true"></span>
      <span class="recommended-start-icon">${brandIcon(option.icon)}</span>
      <span class="recommended-start-copy">
        <span class="recommended-start-title">${option.title}</span>
        <span class="recommended-start-badge">
          <span>${pathIcon(sendPathTagIcon("sparkle"))}</span>
          ${option.badge}
        </span>
        <span class="recommended-start-description">${option.description}</span>
      </span>
    </button>
  `;
}

function preferredToolCard(option, selected) {
  return `
    <button class="preferred-tool-card ${selected ? "selected" : ""}" type="button" data-send-path="${option.value}" aria-pressed="${selected}">
      <span class="send-path-radio" aria-hidden="true"></span>
      <span class="preferred-tool-icon">${brandIcon(option.icon)}</span>
      <span class="preferred-tool-copy">
        <span class="preferred-tool-title">${option.title}</span>
        <span class="preferred-tool-description">${option.description}</span>
      </span>
    </button>
  `;
}

function sendPathCard(option, selected) {
  return `
    <button class="send-path-card ${selected ? "selected" : ""}" type="button" data-send-path="${option.value}" aria-pressed="${selected}">
      <span class="send-path-radio" aria-hidden="true"></span>
      <span class="send-path-icon">${brandIcon(option.icon)}</span>
      <span class="send-path-title">${option.title}</span>
      <span class="send-path-description">${option.description}</span>
    </button>
  `;
}

function walkthroughStep(icon, title, body) {
  return `
    <div class="walkthrough-step">
      <span class="walkthrough-step-icon ${icon === "acrobat" ? "acrobat-step-icon" : ""}">${walkthroughStepIcon(icon)}</span>
      <div>
        <h4>${title}</h4>
        <p>${body}</p>
      </div>
    </div>
  `;
}

function authStepCard(step, index) {
  const iconMarkup = step.icon === "check"
    ? pathIcon("M14 21l4 4 9-11")
    : walkthroughStepIcon(step.icon || "other");
  return `
    <div class="auth-step-card">
      <span class="auth-step-number">${index}</span>
      <div class="auth-step-copy">
        <h4>${step.title}</h4>
        <p>${step.body}</p>
      </div>
      <span class="auth-step-icon">${iconMarkup}</span>
    </div>
  `;
}

function enabledStepCard(step, index) {
  return `
    <div class="enabled-step-card">
      <span class="enabled-step-number">${index}</span>
      <div class="enabled-step-copy">
        <h4>${step.title}</h4>
        <p>${step.body}</p>
      </div>
    </div>
  `;
}

function readyChecklistItem(label) {
  return `
    <div class="ready-check-item">
      <span>${pathIcon("M14 21l4 4 9-11")}</span>
      ${label}
    </div>
  `;
}

function templateVisualStep(index, label, iconMarkup) {
  return `
    <div class="template-visual-step">
      <span class="template-step-number">${index}</span>
      <span class="template-step-icon">${iconMarkup}</span>
      <strong>${label}</strong>
    </div>
  `;
}

function toolTile(tool, selected, blocked) {
  const status = toolStatus(tool.value);
  const requestable = !status.adminEnabled && status.requestable;
  const requested = (progress.requestedIntegrations || []).includes(tool.value);
  const stateClasses = [
    "choice-tile",
    "tool-choice",
    "tool-card-option",
    selected ? "selected" : "",
    blocked ? "blocked" : "",
    requestable ? "requestable" : "",
    requested ? "requested" : "",
  ].filter(Boolean).join(" ");
  const cardBody = `
      <span class="tool-card-main">
        <span class="tool-logo-mark">${brandIcon(tool.icon)}</span>
        <span class="tool-card-name">${tool.label}</span>
      </span>
      <span class="tool-card-signal">
        <span class="tool-signal-icon">${pathIcon(signalIcon(tool.signalType))}</span>
        <span>${tool.signal}</span>
      </span>
  `;
  if (requestable) {
    return `
      <div class="${stateClasses}" role="button" tabindex="0" data-requestable-tool="${tool.value}" aria-label="${tool.label} integration requires admin setup">
        ${cardBody}
        <span class="tool-request-status">${requested ? "Request sent" : "Admin setup needed"}</span>
        <span class="tool-request-panel">
          <button class="tool-request-button" type="button" data-request-integration="${tool.value}">${requested ? "Requested" : "Request integration"}</button>
        </span>
      </div>
    `;
  }
  return `
    <button class="${stateClasses}" type="button" data-tool="${tool.value}" aria-pressed="${selected}" ${blocked ? "aria-disabled=\"true\"" : ""}>
      ${cardBody}
    </button>
  `;
}

function shortcutCard(title, subtitle, tag, action) {
  return `
    <article class="shortcut-card">
      <div>
        <h3>${title}</h3>
        <p>${subtitle}</p>
        <span class="template-tag">${tag}</span>
      </div>
      <a href="#">${action}</a>
    </article>
  `;
}

function workflowItem(icon, label) {
  const iconMarkup = icon === "signed"
    ? pathIcon("M10 7h17l5 5v21H10z|M27 7v6h6|M15 22l4 4 8-9")
    : brandIcon(icon);
  return `
    <span class="workflow-item">
      <span>${iconMarkup}</span>
      <span>${label}</span>
    </span>
  `;
}

function toolEducation(toolValue) {
  const tool = toolOptions.find((option) => option.value === toolValue) || toolOptions[1];
  const toolName = toolValue === "outlook" ? "Outlook" : tool.label;
  const genericBenefits = [
    {
      icon: "M10 9h20v22H10z|M15 16h10M15 21h12M15 26h8",
      title: "Start from the work you already have",
      body: `Use ${toolName} as a familiar place to begin agreements for signature.`,
    },
    {
      icon: "M9 31h5V19H9zM18 31h5V11h-5zM27 31h5V16h-5z",
      title: "Track progress after sending",
      body: "See agreement activity and understand what still needs attention.",
    },
    {
      icon: "M12 10a12 12 0 1 0 12 0M12 10v8h8M30 30l4 4M34 30l-4 4",
      title: "Keep work moving with fewer switches",
      body: "Use Acrobat Sign guidance without losing the context of your workflow.",
    },
  ];

  const educationByTool = {
    outlook: {
      kicker: "Outlook",
      icon: "mail",
      title: integrationEducationConfig.outlook.title,
      subtitle: integrationEducationConfig.outlook.subtitle,
      headline: integrationEducationConfig.outlook.headline,
      benefits: [
        {
          icon: "M11 14h18v18H11z|M11 14l9 8 9-8|M15 8h20v18M30 19h5",
          title: integrationEducationConfig.outlook.benefits[0],
          body: "Turn messages and files into agreements in a few clicks.",
        },
        {
          icon: "M9 31h5V19H9zM18 31h5V11h-5zM27 31h5V16h-5z",
          title: integrationEducationConfig.outlook.benefits[1],
          body: "See when agreements are viewed, signed, and completed.",
        },
        {
          icon: "M12 10a12 12 0 1 0 12 0M12 10v8h8M30 30l4 4M34 30l-4 4",
          title: integrationEducationConfig.outlook.benefits[2],
          body: "Send, sign, and manage agreements without leaving Outlook.",
        },
      ],
      infoCallout: integrationEducationConfig.outlook.infoCallout,
    },
  };

  return educationByTool[toolValue] || {
    kicker: toolName,
    icon: tool.icon,
    title: `Use Acrobat Sign with ${toolName}`,
    subtitle: `See how Acrobat Sign fits into the ${toolName} workflow you already use.`,
    headline: `Send for signature from ${toolName}`,
    benefits: genericBenefits,
    infoCallout: "Depending on your organization's setup, you may be asked to sign in the first time you use this integration.",
  };
}

function pathIcon(paths) {
  return `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      ${paths
        .split("|")
        .map((path) => `<path d="${path}"></path>`)
        .join("")}
    </svg>
  `;
}

function toggleValue(list, value) {
  const existingIndex = list.indexOf(value);
  if (existingIndex >= 0) {
    list.splice(existingIndex, 1);
  } else {
    list.push(value);
  }
}

function primaryWorkSurface() {
  return toolLabel((progress.selectedTools || [])[0] || progress.selectedTool) || "Acrobat Sign web";
}

function normalizeToolValue(tool) {
  if (!tool) return "";
  const matchingTool = toolOptions.find((option) => option.value === tool || option.label === tool);
  return matchingTool ? matchingTool.value : tool;
}

function normalizeToolValues(tools, legacyTool) {
  const source = Array.isArray(tools) && tools.length ? tools : legacyTool ? [legacyTool] : [];
  const normalized = [];
  source.forEach((tool) => {
    const value = normalizeToolValue(tool);
    if (value && isToolSelectable(value) && !normalized.includes(value)) {
      normalized.push(value);
    }
  });
  return normalized;
}

function toolStatus(toolValue) {
  return integrationStatus[toolValue] || { adminEnabled: true, userConnected: false, requestable: false };
}

function effectiveToolStatus(toolValue) {
  const status = toolStatus(toolValue);
  const integrationId = normalizeIntegrationValue(toolValue);
  const connected = (progress.connectedIntegrations || []).includes(integrationId);
  return {
    ...status,
    userConnected: status.userConnected || connected,
  };
}

function isToolSelectable(toolValue) {
  const status = toolStatus(toolValue);
  return status.adminEnabled || !status.requestable;
}

function normalizeSendPathValue(path) {
  if (path === "acrobat-sign") return "acrobat_sign";
  if (path === "acrobat_sign" || path === "outlook" || path === "salesforce") return path;
  if (toolOptions.some((option) => option.value === path)) return path;
  return "acrobat_sign";
}

function normalizeIntegrationValue(value) {
  if (!value || value === "acrobat_sign") return "";
  return integrationConfigId(value);
}

function toolLabel(tool) {
  const matchingTool = toolOptions.find((option) => option.value === tool || option.label === tool);
  return matchingTool ? matchingTool.label : tool;
}

function arraysEqual(first, second) {
  if (first.length !== second.length) return false;
  return first.every((item, index) => item === second[index]);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function brandIcon(icon) {
  const uploadedIcons = {
    acrobat: "assets/icons/acrobat.png",
    "acrobat-sign": "assets/icons/acrobat-sign-web.png",
    mail: "assets/icons/gmail.png",
    teams: "assets/icons/microsoft-teams.png",
    salesforce: "assets/icons/salesforce.png",
    workday: "assets/icons/workday.png",
    drive: "assets/icons/google-drive.png",
    sharepoint: "assets/icons/sharepoint.png",
  };
  if (uploadedIcons[icon]) {
    return `<img class="brand-icon brand-icon-image brand-icon-${icon}" src="${uploadedIcons[icon]}" alt="" aria-hidden="true" loading="lazy" />`;
  }
  const icons = {
    acrobat: `
      <svg class="brand-icon brand-icon-acrobat" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="6" y="5" width="28" height="30" rx="8"></rect>
        <path d="M20 10c3 8 7 15 12 20M20 10c-2 9-6 17-12 22M13 26c7-4 12-5 18-3"></path>
      </svg>
    `,
    "acrobat-sign": `
      <svg class="brand-icon brand-icon-sign" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="6" y="5" width="28" height="30" rx="8"></rect>
        <path d="M13 27c3-10 6-15 8-15 2 0 1 8-2 14 4-6 8-8 10-6 2 2-1 6-8 6h-8"></path>
      </svg>
    `,
    mail: `
      <svg class="brand-icon brand-icon-mail" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="6" y="9" width="18" height="22" rx="4"></rect>
        <path d="M8 13l7 7 7-7"></path>
        <rect x="17" y="12" width="17" height="17" rx="3"></rect>
        <path d="M22 17h7v7h-7z"></path>
      </svg>
    `,
    teams: `
      <svg class="brand-icon brand-icon-teams" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="7" y="12" width="17" height="18" rx="4"></rect>
        <path d="M12 18h8M16 18v8"></path>
        <circle cx="27" cy="14" r="4"></circle>
        <path d="M25 21h8v5c0 4-2 6-6 6h-2"></path>
      </svg>
    `,
    salesforce: `
      <svg class="brand-icon brand-icon-salesforce" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M13 28c-5 0-8-3-8-7 0-4 3-7 7-7 2-5 8-7 13-4 2-2 6-1 8 1 3 0 5 3 5 6s-2 6-6 6c-1 3-4 5-8 5z"></path>
      </svg>
    `,
    workday: `
      <svg class="brand-icon brand-icon-workday" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M9 23c2-8 6-12 11-12s9 4 11 12"></path>
        <path d="M9 27h22"></path>
        <path d="M12 25l3 8 5-8 5 8 3-8"></path>
      </svg>
    `,
    drive: `
      <svg class="brand-icon brand-icon-drive" viewBox="0 0 40 40" aria-hidden="true">
        <path class="drive-green" d="M15 6h10l10 18H25z"></path>
        <path class="drive-yellow" d="M15 6 5 24l5 10 10-18z"></path>
        <path class="drive-blue" d="M10 34h20l5-10H15z"></path>
      </svg>
    `,
    sharepoint: `
      <svg class="brand-icon brand-icon-sharepoint" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M12 14h12a7 7 0 0 1 0 14H12z"></path>
        <circle cx="12" cy="20" r="7"></circle>
        <circle cx="29" cy="12" r="4"></circle>
        <circle cx="30" cy="29" r="4"></circle>
      </svg>
    `,
    other: `
      <svg class="brand-icon brand-icon-other" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="8" y="8" width="9" height="9" rx="2"></rect>
        <rect x="23" y="8" width="9" height="9" rx="2"></rect>
        <rect x="8" y="23" width="9" height="9" rx="2"></rect>
        <rect x="23" y="23" width="9" height="9" rx="2"></rect>
      </svg>
    `,
  };
  return icons[icon] || icons.other;
}

function signalIcon(type) {
  if (type === "team") {
    return "M14 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM5 34c1-8 5-12 12-12M28 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 31c1-6 4-9 10-9";
  }
  if (type === "org") {
    return "M9 34V9h22v25M14 14h4M22 14h4M14 20h4M22 20h4M14 26h4M22 34v-8h4v8";
  }
  return "M20 5a15 15 0 1 0 0 30 15 15 0 0 0 0-30zM6 20h28M20 5c5 5 7 10 7 15s-2 10-7 15M20 5c-5 5-7 10-7 15s2 10 7 15";
}

function sendPathTagIcon(type) {
  if (type === "team") {
    return "M14 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM5 34c1-8 5-12 12-12M28 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 31c1-6 4-9 10-9";
  }
  if (type === "badge") {
    return "M20 6l10 4v9c0 7-4 12-10 15-6-3-10-8-10-15v-9zM15 21l4 4 7-9";
  }
  if (type === "folder") {
    return "M7 30h26V13H20l-3-4H7z";
  }
  if (type === "document") {
    return "M11 7h16l5 5v21H11z|M27 7v6h6|M16 19h10M16 24h8";
  }
  return "M20 5l3.8 10.3L35 16l-8.8 6.8L29 34l-9-6.2L11 34l2.8-11.2L5 16l11.2-.7z";
}

function walkthroughStepIcon(type) {
  if (type === "acrobat") {
    return brandIcon("acrobat");
  }
  if (type === "team") {
    return pathIcon(sendPathTagIcon("team"));
  }
  if (["acrobat-sign", "mail", "salesforce", "teams", "workday", "drive", "sharepoint", "other"].includes(type)) {
    return brandIcon(type);
  }
  return pathIcon("M8 12h24v18H8z|M8 13l12 10 12-10");
}

function isSampleRecommended() {
  return progress.selectedFirstWins.includes("Try a sample send");
}

function getRecommendation(selectedWins) {
  if (selectedWins.includes("Try a sample send")) {
    return {
      type: "sample",
      title: "Recommended next step: Try a sample send",
      body: "Use a sample document to experience the sender and signer flow safely.",
      cta: "Start sample send",
    };
  }
  if (selectedWins.includes("Send your first agreement")) {
    return {
      type: "guided",
      title: "Recommended next step: Send your first agreement",
      body: "Start with a document you already have and preview before sending.",
      cta: "Start guided send",
    };
  }
  if (selectedWins.includes("Create a reusable template") || selectedWins.includes("Create your first reusable template")) {
    return {
      type: "template",
      title: "Recommended next step: Create a reusable template",
      body: "Use this when you send the same document more than once.",
      cta: "Create template",
    };
  }
  return {
    type: "home",
    title: "Recommended next step: Open Acrobat Sign home",
    body: "Continue from your home page and explore the actions you selected.",
    cta: "Go to home",
  };
}

function isProfileReady() {
  return Boolean(
    progress.profile.completed ||
      progress.profile.displayName.trim() ||
      progress.profile.companyTeam.trim() ||
      progress.profile.jobTitle.trim()
  );
}

function shortWinLabel(win) {
  const labels = {
    "Send your first agreement": "Send first agreement",
    "Try a sample send": "Try sample send",
    "Create a reusable template": "Create template",
    "Create your first reusable template": "Create template",
    "Track an agreement": "Track agreement",
    "Invite a teammate": "Invite teammate",
    "Complete your signing profile": "Complete profile",
  };
  return labels[win] || win;
}

function isProfileComplete() {
  return true;
}

function updateProfileField(field) {
  const key = field.dataset.profileField;
  if (field.type === "checkbox") {
    progress.profile[key] = field.checked;
  } else {
    progress.profile[key] = field.value;
  }
  progress.profile.completed = isProfileComplete();
}

function escapeAttribute(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
