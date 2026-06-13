import React from 'react';

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

const SEVERITY_STYLES = {
  critical: 'bg-red-100 border-red-500 text-red-800',
  high: 'bg-orange-100 border-orange-400 text-orange-800',
  medium: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  low: 'bg-gray-100 border-gray-400 text-gray-600',
};

const RISK_HEADER = {
  green: { cls: 'bg-green-100 border-green-500 text-green-800', text: '✓ Looks good — OK to sign' },
  yellow: {
    cls: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    text: '⚠ Minor issues — review before signing',
  },
  red: { cls: 'bg-red-100 border-red-500 text-red-800', text: '✗ Do not sign — corrections needed' },
};

export default function RedFlagReport({ report }) {
  const risk = RISK_HEADER[report.overallRisk] || RISK_HEADER.yellow;
  const entity = report.entityCheck || {};
  const flags = Array.isArray(report.redFlags) ? [...report.redFlags] : [];
  flags.sort(
    (a, b) =>
      (SEVERITY_ORDER[a.severity] ?? 99) - (SEVERITY_ORDER[b.severity] ?? 99)
  );

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className={`rounded-lg border-l-4 p-4 font-semibold ${risk.cls}`}>
        {risk.text}
      </div>

      {/* Contract summary */}
      {report.contractSummary && (
        <div className="rounded-lg bg-stone-100 border border-stone-200 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">
            Contract summary
          </h3>
          <p className="text-sm text-stone-700">{report.contractSummary}</p>
        </div>
      )}

      {/* Entity check — always shown first */}
      <div
        className={
          'rounded-lg border-l-4 p-4 bg-white shadow-sm ' +
          (entity.mismatch ? 'border-red-500' : 'border-green-500')
        }
      >
        {entity.mismatch ? (
          <>
            <h3 className="font-bold text-red-700 mb-2">Wrong entity on this contract</h3>
            <div className="text-sm text-stone-700 space-y-1">
              <p>
                <span className="text-stone-500">On the contract:</span>{' '}
                <span className="font-medium">{entity.contractEntity || '—'}</span>
              </p>
              <p>
                <span className="text-stone-500">Should be:</span>{' '}
                <span className="font-medium">{entity.correctEntity || '—'}</span>
              </p>
              {entity.explanation && (
                <p className="text-stone-600 pt-1">{entity.explanation}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <h3 className="font-bold text-green-700 mb-1">✓ Correct entity</h3>
            <p className="text-sm text-stone-700">
              {entity.contractEntity || entity.correctEntity || 'Entity matches your profile.'}
            </p>
            {entity.explanation && (
              <p className="text-sm text-stone-600 mt-1">{entity.explanation}</p>
            )}
          </>
        )}
      </div>

      {/* Red flags */}
      <div>
        <h3 className="text-sm font-semibold text-stone-600 mb-3">
          Red flags{flags.length > 0 ? ` (${flags.length})` : ''}
        </h3>

        {flags.length === 0 ? (
          <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800">
            No issues found.
          </div>
        ) : (
          <div className="space-y-3">
            {flags.map((flag, idx) => (
              <div
                key={idx}
                className={
                  'rounded-lg border-l-4 p-4 ' +
                  (SEVERITY_STYLES[flag.severity] || SEVERITY_STYLES.low)
                }
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-white/60">
                    {flag.severity}
                  </span>
                  <span className="font-semibold">{flag.issue}</span>
                </div>
                {flag.detail && <p className="text-sm mb-2">{flag.detail}</p>}
                {flag.recommendation && (
                  <p className="text-sm italic opacity-90">{flag.recommendation}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
