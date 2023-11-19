"use client"

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};
export default function Login(props: Props) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignInWithGoogle = () => {
      signIn('google', {
        redirect: true,
        callbackUrl: props.callbackUrl ?? "/"
      });
      
    };

    return (
        <div className={props.className}>
            <div>
                {!session ? (
                    <button onClick={handleSignInWithGoogle}>
                      Sign in with Google
                    </button>
                ) : (
                    <p>Welcome, {session?.user?.name}!</p>
                )}
            </div>
        </div>
    );
}
