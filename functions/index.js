require('dotenv').config()
const { onRequest } = require('firebase-functions/v2/https')

const { onSchedule } = require('firebase-functions/v2/scheduler')
const logger = require('firebase-functions/logger')
const admin = require('firebase-admin')
const { TwitterApi } = require('twitter-api-v2')
const { OpenAI } = require('openai')

// Initialize Firebase Admin SDK
admin.initializeApp()
const db = admin.firestore()

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Scheduled function to run every day
exports.scheduledPostToTwitter = onSchedule(
  {
    schedule: 'every 9 hours', // Run every 8 hours
    timeZone: 'America/Los_Angeles', // Adjust timezone if needed
    retryConfig: {
      retryCount: 3, // Retry up to 3 times on failure
    },
  },
  async (req, res) => {
    try {
      // Fetch all customers with active subscriptions
      const customersSnapshot = await db
        .collection('customers')
        .where('hasSubscription', '==', true)
        .get()

      if (customersSnapshot.empty) {
        logger.info('No customers with active subscriptions found.')
        return
      }

      const customers = []
      customersSnapshot.forEach((doc) => {
        const customer = doc.data()
        customer.id = doc.id // Add the Firestore document ID
        customers.push(customer)
      })

      logger.info(`Found ${customers.length} subscribed customers.`)

      // Process each customer
      for (const customer of customers) {
        await processCustomer(customer)
      }
    } catch (error) {
      logger.error('Error running scheduled function:', error)
    }
  }
)

// Function to process a single customer
async function processCustomer(customer) {
  try {
    if (!customer.accessToken || !customer.secret) {
      logger.info(
        `access token: ${customer.accessToken}, secret token: ${customer.secret}`
      )
      logger.warn(
        `Skipping customer ${customer.id} due to missing Twitter credentials.`
      )
      return
    }

    // Initialize Twitter client for the customer
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: customer.accessToken,
      accessSecret: customer.secret,
    })

    // Generate content using OpenAI
    const postContent = await generatePostContent(customer)

    if (!postContent) {
      logger.warn(`No content generated for customer ${customer.id}.`)
      return
    }

    // Post content to Twitter
    const tweet = await twitterClient.v2.tweet(postContent)
    logger.info(`Tweet posted for customer ${customer.id}:`, tweet.data?.id)

    // Save the tweet to Firestore
    await db.collection('customers').doc(customer.id).collection('tweets').add({
      tweetId: tweet.data?.id,
      content: postContent,
      createdAt: admin.firestore.Timestamp.now(),
    })
    logger.info(`Tweet saved to Firestore for customer ${customer.id}.`)
  } catch (error) {
    logger.error(`Error processing customer ${customer.id}:`, error)
  }
}

// Function to generate post content using OpenAI
async function generatePostContent(customer) {
  try {
    const systemPrompt = `
    You are a X(twitter) user.
    Follow instructions if you have any.
    Goal: create a engaging tweet.
    Maximum chars for tweet: 236.
    Result content should contains only tweet.`

    let prompt = 'Write engegement tweet'

    if (customer.instructions) {
      prompt = `Write engege tweet with such Instructions: ${customer.instructions}.`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // You can use other models such as 'gpt-3.5-turbo' or 'gpt-4'
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    })

    const content = response.choices[0].message.content.trim().replace(/"/g, '')
    logger.info(`Generated content for customer ${customer.id}:`, content)
    return content
  } catch (error) {
    logger.error(`Error generating content for customer ${customer.id}:`, error)
    return null
  }
}

exports.helloWorld = onRequest((req, res) => {
  res.send(`I am a function. ${process.env.STRIPE_SECRET_KEY}`)
})
