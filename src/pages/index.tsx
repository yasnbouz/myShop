export default function Home() {
  return (
    <div className="min-h-screen px-2 flex flex-col justify-center items-center h-screen">
      <main className="flex-1 py-20 flex flex-col justify-center items-center">
        <h1 className="text-4rem mb-1">
          Welcome to{` `}
          <a className="text-blue-500" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
      </main>
    </div>
  );
}
