import React, { useState } from 'react';

const ENTITY_TYPES = ['LLC', 'S-Corp', 'C-Corp', 'Sole Prop', 'Trust'];
const ROLES = [
  'Real Estate Holding',
  'Operating Business',
  'Construction',
  'Personal Residence',
  'Investment',
  'Other',
];

function blankEntity() {
  return {
    id: '',
    name: '',
    type: 'LLC',
    role: 'Real Estate Holding',
    owns: '',
    doesNotDo: '',
    email: '',
    cpa: '',
    notes: '',
  };
}

export default function EntityProfile({ entities, setEntities }) {
  // Working copy of the form. Seed with saved entities, or one blank block.
  const [forms, setForms] = useState(
    entities.length > 0 ? entities.map((e) => ({ ...e })) : [blankEntity()]
  );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateField = (idx, field, value) => {
    setForms((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));
    setSaved(false);
  };

  const addEntity = () => {
    setForms((prev) => [...prev, blankEntity()]);
    setSaved(false);
  };

  const removeEntity = (idx) => {
    setForms((prev) => prev.filter((_, i) => i !== idx));
    setSaved(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const payload = { entities: forms.filter((f) => f.name.trim()) };
      const res = await fetch('/api/entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        // Reload the canonical, server-assigned records (with ids/timestamps).
        const refreshed = await fetch('/api/entities').then((r) => r.json());
        const list = Array.isArray(refreshed.entities) ? refreshed.entities : [];
        setEntities(list);
        setForms(list.length > 0 ? list.map((e) => ({ ...e })) : [blankEntity()]);
        setSaved(true);
      }
    } catch (err) {
      // no-op; keep the form as-is
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-stone-800">My Entities</h2>
        <p className="text-sm text-stone-500">
          Build your entity profile once. This is the context SmartClose uses for every
          contract review.
        </p>
      </div>

      {forms.map((entity, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-sm border border-stone-200 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-stone-700">
              {entity.name?.trim() || `Entity ${idx + 1}`}
            </h3>
            {forms.length > 1 && (
              <button
                onClick={() => removeEntity(idx)}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Entity Name">
              <input
                className={inputCls}
                placeholder="e.g. Lulley LLC"
                value={entity.name}
                onChange={(e) => updateField(idx, 'name', e.target.value)}
              />
            </Field>

            <Field label="Entity Type">
              <select
                className={inputCls}
                value={entity.type}
                onChange={(e) => updateField(idx, 'type', e.target.value)}
              >
                {ENTITY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>

            <Field label="Role">
              <select
                className={inputCls}
                value={entity.role}
                onChange={(e) => updateField(idx, 'role', e.target.value)}
              >
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>

            <Field label="Primary email">
              <input
                className={inputCls}
                placeholder="e.g. dan@lulleyllc.com"
                value={entity.email}
                onChange={(e) => updateField(idx, 'email', e.target.value)}
              />
            </Field>

            <Field label="What it owns" full>
              <textarea
                className={inputCls}
                rows={2}
                placeholder="e.g. 780 Main Street, West Barnstable MA. Barn + residential unit. Investment property."
                value={entity.owns}
                onChange={(e) => updateField(idx, 'owns', e.target.value)}
              />
            </Field>

            <Field label="What it does NOT do" full>
              <textarea
                className={inputCls}
                rows={2}
                placeholder="e.g. Does not conduct construction or sales activity. Does not own personal residence."
                value={entity.doesNotDo}
                onChange={(e) => updateField(idx, 'doesNotDo', e.target.value)}
              />
            </Field>

            <Field label="CPA contact">
              <input
                className={inputCls}
                placeholder="e.g. Tim Allen, T.F. Allen & Company"
                value={entity.cpa}
                onChange={(e) => updateField(idx, 'cpa', e.target.value)}
              />
            </Field>

            <Field label="Notes" full>
              <textarea
                className={inputCls}
                rows={2}
                placeholder="Any other context the AI should know"
                value={entity.notes}
                onChange={(e) => updateField(idx, 'notes', e.target.value)}
              />
            </Field>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={addEntity}
          className="px-4 py-2 rounded-md border border-stone-300 bg-white text-stone-700 text-sm font-medium hover:bg-stone-100"
        >
          + Add Entity
        </button>
        <button
          onClick={saveProfile}
          disabled={saving}
          className="px-4 py-2 rounded-md bg-green-800 text-white text-sm font-medium hover:bg-green-900 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
        {saved && (
          <span className="text-sm text-green-700">
            Profile saved. This context will be used for all future contract reviews.
          </span>
        )}
      </div>

      {/* Saved entity summary cards */}
      {entities.length > 0 && (
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-stone-600 mb-3">Saved entities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entities.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-lg shadow-sm border border-stone-200 p-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-stone-800">{e.name}</span>
                  <span className="text-xs text-stone-500">
                    {e.type} · {e.role}
                  </span>
                </div>
                {e.owns && <p className="text-sm text-stone-600 mt-2">{e.owns}</p>}
                {e.email && <p className="text-xs text-stone-400 mt-2">{e.email}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  'w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-green-700 focus:ring-1 focus:ring-green-700 outline-none';

function Field({ label, full, children }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="block text-xs font-medium text-stone-500 mb-1">{label}</label>
      {children}
    </div>
  );
}
