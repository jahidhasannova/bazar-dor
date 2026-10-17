"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect");

        if (redirect === "/profile") {
            toast.info("Please login to access your profile.");
        } else if (redirect?.startsWith("/product/")) {
            toast.info("Please login to access this product.");
        }
    }, []);


    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.signIn.email({
                email: user.email as string,
                password: user.password as string,
            });

            if (data) {
                toast.success("সাইন ইন সফল হয়েছে!");

                setTimeout(() => {
                    router.push("/");
                }, 1000);

                return;
            }

            if (error) {
                console.log(error);
                toast.error(error.message);
            }

            setIsSubmitting(false);
        } catch {
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setIsSubmitting(false);
        }
    };

    const handleSocialLogin = async (
        provider: "google" | "github",
    ) => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        // toast.info(`${provider} দিয়ে সাইন ইন করা হচ্ছে...`);

        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch {
            toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
            setIsSubmitting(false);
        }
    };

    if (isSubmitting) {
        return (
            <div
                role="status"
                aria-label="সাইন ইন হচ্ছে"
                className="flex flex-col justify-center items-center max-w-lg mx-auto mt-10 px-6 py-8 border border-gray-200 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-900 shadow-md dark:shadow-black/20 animate-pulse"
            >
                <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-700" />

                <div className="mt-4 h-4 w-64 max-w-full rounded bg-gray-200 dark:bg-gray-700" />

                <div className="mt-8 w-full max-w-md space-y-5">
                    <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />

                    <div className="h-4 w-44 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />

                    <div className="h-11 w-36 rounded-lg bg-gray-200 dark:bg-gray-700" />

                    <div className="h-4 w-48 max-w-full mx-auto rounded bg-gray-200 dark:bg-gray-700" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="h-11 rounded-lg bg-gray-200 dark:bg-gray-700" />
                        <div className="h-11 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    </div>
                </div>

                <span className="sr-only">সাইন ইন হচ্ছে...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto mt-10 px-6 py-8 border border-gray-200 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md dark:shadow-black/20">
            <form onSubmit={onSubmit} className="w-full max-w-md">
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend w-full justify-center text-2xl font-bold text-green-700">
                        সাইন ইন
                    </legend>

                    <p className="flex justify-center">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>

                    <label className="label"> Email / ইমেইল :</label>
                    <input
                        name="email"
                        type="email"
                        required
                        pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                        className="input w-full mb-5 hover:border-green-500"
                        placeholder="example@gmail.com"
                    />

                    <label className="label font-semibold">
                        Password / পাসওয়ার্ড :
                    </label>

                    <div className="relative w-full">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="input w-full pr-10 hover:border-green-500"
                            placeholder="Abcd@1234"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <Eye className="size-5" />
                            ) : (
                                <EyeSlash className="size-5" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn mt-4 w-full border-0 bg-green-500 hover:bg-green-700 disabled:opacity-60 sm:w-auto"
                    >
                        সাইন ইন করুন
                    </button>

                    <p className="flex justify-center mt-2">
                        অ্যাকাউন্ট নেই?
                        <Link
                            href="/signup"
                            className="text-green-700 font-bold hover:underline ml-1"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </fieldset>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 px-4 w-full max-w-md">
                <button
                    type="button"
                    onClick={() => handleSocialLogin("github")}
                    disabled={isSubmitting}
                    className="btn bg-black text-white border-black w-full disabled:opacity-60"
                >
                    <svg
                        aria-label="GitHub logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="white"
                            d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                        />
                    </svg>
                    Login with GitHub
                </button>

                <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isSubmitting}
                    className="btn bg-white text-black border-[#e5e5e5] w-full disabled:opacity-60"
                >
                    <svg
                        aria-label="Google logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff" />
                            <path
                                fill="#34a853"
                                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                            />
                            <path
                                fill="#4285f4"
                                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                            />
                            <path
                                fill="#fbbc02"
                                d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
                            />
                            <path
                                fill="#ea4335"
                                d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                            />
                        </g>
                    </svg>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default SignInPage;
