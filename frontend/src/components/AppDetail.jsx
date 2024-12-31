import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeftIcon, TagIcon, ExternalLinkIcon, UploadIcon } from 'lucide-react';
import api from '../api';
import '../styles/appdetail.css';

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
      <div className="loading-spinner">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <button
            onClick={() => window.location.href = sessionStorage.getItem('is_staff') === 'true' ? '/admin' : '/'}
            className="back-button"
          >
            <ArrowLeftIcon className="icon" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {app && (
        <div className="main-content">
          <div className="app-card">
            <div className="app-header">
              <div className="app-logo">
                <img src={app.app_logo} alt={app.app_title} />
              </div>

              <div className="app-info">
                <h1 className="app-title">{app.app_title}</h1>
                <div className="tags-container">
                  <span className="tag tag-primary">
                    <TagIcon className="icon" />
                    {app.app_category}
                  </span>
                  {app.app_sub_catagory && (
                    <span className="tag tag-secondary">
                      {app.app_sub_catagory}
                    </span>
                  )}
                </div>
                <a
                  href={app.app_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  <ExternalLinkIcon className="icon" />
                  Visit Website
                </a>
              </div>

              <div className="points-container">
                <span className="points-badge">
                  {app.app_points} Points
                </span>
              </div>
            </div>
          </div>

          <div className="app-card">
            <h2 className="section-title">Task Screenshots</h2>

            <div className="screenshots-grid">
              {appTaskImages.map((image, index) => (
                <div key={index} className="screenshot-card">
                  <div className="screenshot-aspect">
                    <img src={image.image} alt={`Screenshot ${index + 1}`} />
                  </div>
                </div>
              ))}
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setIsDragActive(true)}
              onDragLeave={() => setIsDragActive(false)}
              onDrop={handleDrop}
              className={`upload-zone ${isDragActive ? 'active' : ''}`}
            >
              <div className="upload-content">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />

                <div className="upload-icon-container">
                  <UploadIcon className="upload-icon" />
                </div>

                <h3 className="upload-title">Add New Screenshot</h3>
                <p className="upload-text">Drop your image here or click to browse</p>

                {uploadStatus && (
                  <div className={`upload-status ${uploadStatus}`}>
                    <p>
                      {uploadStatus === 'uploading' ? 'Uploading...' : 
                       uploadStatus === 'success' ? 'Upload successful!' : 
                       'Upload failed. Please try again.'}
                    </p>
                  </div>
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