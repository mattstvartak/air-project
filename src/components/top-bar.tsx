import Image from "next/image";

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className }: TopBarProps) => {
  return (
    <div
      className={`relative flex h-14 items-center justify-between bg-[var(--colors-grey3)] px-3 ${className || ""}`}
      data-testid="PUBLIC_TOP_BAR">
      <div>
        <div
          className="flex items-center"
          data-testid="WORKSPACE_AVATAR_AND_NAME">
          <div
            className="relative overflow-hidden rounded mr-3 h-8 w-8 min-w-[32px]"
            data-testid="WORKSPACE_AVATAR">
            <Image
              alt="Logo for Restaurant Stock"
              className="h-full object-cover w-8"
              src="https://air-prod.imgix.net/workspace-avatars/6a00cac1-4535-4f93-ab34-5118424e7695-1700239478623.jpeg"
              width={32}
              height={32}
            />
          </div>
          <div className="font-medium text-gray-600 text-base">
            Restaurant Stock
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="cursor-pointer px-0.5 text-sm font-semibold text-gray-600 hover:underline">
          Sign up
        </button>
        <a href="/">
          <svg
            className="w-[48px] text-blue-600"
            data-testid="PUBLIC_TOP_BAR_LOGO"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 32 32">
            <path d="M2.93 20.48a.51.51 0 01-.85-.55s1.73-2.67 3.82-5.28C8.82 11 11 9.24 12.52 9.24c.72 0 1.58.39 1.58 2.28a14.64 14.64 0 01-.28 2.4h-1a13.1 13.1 0 00.3-2.4c0-1.27-.4-1.27-.57-1.27-2.2 0-7.07 6.27-9.62 10.23zM19 13.75a.79.79 0 00.8-.79.8.8 0 00-.8-.8.79.79 0 00-.79.8.79.79 0 00.79.79zm2.21 4a5.9 5.9 0 01-3.82 2c-.59 0-.89-.25-.89-.75s.29-1.55 1.68-3.35a.53.53 0 00.07-.5.54.54 0 00-.39-.31c-3.42-.57-8-.84-10.34 1.15a3.24 3.24 0 00-1.26 2.42 2.31 2.31 0 002.38 2.35c1.84 0 3.35-1.39 4.37-4 .11-.27.2-.54.29-.82h-1.08c-.68 2-1.82 3.78-3.58 3.78a1.31 1.31 0 01-1.37-1.34 2.33 2.33 0 01.9-1.65c1.08-.91 3.47-1.81 8.71-1.05A6.16 6.16 0 0015.49 19a1.74 1.74 0 001.91 1.76 6.77 6.77 0 004.54-2.31A9.71 9.71 0 0023.15 17a2.13 2.13 0 01-1-.29 10.11 10.11 0 01-.93 1.04zm8.65.51a.5.5 0 00-.71 0A5.3 5.3 0 0126 19.75a.71.71 0 01-.79-.81c0-.59.31-1.69 1.8-3.63a.49.49 0 000-.65.5.5 0 00-.66-.07 5.22 5.22 0 01-2.74.87c-1.12 0-1.63-.68-1.63-1.31 0-.78.4-1 .61-1 .54 0 .6.6.6.79a2.85 2.85 0 01-.14.91 2.1 2.1 0 001 .05 3.48 3.48 0 00.12-1 1.65 1.65 0 00-1.61-1.77 1.76 1.76 0 00-1.62 2 2.15 2.15 0 00.87 1.75 2.88 2.88 0 001.77.57 5.5 5.5 0 001.57-.24 5.62 5.62 0 00-.95 2.71 1.71 1.71 0 001.8 1.84A6.46 6.46 0 0029.83 19a.51.51 0 00.04-.74z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TopBar;
