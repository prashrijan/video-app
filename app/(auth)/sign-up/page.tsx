import RegisterForm from "@/app/components/RegisterForm";
import Link from "next/link";

const Register = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Create an Account
                </h1>

                <RegisterForm />
                <div className="w-full p-8 rounded-2xl ">
                    <p className="text-center  text-gray-800">
                        Already have an account ?{" "}
                        <Link href={"/sign-in"} className="text-primary">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;
