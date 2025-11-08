import React, { useState } from "react";
import { PageLayout, Container, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface SignUpFormInputs {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormInputs) => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast.success("Account created! Check your email to confirm your address.");
      navigate("/signin");
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4 sm:px-6 md:px-8">
        <Container
          maxWidth="md"
          className="w-full py-6 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center"
        >
          {/* Title */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 w-full">
            <h1 className="text-h1 sm:text-h2 font-semibold text-white">
              Sign Up
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 w-full max-w-[300px]"
          >
            {/* Email Input */}
            <Input
              type="email"
              placeholder="Email"
              className="text-body-sm h-[45px] w-full rounded-[10px]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-error text-xs text-left w-full">
                {errors.email.message}
              </p>
            )}

            {/* Password Input */}
            <Input
              type="password"
              placeholder="Password"
              className="text-body-sm h-[45px] w-full rounded-[10px]"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-xs text-left w-full">
                {errors.password.message}
              </p>
            )}

            {/* Sign Up Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="h-[54px] w-full text-body rounded-[10px] font-semibold"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 sm:mt-8 text-center w-full max-w-[300px]">
            <p className="text-body-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-primary hover:underline font-semibold transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default SignUp;
