"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import "./globals.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
 
    setIsLoading(true);
    setEmailStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
   
        setEmailStatus({
          type: "success",
          message: "🎉 Ticket sent to your email!",
        });
        setTicketData(data);
      } else {
  
        setEmailStatus({
          type: "error",
          message: "Failed to send email. Please try again.",
        });
      }
    } catch (error) {
 
      setEmailStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (ticketData) {
    return (
      <div className="flex flex-col items-center justify-between  w-full md:max-w-3xl   flex-1  text-center mt-15">
        <h1 className="text-2xl md:text-5xl font-extrabold text-center mb-8">
          Congrats, {ticketData?.fullName}! Your ticket is ready.
        </h1>
        <p className="text-neutral-400 text-base md:text-2xl md:w-3/4 lg:w-2/3 mx-auto">
          We&apos;ve emailed your ticket to{" "}
          <span className="font-bold text-orange-500">{ticketData?.email}</span>{" "}
          and will send updates in the run up to the event.
        </p>

        <div className="mt-10 md:mt-24 mb-12  w-full md:max-w-xl lg:max-w-2xl mx-auto px-4">
          <div className="relative w-full aspect-[600/280]">
            <Image
              src="/images/patternticket.svg"
              alt="Ticket Pattern"
              width={600}
              height={280}
              className="absolute inset-0 w-full h-full object-fill"
            />

            <div className="w-4/5 flex flex-col items-start justify-between absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8">
              <div className="text-left">
                <Image
                  src="/images/logofull.svg"
                  alt="Conference Logo"
                  width={200}
                  height={50}
                  className="w-20 h-5 sm:w-28 sm:h-7 md:w-32 md:h-10 lg:w-40 lg:h-12"
                />
                <p className="text-neutral-100 text-[10px] sm:text-xs md:text-base lg:text-xl ml-1 sm:ml-2 md:ml-4 mt-1">
                  Jan 31, 2026 / Austin, TX
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                <Image
                  src={
                    ticketData?.avatar?.preview ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Avatar"
                  width={150}
                  height={150}
                  className="w-10 h-10 xxs:w-20 xxs:h-20 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg md:rounded-xl object-cover"
                />
                <span className="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-neutral-200">
                  {ticketData?.fullName}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center absolute inset-y-0 right-0 w-1/5">
              <span className="rotate-90 text-xs sm:text-sm md:text-xl lg:text-2xl text-neutral-300 whitespace-nowrap">
                <span>{`#${Math.floor(10000 + Math.random() * 90000)}`}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-white">
          Your Journey to Coding Conf 2026 Starts Here!
        </h1>
        <p className="text-neutral-400 text-xl text-center mb-12">
          Secure your spot at next year&apos;s biggest coding conference.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 bg-neutral-900 p-8 rounded-2xl border-2 border-neutral-800"
        >
          <div className="w-full">
            <span className="block mb-4 text-left text-sm md:text-base font-medium text-neutral-200">
              Upload Avatar
            </span>
            <Controller
              name="avatar"
              control={control}
              rules={{ required: "Avatar is required" }}
              render={({ field }) => (
                <Avatar {...field} error={errors.avatar?.message} />
              )}
            />
          </div>

          <Input
            label="Full Name"
            type="text"
            error={errors.fullName?.message}
            placeholder="John Doe"
            {...register("fullName", { required: "This field is required" })}
          />

          <Input
            label="Email Address"
            type="email"
            error={errors.email?.message}
            placeholder="john.doe@example.com"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            label="GitHub Username"
            placeholder="johndoe"
            error={errors.github?.message}
            type="text"
            {...register("github", { required: "This field is required" })}
          />

          {emailStatus && (
            <div
              className={`p-4 rounded-xl text-center font-medium ${
                emailStatus.type === "success"
                  ? "bg-green-500/20 text-green-400 border-2 border-green-500/50"
                  : "bg-red-500/20 text-red-400 border-2 border-red-500/50"
              }`}
            >
              {emailStatus.message}
            </div>
          )}

          <button
            className="mt-4 bg-orange-500 text-white font-bold text-xl md:text-2xl p-4 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending Email..." : "Generate My Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}
