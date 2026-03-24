import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { NeoButton } from '@/components/ui/NeoButton';
import { Database, Plus, Trash2, Edit3, Loader2, ExternalLink, Github, AlertTriangle, CheckCircle2, X, List, LayoutGrid, Upload, Image as ImageIcon } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', live_link: '', github_link: '', techstack_used: ''
  });
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('proj_view') || 'list');
  const [uploading, setUploading] = useState(false);
  const [imageLinks, setImageLinks] = useState([]); // CloudFront URLs for uploaded images
  const [imagePreviews, setImagePreviews] = useState([]); // local blob preview URLs

  const [quota, setQuota] = useState(null);

  const fetchProjects = async () => {
    try {
      const [res, quotaRes] = await Promise.all([
        api.get('/projects'),
        api.get('/keys/quota')
      ]);
      setProjects(res.data || []);
      setQuota(quotaRes.data.quota);
    } catch (err) {
      setError('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const toggleView = (mode) => {
    setViewMode(mode);
    localStorage.setItem('proj_view', mode);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', live_link: '', github_link: '', techstack_used: '' });
    setEditingId(null);
    setShowForm(false);
    setImageLinks([]);
    setImagePreviews([]);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (imageLinks.length >= 5) {
      setError('Maximum 5 images per project.');
      return;
    }

    const ext = file.name.split('.').pop().toLowerCase();
    const contentType = file.type;

    setUploading(true);
    setError('');
    try {
      // 1. Get presigned URL
      const presignRes = await api.post('/projects/presign', { contentType, fileExtension: ext });
      const { uploadUrl, fileKey, publicUrl } = presignRes.data;

      // 2. Upload directly to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file,
      });

      // 3. Use the public CloudFront URL returned by the backend
      if (!publicUrl) {
        setError('Server did not return a public URL. Please check AWS_CLOUDFRONT_URL configuration.');
        return;
      }

      setImageLinks(prev => [...prev, publicUrl]);

      setImagePreviews(prev => [...prev, URL.createObjectURL(file)]);
      setSuccess('Image uploaded!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImageLinks(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      name: formData.name,
      description: formData.description || null,
      live_link: formData.live_link || null,
      github_link: formData.github_link || null,
      techstack_used: formData.techstack_used ? formData.techstack_used.split(',').map(s => s.trim()).filter(Boolean) : [],
      image_links: imageLinks.length > 0 ? imageLinks : []
    };

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
        setSuccess('Project updated!');
      } else {
        await api.post('/projects', payload);
        setSuccess('Project added!');
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project');
    }
  };

  const handleEdit = (proj) => {
    setFormData({
      name: proj.name || '',
      description: proj.description || '',
      live_link: proj.live_link || '',
      github_link: proj.github_link || '',
      techstack_used: (proj.techstack_used || []).join(', ')
    });
    setEditingId(proj.id);
    setShowForm(true);
    setImageLinks(proj.image_links || []);
    setImagePreviews(proj.image_links || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setSuccess('Project deleted.');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete project');
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
          <h1 className="font-cabinet font-extrabold text-5xl uppercase tracking-tighter">Projects</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="font-satoshi font-medium text-ui-black/60">Manage your portfolio projects (max 15).</p>
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
            <button onClick={() => toggleView('grid')}
              className={`p-2 transition-colors border-l-2 border-ui-black ${viewMode === 'grid' ? 'bg-primary-yellow' : 'hover:bg-primary-yellow/20'}`}>
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
              {editingId ? 'Edit Project' : 'New Project'}
            </h2>
            <button onClick={resetForm} className="p-1 hover:bg-ui-black/10 transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">Name *</label>
                <input required className="w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">Tech Stack <span className="text-ui-black/30 normal-case">(comma-separated)</span></label>
                <input className="w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10"
                  placeholder="React, Node.js, PostgreSQL"
                  value={formData.techstack_used} onChange={(e) => setFormData({...formData, techstack_used: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">Description</label>
              <textarea rows={3} className="w-full px-4 py-3 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10 resize-none"
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">Live Link <span className="text-ui-black/30 normal-case">(optional)</span></label>
                <input type="url" className="w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10"
                  placeholder="https://myproject.com"
                  value={formData.live_link} onChange={(e) => setFormData({...formData, live_link: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">GitHub Link <span className="text-ui-black/30 normal-case">(optional)</span></label>
                <input type="url" className="w-full h-12 px-4 neo-border font-satoshi font-bold focus:outline-none focus:bg-primary-yellow/10"
                  placeholder="https://github.com/..."
                  value={formData.github_link} onChange={(e) => setFormData({...formData, github_link: e.target.value})} />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="font-cabinet font-extrabold text-xs uppercase tracking-widest">
                Project Images <span className="text-ui-black/30 normal-case">(max 5, optional)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {imagePreviews.map((preview, i) => (
                  <div key={i} className="relative w-20 h-20 neo-border overflow-hidden flex-shrink-0">
                    <img src={preview} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white flex items-center justify-center text-xs">×</button>
                  </div>
                ))}
                {imageLinks.length < 5 && (
                  <label className="w-20 h-20 neo-border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-primary-yellow/10 transition-colors flex-shrink-0">
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Upload className="w-5 h-5 text-ui-black/30" /><span className="text-[8px] font-cabinet font-extrabold text-ui-black/30 mt-0.5">Add</span></>}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                )}
              </div>
            </div>

            <NeoButton type="submit" variant="primary" className="gap-2">{editingId ? 'Update' : 'Add'} Project</NeoButton>
          </form>
        </div>
      )}

      {/* Empty / List / Grid */}
      {projects.length === 0 && !error ? (
        <div className="neo-border p-12 text-center bg-sage/5">
          <Database className="w-16 h-16 mx-auto text-ui-black/20 mb-4" />
          <p className="font-satoshi font-bold text-ui-black/40">No projects yet. Add your first one!</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="grid gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="neo-border p-5 group hover:bg-primary-yellow/5 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {proj.image_links && proj.image_links.length > 0 ? (
                    <div className="w-14 h-14 neo-border overflow-hidden flex-shrink-0">
                      <img src={proj.image_links[0]} alt={proj.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-ui-black neo-border flex items-center justify-center flex-shrink-0">
                      <Database className="w-7 h-7 text-primary-yellow" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-cabinet font-extrabold text-lg uppercase tracking-tighter">{proj.name}</h3>
                    {proj.description && <p className="font-satoshi text-sm text-ui-black/60 mt-1 line-clamp-2">{proj.description}</p>}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(proj.techstack_used || []).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-primary-yellow/30 neo-border-sm font-cabinet font-extrabold text-[10px] uppercase tracking-widest">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-3 text-xs">
                      {proj.live_link && (
                        <a href={proj.live_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-satoshi font-bold text-blue-600 hover:underline">
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                      {proj.github_link && (
                        <a href={proj.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-satoshi font-bold text-ui-black/60 hover:underline">
                          <Github className="w-3 h-3" /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                  <button onClick={() => handleEdit(proj)} className="p-2 neo-border-sm hover:bg-primary-yellow transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(proj.id)} className="p-2 neo-border-sm hover:bg-red-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="neo-border neo-shadow bg-ui-white group hover:bg-primary-yellow/5 transition-colors flex flex-col">
              {proj.image_links && proj.image_links.length > 0 ? (
                <div className="h-36 overflow-hidden border-b-2 border-ui-black">
                  <img src={proj.image_links[0]} alt={proj.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-36 bg-ui-black/5 flex items-center justify-center border-b-2 border-ui-black">
                  <Database className="w-10 h-10 text-ui-black/15" />
                </div>
              )}
              <div className="p-4 flex-1">
                <h3 className="font-cabinet font-extrabold text-sm uppercase tracking-tighter mb-1">{proj.name}</h3>
                {proj.description && <p className="font-satoshi text-xs text-ui-black/60 mt-1 line-clamp-2">{proj.description}</p>}
                <div className="flex flex-wrap gap-1 mt-3">
                  {(proj.techstack_used || []).slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-primary-yellow/30 neo-border-sm font-cabinet font-extrabold text-[9px] uppercase tracking-widest">{tech}</span>
                  ))}
                  {(proj.techstack_used || []).length > 4 && (
                    <span className="px-1.5 py-0.5 bg-ui-black/5 font-cabinet font-extrabold text-[9px] uppercase">+{proj.techstack_used.length - 4}</span>
                  )}
                </div>
              </div>
              <div className="border-t-2 border-ui-black p-3 flex items-center justify-between">
                <div className="flex gap-1">
                  {proj.live_link && (
                    <a href={proj.live_link} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-primary-yellow/30"><ExternalLink className="w-4 h-4" /></a>
                  )}
                  {proj.github_link && (
                    <a href={proj.github_link} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-ui-black/10"><Github className="w-4 h-4" /></a>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(proj)} className="p-1.5 hover:bg-primary-yellow"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(proj.id)} className="p-1.5 hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
