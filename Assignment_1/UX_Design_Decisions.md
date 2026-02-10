# UX & Design Decisions

Focus Screen: Inventory Management (Large Data Table)

---

# 1. Why Inventory Screen?

The Inventory screen is the most complex part of the application because it must handle:

- 100k–1M+ records
- Multiple filters
- Sorting and pagination
- Drill-down into details
- Bulk actions
- Real-time updates

The UX must remain clear, predictable, and performant despite data complexity.

---

# 2. Information Hierarchy

The layout is designed to prioritize clarity and reduce cognitive overload.

## Hierarchy Structure

1. Page Title & Context
2. Primary Actions
3. Filters & Search
4. Data Table
5. Pagination & Status

---

## Low-Fidelity Wireframe

```
---------------------------------------------------------
 Inventory Management                          [Export]

 -------------------------------------------------------
 | Search 🔍  | Status ▼ | Type ▼ | Date Range ▼      |
 -------------------------------------------------------

 -------------------------------------------------------
 | Name   | Type   | Status   | Last Updated | ...    |
 -------------------------------------------------------
 | Router | Asset  | Active   | 2 mins ago   | ...    |
 | Switch | Asset  | Inactive | 1 hr ago     | ...    |
 | ...                                              ...|
 -------------------------------------------------------

 Showing 1–50 of 125,430 results        < Prev | Next >
```

---

## Design Principles Applied

- Filters appear above the table (not hidden)
- Most important columns are left-aligned
- Secondary actions are placed in row menus
- Bulk actions appear only when rows are selected
- Pagination is explicit and predictable

---

# 3. User Flow

### Primary Flow: Finding an Asset

1. User lands on Inventory page
2. User searches or applies filters
3. Table updates
4. User selects row
5. User navigates to Detail page

---

## User Flow Diagram

```mermaid
flowchart LR
    A[Land on Inventory] --> B[Search / Apply Filters]
    B --> C[View Filtered Results]
    C --> D[Select Row]
    D --> E[Open Detail Page]
    E --> F[Back to Inventory (State Preserved)]
```

Important UX principle:

- When returning from detail view, filters and pagination state are preserved via URL sync.
- Users never lose context.

---

# 4. Loading States

Loading states must feel intentional and smooth.

## Initial Load

- Skeleton table rows
- Disabled filters while loading
- No layout shift

## Filtering / Pagination

- Keep previous data visible
- Show subtle loading indicator
- Avoid full-screen spinners

Example:

Instead of clearing the table:

- Keep old rows
- Show loading bar above table

This prevents UI flicker.

---

# 5. Empty States

Empty states must guide users instead of feeling broken.

## Case 1: No Data in System

Show:

- Friendly message
- Explanation
- Primary action (e.g., "Add Asset")

## Case 2: No Results from Filter

Show:

- “No results found”
- Clear filter button
- Suggest adjusting filters

Example:

```
No results found.
Try adjusting your filters or clearing search.
[Clear Filters]
```

---

# 6. Error States

Errors must be clear and actionable.

## Network Error

- Show inline error above table
- Provide retry option

## Partial Failure (e.g., export failed)

- Non-blocking toast notification
- Clear explanation
- Retry button

We avoid technical error messages.  
Users see meaningful feedback.

---

# 7. Error Boundaries Strategy

In addition to UI-level error handling, we implement React Error Boundaries.

Purpose:

- Prevent entire app from crashing
- Isolate component-level failures
- Show fallback UI gracefully

---

## Error Boundary Placement

- Page-level error boundary
- Table-level error boundary

Example:

```tsx
<ErrorBoundary fallback={<TableErrorFallback />}>
  <InventoryTable />
</ErrorBoundary>
```

If a rendering error occurs inside the table:

- The rest of the page remains functional
- A clear fallback UI is shown
- Error can be logged for monitoring

In Next.js App Router, route-level `error.tsx` files are also used for page-level fallback handling.

---

# 8. Reducing Complexity

Large datasets create cognitive overload. We reduce complexity through:

---

## 1. Progressive Disclosure

- Advanced filters hidden under “More Filters”
- Bulk actions only visible when rows selected
- Secondary actions inside row menu

---

## 2. Clear Defaults

- Default sort applied
- Default page size set
- Most important columns shown first

---

## 3. Predictable Interaction Model

We prefer pagination over infinite scroll because:

- It is simpler and predictable
- Works better with accessibility tools
- Makes position in dataset clear
- Avoids scroll-position complexity

---

## 4. Visual Clarity

- High contrast headers
- Sticky table header
- Hover states for rows
- Clear row selection indicators

---

# 9. Drill-Down Strategy

Clicking a row opens a detail page.

We ensure:

- Row is clearly clickable
- Breadcrumb shows navigation context
- Back navigation preserves filters

Users should never lose context when navigating.
