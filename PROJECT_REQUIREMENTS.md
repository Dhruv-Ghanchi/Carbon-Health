# Product Requirements Document (PRD)

## Project Title

Working Title: Carbon Health Platform

(Note: Final product name will be decided later. All implementation should remain name-agnostic until branding is finalized.)

---

# 1. Project Overview

## Challenge Statement

Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

## Product Vision

The goal of this project is not to build a basic carbon footprint calculator.

The goal is to build a Carbon Health Platform that helps users:

1. Understand their environmental impact.
2. Identify the habits contributing most to their emissions.
3. Receive personalized reduction recommendations.
4. Follow actionable sustainability missions.
5. Track improvements over time.
6. Build long-term environmentally conscious habits.

The platform should feel like a sustainability coach rather than a calculator.

---

# 2. Core Product Philosophy

The product must follow this flow:

Understand
↓
Analyze
↓
Recommend
↓
Act
↓
Track
↓
Improve

The platform should prioritize clarity, usability, and actionability.

Users should never feel overwhelmed by technical carbon terminology.

The platform should convert awareness into action.

---

# 3. Target Audience

Primary Audience:

* Students
* Working professionals
* Families
* General public

The platform should be usable by users with no prior sustainability knowledge.

The UX must remain beginner-friendly.

---

# 4. Key Product Differentiator

Most carbon footprint tools:

Input Data
↓
Calculate
↓
Show Result

This platform:

Carbon Health Check
↓
Carbon Health Report
↓
Personalized Action Plan
↓
Awareness Feed
↓
Daily Check-In
↓
Weekly Review
↓
Carbon Journey
↓
Continuous Improvement

The primary differentiator is actionable sustainability guidance rather than footprint calculation alone.

---

# 5. Success Criteria

A successful user should be able to answer:

* What is my carbon footprint?
* What contributes most to it?
* What can I do to reduce it?
* Which actions have the highest impact?
* Am I improving over time?
* What should I focus on next?

---

# 6. Technical Constraints

Frontend:

* React
* Vite
* Tailwind CSS
* JavaScript

Storage:

* Local Storage

Database:

* None required

Authentication:

* Not required

Backend:

* Avoid unless absolutely necessary

Repository Constraints:

* Public repository
* Single branch
* Lightweight architecture
* Repository size under challenge limits

---

# 7. Product Architecture

The application should consist of the following major modules:

1. Carbon Health Check
2. Carbon Health Report
3. Carbon Score Engine
4. Recommendation Engine
5. Mission Engine
6. Awareness Feed
7. Daily Check-In System
8. Weekly Review System
9. Carbon Journey Timeline
10. AI Sustainability Coach
11. Progress Tracking System
12. Gamification System

---

# 8. Carbon Health Check (Onboarding)

Purpose:

Generate an initial sustainability profile for the user.

Target completion time:

60–90 seconds

Questions:

1. Household Size

Options:

* 1
* 2–3
* 4–5
* 5+

2. Primary Transport Mode

Options:

* Car
* Bike
* Metro
* Bus
* Mixed
* Walk/Cycle

3. Average Daily Commute Distance

Options:

* 0–5 km
* 5–10 km
* 10–20 km
* 20+ km

4. Air Conditioner Usage

Options:

* Rarely
* Sometimes
* Daily
* Most of the Day

5. Meat Consumption

Options:

* Never
* Occasionally
* Weekly
* Daily

6. Recycling Habits

Options:

* Always
* Sometimes
* Rarely
* Never

7. Public Transport Usage

Options:

* Daily
* Weekly
* Occasionally
* Never

8. Electricity Saving Habits

Options:

* Very Conscious
* Somewhat Conscious
* Rarely Conscious
* Not Conscious

9. Motivation Level

Options:

* Just Curious
* Interested
* Actively Trying
* Highly Committed

The onboarding should immediately generate a Carbon Health Report.

---

# 9. Carbon Health Report

The report is the centerpiece of the application.

The dashboard must prioritize this report.

The report should contain:

Carbon Health Score

Status

Current Footprint

Potential Footprint

Biggest Contributor

Quickest Win

Recommended Actions

Mission Progress

Example Structure:

Carbon Health Score
74 / 100

Status:
Green Guardian

You are close to the Excellent category.
Only 6 more points needed.

Current Footprint:
375 kg CO₂/month

Potential Footprint:
288 kg CO₂/month

Biggest Contributor:
Transport

Quickest Win:
Use Metro Twice Weekly

Potential Saving:
42 kg CO₂/month

---

# 10. Carbon Health Score

Purpose:

Provide a simple and understandable representation of sustainability performance.

Internal Score Components:

60% Current Footprint

