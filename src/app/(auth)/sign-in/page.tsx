import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import SignIn from '../../components/SignIn';

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const page: FC = (props: Props) => {
  return (
      <div className="h-full mx-auto flex flex-col items-center justify-center">
        <Link href="/"className="btn btn-ghost btn-sm mb-4"><ChevronLeft />Home</Link>
        <SignIn error={props.searchParams?.error} callbackUrl={props.searchParams?.callbackUrl} />
      </div>
  );
};

export default page;
