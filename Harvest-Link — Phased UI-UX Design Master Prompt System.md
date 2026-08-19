# HARVEST-LINK
## PHASED UI/UX DESIGN SYSTEM
### Sequential Master Prompts for the Design Agent

---

# HOW TO USE THIS SYSTEM

Do NOT give the design agent the entire original UI/UX prompt at once.

Run the phases sequentially.

Each phase has four parts:

1. **Objective**
2. **Context**
3. **Instructions**
4. **Required output**

At the end of every phase, the agent must produce a:

> **PHASE LOCK**

The Phase Lock contains the decisions that are now frozen.

The next phase must treat the previous Phase Lock as immutable unless a genuine contradiction is discovered.

The design agent must never silently change:

- product positioning
- user roles
- business logic
- screen relationships
- core navigation
- terminology
- brand direction
- component conventions
- previously approved design decisions

without explicitly identifying the conflict.

---

# MASTER OPERATING RULE

You are designing Harvest-Link across multiple sequential design phases.

You must behave like one continuous design team working on one product.

Do not restart your thinking at each phase.

Do not reinterpret the product every time.

Do not introduce unrelated concepts.

Every new decision must build on previous decisions.

The product source of truth is:

```text
Farmer
↓
Farm
↓
Produce
↓
Fresco
↓
Listing
↓
Consumer
↓
Order
↓
Payment
↓
Fulfillment
↓
Activity
↓
FEAP
↓
Financial Passport
↓
Consent
↓
Wema
```

Harvest-Link is:

> **Agricultural financial infrastructure.**

Tagline:

> **From farm activity to financial identity.**

Core product thesis:

> Harvest-Link converts real agricultural activity into structured financial identity.

The marketplace creates economic activity.

Fresco enriches that activity.

FEAP structures that activity.

The Financial Passport explains that activity to the farmer.

Consent enables controlled sharing.

The Wema layer makes authorized activity visible to the bank.

Wema independently makes financial decisions.

---

# GLOBAL DESIGN CONSTRAINTS

These constraints apply to every phase.

## Anti-AI aesthetic

Never create:

- generic SaaS aesthetics
- generic fintech templates
- Inter as the default typeface
- indigo-purple gradients
- neon AI glows
- excessive rounded cards
- excessive shadows
- generic AI spark icons
- generic three-card hero sections
- random bold/italic emphasis
- generic startup copy
- meaningless eyebrow pills
- AI-generated stock illustrations
- repetitive card grids
- decorative UI without function

The product must feel authored.

---

# CORE DESIGN PHILOSOPHY

The guiding principle is:

> **Expensive simplicity.**

The interface should hide complexity instead of exposing it.

It should feel:

- sophisticated
- calm
- premium
- human
- trustworthy
- distinctly agricultural
- distinctly financial
- modern
- African without cliché
- intelligent without looking like AI-generated software

---

# PHASE 1 — PRODUCT & UX FOUNDATION

## Objective

Before designing anything visual, fully understand the product system.

Do NOT select fonts.

Do NOT select colors.

Do NOT design screens.

Do NOT produce high-fidelity UI.

First understand what Harvest-Link actually is.

---

## Instructions

Analyze:

### 1. Product thesis

Why Harvest-Link exists.

### 2. Users

Farmer  
Consumer  
Wema analyst  
Wema administrator

### 3. Business model

Understand the marketplace, transaction model and future financial ecosystem.

### 4. Core product layers

Marketplace  
Fresco  
FEAP  
Wema intelligence

### 5. Farmer lifecycle

From onboarding to transaction to financial identity.

### 6. Consumer lifecycle

From discovery to purchase to repeat behavior.

### 7. Wema lifecycle

From portfolio visibility to farmer review.

### 8. Product dependencies

Understand what must happen before something else can happen.

---

## Required output

Produce:

### A. Product mental model

One concise diagram explaining how the product works.

### B. User roles

For each role:

- goals
- motivations
- fears
- needs
- primary tasks
- important information
- success criteria

### C. Product hierarchy

Identify:

**Core**

**Secondary**

**Supporting**

**Future**

### D. User journey map

For:

- farmer
- consumer
- Wema

### E. Product state map

Map:

```text
Onboarding
→ Listing
→ Scan
→ Order
→ Payment
→ Fulfillment
→ Activity
→ FEAP
→ Passport
→ Consent
→ Wema
```

### F. Information hierarchy

Identify what information belongs at:

- glance
- decision
- detail
- advanced

### G. UX risks

Identify:

- confusing flows
- unnecessary friction
- excessive complexity
- trust risks
- financial misunderstanding
- mobile usability risks

