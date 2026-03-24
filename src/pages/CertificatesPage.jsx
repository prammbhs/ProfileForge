import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { NeoButton } from '@/components/ui/NeoButton';
import { Award, Plus, Trash2, Edit3, Loader2, ExternalLink, AlertTriangle, CheckCircle2, X, List, LayoutGrid, Upload, Image as ImageIcon } from 'lucide-react';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({ title: '', issuer: '', issue_date: '', credential_url: '' });
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('cert_view') || 'list');
  const [uploading, setUploading] = useState(false);
  const [uploadedFileKey, setUploadedFileKey] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [quota, setQuota] = useState(null);

  const fetchCertificates = async () => {
    try {
      const [res, quotaRes] = await Promise.all([
        api.get('/certificates'),
        api.get('/keys/quota')
      ]);
      setCertificates(res.data || []);
      setQuota(quotaRes.data.quota);
    } catch (err) {
      setError('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCertificates(); }, []);

  const toggleView = (mode) => {
    setViewMode(mode);
    localStorage.setItem('cert_view', mode);
  };

  const resetForm = () => {
    setFormData({ title: '', issuer: '', issue_date: '', credential_url: '' });
    setEditingId(null);
    setShowForm(false);
    setFieldErrors({});
    setUploadedFileKey(null);
    setPreviewUrl(null);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title || formData.title.trim().length < 2) errors.title = 'Title is required (min 2 characters)';
    if (formData.title && formData.title.length > 100) errors.title = 'Title cannot exceed 100 characters';
    if (formData.issuer && formData.issuer.length > 100) errors.issuer = 'Issuer cannot exceed 100 characters';
    if (formData.credential_url && !/^https?:\/\/.+/.test(formData.credential_url)) errors.credential_url = 'Must be a valid URL';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const contentType = file.type;

    setUploading(true);
    setError('');
    try {
      // 1. Get presigned URL
      const presignRes = await api.post('/certificates/presign', { contentType, fileExtension: ext });
      const { uploadUrl, fileKey } = presignRes.data;

      // 2. Upload directly to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file,
      });

      setUploadedFileKey(fileKey);
      setPreviewUrl(URL.createObjectURL(file));
      setSuccess('Image uploaded!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return;

    const payload = { title: formData.title.trim() };
    if (formData.issuer?.trim()) payload.issuer = formData.issuer.trim();
    if (formData.issue_date) payload.issue_date = formData.issue_date;
    if (formData.credential_url?.trim()) payload.credential_url = formData.credential_url.trim();
    if (uploadedFileKey) payload.fileKey = uploadedFileKey;

    try {
      if (editingId) {
        await api.put(`/certificates/${editingId}`, payload);
        setSuccess('Certificate updated!');
      } else {
        await api.post('/certificates', payload);
        setSuccess('Certificate added!');
      }
      resetForm();
      fetchCertificates();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to save certificate');
    }
  };

  const handleEdit = (cert) => {
    setFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      issue_date: cert.issue_date ? cert.issue_date.split('T')[0] : '',
      credential_url: cert.credential_url || ''
    });
    setEditingId(cert.id);
    setShowForm(true);
    setFieldErrors({});
    setUploadedFileKey(null);
    setPreviewUrl(cert.file_url || null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await api.delete(`/certificates/${id}`);
      setSuccess('Certificate deleted.');
      fetchCertificates();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete certificate');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-cabinet font-extrabold text-5xl uppercase tracking-tighter">Certificates</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="font-satoshi font-medium text-ui-black/60">Showcase your professional credentials.</p>
            {quota && (
              <span className="px-2 py-0.5 bg-ui-black text-primary-yellow font-cabinet font-extrabold text-[10px] uppercase tracking-widest neo-border-sm">
                Images: {quota.total_images_uploaded} / {quota.max_image_limit}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="neo-border-sm flex">
            <button onClick={() => toggleView('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary-yellow' : 'hover:bg-primary-yellow/20'}`}>
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => toggleView('gallery')}
              className={`p-2 transition-colors border-l-2 border-ui-black ${viewMode === 'gallery' ? 'bg-primary-yellow' : 'hover:bg-primary-yellow/20'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <NeoButton variant="primary" onClick={() => { resetForm(); setShowForm(true); }} className="gap-2">
            <Plus className="w-4 h-4" /> Add
          </NeoButton>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border-2 border-green-600 p-4 flex items-center gap-3">
          <CheckCircle2 className="text-green-600 w-5 h-5" />
          <p className="font-satoshi font-bold text-green-600 text-sm">{success}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-2 border-red-600 p-4 flex items-center gap-3">
          <AlertTriangle className="text-red-600 w-5 h-5" />
          <p className="font-satoshi font-bold text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="neo-border neo-shadow p-6 bg-primary-yellow/10 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-cabinet font-extrabold text-lg uppercase tracking-tighter">
              {editingId ? 'Edit Certificate' : 'New Certificate'}
            </h2>
            <button onClick={resetForm} className="p-1 hover:bg-ui-black/10 transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">Title *</label>
                <input className={`w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10 ${fieldErrors.title ? 'border-red-600 bg-red-50' : ''}`}
                  value={formData.title} onChange={(e) => { setFormData({...formData, title: e.target.value}); setFieldErrors({...fieldErrors, title: ''}); }} />
                {fieldErrors.title && <p className="text-red-600 text-xs font-satoshi font-bold">{fieldErrors.title}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">Issuer</label>
                <input className={`w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10 ${fieldErrors.issuer ? 'border-red-600 bg-red-50' : ''}`}
                  value={formData.issuer} onChange={(e) => { setFormData({...formData, issuer: e.target.value}); setFieldErrors({...fieldErrors, issuer: ''}); }} />
                {fieldErrors.issuer && <p className="text-red-600 text-xs font-satoshi font-bold">{fieldErrors.issuer}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">Issue Date</label>
                <input type="date" className="w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10"
                  value={formData.issue_date} onChange={(e) => setFormData({...formData, issue_date: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">
                  Credential URL <span className="text-ui-black/30 normal-case">(optional)</span>
                </label>
                <input type="url" className={`w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10 ${fieldErrors.credential_url ? 'border-red-600 bg-red-50' : ''}`}
                  placeholder="https://..."
                  value={formData.credential_url} onChange={(e) => { setFormData({...formData, credential_url: e.target.value}); setFieldErrors({...fieldErrors, credential_url: ''}); }} />
                {fieldErrors.credential_url && <p className="text-red-600 text-xs font-satoshi font-bold">{fieldErrors.credential_url}</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">
                Certificate Image <span className="text-ui-black/30 normal-case">(optional)</span>
              </label>
              <div className="flex items-start gap-4">
                {previewUrl ? (
                  <div className="relative w-24 h-24 neo-border overflow-hidden flex-shrink-0">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setPreviewUrl(null); setUploadedFileKey(null); }}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white flex items-center justify-center text-xs">×</button>
                  </div>
                ) : (
                  <label className="w-24 h-24 neo-border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-primary-yellow/10 transition-colors flex-shrink-0">
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Upload className="w-6 h-6 text-ui-black/30" /><span className="text-[9px] font-cabinet font-extrabold text-ui-black/30 mt-1">Upload</span></>}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                )}
                <p className="font-satoshi text-xs text-ui-black/40 mt-2">Upload a screenshot or image of your certificate. Supported: JPG, PNG, WebP.</p>
              </div>
            </div>

            <NeoButton type="submit" variant="primary" className="gap-2">{editingId ? 'Update' : 'Add'} Certificate</NeoButton>
          </form>
        </div>
      )}

      {/* Empty State */}
      {certificates.length === 0 ? (
        <div className="neo-border p-12 text-center bg-sage/5">
          <Award className="w-16 h-16 mx-auto text-ui-black/20 mb-4" />
          <p className="font-satoshi font-bold text-ui-black/40">No certificates yet. Add your first one!</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="grid gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="neo-border p-5 flex items-start justify-between group hover:bg-primary-yellow/5 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                {cert.file_url ? (
                  <div className="w-14 h-14 neo-border overflow-hidden flex-shrink-0">
                    <img src={cert.file_url} alt={cert.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 bg-primary-yellow neo-border flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7" />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-cabinet font-extrabold text-lg uppercase tracking-tighter">{cert.title}</h3>
                  {cert.issuer && <p className="font-satoshi font-bold text-sm text-ui-black/60">{cert.issuer}</p>}
                  <div className="flex gap-4 mt-1 text-xs font-satoshi text-ui-black/40">
                    {cert.issue_date && <span>{new Date(cert.issue_date).toLocaleDateString()}</span>}
                    {cert.credential_url && (
                      <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                        <ExternalLink className="w-3 h-3" /> View
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(cert)} className="p-2 neo-border-sm hover:bg-primary-yellow transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(cert.id)} className="p-2 neo-border-sm hover:bg-red-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="neo-border neo-shadow bg-ui-white group hover:bg-primary-yellow/5 transition-colors flex flex-col">
              {cert.file_url ? (
                <div className="h-36 overflow-hidden border-b-2 border-ui-black">
                  <img src={cert.file_url} alt={cert.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-36 bg-primary-yellow/20 flex items-center justify-center border-b-2 border-ui-black">
                  <Award className="w-12 h-12 text-ui-black/20" />
                </div>
              )}
              <div className="p-4 flex-1">
                <h3 className="font-cabinet font-extrabold text-sm uppercase tracking-tighter mb-1">{cert.title}</h3>
                {cert.issuer && <p className="font-satoshi font-bold text-xs text-ui-black/60">{cert.issuer}</p>}
                {cert.issue_date && <p className="font-satoshi text-[10px] text-ui-black/40 mt-1">{new Date(cert.issue_date).toLocaleDateString()}</p>}
              </div>
              <div className="border-t-2 border-ui-black p-3 flex items-center justify-between">
                <div className="flex gap-1">
                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-primary-yellow/30 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(cert)} className="p-1.5 hover:bg-primary-yellow transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(cert.id)} className="p-1.5 hover:bg-red-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
