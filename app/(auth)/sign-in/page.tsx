import LoginForm from "@/app/components/LoginForm";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h1>

                <LoginForm />
                <div className="w-full p-8 rounded-2xl ">
                    <p className="text-center  text-gray-800">
                        Don't have an account ?{" "}
                        <Link href={"/sign-up"} className="text-primary">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default page;
