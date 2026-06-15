# TODO

This is not a highly detailed master plan, just a few rough notes on the next few known steps

# Basic State / Components Refactor
- separate components from state/data

# Component Styling
- decide on shallow vs shadow dom patterns
- start basic CSS structure

# Basic Persistence
- add context provider
    - https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md
- add persistence - markdown + yaml, simple indexeddb
  - id, date_created, date_updated
  - see https://gemini.google.com/app/c5ec6791d1735cf3
- demonstrate change propagation

# Markdown and Editor
- Render markdown
- Text editor, with markdown, yaml, code support
  - does editor support slash commands?
  - vim?

# Advanced Views
- Components, interactions, and data models for different types of views
- collections: lists, kanban, card sorting (to order and to categorize)
- linking: wikilinks, drag to link, labeled links
- attribute editing: tag editor, chip/enum attributes, date picker, attribute types data models

# Extensible Views
- Declarative view api with
  - layout
  - filter/sort/limit
  - data shapes
  - behaviors

# Cross Platform
- Explore mobile friendly viewing and editing
- Explore simple backend sync - must be compatible with web and tauri, and local/offline first
- Explore Tauri for native
