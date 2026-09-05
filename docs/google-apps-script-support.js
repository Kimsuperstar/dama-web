// Dama customer-support form receiver for Google Apps Script.
//
// Sheet columns expected by the current sheet:
// A Timestamp, B name, C message, D email, E color
//
// Frontend currently sends: name, message, email, title.
// This script stores title in the existing "color" column so the current
// sheet layout can keep working without frontend delay.

const SUPPORT_RECIPIENT_EMAIL = 'YOUR_EMAIL@example.com';
const SUPPORT_SHEET_NAME = '';
const LAST_SENT_ROW_KEY = 'DAMA_SUPPORT_LAST_SENT_ROW';

function getSupportSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (SUPPORT_SHEET_NAME) {
    return spreadsheet.getSheetByName(SUPPORT_SHEET_NAME);
  }
  return spreadsheet.getActiveSheet();
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const sheet = getSupportSheet_();
  const title = params.title || params.color || '';

  sheet.appendRow([
    new Date(),
    params.name || '',
    params.message || '',
    params.email || '',
    title,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendPendingSupportEmails() {
  const sheet = getSupportSheet_();
  const props = PropertiesService.getScriptProperties();
  const lastRow = sheet.getLastRow();
  const lastSentRow = Number(props.getProperty(LAST_SENT_ROW_KEY) || '6');

  if (lastRow <= lastSentRow) {
    return;
  }

  for (let row = lastSentRow + 1; row <= lastRow; row += 1) {
    const values = sheet.getRange(row, 1, 1, 5).getValues()[0];
    const timestamp = values[0];
    const name = values[1];
    const message = values[2];
    const email = values[3];
    const title = values[4];

    if (!name && !email && !title && !message) {
      continue;
    }

    MailApp.sendEmail({
      to: SUPPORT_RECIPIENT_EMAIL,
      replyTo: email || undefined,
      subject: `[담아 고객센터] ${title || '새 문의'}`,
      body: [
        `접수 시간: ${timestamp}`,
        `이름: ${name}`,
        `이메일: ${email}`,
        `제목: ${title}`,
        '',
        '문의 내용:',
        message,
      ].join('\n'),
    });
  }

  props.setProperty(LAST_SENT_ROW_KEY, String(lastRow));
}
