# interactive-story Specification (delta)

## ADDED Requirements

### Requirement: Letter Text From A File
The letter's message SHALL be read from `letter.txt` (next to `index.html`) when the page loads. Each block of text separated by a blank line SHALL become its own paragraph, single line breaks SHALL be kept, and the text SHALL be shown exactly as typed (never interpreted as HTML). When the file can't be read, including when the page is opened straight from disk, the paragraph in `index.html` SHALL be shown instead, without a console error.

#### Scenario: Message from the file
- **WHEN** the page is served over http(s) and `letter.txt` holds three paragraphs
- **THEN** the opened letter shows those three paragraphs, with their line breaks

#### Scenario: Text shown as typed
- **WHEN** `letter.txt` contains characters like `<b>` or `&`
- **THEN** they appear literally in the letter

#### Scenario: Fallback
- **WHEN** the page is opened from disk, or `letter.txt` is missing
- **THEN** the letter shows the paragraph written in `index.html`
