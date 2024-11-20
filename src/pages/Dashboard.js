import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config' // Adjust according to where your firebase config/init is
import PricingSection from '../components/ui/composits/PricingSection'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector((state) => state.user.user) // Access user from Redux

  const [showPricingModal, setShowPricingModal] = useState(false)
  const [formData, setFormData] = useState({
    instructions: '',
    isBotEnabled: false,
  })

  const steps = [
    {
      name: 'Collect Data',
      description: 'Gathering necessary data from different sources.',
      status: 'Completed',
    },
    {
      name: 'Analyze Data',
      description: 'Performing data analysis to determine trends.',
      status: 'In Progress',
    },
    {
      name: 'Engage Audience',
      description: 'Engaging with followers through comments and posts.',
      status: 'Pending',
    },
    {
      name: 'Generate Report',
      description: "Creating detailed report of bot's activities and outcomes.",
      status: 'Pending',
    },
    {
      name: 'Optimization',
      description: 'Optimizing strategies based on analysis results.',
      status: 'Incomplete',
    },
  ]

  useEffect(() => {
    // Load initial bot settings into form state when component mounts
    if (user) {
      setFormData({
        instructions: '',
        isBotEnabled: user.isBotEnabled === true, // Assuming isBotEnabled is stored as a string
      })
    }
  }, [user])

  const handleChange = async (event) => {
    const { name, value, type, checked } = event.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleCloseModal = () => {
    setShowPricingModal(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!user?.hasSubscription) {
      setShowPricingModal(true)
      return
    }
    try {
      const userRef = doc(db, 'customers', user.uid) // Ensure this points to the correct Firestore collection
      const { instructions, isBotEnabled } = formData
      // Update Firestore with new data
      await setDoc(
        userRef,
        { instructions, isBotEnabled: isBotEnabled.toString() },
        { merge: true }
      )
      console.log('User bot settings updated in Firestore successfully!')
    } catch (error) {
      console.error('Error updating bot settings:', error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100">
      <div className="w-full sm:w-1/3 mt-10 px-5 space-y-4">
        {/* Sidebar/Left Panel content */}
        <h6 className="text-lg font-semibold">Welcome to Your Personal Page</h6>
        {user && (
          <p className="text-xl font-medium text-indigo-600">
            Hello, @{user.displayName || 'Guest'}
          </p>
        )}
        <p>Please manage your settings below.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="instructions"
            placeholder="I'm a real estate agent and I want to gain more followers."
            value={formData.instructions}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full p-2"
            rows="4"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isBotEnabled"
              checked={formData.isBotEnabled}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="ml-2 text-sm" htmlFor="isBotEnabled">
              Enable Bot
            </label>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Settings
          </button>
        </form>
      </div>

      {/* Right Panel/Main Content */}
      <div className="w-full sm:w-3/4 mt-10 px-5 space-y-4">
        <h6 className="text-lg font-semibold">Bot Activity Log</h6>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Step
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {steps.map((step, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {step.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {step.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {step.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPricingModal && (
        <PricingSection
          isModal
          showModal={showPricingModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default Dashboard