### H. UX opportunities

Identify the few places where exceptional UX can become a competitive advantage.

---

## PHASE 1 LOCK

End with:

# PHASE 1 LOCK

Include:

- finalized product mental model
- user roles
- journey maps
- information architecture principles
- core product hierarchy
- UX priorities
- UX risks
- non-negotiable business logic

State:

> “These decisions are now frozen for subsequent phases.”

---

# PHASE 2 — BRAND & VISUAL DIRECTION

## Objective

Now establish **what Harvest-Link should feel like** before designing the design system.

Do not design individual screens yet.

---

## Instructions

Explore the psychological intersection of:

### Agriculture

- grounded
- natural
- productive
- local
- tangible

### Finance

- trustworthy
- stable
- precise
- credible
- mature

### Technology

- intelligent
- efficient
- modern
- scalable

### African context

- authentic
- contemporary
- locally relevant
- not stereotypical

Create one coherent visual language.

---

## Anti-AI test

Ask:

> Could this design have been generated from a generic “modern fintech SaaS” prompt?

If yes, reject it.

---

## Typography

Choose the final type system.

You may evaluate:

- Cormorant Garamond
- Space Grotesk
- alternatives

But make one final choice.

Define:

- display
- headings
- body
- labels
- numeric data
- utility text

Specify:

- font
- weight
- size
- line height
- tracking
- responsive behavior

---

## Color

Create the actual color system.

Starting palette:

```text
Grain White
#F5EFE6

Deep Charcoal
#1A1A1A

Forest Moss
#2D4739

Burnt Clay
#B3541E

Sun Yellow
#FFC107
```

You may refine this.

Do not randomly replace it.

Every change must be justified.

Create:

- base palette
- semantic palette
- financial palette
- freshness palette
- status palette
- dark surfaces
- text
- borders
- interactive states

---

## Shape language

Determine:

- radius philosophy
- button shape
- card shape
- input shape
- image shape
- data visualization shape

Avoid making everything rounded.

---

## Photography

Define:

- subject matter
- crop
- lighting
- composition
- color treatment
- human representation
- agricultural representation

No fake-looking stock imagery.

---

## Spatial language

Define how depth is created using:

- layering
- overlap
- scale
- tonal difference
- motion

Avoid excessive shadows.

---

## Required output

Produce:

1. Brand personality
2. Visual positioning
3. Typography selection
4. Color direction
5. Shape language
6. Photography direction
7. Illustration direction
8. Spatial language
9. Anti-AI rules
10. Three visual reference descriptions

Do not produce 20 alternatives.

Choose one strong direction.

---

## PHASE 2 LOCK

Freeze:

- typography
- palette
- brand personality
- shape language
- image direction
- spatial direction

These become immutable in later phases.

---

# PHASE 3 — DESIGN SYSTEM FOUNDATION

## Objective

Turn the visual direction into a reusable production design system.

Still do not design every application screen.

---

## Instructions

Create the complete foundations.

### Typography tokens

Define:

```text
Display XL
Display L
Display M
Heading 1
Heading 2
Heading 3
Body Large
Body
Body Small
Caption
Numeric XL
Numeric Large
Numeric
```

Give actual values.

---

### Color tokens

Define:

```text
background
surface
surface-subtle
foreground
foreground-muted
border
primary
secondary
success
warning
danger
info
```

Also:

```text
freshness.excellent
freshness.good
freshness.fair
freshness.poor

feap.emerging
feap.developing
feap.established
feap.strong
```

---

### Spacing system

Create a real spacing scale.

But explicitly explain how spacing changes based on hierarchy.

---

### Grid

Define:

- mobile
- tablet
- desktop
- maximum width
- gutters
- columns
- page margins

---

### Radius

Create:

```text
none
small
medium
large
full
```

Explain where each is used.

---

### Borders

Define:

- standard
- subtle
- strong
- interactive

---

### Motion

Create:

```text
micro
fast
base
slow
emphasized
```

Define easing.

---

### Icons

Define:

- size
- stroke
- optical weight
- when icons appear
- when icons are unnecessary

---

## Component foundation

Create foundational components:

### Buttons

- primary
- secondary
- tertiary
- destructive
- contextual

### Inputs

- text
- numeric
- search
- select
- date
- checkbox
- switch
- upload

### Navigation

- top nav
- bottom nav
- sidebar
- tabs
- breadcrumb
- stepper

### Data

- metric
- status
- badge
- timeline
- table
- score
- chart

---

## Required output

Produce the actual:

- design tokens
- component inventory
- component anatomy
- component variants
- component states

Do not design complete pages yet.

---

