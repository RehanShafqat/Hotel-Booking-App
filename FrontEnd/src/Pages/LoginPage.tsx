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

const LoginPage = () => {
  const { toast } = useToast();
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
    toast({
      title: "You have successfully logged in!",
      description: "Data Submitted",
    });
    console.log(data);
  };

  return (
    <div className=" border  min-h-[100vh] flex items-center justify-center ">
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
