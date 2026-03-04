// components/layout/Header.tsx
"use client";

import { signOut } from "next-auth/react";
import { LogOut, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle"; 

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 p-2 rounded-lg">
            <Archive className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">
            Arsip Terpadu <span className="text-blue-700 dark:text-blue-500">Bakorwil III</span>
          </h1>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 sm:hidden">
            Arsip Bakorwil
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">
            Halo, Admin
          </span>
          
          <ThemeToggle /> 
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-950 dark:hover:text-red-400"
          >
            <LogOut className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Keluar</span>
          </Button>
        </div>
      </div>
    </header>
  );
}