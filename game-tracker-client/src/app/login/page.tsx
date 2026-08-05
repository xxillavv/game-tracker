"use client";

import { SyntheticEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, LogIn, UserPlus, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { IFormInputs } from "@/types/auth.types";
import { useAuth } from "@/hooks/useAuth";

type TAuthStatus = "login" | "register";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<TAuthStatus>("login");
  const [formInfo, setFormInfo] = useState<IFormInputs>({
    email: "",
    username: "",
    password: "",
  });

  const { login, register } = useAuth();

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (activeTab === "login") {
      login.mutate({
        email: formInfo.email,
        password: formInfo.password,
      });
    } else if (activeTab === "register") {
      register.mutate({
        email: formInfo.email,
        password: formInfo.password,
        username: formInfo.username,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-mono">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-120 rounded-full bg-turquoise/5 blur-[120px]" />
      <div className="relative w-full max-w-md px-4">
        <Link
          href="/"
          className="mb-10 flex items-center justify-center text-xl font-semibold tracking-wide text-white transition-opacity hover:opacity-80"
        >
          <span className="mr-2 rounded-xl bg-turquoise p-1.5">
            <Zap color="black" />
          </span>
          NEXUS<span className="text-turquoise">.gg</span>
        </Link>
        <div className="rounded-2xl bg-dark-blue/60 p-8 ring-1 ring-white/5 backdrop-blur-md">
          <div className="mb-8 flex rounded-xl bg-background/60 p-1 ring-1 ring-white/5">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-turquoise/10 text-turquoise ring-1 ring-turquoise/20"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Вхід
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-medium transition-all ${
                activeTab === "register"
                  ? "bg-turquoise/10 text-turquoise ring-1 ring-turquoise/20"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Реєстрація
            </button>
          </div>
          <h1 className="mb-1 text-2xl font-bold text-white">
            {activeTab === "login" ? "З поверненням!" : "Створи акаунт"}
          </h1>
          <p className="mb-8 text-sm text-white/40">
            {activeTab === "login"
              ? "Увійди щоб продовжити трекінг"
              : "Приєднуйся до спільноти гравців"}
          </p>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="flex flex-col gap-4"
          >
            {activeTab === "register" && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="auth-username"
                  className="text-xs font-medium text-white/60"
                >
                  Логін
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                  <Input
                    id="auth-username"
                    name="username"
                    placeholder="your_nickname"
                    autoComplete="username"
                    required
                    value={formInfo.username}
                    onChange={(e) =>
                      setFormInfo({ ...formInfo, username: e.target.value })
                    }
                    className="h-11 rounded-xl border-none bg-background/60 pl-10 ring-1 ring-white/5 text-input-text placeholder:text-white/30 transition-all focus:ring-turquoise/30"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-email"
                className="text-xs font-medium text-white/60"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                <Input
                  id="auth-email"
                  name="email"
                  type="email"
                  placeholder="player@nexus.gg"
                  autoComplete="email"
                  required
                  value={formInfo.email}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, email: e.target.value })
                  }
                  className="h-11 rounded-xl border-none bg-background/60 pl-10 ring-1 ring-white/5 text-input-text placeholder:text-white/30 transition-all focus:ring-turquoise/30"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-password"
                className="text-xs font-medium text-white/60"
              >
                Пароль
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                <Input
                  id="auth-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete={
                    activeTab === "login" ? "current-password" : "new-password"
                  }
                  required
                  value={formInfo.password}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, password: e.target.value })
                  }
                  className="h-11 rounded-xl border-none bg-background/60 pl-10 ring-1 ring-white/5 text-input-text placeholder:text-white/30 transition-all focus:ring-turquoise/30"
                />
              </div>
            </div>

            {activeTab === "login" ? (
              <Button
                type="submit"
                className="mt-2 h-12 w-full cursor-pointer rounded-xl bg-turquoise text-base font-semibold text-black transition-all hover:bg-turquoise/80 hover:shadow-[0_0_24px_rgba(0,228,184,0.3)]"
              >
                <LogIn className="mr-1.5 size-5" />
                Увійти
              </Button>
            ) : (
              <Button
                type="submit"
                className="mt-2 h-12 w-full cursor-pointer rounded-xl bg-turquoise text-base font-semibold text-black transition-all hover:bg-turquoise/80 hover:shadow-[0_0_24px_rgba(0,228,184,0.3)]"
              >
                <UserPlus className="mr-1.5 size-5" />
                Зареєструватися
              </Button>
            )}
          </form>
          <p className="mt-6 text-center text-sm text-white/40">
            {activeTab === "login" ? (
              <>
                Немає акаунту?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="cursor-pointer text-turquoise transition-colors hover:text-turquoise/80"
                >
                  Зареєструйся
                </button>
              </>
            ) : (
              <>
                Вже є акаунт?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="cursor-pointer text-turquoise transition-colors hover:text-turquoise/80"
                >
                  Увійди
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