## PHASE 3 LOCK

Freeze:

- token system
- component naming
- typography
- color
- spacing
- motion
- responsive rules
- component behavior

---

# PHASE 4 — INFORMATION ARCHITECTURE & SCREEN SYSTEM

## Objective

Now determine exactly **what screens exist and how they connect**.

Do not make high-fidelity visual decisions yet.

---

# PUBLIC

Define:

```text
Landing
About
How it works
Wema concept
Login
Signup
```

---

# FARMER

Define:

```text
Onboarding
Home
Farm
Listings
Create listing
Fresco scanner
Fresco result
Inventory
Orders
Order detail
Revenue/activity
Financial Passport
Passport detail
Score event
Consent
AI assistant
Profile
Settings
Support
```

---

# CONSUMER

Define:

```text
Home
Discovery
Map
Farm
Produce
Cart
Checkout
Payment
Order confirmation
Order tracking
Order history
Review
```

---

# WEMA

Define:

```text
Login
Portfolio
Farmers
Farmer profile
Activity analytics
Financial review pipeline
Consent
Comparison
Reports
Settings
```

---

# REQUIRED OUTPUT

For every screen define:

- purpose
- user
- entry point
- primary action
- secondary action
- information
- next state
- previous state
- dependencies

Then create:

## Screen relationship map

```text
LANDING
↓
SIGNUP
↓
FARMER ONBOARDING
↓
FARMER HOME
↓
CREATE LISTING
↓
FRESCO
↓
PUBLISH
↓
CONSUMER
↓
ORDER
↓
PAYMENT
↓
FULFILLMENT
↓
FEAP
↓
PASSPORT
↓
CONSENT
↓
WEMA
```

---

## PHASE 4 LOCK

The complete screen inventory and flow architecture are now frozen.

Do not invent new primary screens later unless the product requirements explicitly change.

---

# PHASE 5 — CORE EXPERIENCE DESIGN

## Objective

Now design the most important user journeys first.

Do NOT design all 50+ screens simultaneously.

Design the central product loop.

---

# CORE FLOW

Design these first:

```text
Farmer onboarding
↓
Farmer Home
↓
Create Listing
↓
Fresco Scan
↓
Fresco Result
↓
Publish Listing
↓
Consumer Discovery
↓
Produce Detail
↓
Checkout
↓
Payment
↓
Farmer Order
↓
Fulfillment
↓
FEAP Update
↓
Financial Passport
```

This is the heartbeat of Harvest-Link.

---

## For each screen

Specify:

### Layout

Exact structure.

### Content

Actual UI copy.

### Hierarchy

What the eye sees first.

### Action

What the user does.

### Motion

How the transition occurs.

### States

Default  
Loading  
Success  
Error  
Empty  
Offline

### Mobile

Exact adaptation.

---

## Focus screens

Spend most design effort on:

### 1. Farmer Home

### 2. Create Listing

### 3. Fresco Scan

### 4. Fresco Result

### 5. Consumer Discovery

### 6. Produce Detail

### 7. Checkout

### 8. Farmer Order

### 9. Financial Passport

These are the product's most important screens.

---

## PHASE 5 LOCK

Freeze the visual language of the core product flow.

Do not redesign the core flow while working on secondary screens.

---

# PHASE 6 — SECONDARY FLOWS & EDGE CASES

## Objective

Expand the core system without changing its foundations.

Now design:

### Farmer

- inventory
- history
- revenue
- score event
- assistant
- settings
- support
- consent

### Consumer

- farm profile
- order history
- review
- empty discovery
- failed payment
- unavailable produce

### Wema

- portfolio
- farmer list
- farmer detail
- analytics
- review pipeline
- reports

---

# EDGE STATES

Every important screen needs:

## Loading

Use structural skeletons.

## Empty

Explain why it is empty and what to do.

## Error

Explain:

- what happened
- what was preserved
- what to do

## Offline

Especially farmer.

## Permission denied

Especially Wema.

## Unauthorized

Authentication required.

## Not found

Resource no longer exists.

---

# PHASE 6 LOCK

All secondary screens and edge states now inherit the system established in Phases 1–5.

No new visual language is allowed.

---

# PHASE 7 — MICRO-INTERACTIONS, MOTION & POLISH

## Objective

Now improve usability and emotional quality without adding unnecessary decoration.

---

## Define interactions for:

### Buttons

- hover
- press
- focus
- disabled

### Forms

- validation
- success
- error
- autosave

### Fresco

- detection
- capture
- analysis
- result

### Orders

- placed
- paid
- accepted
- preparing
- fulfilled

### FEAP

- score update
- event creation
- milestone

