import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Scholarship Finder</h1>
      <p className="mb-4 text-gray-700">Find and apply for scholarships effortlessly!</p>

      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
