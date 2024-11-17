export default function ExplainerSection() {
  return (
    <div className="w-full max-w-6xl mt-16 p-8 bg-gray-100 rounded-lg space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>

      {/* Step 1: Upload your images */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            1
          </div>
          <h3 className="text-2xl font-semibold">
            Connect your Twitter account
          </h3>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Just link your Twitter account to our bot with the necessary
          permissions.
        </p>
        <img
          src="example.png"
          alt="AI Headshot example"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto"
        />
      </div>

      {/* Step 2: Train your model */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            2
          </div>
          <h3 className="text-2xl font-semibold">Set your preferences</h3>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Choose who you want to target, which hashtags to use, and the style of
          your comments.
        </p>
        <img
          src="blur.png"
          alt="AI Headshot blur"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto"
        />
      </div>

      {/* Step 3: Generate images */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            3
          </div>
          <h3 className="text-2xl font-semibold">
            {' '}
            Let our AI work its magic{' '}
          </h3>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Our AI will smartly start commenting, saving you time and helping
          boost your Twitter activity!
        </p>
        <img
          src="result.png"
          alt="AI Headshot result"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto"
        />
      </div>
    </div>
  )
}
