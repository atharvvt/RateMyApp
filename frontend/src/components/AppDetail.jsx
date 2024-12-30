import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Tag, ExternalLink, Image as ImageIcon } from 'lucide-react';
import api from '../api';

const AppDetailPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [app, setApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState('');
  const [appTaskImages, setAppTaskImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const isStaff = sessionStorage.getItem('is_staff');
    if (!isStaff) {
      window.location.href = '/';
      return;
    }

    const appId = window.location.pathname.split('/').pop();
    if (appId) {
      fetchAppDetails(appId);
      fetchAppTasksImage(appId);
    }
  }, []);

  const fetchAppDetails = async (id) => {
    try {
      const response = await api.get(`/api/apps/${id}/`);
      setApp(response.data);
    } catch (error) {
      console.error('Error fetching app details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppTasksImage = async (id) => {
    try {
      const response = await api.get(`/api/apps/${id}/task-images/`);
      setAppTaskImages(response.data);
    } catch (error) {
      console.error('Error fetching app task images:', error);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => setUploadedImage(reader.result);
    reader.readAsDataURL(file);
    
    const appId = window.location.pathname.split('/').pop();
    const formData = new FormData();
    formData.append('app', appId);
    formData.append('image', file);
    
    try {
      setUploadStatus('uploading');
      const response = await api.post(`/api/apps/${appId}/task-images/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.status === 201) {
        setUploadStatus('success');
        fetchAppTasksImage(appId);
        setTimeout(() => setUploadStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileUpload(e.dataTransfer.files[0]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.location.href = sessionStorage.getItem('is_staff') === 'true' ? '/admin' : '/'}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>
      </div>

      {app && (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* App Info Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-2xl p-4">
                <img
                  src={app.app_logo}
                  alt={app.app_title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{app.app_title}</h1>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                    <Tag className="h-4 w-4" />
                    {app.app_category}
                  </span>
                  {app.app_sub_catagory && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-50 text-gray-600">
                      {app.app_sub_catagory}
                    </span>
                  )}
                </div>
                <a
                  href={app.app_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </a>
              </div>

              <div className="flex-shrink-0">
                <div className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-full text-lg font-semibold">
                  {app.app_points} Points
                </div>
              </div>
            </div>
          </div>

          {/* Screenshots Grid */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Task Screenshots</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {appTaskImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={image.image}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
                </div>
              ))}
            </div>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDragActive(true)}
                onDragLeave={() => setIsDragActive(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${isDragActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
                
                <div className="rounded-full bg-blue-50 p-4 mb-4">
                  <ImageIcon className="h-8 w-8 text-blue-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Screenshot</h3>
                
                <p className="text-sm text-gray-500 mb-2">Drop your image here or click to browse</p>
                
                {uploadStatus && (
                  <p className={`text-sm mt-2 ${uploadStatus === 'uploading' ? 'text-blue-600' : uploadStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'success' ? 'Upload successful!' : 'Upload failed. Please try again.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppDetailPage;
