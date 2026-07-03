// Real WCAG 2.2 Level A and AA success criteria — this data IS the product.
// Each entry: id (official criterion number), title (official name),
// level (A/AA), guideline (grouping), and plain (a plain-English
// explanation, since a guided tool has to explain what each criterion
// actually means, not just recite the terse official title).

export const PRINCIPLES = [
    { id: 'perceivable', label: '1. Perceivable' },
    { id: 'operable', label: '2. Operable' },
    { id: 'understandable', label: '3. Understandable' },
    { id: 'robust', label: '4. Robust' }
];

export const CONFORMANCE_LEVELS = [
    { id: 'supports', label: 'Supports' },
    { id: 'partially-supports', label: 'Partially Supports' },
    { id: 'does-not-support', label: 'Does Not Support' },
    { id: 'not-applicable', label: 'Not Applicable' },
    { id: 'not-evaluated', label: 'Not Evaluated' }
];

export const CRITERIA = [
    // --- 1. Perceivable ---
    { id: '1.1.1', title: 'Non-text Content', level: 'A', principle: 'perceivable', guideline: '1.1 Text Alternatives', plain: 'Images, icons, and other non-text content have a text alternative (e.g. alt text) that serves the same purpose.' },
    { id: '1.2.1', title: 'Audio-only and Video-only (Prerecorded)', level: 'A', principle: 'perceivable', guideline: '1.2 Time-based Media', plain: 'Prerecorded audio-only or video-only content has a text transcript or audio description.' },
    { id: '1.2.2', title: 'Captions (Prerecorded)', level: 'A', principle: 'perceivable', guideline: '1.2 Time-based Media', plain: 'Prerecorded video with sound has accurate captions.' },
    { id: '1.2.3', title: 'Audio Description or Media Alternative (Prerecorded)', level: 'A', principle: 'perceivable', guideline: '1.2 Time-based Media', plain: 'Prerecorded video has an audio description or a full text alternative describing the visuals.' },
    { id: '1.2.4', title: 'Captions (Live)', level: 'AA', principle: 'perceivable', guideline: '1.2 Time-based Media', plain: 'Live video with sound has accurate real-time captions.' },
    { id: '1.2.5', title: 'Audio Description (Prerecorded)', level: 'AA', principle: 'perceivable', guideline: '1.2 Time-based Media', plain: 'Prerecorded video has an audio description track covering important visual information.' },
    { id: '1.3.1', title: 'Info and Relationships', level: 'A', principle: 'perceivable', guideline: '1.3 Adaptable', plain: 'Headings, lists, and other visual structure are marked up properly so assistive tech understands the relationships, not just the visual layout.' },
    { id: '1.3.2', title: 'Meaningful Sequence', level: 'A', principle: 'perceivable', guideline: '1.3 Adaptable', plain: 'Content reads in a sensible order when linearized (e.g. by a screen reader), not just visually.' },
    { id: '1.3.3', title: 'Sensory Characteristics', level: 'A', principle: 'perceivable', guideline: '1.3 Adaptable', plain: 'Instructions don’t rely solely on shape, color, size, or position ("click the round button") to be understood.' },
    { id: '1.3.4', title: 'Orientation', level: 'AA', principle: 'perceivable', guideline: '1.3 Adaptable', plain: 'Content isn’t locked to a single display orientation (portrait or landscape) unless essential.' },
    { id: '1.3.5', title: 'Identify Input Purpose', level: 'AA', principle: 'perceivable', guideline: '1.3 Adaptable', plain: 'Common input fields (name, email, address) are programmatically identified so browsers/assistive tech can autofill or explain them.' },
    { id: '1.4.1', title: 'Use of Color', level: 'A', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'Color isn’t the only way information is conveyed (e.g. errors also have text or an icon, not just red).' },
    { id: '1.4.2', title: 'Audio Control', level: 'A', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'Audio that plays automatically for more than 3 seconds can be paused, stopped, or muted.' },
    { id: '1.4.3', title: 'Contrast (Minimum)', level: 'AA', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'Text has a contrast ratio of at least 4.5:1 against its background (3:1 for large text).' },
    { id: '1.4.4', title: 'Resize Text', level: 'AA', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'Text can be resized up to 200% without loss of content or functionality.' },
    { id: '1.4.5', title: 'Images of Text', level: 'AA', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'Real text is used instead of images of text, except for logos or where the exact presentation is essential.' },
    { id: '1.4.10', title: 'Reflow', level: 'AA', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'Content reflows to a single column at narrow widths/high zoom without needing to scroll in two directions.' },
    { id: '1.4.11', title: 'Non-text Contrast', level: 'AA', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'UI components (buttons, form borders) and graphics have at least 3:1 contrast against adjacent colors.' },
    { id: '1.4.12', title: 'Text Spacing', level: 'AA', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'No content is lost or clipped when a user increases line height, paragraph spacing, letter spacing, or word spacing.' },
    { id: '1.4.13', title: 'Content on Hover or Focus', level: 'AA', principle: 'perceivable', guideline: '1.4 Distinguishable', plain: 'Tooltips/popovers triggered by hover or focus can be dismissed, don’t obscure content, and stay visible while being interacted with.' },

    // --- 2. Operable ---
    { id: '2.1.1', title: 'Keyboard', level: 'A', principle: 'operable', guideline: '2.1 Keyboard Accessible', plain: 'Every function works using only a keyboard, with no mouse required.' },
    { id: '2.1.2', title: 'No Keyboard Trap', level: 'A', principle: 'operable', guideline: '2.1 Keyboard Accessible', plain: 'Keyboard focus can always move away from any component, never getting stuck.' },
    { id: '2.1.4', title: 'Character Key Shortcuts', level: 'A', principle: 'operable', guideline: '2.1 Keyboard Accessible', plain: 'Single-character keyboard shortcuts can be turned off, remapped, or only work while a component has focus.' },
    { id: '2.2.1', title: 'Timing Adjustable', level: 'A', principle: 'operable', guideline: '2.2 Enough Time', plain: 'Time limits can be turned off, adjusted, or extended by the user before they expire.' },
    { id: '2.2.2', title: 'Pause, Stop, Hide', level: 'A', principle: 'operable', guideline: '2.2 Enough Time', plain: 'Moving, blinking, scrolling, or auto-updating content can be paused, stopped, or hidden by the user.' },
    { id: '2.3.1', title: 'Three Flashes or Below Threshold', level: 'A', principle: 'operable', guideline: '2.3 Seizures and Physical Reactions', plain: 'Nothing on the page flashes more than three times per second.' },
    { id: '2.4.1', title: 'Bypass Blocks', level: 'A', principle: 'operable', guideline: '2.4 Navigable', plain: 'There’s a way to skip repeated navigation/blocks (e.g. a "skip to main content" link).' },
    { id: '2.4.2', title: 'Page Titled', level: 'A', principle: 'operable', guideline: '2.4 Navigable', plain: 'Every page has a descriptive, accurate title.' },
    { id: '2.4.3', title: 'Focus Order', level: 'A', principle: 'operable', guideline: '2.4 Navigable', plain: 'Keyboard focus moves through content in a logical, meaningful order.' },
    { id: '2.4.4', title: 'Link Purpose (In Context)', level: 'A', principle: 'operable', guideline: '2.4 Navigable', plain: 'A link’s purpose is clear from its text alone or its surrounding context, not just "click here".' },
    { id: '2.4.5', title: 'Multiple Ways', level: 'AA', principle: 'operable', guideline: '2.4 Navigable', plain: 'There’s more than one way to find a page (e.g. search plus a nav menu), unless it’s a single step in a process.' },
    { id: '2.4.6', title: 'Headings and Labels', level: 'AA', principle: 'operable', guideline: '2.4 Navigable', plain: 'Headings and form labels describe the topic or purpose clearly.' },
    { id: '2.4.7', title: 'Focus Visible', level: 'AA', principle: 'operable', guideline: '2.4 Navigable', plain: 'The current keyboard focus is always visually indicated.' },
    { id: '2.4.11', title: 'Focus Not Obscured (Minimum)', level: 'AA', principle: 'operable', guideline: '2.4 Navigable', plain: 'When an element has keyboard focus, at least part of it isn’t hidden by other content (e.g. a sticky header).' },
    { id: '2.5.1', title: 'Pointer Gestures', level: 'A', principle: 'operable', guideline: '2.5 Input Modalities', plain: 'Anything operated with a multi-point or path-based gesture (pinch, swipe) also works with a single tap/click.' },
    { id: '2.5.2', title: 'Pointer Cancellation', level: 'A', principle: 'operable', guideline: '2.5 Input Modalities', plain: 'A press-and-release action can be aborted before completion (e.g. by dragging away before releasing).' },
    { id: '2.5.3', title: 'Label in Name', level: 'A', principle: 'operable', guideline: '2.5 Input Modalities', plain: 'The visible text label of a control is included in its accessible name, so voice-control users can refer to it by what they see.' },
    { id: '2.5.4', title: 'Motion Actuation', level: 'A', principle: 'operable', guideline: '2.5 Input Modalities', plain: 'Functions triggered by device motion (shaking, tilting) can also be triggered by a standard control, and motion triggering can be disabled.' },
    { id: '2.5.7', title: 'Dragging Movements', level: 'AA', principle: 'operable', guideline: '2.5 Input Modalities', plain: 'Anything operated by dragging can also be done with a single, non-dragging action (e.g. tap-and-tap instead of drag).' },
    { id: '2.5.8', title: 'Target Size (Minimum)', level: 'AA', principle: 'operable', guideline: '2.5 Input Modalities', plain: 'Clickable/tappable targets are at least 24×24 CSS pixels, or have enough spacing, unless an exception applies.' },

    // --- 3. Understandable ---
    { id: '3.1.1', title: 'Language of Page', level: 'A', principle: 'understandable', guideline: '3.1 Readable', plain: 'The page’s primary language is set programmatically (e.g. `lang="en"`), so screen readers use correct pronunciation.' },
    { id: '3.1.2', title: 'Language of Parts', level: 'AA', principle: 'understandable', guideline: '3.1 Readable', plain: 'Any passage in a different language than the page default is marked with its own `lang` attribute.' },
    { id: '3.2.1', title: 'On Focus', level: 'A', principle: 'understandable', guideline: '3.2 Predictable', plain: 'Giving an element keyboard focus never triggers an unexpected change of context (e.g. auto-submitting a form).' },
    { id: '3.2.2', title: 'On Input', level: 'A', principle: 'understandable', guideline: '3.2 Predictable', plain: 'Changing a form value never triggers an unexpected change of context unless the user was warned in advance.' },
    { id: '3.2.3', title: 'Consistent Navigation', level: 'AA', principle: 'understandable', guideline: '3.2 Predictable', plain: 'Repeated navigation appears in the same relative order across pages.' },
    { id: '3.2.4', title: 'Consistent Identification', level: 'AA', principle: 'understandable', guideline: '3.2 Predictable', plain: 'Components with the same function are labeled consistently across the product.' },
    { id: '3.2.6', title: 'Consistent Help', level: 'AA', principle: 'understandable', guideline: '3.2 Predictable', plain: 'If help (contact info, chat, FAQ link) is offered on multiple pages, it appears in the same relative order each time.' },
    { id: '3.3.1', title: 'Error Identification', level: 'A', principle: 'understandable', guideline: '3.3 Input Assistance', plain: 'Form errors are described in text, identifying which field is wrong.' },
    { id: '3.3.2', title: 'Labels or Instructions', level: 'A', principle: 'understandable', guideline: '3.3 Input Assistance', plain: 'Form fields have clear labels or instructions describing what’s expected.' },
    { id: '3.3.3', title: 'Error Suggestion', level: 'AA', principle: 'understandable', guideline: '3.3 Input Assistance', plain: 'When a known error is detected, a suggestion for fixing it is offered, unless doing so would be a security risk.' },
    { id: '3.3.4', title: 'Error Prevention (Legal, Financial, Data)', level: 'AA', principle: 'understandable', guideline: '3.3 Input Assistance', plain: 'For legal/financial/data-modifying actions, submissions are reversible, checked, or confirmed before finalizing.' },
    { id: '3.3.7', title: 'Redundant Entry', level: 'AA', principle: 'understandable', guideline: '3.3 Input Assistance', plain: 'Information the user already entered earlier in a process is auto-populated or available to select again, not re-typed from scratch.' },
    { id: '3.3.8', title: 'Accessible Authentication (Minimum)', level: 'AA', principle: 'understandable', guideline: '3.3 Input Assistance', plain: 'Logging in doesn’t require a cognitive test (like memorizing a password) unless an alternative method is also offered.' },

    // --- 4. Robust ---
    { id: '4.1.2', title: 'Name, Role, Value', level: 'A', principle: 'robust', guideline: '4.1 Compatible', plain: 'Custom UI components expose their name, role, and state (e.g. expanded/collapsed) to assistive technology.' },
    { id: '4.1.3', title: 'Status Messages', level: 'AA', principle: 'robust', guideline: '4.1 Compatible', plain: 'Status updates (e.g. "3 items added to cart") are announced to screen reader users without requiring focus to move.' }
];
