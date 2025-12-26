import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Upload, X, CheckCircle2, AlertCircle, User, Mail, Phone, MapPin, Briefcase, FileText, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/d97682f7387c73a793fbb42ce2897100f8a9cecd.png';

interface CandidateApplicationFormProps {
  onBack: () => void;
}

export function CandidateApplicationForm({ onBack }: CandidateApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    linkedIn: '',
    portfolio: '',
    yearsOfExperience: '',
    coverLetter: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateURL = (url: string): boolean => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, file: 'Only PDF, DOC, and DOCX files are allowed' }));
      return false;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, file: 'File size must be less than 5MB' }));
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.file;
          return newErrors;
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.file;
          return newErrors;
        });
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (min 10 digits)';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    
    // Optional URL fields validation
    if (formData.linkedIn && !validateURL(formData.linkedIn)) {
      newErrors.linkedIn = 'Please enter a valid URL';
    }
    if (formData.portfolio && !validateURL(formData.portfolio)) {
      newErrors.portfolio = 'Please enter a valid URL';
    }

    // File validation
    if (!selectedFile) {
      newErrors.file = 'CV/Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form logic here
      console.log('Form submitted:', formData, selectedFile);
      setSubmitted(true);
    }
  };

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EDF0F8' }}>
        <Card className="max-w-2xl mx-auto p-12">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-gray-700">Application Submitted Successfully!</h2>

            <p className="text-gray-600 max-w-xl">
              Thank you for submitting your application. We've received your details and CV. 
              Our recruitment team will review your application and get back to you within 3-5 business days.
            </p>

            <div className="p-4 rounded-lg w-full" style={{ backgroundColor: '#DBEAFE' }}>
              <p className="text-sm" style={{ color: '#1E40AF' }}>
                <strong>Next Steps:</strong> If your profile matches our requirements, you'll receive an email invitation to complete technical assessments and schedule interviews.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                className="rounded-full px-6 transition-colors duration-200"
                style={{ backgroundColor: '#6366F1', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4F46E5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6366F1';
                }}
                onClick={onBack}
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EDF0F8' }}>
      {/* Header */}
      <header className="px-12 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <img src={logo} alt="ERAMATCH" className="h-12" />
          <Button 
            variant="ghost"
            className="rounded-full px-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-12 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4" style={{ color: '#1F2937' }}>
              Job Application Form
            </h1>
            <p className="text-lg text-gray-600">
              Fill out the form below to apply for a position at ERAMATCH
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <User size={24} style={{ color: '#6366F1' }} />
                  <h3 className="text-gray-700">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#6366F1' }}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#6366F1' }}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Mail size={24} style={{ color: '#6366F1' }} />
                  <h3 className="text-gray-700">Contact Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#6366F1' }}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ focusRingColor: '#6366F1' }}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-700">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ focusRingColor: '#6366F1' }}
                        placeholder="New York, NY"
                      />
                      {errors.location && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase size={24} style={{ color: '#6366F1' }} />
                  <h3 className="text-gray-700">Professional Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Desired Position <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.position ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#6366F1' }}
                    >
                      <option value="">Select a position</option>
                      <option value="frontend">Frontend Developer</option>
                      <option value="backend">Backend Developer</option>
                      <option value="fullstack">Full Stack Developer</option>
                      <option value="mobile">Mobile Developer</option>
                      <option value="devops">DevOps Engineer</option>
                      <option value="data">Data Scientist</option>
                      <option value="ml">ML Engineer</option>
                      <option value="designer">UI/UX Designer</option>
                      <option value="product">Product Manager</option>
                      <option value="qa">QA Engineer</option>
                    </select>
                    {errors.position && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.position}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#6366F1' }}
                    >
                      <option value="">Select years of experience</option>
                      <option value="0-1">0-1 years (Entry Level)</option>
                      <option value="1-3">1-3 years (Junior)</option>
                      <option value="3-5">3-5 years (Mid-Level)</option>
                      <option value="5-8">5-8 years (Senior)</option>
                      <option value="8+">8+ years (Lead/Expert)</option>
                    </select>
                    {errors.yearsOfExperience && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.yearsOfExperience}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.linkedIn ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#6366F1' }}
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                    {errors.linkedIn && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.linkedIn}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Portfolio/Website (Optional)
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.portfolio ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#6366F1' }}
                      placeholder="https://johndoe.com"
                    />
                    {errors.portfolio && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.portfolio}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CV Upload Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <FileText size={24} style={{ color: '#6366F1' }} />
                  <h3 className="text-gray-700">CV/Resume Upload</h3>
                </div>
                
                <div>
                  {!selectedFile ? (
                    <div
                      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                        isDragging 
                          ? 'border-blue-500 bg-blue-50' 
                          : errors.file 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-700 mb-2">
                        <span style={{ color: '#6366F1' }} className="cursor-pointer hover:underline">
                          Click to upload
                        </span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, or DOCX (Max 5MB)
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                            <FileText size={24} className="text-white" />
                          </div>
                          <div>
                            <p className="text-gray-700">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-full p-2 hover:bg-red-100"
                          onClick={removeFile}
                        >
                          <X size={20} className="text-red-500" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {errors.file && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.file}
                    </p>
                  )}
                </div>
              </div>

              {/* Cover Letter Section */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Cover Letter (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 resize-y"
                  style={{ focusRingColor: '#6366F1' }}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </p>
                <Button
                  type="submit"
                  className="rounded-full px-8 py-6 transition-colors duration-200"
                  style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10B981';
                  }}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
