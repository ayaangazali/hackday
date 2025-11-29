"use client"

import { ReactNode } from "react"
import { StackProvider, StackTheme } from "@stackframe/stack"
import { stackClientApp } from "@/stack/client"

export default function StackClientWrapper({ children }: { children: ReactNode }) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  )
}
