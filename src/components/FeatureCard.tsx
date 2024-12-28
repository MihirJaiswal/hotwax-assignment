export function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
      <div className="bg-gray-50 dark:bg-gradient-to-b dark:from-cyan-950 dark:via-blue-950 dark:to-black p-6 rounded-lg shadow-md">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    )
  }