import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useUser } from '../context/UserContext';

const features = [
  { title: 'Learning Path', desc: 'Structured modules from grip to course management', to: '/learning-path', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { title: 'Swing Fundamentals', desc: 'Master the basics of each swing type', to: '/swing-fundamentals', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Equipment Guide', desc: 'Understand clubs, balls, and essential gear', to: '/equipment-guide', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { title: 'Rules & Etiquette', desc: 'Know the rules and respect the game', to: '/rules-etiquette', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { title: 'Practice Drills', desc: 'Hands-on exercises to build your skills', to: '/drills', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { title: 'Score Tracker', desc: 'Log rounds and track your improvement', to: '/score-tracker', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
];

export function Home() {
  const { user } = useUser();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero */}
      <section className="relative rounded-2xl bg-gradient-to-br from-green-800 to-green-600 text-white p-6 md:p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="350" cy="50" r="120" fill="currentColor" />
            <circle cx="50" cy="350" r="80" fill="currentColor" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Learn Golf the Smart Way
          </h1>
          <p className="mt-4 text-green-100 text-base md:text-lg leading-relaxed">
            From first grip to first round. Bite-sized lessons, interactive drills, and progress tracking designed for complete beginners. Each lesson takes just 5 minutes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {!user.onboardingComplete ? (
              <Link to="/onboarding">
                <Button size="lg" className="bg-white text-green-800 hover:bg-green-50">
                  Get Started
                </Button>
              </Link>
            ) : (
              <Link to="/learning-path">
                <Button size="lg" className="bg-white text-green-800 hover:bg-green-50">
                  Continue Learning
                </Button>
              </Link>
            )}
            <Link to="/learning-path">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Browse Modules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Explore Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{f.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick stats if onboarded */}
      {user.onboardingComplete && user.moduleProgress.length > 0 && (
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-green-700">{user.moduleProgress.length}</div>
              <div className="text-xs text-gray-500 mt-1">Modules Started</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {user.moduleProgress.reduce((s, m) => s + m.lessonsCompleted.length, 0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Lessons Done</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-green-700">{user.scores.length}</div>
              <div className="text-xs text-gray-500 mt-1">Rounds Logged</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {user.drillProgress.reduce((s, d) => s + d.completedCount, 0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Drills Practiced</div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
