"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  UserRound,
  Mail,
  Pencil,
  X,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleUpdateProfile = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();

    if (!name) {
      const errorMessage = "আপনার নাম লিখুন।";

      setMessage({
        type: "error",
        text: errorMessage,
      });

      toast.error(errorMessage);
      return;
    }

    if (name === user?.name) {
      const errorMessage = "নামে কোনো পরিবর্তন করা হয়নি।";

      setMessage({
        type: "error",
        text: errorMessage,
      });

      toast.info(errorMessage);
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        const errorMessage =
          error.message || "নাম আপডেট করা যায়নি।";

        setMessage({
          type: "error",
          text: errorMessage,
        });

        toast.error(errorMessage);
        return;
      }

      const successMessage = "আপনার নাম সফলভাবে আপডেট হয়েছে!";

      setMessage({
        type: "success",
        text: successMessage,
      });

      toast.success(successMessage);
      setShow(false);
    } catch {
      const errorMessage = "সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      setMessage({
        type: "error",
        text: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleShowForm = () => {
    setShow((prev) => !prev);
    setMessage(null);
  };

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি!");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-8 dark:bg-gray-950 transition-colors sm:py-12">
        <div className="mx-auto max-w-2xl animate-pulse">
          <div className="mb-7 space-y-3 text-center">
            <div className="mx-auto h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mx-auto h-4 w-72 max-w-full rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="h-1.5 bg-gray-200 dark:bg-gray-800" />

            <div className="p-5 sm:p-8">
              <div className="flex flex-col items-center">
                <div className="h-28 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="mt-4 h-6 w-40 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-3 h-4 w-52 max-w-full rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-5 h-8 w-36 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="mt-5 h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="my-7 border-t border-gray-100 dark:border-gray-800" />

              <div className="mb-5 h-6 w-40 rounded bg-gray-200 dark:bg-gray-800" />

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 sm:p-5">
                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-3 h-5 w-36 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-5 h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800 sm:p-5">
                <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-3 h-5 w-48 max-w-full rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-300">
              আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-8 transition-colors dark:bg-gray-950 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখতে ও আপডেট করতে পারবেন।
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="h-1.5 bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400" />

          <div className="p-5 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full border-4 border-green-100 p-1 dark:border-green-950">
                <div className="avatar">
                  <div className="w-24 rounded-full bg-green-50 ring-2 ring-green-600 dark:bg-gray-800">
                    <img
                      alt="প্রোফাইল ছবি"
                      src={user.image || "/default-avatar.png"}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <h2 className="mt-4 max-w-full break-words text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <div className="mt-2 flex max-w-full items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Mail
                  size={16}
                  className="shrink-0 text-green-600 dark:text-green-400"
                />
                <span className="break-all">{user.email}</span>
              </div>

              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-950/60 dark:text-green-400">
                <ShieldCheck size={15} />
                সক্রিয় অ্যাকাউন্ট
              </span>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                {signingOut ? (
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <LogOut size={17} />
                )}

                {signingOut
                  ? "সাইন আউট হচ্ছে..."
                  : "সাইন আউট"}
              </button>
            </div>

            <div className="my-7 border-t border-gray-100 dark:border-gray-800" />

            <div>
              <div className="mb-5 flex items-center gap-2">
                <UserRound
                  size={20}
                  className="text-green-700 dark:text-green-400"
                />

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  অ্যাকাউন্টের তথ্য
                </h3>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 sm:p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      নাম
                    </p>

                    <p className="mt-1 break-words text-base font-semibold text-gray-900 dark:text-white">
                      {user.name || "নাম দেওয়া হয়নি"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleShowForm}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:self-auto ${
                      show
                        ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        : "bg-green-700 text-white hover:bg-green-800"
                    }`}
                  >
                    {show ? (
                      <X size={16} />
                    ) : (
                      <Pencil size={16} />
                    )}

                    {show ? "বাতিল" : "নাম পরিবর্তন"}
                  </button>
                </div>

                {message && (
                  <div
                    role="status"
                    className={`mt-4 flex items-start gap-2 rounded-lg border p-3 text-sm ${
                      message.type === "success"
                        ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
                        : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                    }`}
                  >
                    {message.type === "success" ? (
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0"
                      />
                    )}

                    <span>{message.text}</span>
                  </div>
                )}

                {show && (
                  <form
                    onSubmit={handleUpdateProfile}
                    className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800"
                  >
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      আপনার নাম
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={user.name ?? ""}
                      required
                      maxLength={100}
                      autoComplete="name"
                      disabled={loading}
                      placeholder="আপনার নাম লিখুন"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-950"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle
                            size={18}
                            className="animate-spin"
                          />
                          আপডেট হচ্ছে...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={18} />
                          পরিবর্তন সংরক্ষণ করুন
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800 sm:p-5">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  ইমেইল ঠিকানা
                </p>

                <div className="mt-2 flex items-start gap-2">
                  <Mail
                    size={17}
                    className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
                  />

                  <p className="break-all text-sm font-medium text-gray-800 dark:text-gray-200">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
          আপনার অ্যাকাউন্টের তথ্য নিরাপদে রাখুন এবং প্রয়োজন অনুযায়ী আপডেট করুন।
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;