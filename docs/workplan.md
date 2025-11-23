# VCR Calculator - Work Plan

## Project Overview

**Goal:** Create a mobile-first, static website for calculating Critical Velocity (CV) and training zones for runners.

**Tech Stack:** React + Vite + Tailwind CSS, deployed to GitHub Pages

**Key Features:**

- Multiple CV test protocols (30min distance, 2-point maximal)
- CV-based 5-zone training pace calculator
- Mobile-first responsive design
- Results export (Phase 2)

---

## Implementation Phases

### Phase 0: Documentation & Research ✓ IN PROGRESS

**Objectives:**

- Establish research documentation for transparency and reproducibility
- Analyze reference implementations
- Document formulas and zone definitions

**Tasks:**

- [x] Create `docs/` directory structure
- [x] Create work plan document (`docs/workplan.md`)
- [x] Research CV formulas from reference site
- [x] Create formulas documentation (`docs/formulas.md`)
- [x] Create zones documentation (`docs/zones.md`)

**Research Sources:**

- Primary: https://frontrunnersports.com.au/runningsquads/pacezonecalculator/
- Reference: "Lange, G.; Pöhlitz, L. 1995" (cited by reference site)
- Secondary: Pöhlitz, L., & Valentin, J. (2015). _Trainingspraxis Laufen: Beiträge zum Leistungstraining_ (Vol. 1). Meyer & Meyer Verlag.
- Fallback: Reverse-engineer reference site calculations if primary sources unavailable

**Validation Strategy:**

- Compare our calculations to reference site results
- Ensure consistency with established training zone calculators
- Document any deviations with rationale

---

### Phase 1: Utilities & Calculations

**Objectives:**

- Implement calculation logic based on researched formulas
- Create reusable utility functions
- Ensure calculations match reference site

**Directory Structure:**

```
src/
├── utils/
│   ├── calculations/
│   │   ├── cvCalculators.js    # CV calculation for different tests
│   │   ├── paceConversions.js  # CV → min/km, min/mile
│   │   └── zoneCalculators.js  # 5-zone pace ranges
│   ├── formatters.js           # Display formatting
│   └── validators.js           # Input validation
└── constants/
    ├── testTypes.js            # Test configurations
    └── zoneDefinitions.js      # Zone system definitions
```

**Tasks:**

- [ ] Implement 30min distance test CV calculator
- [ ] Implement 2-point maximal effort test calculator
- [ ] Create pace conversion utilities (m/s → min/km, min/mile)
- [ ] Implement CV-based 5-zone calculator
- [ ] Create formatters for time, pace, distance
- [ ] Add input validation logic
- [ ] Write unit tests for calculations (optional but recommended)

**Success Criteria:**

- Calculations match reference site results
- All edge cases handled (invalid inputs, boundary values)
- Code documented with formula references

---

### Phase 2: UI Component Library

**Objectives:**

- Build reusable, accessible UI components with Tailwind
- Establish consistent design system
- Mobile-first responsive design

**Components:**

```
src/components/ui/
├── Input.jsx      # Number/distance input with validation
├── Button.jsx     # Primary action button
├── Card.jsx       # Container component
└── Select.jsx     # Dropdown component
```

**Tasks:**

- [ ] Create `Input` component (number/distance, validation states)
- [ ] Create `Button` component (primary, secondary variants)
- [ ] Create `Card` component (consistent spacing, shadows)
- [ ] Create `Select` component (dropdown with mobile optimization)
- [ ] Implement consistent color scheme and typography
- [ ] Ensure accessibility (ARIA labels, keyboard navigation)

**Design Considerations:**

- Mobile-first (touch targets, readable fonts)
- Consistent spacing using Tailwind scale
- Clear error states and feedback
- Loading states for async operations

---

### Phase 3: Calculator Implementation

**Objectives:**

- Build core calculator flow
- Implement input → calculation → results journey
- Create dynamic UI based on test selection

**Component Structure:**

```
src/components/
├── layout/
│   ├── Header.jsx
│   └── Footer.jsx
├── calculator/
│   ├── TestSelector.jsx
│   ├── TestInput.jsx
│   └── CalculateButton.jsx
└── results/
    ├── ResultsPanel.jsx
    ├── CVDisplay.jsx
    └── ZonesTable.jsx
```

**Tasks:**

- [ ] Create `TestSelector` - dropdown for test type selection
- [ ] Create `TestInput` - dynamic inputs based on selected test
- [ ] Create `CalculateButton` - trigger calculation with validation
- [ ] Create `ResultsPanel` - container with animation
- [ ] Create `CVDisplay` - show CV value and converted paces
- [ ] Create `ZonesTable` - display 5 training zones with pace ranges
- [ ] Update `App.jsx` with state management
- [ ] Implement smooth scroll/transition to results
- [ ] Add unit system toggle (metric/imperial)

**User Journey:**

1. Page loads with banner, test selector, and input form
2. User selects test type (30min or 2-point)
3. Input fields update dynamically based on test
4. User enters data and clicks Calculate
5. Animation/transition to results view
6. Results show: test info, CV value, paces, zones table
7. Input section remains at top for easy recalculation

---

### Phase 4: Testing & Polish

**Objectives:**

- Validate against reference site
- Optimize mobile experience
- Fix bugs and edge cases

**Tasks:**

- [ ] Cross-validate calculations with reference site
- [ ] Test on multiple mobile devices/browsers
- [ ] Optimize loading states and animations
- [ ] Add helpful error messages
- [ ] Accessibility audit (screen readers, keyboard nav)
- [ ] Performance optimization (bundle size, lazy loading)
- [ ] Add meta tags for SEO
- [ ] Update README with usage instructions

**Testing Checklist:**

- [ ] 30min test matches reference site
- [ ] 2-point test matches reference site
- [ ] Metric/imperial conversions accurate
- [ ] All zones display correctly
- [ ] Mobile touch interactions smooth
- [ ] Works on iOS Safari, Android Chrome
- [ ] Handles invalid inputs gracefully
- [ ] Accessible to screen readers

---

## Future Phases (Post-MVP)

### Phase 5: Export Feature

- Export results as image
- Customizable export (date, HR, notes)
- Share functionality

### Phase 6: Additional Features

- More test protocols (3min+9min, ramp tests)
- VDOT-based zones (Jack Daniels)
- Test history/persistence
- Visual charts/graphs
- Progressive Web App features

---

## Success Metrics

**Phase 0:**

- Research documented with proper citations
- Formulas validated against reference site

**MVP (Phases 1-4):**

- Calculator functional with 2 test types
- Calculations match reference site
- Mobile-responsive and accessible
- Deployed to GitHub Pages

**Quality Gates:**

- All calculations verified
- No console errors
- Passes accessibility audit
- Works on mobile devices
- Fast load time (<2s)

---

## Timeline

**Phase 0:** Documentation & Research
**Phase 1-2:** Utilities & UI Components
**Phase 3:** Calculator Implementation
**Phase 4:** Testing & Polish
**Phase 5+:** Future enhancements

_Note: This is a living document. Update as implementation progresses._

---

Last Updated: 2025-11-23
