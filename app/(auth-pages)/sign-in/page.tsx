import SignInClient from "./SignInClient"
import StackClientWrapper from "@/components/stack-client-wrapper"

export default function CustomSignInPage() {
  return (
    <StackClientWrapper>
      <SignInClient />
    </StackClientWrapper>
  )
}