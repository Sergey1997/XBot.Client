import { Link } from 'react-router-dom'
import { Button } from './button'
import { useAuth } from '../../context/AuthContext'
import ModalWrapper from '../ModalWrapper'
import { handleCheckout } from '../../services/checkoutService'

export default function PricingSection({
  isModal = false,
  showModal = false,
  onClose = () => {},
}) {
  const { user, handleLogin } = useAuth()

  const checkout = async () => {
    var url = await handleCheckout(user.email || 'test@gmail.com')

    window.location.href = url
  }
  // Content of Pricing Section
  const content = (
    <div
      className={`w-full max-w-6xl mt-16 mb-16 p-8 rounded-lg space-y-8 ${isModal ? '' : 'mx-auto'}`}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>
      <div className="flex flex-wrap justify-center lg:space-x-4 space-y-4 lg:space-y-0 items-stretch">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col border rounded-lg p-4 w-full lg:w-1/4 ${option.bgColor}`}
          >
            <div className="flex-grow space-y-4">
              <h3 className="text-2xl font-semibold text-center">
                {option.title}
              </h3>
              <p className="text-xl font-bold text-center mb-2">
                {option.price}
              </p>
              <p className="text-sm text-gray-600 text-center">
                {option.description}
              </p>
              <ul className="space-y-2 mb-4 pl-4">
                {option.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 text-center">
              <Link to="" onClick={checkout}>
                <Button className="w-3/4">{option.buttonText}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Decide if the content should be wrapped in a Modal
  return isModal ? (
    <ModalWrapper isVisible={showModal} onClose={onClose}>
      {content}
    </ModalWrapper>
  ) : (
    content
  )
}

const pricingOptions = [
  {
    title: 'Starter',
    price: '$ 8.99',
    description:
      'Perfect for individuals looking to enhance their online presence.',
    features: ['10 Comments per day'],
    buttonText: 'Choose Starter',
    bgColor: 'bg-white',
  },
  {
    title: 'Basic',
    price: '$ 18.99',
    description:
      'Ideal for those who want to significantly increase their audience engagement.',
    features: ['10 Comments per day', 'Live support'],
    buttonText: 'Choose Basic',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Premium',
    price: 'Negotiate',
    description: 'Custom engagement plan',
    features: ['10 Comments per day', 'Live support', 'Custom features'],
    buttonText: 'Contact for Pricing',
    bgColor: 'bg-white',
  },
]
