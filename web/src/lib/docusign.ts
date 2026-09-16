/**
 * DocuSign e-sign. v1 embeds envelopes in the deal room (week 6).
 * Create a free developer account: https://developers.docusign.com
 *
 * Required env (see .env.example):
 * DOCUSIGN_INTEGRATION_KEY, DOCUSIGN_USER_ID, DOCUSIGN_ACCOUNT_ID,
 * DOCUSIGN_AUTH_SERVER, DOCUSIGN_PRIVATE_KEY
 */

export function isDocuSignConfigured() {
  return Boolean(
    process.env.DOCUSIGN_INTEGRATION_KEY &&
      process.env.DOCUSIGN_USER_ID &&
      process.env.DOCUSIGN_ACCOUNT_ID,
  );
}

export function docusignStatusLabel() {
  return isDocuSignConfigured()
    ? "DocuSign connected"
    : "DocuSign not connected yet — envelopes will be enabled when keys are in .env.local";
}
