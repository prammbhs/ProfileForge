import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { NeoButton } from '@/components/ui/NeoButton';
import { BrowserMockup } from '@/components/ui/BrowserMockup';
import { User, Mail, Shield, Zap, Save, Trash2, Camera, Loader2, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';

const ProfilePage = () => {
  const { user, checkAuth } = useAuth();
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL.split('/api/v1')[0];

  const getFullImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${backendBaseUrl}/${path}`;
  };

  const [name, setName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess('');
    setError('');
    try {
      await api.put('/profile/name', { name });
      await checkAuth();
      setSuccess('Name updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update name');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);
    setSuccess('');
    setError('');
    try {
      // Assuming backend uses multer and handles 'image' field
      await api.put('/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await checkAuth();
      setSuccess('Profile image updated!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile image. (Check if backend multer is configured)');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you absolutely sure? This action is IRREVERSIBLE. All your data will be permanently deleted.')) return;

    setIsLoading(true);
    setError('');
    try {
      await api.delete('/profile/delete');
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="font-cabinet font-extrabold text-5xl uppercase tracking-tighter">Profile Settings</h1>
        <p className="font-satoshi font-medium text-ui-black/60 mt-2">Manage your identity and account data.</p>
      </header>

      {success && (
        <div className="bg-green-50 border-2 border-green-600 p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="text-green-600 w-5 h-5" />
          <p className="font-satoshi font-bold text-green-600 text-sm italic">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-600 p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <Trash2 className="text-red-600 w-5 h-5" />
          <p className="font-satoshi font-bold text-red-600 text-sm italic">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Col: Avatar Upload */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-ui-white neo-border neo-shadow p-8 flex flex-col items-center text-center group">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-primary-yellow neo-border rounded-full overflow-hidden flex items-center justify-center">
                {user?.profile_image_url ? (
                  <img src={getFullImageUrl(user.profile_image_url)} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-ui-black/20" />
                )}
              </div>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 w-10 h-10 bg-ui-black text-primary-yellow neo-border cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Camera className="w-5 h-5" />
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <h3 className="font-cabinet font-extrabold text-xl uppercase tracking-tighter">{user?.name}</h3>
            <p className="font-satoshi text-xs text-ui-black/40 mt-1 uppercase tracking-widest font-bold">Forge Master</p>
          </div>
          
          <div className="bg-sage/10 border-2 border-dashed border-ui-black/20 p-6">
            <h4 className="font-cabinet font-extrabold text-sm uppercase mb-2">Account Statistics</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-satoshi font-bold">
                <span className="text-ui-black/40">MEMBER SINCE</span>
                <span>{new Date(user?.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-xs font-satoshi font-bold">
                <span className="text-ui-black/40">USER ID</span>
                <span className="font-mono">#{user?.id?.slice(0, 8)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Forms */}
        <div className="md:col-span-2 space-y-8">
          <BrowserMockup title="Identity Control">
            <form onSubmit={handleUpdateName} className="space-y-6">
              <div className="space-y-2">
                <label className="font-cabinet font-extrabold text-lg uppercase tracking-tighter block">Display Name</label>
                <input
                  type="text"
                  required
                  className="w-full h-14 px-4 bg-ui-white neo-border font-satoshi font-bold focus:bg-primary-yellow/10 focus:outline-none transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2 opacity-50 cursor-not-allowed">
                <label className="font-cabinet font-extrabold text-lg uppercase tracking-tighter block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                  <input
                    type="email"
                    disabled
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 neo-border font-satoshi font-bold"
                    value={user?.email || ''}
                  />
                </div>
                <p className="text-[10px] font-satoshi font-bold italic">Email changes are foraged via support only.</p>
              </div>

              <NeoButton type="submit" variant="primary" className="gap-2" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Transformation
              </NeoButton>
            </form>
          </BrowserMockup>

          <div className="bg-red-50 neo-border p-8 border-red-200">
            <h3 className="font-cabinet font-extrabold text-xl text-red-600 uppercase tracking-tighter mb-2">Danger Zone</h3>
            <p className="font-satoshi font-medium text-sm text-red-600/60 mb-6 italic">Deleting this account is permanent. All your forged data will be lost to the void.</p>
            <NeoButton 
              variant="secondary" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              onClick={handleDeleteAccount}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete Account Forever'}
            </NeoButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
