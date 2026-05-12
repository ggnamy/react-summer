import { createSelector } from "@reduxjs/toolkit";
import { selectAllGrades } from "./gradesSlice";

// ── Derived selectors (memoized)
export const selectAverageGrade = createSelector(
  selectAllGrades,
  (grades) => {
    if (!grades.length) return "N/A";
    return (grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(2);
  }
);

export const selectHighGrades = createSelector(
  selectAllGrades,
  (grades) => grades.filter((g) => g.score >= 80)
);
