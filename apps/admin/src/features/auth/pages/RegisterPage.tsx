import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";
import { Card } from "../../../shared/ui/Card";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSuccess = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-50">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Join us today! Fill in your details to get started.
          </p>
        </div>

        <Card className="bg-gray-300">
          <RegisterForm onSuccess={handleRegisterSuccess} />
        </Card>
      </div>
    </div>
  );
};
