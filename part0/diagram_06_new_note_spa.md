```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a note and clicks Save
    Note right of browser: spa.js creates the note, adds it to the list and redraws the notes (no page reload)

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (JSON: { "content": "...", "date": "..." })
    activate server
    server-->>browser: 201 Created { "message": "note created" }
    deactivate server

    Note right of browser: No redirect and no further requests, the page stays as it is