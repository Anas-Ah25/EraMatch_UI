import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logo from 'figma:asset/8bd93ed4627c09346a804ff348fc063b132b8b5d.png';

interface CandidateLoginPageProps {
  onBack: () => void;
  onSignIn: () => void;
}

export function CandidateLoginPage({ onBack, onSignIn }: CandidateLoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented later
    console.log('Sign in clicked', { username, password });
    onSignIn();
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EDF0F8' }}>
      <div className="w-full max-w-lg px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="ERAMATCH - A Smarter Recruitment System" className="h-14 mx-auto" />
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-gray-700 mb-2">Candidate Login</h1>
            <p className="text-gray-500">Sign in to access your assessments</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white rounded-full"
              style={{ backgroundColor: '#6366F1' }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}