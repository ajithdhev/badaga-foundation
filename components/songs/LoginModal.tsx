"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Music2, User, Mail, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
});
type FormData = z.infer<typeof schema>;

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const { login } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    login(data.name, data.email);
    onSuccess?.();
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-br from-badaga-forest to-badaga-bark p-6 text-center">
          <div className="w-16 h-16 bg-badaga-gold/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-badaga-gold/30">
            <Music2 className="w-8 h-8 text-badaga-gold" />
          </div>
          <h2 className="text-xl font-serif font-bold text-badaga-cream">Sign In to Rate Songs</h2>
          <p className="text-badaga-cream/60 text-sm mt-1">
            Join the community and help rank the Top 50 Badaga songs
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-badaga-cream/60 hover:text-badaga-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-badaga-bark mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-badaga-earth" /> Your Name
            </label>
            <input
              {...register("name")}
              placeholder="e.g., Ramu Gowder"
              className="w-full px-4 py-2.5 rounded-lg border border-badaga-earth/30 text-sm text-badaga-bark bg-badaga-cream/40 focus:outline-none focus:border-badaga-tea focus:ring-2 focus:ring-badaga-tea/20 transition-all"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-badaga-bark mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-badaga-earth" /> Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-lg border border-badaga-earth/30 text-sm text-badaga-bark bg-badaga-cream/40 focus:outline-none focus:border-badaga-tea focus:ring-2 focus:ring-badaga-tea/20 transition-all"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-badaga-tea text-white rounded-xl font-semibold hover:bg-badaga-forest transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In & Start Rating
          </button>

          <p className="text-xs text-center text-badaga-earth/60">
            No password needed. Your ratings are saved in your browser.
          </p>
        </form>
      </div>
    </div>,
    document.body
  );
}
