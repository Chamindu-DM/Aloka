const categories = [
  { name: 'Medical', icon: '🏥', count: 245 },
  { name: 'Education', icon: '📚', count: 189 },
  { name: 'Emergency', icon: '🚨', count: 156 },
  { name: 'Community', icon: '🤝', count: 312 },
  { name: 'Environment', icon: '🌱', count: 98 },
  { name: 'Animals', icon: '🐾', count: 127 },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} campaigns</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
