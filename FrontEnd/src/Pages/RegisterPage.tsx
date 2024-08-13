import CardWrapper from "@/components/CardWrapper";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { registerUser, clearState } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "Redux/store";
import { useEffect } from "react";

const RegisterPage = () => {
  // Hooks
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);

  // Schema for Register Form
  const schema = z
    .object({
      email: z.string().email({
        message: "Please enter valid email address",
      }),
      userName: z
        .string()
        .min(3, {
          message: "Please Enter your username",
        })
        .max(20),
      password: z.string().min(6, {
        message: "Password must me 6 characters long",
      }),
      confirmPassword: z.string().min(6, {
        message: "Password must me 6 characters long",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  //configuring react-hookform
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    dispatch(registerUser(data));
    console.log(status);
  };
  useEffect(() => {
    if (status === "succeeded") {
      toast({
        title: "You have been registered!",
        description: "Data Submitted",
        variant: "default",
      });
      dispatch(clearState());
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (status === "failed") {
      toast({
        title: `${error}`,
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, [status, toast, error]);

  return (
    <div className=" border  min-h-[100vh] flex items-center justify-center ">
      <CardWrapper
        title="Register"
        Label="Create your account"
        backButtonHref="/"
        backButtonLabel="Already Have an account? Login Here"
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@gmail.com"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Username"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="*******"
                          type="password"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type="password"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" className="w-full ">
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

export default RegisterPage;
