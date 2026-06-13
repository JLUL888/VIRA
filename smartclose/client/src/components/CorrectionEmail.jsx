import React, { useState } from 'react';

export default function CorrectionEmail({ email }) {
  const [copied, setCopied] = useState(false);
  if (!email) return null;

  const fullText =
    (email.to ? `To: ${email.to}\n` : '') +
    (email.subject ? `Subject: ${email.subject}\n\n` : '') +
    (email.body || '');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
    } catch (err) {
      // Fallback for older browsers / non-secure contexts.
      const ta = document.createElement('textarea');
      ta.value = fullText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-stone-800">Correction Request Email</h2>
        <p className="text-sm text-stone-500">
          Send this to the vendor to request a corrected contract.
        </p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-stone-50 divide-y divide-stone-200 text-sm">
        <div className="px-4 py-2 flex gap-2">
          <span className="text-stone-400 w-16 shrink-0">To:</span>
          <span className="text-stone-700">{email.to || '(no email found in contract)'}</span>
        </div>
        <div className="px-4 py-2 flex gap-2">
          <span className="text-stone-400 w-16 shrink-0">Subject:</span>
          <span className="text-stone-700">{email.subject || ''}</span>
        </div>
        <div className="px-4 py-3">
          <pre className="whitespace-pre-wrap font-sans text-stone-700">{email.body || ''}</pre>
        </div>
      </div>

      <button
        onClick={copy}
        className="px-4 py-2 rounded-md bg-green-800 text-white text-sm font-medium hover:bg-green-900"
      >
        {copied ? 'Copied!' : 'Copy Email'}
      </button>

      <div className="rounded-md bg-stone-100 border border-stone-200 p-3 text-sm text-stone-600">
        <span className="font-semibold text-stone-700">What happens next?</span> After
        sending this email, wait for the vendor to reissue the contract with corrections
        before signing. Do not sign the original contract. Once you receive the corrected
        version, upload it here to verify the issues are resolved.
      </div>
    </div>
  );
}