25% Improvement Trend

15% Actions Completed

The formula should remain internal.

Users should instead see:

Why Your Score?

✓ Current footprint

✓ Recent improvements

✓ Sustainability actions completed

---

# 11. User Levels

Level Structure:

Carbon Beginner

Eco Explorer

Green Guardian

Climate Champion

The level system should feel meaningful and motivational.

Avoid childish gamification.

---

# 12. Recommendation Engine

Purpose:

Generate personalized sustainability recommendations.

Recommendations must be ranked using:

1. Impact
2. Difficulty
3. Current Habits
4. Motivation Level

Every recommendation should include:

Title

Description

Estimated Impact

Difficulty Level

Expected Footprint Reduction

Example:

Use Metro Twice Weekly

Difficulty:
Easy

Impact:
High

Potential Saving:
42 kg CO₂/month

---

# 13. Mission Engine

Purpose:

Convert recommendations into achievable goals.

Immediately after onboarding:

Generate a First Mission.

Example:

Reduce 20 kg CO₂ this week.

Mission difficulty should adapt to user motivation level.

User Types:

Just Curious:
Easy missions

Interested:
Easy to Medium missions

Actively Trying:
Medium missions

Highly Committed:
Medium to Hard missions

---

# 14. Awareness Feed

Purpose:

Improve sustainability awareness while remaining relevant.

The feed should be presented as a carousel.

The feed must contain three content categories:

1. Personalized Insights
2. Recommended Actions
3. General Sustainability Facts

Priority Order:

Personalized Insight
↓
Recommended Action
↓
General Fact

Example:

Your Insight

Transport contributes 58% of your emissions.

Recommended Action

Using public transport twice weekly could reduce emissions significantly.

Did You Know?

A 10 km car trip can produce around 2 kg CO₂.

The carousel should support:

* Auto slide
* Manual navigation
* Responsive design

---

# 15. Tracking System

Tracking must follow a hybrid model.

Daily Check-In:

Purpose:
Quick updates.

Target completion time:
Less than 30 seconds.

Weekly Review:

Purpose:
Generate progress summaries.

Example:

Weekly Carbon Review

Score:
74 → 78

Footprint:
375 → 341 kg

Mission Progress:
3/4 Completed

Best Improvement:
Transport Emissions

---

# 16. Carbon Journey

Purpose:

Visualize progress over time.

Timeline events may include:

Health Check Completed

Mission Completed

Level Up

Footprint Reduction Achieved

Major Milestones

The timeline should feel rewarding and informative.

---

# 17. AI Sustainability Coach

Purpose:

Explain.

Guide.

Clarify.

Educate.

Suggest.

The AI Coach is NOT the homepage focus.

The AI Coach is a supporting feature.

The homepage should remain focused on reports and actions.

Potential User Questions:

How can I reduce emissions?

Why is my transport score low?

Which action has the highest impact?

How can I improve my Carbon Health Score?

---

# 18. Accessibility Requirements

The application must be accessible.

Requirements:

* Keyboard navigable
* Proper labels
* Semantic HTML
* Color contrast compliance
* Mobile responsiveness
* Screen-reader-friendly structure

Accessibility should be considered throughout implementation.

---

# 19. Performance Requirements

The application should:

* Load quickly
* Avoid unnecessary re-renders
* Use efficient state management
* Keep bundle size minimal
* Avoid unnecessary dependencies

---

# 20. Security Considerations

Although the application stores limited data:

* Validate all user inputs
* Avoid unsafe HTML rendering
* Avoid unnecessary third-party scripts
* Sanitize displayed content where required

---

# 21. Out of Scope

The following features should NOT be implemented:

* Authentication
* Login system
* Multi-user architecture
* Backend database
* Social media integration
* Leaderboards
* User-to-user interactions
* Complex machine learning models
* External APIs unless absolutely necessary

The goal is a polished, self-contained platform.

---

# 22. Evaluation Alignment

The final solution must directly support the challenge evaluation criteria.

Code Quality:
Clean architecture and maintainable components.

Security:
Safe handling of user data.

Efficiency:
Optimized calculations and rendering.

Testing:
Reliable core logic.

Accessibility:
Inclusive and usable UI.

Real-World Usability:
Simple onboarding and actionable guidance.

Smart Dynamic Assistant:
Context-aware recommendations and AI coach.

Logical Decision Making:
Personalized missions and recommendations based on user habits and motivation.

---

# 23. Non-Negotiable Design Principle

The application must never behave like a simple carbon calculator.

Every screen should answer:

"What should the user do next?"

The platform's purpose is to help users understand, track, and reduce their carbon footprint through meaningful actions and measurable progress.
