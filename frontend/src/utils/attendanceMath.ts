// Mathematical logic for Attendance Calculations, Projections, and Buffers

/**
 * Calculates current attendance percentage
 */
export function calculatePercentage(attended: number, held: number): number {
  if (held <= 0) return 100;
  return Number(((attended / held) * 100).toFixed(2));
}

/**
 * Projected percentage if next N classes are attended
 * Formula: ((attended + N) / (held + N)) * 100
 */
export function projectAfterAttending(attended: number, held: number, n: number): number {
  if (n <= 0) return calculatePercentage(attended, held);
  const newAttended = attended + n;
  const newHeld = held + n;
  return Number(((newAttended / newHeld) * 100).toFixed(2));
}

/**
 * Projected percentage if next N classes are missed
 * Formula: (attended / (held + N)) * 100
 */
export function projectAfterMissing(attended: number, held: number, n: number): number {
  if (n <= 0) return calculatePercentage(attended, held);
  const newHeld = held + n;
  return Number(((attended / newHeld) * 100).toFixed(2));
}

/**
 * Calculates consecutive classes required to reach target percentage T (e.g. 75 or 80)
 * Formula: ceil((T * held - 100 * attended) / (100 - T))
 */
export function classesRequiredForTarget(attended: number, held: number, target: number = 75): number {
  const current = (attended / (held || 1)) * 100;
  if (current >= target) return 0;
  if (target >= 100) return Infinity;

  const required = Math.ceil((target * held - 100 * attended) / (100 - target));
  return Math.max(0, required);
}

/**
 * Calculates how many consecutive classes can be safely missed while maintaining at least target percentage T
 * Formula: floor((100 * attended - T * held) / T)
 */
export function safeMissesAllowed(attended: number, held: number, target: number = 75): number {
  if (target <= 0) return Infinity;
  const current = (attended / (held || 1)) * 100;
  if (current < target) return 0;

  const misses = Math.floor((100 * attended - target * held) / target);
  return Math.max(0, misses);
}

/**
 * High-level status object for a given attended, held, and target
 */
export function calculateAttendanceStatus(attended: number, held: number, target: number = 75) {
  const current = calculatePercentage(attended, held);
  const isTargetMet = current >= target;
  const classesNeeded = classesRequiredForTarget(attended, held, target);
  const classesCanMiss = safeMissesAllowed(attended, held, target);

  return {
    currentPercentage: current,
    isTargetMet,
    classesNeeded,
    classesCanMiss,
    status: isTargetMet ? 'ELIGIBLE' : (current >= 65 ? 'CONDONATION' : 'DEBARRED')
  };
}

/**
 * Calculates projected numbers when attending attendCount and missing missCount
 */
export function calculateSubjectProjection(attended: number, held: number, attendCount: number = 0, missCount: number = 0) {
  const current = calculatePercentage(attended, held);
  const projectedAttended = attended + attendCount;
  const projectedTotal = held + attendCount + missCount;
  const projectedPercentage = calculatePercentage(projectedAttended, projectedTotal);
  const delta = Number((projectedPercentage - current).toFixed(2));

  return {
    current,
    projectedAttended,
    projectedTotal,
    projectedPercentage,
    delta
  };
}

/**
 * Calculates What-If simulation given additional classes and an expected attendance rate (0 - 100)
 */
export function calculateWhatIfSimulation(attended: number, held: number, futureClasses: number, attendanceRate: number = 100) {
  const futureAttended = Math.round(futureClasses * (attendanceRate / 100));
  const newAttended = attended + futureAttended;
  const newHeld = held + futureClasses;
  const projectedPercentage = calculatePercentage(newAttended, newHeld);
  const current = calculatePercentage(attended, held);

  return {
    futureClasses,
    futureAttended,
    projectedPercentage,
    delta: Number((projectedPercentage - current).toFixed(2))
  };
}

/**
 * Generates an array of simulation points for charting
 */
export function generateSimulationCurve(attended: number, held: number, steps: number = 10) {
  const attendPoints: { count: number; percentage: number; delta: number }[] = [];
  const missPoints: { count: number; percentage: number; delta: number }[] = [];
  const basePercent = calculatePercentage(attended, held);

  for (let i = 1; i <= steps; i++) {
    const pAttend = projectAfterAttending(attended, held, i);
    attendPoints.push({
      count: i,
      percentage: pAttend,
      delta: Number((pAttend - basePercent).toFixed(2))
    });

    const pMiss = projectAfterMissing(attended, held, i);
    missPoints.push({
      count: i,
      percentage: pMiss,
      delta: Number((pMiss - basePercent).toFixed(2))
    });
  }

  return { attendPoints, missPoints, basePercent };
}
