import React, { useEffect, useState } from "react";
import { PageLayout, Container, Input, Button, Checkbox } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface SignInFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormInputs) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast.success("Login successful!");
      navigate("/movies");
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("Current session:", data.session);
    });
  }, []);

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
              Sign in
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 w-full max-w-[300px]"
          >
            {/* Email */}
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

            {/* Password */}
            <Input
              type="password"
              placeholder="Password"
              className="text-body-sm h-[45px] w-full rounded-[10px]"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-xs text-left w-full">
                {errors.password.message}
              </p>
            )}

            {/* Remember Me */}
            <div className="flex justify-center w-full pt-2">
              <Checkbox
                label="Remember me"
                id="remember-me"
                {...register("rememberMe")}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="h-[54px] w-full text-body rounded-[10px] font-semibold"
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          {/* Sign Up */}
          <div className="mt-6 sm:mt-8 text-center w-full max-w-[300px]">
            <p className="text-body-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:underline font-semibold transition"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default SignIn;
  