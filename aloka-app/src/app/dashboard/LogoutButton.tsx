'use client';

export default function LogoutButton() {
  const handleLogout = async () => {
    // This would typically call a logout API or server action
    // For demonstration, we'll just remove the cookie and redirect
    document.cookie = 'sessionId=; Max-Age=0; path=/;';
    window.location.href = '/signin';
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors"
    >
      Sign Out
    </button>
  );
}