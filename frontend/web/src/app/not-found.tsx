import { useNavigate } from 'react-router';

export function loader({ params }: { params: Record<string, string | undefined> }) {
  return {
    path: `/${params['*'] ?? ''}`,
  };
}

export default function NotFoundPage({
  loaderData,
}: {
  loaderData?: { path?: string };
}) {
  const navigate = useNavigate();
  const missingPath = loaderData?.path?.replace(/^\//, '') || '';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
          <span className="text-rose-400 text-2xl font-bold">404</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Page Not Found
        </h1>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          The requested route{' '}
          {missingPath && (
            <code className="px-2 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-xs">
              /{missingPath}
            </code>
          )}{' '}
          could not be found or has been relocated.
        </p>

        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-sm font-medium transition"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-md shadow-blue-500/20 transition"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
