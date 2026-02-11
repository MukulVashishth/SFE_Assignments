# Performance & Accessibility Notes

### 1. Virtualized Rendering

The table uses **@tanstack/react-virtual** to render only the visible rows within the viewport.

Instead of rendering 50,000 DOM nodes, only the rows currently visible (plus a small buffer) are mounted.

**Benefits:**

- Prevents browser freezing
- Reduces memory usage
- Keeps scrolling smooth
- Ensures scalability for large datasets

---

### 2. Memoization Strategy

To avoid unnecessary computations and re-renders:

- `useMemo` is used for filtering and sorting logic.
- `React.memo` is applied to row components.
- Derived data (filtered + sorted items) is recalculated only when dependencies change.

This ensures performance remains stable even as the dataset grows.

---

### 3. Optimized Filtering & Sorting

Filtering and sorting are computed inside a memoized selector:

- Text search filtering
- Status-based filtering
- Column-based sorting (ascending/descending)

The computation runs only when relevant state changes, preventing redundant recalculations.

---

### 4. Controlled Re-renders

State updates are scoped carefully:

- Search input updates only filtering state.
- Sorting updates only ordering logic.
- Virtualizer recalculates only when dataset length changes.

This keeps rendering predictable and efficient.

---

### 5. Loading States & Perceived Performance

Skeleton loaders are used to simulate async behavior and prevent layout shifts.

This improves perceived performance and ensures the UI remains stable during state transitions.

---

# Accessibility Strategy

Accessibility was treated as a core requirement during implementation.

---

## 1. Keyboard Navigation

The application is fully keyboard accessible:

- Search input and dropdown are focusable.
- Sortable column headers use `<button>` elements.
- Detail links are keyboard accessible.
- Visible focus indicators are applied to interactive elements.

Users can navigate and operate the interface without a mouse.

---

## 2. Accessible Table Structure

Because virtualization conflicts with native `<table>` layout behavior, the table is implemented using a semantic structure enhanced with ARIA roles:

- `role="table"`
- `role="row"`
- `role="columnheader"`
- `role="cell"`

Sortable columns include:

- `aria-sort="ascending | descending | none"`

This ensures assistive technologies correctly interpret table relationships and sorting state.

---

## 3. Screen Reader Support

- Form inputs are properly labeled.
- Sorting state is announced via `aria-sort`.
- Loading and empty states use semantic roles (e.g., `role="status"`).

This provides meaningful feedback for screen reader users.

---

## Accessibility Tradeoff

Native `<table>` markup was considered. However, virtualization requires absolute positioning which conflicts with standard table layout behavior.

To balance performance and accessibility:

- A div-based structure with appropriate ARIA roles was implemented.
- This pattern is commonly used in enterprise-scale data applications.
