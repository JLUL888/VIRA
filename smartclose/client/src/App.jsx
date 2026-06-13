import React, { useEffect, useState } from 'react';
import EntityProfile from './components/EntityProfile.jsx';
import ContractUpload from './components/ContractUpload.jsx';
import RedFlagReport from './components/RedFlagReport.jsx';
import CorrectionEmail from './components/CorrectionEmail.jsx';

export default function App() {
  const [tab, setTab] = useState('entities');
  const [entities, setEntities] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load saved entities on mount.
  useEffect(() => {
    fetch('/api/entities')
      .then((r) => r.json())
      .then((data) => setEntities(Array.isArray(data.entities) ? data.entities : []))
      .catch(() => setEntities([]));
  }, []);

  const showEmail =
    report &&
    !report.error &&
    (report.okToSign === false || report.entityCheck?.mismatch === true);

  return (
    <div className="min-h-full bg-stone-50 text-stone-800">
      {/* Header */}
      <header className="bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <h1 className="text-2xl font-bold tracking-tight">SmartClose</h1>
          <p className="text-green-100 text-sm">
            Catch entity mismatches, tax exposure, and contract red flags before you sign.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-5xl px-4 flex gap-1">
          <TabButton active={tab === 'entities'} onClick={() => setTab('entities')}>
            My Entities
          </TabButton>
          <TabButton active={tab === 'review'} onClick={() => setTab('review')}>
            Review a Contract
          </TabButton>
        </div>
      </nav>

      {/* Body */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        {tab === 'entities' && (
          <EntityProfile entities={entities} setEntities={setEntities} />
        )}

        {tab === 'review' && (
          <div className="space-y-6">
            <ContractUpload
              entities={entities}
              loading={loading}
              setLoading={setLoading}
              setReport={setReport}
              setError={setError}
              goToEntities={() => setTab('entities')}
            />

            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
                {error}
              </div>
            )}

            {report && !report.error && (
              <>
                <RedFlagReport report={report} />
                {showEmail && <CorrectionEmail email={report.correctionEmail} />}
              </>
            )}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-5xl px-4 py-6 text-xs text-stone-400">
        SmartClose is a drafting aid, not legal advice. Have a licensed attorney review
        anything you're unsure about before signing.
      </footer>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        'px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ' +
        (active
          ? 'border-green-800 text-green-800'
          : 'border-transparent text-stone-500 hover:text-stone-700')
      }
    >
      {children}
    </button>
  );
}