### Consent

- open
- review
- accept
- success
- revoke

### AI

- thinking
- tool retrieval
- answer
- failure

---

# MOTION PRINCIPLE

Animation must communicate:

- cause
- response
- continuation
- hierarchy

Not decoration.

---

# REQUIRED OUTPUT

For every significant interaction:

```text
Trigger
↓
Visual response
↓
Duration
↓
Easing
↓
Purpose
↓
Reduced-motion behavior
```

---

# PHASE 7 LOCK

Freeze the interaction language.

---

# PHASE 8 — PRODUCTION HANDOFF & HACKATHON OPTIMIZATION

## Objective

Translate the entire design system into something engineers can build and the hackathon team can reliably demonstrate.

---

# DEVELOPER HANDOFF

For every major screen provide:

- container
- layout
- grid
- spacing
- typography token
- colors
- component names
- states
- breakpoints
- Tailwind strategy
- CSS variable mapping
- animations
- accessibility

---

# TAILWIND

Translate:

```text
design token
→ Tailwind token
→ component usage
```

Do not output random utility-class collections.

---

# RESPONSIVE HANDOFF

For every major component describe:

### Mobile

What changes.

### Tablet

What changes.

### Desktop

What changes.

---

# ACCESSIBILITY

Check:

- contrast
- focus
- keyboard
- touch targets
- screen readers
- reduced motion
- semantic markup
- form accessibility

---

# PERFORMANCE

Ensure:

- image optimization
- lazy loading
- low-motion cost
- no heavy blur effects
- no unnecessary animation
- Core Web Vitals awareness

---

# HACKATHON OPTIMIZATION

The visual system must prioritize three moments.

## MOMENT 1 — FRESCO

A farmer scans produce.

## MOMENT 2 — FEAP

A completed transaction updates the financial profile.

## MOMENT 3 — WEMA

The bank dashboard reveals the farmer's structured activity.

These three transitions should receive exceptional polish.

---

# HACKATHON DEMO FLOW

The entire demonstration should visually follow:

```text
AMAKA
↓
FARM
↓
SCAN
↓
LIST
↓
BUY
↓
PAY
↓
FULFILL
↓
ACTIVITY
↓
FEAP
↓
CONSENT
↓
WEMA
```

The interface should make these transitions feel like one continuous story.

---

# FINAL PHASE — DESIGN QA

Before considering the product finished, audit everything.

Ask:

### Identity

Does it unmistakably feel like Harvest-Link?

### Simplicity

Can the farmer understand it?

### Differentiation

Does it avoid generic AI/SaaS aesthetics?

### Consistency

Do all surfaces feel like one product?

### User flow

Can users move from one action to the next naturally?

### Financial trust

Does the passport avoid pretending to be a credit score?

### AI credibility

Does Fresco look like real infrastructure rather than AI decoration?

### Wema credibility

Does the bank interface look institutional?

### Mobile

Can a low-to-mid-range Android user use the core flow?

### Edge cases

Have loading, empty, offline and error states been designed?

### Performance

Can the motion and visuals be implemented without harming performance?

---

# FINAL OUTPUT

After all phases are complete, compile the approved work into:

## HARVEST-LINK DESIGN SYSTEM & PRODUCT UI SPECIFICATION

Containing:

1. Design strategy
2. Brand direction
3. Typography
4. Color
5. Spacing
6. Grid
7. Shape
8. Components
9. Information architecture
10. Navigation
11. User flows
12. Full screen inventory
13. High-fidelity specifications
14. Responsive behavior
15. Edge states
16. Motion
17. Accessibility
18. Tailwind/CSS implementation
19. Developer handoff
20. Hackathon demo specification

---

# NON-NEGOTIABLE CONTINUITY RULE

At the beginning of every new phase, review the previous Phase Lock.

Then state:

> “I will preserve all locked decisions from previous phases unless a contradiction is explicitly identified.”

If a new idea conflicts with an earlier decision:

DO NOT silently change it.

Instead:

1. identify the conflict
2. explain why it exists
3. propose the minimum necessary change
4. wait for explicit approval if the change affects a locked foundation

---

# FINAL DESIGN PRINCIPLE

The product should feel:

> **simple at the surface, sophisticated underneath.**

The farmer should see:

> Sell → Manage → Scan → Grow.

The consumer should see:

> Discover → Trust → Buy → Receive.

Wema should see:

> Observe → Understand → Evaluate.

Behind those simple interfaces is:

```text
Marketplace
+
AI
+
Transactions
+
Operational data
+
Financial identity
+
Bank intelligence
```

That complexity belongs in the architecture.

Not in the user's face.