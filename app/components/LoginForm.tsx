"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Spinner from "./Spinner";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
    // state
    const [loading, setLoading] = useState<boolean>(false);

    // navigations
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (res?.error) {
                console.log(res.error);
            } else {
                router.push("/");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
                                    type="email"
                                    className="bg-gray-50 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full mt-4 bg-primary text-white hover:bg-primary/90 transition rounded-lg"
                >
                    {loading ? (
                        <span className="flex items-center gap-1">
                            <Spinner />
                            <p>Logging in...</p>
                        </span>
                    ) : (
                        <p>Login</p>
                    )}
                </Button>
            </form>
        </Form>
    );
};
export default LoginForm;
