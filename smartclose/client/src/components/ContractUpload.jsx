import React, { useRef, useState } from 'react';

export default function ContractUpload({
  entities,
  loading,
  setLoading,
  setReport,
  setError,
  goToEntities,
}) {
  const [file, setFile] = useState(null);
  const [entityId, setEntityId] = useState('all');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const hasEntities = entities.length > 0;
  const canSubmit = !!file && hasEntities && !loading;

  const pickFile = (f) => {
    if (!f) return;
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      return;
    }
    setError('');
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    setReport(null);

    try {
      const fd = new FormData();
      fd.append('contract', file);
      fd.append('entityId', entityId);

      const res = await fetch('/api/review', { method: 'POST', body: fd });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setReport(data);
      }
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-stone-800">Review a Contract</h2>
        <p className="text-sm text-stone-500">
          Upload a vendor contract (PDF). SmartClose compares it against your entity
          profile and flags problems before you sign.
        </p>
      </div>

      {!hasEntities && (
        <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
          You haven't saved an entity profile yet.{' '}
          <button onClick={goToEntities} className="font-medium underline">
            Add an entity first
          </button>{' '}
          so SmartClose has context to check against.
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={
          'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ' +
          (dragOver
            ? 'border-green-700 bg-green-50'
            : 'border-stone-300 hover:border-stone-400 bg-stone-50')
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
        {file ? (
          <div className="text-sm text-stone-700">
            <span className="font-medium">{file.name}</span>
            <div className="text-xs text-stone-400 mt-1">Click to choose a different file</div>
          </div>
        ) : (
          <div className="text-sm text-stone-500">
            <span className="font-medium text-stone-700">Click to upload</span> or drag &
            drop a PDF here
          </div>
        )}
      </div>

      {/* Entity selector */}
      <div>
        <label className="block text-xs font-medium text-stone-500 mb-1">
          Which entity is this contract for?
        </label>
        <select
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-green-700 focus:ring-1 focus:ring-green-700 outline-none"
          value={entityId}
          onChange={(e) => setEntityId(e.target.value)}
        >
          <option value="all">Analyze against all entities</option>
          {entities.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.type})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={submit}
        disabled={!canSubmit}
        className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-green-800 text-white text-sm font-medium hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing…' : 'Review Contract'}
      </button>

      {loading && (
        <div className="flex items-center gap-3 text-sm text-stone-600">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-green-700" />
          Reading contract and checking against your entity profile… (this may take 10–20
          seconds)
        </div>
      )}
    </div>
  );
}
