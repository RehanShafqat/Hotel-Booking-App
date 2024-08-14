import CardWrapper from "@/components/CardWrapper";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch, RootState } from "../../Redux/store";
import { clearState, getUserDetails, loginUser } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  //hooks

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (status === "succeeded") {
      toast({
        title: "Logged In!",
        description: "You have been logged in successfully",
        variant: "success",
      });
      dispatch(clearState());
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } else if (status === "failed") {
      toast({
        title: `${error}`,
        description: "Sign in failed",
        variant: "destructive",
      });
    }
  }, [status, error, toast]);

  const schema = z.object({
    email: z.string().email({
      message: "Please Enter valid Email",
    }),
    password: z.string().min(6, {
      message: "Password must be 6 characters long",
    }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitClick = (data: z.infer<typeof schema>) => {
    dispatch(loginUser(data));
  };

  return (
    <div className=" border   min-h-[100vh] flex items-center justify-center ">
      <CardWrapper
        title="Login"
        Label="Login to your account"
        backButtonHref="/Register"
        backButtonLabel="Don't Have an account? Register Here"
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitClick)}>
              {/* Email */}
              <div className="space-y-6">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your Email"
                          type="text"
                        ></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Password */}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your Password"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" className="w-full">
                  {status === "loading" && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardWrapper>
    </div>
  );
};

export default LoginPage;
