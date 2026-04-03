"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  village: z.string().optional(),
  category: z.enum(["song", "recipe", "story", "person", "village", "festival", "other"]),
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Please provide at least 50 characters of detail"),
  source: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function SubmitForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="w-16 h-16 text-badaga-tea mb-4" />
        <h3 className="text-2xl font-serif font-bold text-badaga-bark mb-2">Thank You!</h3>
        <p className="text-badaga-earth max-w-md">
          Your contribution has been submitted. Our team will review it and add it to the site if it meets our community guidelines.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 bg-badaga-tea text-white rounded-lg hover:bg-badaga-forest transition-colors"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Something went wrong. Please try again or email us directly.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Your Name *" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="e.g., Ramu Gowder"
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field label="Email Address *" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Your Village (optional)" error={undefined}>
          <input
            {...register("village")}
            placeholder="e.g., Kotagiri"
            className={inputClass(false)}
          />
        </Field>

        <Field label="Category *" error={errors.category?.message}>
          <select {...register("category")} className={inputClass(!!errors.category)}>
            <option value="">Select a category</option>
            <option value="song">Song / Music</option>
            <option value="recipe">Food / Recipe</option>
            <option value="story">Story / History</option>
            <option value="person">Famous Person</option>
            <option value="village">Village Information</option>
            <option value="festival">Festival / Ritual</option>
            <option value="other">Other</option>
          </select>
        </Field>
      </div>

      <Field label="Title *" error={errors.title?.message}>
        <input
          {...register("title")}
          placeholder="e.g., Traditional Badaga Harvest Song from Kotagiri"
          className={inputClass(!!errors.title)}
        />
      </Field>

      <Field label="Content *" error={errors.content?.message}>
        <textarea
          {...register("content")}
          rows={6}
          placeholder="Please share as much detail as possible, lyrics, descriptions, stories, historical context, etc."
          className={inputClass(!!errors.content)}
        />
      </Field>

      <Field label="Source / Reference (optional)" error={undefined}>
        <input
          {...register("source")}
          placeholder="e.g., Told by grandfather Hebbar (age 82) from Beargal village"
          className={inputClass(false)}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-semibold text-white transition-all",
          status === "loading"
            ? "bg-badaga-tea/70 cursor-not-allowed"
            : "bg-badaga-tea hover:bg-badaga-forest active:scale-98"
        )}
      >
        <Send className="w-4 h-4" />
        {status === "loading" ? "Submitting..." : "Submit Contribution"}
      </button>

      <p className="text-xs text-center text-badaga-earth/70">
        Your contribution will be reviewed by our editorial team before being published. We respect your privacy.
      </p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-badaga-bark mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full px-4 py-2.5 rounded-lg border text-badaga-bark bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-badaga-tea/50",
    hasError ? "border-red-400 focus:border-red-400" : "border-badaga-earth/30 focus:border-badaga-tea"
  );
}
