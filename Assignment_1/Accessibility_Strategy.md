# Accessibility Strategy

# 1. WCAG Level Target

We target **WCAG 2.1 Level AA** compliance.

Why AA:

- Industry standard for enterprise SaaS
- Required in many regulated environments
- Ensures proper keyboard and screen reader support
- Enforces sufficient color contrast
- Provides a strong balance between usability and practicality

Level AAA is ideal but often impractical for complex data-heavy systems.

---

# 2. Semantic-First Development

Accessibility begins with correct HTML usage.

We prioritize:

- Native semantic elements (`button`, `nav`, `table`, `form`, `label`)
- Proper heading hierarchy
- Explicit form labels
- Avoiding unnecessary ARIA when native elements suffice

Example:

```tsx
<label htmlFor="search">Search Inventory</label>
<input id="search" type="text" />
```

Custom components are built on top of semantic foundations rather than replacing them with generic div elements.

---

# 3. Keyboard Navigation

The entire application must be fully usable without a mouse.

Principles:

- All interactive elements reachable via `Tab`
- Logical and predictable tab order
- Visible focus indicators at all times
- All dialogs closable via `Escape`
- Dropdowns and menus operable with arrow keys

Large data tables:

- Sortable headers are keyboard accessible
- `aria-sort` used where applicable
- Row selection accessible via keyboard
- Pagination fully keyboard operable

Keyboard accessibility is verified manually during development.

---

# 4. Focus Management

Focus management is critical in complex enterprise applications.

We ensure:

- Focus moves to meaningful content after route changes
- Focus is trapped inside modals
- Focus returns to triggering element after modal closes
- On validation errors, focus moves to the first invalid field
- No unexpected focus shifts during dynamic updates

Example:

```tsx
if (formHasError) {
  errorRef.current?.focus();
}
```

Dynamic updates (like filtered results) do not forcibly move focus unless required.

---

# 5. Accessible Dynamic Updates

When UI updates dynamically:

- Result counts are announced using `aria-live="polite"`
- Status messages are screen-reader friendly
- Loading states are properly labeled

Example:

```tsx
<div role="status" aria-live="polite">
  50 results found
</div>
```

This ensures assistive technologies are aware of content changes.

---

# 6. Accessibility Testing Strategy

Accessibility testing happens at multiple levels.

## 1. Automated Testing

Tools used:

- `axe-core`
- `jest-axe`
- Lighthouse accessibility audits

Example:

```tsx
import { axe } from "jest-axe";

it("has no accessibility violations", async () => {
  const { container } = render(<InventoryTable />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Automated tools catch common issues such as missing labels, ARIA misuse, and contrast violations.

---

## 2. Manual Testing

Manual validation includes:

- Full keyboard-only navigation
- Screen reader testing (NVDA / VoiceOver)
- Zoom testing (up to 200%)
- High contrast mode testing

Automated tools do not catch all accessibility issues. Manual validation is mandatory for complex workflows.

---

## 3. E2E Testing

Using Playwright:

- Validate keyboard interaction flows
- Validate modal behavior
- Validate focus transitions

---

# 7. Preventing Accessibility Regressions

Accessibility must be enforced continuously.

## CI Integration

- Accessibility tests run in CI
- PRs fail if accessibility violations are introduced
- Lighthouse accessibility thresholds enforced

## Code Review Standards

During review, developers verify:

- Proper semantic HTML
- Correct labeling
- Keyboard operability
- Focus handling
- No unnecessary ARIA attributes

## Accessible Component Library

Shared UI components (buttons, inputs, modals, tables) are built accessibly by default.

This ensures accessibility scales across the entire platform without repeated implementation.
