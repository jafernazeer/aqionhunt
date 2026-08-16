// In-memory persistent database for dynamically generated client pitches and mock leads
const pitches = new Map();

export function savePitch(id, data) {
  pitches.set(id, {
    id,
    createdAt: new Date().toISOString(),
    ...data,
  });
  return pitches.get(id);
}

export function getPitch(id) {
  return pitches.get(id) || null;
}

export function getAllPitches() {
  return Array.from(pitches.values());
}
