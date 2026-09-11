import { CaseReport, ImageDataPayload } from '../types';
import { generateMockInvestigation, generateMockAppeal } from './mockData';

export async function submitInvestigation(
  incident: string,
  image?: ImageDataPayload | null
): Promise<CaseReport> {
  const trimmed = incident ? incident.trim() : "";
  const hasImage = Boolean(image && image.data);

  if (!trimmed && !hasImage) {
    throw new Error("Please state your grievance or upload a chat screenshot.");
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    const response = await fetch('/api/investigate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incident: trimmed,
        image: hasImage ? image : undefined
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[PAZHAM Client] API response status ${response.status}. Using deterministic fallback.`);
      const mock = generateMockInvestigation(trimmed, hasImage);
      if (hasImage && image) mock.imageAttachment = image.data;
      return mock;
    }

    const data: CaseReport = await response.json();
    if (!data || !data.verdict || !data.severity) {
      const mock = generateMockInvestigation(trimmed, hasImage);
      if (hasImage && image) mock.imageAttachment = image.data;
      return mock;
    }

    if (hasImage && image) {
      data.imageAttachment = image.data;
    }

    return data;
  } catch (err) {
    console.warn('[PAZHAM Client] Network or timeout during investigate; resolving with deterministic fallback generator.', err);
    const mock = generateMockInvestigation(trimmed, hasImage);
    if (hasImage && image) mock.imageAttachment = image.data;
    return mock;
  }
}

export async function submitAppeal(
  incident: string,
  originalCase: CaseReport,
  image?: ImageDataPayload | null
): Promise<CaseReport> {
  const trimmed = incident ? incident.trim() : "";
  const hasImage = Boolean(image && image.data);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    const response = await fetch('/api/appeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incident: trimmed,
        originalCase,
        image: hasImage ? image : undefined
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[PAZHAM Client] Appeal status ${response.status}. Using deterministic fallback.`);
      const mock = generateMockAppeal(trimmed, originalCase);
      if (originalCase.imageAttachment) mock.imageAttachment = originalCase.imageAttachment;
      return mock;
    }

    const data: CaseReport = await response.json();
    if (!data || !data.verdict || !data.severity) {
      const mock = generateMockAppeal(trimmed, originalCase);
      if (originalCase.imageAttachment) mock.imageAttachment = originalCase.imageAttachment;
      return mock;
    }

    if (originalCase.imageAttachment) {
      data.imageAttachment = originalCase.imageAttachment;
    }

    return data;
  } catch (err) {
    console.warn('[PAZHAM Client] Appeal fallback triggered.', err);
    const mock = generateMockAppeal(trimmed, originalCase);
    if (originalCase.imageAttachment) mock.imageAttachment = originalCase.imageAttachment;
    return mock;
  }
}
