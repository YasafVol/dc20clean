# Project Brief

## Project Name
DC20 Character Creation Tool

## Core Purpose
A web-based character creation wizard for the DC20 tabletop role-playing game that guides users through the complex process of creating a valid character, automates calculations, enforces game rules, and generates a printable PDF character sheet.

## Key Requirements

### Functional Requirements
1. **Multi-Step Character Creation Wizard**
   - Step-by-step guided process for character creation
   - Attribute allocation using point-buy system
   - Ancestry selection with trait choices
   - Class selection with feature options
   - Character naming and player information

2. **Data Persistence**
   - Save character progress at each step
   - Store completed characters in database
   - Allow users to load and continue previous characters

3. **Rule Enforcement**
   - Validate point allocation limits
   - Enforce ancestry and trait selection rules
   - Ensure valid class and feature combinations
   - Calculate derived stats automatically

4. **PDF Generation**
   - Generate fillable PDF character sheets
   - Populate all calculated values and selections
   - Provide downloadable final character sheet

### Technical Requirements
1. **Frontend**: React-based single-page application with TypeScript
2. **Backend**: Serverless functions for API endpoints
3. **Database**: PostgreSQL with Prisma ORM
4. **Deployment**: Vercel-compatible architecture
5. **PDF Service**: Dedicated microservice for PDF generation

## Success Criteria
- Users can complete character creation without manual calculations
- All character data is persistently stored
- Generated PDFs are accurate and complete
- Application is responsive and user-friendly
- System enforces all DC20 game rules correctly

## Target Users
- New DC20 players who need guidance through character creation
- Experienced players who want faster character generation
- Game masters who need to create NPCs quickly

## Project Scope
**In Scope:**
- Core character creation steps (attributes, ancestry, class, details)
- Basic character data persistence
- PDF generation for completed characters
- Rule validation and calculation automation

**Future Enhancements:**
- Skills, trades, and languages selection
- Equipment management
- Character editing after creation
- User authentication and character ownership
- Advanced character management features
