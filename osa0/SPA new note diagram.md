```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  note left of browser: event handler prevents reloading and adds new note to the list whilst sending it to the server
  server->>browser: 201 CREATED
  deactivate server

```
