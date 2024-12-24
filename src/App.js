
import { useEffect, useState } from 'react'



export default function ProfileCard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRandomUser = async () => {
    setLoading(true)
    try {
      const randomSeed = Math.random().toString(36).substring(7)
      const response = await fetch(`https://randomuser.me/api/?seed=${randomSeed}&results=1`)
      const data = await response.json()
      setUser(data.results[0])
      setError(null)
    } catch (err) {
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg animate-pulse">
          <div className="flex gap-8">
            <div className="w-48 h-48 bg-gray-200 rounded-lg" />
            <div className="space-y-4 flex-1">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex gap-8">
          <div className="relative">
            <img
              src={user.picture.large}
              alt="Profile"
              className="w-48 h-48 rounded-lg object-cover shadow-md"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name.first} {user.name.last}
              </h2>
              <p className="text-lg text-gray-600 capitalize">{user.gender}</p>
              <p className="text-lg text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

